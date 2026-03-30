import React from "react"
import GlobeMarketMap from "@/components/ui/wireframe-dotted-globe"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

export const SPGlobalNetwork: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section ref={ref} className="py-20 md:py-32" aria-label="Global market reach">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary mb-5">
            Global Reach
          </span>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight text-foreground">
            Seven markets. One platform.
          </h2>
        </div>

        {/* Globe */}
        <div
          className={`transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <GlobeMarketMap />
        </div>
      </div>
    </section>
  )
}
