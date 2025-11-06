import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type PlatformFilter = "all" | "twitch" | "kick";

interface PlatformToggleProps {
  value: PlatformFilter;
  onChange: (value: PlatformFilter) => void;
}

const OPTIONS: { label: string; value: PlatformFilter }[] = [
  { label: "All creators", value: "all" },
  { label: "Twitch", value: "twitch" },
  { label: "Kick", value: "kick" },
];

export const PlatformToggle: React.FC<PlatformToggleProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-muted/50 p-1">
      {OPTIONS.map((option) => (
        <Button
          key={option.value}
          size="sm"
          variant={value === option.value ? "default" : "ghost"}
          className={cn(
            "rounded-full px-4 text-xs font-medium shadow-sm transition-all",
            value === option.value
              ? "bg-primary text-primary-foreground shadow-primary/20"
              : "text-muted-foreground hover:bg-muted"
          )}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};
