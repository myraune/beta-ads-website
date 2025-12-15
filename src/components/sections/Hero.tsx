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
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: descRef, isVisible: descVisible } = useScrollAnimation();
  const { ref: buttonsRef, isVisible: buttonsVisible } = useScrollAnimation();
  const { getRevealStyle } = useScrollReveal({ maxOffset: 80, scrollRange: 400 });

  return (
    <section className="relative overflow-hidden text-foreground">
      <div className="relative max-w-[1600px] mx-auto px-4 lg:px-6 pt-16 lg:pt-20 pb-12 lg:pb-16 min-h-[85vh] flex items-center">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-4 lg:gap-8 items-start w-full">
          
          {/* Left Column - Text Content */}
          <div className="space-y-6 text-center lg:text-left order-2 lg:order-1 pt-8 lg:pt-16">
            {/* Title */}
            <div 
              ref={titleRef}
              className={`transition-all duration-1000 ease-out ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <h1 className="text-lg md:text-xl lg:text-2xl font-extralight leading-[1.8] tracking-tight text-foreground/80 max-w-[220px] mx-auto lg:mx-0">
                {t.heroTitle[0]}{" "}
                <span className="font-light italic text-muted-foreground/70">
                  {t.heroTitle[1]}
                </span>
              </h1>
            </div>

            {/* Description - Single short paragraph */}
            <div 
              ref={descRef}
              className={`transition-all duration-1000 delay-150 ease-out ${
                descVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <p className="text-sm text-muted-foreground/60 leading-[2] font-extralight max-w-[200px] mx-auto lg:mx-0">
                {t.heroDescription}
              </p>
            </div>

            {/* Buttons */}
            <div 
              ref={buttonsRef}
              className={`flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2 transition-all duration-1000 delay-300 ease-out ${
                buttonsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
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

          {/* Right Column - Dashboard with Scroll Reveal */}
          <div 
            className="order-1 lg:order-2"
            style={getRevealStyle()}
          >
            <LiveDashboard compact />
          </div>
        </div>
      </div>
    </section>
  );
};