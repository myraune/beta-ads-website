import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Internal streamer CPMs (30% less than client CPM - not disclosed to users)
const markets = [
  { id: "usa", label: "USA", streamerCpm: 30 },
  { id: "nordics", label: "Nordics", streamerCpm: 25 },
  { id: "uk", label: "UK", streamerCpm: 20 },
  { id: "germany", label: "Germany", streamerCpm: 16 },
  { id: "canada", label: "Canada", streamerCpm: 19 },
  { id: "australia", label: "Australia", streamerCpm: 21 },
  { id: "brazil", label: "Brazil", streamerCpm: 13 },
  { id: "spain", label: "Spain", streamerCpm: 16 },
];

const adsPerHourOptions = [1, 2, 3, 4];

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "K";
  }
  return Math.round(num).toLocaleString("en-US");
};

const formatUSD = (num: number): string => {
  return "$" + Math.round(num).toLocaleString("en-US");
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
  const [market, setMarket] = useState("usa");
  const [ccv, setCcv] = useState(100);
  const [hours, setHours] = useState(200);
  const [adsPerHour, setAdsPerHour] = useState(2);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  // Calculations
  const impressions = ccv * hours * adsPerHour;
  const selectedMarket = markets.find(m => m.id === market);
  const earnings = (impressions / 1000) * (selectedMarket?.streamerCpm || 0);

  // Animated values
  const animatedImpressions = useAnimatedValue(impressions);
  const animatedEarnings = useAnimatedValue(earnings);

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setHours(Math.max(0, Math.min(744, value)));
  };

  return (
    <section ref={ref} className="py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-4">
            Earnings Calculator
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Estimate your potential monthly earnings
          </p>
        </motion.div>

        {/* Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="space-y-12"
        >
          {/* Market Selection */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-4">
              Market
            </label>
            <div className="flex flex-wrap gap-2">
              {markets.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMarket(m.id)}
                  className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200 ${
                    market === m.id
                      ? "bg-foreground text-background shadow-lg"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* CCV Slider */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium text-muted-foreground">
                Concurrent viewers
              </label>
              <span className="text-2xl font-semibold text-foreground tabular-nums">
                {ccv.toLocaleString("en-US")}
              </span>
            </div>
            <Slider
              value={[ccv]}
              onValueChange={([v]) => setCcv(v)}
              min={0}
              max={1000}
              step={5}
              className="py-2"
            />
          </div>

          {/* Hours Input */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-4">
              Hours per month
            </label>
            <Input
              type="number"
              value={hours}
              onChange={handleHoursChange}
              min={0}
              max={744}
              className="text-center text-2xl font-semibold h-14 bg-muted/30 border-0 rounded-xl shadow-none focus-visible:ring-1 focus-visible:ring-foreground/20"
            />
          </div>

          {/* Ads Per Hour */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-4">
              Ads per hour
            </label>
            <div className="flex gap-2">
              {adsPerHourOptions.map((num) => (
                <button
                  key={num}
                  onClick={() => setAdsPerHour(num)}
                  className={`w-14 h-14 text-lg font-medium rounded-xl transition-all duration-200 ${
                    adsPerHour === num
                      ? "bg-foreground text-background shadow-lg"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border/50" />

          {/* Results */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Impressions */}
            <div className="text-center md:text-left">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Estimated monthly impressions
              </p>
              <span className="text-4xl lg:text-5xl font-semibold text-foreground tracking-tight">
                {formatNumber(animatedImpressions)}
              </span>
            </div>

            {/* Earnings */}
            <div className="text-center md:text-right">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Estimated earnings
              </p>
              <span className="text-4xl lg:text-5xl font-semibold text-foreground tracking-tight">
                {formatUSD(animatedEarnings)}
              </span>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-sm text-muted-foreground/60 text-center pt-4">
            Estimates vary based on campaign availability
          </p>
        </motion.div>
      </div>
    </section>
  );
};
