import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const DISMISSED_KEY = "beta-ads-announcement-dismissed";

export const AnnouncementBar: React.FC = () => {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem(DISMISSED_KEY);
    if (!wasDismissed) setDismissed(false);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem(DISMISSED_KEY, "true");
  };

  if (dismissed) return null;

  return (
    <div className="relative z-[60] bg-primary/10 backdrop-blur-sm">
      <div className="max-w-[1600px] mx-auto px-6 py-2 flex items-center justify-center">
        <div className="overflow-hidden flex-1">
          <p className="text-xs font-light tracking-wide text-center text-foreground/80">
            <span className="text-primary font-normal">New:</span>{" "}
            Samsung S25 campaign delivered 500K+ impressions with 2.93% CTR
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className="ml-4 p-1 text-muted-foreground hover:text-foreground transition-colors duration-200 flex-shrink-0"
          aria-label="Dismiss announcement"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
