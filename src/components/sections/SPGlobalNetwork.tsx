import React from "react"
import GlobeMarketMap from "@/components/ui/wireframe-dotted-globe"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

const MARKETS = [
  { flag: "🇳🇴", name: "Norway" },
  { flag: "🇸🇪", name: "Sweden" },
  { flag: "🇩🇰", name: "Denmark" },
  { flag: "🇫🇮", name: "Finland" },
  { flag: "🇩🇪", name: "Germany" },
  { flag: "🇬🇧", name: "United Kingdom" },
  { flag: "🇳🇱", name: "Netherlands" },
]

export const SPGlobalNetwork: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section ref={ref} className="py-16 md:py-24 border-t border-border/30" aria-label="Global market reach">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* Left: text content */}
          <div
            className={`flex-1 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary mb-5">
              Global Reach
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
              Seven markets.<br />One platform.
            </h2>
            <p className="text-[15px] text-muted-foreground leading-relaxed mb-8 max-w-sm">
              Run campaigns across Europe's top streaming markets from a single dashboard. One brief, one launch, thousands of streams.
            </p>
            <ul className="space-y-2.5">
              {MARKETS.map((m) => (
                <li key={m.name} className="flex items-center gap-3 text-sm text-foreground">
                  <span className="text-base leading-none">{m.flag}</span>
                  <span>{m.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: globe — constrained, easter-egg-like */}
          <div
            className={`w-full lg:w-[420px] shrink-0 transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <GlobeMarketMap />
          </div>

        </div>
      </div>
    </section>
  )
}
