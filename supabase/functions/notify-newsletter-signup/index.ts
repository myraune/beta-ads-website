import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotifyRequest {
  email: string;
  // Honeypot field - should always be empty
  website?: string;
}

// Simple in-memory rate limiter (per-instance)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 10;

function checkRateLimit(identifier: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
}

// Clean up old entries periodically
function cleanupRateLimitMap() {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}

// HTML escape function to prevent XSS in emails
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Server-side email validation
function validateInput(data: NotifyRequest): { valid: boolean; error?: string } {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Honeypot check - if filled, it's a bot
  if (data.website && data.website.trim().length > 0) {
    return { valid: false, error: 'BOT_DETECTED' };
  }
  
  if (!data.email || typeof data.email !== 'string') {
    return { valid: false, error: 'Email is required' };
  }
  if (!emailRegex.test(data.email)) {
    return { valid: false, error: 'Invalid email format' };
  }
  if (data.email.length > 255) {
    return { valid: false, error: 'Email must be less than 255 characters' };
  }
  
  return { valid: true };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Cleanup old rate limit entries
  cleanupRateLimitMap();

  try {
    // Get client identifier (IP from headers or fallback)
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("cf-connecting-ip") || 
                     "unknown";
    
    // Check rate limit
    const rateLimitResult = checkRateLimit(clientIP);
    if (!rateLimitResult.allowed) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: { 
            "Content-Type": "application/json", 
            "Retry-After": String(rateLimitResult.retryAfter),
            ...corsHeaders 
          },
        }
      );
    }

    const body: NotifyRequest = await req.json();
    
    // Server-side validation
    const validation = validateInput(body);
    if (!validation.valid) {
      // If bot detected, return fake success to not reveal detection
      if (validation.error === 'BOT_DETECTED') {
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const { email } = body;
    const normalizedEmail = email.trim().toLowerCase();
    
    // Initialize Supabase client with service role for database operations
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if email already exists
    const { data: existingSubscriber } = await supabase
      .from("newsletter_subscribers")
      .select("id, is_active, unsubscribe_token")
      .eq("email", normalizedEmail)
      .single();

    let unsubscribeToken: string;
    let isNewSubscriber = false;

    if (existingSubscriber) {
      if (existingSubscriber.is_active) {
        // Already subscribed - return success silently
        return new Response(JSON.stringify({ success: true, message: "Already subscribed" }), {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      } else {
        // Reactivate subscription
        const { error: updateError } = await supabase
          .from("newsletter_subscribers")
          .update({ 
            is_active: true, 
            unsubscribed_at: null,
            subscribed_at: new Date().toISOString()
          })
          .eq("id", existingSubscriber.id);

        if (updateError) {
          console.error("Error reactivating subscriber:", updateError);
          throw new Error("Failed to reactivate subscription");
        }
        unsubscribeToken = existingSubscriber.unsubscribe_token;
      }
    } else {
      // New subscriber
      const { data: newSubscriber, error: insertError } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: normalizedEmail })
        .select("unsubscribe_token")
        .single();

      if (insertError) {
        console.error("Error inserting subscriber:", insertError);
        throw new Error("Failed to save subscription");
      }
      unsubscribeToken = newSubscriber.unsubscribe_token;
      isNewSubscriber = true;
    }

    // Escape email for HTML
    const safeEmail = escapeHtml(normalizedEmail);
    
    // Get the base URL for unsubscribe link
    const baseUrl = "https://beta-ads.lovable.app";
    const unsubscribeUrl = `${baseUrl}/unsubscribe?token=${unsubscribeToken}`;

    console.log("New newsletter signup received:", isNewSubscriber ? "new" : "reactivated");

    const emailResponse = await resend.emails.send({
      from: "Nordic Twitch Insights <onboarding@resend.dev>",
      to: ["andreas@beta-ads.no"],
      subject: `${isNewSubscriber ? "New" : "Reactivated"} Newsletter Signup - Nordic Twitch Market`,
      html: `
        <h2>${isNewSubscriber ? "New" : "Reactivated"} Newsletter Signup</h2>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Source:</strong> Website Popup</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        
        <hr style="margin: 20px 0;">
        
        <p style="color: #666; font-size: 14px;">
          This notification was sent automatically when someone signed up for your Nordic Twitch market insights newsletter.
        </p>
        <p style="color: #999; font-size: 12px;">
          Unsubscribe link for this user: <a href="${unsubscribeUrl}">${unsubscribeUrl}</a>
        </p>
      `,
    });

    console.log("Notification email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in notify-newsletter-signup function:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
