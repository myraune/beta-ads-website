import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const presets = [
  { label: "🎮 Small streamer", viewers: 25 },
  { label: "🚀 Growing streamer", viewers: 100 },
  { label: "🔥 Established streamer", viewers: 200 },
];

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "K";
  }
  return Math.round(num).toLocaleString();
};

const formatCurrency = (num: number): string => {
  return "$" + Math.round(num).toLocaleString();
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
  const [viewers, setViewers] = useState(100);
  const [hours, setHours] = useState(40);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  // Calculations
  const impressions = viewers * hours * 60;
  const earningsLow = (impressions / 1000) * 10;
  const earningsHigh = (impressions / 1000) * 15;

  // Animated values
  const animatedImpressions = useAnimatedValue(impressions);
  const animatedEarningsLow = useAnimatedValue(earningsLow);
  const animatedEarningsHigh = useAnimatedValue(earningsHigh);

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
            Estimate your potential monthly earnings from micro sponsorships. 
            Move the sliders to match your stream. 🎯
          </p>
        </motion.div>

        {/* Calculator Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left: Inputs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="space-y-10"
          >
            {/* Viewers Slider */}
            <div className="bg-card/5 rounded-2xl p-8 lg:p-10 shadow-lg shadow-black/5 dark:shadow-black/20">
              <div className="flex items-center justify-between mb-6">
                <label className="text-lg font-medium text-foreground">
                  👀 Average viewers
                </label>
                <span className="text-3xl font-bold text-foreground tabular-nums">
                  {viewers.toLocaleString()}
                </span>
              </div>
              
              <Slider
                value={[viewers]}
                onValueChange={([v]) => setViewers(v)}
                min={5}
                max={5000}
                step={5}
                className="mb-6"
              />
              
              {/* Presets */}
              <div className="flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.viewers}
                    onClick={() => setViewers(preset.viewers)}
                    className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                      viewers === preset.viewers
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                        : "bg-card/10 text-muted-foreground hover:bg-card/20 hover:text-foreground"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Hours Slider */}
            <div className="bg-card/5 rounded-2xl p-8 lg:p-10 shadow-lg shadow-black/5 dark:shadow-black/20">
              <div className="flex items-center justify-between mb-6">
                <label className="text-lg font-medium text-foreground">
                  ⏱️ Hours streamed per month
                </label>
                <span className="text-3xl font-bold text-foreground tabular-nums">
                  {hours}
                </span>
              </div>
              
              <Slider
                value={[hours]}
                onValueChange={([h]) => setHours(h)}
                min={5}
                max={200}
                step={5}
                className="mb-4"
              />
              
              <p className="text-sm text-muted-foreground/60">
                CPM range: <span className="font-medium text-muted-foreground">$10 – $15</span>
              </p>
            </div>
          </motion.div>

          {/* Right: Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col justify-center space-y-6"
          >
            {/* Impressions */}
            <div className="bg-card/5 rounded-2xl p-8 lg:p-12 shadow-lg shadow-black/5 dark:shadow-black/20 text-center">
              <p className="text-sm uppercase tracking-wider text-muted-foreground/60 mb-3">
                Estimated monthly impressions
              </p>
              <span className="text-5xl lg:text-6xl font-bold text-foreground">
                {formatNumber(animatedImpressions)}
              </span>
            </div>

            {/* Earnings */}
            <div className="bg-gradient-to-br from-primary/10 via-card/5 to-card/5 rounded-2xl p-8 lg:p-12 shadow-lg shadow-black/5 dark:shadow-black/20 text-center">
              <p className="text-sm uppercase tracking-wider text-muted-foreground/60 mb-3">
                Estimated monthly earnings
              </p>
              <div className="text-5xl lg:text-6xl font-bold">
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {formatCurrency(animatedEarningsLow)}
                  <span className="text-muted-foreground/40 mx-2">–</span>
                  {formatCurrency(animatedEarningsHigh)}
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
