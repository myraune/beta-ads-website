import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useParallax } from "@/hooks/useParallax";
import { LiveDashboard } from "@/components/sections/LiveDashboard";

interface HeroProps {
  t: any;
  scrollToSection: (id: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ t }) => {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const { getParallaxStyle } = useParallax();

  return (
    <section className="relative overflow-hidden text-foreground">
      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 pt-24 lg:pt-32 pb-16">
        
        {/* Asymmetric Grid Layout - Tighter split */}
        <div className="grid lg:grid-cols-[38%_62%] gap-6 lg:gap-0 items-center">
          
          {/* Left: Text Content - Tighter, more intentional */}
          <div 
            ref={contentRef}
            className={`max-w-md lg:pr-8 transition-all duration-1000 ease-out ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Full Logo */}
            <img 
              src="/lovable-uploads/logo-white.png" 
              alt="Beta Ads"
              className="h-8 lg:h-10 w-auto mb-8"
            />

            {/* Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight tracking-tight text-foreground mb-6">
              {t.heroTitle[0]}{" "}
              <span className="font-extralight italic text-muted-foreground">
                {t.heroTitle[1]}
              </span>
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              {t.heroDescription}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
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

          {/* Right: Dashboard Preview - Subtle extension, with parallax */}
          <div 
            className={`relative lg:-mr-8 xl:-mr-12 transition-all duration-1000 delay-300 ${
              contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
            style={getParallaxStyle(-0.08)}
          >
            <LiveDashboard compact />
          </div>
        </div>
      </div>
    </section>
  );
};
