import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getStreamerById, formatNumber, streamers } from "@/data/dashboardData";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { HorizontalBarChart } from "@/components/dashboard/DashboardChart";
import { cn } from "@/lib/utils";

const StreamerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const streamer = getStreamerById(id || "") || streamers[0];

  if (!streamer) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Streamer ikke funnet</p>
        <Link to="/dashboard" className="text-primary hover:underline mt-2 inline-block">← Tilbake</Link>
      </div>
    );
  }

  const getAvatarColor = (letter: string) => {
    const colors = ["bg-red-500", "bg-orange-500", "bg-amber-500", "bg-teal-500", "bg-cyan-500", "bg-blue-500", "bg-indigo-500", "bg-violet-500", "bg-purple-500"];
    return colors[letter.toUpperCase().charCodeAt(0) % colors.length];
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Tilbake
      </Link>

      {/* Header */}
      <div className="flex items-center gap-6">
        <div className={cn("w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl", getAvatarColor(streamer.avatar))}>
          {streamer.avatar}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{streamer.name}</h1>
          <p className="text-muted-foreground">{streamer.bio}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Followers: {formatNumber(streamer.followers)} | Avg Viewers: {streamer.avgViewers}
          </p>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-3 gap-4">
        <MetricCard value={formatNumber(streamer.totalViews)} label="Total Views" sublabel="all-time" />
        <MetricCard value={formatNumber(streamer.totalClicks)} label="Clicks" sublabel="all-time" />
        <MetricCard value={`${streamer.avgCtr}%`} label="Avg CTR" sublabel="all-time" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Audience */}
        <div className="bg-card/50 border border-border/50 rounded-xl p-5 space-y-4">
          <h3 className="font-semibold text-foreground">Audience Breakdown</h3>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Regioner</p>
            {streamer.regions.map((r) => (
              <div key={r.name} className="flex justify-between text-sm py-1">
                <span className="text-muted-foreground">{r.name}</span>
                <span className="font-mono">{r.percentage}%</span>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-2">Enheter</p>
            {streamer.devices.map((d) => (
              <div key={d.type} className="flex justify-between text-sm py-1">
                <span className="text-muted-foreground">{d.type === "Desktop" ? "💻" : "📱"} {d.type}</span>
                <span className="font-mono">{d.percentage}%</span>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-2">Aldersgrupper</p>
            {streamer.ageGroups.map((a) => (
              <div key={a.range} className="flex justify-between text-sm py-1">
                <span className="text-muted-foreground">{a.range}</span>
                <span className="font-mono">{a.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign History */}
        <div className="bg-card/50 border border-border/50 rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-4">Kampanjehistorikk</h3>
          <div className="space-y-3">
            {streamer.campaignHistory.map((c) => (
              <Link key={c.id} to={`/dashboard/campaigns/${c.id}`} className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-medium text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.date}</p>
                </div>
                <span className="font-mono text-foreground">{formatNumber(c.views)}</span>
              </Link>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">{streamer.campaignCount} kampanjer totalt</p>
        </div>
      </div>

      <HorizontalBarChart data={streamer.topCategories} title="Top Game Categories" />
    </div>
  );
};

export default StreamerProfile;
