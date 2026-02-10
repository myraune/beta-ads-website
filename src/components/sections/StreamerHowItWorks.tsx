import React from "react";
import { Zap, Check, DollarSign, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Step {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const stepConfig: Step[] = [
  {
    number: "01",
    icon: <Users className="w-5 h-5" />,
    title: "Browse offers",
    description: "See real sponsorship opportunities from brands that match your content.",
  },
  {
    number: "02",
    icon: <Check className="w-5 h-5" />,
    title: "Accept what fits",
    description: "Choose the campaigns you want. Decline the ones you don't. Full control.",
  },
  {
    number: "03",
    icon: <Zap className="w-5 h-5" />,
    title: "Ads run natively",
    description: "Sponsored content appears seamlessly in your stream—no interruptions.",
  },
  {
    number: "04",
    icon: <DollarSign className="w-5 h-5" />,
    title: "Get paid monthly",
    description: "Automatic payouts based on your actual performance. No chasing invoices.",
  },
];

export const StreamerHowItWorks: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="streamer-how-it-works"
      ref={ref}
      className={`py-16 lg:py-24 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-2xl lg:text-3xl font-light text-foreground mb-3">
            How it works
          </h2>
          <p className="text-muted-foreground text-base max-w-md">
            From signup to payout in 4 simple steps
          </p>
        </div>

        {/* Steps - Horizontal on Desktop, Vertical on Mobile */}
        <div className="relative">
          {/* Desktop: Horizontal Layout */}
          <div className="hidden lg:block">
            {/* Connecting Line */}
            <div className="absolute top-8 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-px bg-muted/40" />

            <div className="grid grid-cols-4 gap-6">
              {stepConfig.map((step, index) => (
                <div
                  key={step.number}
                  className={`relative transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Step Number Circle */}
                  <div className="relative z-10 w-16 h-16 rounded-full bg-card shadow-md shadow-black/10 dark:shadow-white/5 flex items-center justify-center mb-6">
                    <span className="text-primary font-mono text-sm">{step.number}</span>
                  </div>

                  {/* Content */}
                  <div className="pr-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-primary">{step.icon}</span>
                      <h3 className="text-foreground font-medium">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: Vertical Layout */}
          <div className="lg:hidden space-y-8">
            {stepConfig.map((step, index) => (
              <div
                key={step.number}
                className={`relative flex gap-4 transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Left: Number & Line */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-card shadow-md shadow-black/10 dark:shadow-white/5 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-mono text-xs">{step.number}</span>
                  </div>
                  {index < stepConfig.length - 1 && <div className="w-px h-full bg-muted/40 mt-2" />}
                </div>

                {/* Right: Content */}
                <div className="pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-primary">{step.icon}</span>
                    <h3 className="text-foreground font-medium">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
