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
      className={`py-16 lg:py-24 border-t border-border transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: heading + steps */}
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">How it works</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-3">
              From signup to payout in 4 steps
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-10 max-w-md">
              No contracts. No minimums. Just show up and stream — ads handle themselves.
            </p>

            <div className="space-y-8">
              {stepConfig.map((step, index) => (
                <div
                  key={step.number}
                  className={`flex gap-5 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  <div className="shrink-0 w-10 h-10 rounded-full border border-border flex items-center justify-center">
                    <span className="text-primary font-mono text-xs">{step.number}</span>
                  </div>
                  <div className="pt-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-primary">{step.icon}</span>
                      <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: mascot */}
          <div
            className={`relative transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden bg-[#0d0d0f] aspect-[4/3] shadow-2xl shadow-black/40">
              <img
                src="/lovable-uploads/beta-mascot.jpg"
                alt="Beta Ads streamer mascot — live streaming setup"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              {/* Subtle bottom vignette */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              {/* Live badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-primary text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                LIVE
              </div>
            </div>
            {/* Glow accent */}
            <div className="absolute -inset-4 -z-10 rounded-3xl opacity-20 blur-3xl" style={{ background: "radial-gradient(ellipse at center, hsl(357 70% 60%), transparent 70%)" }} />
          </div>

        </div>
      </div>
    </section>
  );
};
