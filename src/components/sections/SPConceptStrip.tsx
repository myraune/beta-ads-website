import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  {
    num: "01",
    title: "Browse streamers",
    desc: "Filter 39,000+ active streamers by game, audience size, region, and match score against your ICP.",
  },
  {
    num: "02",
    title: "Launch your overlay",
    desc: "Deploy your branded overlay to any selection of streamers in one click. They need zero setup — it renders automatically inside OBS.",
  },
  {
    num: "03",
    title: "Track it live",
    desc: "Watch impressions, CTR, and chat mentions happen in real time. Full branded report delivered post-campaign.",
  },
];

export const SPConceptStrip: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={ref} className="border-t border-border py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">

          {/* Left: concept statement */}
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">How it works</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-5">
              Your brand, live<br />inside the stream.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-xs">
              Not a pre-roll. Not a banner. A native overlay that renders inside the broadcast itself — bypassing every ad blocker.
            </p>
          </div>

          {/* Right: 3 steps */}
          <div className={`transition-all duration-700 delay-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="grid md:grid-cols-3 gap-8 md:gap-6">
              {steps.map((s, i) => (
                <div key={s.num} className="relative">
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-5 left-full w-full h-px bg-border -translate-x-3" />
                  )}
                  <div className="text-4xl font-bold text-primary/20 mb-4 tracking-tighter leading-none">{s.num}</div>
                  <h3 className="text-base font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
