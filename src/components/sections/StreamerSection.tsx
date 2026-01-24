import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Twitch, Youtube, MonitorPlay, Wallet } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
interface StreamerSectionProps {
  t: any;
  language: string;
}
export const StreamerSection: React.FC<StreamerSectionProps> = ({
  t,
  language
}) => {
  const {
    ref: heroRef,
    isVisible: heroVisible
  } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1
  });
  const {
    ref: dashboardRef,
    isVisible: dashboardVisible
  } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1
  });
  const {
    ref: brandsRef,
    isVisible: brandsVisible
  } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1
  });
  const {
    ref: processRef,
    isVisible: processVisible
  } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1
  });
  const {
    ref: ctaRef,
    isVisible: ctaVisible
  } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1
  });
  return <div className="relative">
      {/* Hero Section - Minimal text */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        {/* Aurora glow effect */}
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-0 bg-gradient-radial from-primary/15 via-primary/5 to-transparent blur-3xl" />
        </div>
        
        <div ref={heroRef} className={`max-w-4xl mx-auto px-4 lg:px-8 text-center transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-primary/80 text-sm font-medium tracking-wider uppercase mb-4 block">
            For Streamers
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-foreground leading-[0.95] mb-8">
            Get paid to stream.
          </h1>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-8" onClick={() => window.open("https://beta.streamer.livad.stream/login", "_blank")}>
              Join Beta Ads
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg" className="border-border/50 hover:bg-card/50 gap-2" onClick={() => window.open("https://discord.gg/betaads", "_blank")}>
              Join Discord
            </Button>
          </div>
        </div>
      </section>

      {/* Full-Width Dashboard Preview */}
      <section className="py-12 lg:py-20">
        
      </section>

      {/* Platform Logos Section */}
      <section className="py-16 lg:py-24">
        <div ref={brandsRef} className={`max-w-4xl mx-auto px-4 lg:px-8 text-center transition-all duration-1000 ${brandsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <span className="text-muted-foreground text-sm font-medium tracking-wider uppercase mb-4 block">
            Available on
          </span>
          
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            <img 
              src="/lovable-uploads/platform-twitch.png" 
              alt="Twitch" 
              className="h-8 md:h-10 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
            <img 
              src="/lovable-uploads/platform-youtube.png" 
              alt="YouTube" 
              className="h-10 md:h-12 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
            <img 
              src="/lovable-uploads/platform-kick.avif" 
              alt="Kick" 
              className="h-8 md:h-10 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
            <img 
              src="/lovable-uploads/platform-trovo.png" 
              alt="Trovo" 
              className="h-8 md:h-10 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </section>

      {/* Minimal Process Flow */}
      

      {/* Simple CTA Section */}
      <section className="py-20 lg:py-28">
        <div ref={ctaRef} className={`max-w-3xl mx-auto px-4 lg:px-8 text-center transition-all duration-1000 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
            Ready to start earning?
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-10 py-6 text-lg" onClick={() => window.open("https://beta.streamer.livad.stream/login", "_blank")}>
              Join Beta Ads
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-border/50 hover:bg-card/50 gap-2 px-8 py-6 text-lg" onClick={() => window.open("https://discord.gg/betaads", "_blank")}>
              Join Discord
            </Button>
          </div>
        </div>
      </section>
    </div>;
};