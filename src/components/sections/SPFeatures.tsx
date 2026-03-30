import React, { useRef, useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import {
  Search,
  Eye,
  Filter,
  FileText,
  ChevronDown,
  Download,
  X as XIcon,
  Zap,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from "lucide-react";
import { ChartVisual3 } from "@/components/ui/animated-card-chart";
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
    label: "Launch",
    icon: IconLaunch,
    title: "Go live across hundreds of streams",
    description:
      "Deploy your campaign to selected streamers in one click. Overlays render automatically inside OBS.",
    bullets: [
      "One-click deployment to all streamers",
      "Auto OBS integration — zero streamer effort",
      "Schedule campaigns in advance",
    ],
    stat: { value: "43", label: "streamers activated — Samsung S25 Ultra" },
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

const StreamerPreview: React.FC = () => (
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
        {["Fortnite", "Valorant", "CS2", "Just Chatting", "Minecraft"].map((g, i) => (
          <span key={g} className={`text-[11px] px-3 py-1.5 rounded-full border cursor-default ${
            i < 2 ? "border-primary/40 bg-primary/15 text-primary font-medium" : "border-border/60 dark:border-white/[0.12] text-muted-foreground dark:text-white/40"
          }`}>
            {g}
          </span>
        ))}
        <span className="text-[11px] text-primary/70 font-medium cursor-default">+18 more</span>
      </div>
    </div>

    {/* Stats bar */}
    <div className="px-5 py-2.5 border-b border-border/40 dark:border-white/[0.07] bg-muted/20 dark:bg-white/[0.03] flex items-center gap-6">
      <span className="text-[11px] text-muted-foreground">Showing <strong className="text-foreground font-semibold">39,445</strong> streamers</span>
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
      {streamers.map((s, idx) => (
        <motion.div
          key={s.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.06, duration: 0.3 }}
          className="px-5 py-3 grid grid-cols-[36px_1fr_72px_72px_60px_52px] gap-3 items-center hover:bg-muted/30 dark:hover:bg-white/[0.05] transition-all duration-200 group border-b border-border/20 dark:border-white/[0.06] last:border-b-0"
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
          <button className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-[10px] px-2.5 py-1.5 rounded-lg bg-primary text-white font-medium">
            Add
          </button>
        </motion.div>
      ))}
    </div>
  </div>
);

/* ── Targeting Preview ── */

const TargetingPreview: React.FC = () => (
  <div className="overflow-hidden">
    <div className="p-5 border-b border-border/50 dark:border-white/[0.08]">
      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Audience Targeting</div>
      <div className="space-y-4">
        {[
          { label: "Game Genre", value: "FPS, Battle Royale", icon: IconGlobe },
          { label: "Region", value: "Norway, Sweden", icon: IconGlobe },
          { label: "Age Range", value: "18–34", icon: IconStreamers },
          { label: "Min Viewers", value: "500+", icon: Eye },
        ].map((f, idx) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.3 }}
            className="flex items-center justify-between p-3 rounded-xl bg-muted/40 dark:bg-white/[0.06] hover:bg-muted/60 dark:hover:bg-white/[0.09] border border-transparent dark:border-white/[0.06] transition-all duration-200"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <f.icon className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-[12px] text-muted-foreground">{f.label}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[12px] font-medium text-foreground">
              {f.value} <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">ICP Match Results</span>
        <span className="text-[11px] text-primary font-semibold">2,847 streamers</span>
      </div>
      {[
        { label: "High match (90%+)", count: 342, pct: 80, color: "bg-[#5adbb5]" },
        { label: "Good match (70-90%)", count: 1205, pct: 60, color: "bg-amber-400" },
        { label: "Low match (<70%)", count: 1300, pct: 40, color: "bg-muted/50" },
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
            <span className="text-[11px] font-semibold text-foreground tabular-nums">{m.count}</span>
          </div>
          <div className="h-2 rounded-full bg-muted/50 dark:bg-white/[0.08] overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${m.color}`}
              initial={{ width: 0 }}
              animate={{ width: `${m.pct}%` }}
              transition={{ duration: 0.8, delay: 0.4 + idx * 0.15, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

/* ── Launch Preview ── */

const LaunchPreview: React.FC = () => {
  const [launched, setLaunched] = useState(false);
  return (
    <div className="overflow-hidden">
      <div className="p-5 border-b border-border/50 dark:border-white/[0.08]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[13px] font-semibold text-foreground">Samsung Galaxy S25 Ultra</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">Rich Media Overlay Campaign</div>
          </div>
          <span className={`text-[10px] px-3 py-1 rounded-full font-semibold transition-all duration-500 ${
            launched ? "bg-[#5adbb5]/15 text-[#5adbb5] ring-1 ring-[#5adbb5]/20" : "bg-amber-400/15 text-amber-400 ring-1 ring-amber-400/20"
          }`}>
            {launched ? "● Live" : "○ Ready"}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Streamers", value: "48", icon: IconStreamers },
            { label: "Format", value: "Rich Media", icon: Zap },
            { label: "Duration", value: "2 weeks", icon: IconTarget },
          ].map((s) => (
            <div key={s.label} className="text-center p-3 rounded-xl bg-muted/40 dark:bg-white/[0.06] border border-border/40 dark:border-white/[0.10]">
              <s.icon className="w-4 h-4 text-primary mx-auto mb-1.5" />
              <div className="text-[13px] font-bold text-foreground">{s.value}</div>
              <div className="text-[9px] text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-5">
        <div className="space-y-2.5 mb-5">
          {["RubenGKS", "Aienia", "DannizTV"].map((name, idx) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/40 dark:hover:bg-white/[0.06] transition-colors"
            >
              <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${launched ? "bg-[#5adbb5] shadow-[0_0_8px_rgba(90,219,181,0.4)]" : "bg-muted/60"}`} />
              <span className="text-[12px] font-medium text-foreground">{name}</span>
              <span className={`text-[10px] ml-auto transition-colors duration-500 ${launched ? "text-[#5adbb5] font-medium" : "text-muted-foreground"}`}>
                {launched ? "Overlay active" : "Pending"}
              </span>
            </motion.div>
          ))}
          <div className="text-[10px] text-muted-foreground pl-5">+45 more streamers</div>
        </div>
        <button
          onClick={() => setLaunched(!launched)}
          className={`w-full py-3 rounded-xl text-[13px] font-semibold transition-all duration-500 ${
            launched
              ? "bg-muted/40 text-muted-foreground hover:bg-muted/50"
              : "bg-primary text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:brightness-110"
          }`}
        >
          {launched ? "Pause Campaign" : "Launch Campaign →"}
        </button>
      </div>
    </div>
  );
};

/* ── Analytics Preview — Interactive Charts ── */


const AnalyticsPreview: React.FC = () => (
  <div className="overflow-hidden">
    <div className="relative w-full overflow-hidden" style={{ height: 280 }}>
      <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'scale(1.4)', transformOrigin: 'center center' }}>
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
    <div className="py-12 md:py-24 border-b border-border/20 last:border-b-0">
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
                        ? "bg-primary/15 dark:bg-primary/20 text-foreground border-l-2 border-primary"
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
