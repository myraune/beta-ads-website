import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface HeroProps {
  t: any;
  scrollToSection: (id: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ t }) => {
  const { ref: badgeRef, isVisible: badgeVisible } = useScrollAnimation();
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: descRef, isVisible: descVisible } = useScrollAnimation();
  const { ref: buttonsRef, isVisible: buttonsVisible } = useScrollAnimation();
  const { ref: videoRef, isVisible: videoVisible } = useScrollAnimation();

  return (
    <section className="relative overflow-hidden text-foreground min-h-screen flex flex-col">
      <div className="relative max-w-7xl mx-auto px-8 lg:px-12 py-32 lg:py-40 flex-1">
        <div className="text-center space-y-12">
          {/* Badge */}
          <div 
            ref={badgeRef}
            className={`inline-flex items-center space-x-3 transition-all duration-700 ${
              badgeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Sparkles className="h-5 w-5 text-gray-300" />
            <Badge className="bg-black/20 text-gray-200 border-gray-500 text-sm px-6 py-3 font-light backdrop-blur-sm tracking-wider">
              {t.heroSubtitle}
            </Badge>
          </div>

          {/* Title and Logo */}
          <div 
            ref={titleRef}
            className={`space-y-8 transition-all duration-700 delay-100 ${
              titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center">
                <img 
                  src="/lovable-uploads/logo-white.png" 
                  alt="Beta Ads" 
                  className="h-10 md:h-12 w-auto transition-all duration-500 hover:scale-110 hover:drop-shadow-lg cursor-pointer"
                />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight leading-[0.9] tracking-tighter text-foreground">
              {t.heroTitle[0]}{" "}
              <span className="font-light italic bg-gradient-to-r from-foreground/80 to-muted-foreground bg-clip-text text-transparent">
                {t.heroTitle[1]}
              </span>
            </h1>
          </div>

          {/* Description */}
          <div 
            ref={descRef}
            className={`max-w-3xl mx-auto transition-all duration-700 delay-200 ${
              descVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-extralight tracking-wide">
              {t.heroDescription}
            </p>
            <p className="text-lg md:text-xl text-muted-foreground/70 mt-4 font-extralight">
              {t.heroSubDescription}
            </p>
          </div>

          {/* Buttons */}
          <div 
            ref={buttonsRef}
            className={`flex flex-col sm:flex-row gap-6 justify-center pt-8 transition-all duration-700 delay-300 ${
              buttonsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Link to="/case-studies">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-lg font-light tracking-wide h-auto border-0 shadow-2xl shadow-primary/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-primary/40"
              >
                {t.brandButton}
                <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <Link to="/streamers">
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-secondary/50 bg-secondary/30 px-10 py-6 text-lg font-light tracking-wide h-auto backdrop-blur-sm transition-all duration-300 hover:border-border/80 hover:scale-105 hover:-translate-y-1"
              >
                {t.streamerButton}
                <ExternalLink className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Video */}
          <div 
            ref={videoRef}
            className={`pt-16 transition-all duration-1000 delay-500 ${
              videoVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
            }`}
          >
            <div className="relative glass-card rounded-3xl p-6 max-w-6xl mx-auto transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:border-border/50 group">
              <div className="aspect-video rounded-2xl overflow-hidden border border-border/30 transition-all duration-300 group-hover:border-border/50">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/P9yEc7v22MI?autoplay=1&mute=1"
                  title="Campaign Grid Overview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="text-center mt-4">
                <p className="text-muted-foreground text-sm font-extralight tracking-wide">{t.campaignOverview}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ScrollIndicator targetId="trusted-by" />
    </section>
  );
};
