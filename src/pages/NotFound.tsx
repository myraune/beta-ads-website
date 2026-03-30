import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <SEO
        title="Page Not Found | Beta Ads"
        description="The page you're looking for doesn't exist or has been moved. Return to the Beta Ads homepage."
        noindex={true}
      />
      <div className="text-center">
        <div className="text-7xl font-bold text-primary/20 mb-2">404</div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Page not found</h1>
        <p className="text-muted-foreground mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
