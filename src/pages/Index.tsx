import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StatCard } from "@/components/analytics/StatCard";
import { PlatformToggle, PlatformFilter } from "@/components/analytics/PlatformToggle";
import { TrendChart, TrendPoint } from "@/components/analytics/TrendChart";
import { CreatorTable, CreatorMetric } from "@/components/analytics/CreatorTable";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Layers3,
  ShieldCheck,
  Signal,
  Sparkles,
  Users,
} from "lucide-react";

const creatorMetrics: CreatorMetric[] = [
  {
    name: "PixelNora",
    handle: "pixelnora",
    platform: "twitch",
    avgViewers: 3120,
    watchHours: 540,
    followerGrowth: 12,
    monetizationScore: 92,
    topCategory: "Valorant",
    momentum: "surging",
  },
  {
    name: "RetroWaveMike",
    handle: "retrowave",
    platform: "kick",
    avgViewers: 1580,
    watchHours: 410,
    followerGrowth: 8,
    monetizationScore: 84,
    topCategory: "Retro FPS",
    momentum: "stable",
  },
  {
    name: "ChefMika",
    handle: "chefmika",
    platform: "twitch",
    avgViewers: 920,
    watchHours: 280,
    followerGrowth: 5,
    monetizationScore: 76,
    topCategory: "IRL Food",
    momentum: "surging",
  },
  {
    name: "ArenaFox",
    handle: "arenafox",
    platform: "kick",
    avgViewers: 2050,
    watchHours: 460,
    followerGrowth: 14,
    monetizationScore: 88,
    topCategory: "Fighting Games",
    momentum: "surging",
  },
  {
    name: "StudySession",
    handle: "studywithme",
    platform: "twitch",
    avgViewers: 740,
    watchHours: 200,
    followerGrowth: 4,
    monetizationScore: 72,
    topCategory: "Just Chatting",
    momentum: "stable",
  },
  {
    name: "GGAnya",
    handle: "gganya",
    platform: "twitch",
    avgViewers: 2640,
    watchHours: 510,
    followerGrowth: 17,
    monetizationScore: 95,
    topCategory: "MOBA",
    momentum: "surging",
  },
  {
    name: "CryptoCaster",
    handle: "cryptocaster",
    platform: "kick",
    avgViewers: 1320,
    watchHours: 320,
    followerGrowth: -3,
    monetizationScore: 61,
    topCategory: "Markets",
    momentum: "watch",
  },
  {
    name: "IndieSky",
    handle: "indiesky",
    platform: "twitch",
    avgViewers: 610,
    watchHours: 180,
    followerGrowth: 6,
    monetizationScore: 68,
    topCategory: "Indie Games",
    momentum: "stable",
  },
];

const trendData: TrendPoint[] = [
  { week: "Mar 4", twitch: 38, kick: 16 },
  { week: "Mar 11", twitch: 41, kick: 18 },
  { week: "Mar 18", twitch: 45, kick: 19 },
  { week: "Mar 25", twitch: 47, kick: 21 },
  { week: "Apr 1", twitch: 52, kick: 23 },
  { week: "Apr 8", twitch: 55, kick: 24 },
  { week: "Apr 15", twitch: 58, kick: 26 },
];

const insightCards = [
  {
    title: "Sponsorship-ready pods",
    metric: "4 creators",
    description:
      "Twitch teams averaging 3.2k CCV with 94% brand-safe segments over the last 30 days.",
    icon: BarChart3,
  },
  {
    title: "Kick retention spike",
    metric: "+42% watch hours",
    description:
      "Crypto and markets audiences have compounded retention for three consecutive weeks.",
    icon: Signal,
  },
  {
    title: "Activation guardrails",
    metric: "0 strikes",
    description:
      "Automated compliance scans ensure creator partners stay within PG-13 policy thresholds.",
    icon: ShieldCheck,
  },
];

const formatNumber = (value: number) =>
  value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toLocaleString();

const Index = () => {
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>("all");

  const filteredCreators = useMemo(() => {
    if (platformFilter === "all") return creatorMetrics;
    return creatorMetrics.filter((creator) => creator.platform === platformFilter);
  }, [platformFilter]);

  const aggregates = useMemo(() => {
    const creatorCount = filteredCreators.length || 1;
    const totalWatchHours = filteredCreators.reduce(
      (sum, creator) => sum + creator.watchHours,
      0
    );
    const totalAvgViewers = filteredCreators.reduce(
      (sum, creator) => sum + creator.avgViewers,
      0
    );
    const averageFollowerDelta =
      filteredCreators.reduce((sum, creator) => sum + creator.followerGrowth, 0) /
      creatorCount;
    const averageMonetization =
      filteredCreators.reduce((sum, creator) => sum + creator.monetizationScore, 0) /
      creatorCount;
    const positiveMomentum = filteredCreators.length
      ? (filteredCreators.filter((creator) => creator.momentum === "surging").length /
          filteredCreators.length) *
        100
      : 0;

    return {
      totalWatchHours,
      totalAvgViewers,
      averageFollowerDelta,
      averageMonetization,
      positiveMomentum,
    };
  }, [filteredCreators]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/5 blur-2xl" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-20 pt-12 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-6 rounded-3xl border border-border/60 bg-gradient-to-br from-background/95 via-background to-background/70 p-8 shadow-xl md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
            <Badge className="w-fit gap-1 rounded-full bg-primary/10 text-primary">
              <Sparkles className="h-4 w-4" />
              Unified creator intelligence
            </Badge>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
                StreamPulse – analytics for Twitch & Kick teams
              </h1>
              <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                Monitor creators across platforms, surface monetization-ready pods, and track community health in minutes. All powered by live platform data and automated QA.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm" className="gap-1 rounded-full">
                Request beta access
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="rounded-full border-dashed">
                Download sample report
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-end gap-4 text-sm text-muted-foreground">
            <PlatformToggle value={platformFilter} onChange={setPlatformFilter} />
            <Separator className="w-24 bg-border/60" />
            <div className="text-right text-xs uppercase tracking-wide text-muted-foreground/80">
              Last refresh • 4 minutes ago
            </div>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Creators tracked"
            value={`${filteredCreators.length}`}
            helper="Linked to your campaign workspace"
            delta={{ value: "+3 this month", positive: true }}
            icon={<Users className="h-4 w-4" />}
          />
          <StatCard
            title="Average live reach"
            value={`${formatNumber(aggregates.totalAvgViewers)} viewers`}
            helper="Concurrent viewers across active cohorts"
            delta={{ value: "+11%", positive: true, label: "vs last 30d" }}
            icon={<Signal className="h-4 w-4" />}
          />
          <StatCard
            title="Monetization health"
            value={`${Math.round(aggregates.averageMonetization)}/100`}
            helper="Composite score across CPM, fill rate and sentiment"
            delta={{ value: "+6 pts", positive: true, label: "QoQ" }}
            icon={<ShieldCheck className="h-4 w-4" />}
          />
          <StatCard
            title="Positive momentum"
            value={`${Math.round(aggregates.positiveMomentum)}%`}
            helper="Creators accelerating in the last 14 days"
            delta={{ value: "+2 creators", positive: true }}
            icon={<Activity className="h-4 w-4" />}
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <TrendChart data={trendData} />
          <div className="flex flex-col gap-4 rounded-3xl border border-border/60 bg-gradient-to-br from-background via-background to-background/60 p-6 shadow-xl">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">Why teams switch to StreamPulse</h2>
              <p className="text-sm text-muted-foreground">
                Built for partnerships, agencies, and e-sports orgs managing multi-platform rosters.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-muted/10 p-4">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <Layers3 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Unified roster snapshots</p>
                  <p className="text-sm text-muted-foreground">
                    Sync Twitch & Kick stats, alerts, and sponsorship notes into a single workspace.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-muted/10 p-4">
                <div className="rounded-full bg-emerald-500/10 p-2 text-emerald-300">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">AI-surfaced opportunities</p>
                  <p className="text-sm text-muted-foreground">
                    Auto-prioritized creator pods and inventory based on growth, CPM, and sentiment trends.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-muted/10 p-4">
                <div className="rounded-full bg-sky-500/10 p-2 text-sky-300">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Brand safety automation</p>
                  <p className="text-sm text-muted-foreground">
                    Weekly compliance checks with highlights of flagged VOD segments and chat anomalies.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-4 text-sm text-muted-foreground">
              <p className="font-medium text-primary">Need raw exports?</p>
              <p>
                Push creator insights directly into your CRM or Slack using our REST or Supabase streaming API.
              </p>
            </div>
          </div>
        </section>

        <CreatorTable creators={filteredCreators} />

        <section className="grid gap-4 md:grid-cols-3">
          {insightCards.map((card) => (
            <div
              key={card.title}
              className="flex h-full flex-col gap-3 rounded-3xl border border-border/60 bg-gradient-to-br from-background via-background to-background/60 p-6 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <card.icon className="h-4 w-4" />
                </div>
                <Badge variant="outline" className="rounded-full border-border/40 text-[10px] uppercase tracking-wide">
                  Insight
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">{card.metric}</p>
                <h3 className="text-base font-semibold">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-primary/50 bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 p-8 text-center shadow-xl">
          <div className="flex flex-col items-center gap-4">
            <Badge className="rounded-full bg-background/90 text-xs uppercase tracking-wide text-primary">
              Built for modern creator teams
            </Badge>
            <h2 className="max-w-2xl text-2xl font-semibold sm:text-3xl">
              Start every sponsorship sync with live, trustworthy analytics.
            </h2>
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
              StreamPulse consolidates creator performance, sentiment, and activation health so your partnerships team can move from decks to deals faster.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="sm" className="gap-1 rounded-full">
                Book a walkthrough
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="rounded-full border-dashed">
                Explore the API
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
