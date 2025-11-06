import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  helper?: string;
  delta?: {
    value: string;
    positive?: boolean;
    label?: string;
  };
  icon?: React.ReactNode;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  helper,
  delta,
  icon,
  className,
}) => {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border-border/60 bg-gradient-to-br from-background/90 via-background to-background/60 shadow-xl",
        "before:absolute before:inset-x-0 before:-top-1 before:h-px before:bg-gradient-to-r before:from-transparent before:via-primary/60 before:to-transparent",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="rounded-full bg-primary/10 p-2 text-primary">{icon}</div>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-3xl font-semibold tracking-tight">{value}</div>
        {delta && (
          <div className="flex items-center gap-2 text-xs font-medium">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-1",
                delta.positive ? "bg-emerald-500/10 text-emerald-300" : "bg-rose-500/10 text-rose-300"
              )}
            >
              <span>{delta.value}</span>
            </span>
            {delta.label && (
              <span className="text-muted-foreground/80">{delta.label}</span>
            )}
          </div>
        )}
        {helper && (
          <p className="text-sm text-muted-foreground/80">{helper}</p>
        )}
      </CardContent>
    </Card>
  );
};
