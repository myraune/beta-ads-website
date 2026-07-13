import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// A small, tasteful "meet the mascot" band for the homepage. Keeps the mascot a
// visible part of the brand without taking over the premium hero/marketing pages.
export const MeetBeta: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section className="py-20 md:py-28 border-t border-border">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="rounded-3xl border border-border overflow-hidden bg-card grid lg:grid-cols-2 items-stretch">
          <div className="relative min-h-[260px] lg:min-h-0 order-1 lg:order-none">
            <img
              src="/lovable-uploads/beta-mascot-onair.jpg"
              alt="Beta, the Beta Ads mascot, live on stream"
              className="absolute inset-0 w-full h-full object-cover"
              width={1200}
              height={686}
              loading="lazy"
            />
          </div>
          <div className="p-10 md:p-14 flex flex-col justify-center">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              Say hi to Beta
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
              The face of native stream advertising
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
              Beta lives where your audience already is - inside the stream. No pre-rolls, no pop-ups, no ad-block. Just brand moments that feel like part of the show.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/demo"
                className="inline-flex items-center gap-2 bg-primary text-white hover:bg-primary/90 px-7 h-12 rounded-full text-sm font-semibold transition-colors"
              >
                Watch a demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-2 border border-border text-foreground hover:bg-muted px-7 h-12 rounded-full text-sm font-semibold transition-colors"
              >
                See the work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
