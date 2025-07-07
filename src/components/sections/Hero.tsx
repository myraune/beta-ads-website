import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface HeroProps {
  t: any;
  scrollToSection: (id: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ t, scrollToSection, language, setLanguage }) => (
  <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-background dark:via-red-950 dark:to-pink-950 text-foreground">
    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
    
    {/* Language Toggle and Theme Toggle */}
    <div className="absolute top-8 right-8 z-10 flex items-center space-x-4">
      <ThemeToggle />
      <div className="flex items-center space-x-1 bg-white/20 dark:bg-card/20 backdrop-blur-sm rounded-full p-1 border border-white/30 dark:border-border">
        <button
          onClick={() => setLanguage("no")}
            className={`px-4 py-2 rounded-full text-sm font-light transition-all duration-300 ${
              language === "no" 
                ? "bg-white dark:bg-card text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            }`}
        >
          Nor
        </button>
        <button
          onClick={() => setLanguage("en")}
            className={`px-4 py-2 rounded-full text-sm font-light transition-all duration-300 ${
              language === "en" 
                ? "bg-white dark:bg-card text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            }`}
        >
          Eng
        </button>
      </div>
    </div>

    <div className="relative max-w-7xl mx-auto px-8 lg:px-12 py-32 lg:py-40">
      <div className="text-center space-y-12">
        <div className="inline-flex items-center space-x-3">
          <Sparkles className="h-5 w-5 text-muted-foreground" />
          <Badge className="bg-white/20 dark:bg-card/20 text-foreground border border-border text-sm px-6 py-3 font-light backdrop-blur-sm tracking-wider">
            {t.heroSubtitle}
          </Badge>
        </div>

        <div className="space-y-8">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <span className="text-5xl md:text-6xl font-extralight text-foreground tracking-tighter">Beta</span>
              <span className="text-5xl md:text-6xl font-extralight text-red-400 tracking-tighter ml-2">Ads</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight leading-[0.9] tracking-tighter text-foreground">
            {t.heroTitle[0]}{" "}
            <span className="font-light italic bg-gradient-to-r from-foreground/80 to-foreground/60 bg-clip-text text-transparent">
              {t.heroTitle[1]}
            </span>
          </h1>

          <div className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-extralight tracking-wide">
              {t.heroDescription}
            </p>
            <p className="text-lg md:text-xl text-muted-foreground mt-4 font-extralight">
              {t.heroSubDescription}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
          <Button
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 px-10 py-6 text-lg font-light tracking-wide h-auto border-0 shadow-2xl hover:shadow-foreground/20 transition-all duration-300 hover:scale-105"
            onClick={() => scrollToSection("examples")}
          >
            {t.brandButton}
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-border text-foreground hover:bg-secondary bg-white/30 dark:bg-secondary/30 px-10 py-6 text-lg font-light tracking-wide h-auto backdrop-blur-sm transition-all duration-300 hover:border-muted"
            onClick={() => scrollToSection("streamer-section")}
          >
            {t.streamerButton}
            <ExternalLink className="ml-3 h-5 w-5" />
          </Button>
        </div>

        <div className="pt-16">
          <div className="relative bg-gradient-to-r from-white/30 to-white/40 dark:from-card/30 dark:to-secondary/40 rounded-3xl p-6 backdrop-blur-md border border-white/30 dark:border-border shadow-2xl max-w-4xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden border border-white/20 dark:border-border">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/P9yEc7v22MI"
                title="Campaign Grid Overview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="text-center mt-4">
              <p className="text-foreground/70 text-sm font-extralight tracking-wide">Overview of multiple campaigns in action</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);