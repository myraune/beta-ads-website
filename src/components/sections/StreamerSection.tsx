import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";

interface StreamerSectionProps {
  t: any;
  language: string;
}

const platforms = [
  { src: "/lovable-uploads/platform-twitch.png", alt: "Twitch" },
  { src: "/lovable-uploads/platform-youtube.png", alt: "YouTube" },
  { src: "/lovable-uploads/platform-kick.avif", alt: "Kick" },
  { src: "/lovable-uploads/platform-trovo.png", alt: "Trovo" },
];

const brandLogos = [
  { src: "/lovable-uploads/logo-surfshark.png", alt: "Surfshark" },
  { src: "/lovable-uploads/logo-steelseries.png", alt: "SteelSeries" },
  { src: "/lovable-uploads/logo-logitech.png", alt: "Logitech" },
  { src: "/lovable-uploads/logo-foodora.png", alt: "Foodora" },
  { src: "/lovable-uploads/logo-shure.png", alt: "Shure" },
];

const processSteps = [
  { number: "1", label: "Connect your stream" },
  { number: "2", label: "Accept sponsorships" },
  { number: "3", label: "Get paid monthly" },
];

export const StreamerSection: React.FC<StreamerSectionProps> = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1
  });
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2
  });
  const { ref: dashboardRef, isVisible: dashboardVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1
  });
  const { ref: brandsRef, isVisible: brandsVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2
  });
  const { ref: processRef, isVisible: processVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2
  });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2
  });

  const { displayValue: earningsValue } = useCountUp(2400000, statsVisible, { duration: 2000 });

  return (
    <div className="relative overflow-hidden">
      {/* Section 1: Clean Hero */}
      <section className="min-h-[85vh] flex items-center justify-center relative pt-16 pb-12">
        {/* Subtle aurora glow */}
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 opacity-40">
          <div className="absolute inset-0 bg-gradient-radial from-primary/15 via-transparent to-transparent blur-3xl" />
        </div>
        
        <div 
          ref={heroRef} 
          className="max-w-4xl mx-auto px-4 lg:px-8 text-center relative z-10"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight mb-6"
          >
            Get paid to stream.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Stream on Twitch, YouTube, or Kick and earn from sponsorships. 
            No minimum followers required.
          </motion.p>

          {/* Platform logos */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={heroVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center justify-center gap-6 md:gap-8 mb-12"
          >
            {platforms.map((platform) => (
              <img
                key={platform.alt}
                src={platform.src}
                alt={platform.alt}
                className="h-6 md:h-8 w-auto opacity-50 hover:opacity-80 transition-opacity duration-200"
              />
            ))}
          </motion.div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-8 py-6 text-base font-medium" 
              onClick={() => window.open("https://beta.streamer.livad.stream/login", "_blank")}
            >
              Start Earning
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Stats Strip */}
      <section className="py-16 lg:py-20 border-y border-border/20">
        <div 
          ref={statsRef}
          className="max-w-4xl mx-auto px-4 lg:px-8"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={statsVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-3 gap-8 md:gap-16 text-center"
          >
            <div>
              <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary block mb-2">
                ${earningsValue}+
              </span>
              <span className="text-sm md:text-base text-muted-foreground">
                paid to streamers
              </span>
            </div>
            <div>
              <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground block mb-2">
                0
              </span>
              <span className="text-sm md:text-base text-muted-foreground">
                minimum followers
              </span>
            </div>
            <div>
              <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground block mb-2">
                30
              </span>
              <span className="text-sm md:text-base text-muted-foreground">
                days to payout
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Dashboard Preview */}
      <section className="py-20 lg:py-28">
        <div 
          ref={dashboardRef}
          className="max-w-6xl mx-auto px-4 lg:px-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={dashboardVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground">
              Accept sponsorships in seconds.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={dashboardVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="relative"
          >
            {/* Browser Chrome Frame */}
            <div className="bg-card/20 backdrop-blur-sm border border-border/30 rounded-xl overflow-hidden shadow-2xl">
              {/* Browser Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-card/30 border-b border-border/20">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-primary/40" />
                  <div className="w-3 h-3 rounded-full bg-accent/60" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-muted/20 rounded-md px-4 py-1 text-xs text-muted-foreground/70 font-mono">
                    beta.streamer.livad.stream
                  </div>
                </div>
              </div>
              
              {/* Dashboard Screenshot */}
              <img 
                src="/lovable-uploads/streamer-dashboard-sponsors.png" 
                alt="Beta Ads Streamer Dashboard" 
                className="w-full"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Brand Logos */}
      <section className="py-16 lg:py-20">
        <div 
          ref={brandsRef}
          className="max-w-4xl mx-auto px-4 lg:px-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={brandsVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-muted-foreground text-sm md:text-base mb-8">
              Earn from 100+ brands
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {brandLogos.map((logo) => (
                <img 
                  key={logo.alt}
                  src={logo.src} 
                  alt={logo.alt} 
                  className="h-6 md:h-8 w-auto opacity-50 hover:opacity-80 transition-opacity duration-200 grayscale hover:grayscale-0" 
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 5: How It Works */}
      <section className="py-16 lg:py-24 border-t border-border/20">
        <div 
          ref={processRef}
          className="max-w-3xl mx-auto px-4 lg:px-8"
        >
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={processVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-lg md:text-xl font-medium text-muted-foreground text-center mb-12"
          >
            How it works
          </motion.h3>

          <motion.div
            initial={{ opacity: 0 }}
            animate={processVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid grid-cols-3 gap-4 md:gap-8 text-center"
          >
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={processVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <span className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  {step.number}
                </span>
                <span className="text-sm md:text-base text-muted-foreground">
                  {step.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Simple line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={processVisible ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="hidden md:block w-full max-w-md mx-auto border-t border-border/30 mt-12"
          />
        </div>
      </section>

      {/* Section 6: CTA */}
      <section className="py-20 lg:py-28">
        <div 
          ref={ctaRef} 
          className="max-w-2xl mx-auto px-4 lg:px-8 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={ctaVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-8"
          >
            Ready to start earning?
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={ctaVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-10 py-6 text-base font-medium" 
              onClick={() => window.open("https://beta.streamer.livad.stream/login", "_blank")}
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </Button>
            
            <button 
              className="text-muted-foreground hover:text-foreground text-sm underline underline-offset-4 transition-colors" 
              onClick={() => window.open("https://beta.streamer.livad.stream/login", "_blank")}
            >
              Already a member? Sign in
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
