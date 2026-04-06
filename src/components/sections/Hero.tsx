import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { LiveDashboard } from "@/components/sections/LiveDashboard";
import { Typewriter } from "@/components/ui/typewriter";

interface HeroProps {
  t: any;
  scrollToSection: (id: string) => void;
}

const nordicGreetings = ["Hei", "Hej", "Moi"];

export const Hero: React.FC<HeroProps> = ({ t }) => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [greetingVisible, setGreetingVisible] = useState(true);

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

  return (
    <section className="relative text-foreground">
      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12">
        <ContainerScroll
          titleComponent={
            <div className="flex flex-col items-center">
              {/* Rotating Nordic Greeting */}
              <div className="mb-6 h-6 flex items-center justify-center">
                <span
                  className={`text-sm font-light tracking-[0.2em] text-primary/70 transition-opacity duration-400 ${
                    greetingVisible ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {nordicGreetings[greetingIndex]}
                </span>
                <span className="text-sm text-muted-foreground/30 ml-2 font-extralight">
                  — from the Nordics
                </span>
              </div>

              {/* Full Logo — switches for light/dark mode */}
              <img
                src="/lovable-uploads/logo-black.png"
                alt="Beta Ads"
                className="h-8 lg:h-10 w-auto mb-8 dark:hidden block"
              />
              <img
                src="/lovable-uploads/logo-white.png"
                alt="Beta Ads"
                className="h-8 lg:h-10 w-auto mb-8 dark:block hidden"
              />

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight tracking-tight text-foreground mb-6 max-w-2xl">
                Your ads shouldn't be{" "}
                <Typewriter
                  text={["skipped", "blocked", "ignored", "invisible"]}
                  speed={70}
                  className="font-extralight italic text-primary"
                  waitTime={1500}
                  deleteSpeed={40}
                  cursorChar={"_"}
                  cursorClassName="ml-0.5 font-extralight text-primary/50"
                />
                <br />
                <span className="font-extralight italic text-muted-foreground">
                  They should be part of the stream.
                </span>
              </h1>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-md">
                {t.heroDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link to="/demo">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-sm font-light tracking-wide h-auto border-0 shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105"
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
                    className="border-foreground/20 text-foreground/80 hover:text-foreground hover:bg-foreground/10 hover:border-foreground/30 bg-foreground/5 px-8 py-3 text-sm font-light tracking-wide h-auto backdrop-blur-sm transition-all duration-300 shadow-sm shadow-black/5"
                  >
                    {t.streamerButton}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          }
        >
          <LiveDashboard compact />
        </ContainerScroll>
      </div>
    </section>
  );
};
