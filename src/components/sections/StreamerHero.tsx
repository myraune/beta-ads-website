import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const platforms = [
  { src: "/lovable-uploads/platform-twitch.png", alt: "Twitch" },
  { src: "/lovable-uploads/platform-youtube.png", alt: "YouTube" },
  { src: "/lovable-uploads/platform-kick.avif", alt: "Kick" },
];

// Animated earnings counter
const useAnimatedCounter = (target: number, duration = 2000) => {
  const [value, setValue] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(start + (target - start) * eased));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [target, duration]);
  
  return value;
};

export const StreamerHero: React.FC = () => {
  const [showWidget, setShowWidget] = useState(false);
  const [showEarnings, setShowEarnings] = useState(false);
  const earnings = useAnimatedCounter(showEarnings ? 247 : 0, 1500);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowWidget(true), 800);
    const timer2 = setTimeout(() => setShowEarnings(true), 1600);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const scrollToHowItWorks = () => {
    document.getElementById('streamer-experience')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-[90vh] flex items-center relative overflow-hidden">
      {/* Background with streamer GIF */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <img 
          src="/lovable-uploads/streamer-aienia.gif" 
          alt="" 
          className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-auto opacity-[0.08] blur-sm"
        />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text */}
          <div className="max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.05] tracking-tight mb-6"
            >
              Get sponsored
              <br />
              while you stream.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-10"
            >
              Native brand sponsorships for streamers of all sizes. 
              No middlemen. Real brands. Fair payouts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-start gap-4 mb-12"
            >
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-10 py-7 text-base font-medium rounded-xl" 
                onClick={() => window.open("https://beta.streamer.livad.stream/login", "_blank")}
              >
                Apply now
                <ArrowRight className="w-4 h-4" />
              </Button>
              
              <button 
                onClick={scrollToHowItWorks}
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors flex items-center gap-2 py-4"
              >
                See how it works
                <span className="text-xs">↓</span>
              </button>
            </motion.div>

            {/* Platforms */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-center gap-6"
            >
              <span className="text-xs text-muted-foreground/60 uppercase tracking-wider">Works with</span>
              <div className="flex items-center gap-5">
                {platforms.map((platform) => (
                  <img
                    key={platform.alt}
                    src={platform.src}
                    alt={platform.alt}
                    className="h-5 w-auto opacity-40 hover:opacity-70 transition-opacity"
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Animated Stream Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative"
          >
            {/* Mock Stream Container */}
            <div className="relative rounded-xl overflow-hidden bg-[#18181b] shadow-2xl shadow-black/30">
              {/* Stream header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e0e10]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-red-400 text-xs font-bold uppercase">Live</span>
                  <span className="text-white/40 text-xs ml-2">847 viewers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                  <span className="text-white/80 text-sm font-medium">YourChannel</span>
                </div>
              </div>

              {/* Stream video area */}
              <div className="relative aspect-video bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a]">
                {/* Placeholder stream content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 blur-3xl" />
                </div>
                
                {/* Animated Beta Ads Widget */}
                <AnimatePresence>
                  {showWidget && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="absolute bottom-4 left-4 right-4"
                    >
                      <div className="bg-gradient-to-r from-[#1a1a2e]/95 to-[#16213e]/95 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center justify-between border border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white text-sm font-bold">G</span>
                          </div>
                          <div>
                            <span className="text-white text-sm font-semibold block">Glorious</span>
                            <span className="text-white/60 text-xs">Sponsored message</span>
                          </div>
                        </div>
                        <div className="text-primary text-sm font-semibold">
                          !glorious
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Earnings ticker */}
              <AnimatePresence>
                {showEarnings && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between px-4 py-3 bg-[#0e0e10]"
                  >
                    <span className="text-white/60 text-xs uppercase tracking-wider">This month</span>
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-bold text-lg tabular-nums">${earnings}</span>
                      <span className="text-white/40 text-xs">earned</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="absolute -right-4 top-1/3 bg-card/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-border/50 hidden lg:block"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-foreground text-sm font-medium">New offer</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
