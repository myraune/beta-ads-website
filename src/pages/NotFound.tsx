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
      <div className="text-center max-w-lg">
        <img
          src="/lovable-uploads/beta-mascot-404.jpg"
          alt="Beta Ads mascot shrugging at a lost-signal error"
          className="w-full max-w-md mx-auto rounded-2xl shadow-xl mb-8"
          width={1200}
          height={686}
        />
        <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">Error 404</span>
        <h1 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-3">Looks like this one went offline</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on stream.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Back to home
          </Link>
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-border text-foreground text-sm font-semibold hover:bg-muted transition-colors"
          >
            See our work
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
