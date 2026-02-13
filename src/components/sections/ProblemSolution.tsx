import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldOff, Eye, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const ProblemSolution: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 lg:py-32">
      <div 
        ref={sectionRef}
        className={`max-w-[1200px] mx-auto px-6 lg:px-12 transition-[opacity,transform] duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Problem */}
          <div className="space-y-6">
            <p className="text-xs font-light tracking-[0.3em] text-muted-foreground/60 uppercase">
              The problem
            </p>
            <h2 className="text-3xl lg:text-4xl font-light leading-tight tracking-tight">
              Traditional digital ads{" "}
              <span className="font-extralight italic text-muted-foreground">
                don't reach Gen Z.
              </span>
            </h2>
            <div className="space-y-4 text-muted-foreground font-light text-lg leading-relaxed">
              <div className="flex items-start gap-4">
                <ShieldOff className="h-5 w-5 text-primary/60 mt-1 flex-shrink-0" />
                <p>They use adblock. Pre-rolls get skipped. Banners are invisible.</p>
              </div>
              <div className="flex items-start gap-4">
                <Eye className="h-5 w-5 text-primary/60 mt-1 flex-shrink-0" />
                <p>But they spend 4+ hours daily watching livestreams — fully engaged, fully attentive.</p>
              </div>
            </div>
          </div>

          {/* Solution */}
          <div className="space-y-6">
            <p className="text-xs font-light tracking-[0.3em] text-muted-foreground/60 uppercase">
              The solution
            </p>
            <h2 className="text-3xl lg:text-4xl font-light leading-tight tracking-tight">
              Ads that are{" "}
              <span className="font-extralight italic text-primary/80">
                built into the stream.
              </span>
            </h2>
            <div className="space-y-4 text-muted-foreground font-light text-lg leading-relaxed">
              <div className="flex items-start gap-4">
                <Zap className="h-5 w-5 text-primary/60 mt-1 flex-shrink-0" />
                <p>Native overlay ads that can't be blocked, feel like content, and deliver 3-5x higher engagement than traditional video ads.</p>
              </div>
            </div>
            <Link 
              to="/case-studies" 
              className="inline-flex items-center gap-2 text-sm font-light tracking-wide text-primary hover:text-primary/80 transition-colors duration-200 mt-4"
            >
              See it in action
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
