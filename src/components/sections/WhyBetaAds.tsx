import React from "react";
import { Shield, TrendingUp, Users, Zap, BarChart3 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface WhyCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const whyCards: WhyCard[] = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Adblock-Proof",
    description: "Reach 100% of viewers (even Twitch Turbo subscribers)",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "3-5x Higher Engagement",
    description: "Native integration = viewers engage, not skip",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Streamer Credibility",
    description: "Gen Z trusts creators—your brand borrows that trust",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Real-Time Context",
    description: "Ads appear at high-engagement moments",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Measurable Impact",
    description: "Track every impression, click, conversion",
  },
];

export const WhyBetaAds: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section 
      ref={ref}
      className={`py-16 lg:py-24 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-2xl lg:text-3xl font-light text-foreground mb-3">
            Why Beta Ads
          </h2>
          <p className="text-muted-foreground text-base max-w-md">
            Native advertising that actually works
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
          {whyCards.map((card, index) => (
            <div
              key={card.title}
              className={`group relative p-6 rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:bg-card/50 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                {card.icon}
              </div>

              {/* Content */}
              <h3 className="text-foreground font-medium text-lg mb-2">
                {card.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
