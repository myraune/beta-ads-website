import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface StreamerSectionProps {
  t: any;
  language: string;
}

const platforms = [
  { src: "/lovable-uploads/platform-twitch.png", alt: "Twitch", name: "Twitch" },
  { src: "/lovable-uploads/platform-youtube.png", alt: "YouTube", name: "YouTube Live" },
  { src: "/lovable-uploads/platform-kick.avif", alt: "Kick", name: "Kick" },
];

const brandLogos = [
  { src: "/lovable-uploads/logo-surfshark.png", alt: "Surfshark" },
  { src: "/lovable-uploads/logo-logitech.png", alt: "Logitech" },
  { src: "/lovable-uploads/logo-foodora.png", alt: "Foodora" },
  { src: "/lovable-uploads/logo-shure.png", alt: "Shure" },
];

const processSteps = [
  { number: "1", label: "Connect your stream" },
  { number: "2", label: "Accept sponsorships" },
  { number: "3", label: "Earn" },
];

export const StreamerSection: React.FC<StreamerSectionProps> = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1
  });
  const { ref: platformsRef, isVisible: platformsVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2
  });
  const { ref: growthRef, isVisible: growthVisible } = useScrollAnimation<HTMLDivElement>({
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

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Section 1: Clean Hero */}
      <section className="min-h-[80vh] flex items-center justify-center relative pt-20 pb-16">
        {/* Subtle aurora glow - reduced intensity */}
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 opacity-25">
          <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent blur-3xl" />
        </div>
        
        <div 
          ref={heroRef} 
          className="max-w-3xl mx-auto px-4 lg:px-8 text-center relative z-10"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground leading-tight tracking-tight mb-6"
          >
            Micro sponsorships for streamers of all sizes.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 space-y-2"
          >
            <p>
              Beta Ads helps smaller streamers earn from brand partnerships early.
            </p>
            <p>
              Simple sponsorships. Fair payouts. Built to grow with you.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-8 py-6 text-base font-medium rounded-xl" 
              onClick={() => window.open("https://beta.streamer.livad.stream/login", "_blank")}
            >
              Easy apply
              <ArrowRight className="w-4 h-4" />
            </Button>
            
            <button 
              onClick={scrollToHowItWorks}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors flex items-center gap-1"
            >
              How it works
              <span className="text-xs">↓</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Available Platforms */}
      <section className="py-16 lg:py-20">
        <div 
          ref={platformsRef}
          className="max-w-2xl mx-auto px-4 lg:px-8 text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={platformsVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="text-base md:text-lg text-muted-foreground font-medium mb-8"
          >
            Available for streamers on
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={platformsVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="flex items-center justify-center gap-10 md:gap-14"
          >
            {platforms.map((platform) => (
              <div key={platform.alt} className="flex flex-col items-center gap-2">
                <img
                  src={platform.src}
                  alt={platform.alt}
                  className="h-8 md:h-10 w-auto opacity-70 hover:opacity-100 transition-opacity duration-200"
                />
                <span className="text-xs text-muted-foreground/70">{platform.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 3: Built for Your Growth */}
      <section className="py-20 lg:py-28">
        <div 
          ref={growthRef}
          className="max-w-2xl mx-auto px-4 lg:px-8 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={growthVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-2xl md:text-3xl font-semibold text-foreground mb-6"
          >
            Built for your growth journey
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={growthVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            You don't need thousands of followers to earn from sponsorships. 
            Beta Ads connects smaller streamers with brands looking for authentic partnerships. 
            We believe in supporting creators early, not just when they've already made it.
          </motion.p>
        </div>
      </section>

      {/* Section 4: Dashboard Preview */}
      <section className="py-20 lg:py-28">
        <div 
          ref={dashboardRef}
          className="max-w-5xl mx-auto px-4 lg:px-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={dashboardVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              See available sponsorships
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={dashboardVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="relative"
          >
            {/* Browser Chrome Frame */}
            <div className="bg-card/10 border border-border/20 rounded-xl overflow-hidden shadow-xl">
              {/* Browser Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-card/20 border-b border-border/10">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-muted/10 rounded-md px-4 py-1 text-xs text-muted-foreground/50 font-mono">
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

      {/* Section 5: Brand Logos */}
      <section className="py-16 lg:py-20">
        <div 
          ref={brandsRef}
          className="max-w-3xl mx-auto px-4 lg:px-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={brandsVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <p className="text-muted-foreground text-sm md:text-base mb-8">
              Partner with brands you know
            </p>
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
              {brandLogos.map((logo) => (
                <img 
                  key={logo.alt}
                  src={logo.src} 
                  alt={logo.alt} 
                  className="h-5 md:h-6 w-auto opacity-40 hover:opacity-70 transition-opacity duration-200" 
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 6: How It Works */}
      <section id="how-it-works" className="py-20 lg:py-28 border-t border-border/10">
        <div 
          ref={processRef}
          className="max-w-2xl mx-auto px-4 lg:px-8"
        >
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            animate={processVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-lg md:text-xl font-medium text-muted-foreground text-center mb-14"
          >
            How it works
          </motion.h3>

          <motion.div
            initial={{ opacity: 0 }}
            animate={processVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="grid grid-cols-3 gap-4 md:gap-8 text-center"
          >
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                animate={processVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + index * 0.08, duration: 0.4 }}
                className="flex flex-col items-center"
              >
                <span className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
                  {step.number}
                </span>
                <span className="text-sm md:text-base text-muted-foreground">
                  {step.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 7: Final CTA */}
      <section className="py-20 lg:py-28">
        <div 
          ref={ctaRef} 
          className="max-w-xl mx-auto px-4 lg:px-8 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={ctaVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-2xl md:text-3xl font-semibold text-foreground mb-8"
          >
            Start earning as a streamer
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={ctaVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="flex flex-col items-center gap-5"
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-10 py-6 text-base font-medium rounded-xl" 
              onClick={() => window.open("https://beta.streamer.livad.stream/login", "_blank")}
            >
              Easy apply
              <ArrowRight className="w-4 h-4" />
            </Button>
            
            <button 
              className="text-muted-foreground hover:text-foreground text-sm transition-colors" 
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
