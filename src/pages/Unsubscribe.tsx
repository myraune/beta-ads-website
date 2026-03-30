import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

type UnsubscribeStatus = "loading" | "success" | "already_unsubscribed" | "error" | "invalid_token";

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<UnsubscribeStatus>("loading");
  const token = searchParams.get("token");

  useEffect(() => {
    const processUnsubscribe = async () => {
      if (!token) {
        setStatus("invalid_token");
        return;
      }

      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(token)) {
        setStatus("invalid_token");
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke("unsubscribe-newsletter", {
          body: { token },
        });

        if (error) {
          console.error("Unsubscribe error:", error);
          setStatus("error");
          return;
        }

        if (data?.message === "Already unsubscribed") {
          setStatus("already_unsubscribed");
        } else if (data?.success) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (err) {
        console.error("Unsubscribe error:", err);
        setStatus("error");
      }
    };

    processUnsubscribe();
  }, [token]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground text-sm">Processing...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <SEO title="Unsubscribe | Beta Ads" description="Manage your email preferences." noindex={true} />
      <div className="max-w-md w-full text-center space-y-6">
        {status === "loading" && null}

        {status === "success" && (
          <>
            <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
            <h1 className="text-2xl font-bold text-foreground">Successfully Unsubscribed</h1>
            <p className="text-muted-foreground">
              You have been removed from our newsletter. You will no longer receive emails from us.
            </p>
            <p className="text-sm text-muted-foreground">
              Changed your mind? You can always subscribe again on our website.
            </p>
          </>
        )}

        {status === "already_unsubscribed" && (
          <>
            <CheckCircle className="w-16 h-16 mx-auto text-muted-foreground" />
            <h1 className="text-2xl font-bold text-foreground">Already Unsubscribed</h1>
            <p className="text-muted-foreground">
              This email address has already been unsubscribed from our newsletter.
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="w-16 h-16 mx-auto text-destructive" />
            <h1 className="text-2xl font-bold text-foreground">Something Went Wrong</h1>
            <p className="text-muted-foreground">
              We couldn't process your unsubscribe request. Please try again later or contact us for assistance.
            </p>
          </>
        )}

        {status === "invalid_token" && (
          <>
            <XCircle className="w-16 h-16 mx-auto text-destructive" />
            <h1 className="text-2xl font-bold text-foreground">Invalid Link</h1>
            <p className="text-muted-foreground">
              This unsubscribe link is invalid or has expired. Please use the link from your most recent email.
            </p>
          </>
        )}

        <div className="pt-4">
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unsubscribe;
