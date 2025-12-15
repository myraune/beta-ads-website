import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { LiveDashboard } from "@/components/sections/LiveDashboard";

interface HeroProps {
  t: any;
  scrollToSection: (id: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ t }) => {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const { getRevealStyle } = useScrollReveal({ maxOffset: 350, scrollRange: 500 });

  return (
    <section className="relative overflow-hidden text-foreground min-h-screen">
      <div className="relative max-w-[1400px] mx-auto px-4 lg:px-6 pt-24 lg:pt-32">
        
        {/* Text Content - Centered at top */}
        <div 
          ref={contentRef}
          className={`text-center max-w-md mx-auto mb-12 transition-all duration-1000 ease-out ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Headline */}
          <h1 className="text-xl md:text-2xl font-extralight leading-relaxed tracking-tight text-foreground/70 mb-6">
            {t.heroTitle[0]}{" "}
            <span className="font-light italic text-muted-foreground/50">
              {t.heroTitle[1]}
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm text-muted-foreground/50 leading-loose font-extralight mb-8">
            {t.heroDescription}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/case-studies">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 text-sm font-light tracking-wide h-auto border-0 shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105"
              >
                {t.brandButton}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link to="/streamers">
              <Button
                size="lg"
                variant="outline"
                className="border-border/50 text-muted-foreground hover:text-foreground hover:bg-secondary/30 bg-transparent px-6 py-2.5 text-sm font-light tracking-wide h-auto backdrop-blur-sm transition-all duration-300"
              >
                {t.streamerButton}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Preview - Slides up on scroll */}
        <div 
          className="max-w-5xl mx-auto"
          style={getRevealStyle()}
        >
          <LiveDashboard compact />
        </div>
      </div>
    </section>
  );
};
