import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Simplified calculation constants
const AVG_HOURS = 150;
const AVG_ADS_PER_HOUR = 2;
const LOW_CPM = 15;
const HIGH_CPM = 25;

const formatUSD = (num: number): string => {
  if (num >= 1000) {
    return "$" + Math.round(num).toLocaleString("en-US");
  }
  return "$" + Math.round(num);
};

// Hook for animated numbers
const useAnimatedValue = (targetValue: number, duration = 400) => {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const animationRef = useRef<number | null>(null);
  const previousValueRef = useRef(targetValue);
  
  useEffect(() => {
    const startValue = previousValueRef.current;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (targetValue - startValue) * easeOut;
      
      setDisplayValue(current);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        previousValueRef.current = targetValue;
      }
    };
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
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
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.2 });

  // Simplified calculation
  const impressions = ccv * AVG_HOURS * AVG_ADS_PER_HOUR;
  const lowEarnings = (impressions / 1000) * LOW_CPM;
  const highEarnings = (impressions / 1000) * HIGH_CPM;

  // Animated values
  const animatedLow = useAnimatedValue(lowEarnings);
  const animatedHigh = useAnimatedValue(highEarnings);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-32 lg:py-40">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          {/* Heading */}
          <p className="text-muted-foreground text-lg">
            Estimate your earnings
          </p>

          {/* Big Earnings Range */}
          <div className="space-y-2">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-foreground tracking-tight">
              {formatUSD(animatedLow)} – {formatUSD(animatedHigh)}
            </h2>
            <p className="text-muted-foreground text-base">
              per month
            </p>
          </div>

          {/* Slider */}
          <div className="pt-8 space-y-4">
            <Slider
              value={[ccv]}
              onValueChange={([v]) => setCcv(v)}
              min={0}
              max={1000}
              step={10}
              className="py-2"
            />
            <p className="text-foreground text-lg tabular-nums">
              {ccv.toLocaleString("en-US")} viewers
            </p>
          </div>

          {/* Fine print */}
          <p className="text-muted-foreground/50 text-sm pt-4">
            Based on 100–200 hours streaming
          </p>
        </motion.div>
      </div>
    </section>
  );
};
