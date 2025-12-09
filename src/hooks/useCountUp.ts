import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
  duration?: number;
  delay?: number;
  decimals?: number;
  enableLivePulse?: boolean;
}

export const useCountUp = (
  target: number,
  isVisible: boolean,
  options: UseCountUpOptions = {}
) => {
  const { duration = 2000, delay = 0, decimals = 0, enableLivePulse = true } = options;
  const [value, setValue] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);
  const animationRef = useRef<number>();
  const pulseIntervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!isVisible) return;

    const startTime = performance.now() + delay;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (currentTime < startTime) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (target - startValue) * easeOutQuart;
      
      setValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setHasCompleted(true);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, target, duration, delay]);

  // Live pulse effect - subtle random variations after count-up completes
  useEffect(() => {
    if (!hasCompleted || !enableLivePulse) return;

    pulseIntervalRef.current = setInterval(() => {
      const variation = (Math.random() - 0.5) * 2; // -1 to +1
      const pulseValue = target + variation * (target * 0.001); // 0.1% variation
      setValue(pulseValue);
    }, 2000 + Math.random() * 1000);

    return () => {
      if (pulseIntervalRef.current) {
        clearInterval(pulseIntervalRef.current);
      }
    };
  }, [hasCompleted, enableLivePulse, target]);

  const displayValue = decimals > 0 
    ? value.toFixed(decimals) 
    : Math.round(value).toLocaleString();

  return { value, displayValue, hasCompleted };
};
