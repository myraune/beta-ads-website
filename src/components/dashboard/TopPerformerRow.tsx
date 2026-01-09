import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { formatNumber, Streamer } from "@/data/dashboardData";

interface TopPerformerRowProps {
  streamer: Streamer;
  rank?: number;
  metric: string;
  metricValue: number | string;
  className?: string;
}

export const TopPerformerRow: React.FC<TopPerformerRowProps> = ({
  streamer,
  rank,
  metric,
  metricValue,
  className,
}) => {
  // Generate a consistent color based on the avatar letter
  const getAvatarColor = (letter: string) => {
    const colors = [
      "bg-red-500",
      "bg-orange-500",
      "bg-amber-500",
      "bg-yellow-500",
      "bg-lime-500",
      "bg-green-500",
      "bg-emerald-500",
      "bg-teal-500",
      "bg-cyan-500",
      "bg-sky-500",
      "bg-blue-500",
      "bg-indigo-500",
      "bg-violet-500",
      "bg-purple-500",
      "bg-fuchsia-500",
      "bg-pink-500",
    ];
    const index = letter.toUpperCase().charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <Link
      to={`/dashboard/streamers/${streamer.id}`}
      className={cn(
        "flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {rank && (
          <span className="text-sm font-medium text-muted-foreground w-6">
            #{rank}
          </span>
        )}
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm",
            getAvatarColor(streamer.avatar)
          )}
        >
          {streamer.avatar}
        </div>
        <div>
          <p className="font-medium text-foreground group-hover:text-primary transition-colors">
            {streamer.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatNumber(streamer.followers)} followers
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold font-mono text-foreground">
          {typeof metricValue === "number" ? formatNumber(metricValue) : metricValue}
        </p>
        <p className="text-xs text-muted-foreground">{metric}</p>
      </div>
    </Link>
  );
};
