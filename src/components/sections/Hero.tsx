import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { LiveDashboard } from "@/components/sections/LiveDashboard";

interface HeroProps {
  t: any;
  scrollToSection: (id: string) => void;
}

const nordicGreetings = ["Hei", "Hej", "Moi"];
const rotatingWords = ["skipped", "blocked", "ignored", "invisible"];

export const Hero: React.FC<HeroProps> = ({ t }) => {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [greetingVisible, setGreetingVisible] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingVisible(false);
      setTimeout(() => {
        setGreetingIndex((prev) => (prev + 1) % nordicGreetings.length);
        setGreetingVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setWordVisible(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden text-foreground">
      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 pt-24 lg:pt-32 pb-16">
        
        <div className="grid lg:grid-cols-[38%_62%] gap-6 lg:gap-0 items-center">
          
          <div 
            ref={contentRef}
            className={`max-w-md lg:pr-8 transition-all duration-1000 ease-out ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Rotating Nordic Greeting */}
            <div className="mb-6 h-6 flex items-center">
              <span 
                className={`text-sm font-light tracking-[0.2em] text-primary/70 transition-opacity duration-400 ${
                  greetingVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {nordicGreetings[greetingIndex]}
              </span>
              <span className="text-sm text-muted-foreground/30 ml-2 font-extralight">
                — from the Nordics
              </span>
            </div>

            {/* Full Logo */}
            <img 
              src="/lovable-uploads/logo-white.png" 
              alt="Beta Ads"
              className="h-8 lg:h-10 w-auto mb-8"
            />

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight tracking-tight text-foreground mb-6">
              Your ads shouldn't be{" "}
              <span className="relative inline-block min-w-[120px]">
                <span 
                  className={`font-extralight italic text-primary transition-all duration-300 ${
                    wordVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                  }`}
                >
                  {rotatingWords[wordIndex]}
                </span>
              </span>
              <br />
              <span className="font-extralight italic text-muted-foreground">
                They should be part of the stream.
              </span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              {t.heroDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/demo">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 text-sm font-light tracking-wide h-auto border-0 shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105"
                >
                  {t.brandButton}
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
                  className="text-muted-foreground hover:text-foreground hover:bg-secondary/30 bg-muted/20 px-6 py-2.5 text-sm font-light tracking-wide h-auto backdrop-blur-sm transition-all duration-300 shadow-sm shadow-black/5"
                >
                  {t.streamerButton}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>

          <div 
            className={`relative lg:-mr-8 xl:-mr-12 transition-all duration-1000 delay-300 ${
              contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <LiveDashboard compact />
          </div>
        </div>
      </div>
    </section>
  );
};
