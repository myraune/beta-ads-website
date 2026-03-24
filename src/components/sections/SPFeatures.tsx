import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  Search,
  Target,
  Rocket,
  BarChart3,
  FileText,
  Check,
  Users,
  Eye,
  Filter,
  ChevronDown,
  Globe,
  MessageSquare,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   FEATURE SECTIONS — SendPilot-style scroll-through layout
   Each feature = full-width section with left text + right preview
   Left sidebar nav sticks and highlights the active section
   ═══════════════════════════════════════════════════════════ */

const features = [
  {
    id: "streamers",
    label: "Streamers",
    icon: Search,
    title: "Find the perfect streamers",
    description:
      "Browse 39,000+ recently active streamers. Filter by game, audience size, engagement rate, language, and platform. Find the right fit for your campaign.",
    bullets: [
      "Filter by game, language, platform",
      "Sort by viewer count, engagement, category",
      "Audience demographics & overlap data",
    ],
    stat: { value: "39,445", label: "streamers in our database" },
  },
  {
    id: "targeting",
    label: "Targeting",
    icon: Target,
    title: "Reach exactly who you want",
    description:
      "Target by game genre, viewer demographics, and platform. Score every streamer against your ideal customer profile and rank them by fit.",
    bullets: [
      "Game genre & category targeting",
      "Demographic filters (age, region, language)",
      "Match scoring with percentage",
    ],
    stat: { value: "2.9%", label: "average CTR with targeted campaigns" },
  },
  {
    id: "launch",
    label: "Launch",
    icon: Rocket,
    title: "Go live across hundreds of streams",
    description:
      "Deploy your campaign to selected streamers in one click. Overlays render automatically inside OBS — no streamer setup required.",
    bullets: [
      "One-click deployment to all streamers",
      "Auto OBS integration — zero streamer effort",
      "Schedule campaigns in advance",
    ],
    stat: { value: "48", label: "streamers activated in one campaign" },
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    title: "Track everything in real-time",
    description:
      "Live dashboards show impressions, CTR, engagement, and conversions as they happen. Compare streamers, optimize spend, and export reports.",
    bullets: [
      "Real-time impression & CTR tracking",
      "Per-streamer performance breakdown",
      "ROI attribution & conversion tracking",
    ],
    stat: { value: "2.6M+", label: "total impressions tracked" },
  },
  {
    id: "reporting",
    label: "Reports",
    icon: FileText,
    title: "Automated campaign reports",
    description:
      "Weekly and monthly reports generated automatically. Share branded PDF reports with clients or export raw data.",
    bullets: [
      "Auto-generated weekly reports",
      "Branded PDF export for clients",
      "CSV/API data export",
    ],
    stat: { value: "50+", label: "brands served with reports" },
  },
];

/* ── Streamer Explorer Preview ── */

const streamers = [
  { name: "RubenGKS", game: "Fortnite", viewers: "2.8K", platform: "Twitch", score: 94, avatar: "/lovable-uploads/rubengks-profile.png" },
  { name: "Aienia", game: "Valorant", viewers: "1.2K", platform: "Twitch", score: 91, avatar: "/lovable-uploads/streamer-aienia.gif" },
  { name: "Emmelie", game: "Just Chatting", viewers: "890", platform: "YouTube", score: 87, avatar: "/lovable-uploads/streamer-emmelie.gif" },
  { name: "Pernataia", game: "League of Legends", viewers: "1.5K", platform: "Kick", score: 89, avatar: "/lovable-uploads/streamer-pernataia.gif" },
  { name: "DannizTV", game: "CS2", viewers: "3.1K", platform: "Twitch", score: 96, avatar: null },
];

const StreamerPreview: React.FC = () => (
  <div className="bg-card overflow-hidden">
    {/* Top bar */}
    <div className="p-4 border-b border-border">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background">
          <Search className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Search streamers...</span>
        </div>
        <button className="px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5" /> Filters
        </button>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {["Fortnite", "Valorant", "CS2", "Just Chatting", "Minecraft", "GTA V"].map((g, i) => (
          <span key={g} className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors cursor-default ${
            i < 2 ? "border-primary/30 bg-primary/5 text-primary" : "border-border text-muted-foreground"
          }`}>
            {g}
          </span>
        ))}
        <span className="text-[11px] text-primary font-medium cursor-default">+18 more</span>
      </div>
    </div>

    {/* Stats bar */}
    <div className="px-4 py-2.5 border-b border-border bg-muted/30 flex items-center gap-6">
      <span className="text-[11px] text-muted-foreground">Showing <strong className="text-foreground">39,445</strong> streamers</span>
      <span className="text-[11px] text-muted-foreground">Avg viewers: <strong className="text-foreground">1,247</strong></span>
      <span className="text-[11px] text-muted-foreground ml-auto">Sort: <strong className="text-foreground">Match score ↓</strong></span>
    </div>

    {/* Table header */}
    <div className="px-4 py-2 border-b border-border grid grid-cols-[40px_1fr_80px_80px_70px_60px] gap-3 items-center">
      <div />
      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Streamer</span>
      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Platform</span>
      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Viewers</span>
      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Match</span>
      <div />
    </div>

    {/* Streamer rows */}
    <div className="divide-y divide-border/50">
      {streamers.map((s) => (
        <div key={s.name} className="px-4 py-3 grid grid-cols-[40px_1fr_80px_80px_70px_60px] gap-3 items-center hover:bg-muted/30 transition-colors group">
          <div className="w-9 h-9 rounded-full bg-muted overflow-hidden">
            {s.avatar ? (
              <img src={s.avatar} alt={s.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs font-bold text-muted-foreground bg-muted">{s.name[0]}</div>
            )}
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">{s.name}</div>
            <div className="text-[11px] text-muted-foreground">{s.game}</div>
          </div>
          <div className="text-[11px] text-muted-foreground">{s.platform}</div>
          <div className="text-sm font-medium text-foreground">{s.viewers}</div>
          <div className={`text-sm font-bold ${s.score >= 90 ? "text-emerald-500" : "text-yellow-500"}`}>
            {s.score}%
          </div>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] px-2.5 py-1 rounded-lg bg-primary text-white font-medium">
            Add
          </button>
        </div>
      ))}
    </div>
  </div>
);

/* ── Targeting Preview ── */

const TargetingPreview: React.FC = () => (
  <div className="rounded-xl border border-border bg-card overflow-hidden">
    <div className="p-4 border-b border-border">
      <div className="text-xs font-semibold text-foreground mb-3">Audience Targeting</div>
      <div className="space-y-3">
        {[
          { label: "Game Genre", value: "FPS, Battle Royale", icon: Globe },
          { label: "Region", value: "Norway, Sweden", icon: Globe },
          { label: "Age Range", value: "18–34", icon: Users },
          { label: "Min Viewers", value: "500+", icon: Eye },
        ].map((f) => (
          <div key={f.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <f.icon className="w-3 h-3 text-muted-foreground" />
              <span className="text-[11px] text-muted-foreground">{f.label}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-medium text-foreground">
              {f.value} <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-foreground">ICP Match Results</span>
        <span className="text-[10px] text-primary font-medium">2,847 streamers</span>
      </div>
      {[
        { label: "High match (90%+)", count: 342, pct: 80, color: "bg-emerald-500" },
        { label: "Good match (70-90%)", count: 1205, pct: 60, color: "bg-yellow-500" },
        { label: "Low match (<70%)", count: 1300, pct: 40, color: "bg-muted-foreground/30" },
      ].map((m) => (
        <div key={m.label} className="mb-2.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-muted-foreground">{m.label}</span>
            <span className="text-[10px] font-medium text-foreground">{m.count}</span>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div className={`h-full rounded-full ${m.color}`} style={{ width: `${m.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ── Launch Preview ── */

const LaunchPreview: React.FC = () => {
  const [launched, setLaunched] = useState(false);
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-semibold text-foreground">Samsung Galaxy S26</div>
          <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${launched ? "bg-emerald-500/10 text-emerald-500" : "bg-yellow-500/10 text-yellow-500"}`}>
            {launched ? "Live" : "Ready"}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Streamers", value: "48" },
            { label: "Format", value: "Rich Media" },
            { label: "Duration", value: "2 weeks" },
          ].map((s) => (
            <div key={s.label} className="text-center p-2.5 rounded-lg bg-muted/50">
              <div className="text-sm font-bold text-foreground">{s.value}</div>
              <div className="text-[9px] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4">
        <div className="space-y-2 mb-4">
          {["RubenGKS", "Aienia", "DannizTV"].map((name) => (
            <div key={name} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${launched ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground/30"}`} />
              <span className="text-[11px] text-foreground">{name}</span>
              <span className="text-[9px] text-muted-foreground ml-auto">{launched ? "Overlay active" : "Pending"}</span>
            </div>
          ))}
          <div className="text-[10px] text-muted-foreground">+45 more streamers</div>
        </div>
        <button
          onClick={() => setLaunched(!launched)}
          className={`w-full py-2.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
            launched ? "bg-muted text-muted-foreground" : "bg-primary text-white shadow-md"
          }`}
        >
          {launched ? "Pause Campaign" : "Launch Campaign →"}
        </button>
      </div>
    </div>
  );
};

/* ── Analytics Preview ── */

const AnalyticsPreview: React.FC = () => (
  <div className="rounded-xl border border-border bg-card overflow-hidden">
    <div className="p-4 border-b border-border">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs font-semibold text-foreground">Campaign Performance</div>
        <span className="text-[9px] px-2 py-0.5 rounded bg-muted text-muted-foreground">Last 7 days</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Impressions", value: "412K", trend: "+24%", up: true },
          { label: "Clicks", value: "5,842", trend: "+18%", up: true },
          { label: "CTR", value: "1.41%", trend: "+0.3%", up: true },
          { label: "Spend", value: "€18.4K", trend: "-2%", up: false },
        ].map((m) => (
          <div key={m.label} className="p-2 rounded-lg bg-muted/40">
            <div className="text-[9px] text-muted-foreground mb-0.5">{m.label}</div>
            <div className="text-sm font-bold text-foreground">{m.value}</div>
            <div className={`text-[9px] font-medium ${m.up ? "text-emerald-500" : "text-red-400"}`}>{m.trend}</div>
          </div>
        ))}
      </div>
    </div>
    <div className="p-4">
      <div className="text-[10px] text-muted-foreground mb-2">Daily impressions</div>
      <div className="flex items-end gap-[3px] h-20">
        {[35, 42, 38, 55, 48, 62, 58, 71, 65, 78, 72, 85, 80, 92].map((v, i) => (
          <div key={i} className="flex-1 rounded-sm bg-primary/20 hover:bg-primary/40 transition-colors" style={{ height: `${v}%` }} />
        ))}
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-[8px] text-muted-foreground">Mar 10</span>
        <span className="text-[8px] text-muted-foreground">Mar 23</span>
      </div>
    </div>
  </div>
);

/* ── Reports Preview ── */

const ReportsPreview: React.FC = () => (
  <div className="rounded-xl border border-border bg-card overflow-hidden">
    <div className="p-4 border-b border-border">
      <div className="text-xs font-semibold text-foreground mb-3">Generated Reports</div>
      <div className="space-y-2">
        {[
          { name: "Samsung Galaxy S26 — Week 3", date: "Mar 21, 2026" },
          { name: "Samsung Galaxy S26 — Week 2", date: "Mar 14, 2026" },
          { name: "Shure MV6 — Final Report", date: "Mar 10, 2026" },
        ].map((r) => (
          <div key={r.name} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group">
            <FileText className="w-4 h-4 text-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-medium text-foreground truncate">{r.name}</div>
              <div className="text-[9px] text-muted-foreground">{r.date}</div>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Download
            </span>
          </div>
        ))}
      </div>
    </div>
    <div className="p-4">
      <div className="flex items-center gap-2 p-2.5 rounded-lg border border-border">
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
        <span className="text-[11px] text-foreground">Weekly report — every Monday 9:00 AM</span>
        <span className="text-[9px] text-primary font-medium ml-auto">Active</span>
      </div>
    </div>
  </div>
);

const previewComponents: Record<string, React.FC> = {
  streamers: StreamerPreview,
  targeting: TargetingPreview,
  launch: LaunchPreview,
  analytics: AnalyticsPreview,
  reporting: ReportsPreview,
};

/* ── Single Feature Section ── */

const FeatureSection: React.FC<{
  feature: (typeof features)[0];
  isActive: boolean;
}> = ({ feature, isActive }) => {
  const Preview = previewComponents[feature.id];

  return (
    <div className="py-20 md:py-32 border-b border-border/30 last:border-b-0">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        {/* Left: text content — sticky on desktop */}
        <div className="lg:w-[35%] lg:sticky lg:top-32 space-y-6">
          <div className="flex items-center gap-2">
            <feature.icon className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">{feature.label}</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-[1.15]">
            {feature.title}
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            {feature.description}
          </p>
          <ul className="space-y-3 pt-2">
            {feature.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                {b}
              </li>
            ))}
          </ul>

          {/* Social proof stat */}
          {feature.stat && (
            <div className="pt-4 border-t border-border/50">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">{feature.stat.value}</span>
                <span className="text-sm text-muted-foreground">{feature.stat.label}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right: large preview — overflows slightly for depth */}
        <div className="lg:w-[65%] w-full relative">
          <div className="lg:-mr-8 xl:-mr-16">
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/[0.08] dark:shadow-black/30 border border-border/50">
              <Preview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   FEATURES — Scroll-through with sticky sidebar
   ═══════════════════════════════════════════════ */

export const SPFeatures: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeId, setActiveId] = useState(features[0].id);

  // Track which section is in view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(features[i].id);
          }
        },
        { threshold: 0.3, rootMargin: "-20% 0px -50% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const idx = features.findIndex((f) => f.id === id);
    const el = sectionRefs.current[idx];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <section aria-label="Features" className="relative z-10">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto pt-20 md:pt-28 pb-8">
          <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary mb-4">
            Platform
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
            Everything you need to
            <br />
            <span className="text-primary">run campaigns at scale</span>
          </h2>
          <p className="text-muted-foreground">
            From finding streamers to tracking ROI — one platform for everything.
          </p>
        </div>

        {/* Mobile tab bar — outside flex container */}
        <div className="lg:hidden sticky top-16 z-20 py-3 bg-background/80 backdrop-blur-md border-b border-border mb-4">
          <div className="flex gap-1 overflow-x-auto pb-1">
            {features.map((f) => {
              const Icon = f.icon;
              const isActive = f.id === activeId;
              return (
                <button
                  key={f.id}
                  onClick={() => scrollToSection(f.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap text-xs font-medium transition-all ${
                    isActive
                      ? "bg-primary/10 text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-primary" : ""}`} />
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content area with sticky sidebar */}
        <div ref={containerRef} className="relative flex gap-0 lg:gap-8">
          {/* Sticky sidebar nav — desktop only */}
          <div className="hidden lg:block w-48 shrink-0">
            <div className="sticky top-28 space-y-1">
              {features.map((f) => {
                const Icon = f.icon;
                const isActive = f.id === activeId;
                return (
                  <button
                    key={f.id}
                    onClick={() => scrollToSection(f.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                      isActive
                        ? "bg-primary/10 text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-primary" : ""}`} />
                    <span className="text-sm font-medium">{f.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feature sections */}
          <div className="flex-1 min-w-0">
            {features.map((feature, i) => (
              <div
                key={feature.id}
                ref={(el) => { sectionRefs.current[i] = el; }}
              >
                <FeatureSection feature={feature} isActive={feature.id === activeId} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
