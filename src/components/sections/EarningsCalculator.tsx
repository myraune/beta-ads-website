import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const presets = [
  { label: "🎮 Small", ccv: 25 },
  { label: "🚀 Growing", ccv: 100 },
  { label: "🔥 Established", ccv: 250 },
];

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "K";
  }
  return Math.round(num).toLocaleString("sv-SE");
};

const formatKr = (num: number): string => {
  return Math.round(num).toLocaleString("sv-SE") + " kr";
};

// Hook for animated numbers
const useAnimatedValue = (targetValue: number, duration = 400) => {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const animationRef = useRef<number | null>(null);
  
  useEffect(() => {
    const startValue = displayValue;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (targetValue - startValue) * easeOut;
      
      setDisplayValue(current);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetValue, duration]);
  
  return displayValue;
};

export const EarningsCalculator = () => {
  const [ccv, setCcv] = useState(100);
  const [hours, setHours] = useState(200);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  // Calculations
  const baseViews = ccv * hours;
  const minViews = baseViews * 1; // 1 ad per hour
  const maxViews = baseViews * 4; // 4 ads per hour
  const minEarnings = (minViews / 1000) * 100; // 100 kr CPM
  const maxEarnings = (maxViews / 1000) * 150; // 150 kr CPM

  // Animated values
  const animatedMinViews = useAnimatedValue(minViews);
  const animatedMaxViews = useAnimatedValue(maxViews);
  const animatedMinEarnings = useAnimatedValue(minEarnings);
  const animatedMaxEarnings = useAnimatedValue(maxEarnings);

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setHours(Math.max(0, Math.min(744, value))); // Max ~31 days × 24 hours
  };

  return (
    <section ref={ref} className="py-20 lg:py-28">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 lg:mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-4">
            See what you could earn 💰
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Estimate your potential monthly earnings from micro sponsorships. 🎯
          </p>
        </motion.div>

        {/* Calculator Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left: Inputs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="space-y-8"
          >
            {/* CCV Slider */}
            <div className="bg-card/5 rounded-2xl p-8 lg:p-10 shadow-lg shadow-black/5 dark:shadow-black/20">
              <div className="flex items-center justify-between mb-6">
                <label className="text-lg font-medium text-foreground">
                  👀 CCV (concurrent viewers)
                </label>
                <span className="text-3xl font-bold text-foreground tabular-nums">
                  {ccv.toLocaleString("sv-SE")}
                </span>
              </div>
              
              <Slider
                value={[ccv]}
                onValueChange={([v]) => setCcv(v)}
                min={0}
                max={1000}
                step={5}
                className="mb-6"
              />
              
              {/* Presets */}
              <div className="flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.ccv}
                    onClick={() => setCcv(preset.ccv)}
                    className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                      ccv === preset.ccv
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                        : "bg-card/10 text-muted-foreground hover:bg-card/20 hover:text-foreground"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Hours Input */}
            <div className="bg-card/5 rounded-2xl p-8 lg:p-10 shadow-lg shadow-black/5 dark:shadow-black/20">
              <div className="flex items-center justify-between mb-6">
                <label className="text-lg font-medium text-foreground">
                  ⏱️ Hours streamed per month
                </label>
              </div>
              
              <Input
                type="number"
                value={hours}
                onChange={handleHoursChange}
                min={0}
                max={744}
                className="text-center text-3xl font-bold h-16 bg-transparent border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              
              <p className="text-sm text-muted-foreground/60 mt-4 text-center">
                Ads per hour: <span className="font-medium text-muted-foreground">1–4</span>
                <span className="mx-2">•</span>
                CPM: <span className="font-medium text-muted-foreground">100–150 kr</span>
              </p>
            </div>

            {/* Example Hint */}
            <p className="text-sm text-muted-foreground/70 text-center lg:text-left px-2">
              💡 Example: 100 CCV streaming 200 hours/month → 2 000 – 12 000 kr
            </p>
          </motion.div>

          {/* Right: Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col justify-center space-y-6"
          >
            {/* Views */}
            <div className="bg-card/5 rounded-2xl p-8 lg:p-12 shadow-lg shadow-black/5 dark:shadow-black/20 text-center">
              <p className="text-sm uppercase tracking-wider text-muted-foreground/60 mb-3">
                Estimated monthly views
              </p>
              <span className="text-4xl lg:text-5xl font-bold text-foreground">
                {formatNumber(animatedMinViews)}
                <span className="text-muted-foreground/40 mx-2">–</span>
                {formatNumber(animatedMaxViews)}
              </span>
            </div>

            {/* Earnings */}
            <div className="bg-gradient-to-br from-primary/10 via-card/5 to-card/5 rounded-2xl p-8 lg:p-12 shadow-lg shadow-black/5 dark:shadow-black/20 text-center">
              <p className="text-sm uppercase tracking-wider text-muted-foreground/60 mb-3">
                Est. salary
              </p>
              <div className="text-4xl lg:text-5xl font-bold">
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {formatKr(animatedMinEarnings)}
                  <span className="text-muted-foreground/40 mx-2">–</span>
                  {formatKr(animatedMaxEarnings)}
                </span>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-sm text-muted-foreground/60 text-center px-4">
              ⚠️ This is an estimate. Actual earnings depend on campaign availability and performance.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
