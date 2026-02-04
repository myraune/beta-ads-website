import React from "react";
import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/lib/utils";

interface AnimatedDashboardProps {
  isActive: boolean;
}

export const AnimatedDashboard: React.FC<AnimatedDashboardProps> = ({ isActive }) => {
  const { displayValue: impressions } = useCountUp(2647000, isActive, { duration: 2500 });
  const { displayValue: ctr } = useCountUp(3.2, isActive, { duration: 2000, decimals: 1 });
  const { displayValue: campaigns } = useCountUp(48, isActive, { duration: 1800 });

  const barHeights = [40, 65, 45, 80, 55, 70, 60, 85, 50, 75, 90, 65];

  return (
    <div className="w-full h-full bg-background/80 rounded-xl overflow-hidden shadow-inner shadow-black/10">
      <div className="p-6 h-full flex flex-col gap-4">
        {/* Header Bar */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3v18h18" />
              <path d="M18 17V9" />
              <path d="M13 17V5" />
              <path d="M8 17v-3" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="h-3 bg-muted/40 rounded w-32" />
          </div>
          <div className="flex gap-2">
            <div className="w-20 h-8 bg-muted/30 rounded-lg" />
            <div className="w-8 h-8 bg-primary/20 rounded-lg" />
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className={cn(
            "bg-card/50 rounded-xl p-4 transition-all duration-700",
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )} style={{ transitionDelay: "200ms" }}>
            <div className="text-2xl font-medium text-foreground">{impressions}</div>
            <div className="text-xs text-muted-foreground mt-1">Impressions</div>
          </div>
          <div className={cn(
            "bg-card/50 rounded-xl p-4 transition-all duration-700",
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )} style={{ transitionDelay: "350ms" }}>
            <div className="text-2xl font-medium text-primary">{ctr}%</div>
            <div className="text-xs text-muted-foreground mt-1">Avg CTR</div>
          </div>
          <div className={cn(
            "bg-card/50 rounded-xl p-4 transition-all duration-700",
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )} style={{ transitionDelay: "500ms" }}>
            <div className="text-2xl font-medium text-foreground">{campaigns}</div>
            <div className="text-xs text-muted-foreground mt-1">Campaigns</div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="flex-1 grid grid-cols-3 gap-4">
          {/* Bar Chart */}
          <div className="col-span-2 bg-card/30 rounded-xl p-4">
            <div className="h-3 bg-muted/30 rounded w-24 mb-4" />
            <div className="flex items-end h-32 gap-2 pt-2">
              {barHeights.map((height, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex-1 bg-primary/60 rounded-t transition-all duration-700 ease-out",
                    isActive ? "" : "!h-0"
                  )}
                  style={{
                    height: isActive ? `${height}%` : "0%",
                    transitionDelay: `${600 + i * 80}ms`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Donut Chart */}
          <div className="bg-card/30 rounded-xl p-4 flex flex-col items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-24 h-24">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="12"
                opacity="0.3"
              />
              {/* Animated segments */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${isActive ? 100 : 0} 251`}
                strokeDashoffset="0"
                transform="rotate(-90 50 50)"
                className="transition-all duration-1000 ease-out"
                style={{ transitionDelay: "800ms" }}
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="hsl(var(--primary) / 0.5)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${isActive ? 60 : 0} 251`}
                strokeDashoffset="-105"
                transform="rotate(-90 50 50)"
                className="transition-all duration-1000 ease-out"
                style={{ transitionDelay: "1000ms" }}
              />
            </svg>
            <div className="text-xs text-muted-foreground mt-2">Traffic Sources</div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-card/30 rounded-xl p-4">
          <div className="flex gap-4 text-xs text-muted-foreground border-b border-border/30 pb-2 mb-2">
            <div className="flex-1">Campaign</div>
            <div className="w-20 text-right">Impressions</div>
            <div className="w-16 text-right">CTR</div>
          </div>
          {["Samsung S25", "Shure MV7+", "Komplett"].map((name, i) => (
            <div
              key={name}
              className={cn(
                "flex gap-4 text-sm py-2 transition-all duration-500",
                isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              )}
              style={{ transitionDelay: `${1200 + i * 150}ms` }}
            >
              <div className="flex-1 text-foreground">{name}</div>
              <div className="w-20 text-right text-muted-foreground">
                {["500K", "320K", "150K"][i]}
              </div>
              <div className="w-16 text-right text-primary">
                {["2.93%", "2.45%", "3.24%"][i]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
