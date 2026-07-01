import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import type { CreatorProfile, TwitchClip } from "@/data/norskeStreamere";

interface Labels {
  reachRanking: string;
  clipsChart: string;
  viewsUnit: string;
  avgViewers: string;
}

interface Props {
  creator: CreatorProfile;
  peers: CreatorProfile[];
  labels: Labels;
}

/** Snitt-seere for en creator: Beta Ads' egne tall foretrekkes, ellers TwitchTracker. */
const avgOf = (c: CreatorProfile): number | null =>
  c.betaStats?.avgViewers ?? c.trackerStats?.avgViewers ?? null;

const fmtNum = (n: number): string => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(".0", "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(".0", "") + "K";
  return String(Math.round(n));
};

const shorten = (t: string, n = 30): string => (t.length > n ? t.slice(0, n - 1) + "…" : t);

const SectionHead: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-2 mb-6">
    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
    <h2 className="text-xs font-semibold tracking-widest uppercase text-primary">{children}</h2>
  </div>
);

/**
 * To datagrafer på streamer-profilen:
 *  1. Rangering av snitt-seere mot resten av markedet (den aktive streameren i
 *     brand-rødt, resten dempet) — viser merkevarer hvor creatoren ligger.
 *  2. Mest sette Twitch-klipp etter visninger.
 * Begge på ekte tall (Beta Ads Streamer Explorer / TwitchTracker).
 */
export const StreamerStatsCharts: React.FC<Props> = ({ creator, peers, labels }) => {
  const selfAvg = avgOf(creator);

  // ── Reach ranking ─────────────────────────────────────────────────────────
  const ranked = peers
    .map((p) => ({ name: p.name, handle: p.handle, avg: avgOf(p) }))
    .filter((p): p is { name: string; handle: string; avg: number } => p.avg != null)
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 10)
    .map((p) => ({ ...p, self: p.handle === creator.handle }));

  const showRanking = selfAvg != null && ranked.length >= 4 && ranked.some((r) => r.self);

  // ── Clip views ────────────────────────────────────────────────────────────
  const clips: TwitchClip[] = creator.twitchClips ?? [];
  const clipData = clips
    .slice()
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 6)
    .map((c) => ({ name: shorten(c.title), views: c.viewCount }));
  const showClips = clipData.length >= 2;

  if (!showRanking && !showClips) return null;

  return (
    <section className="border-t border-border/60 pt-12 mb-14">
      <div className="grid lg:grid-cols-2 gap-x-14 gap-y-12">
        {showRanking && (
          <div>
            <SectionHead>{labels.reachRanking}</SectionHead>
            <div style={{ height: ranked.length * 40 + 12 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={ranked}
                  margin={{ top: 2, right: 52, bottom: 2, left: 4 }}
                  barCategoryGap="26%"
                >
                  <XAxis type="number" hide domain={[0, "dataMax"]} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={104}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <Bar dataKey="avg" radius={[0, 5, 5, 0]} isAnimationActive animationDuration={800}>
                    {ranked.map((r, i) => (
                      <Cell
                        key={i}
                        fill={r.self ? "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.28)"}
                      />
                    ))}
                    <LabelList
                      dataKey="avg"
                      position="right"
                      formatter={(v: number) => fmtNum(v)}
                      style={{ fill: "hsl(var(--foreground))", fontSize: 11, fontWeight: 600 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-muted-foreground/70 mt-4">{labels.avgViewers}</p>
          </div>
        )}

        {showClips && (
          <div>
            <SectionHead>{labels.clipsChart}</SectionHead>
            <div style={{ height: clipData.length * 44 + 12 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={clipData}
                  margin={{ top: 2, right: 52, bottom: 2, left: 4 }}
                  barCategoryGap="24%"
                >
                  <defs>
                    <linearGradient id="clipBarFill" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <XAxis type="number" hide domain={[0, "dataMax"]} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={150}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                  />
                  <Bar dataKey="views" radius={[0, 5, 5, 0]} fill="url(#clipBarFill)" isAnimationActive animationDuration={800}>
                    <LabelList
                      dataKey="views"
                      position="right"
                      formatter={(v: number) => fmtNum(v)}
                      style={{ fill: "hsl(var(--foreground))", fontSize: 11, fontWeight: 600 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-muted-foreground/70 mt-4">{labels.viewsUnit}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default StreamerStatsCharts;
