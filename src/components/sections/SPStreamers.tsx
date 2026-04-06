import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const rotatingWords = ["brands", "agencies", "advertisers", "marketers", "studios"];

export const SPStreamers: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [wordIndex, setWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setIsAnimating(false);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      aria-label="Call to action for brands"
    >
      {/* Background glow decoration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="w-[600px] h-[300px] rounded-full bg-primary/5 dark:bg-primary/10 blur-[100px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {/* Glass-style card wrapper for premium feel */}
          <div className="relative mx-auto max-w-3xl p-10 md:p-14">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Built for{" "}
              <span
                className={`text-primary inline-block min-w-[140px] transition-all duration-300 ${
                  isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                }`}
              >
                {rotatingWords[wordIndex]}
              </span>{" "}
              who want to reach Gen Z.
            </h2>

            <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
              Join over 2,000 others and use Beta Ads to grow your streaming ad revenue and drive real results.
            </p>

            <div className="relative inline-block">
              {/* Glow behind CTA */}
              <div className="absolute inset-0 -inset-y-4 flex items-center justify-center pointer-events-none" aria-hidden="true">
                <div className="w-48 h-16 rounded-full bg-primary/15 blur-2xl" />
              </div>
              <Link to="/demo">
                <Button
                  size="lg"
                  className="relative bg-foreground text-background hover:bg-foreground/90 rounded-full h-12 px-8 text-sm font-semibold shadow-lg hover:shadow-xl transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5"
                >
                  Book a Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
