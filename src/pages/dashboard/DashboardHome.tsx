import React from "react";
import { Link } from "react-router-dom";
import { Eye, MousePointer, Percent, Users, ArrowRight } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { CampaignCard } from "@/components/dashboard/CampaignCard";
import { TopPerformerRow } from "@/components/dashboard/TopPerformerRow";
import { campaigns, streamers, dashboardMetrics, formatNumber } from "@/data/dashboardData";
import { Button } from "@/components/ui/button";

const DashboardHome: React.FC = () => {
  const activeCampaigns = campaigns.filter((c) => c.status === "ongoing").slice(0, 2);
  const topStreamers = streamers.slice(0, 5);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Streamer marketing med måling som funker
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto mb-6">
          Se hvor dine kampanjer treffer. Ingen skjulte tall. Bare resultater.
        </p>
        <Button className="bg-primary hover:bg-primary/90">
          Book demo
        </Button>
      </section>

      {/* Key Metrics Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          value={formatNumber(dashboardMetrics.thisMonth.views)}
          label="Views"
          sublabel="denne mnd"
          icon={<Eye className="h-5 w-5" />}
        />
        <MetricCard
          value={dashboardMetrics.thisMonth.clicks}
          label="Clicks"
          sublabel="denne mnd"
          icon={<MousePointer className="h-5 w-5" />}
        />
        <MetricCard
          value={`${dashboardMetrics.thisMonth.ctr}%`}
          label="CTR"
          sublabel="denne mnd"
          icon={<Percent className="h-5 w-5" />}
        />
        <MetricCard
          value={dashboardMetrics.thisMonth.activeStreamers}
          label="Streamers"
          sublabel="denne mnd"
          icon={<Users className="h-5 w-5" />}
        />
      </section>

      {/* Live Campaigns */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Aktive kampanjer nå</h2>
          <Link to="/dashboard/campaigns" className="text-sm text-primary hover:text-primary/80 flex items-center gap-1">
            Se alle kampanjer <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {activeCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Top Performers */}
        <section className="bg-card/50 backdrop-blur-sm shadow-lg shadow-black/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Streamere som leverer</h2>
          <div className="space-y-1">
            {topStreamers.map((streamer, index) => (
              <TopPerformerRow
                key={streamer.id}
                streamer={streamer}
                rank={index + 1}
                metric="views"
                metricValue={streamer.totalViews}
              />
            ))}
          </div>
        </section>

        {/* Audience Snapshot */}
        <section className="bg-card/50 backdrop-blur-sm shadow-lg shadow-black/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Hvor ser de fra?</h2>
            <Link to="/dashboard/audience" className="text-sm text-primary hover:text-primary/80">
              Mer om audience →
            </Link>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-muted-foreground">🇳🇴 Norge</span>
                <span className="font-mono font-medium">95%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "95%" }} />
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">🇸🇪 Sverige</span>
              <span className="font-mono">2%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">🇩🇪 Tyskland</span>
              <span className="font-mono">1%</span>
            </div>
            <div className="pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">💻 Desktop</span>
                <span className="font-mono font-medium">80%</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-muted-foreground">📱 Mobil</span>
                <span className="font-mono font-medium">20%</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardHome;
