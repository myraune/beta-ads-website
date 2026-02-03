import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const StreamerWhatYouGet: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const features = [
    {
      title: "Real brand deals",
      description: "Not affiliate links. Actual paid sponsorships from brands like Logitech, Surfshark, and Glorious.",
    },
    {
      title: "No follower minimums",
      description: "We work with streamers of all sizes. If you have an engaged audience, you qualify.",
    },
    {
      title: "Native ad formats",
      description: "Overlay widgets, chat commands, and snipe banners that blend into your stream.",
    },
    {
      title: "You stay in control",
      description: "Accept or decline any offer. Choose what fits your stream and your audience.",
    },
    {
      title: "Monthly payouts",
      description: "No chasing payments. Automatic deposits based on your actual campaign performance.",
    },
    {
      title: "Zero setup hassle",
      description: "Connect your stream in minutes. We handle the brands, contracts, and tracking.",
    },
  ];

  return (
    <section
      ref={ref}
      className={`py-16 lg:py-24 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-2xl lg:text-3xl font-light text-foreground mb-3">
            What you get
          </h2>
          <p className="text-muted-foreground text-base max-w-md">
            Everything you need to monetize your stream with brand sponsorships
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <h3 className="text-foreground font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
