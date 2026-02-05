import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';

/**
 * Formats a number with compact notation (K, M, B)
 * while maintaining animated count-up precision
 */
const formatCompactNumber = (value: number, decimals: number = 0): string => {
  const absValue = Math.abs(value);
  
  if (absValue >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(decimals || 1) + 'B';
  }
  if (absValue >= 1_000_000) {
    return (value / 1_000_000).toFixed(decimals || 1) + 'M';
  }
  if (absValue >= 100_000) {
    return (value / 1_000).toFixed(0) + 'K';
  }
  if (absValue >= 10_000) {
    return (value / 1_000).toFixed(decimals || 1) + 'K';
  }
  
  // For smaller numbers, use locale formatting
  return decimals > 0 
    ? value.toFixed(decimals)
    : Math.round(value).toLocaleString();
};

export interface StatCardProps {
  value: number;
  label: string;
  suffix?: string;
  decimals?: number;
  trend?: string;
  highlight?: boolean;
  /** 
   * 'auto' will compact large numbers (100K+ becomes K/M/B)
   * 'raw' preserves the number as-is with locale formatting
   */
  format?: 'auto' | 'raw';
}

export const StatCard = ({ 
  value, 
  label, 
  suffix = '', 
  decimals = 0, 
  trend,
  highlight = false,
  format = 'auto'
}: StatCardProps) => {
  const [ref, isVisible] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const { value: animatedValue } = useCountUp(value, isVisible, { 
    duration: 2000, 
    decimals: Math.max(decimals, 1), // Need precision for animation
    enableLivePulse: false 
  });

  // Format the display value
  const displayValue = format === 'auto' 
    ? formatCompactNumber(animatedValue, decimals)
    : decimals > 0 
      ? animatedValue.toFixed(decimals)
      : Math.round(animatedValue).toLocaleString();

  return (
    <div 
      ref={ref} 
      className={`w-full min-w-0 rounded-2xl border p-4 sm:p-5 lg:p-6 
        flex flex-col items-center justify-center min-h-[120px] overflow-hidden ${
        highlight 
          ? 'bg-primary/20 border-primary/40' 
          : 'bg-card/50 border-border/30'
      }`}
    >
      <div 
        className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 tabular-nums text-center ${
          highlight ? 'text-primary' : 'text-primary'
        }`}
      >
        {displayValue}{suffix}
      </div>
      <div className="text-xs sm:text-sm text-muted-foreground leading-tight text-center">{label}</div>
      {trend && (
        <div className="text-xs text-muted-foreground/80 mt-1 text-center">{trend}</div>
      )}
    </div>
  );
};

export interface StatCardGridProps {
  children: React.ReactNode;
  /** 
   * Number of columns on large screens
   * Mobile always uses 1-2 columns responsively
   */
  columns?: 3 | 4;
}

/**
 * Responsive grid wrapper for StatCards
 * Stacks to 1 column on very small screens, 2 on mobile, and 3-4 on desktop
 */
export const StatCardGrid = ({ children, columns = 4 }: StatCardGridProps) => {
  const gridClass = columns === 3 
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch'
    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch';
  
  return <div className={gridClass}>{children}</div>;
};

export default StatCard;
