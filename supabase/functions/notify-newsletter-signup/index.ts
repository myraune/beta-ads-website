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

    // Send welcome email to the subscriber
    const welcomeEmailResponse = await resend.emails.send({
      from: "Beta Ads <noreply@beta-ads.no>",
      to: [normalizedEmail],
      subject: "Welcome to Nordic Twitch Market Insights",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; border-radius: 12px; overflow: hidden;">
                  <!-- Header -->
                  <tr>
                    <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Beta Ads</h1>
                      <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Nordic Twitch Advertising</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <h2 style="margin: 0 0 20px; color: #ffffff; font-size: 24px; font-weight: 600;">Thanks for subscribing!</h2>
                      <p style="margin: 0 0 20px; color: #a1a1aa; font-size: 16px; line-height: 1.6;">
                        You're now on the list for exclusive insights into the Nordic Twitch advertising market.
                      </p>
                      
                      <div style="background-color: #262626; border-radius: 8px; padding: 24px; margin: 24px 0;">
                        <h3 style="margin: 0 0 16px; color: #ffffff; font-size: 16px; font-weight: 600;">What you'll receive:</h3>
                        <ul style="margin: 0; padding: 0 0 0 20px; color: #a1a1aa; font-size: 14px; line-height: 1.8;">
                          <li>Market trends and viewership data</li>
                          <li>Case studies from successful campaigns</li>
                          <li>New ad format announcements</li>
                          <li>Industry insights and benchmarks</li>
                        </ul>
                      </div>
                      
                      <p style="margin: 24px 0; color: #a1a1aa; font-size: 16px; line-height: 1.6;">
                        In the meantime, explore our website to learn more about native Twitch advertising.
                      </p>
                      
                      <a href="https://beta-ads.lovable.app" style="display: inline-block; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 14px;">
                        Visit Beta Ads
                      </a>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 24px 40px; background-color: #0f0f0f; border-top: 1px solid #262626;">
                      <p style="margin: 0 0 8px; color: #71717a; font-size: 12px; text-align: center;">
                        Beta Ads — Native advertising for live Twitch streams
                      </p>
                      <p style="margin: 0; color: #71717a; font-size: 12px; text-align: center;">
                        <a href="${unsubscribeUrl}" style="color: #71717a; text-decoration: underline;">Unsubscribe</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    console.log("Welcome email sent to subscriber:", welcomeEmailResponse);

    // Send internal notification to admin
    const adminNotificationResponse = await resend.emails.send({
      from: "Beta Ads <noreply@beta-ads.no>",
      to: ["andreas@beta-ads.no"],
      subject: `${isNewSubscriber ? "New" : "Reactivated"} Newsletter Signup`,
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

    console.log("Admin notification sent:", adminNotificationResponse);

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
