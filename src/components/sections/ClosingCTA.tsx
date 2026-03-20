import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const ClosingCTA: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className={`py-24 lg:py-32 transition-[opacity,transform] duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
        <p className="text-xs font-light tracking-[0.3em] text-primary/70 uppercase mb-6">
          Ready to start?
        </p>
        <h2 className="text-3xl lg:text-5xl font-light leading-tight tracking-tight text-foreground mb-6">
          Your brand belongs{" "}
          <span className="font-extralight italic text-primary/80">
            in the stream.
          </span>
        </h2>
        <p className="text-muted-foreground text-lg font-light leading-relaxed max-w-lg mx-auto mb-10">
          Book a 15-minute demo and we'll show you exactly how your campaign
          would look live on Twitch.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/demo">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-sm font-light tracking-wide h-auto shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105"
            >
              Book a Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <a
            href="https://calendar.app.google/coW5NLQJtLxfRer19"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              variant="outline"
              className="border-foreground/20 text-foreground/80 hover:text-foreground hover:bg-foreground/10 hover:border-foreground/30 bg-foreground/5 px-8 py-3 text-sm font-light tracking-wide h-auto backdrop-blur-sm transition-all duration-300 shadow-sm shadow-black/5"
            >
              Schedule a Call
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
