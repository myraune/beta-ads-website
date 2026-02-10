import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const platforms = [
  { src: "/lovable-uploads/platform-twitch.png", alt: "Twitch" },
  { src: "/lovable-uploads/platform-youtube.png", alt: "YouTube" },
  { src: "/lovable-uploads/platform-kick.avif", alt: "Kick" },
];

export const StreamerHero: React.FC = () => {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  const scrollToHowItWorks = () => {
    document.getElementById('streamer-how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden text-foreground">
      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 pt-24 lg:pt-32 pb-16">
        
        {/* Asymmetric Grid Layout */}
        <div className="grid lg:grid-cols-[38%_62%] gap-6 lg:gap-0 items-center">
          
          {/* Left: Text Content */}
          <div 
            ref={contentRef}
            className={`max-w-md lg:pr-8 transition-all duration-1000 ease-out ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full mb-6">
              <span className="text-primary text-xs font-medium">For Streamers</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight tracking-tight text-foreground mb-6">
              Join the streamer{" "}
              <span className="font-extralight italic text-muted-foreground">
                community.
              </span>
            </h1>

            {/* Description - Clear value prop */}
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              Connect with other streamers, discover brand opportunities, and start earning. Our Discord is where it all begins.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a 
                href="https://discord.gg/tSmM6XMEkn" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 text-sm font-light tracking-wide h-auto border-0 shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105"
                >
                  Join our Discord
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>

              <button
                onClick={scrollToHowItWorks}
                className="text-muted-foreground hover:text-foreground text-sm font-light transition-colors flex items-center gap-2 px-4"
              >
                How it works
                <span className="text-xs">↓</span>
              </button>
            </div>

            {/* Platforms */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground/60 uppercase tracking-wider">Works with</span>
              <div className="flex items-center gap-4">
                {platforms.map((platform) => (
                  <img
                    key={platform.alt}
                    src={platform.src}
                    alt={platform.alt}
                    className="h-5 w-auto opacity-40 hover:opacity-70 transition-opacity"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Dashboard Preview */}
          <div 
            className={`relative lg:-mr-8 xl:-mr-12 transition-all duration-1000 delay-300 ${
              contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            {/* Browser Chrome Frame */}
            <div className="bg-card/5 rounded-xl overflow-hidden shadow-2xl shadow-black/20">
              {/* Browser Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-card/10">
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
                  alt="Beta Ads Streamer Dashboard - Available sponsorships" 
                  className="w-full h-auto block"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
