import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotifyRequest {
  email: string;
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
function validateEmail(email: unknown): { valid: boolean; error?: string } {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' };
  }
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }
  if (email.length > 255) {
    return { valid: false, error: 'Email must be less than 255 characters' };
  }
  
  return { valid: true };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: NotifyRequest = await req.json();
    
    // Server-side validation
    const validation = validateEmail(body.email);
    if (!validation.valid) {
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const { email } = body;
    
    // Escape email for HTML
    const safeEmail = escapeHtml(email.trim());

    console.log("New newsletter signup received");

    const emailResponse = await resend.emails.send({
      from: "Nordic Twitch Insights <onboarding@resend.dev>",
      to: ["andreas@beta-ads.no"],
      subject: "New Newsletter Signup - Nordic Twitch Market",
      html: `
        <h2>New Newsletter Signup</h2>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Source:</strong> Website Popup</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        
        <hr style="margin: 20px 0;">
        
        <p style="color: #666; font-size: 14px;">
          This notification was sent automatically when someone signed up for your Nordic Twitch market insights newsletter.
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