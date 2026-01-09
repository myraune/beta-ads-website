import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getCampaignById, formatNumber, getTopStreamersForCampaign } from "@/data/dashboardData";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { DashboardLineChart, HorizontalBarChart } from "@/components/dashboard/DashboardChart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const CampaignDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const campaign = getCampaignById(id || "");

  if (!campaign) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Kampanje ikke funnet</p>
        <Link to="/dashboard/campaigns" className="text-primary hover:underline mt-2 inline-block">
          ← Tilbake til kampanjer
        </Link>
      </div>
    );
  }

  const topStreamers = getTopStreamersForCampaign(campaign);
  const isOngoing = campaign.status === "ongoing";

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <Link to="/dashboard/campaigns" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Tilbake til kampanjer
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{campaign.name}</h1>
          <p className="text-muted-foreground">
            {new Date(campaign.startDate).toLocaleDateString("no-NO")} – {new Date(campaign.endDate).toLocaleDateString("no-NO")} | {campaign.streamers.length} streamers
          </p>
        </div>
        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${isOngoing ? "bg-green-500/20 text-green-400" : "bg-muted text-muted-foreground"}`}>
          {isOngoing && <span className="relative flex h-2 w-2"><span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative rounded-full h-2 w-2 bg-green-500"></span></span>}
          {isOngoing ? "Aktiv" : "Ferdig"}
        </span>
      </div>

      {/* 3-Column Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-card/50 border border-border/50 rounded-xl p-5 space-y-4">
          <h3 className="font-semibold text-foreground">Campaign Display</h3>
          <div className="space-y-3">
            <div><span className="text-2xl font-bold font-mono">{formatNumber(campaign.views)}</span><p className="text-xs text-muted-foreground">Views</p></div>
            <div><span className="text-lg font-mono">{campaign.timesShown}</span><p className="text-xs text-muted-foreground">Times shown</p></div>
            <div><span className="text-lg font-mono">{campaign.watchTime}h</span><p className="text-xs text-muted-foreground">Watch time</p></div>
          </div>
        </div>
        <div className="bg-card/50 border border-border/50 rounded-xl p-5 space-y-4">
          <h3 className="font-semibold text-foreground">Interactions</h3>
          <div className="space-y-3">
            <div><span className="text-2xl font-bold font-mono">{campaign.clicks}</span><p className="text-xs text-muted-foreground">Clicks</p></div>
            <div><span className="text-lg font-mono">{campaign.ctr}%</span><p className="text-xs text-muted-foreground">CTR</p></div>
            <div><span className="text-lg font-mono">{campaign.chatClicks}</span><p className="text-xs text-muted-foreground">Chat clicks</p></div>
          </div>
        </div>
        <div className="bg-card/50 border border-border/50 rounded-xl p-5 space-y-4">
          <h3 className="font-semibold text-foreground">Audience</h3>
          {campaign.regions.slice(0, 3).map((r) => (
            <div key={r.country} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{r.country}</span>
              <span className="font-mono">{r.percentage}%</span>
            </div>
          ))}
          <div className="pt-2 border-t border-border/50">
            {campaign.devices.map((d) => (
              <div key={d.type} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{d.type === "Desktop" ? "💻" : "📱"} {d.type}</span>
                <span className="font-mono">{d.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      {campaign.dailyStats.length > 0 && (
        <DashboardLineChart data={campaign.dailyStats} />
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Streamers */}
        <div className="bg-card/50 border border-border/50 rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-4">Top 5 Streamers</h3>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50"><TableHead>Streamer</TableHead><TableHead className="text-right">Views</TableHead><TableHead className="text-right">Clicks</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {topStreamers.map((s, i) => (
                <TableRow key={s.name} className="border-border/50">
                  <TableCell><Link to={`/dashboard/streamers/${s.name.toLowerCase()}`} className="hover:text-primary">{i + 1}. {s.name}</Link></TableCell>
                  <TableCell className="text-right font-mono">{formatNumber(s.views)}</TableCell>
                  <TableCell className="text-right font-mono">{s.clicks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Categories */}
        <HorizontalBarChart data={campaign.categories} title="Top Categories" />
      </div>
    </div>
  );
};

export default CampaignDetail;
