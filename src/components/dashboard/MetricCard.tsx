import React from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  value: string | number;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  sublabel,
  icon,
  trend,
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all duration-300",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-3xl md:text-4xl font-bold text-foreground font-mono tracking-tight">
            {value}
          </p>
          <p className="text-sm text-muted-foreground">{label}</p>
          {sublabel && (
            <p className="text-xs text-muted-foreground/70">{sublabel}</p>
          )}
        </div>
        {icon && (
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            {icon}
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-1">
          <span
            className={cn(
              "text-xs font-medium",
              trend.isPositive ? "text-green-400" : "text-red-400"
            )}
          >
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
          <span className="text-xs text-muted-foreground">vs forrige måned</span>
        </div>
      )}
    </div>
  );
};
