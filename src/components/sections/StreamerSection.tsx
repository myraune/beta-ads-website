import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Monitor, MousePointerClick, Wallet } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { useMouseParallax } from "@/hooks/useMouseParallax";

interface StreamerSectionProps {
  t: any;
  language: string;
}

const heroWords = ["STREAM.", "EARN.", "REPEAT."];

const processSteps = [
  { number: "1", icon: Monitor, label: "Connect your stream" },
  { number: "2", icon: MousePointerClick, label: "Accept sponsorships" },
  { number: "3", icon: Wallet, label: "Get paid monthly" },
];

export const StreamerSection: React.FC<StreamerSectionProps> = ({
  t,
  language
}) => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1
  });
  const { ref: bentoRef, isVisible: bentoVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1
  });
  const { ref: dashboardRef, isVisible: dashboardVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1
  });
  const { ref: processRef, isVisible: processVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1
  });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1
  });

  const { containerRef, getParallaxStyle } = useMouseParallax(15);
  const { displayValue: earningsValue } = useCountUp(2400000, bentoVisible, { duration: 2500 });

  // Floating notification animation
  const [showNotification, setShowNotification] = useState(false);
  useEffect(() => {
    if (dashboardVisible) {
      const timer = setTimeout(() => setShowNotification(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [dashboardVisible]);

  return (
    <div className="relative overflow-hidden">
      {/* Section 1: Full-Screen Neobrutalist Hero */}
      <section className="min-h-screen flex items-center justify-center relative pt-20 pb-16">
        {/* Aurora glow effect */}
        <div className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-3xl" />
        </div>
        
        <div 
          ref={heroRef} 
          className="max-w-7xl mx-auto px-4 lg:px-8 text-center relative z-10"
        >
          {/* Stacked Typography */}
          <div className="mb-12">
            {heroWords.map((word, index) => (
              <motion.h1
                key={word}
                initial={{ opacity: 0, y: 60 }}
                animate={heroVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  delay: index * 0.15, 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold text-foreground leading-[0.9] tracking-tighter"
                style={{
                  textShadow: '4px 4px 0px hsl(var(--primary))'
                }}
              >
                {word}
              </motion.h1>
            ))}
          </div>

          {/* Platform logos floating */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={heroVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-12"
          >
            {[
              { src: "/lovable-uploads/platform-twitch.png", alt: "Twitch", height: "h-7 md:h-9" },
              { src: "/lovable-uploads/platform-youtube.png", alt: "YouTube", height: "h-8 md:h-10" },
              { src: "/lovable-uploads/platform-kick.avif", alt: "Kick", height: "h-7 md:h-9" },
              { src: "/lovable-uploads/platform-trovo.png", alt: "Trovo", height: "h-7 md:h-9" },
            ].map((platform, i) => (
              <motion.img
                key={platform.alt}
                src={platform.src}
                alt={platform.alt}
                className={`${platform.height} w-auto opacity-60 hover:opacity-100 transition-opacity duration-300`}
                initial={{ y: 20, opacity: 0 }}
                animate={heroVisible ? { y: 0, opacity: 0.6 } : {}}
                transition={{ delay: 0.8 + i * 0.1 }}
                whileHover={{ scale: 1.1, opacity: 1 }}
              />
            ))}
          </motion.div>

          {/* CTA Button with hard border */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-10 py-7 text-lg font-semibold border-2 border-foreground shadow-[4px_4px_0px_hsl(var(--foreground))] hover:shadow-[2px_2px_0px_hsl(var(--foreground))] hover:translate-x-[2px] hover:translate-y-[2px] transition-all" 
              onClick={() => window.open("https://beta.streamer.livad.stream/login", "_blank")}
            >
              Join Beta Ads
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Bento Grid - Value Proposition */}
      <section className="py-16 lg:py-24">
        <div 
          ref={bentoRef}
          className="max-w-6xl mx-auto px-4 lg:px-8"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={bentoVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          >
            {/* Earnings Counter - Large cell */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={bentoVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="col-span-2 md:col-span-1 md:row-span-2 bg-card/40 backdrop-blur-sm border-2 border-border/60 rounded-2xl p-6 md:p-8 flex flex-col justify-center hover:shadow-[8px_8px_0px_hsl(var(--primary))] transition-shadow duration-300"
            >
              <span className="text-muted-foreground text-sm font-medium tracking-wider uppercase mb-2">
                Paid to streamers
              </span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
                ${earningsValue}+
              </span>
              <span className="text-muted-foreground text-sm mt-2">and counting</span>
            </motion.div>

            {/* Brands Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={bentoVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="col-span-2 bg-card/40 backdrop-blur-sm border-2 border-border/60 rounded-2xl p-6 hover:shadow-[8px_8px_0px_hsl(var(--primary))] transition-shadow duration-300"
            >
              <span className="text-muted-foreground text-sm font-medium tracking-wider uppercase mb-4 block">
                100+ Brands Available
              </span>
              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                {[
                  { src: "/lovable-uploads/logo-surfshark.png", alt: "Surfshark" },
                  { src: "/lovable-uploads/logo-steelseries.png", alt: "SteelSeries" },
                  { src: "/lovable-uploads/logo-logitech.png", alt: "Logitech" },
                  { src: "/lovable-uploads/logo-foodora.png", alt: "Foodora" },
                  { src: "/lovable-uploads/logo-shure.png", alt: "Shure" },
                ].map((logo) => (
                  <img 
                    key={logo.alt}
                    src={logo.src} 
                    alt={logo.alt} 
                    className="h-6 md:h-8 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" 
                  />
                ))}
              </div>
            </motion.div>

            {/* No Minimum Followers */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={bentoVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="bg-card/40 backdrop-blur-sm border-2 border-border/60 rounded-2xl p-6 hover:shadow-[8px_8px_0px_hsl(var(--primary))] transition-shadow duration-300"
            >
              <span className="text-3xl md:text-4xl font-bold text-foreground">0</span>
              <span className="text-muted-foreground text-sm block mt-1">minimum followers</span>
            </motion.div>

            {/* Paid Within 30 Days */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={bentoVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="bg-card/40 backdrop-blur-sm border-2 border-border/60 rounded-2xl p-6 hover:shadow-[8px_8px_0px_hsl(var(--primary))] transition-shadow duration-300"
            >
              <span className="text-3xl md:text-4xl font-bold text-foreground">30</span>
              <span className="text-muted-foreground text-sm block mt-1">days to payout</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Immersive Dashboard Preview */}
      <section className="py-16 lg:py-24">
        <div 
          ref={dashboardRef}
          className="max-w-7xl mx-auto px-4 lg:px-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={dashboardVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Your command center
            </h2>
            <p className="text-muted-foreground text-lg">
              Accept sponsorships. Track earnings. Get paid monthly.
            </p>
          </motion.div>

          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={dashboardVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
            style={{
              perspective: '1200px',
            }}
          >
            {/* Browser Chrome Frame */}
            <div 
              className="bg-card/30 backdrop-blur-md border-2 border-border/50 rounded-2xl overflow-hidden shadow-2xl"
              style={{
                ...getParallaxStyle(0.3),
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Browser Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-card/50 border-b border-border/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-primary/60" />
                  <div className="w-3 h-3 rounded-full bg-accent/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-muted/30 rounded-md px-4 py-1 text-xs text-muted-foreground font-mono">
                    beta.streamer.livad.stream
                  </div>
                </div>
              </div>
              
              {/* Dashboard Screenshot */}
              <div className="relative">
                <img 
                  src="/lovable-uploads/streamer-dashboard-sponsors.png" 
                  alt="Beta Ads Streamer Dashboard" 
                  className="w-full"
                  loading="lazy"
                />
                
                {/* Floating Notification */}
                <motion.div
                  initial={{ opacity: 0, x: 50, y: -20 }}
                  animate={showNotification ? { opacity: 1, x: 0, y: 0 } : {}}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="absolute top-4 right-4 md:top-8 md:right-8 bg-card/90 backdrop-blur-sm border-2 border-primary/50 rounded-xl px-4 py-3 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-sm font-medium text-foreground">+$50 from Surfshark</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Three-Step Horizontal Process */}
      <section className="py-16 lg:py-24">
        <div 
          ref={processRef}
          className="max-w-4xl mx-auto px-4 lg:px-8"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={processVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4"
          >
            {processSteps.map((step, index) => (
              <React.Fragment key={step.number}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={processVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.2 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Number Circle with Hard Border */}
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-foreground flex items-center justify-center mb-4 shadow-[4px_4px_0px_hsl(var(--primary))]">
                    <step.icon className="w-7 h-7 md:w-8 md:h-8 text-foreground" />
                  </div>
                  <span className="text-2xl md:text-3xl font-bold text-foreground mb-2">{step.number}</span>
                  <span className="text-muted-foreground text-sm md:text-base max-w-[140px]">{step.label}</span>
                </motion.div>

                {/* Connecting Line */}
                {index < processSteps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={processVisible ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                    className="hidden md:block w-24 lg:w-32 border-t-2 border-dashed border-muted-foreground/40 origin-left"
                  />
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 5: Neobrutalist CTA */}
      <section className="py-20 lg:py-28">
        <div 
          ref={ctaRef} 
          className="max-w-3xl mx-auto px-4 lg:px-8 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={ctaVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-10"
            style={{
              textShadow: '3px 3px 0px hsl(var(--primary))'
            }}
          >
            Ready to earn?
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={ctaVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-foreground text-primary-foreground hover:text-background gap-2 px-12 py-7 text-lg font-bold border-4 border-foreground shadow-[6px_6px_0px_hsl(var(--foreground))] hover:shadow-[3px_3px_0px_hsl(var(--foreground))] hover:translate-x-[3px] hover:translate-y-[3px] transition-all" 
              onClick={() => window.open("https://beta.streamer.livad.stream/login", "_blank")}
            >
              Join Beta Ads
              <ArrowRight className="w-5 h-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="lg" 
              className="text-muted-foreground hover:text-foreground gap-2 px-8 py-7 text-lg underline underline-offset-4 decoration-2 hover:decoration-primary transition-colors" 
              onClick={() => window.open("https://discord.gg/betaads", "_blank")}
            >
              Join Discord
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
