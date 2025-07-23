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

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: NotifyRequest = await req.json();

    console.log(`New newsletter signup: ${email}`);

    const emailResponse = await resend.emails.send({
      from: "Nordic Twitch Insights <onboarding@resend.dev>",
      to: ["andreas@beta-ads.no"],
      subject: "New Newsletter Signup - Nordic Twitch Market",
      html: `
        <h2>New Newsletter Signup</h2>
        <p><strong>Email:</strong> ${email}</p>
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
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);