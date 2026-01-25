import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Gift, Wallet } from "lucide-react";

interface StreamerSectionProps {
  t: any;
  language: string;
}

const platforms = [
  { src: "/lovable-uploads/platform-twitch.png", alt: "Twitch", name: "Twitch" },
  { src: "/lovable-uploads/platform-youtube.png", alt: "YouTube", name: "YouTube" },
  { src: "/lovable-uploads/platform-kick.avif", alt: "Kick", name: "Kick" },
];

const brandLogos = [
  { src: "/lovable-uploads/logo-surfshark.png", alt: "Surfshark" },
  { src: "/lovable-uploads/logo-logitech.png", alt: "Logitech" },
  { src: "/lovable-uploads/logo-foodora.png", alt: "Foodora" },
  { src: "/lovable-uploads/logo-shure.png", alt: "Shure" },
  { src: "/lovable-uploads/logo-glorious.png", alt: "Glorious" },
];

const valueProps = [
  {
    icon: Zap,
    title: "No minimum followers 🌱",
    description: "Start earning from day one. We work with streamers of all sizes. 💪",
  },
  {
    icon: Gift,
    title: "Brands come to you 🎁",
    description: "Browse and accept sponsorship offers directly from your dashboard. Easy peasy. ✌️",
  },
  {
    icon: Wallet,
    title: "Get paid monthly 💰",
    description: "Simple, transparent payouts. No complicated contracts. 🤝",
  },
];

const processSteps = [
  { 
    number: "1", 
    title: "Connect your stream 🔗",
    description: "Link your Twitch, YouTube, or Kick account in seconds."
  },
  { 
    number: "2", 
    title: "Accept sponsorships ✅",
    description: "Browse real offers from brands and choose what fits your stream."
  },
  { 
    number: "3", 
    title: "Earn 💸",
    description: "Get paid monthly for running native ads during your streams."
  },
];

const scrollToHowItWorks = () => {
  const element = document.getElementById('how-it-works');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const StreamerSection: React.FC<StreamerSectionProps> = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section: Full Width, Asymmetric 40/60 Layout */}
      <section className="min-h-screen flex items-center relative py-12 lg:py-0">
        {/* Subtle background glow */}
        <div className="absolute top-1/3 right-1/4 w-[800px] h-[800px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-radial from-primary/15 via-transparent to-transparent blur-3xl" />
        </div>
        
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 w-full">
          <div className="grid lg:grid-cols-[40%_60%] gap-8 lg:gap-0 items-center">
            {/* Left: Text Content */}
            <div className="max-w-lg lg:pr-12">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight mb-6"
              >
                Micro sponsorships for streamers of all sizes. ✨
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-lg text-muted-foreground leading-relaxed mb-8"
              >
                Beta Ads helps smaller streamers earn from brand partnerships early. 
                Simple sponsorships. Fair payouts. Built to grow with you. 🚀
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex flex-col sm:flex-row items-start gap-4 mb-10"
              >
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-8 py-6 text-base font-medium rounded-xl" 
                  onClick={() => window.open("https://beta.streamer.livad.stream/login", "_blank")}
                >
                  Easy apply 🎮
                  <ArrowRight className="w-4 h-4" />
                </Button>
                
                <button 
                  onClick={scrollToHowItWorks}
                  className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors flex items-center gap-2 py-3"
                >
                  How it works
                  <span className="text-xs">↓</span>
                </button>
              </motion.div>

              {/* Platform logos inline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex items-center gap-6"
              >
                <span className="text-xs text-muted-foreground/60 uppercase tracking-wider">Available on</span>
                <div className="flex items-center gap-5">
                  {platforms.map((platform) => (
                    <img
                      key={platform.alt}
                      src={platform.src}
                      alt={platform.alt}
                      className="h-6 w-auto opacity-50 hover:opacity-80 transition-opacity"
                    />
                  ))}
                </div>
              </motion.div>
            </div>
            
            {/* Right: Dashboard Preview - 60% width */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:-mr-12 relative"
            >
              {/* Browser Chrome Frame */}
              <div className="bg-card/5 border border-border/20 rounded-xl overflow-hidden shadow-2xl">
                {/* Browser Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-card/10 border-b border-border/10">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="bg-muted/10 rounded-md px-4 py-1 text-xs text-muted-foreground/40 font-mono">
                      beta.streamer.livad.stream
                    </div>
                  </div>
                </div>
                
                {/* Dashboard Screenshot */}
                <div className="bg-muted/5 min-h-[300px] lg:min-h-[400px]">
                  <img 
                    src="/lovable-uploads/streamer-brands-grid.png" 
                    alt="Beta Ads Streamer Dashboard" 
                    className="w-full h-auto block"
                    loading="eager"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Propositions: Full Width Cards */}
      <section className="py-16 lg:py-24 border-t border-border/10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-12 lg:mb-16"
          >
            Built for your growth journey 🌟
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {valueProps.map((prop, index) => (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-card/5 border border-border/15 rounded-xl p-8 lg:p-10 hover:bg-card/10 hover:border-border/25 transition-all duration-300"
              >
                <prop.icon className="w-8 h-8 text-primary mb-5" strokeWidth={1.5} />
                <h3 className="text-xl font-semibold text-foreground mb-3">{prop.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{prop.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Partners: Full Width */}
      <section className="py-16 lg:py-20 border-t border-border/10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-muted-foreground text-sm mb-10 uppercase tracking-wider">
              Partner with brands you know 🤝
            </p>
            <div className="flex flex-wrap items-center gap-10 lg:gap-16">
              {brandLogos.map((logo) => (
                <img 
                  key={logo.alt}
                  src={logo.src} 
                  alt={logo.alt} 
                  className="h-7 lg:h-9 w-auto opacity-40 hover:opacity-70 transition-opacity duration-200" 
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works: Full Width Visual Cards */}
      <section id="how-it-works" className="py-20 lg:py-28 border-t border-border/10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-12 lg:mb-16"
          >
            How it works ⚡
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-card/5 border border-border/15 rounded-xl p-8 lg:p-10"
              >
                <span className="text-5xl lg:text-6xl font-bold text-primary/30 mb-4 block">
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA: Full Width, Two Column */}
      <section className="py-20 lg:py-28 border-t border-border/10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="max-w-xl"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Ready to start earning? 🎉
              </h2>
              <p className="text-lg text-muted-foreground">
                Join streamers across the Nordics earning from brand sponsorships. Let's gooo! 🙌
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="flex flex-col items-start lg:items-end gap-4"
            >
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-10 py-6 text-base font-medium rounded-xl" 
                onClick={() => window.open("https://beta.streamer.livad.stream/login", "_blank")}
              >
                Easy apply 🎮
                <ArrowRight className="w-4 h-4" />
              </Button>
              
              <button 
                className="text-muted-foreground hover:text-foreground text-sm transition-colors" 
                onClick={() => window.open("https://beta.streamer.livad.stream/login", "_blank")}
              >
                Already a member? Sign in 👋
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
