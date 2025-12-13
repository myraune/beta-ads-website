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
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: descRef, isVisible: descVisible } = useScrollAnimation();
  const { ref: buttonsRef, isVisible: buttonsVisible } = useScrollAnimation();
  const { getParallaxStyle } = useParallax();

  return (
    <section className="relative overflow-hidden text-foreground">
      <div className="relative max-w-[1600px] mx-auto px-4 lg:px-6 pt-16 lg:pt-20 pb-12 lg:pb-16 min-h-[85vh] flex items-center">
      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-4 lg:gap-8 items-center w-full">
          
          {/* Left Column - Text Content */}
          <div className="space-y-5 text-center lg:text-left order-2 lg:order-1">
            {/* Title */}
            <div 
              ref={titleRef}
              className={`transition-all duration-700 ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h1 className="text-xl md:text-2xl lg:text-3xl font-extralight leading-relaxed tracking-tight text-foreground">
                {t.heroTitle[0]}{" "}
                <span className="font-light italic text-muted-foreground">
                  {t.heroTitle[1]}
                </span>
              </h1>
            </div>

            {/* Description */}
            <div 
              ref={descRef}
              className={`space-y-2 transition-all duration-700 delay-100 ${
                descVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="text-sm md:text-base text-muted-foreground leading-loose font-extralight max-w-xs mx-auto lg:mx-0">
                {t.heroDescription}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground/60 font-extralight max-w-xs mx-auto lg:mx-0">
                {t.heroSubDescription}
              </p>
            </div>

            {/* Buttons */}
            <div 
              ref={buttonsRef}
              className={`flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-1 transition-all duration-700 delay-200 ${
                buttonsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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

          {/* Right Column - Dashboard with Parallax */}
          <div 
            className="order-1 lg:order-2"
            style={getParallaxStyle(-0.06)}
          >
            <LiveDashboard compact />
          </div>
        </div>
      </div>
    </section>
  );
};