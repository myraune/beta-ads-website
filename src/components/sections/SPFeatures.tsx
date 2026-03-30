import React, { useRef, useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import {
  Search,
  Eye,
  Filter,
  FileText,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  X as XIcon,
  Zap,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from "lucide-react";
import { ChartVisual3 } from "@/components/ui/animated-card-chart";
import GlobeMarketMap from "@/components/ui/wireframe-dotted-globe";
import {
  IconStreamers,
  IconTarget,
  IconLaunch,
  IconAnalytics,
  IconReports,
  IconGlobe,
} from "@/components/icons/BetaIcons";

/* ═══════════════════════════════════════════════════════════
   FEATURE SECTIONS — Apple-style clean scroll-through layout
   ═══════════════════════════════════════════════════════════ */

const features = [
  {
    id: "streamers",
    label: "Streamers",
    icon: IconStreamers,
    title: "Find the perfect streamers",
    description:
      "Browse 39,000+ recently active streamers. Filter by game, audience size, engagement rate, language, and platform.",
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
    icon: IconTarget,
    title: "Reach exactly who you want",
    description:
      "Target by game genre, viewer demographics, and platform. Score every streamer against your ideal customer profile.",
    bullets: [
      "Game genre & category targeting",
      "Demographic filters (age, region, language)",
      "Match scoring with percentage",
    ],
    stat: { value: "2.93%", label: "avg CTR — Samsung S25 Ultra campaign" },
  },
  {
    id: "launch",
    label: "Creative",
    icon: IconLaunch,
    title: "Custom animated overlays, built per brand",
    description:
      "Every campaign gets bespoke motion design — crafted to feel native inside the stream, not bolted on top.",
    bullets: [
      "Frame-accurate brand animations",
      "Designed from scratch for each campaign",
      "Renders directly inside OBS — zero streamer setup",
    ],
    stat: { value: "100%", label: "custom-designed per brand" },
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: IconAnalytics,
    title: "Track everything in real-time",
    description:
      "Live dashboards show impressions, CTR, engagement, and conversions as they happen.",
    bullets: [
      "Real-time impression & CTR tracking",
      "Per-streamer performance breakdown",
      "ROI attribution & conversion tracking",
    ],
    stat: { value: "1.4M+", label: "completed views tracked" },
  },
  {
    id: "reporting",
    label: "Reports",
    icon: IconReports,
    title: "Automated campaign reports",
    description:
      "Weekly and monthly reports generated automatically. Share branded PDF reports with clients.",
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
  { name: "Aienia", game: "Valorant", viewers: "1.2K", platform: "Twitch", score: 91, avatar: "/lovable-uploads/streamer-aienia.jpg" },
  { name: "Emmelie", game: "Just Chatting", viewers: "890", platform: "YouTube", score: 87, avatar: "/lovable-uploads/streamer-emmelie.jpg" },
  { name: "Pernataia", game: "League of Legends", viewers: "1.5K", platform: "Kick", score: 89, avatar: "/lovable-uploads/streamer-pernataia.jpg" },
  { name: "DannizTV", game: "CS2", viewers: "3.1K", platform: "Twitch", score: 96, avatar: null },
];

const GAMES = ["Fortnite", "Valorant", "CS2", "Just Chatting", "Minecraft"];

const StreamerPreview: React.FC = () => {
  const [activeGames, setActiveGames] = useState<string[]>(["Fortnite", "Valorant"]);
  const [added, setAdded] = useState<Record<string, boolean>>({});

  const toggle = (g: string) =>
    setActiveGames((prev) => prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]);

  const handleAdd = (name: string) => {
    setAdded((prev) => ({ ...prev, [name]: true }));
    setTimeout(() => setAdded((prev) => ({ ...prev, [name]: false })), 1800);
  };

  const visible = activeGames.length === 0
    ? streamers
    : streamers.filter((s) => activeGames.includes(s.game));

  return (
    <div className="overflow-hidden">
      {/* Search bar */}
      <div className="p-5 border-b border-border/50 dark:border-white/[0.08]">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-border/50 dark:border-white/[0.12] bg-muted/30 dark:bg-white/[0.04]">
            <Search className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground dark:text-white/50">Search streamers...</span>
          </div>
          <button className="px-3.5 py-2.5 rounded-xl bg-primary/15 text-primary text-sm font-medium flex items-center gap-2">
            <Filter className="w-3.5 h-3.5" /> Filters
          </button>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {GAMES.map((g) => {
            const active = activeGames.includes(g);
            return (
              <button
                key={g}
                onClick={() => toggle(g)}
                className={`text-[11px] px-3 py-1.5 rounded-full border transition-all duration-200 ${
                  active
                    ? "border-primary/40 bg-primary/15 text-primary font-medium scale-[1.04]"
                    : "border-border/60 dark:border-white/[0.12] text-muted-foreground dark:text-white/40 hover:border-primary/30 hover:text-primary/70"
                }`}
              >
                {g}
              </button>
            );
          })}
          <span className="text-[11px] text-primary/70 font-medium">+18 more</span>
        </div>
      </div>

      {/* Stats bar */}
      <div className="px-5 py-2.5 border-b border-border/40 dark:border-white/[0.07] bg-muted/20 dark:bg-white/[0.03] flex items-center gap-6">
        <span className="text-[11px] text-muted-foreground">
          Showing <strong className="text-foreground font-semibold tabular-nums">
            {activeGames.length === 0 ? "39,445" : `${visible.length * 3_412 + visible.length * 211}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </strong> streamers
        </span>
        <span className="text-[11px] text-muted-foreground">Avg viewers: <strong className="text-foreground font-semibold">1,247</strong></span>
        <span className="text-[11px] text-muted-foreground ml-auto">Sort: <strong className="text-foreground font-semibold">Match score ↓</strong></span>
      </div>

      {/* Table header */}
      <div className="px-5 py-2.5 border-b border-border/50 dark:border-white/[0.08] grid grid-cols-[36px_1fr_72px_72px_60px_52px] gap-3 items-center">
        <div />
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Streamer</span>
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Platform</span>
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Viewers</span>
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Match</span>
        <div />
      </div>

      {/* Streamer rows */}
      <div>
        {visible.length === 0 ? (
          <div className="px-5 py-8 text-center text-[12px] text-muted-foreground">No streamers match selected filters</div>
        ) : (
          visible.map((s, idx) => (
            <motion.div
              key={s.name}
              layout
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ delay: idx * 0.05, duration: 0.25 }}
              className={`px-5 py-3 grid grid-cols-[36px_1fr_72px_72px_60px_52px] gap-3 items-center transition-all duration-200 group border-b border-border/20 dark:border-white/[0.06] last:border-b-0 ${
                added[s.name] ? "bg-[#5adbb5]/8" : "hover:bg-muted/30 dark:hover:bg-white/[0.05]"
              }`}
            >
              <div className="w-9 h-9 rounded-full bg-muted/40 overflow-hidden ring-1 ring-white/10">
                {s.avatar ? (
                  <img src={s.avatar} alt={s.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-bold text-muted-foreground">{s.name[0]}</div>
                )}
              </div>
              <div>
                <div className="text-[13px] font-semibold text-foreground">{s.name}</div>
                <div className="text-[11px] text-muted-foreground">{s.game}</div>
              </div>
              <div className="text-[11px] text-muted-foreground">{s.platform}</div>
              <div className="text-[13px] font-medium text-foreground tabular-nums">{s.viewers}</div>
              <div className={`text-[13px] font-bold tabular-nums ${s.score >= 90 ? "text-[#5adbb5]" : "text-amber-400"}`}>
                {s.score}%
              </div>
              <motion.button
                onClick={() => handleAdd(s.name)}
                whileTap={{ scale: 0.92 }}
                className={`transition-all duration-300 text-[10px] px-2.5 py-1.5 rounded-lg font-medium ${
                  added[s.name]
                    ? "bg-[#5adbb5]/20 text-[#5adbb5] opacity-100"
                    : "opacity-0 group-hover:opacity-100 bg-primary text-white"
                }`}
              >
                {added[s.name] ? "✓ Added" : "Add"}
              </motion.button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

/* ── Targeting Preview ── */

const FILTER_OPTIONS: Record<string, string[]> = {
  "Game Genre": ["FPS, Battle Royale", "MOBA, Strategy", "RPG, Adventure", "Sports, Racing"],
  "Region": ["Norway, Sweden", "Denmark, Finland", "Germany, UK", "All Nordic"],
  "Age Range": ["18–34", "25–44", "13–24", "All Ages"],
  "Min Viewers": ["500+", "1,000+", "2,500+", "100+"],
};

const MATCH_PROFILES = [
  { total: "2,847", high: 342, highPct: 80, good: 1205, goodPct: 60, low: 1300 },
  { total: "2,050", high: 180, highPct: 44, good: 890, goodPct: 72, low: 980 },
  { total: "1,595", high: 215, highPct: 52, good: 760, goodPct: 65, low: 620 },
  { total: "1,195", high: 95, highPct: 24, good: 420, goodPct: 55, low: 680 },
];

const FILTER_ICONS: Record<string, React.FC<{ className?: string }>> = {
  "Game Genre": IconGlobe,
  "Region": IconGlobe,
  "Age Range": IconStreamers,
  "Min Viewers": Eye,
};

const TargetingPreview: React.FC = () => {
  const [indices, setIndices] = useState<Record<string, number>>({ "Game Genre": 0, "Region": 0, "Age Range": 0, "Min Viewers": 0 });
  const profileIdx = indices["Game Genre"] % MATCH_PROFILES.length;
  const profile = MATCH_PROFILES[profileIdx];

  const cycle = (label: string) =>
    setIndices((prev) => ({ ...prev, [label]: (prev[label] + 1) % FILTER_OPTIONS[label].length }));

  return (
  <div className="overflow-hidden">
    <div className="p-5 border-b border-border/50 dark:border-white/[0.08]">
      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Audience Targeting</div>
      <div className="space-y-4">
        {Object.entries(FILTER_OPTIONS).map(([label, options], idx) => {
          const Icon = FILTER_ICONS[label];
          return (
          <motion.button
            key={label}
            onClick={() => cycle(label)}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.3 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-muted/40 dark:bg-white/[0.06] hover:bg-primary/8 dark:hover:bg-white/[0.09] border border-transparent hover:border-primary/20 dark:border-white/[0.06] transition-all duration-200 text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-[12px] text-muted-foreground">{label}</span>
            </div>
            <motion.div
              key={options[indices[label]]}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5 text-[12px] font-medium text-foreground"
            >
              {options[indices[label]]} <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </motion.div>
          </motion.button>
          );
        })}
      </div>
    </div>
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">ICP Match Results</span>
        <motion.span
          key={profile.total}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-[11px] text-primary font-semibold"
        >
          {profile.total} streamers
        </motion.span>
      </div>
      {[
        { label: "High match (90%+)", count: profile.high, pct: profile.highPct, color: "bg-[#5adbb5]" },
        { label: "Good match (70-90%)", count: profile.good, pct: profile.goodPct, color: "bg-amber-400" },
        { label: "Low match (<70%)", count: profile.low, pct: 40, color: "bg-muted/50" },
      ].map((m, idx) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + idx * 0.1 }}
          className="mb-3"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] text-muted-foreground">{m.label}</span>
            <motion.span
              key={m.count}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[11px] font-semibold text-foreground tabular-nums"
            >
              {m.count}
            </motion.span>
          </div>
          <div className="h-2 rounded-full bg-muted/50 dark:bg-white/[0.08] overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${m.color}`}
              initial={{ width: 0 }}
              animate={{ width: `${m.pct}%` }}
              whileInView={{ width: `${m.pct}%` }}
              viewport={{ once: false, margin: "0px 0px -80px 0px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
  );
};

/* ── Ad Artwork Carousel ── */

// format: "fullscreen" = 1920x1080 transparent overlay (fills frame)
//         "widget"     = 450x450 positioned overlay (shown as corner element)
const ARTWORK = [
  { brand: "Burger King", campaign: "Gaming Promotion", src: "/lovable-uploads/overlay-burgerking.webm", format: "fullscreen" },
  { brand: "Samsung", campaign: "Galaxy S25 Ultra", src: "/lovable-uploads/overlay-samsung.webm", format: "widget" },
  { brand: "Foodora", campaign: "Delivery Campaign", src: "/lovable-uploads/overlay-foodora.webm", format: "fullscreen" },
  { brand: "Ben & Jerry's", campaign: "Gaming Promotion", src: "/lovable-uploads/overlay-benjerrys.webm", format: "fullscreen" },
  { brand: "Disney", campaign: "Streaming Launch", src: "/lovable-uploads/overlay-disney.webm", format: "fullscreen" },
  { brand: "Glorious", campaign: "Gaming Mouse", src: "/lovable-uploads/overlay-glorious.webm", format: "widget" },
  { brand: "Fanta", campaign: "Gaming Engagement", src: "/lovable-uploads/overlay-fanta.webm", format: "fullscreen" },
  { brand: "Shark Gaming", campaign: "PC Hardware", src: "/lovable-uploads/overlay-sharkgaming.webm", format: "widget" },
  { brand: "Samsung", campaign: "Galaxy ZFold7", src: "/lovable-uploads/samsung-zfold7-overlay.webm", format: "widget" },
  { brand: "Logitech", campaign: "Gaming Peripherals", src: "/lovable-uploads/overlay-logitech.webm", format: "fullscreen" },
];

const LaunchPreview: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((dir: 1 | -1) => {
    setCurrent(c => (c + dir + ARTWORK.length) % ARTWORK.length);
  }, []);

  useEffect(() => {
    if (hovered) { if (timerRef.current) clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => go(1), 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [hovered, go]);

  const item = ARTWORK[current];

  return (
    <div className="overflow-hidden" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {/* Video stage — Valorant stream as background */}
      <div className="relative group" style={{ aspectRatio: '16/9' }}>
        {/* Stream background */}
        <img
          src="/lovable-uploads/stream-bg-valorant.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden
        />
        {/* Dark overlay so ad animation pops */}
        <div className="absolute inset-0 bg-black/25" aria-hidden />

        {item.format === "fullscreen" ? (
          /* Fullscreen transparent overlay — fills the entire frame */
          <motion.video
            key={item.src}
            src={item.src}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          />
        ) : (
          /* Widget overlay — 450x450 corner element, shown bottom-right like in OBS */
          <motion.video
            key={item.src}
            src={item.src}
            autoPlay
            loop
            muted
            playsInline
            className="absolute"
            style={{ width: '32%', aspectRatio: '1/1', bottom: '8%', right: '4%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          />
        )}

        {/* Brand label */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md rounded-lg px-3 py-1.5">
          <div className="text-white text-[12px] font-semibold leading-tight">{item.brand}</div>
          <div className="text-white/55 text-[10px]">{item.campaign}</div>
        </div>

        {/* Nav arrows — visible on hover */}
        <button
          onClick={() => go(-1)}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => go(1)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Dot navigation + counter */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border/30 dark:border-white/[0.08]">
        <span className="text-[11px] text-muted-foreground tabular-nums">{current + 1} / {ARTWORK.length}</span>
        <div className="flex items-center gap-1.5">
          {ARTWORK.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? "w-5 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-muted-foreground/25 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
        <span className="text-[11px] text-muted-foreground">{hovered ? "Paused" : "Auto"}</span>
      </div>
    </div>
  );
};

/* ── Analytics Preview — Interactive Charts ── */


const AnalyticsPreview: React.FC = () => (
  <div className="overflow-hidden">
    <div className="relative w-full overflow-hidden" style={{ height: 240 }}>
      <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'scale(1.85)', transformOrigin: 'center 42%' }}>
        <ChartVisual3 mainColor="#e94f37" secondaryColor="#5adbb5" />
      </div>
    </div>
    <div className="px-5 py-4 border-t border-border/30">
      <h4 className="text-sm font-semibold text-foreground mb-1">Live Campaign Performance</h4>
      <p className="text-[12px] text-muted-foreground leading-relaxed">
        Hover to explore real-time metrics across all active streams.
      </p>
    </div>
  </div>
);

/* ── Reports Preview ── */

const ReportsPreview: React.FC = () => {
  const [reportOpen, setReportOpen] = useState(false);

  return (
    <>
      <div className="overflow-hidden">
        <div className="p-5 border-b border-border/50 dark:border-white/[0.08]">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Generated Reports</div>
          <div className="space-y-2.5">
            {[
              { name: "Glorious Gaming — Final Report", date: "Mar 15, 2026", hasPreview: true },
              { name: "Samsung Galaxy S25 Ultra — Week 3", date: "Mar 21, 2026", hasPreview: false },
              { name: "Gokstad Akademiet — Final Report", date: "Feb 19, 2026", hasPreview: false },
            ].map((r, idx) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                onClick={() => r.hasPreview && setReportOpen(true)}
                className={`flex items-center gap-3.5 p-3.5 rounded-xl transition-all duration-200 group ${
                  r.hasPreview
                    ? "bg-primary/15 border border-primary/30 cursor-pointer hover:bg-primary/20"
                    : "bg-muted/40 dark:bg-white/[0.05] hover:bg-muted/60 dark:hover:bg-white/[0.08] border border-border/40 dark:border-white/[0.08]"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  r.hasPreview ? "bg-primary/15" : "bg-muted/40"
                }`}>
                  <FileText className={`w-4 h-4 ${r.hasPreview ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-medium text-foreground truncate">{r.name}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{r.date}</div>
                </div>
                {r.hasPreview ? (
                  <span className="flex items-center gap-1.5 text-[10px] px-3 py-1.5 rounded-lg bg-primary text-white font-medium">
                    <Eye className="w-3 h-3" /> Preview
                  </span>
                ) : (
                  <span className="text-[10px] px-2.5 py-1 rounded-lg bg-muted/40 text-muted-foreground font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Download
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-3 p-3 rounded-xl border border-border/50 dark:border-white/[0.10] bg-muted/30 dark:bg-white/[0.04]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#5adbb5] shadow-[0_0_6px_rgba(90,219,181,0.4)]" />
            <span className="text-[11px] text-foreground">Weekly report — every Monday 9:00 AM</span>
            <span className="text-[10px] text-[#5adbb5] font-semibold ml-auto">Active</span>
          </div>
        </div>
      </div>

      {/* Report modal — locks page scroll */}
      {reportOpen && (
        <ReportModal onClose={() => setReportOpen(false)} />
      )}
    </>
  );
};

/* ── Report Modal — uses portal to escape DOM, locks scroll ── */
const ReportModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ active: boolean; startX: number; startY: number; panX: number; panY: number }>({
    active: false, startX: 0, startY: 0, panX: 0, panY: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const ZOOM_STEP = 0.4;
  const MIN_ZOOM = 1;
  const MAX_ZOOM = 4;

  const clampZoom = (z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));

  const adjustZoom = useCallback((delta: number) => {
    setZoom((z) => {
      const next = clampZoom(z + delta);
      if (next === MIN_ZOOM) setPan({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  // Wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    adjustZoom(e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP);
  }, [adjustZoom]);

  // Double-click toggle
  const handleDoubleClick = useCallback(() => {
    setZoom((z) => {
      if (z > 1) { setPan({ x: 0, y: 0 }); return 1; }
      return 2;
    });
  }, []);

  // Mouse drag
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (zoom <= 1) return;
    e.preventDefault();
    dragRef.current = { active: true, startX: e.clientX, startY: e.clientY, panX: pan.x, panY: pan.y };
  }, [zoom, pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragRef.current.active) return;
    setPan({ x: dragRef.current.panX + e.clientX - dragRef.current.startX, y: dragRef.current.panY + e.clientY - dragRef.current.startY });
  }, []);

  const handleMouseUp = useCallback(() => { dragRef.current.active = false; }, []);

  // Touch pinch
  const touchRef = useRef<{ dist: number; panX: number; panY: number } | null>(null);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchRef.current = { dist: Math.hypot(dx, dy), panX: pan.x, panY: pan.y };
    } else if (e.touches.length === 1 && zoom > 1) {
      dragRef.current = { active: true, startX: e.touches[0].clientX, startY: e.touches[0].clientY, panX: pan.x, panY: pan.y };
    }
  }, [pan, zoom]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchRef.current) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const scale = dist / touchRef.current.dist;
      setZoom((z) => clampZoom(z * scale));
      touchRef.current.dist = dist;
    } else if (e.touches.length === 1 && dragRef.current.active) {
      setPan({ x: dragRef.current.panX + e.touches[0].clientX - dragRef.current.startX, y: dragRef.current.panY + e.touches[0].clientY - dragRef.current.startY });
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    dragRef.current.active = false;
    touchRef.current = null;
    setZoom((z) => { if (z < 1.05) { setPan({ x: 0, y: 0 }); return 1; } return z; });
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") adjustZoom(ZOOM_STEP);
      if (e.key === "-") adjustZoom(-ZOOM_STEP);
      if (e.key === "0") resetZoom();
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose, adjustZoom, resetZoom]);

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/95" />

      <div
        className="relative w-full max-w-lg max-h-[90vh] flex flex-col rounded-2xl shadow-2xl bg-[#0a0a0a]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a0a] border-b border-white/10 rounded-t-2xl shrink-0">
          <span className="text-white text-sm font-semibold">Campaign Report — Glorious Gaming</span>
          <div className="flex items-center gap-1">
            <button onClick={() => adjustZoom(-ZOOM_STEP)} disabled={zoom <= MIN_ZOOM} className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 flex items-center justify-center text-white transition-colors">
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button onClick={resetZoom} className="px-2.5 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors tabular-nums min-w-[44px] text-center">
              {Math.round(zoom * 100)}%
            </button>
            <button onClick={() => adjustZoom(ZOOM_STEP)} disabled={zoom >= MAX_ZOOM} className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 flex items-center justify-center text-white transition-colors">
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <div className="w-px h-4 bg-white/15 mx-1" />
            <button onClick={onClose} className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
              <XIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Zoomable image area */}
        <div
          ref={containerRef}
          className="overflow-hidden rounded-b-2xl flex-1"
          style={{ cursor: zoom > 1 ? "grab" : "zoom-in" }}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onDoubleClick={handleDoubleClick}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src="/lovable-uploads/campaign-report-preview.png"
            alt="Full Campaign Report"
            draggable={false}
            className="w-full h-auto block select-none"
            style={{
              transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
              transformOrigin: "top center",
              transition: dragRef.current.active ? "none" : "transform 0.15s ease",
            }}
          />
        </div>
      </div>
    </div>,
    document.body
  );
};

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
    <div className="relative py-12 md:py-24 border-b border-border/20 last:border-b-0">
      {/* Globe Easter egg — decorative, targeting section only */}
      {feature.id === "targeting" && (
        <div className="pointer-events-none absolute left-[-480px] top-1/2 -translate-y-1/2 w-[480px] opacity-[0.18] hidden lg:block" aria-hidden>
          <GlobeMarketMap />
        </div>
      )}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
        {/* Left: text content */}
        <div className="lg:w-[30%] lg:sticky lg:top-32 space-y-5">
          <div className="flex items-center gap-2">
            <feature.icon className="w-5 h-5 text-primary" size={20} />
            <span className="text-sm font-semibold text-primary">{feature.label}</span>
          </div>
          <h3 className="text-3xl md:text-[2.5rem] font-bold text-foreground leading-[1.1] tracking-tight">
            {feature.title}
          </h3>
          <p className="text-[15px] text-muted-foreground leading-relaxed">
            {feature.description}
          </p>
          <ul className="space-y-3 pt-1">
            {feature.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[14px] text-foreground">
                <span className="w-1 h-1 rounded-full bg-primary shrink-0 mt-2.5" />
                {b}
              </li>
            ))}
          </ul>

          {feature.stat && (
            <div className="pt-5 border-t border-border/30">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground tracking-tight">{feature.stat.value}</span>
                <span className="text-sm text-muted-foreground">{feature.stat.label}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right: preview — wide, overflows container */}
        <div className="lg:w-[70%] w-full relative">
          <div className="lg:-mr-12 xl:-mr-20 2xl:-mr-28">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/10 dark:shadow-black/60 border border-border/50 dark:border-white/[0.14] bg-card dark:bg-[#0d0d12]">
              {/* Grid background */}
              <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(128,128,128,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.06)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_20%,black_40%,transparent_100%)]" />
              {/* Radial primary glow */}
              <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-48" style={{ background: 'radial-gradient(ellipse at center top, hsl(var(--primary) / 0.09), transparent 70%)' }} />
              <div className="relative">
                <Preview />
              </div>
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
      <div className="max-w-7xl mx-auto px-6 lg:px-8 2xl:max-w-[1400px]">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto pt-20 md:pt-28 pb-8">
          <span className="inline-block text-[11px] font-semibold px-3.5 py-1.5 rounded-full bg-primary/15 text-primary mb-5 uppercase tracking-wider">
            Platform
          </span>
          <h2 className="text-3xl md:text-[2.75rem] font-bold text-foreground leading-tight mb-4 tracking-tight">
            Everything you need to
            <br />
            <span className="text-primary">run campaigns at scale</span>
          </h2>
          <p className="text-muted-foreground text-[15px]">
            From finding streamers to tracking ROI — one platform for everything.
          </p>
        </div>

        {/* Mobile tab bar */}
        <div className="lg:hidden sticky top-16 z-20 py-3 bg-background/80 backdrop-blur-xl border-b border-border/30 mb-4">
          <div className="flex gap-1 overflow-x-auto pb-1">
            {features.map((f) => {
              const Icon = f.icon;
              const isActive = f.id === activeId;
              return (
                <button
                  key={f.id}
                  onClick={() => scrollToSection(f.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl whitespace-nowrap text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary/10 text-foreground"
                      : "text-muted-foreground hover:text-foreground"
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
          {/* Sticky sidebar nav */}
          <div className="hidden lg:block w-48 shrink-0">
            <div className="sticky top-28 space-y-1">
              {features.map((f) => {
                const Icon = f.icon;
                const isActive = f.id === activeId;
                return (
                  <button
                    key={f.id}
                    onClick={() => scrollToSection(f.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                      isActive
                        ? "bg-primary/15 dark:bg-primary/20 text-foreground"
                        : "text-muted-foreground dark:text-white/45 hover:text-foreground hover:bg-muted/40 dark:hover:bg-white/[0.06]"
                    }`}
                  >
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? "text-primary" : ""}`} />
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
