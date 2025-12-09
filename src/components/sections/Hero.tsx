import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";

interface HeroProps {
  t: any;
  scrollToSection: (id: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ t }) => {
  return (
    <section className="relative overflow-hidden text-foreground">
    <div className="relative max-w-7xl mx-auto px-8 lg:px-12 py-32 lg:py-40">
      <div className="text-center space-y-12">
        <div className="inline-flex items-center space-x-3">
          <Sparkles className="h-5 w-5 text-gray-300" />
          <Badge className="bg-black/20 text-gray-200 border-gray-500 text-sm px-6 py-3 font-light backdrop-blur-sm tracking-wider">
            {t.heroSubtitle}
          </Badge>
        </div>

        <div className="space-y-8">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              {/* White logo for hero */}
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

          <div className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-extralight tracking-wide">
              {t.heroDescription}
            </p>
            <p className="text-lg md:text-xl text-muted-foreground/70 mt-4 font-extralight">
              {t.heroSubDescription}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
          <Link to="/case-studies">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-lg font-light tracking-wide h-auto border-0 shadow-2xl shadow-primary/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            >
              {t.brandButton}
              <ArrowRight className="ml-3 h-5 w-5" />
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

        <div className="pt-16">
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
  </section>
  );
};