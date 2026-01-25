import React from "react";
import { Link } from "react-router-dom";
import { Campaign, formatNumber, getCampaignProgress } from "@/data/dashboardData";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface CampaignCardProps {
  campaign: Campaign;
  className?: string;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({
  campaign,
  className,
}) => {
  const progress = getCampaignProgress(campaign);
  const isOngoing = campaign.status === "ongoing";

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("no-NO", { month: "short", day: "numeric" });
  };

  return (
    <div
      className={cn(
        "bg-card/50 backdrop-blur-sm shadow-lg shadow-black/10 rounded-xl p-5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg text-foreground">{campaign.name}</h3>
          <p className="text-sm text-muted-foreground">
            {formatDate(campaign.startDate)} – {formatDate(campaign.endDate)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isOngoing && (
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
          )}
          <span
            className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              isOngoing
                ? "bg-green-500/20 text-green-400"
                : "bg-muted text-muted-foreground"
            )}
          >
            {isOngoing ? "Aktiv" : "Ferdig"}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Fremgang</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xl font-bold font-mono text-foreground">
            {formatNumber(campaign.views)}
          </p>
          <p className="text-xs text-muted-foreground">Views</p>
        </div>
        <div>
          <p className="text-xl font-bold font-mono text-foreground">
            {campaign.clicks}
          </p>
          <p className="text-xs text-muted-foreground">Clicks</p>
        </div>
        <div>
          <p className="text-xl font-bold font-mono text-foreground">
            {campaign.ctr}%
          </p>
          <p className="text-xs text-muted-foreground">CTR</p>
        </div>
      </div>

      {/* Link */}
      <Link
        to={`/dashboard/campaigns/${campaign.id}`}
        className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
      >
        Åpne kampanje
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};
