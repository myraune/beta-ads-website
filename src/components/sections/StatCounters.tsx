import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";

interface StatItemProps {
  target: number;
  suffix: string;
  label: string;
  isVisible: boolean;
  delay?: number;
  decimals?: number;
}

const StatItem: React.FC<StatItemProps> = ({ target, suffix, label, isVisible, delay = 0, decimals = 0 }) => {
  const { displayValue } = useCountUp(target, isVisible, { delay, decimals, enableLivePulse: false });

  return (
    <div className="text-center space-y-2">
      <p className="text-4xl lg:text-5xl font-light tracking-tight text-foreground">
        {displayValue}{suffix}
      </p>
      <p className="text-sm font-light tracking-wide text-muted-foreground">
        {label}
      </p>
    </div>
  );
};

export const StatCounters: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 lg:py-20">
      <div 
        ref={sectionRef}
        className={`max-w-[1000px] mx-auto px-6 lg:px-12 transition-[opacity,transform] duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <StatItem target={40} suffix="+" label="Nordic streamers" isVisible={isVisible} delay={0} />
          <StatItem target={2.5} suffix="M+" label="Monthly impressions" isVisible={isVisible} delay={200} decimals={1} />
          <StatItem target={2.8} suffix="%" label="Average CTR" isVisible={isVisible} delay={400} decimals={1} />
          <StatItem target={8} suffix="" label="Brand campaigns" isVisible={isVisible} delay={600} />
        </div>
      </div>
    </section>
  );
};
