import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Zap,
  DollarSign,
  BarChart3,

  ChevronLeft,
  Eye,
  Play,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
} from "lucide-react";
import AnimatedShaderBackground from "@/components/ui/animated-shader-background";

/* ── Sponsor offers ── */
const offers = [
  {
    brand: "Samsung",
    icon: "/lovable-uploads/icon-samsung.svg",
    campaign: "Galaxy S25 Ultra Launch",
    format: "Rich Media",
    payout: "View offer",
    duration: "2 wk",
    preview: "/lovable-uploads/overlay-samsung.webm",
    streamBg: "/lovable-uploads/stream-placeholder.jpg",
    description:
      "Animated overlay promoting the Samsung Galaxy S25 Ultra. Renders directly in OBS — viewers see it as part of the stream.",
    overlayStyle: "absolute bottom-2 left-2 w-[35%] h-auto rounded shadow-lg",
  },
  {
    brand: "Logitech",
    icon: "/lovable-uploads/icon-logitech.png",
    campaign: "G Pro X Superlight",
    format: "Side Bar",
    payout: "View offer",
    duration: "1 wk",
    preview: "/lovable-uploads/overlay-logitech.webm",
    streamBg: "/lovable-uploads/stream-placeholder.jpg",
    description:
      "Full-screen takeover ad for the Logitech G Pro X Superlight. Covers the entire stream viewport.",
    overlayStyle: "absolute inset-0 w-full h-full object-cover",
  },
  {
    brand: "Foodora",
    icon: "/lovable-uploads/icon-foodora.svg",
    campaign: "Summer Promo",
    format: "Snipe Banner",
    payout: "View offer",
    duration: "3 d",
    preview: "/lovable-uploads/overlay-foodora.webm",
    streamBg: "/lovable-uploads/stream-placeholder.jpg",
    description:
      "Full-screen animated overlay for Foodora Summer Promo. High-impact brand takeover moment.",
    overlayStyle: "absolute inset-0 w-full h-full object-cover",
  },
  {
    brand: "Surfshark",
    icon: "/lovable-uploads/icon-surfshark.png",
    campaign: "VPN Awareness Q2",
    format: "Video",
    payout: "View offer",
    duration: "1 wk",
    preview: "/lovable-uploads/overlay-surfshark.webm",
    streamBg: "/lovable-uploads/stream-placeholder.jpg",
    description:
      "Native video overlay for Surfshark VPN. Compact placement on the left side of the stream.",
    overlayStyle: "absolute bottom-0 left-0 w-[30%] h-auto",
  },
];

/* ── Mini sparkline SVG ── */
const Sparkline: React.FC<{
  data: number[];
  color: string;
  width?: number;
  height?: number;
}> = ({ data, color, width = 100, height = 32 }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map(
      (v, i) =>
        `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height * 0.8 - height * 0.1}`
    )
    .join(" ");
  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`g-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon
        points={`0,${height} ${points} ${width},${height}`}
        fill={`url(#g-${color.replace("#", "")})`}
      />
    </svg>
  );
};

/* ── Clean line chart with smooth curve ── */
const LineChart: React.FC<{
  data: number[];
  color: string;
  height?: number;
  labels?: string[];
}> = ({ data, color, height = 120, labels }) => {
  const W = 600;
  const H = height;
  const padX = 0;
  const padY = 8;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => ({
    x: padX + (i / (data.length - 1)) * (W - padX * 2),
    y: padY + (1 - (v - min) / range) * (H - padY * 2),
  }));

  // Smooth cubic bezier path through points
  const smoothPath = pts.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x},${pt.y}`;
    const prev = pts[i - 1];
    const cp1x = prev.x + (pt.x - prev.x) * 0.4;
    const cp2x = pt.x - (pt.x - prev.x) * 0.4;
    return `${acc} C ${cp1x},${prev.y} ${cp2x},${pt.y} ${pt.x},${pt.y}`;
  }, "");

  const areaPath = `${smoothPath} L ${pts[pts.length - 1].x},${H} L ${pts[0].x},${H} Z`;

  return (
    <div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ height }}
      >
        <defs>
          <linearGradient id="lc-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {/* Horizontal grid */}
        {[0.25, 0.5, 0.75].map((pct) => (
          <line
            key={pct}
            x1={padX} x2={W - padX}
            y1={padY + pct * (H - padY * 2)}
            y2={padY + pct * (H - padY * 2)}
            stroke="white" strokeOpacity="0.06" strokeDasharray="4 4"
          />
        ))}
        {/* Area fill */}
        <path d={areaPath} fill="url(#lc-area)" />
        {/* Smooth line */}
        <path
          d={smoothPath}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Last point glow */}
        <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="6" fill={color} opacity="0.2" />
        <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="3.5" fill={color} />
        <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="2" fill="white" />
      </svg>
      {labels && (
        <div className="flex justify-between mt-2 px-1">
          {labels.map((l) => (
            <span key={l} className="text-[9px] text-white/25">{l}</span>
          ))}
        </div>
      )}
    </div>
  );
};

/* ── Campaign Preview Panel ── */
const CampaignPreview: React.FC<{
  offer: (typeof offers)[0];
  onBack: () => void;
}> = ({ offer, onBack }) => (
  <div className="flex-1 p-3 lg:p-5 xl:p-6 animate-fade-in flex flex-col">
    {/* Top: back + header */}
    <div className="flex items-center gap-2 mb-2">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-[10px] text-white/40 hover:text-white/70 transition-colors"
      >
        <ChevronLeft className="w-3 h-3" />
        Back
      </button>
      <div className="flex items-center gap-2 ml-2 flex-1 min-w-0">
        <img src={offer.icon} alt={offer.brand} className="w-7 h-7 lg:w-8 lg:h-8 rounded-md object-contain" />
        <div className="min-w-0">
          <div className="text-xs lg:text-sm font-semibold text-white truncate">{offer.campaign}</div>
          <div className="text-[9px] lg:text-[10px] text-white/35">{offer.brand} · {offer.format} · {offer.duration}</div>
        </div>
      </div>
      <div className="text-base lg:text-lg font-bold text-emerald-400 shrink-0">{offer.payout}</div>
    </div>

    {/* Stream preview — fills remaining space */}
    <div className="relative rounded-lg overflow-hidden bg-black flex-1 min-h-0 mb-2">
      {offer.streamBg ? (
        <img src={offer.streamBg} alt="Stream preview" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <Play className="w-8 h-8 text-white/20" />
        </div>
      )}
      {offer.preview && (
        <video src={offer.preview} autoPlay loop muted playsInline className={offer.overlayStyle} />
      )}
      <div className="absolute top-2 left-2 flex items-center gap-1.5">
        <div className="flex items-center gap-1 bg-red-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
          <div className="w-1 h-1 rounded-full bg-white" /> LIVE
        </div>
        <div className="flex items-center gap-1 bg-black/50 text-white text-[8px] px-1.5 py-0.5 rounded backdrop-blur-sm">
          <Eye className="w-2.5 h-2.5" /> 2,847
        </div>
      </div>
    </div>

    {/* Bottom: actions */}
    <div className="flex items-center gap-2">
      <button className="flex-1 py-2 rounded-lg bg-primary text-white text-[11px] font-semibold hover:bg-primary/90 transition-colors">
        Accept offer
      </button>
      <button className="px-3 py-2 rounded-lg border border-white/10 text-[11px] text-white/50 hover:text-white/80 transition-colors">
        Decline
      </button>
      <span className="text-[8px] text-white/15 ml-auto">Demo preview</span>
    </div>
  </div>
);

/* ── Earnings View ── */
const EarningsView: React.FC = () => {
  const earningsData = [85, 140, 210, 180, 290, 340, 310, 420, 480, 520, 610, 847];
  const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];

  return (
    <div className="flex-1 p-3 lg:p-5 xl:p-6 animate-fade-in overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm lg:text-base font-semibold text-white">Earnings</p>
        <span className="text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded">Last 12 months</span>
      </div>

      {/* Earnings stats — illustrative dashboard only. Real amounts reflect the
          offers a streamer has accepted and vary per campaign. */}
      <div className="grid grid-cols-3 gap-2 lg:gap-3 mb-3">
        <div className="bg-white/[0.04] rounded-xl p-3 lg:p-4 border border-white/5">
          <div className="text-[10px] text-white/40 mb-1">Total earned</div>
          <div className="text-base sm:text-xl lg:text-2xl font-bold text-white tabular-nums">—</div>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] text-emerald-400">Trending up</span>
          </div>
        </div>
        <div className="bg-white/[0.04] rounded-xl p-3 lg:p-4 border border-white/5">
          <div className="text-[10px] text-white/40 mb-1">This month</div>
          <div className="text-base sm:text-xl lg:text-2xl font-bold text-white tabular-nums">—</div>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] text-emerald-400">On track</span>
          </div>
        </div>
        <div className="bg-white/[0.04] rounded-xl p-3 lg:p-4 border border-white/5">
          <div className="text-[10px] text-white/40 mb-1">Pending</div>
          <div className="text-base sm:text-xl lg:text-2xl font-bold text-amber-400 tabular-nums">—</div>
          <div className="text-[10px] text-white/30 mt-1 truncate">Next payout: Apr 1</div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white/[0.03] rounded-xl p-3 border border-white/5 mb-3 flex-1 min-h-0">
        <div className="text-[10px] text-white/40 mb-2">Monthly earnings</div>
        <LineChart data={earningsData} color="#E05159" height={100} labels={months} />
      </div>

      {/* Recent payouts */}
      <div className="text-[10px] text-white/40 mb-1.5">Recent payouts</div>
      <div className="space-y-1.5">
        {[
          { date: "Mar 1, 2026", amount: "Paid out", status: "Complete" },
          { date: "Feb 1, 2026", amount: "Paid out", status: "Complete" },
          { date: "Jan 1, 2026", amount: "Paid out", status: "Complete" },
        ].map((p) => (
          <div
            key={p.date}
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.02] border border-white/5"
          >
            <span className="text-[11px] text-white/50">{p.date}</span>
            <span className="text-[11px] font-medium text-white">{p.amount}</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-400/10 text-emerald-400">
              {p.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Analytics View ── */
const AnalyticsView: React.FC = () => {
  const impressionData = [8200, 9100, 7600, 11400, 12800, 10200, 14500, 13200, 15800, 12400, 16200, 18100];
  const ctrData = [2.1, 2.4, 1.9, 3.2, 2.8, 3.1, 3.5, 2.9, 3.8, 3.2, 4.1, 3.6];

  return (
    <div className="flex-1 p-3 lg:p-5 xl:p-6 animate-fade-in overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm lg:text-base font-semibold text-white">Analytics</p>
        <span className="text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded">Last 30 days</span>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3 mb-3">
        {[
          { label: "Impressions", value: "124K", change: "+18%", up: true, color: "#E05159", data: impressionData },
          { label: "Avg CTR", value: "3.6%", change: "+0.4%", up: true, color: "#5adbb5", data: ctrData },
          { label: "Watch time", value: "2,841h", change: "+12%", up: true, color: "#a78bfa", data: [40, 52, 48, 61, 55, 67, 72, 65, 78, 71, 82, 88] },
          { label: "Chat mentions", value: "4,291", change: "-3%", up: false, color: "#fbbf24", data: [120, 140, 110, 180, 160, 150, 130, 170, 145, 125, 155, 135] },
        ].map((m) => (
          <div
            key={m.label}
            className="bg-white/[0.04] rounded-xl p-3 lg:p-4 border border-white/5"
          >
            <div className="text-[10px] text-white/40 mb-1">{m.label}</div>
            <div className="text-lg lg:text-xl font-bold text-white tabular-nums mb-2">
              {m.value}
            </div>
            <Sparkline data={m.data} color={m.color} width={80} height={24} />
            <div className="flex items-center gap-1 mt-1.5">
              {m.up ? (
                <TrendingUp className="w-3 h-3 text-emerald-400" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-400" />
              )}
              <span
                className={`text-[10px] ${m.up ? "text-emerald-400" : "text-red-400"}`}
              >
                {m.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Top campaigns */}
      <div className="text-[10px] text-white/40 mb-2">Top performing campaigns</div>
      <div className="space-y-1.5">
        {[
          { name: "Samsung Galaxy S25 Ultra", impressions: "150.6K", ctr: "2.93%", revenue: "Paid" },
          { name: "Surfshark VPN", impressions: "32.1K", ctr: "4.73%", revenue: "Paid" },
          { name: "Foodora Rider", impressions: "33.7K", ctr: "3.42%", revenue: "Paid" },
        ].map((c) => (
          <div
            key={c.name}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.02] border border-white/5"
          >
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-medium text-white truncate">{c.name}</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] text-white/30">Impr.</div>
              <div className="text-[11px] text-white/70 tabular-nums">{c.impressions}</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] text-white/30">CTR</div>
              <div className="text-[11px] text-white/70 tabular-nums">{c.ctr}</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] text-white/30">Revenue</div>
              <div className="text-[11px] font-medium text-emerald-400 tabular-nums">{c.revenue}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Offers View ── */
const OffersView: React.FC<{
  earnings: number;
  onSelectOffer: (i: number) => void;
}> = ({ earnings, onSelectOffer }) => (
  <div className="flex-1 p-3 lg:p-5 xl:p-6 overflow-hidden flex flex-col">
    {/* Stats row */}
    <div className="grid grid-cols-3 gap-2 lg:gap-4 mb-5 lg:mb-7">
      {[
        { label: "This month", value: `€${earnings.toLocaleString()}`, color: "text-white", spark: [120, 180, 95, 220, 310, 280, 420], sparkColor: "#E05159" },
        { label: "Active campaigns", value: "3", color: "text-white", spark: [1, 1, 2, 2, 3, 3, 3], sparkColor: "#5adbb5" },
        { label: "Impressions", value: "124K", color: "text-white", spark: [8, 12, 9, 15, 18, 14, 21], sparkColor: "#a78bfa" },
      ].map((s) => (
        <div
          key={s.label}
          className="bg-white/[0.04] rounded-xl p-3 lg:p-4 border border-white/5"
        >
          <div className="text-[10px] lg:text-[11px] text-white/40">{s.label}</div>
          <div className={`text-base lg:text-lg xl:text-xl font-semibold ${s.color} tabular-nums mb-1`}>
            {s.value}
          </div>
          <Sparkline data={s.spark} color={s.sparkColor} width={70} height={20} />
        </div>
      ))}
    </div>

    {/* Offers header */}
    <div className="flex items-center justify-between mb-3 lg:mb-4">
      <span className="text-xs lg:text-sm font-semibold text-white">
        Available Offers
      </span>
      <span className="text-[10px] lg:text-[11px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-medium">
        4 new
      </span>
    </div>

    {/* Offer cards */}
    <div className="space-y-1.5 lg:space-y-2">
      {offers.map((o, i) => (
        <div
          key={o.brand}
          onClick={() => onSelectOffer(i)}
          className="flex items-center gap-3 lg:gap-4 px-3 lg:px-4 py-2.5 lg:py-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all cursor-pointer group"
        >
          <img
            src={o.icon}
            alt={o.brand}
            className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg shrink-0 object-contain"
          />
          <div className="flex-1 min-w-0">
            <div className="text-xs lg:text-sm font-medium text-white truncate">
              {o.campaign}
            </div>
            <div className="text-[10px] lg:text-[11px] text-white/35">
              {o.brand} · {o.format} · {o.duration}
            </div>
          </div>
          <div className="text-sm lg:text-base font-semibold text-emerald-400 tabular-nums shrink-0">
            {o.payout}
          </div>
          <ArrowUpRight className="w-3.5 h-3.5 text-white/15 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      ))}
    </div>

    <p className="text-[9px] text-white/15 text-center mt-4">
      Click an offer to preview how it looks on your stream
    </p>
  </div>
);

/* ═══════════════════════════════════════════════
   DARK DASHBOARD MOCKUP
   ═══════════════════════════════════════════════ */

const DashboardMockup: React.FC = () => {
  const [earnings, setEarnings] = useState(0);
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"offers" | "earnings" | "analytics">("offers");

  useEffect(() => {
    const target = 2847;
    const dur = 2000;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      setEarnings(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    const id = setTimeout(() => requestAnimationFrame(tick), 600);
    return () => clearTimeout(id);
  }, []);

  const sidebarItems = [
    { id: "offers" as const, icon: Zap, label: "Offers" },
    { id: "earnings" as const, icon: DollarSign, label: "Earnings" },
    { id: "analytics" as const, icon: BarChart3, label: "Analytics" },
  ];

  const handleTabClick = (id: typeof activeTab) => {
    setActiveTab(id);
    setSelectedOffer(null);
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/30 border border-white/[0.08]">
      {/* Dark browser chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#141414] border-b border-white/[0.06]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-white/[0.06] rounded-md px-4 py-1">
            <span className="text-[10px] lg:text-[11px] text-white/30 font-mono">
              streamer.betaads.no
            </span>
          </div>
        </div>
      </div>

      {/* Mobile tab bar — visible below md, replaces sidebar */}
      <div className="flex md:hidden items-center gap-1 px-3 py-2 bg-[#111111] border-b border-white/[0.06]">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 min-h-[44px] rounded-lg text-[11px] font-medium transition-all ${
              activeTab === item.id
                ? "bg-primary/10 text-primary"
                : "text-white/35"
            }`}
          >
            <item.icon className="w-3.5 h-3.5" />
            {item.label}
          </button>
        ))}
      </div>

      {/* Dashboard body */}
      <div className="flex h-[360px] sm:h-[420px] lg:h-[520px] xl:h-[580px] bg-[#0d0d0d]">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-40 lg:w-48 border-r border-white/[0.06] bg-[#111111] p-3 lg:p-4 gap-0.5">
          {/* Logo */}
          <div className="flex items-center gap-2 px-2.5 py-2 mb-3">
            <img
              src="/lovable-uploads/logo-red-white.png"
              alt="Beta Ads"
              className="h-5 w-auto"
            />
          </div>

          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`flex items-center gap-2.5 px-2.5 py-2 lg:py-2.5 rounded-lg text-[11px] lg:text-xs transition-all text-left w-full ${
                activeTab === item.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-white/35 hover:text-white/60 hover:bg-white/[0.03]"
              }`}
            >
              <item.icon className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Main content — switches based on tab */}
        {activeTab === "offers" && selectedOffer !== null ? (
          <CampaignPreview
            offer={offers[selectedOffer]}
            onBack={() => setSelectedOffer(null)}
          />
        ) : activeTab === "offers" ? (
          <OffersView
            earnings={earnings}
            onSelectOffer={(i) => setSelectedOffer(i)}
          />
        ) : activeTab === "earnings" ? (
          <EarningsView />
        ) : activeTab === "analytics" ? (
          <AnalyticsView />
        ) : null}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════ */

export const StreamerHero: React.FC = () => (
  <section className="relative overflow-hidden" aria-label="Streamer hero">
    {/* Aurora shader background */}
    <AnimatedShaderBackground heightFactor={1} />
    {/* Bottom fade to page background */}
    <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent z-[1] pointer-events-none" />

    {/* Hero text */}
    <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
      <div className="text-center pt-28 md:pt-40 pb-12">
        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-6">
          For streamers on Twitch, YouTube &amp; Kick
        </p>

        <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] tracking-tight text-foreground mb-5">
          Get&nbsp;paid to stream.
          <br />
          No strings attached.
        </h1>

        <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg mx-auto mb-9">
          Real brand deals delivered to your dashboard. Accept the ones you
          like, skip the rest. Ads run natively — you get paid monthly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
          <a
            href="https://beta.streamer.livad.stream/login"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 min-h-[44px] rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            Apply now
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="https://discord.gg/tSmM6XMEkn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px] px-4"
          >
            Join our Discord →
          </a>
        </div>

        <p className="text-[11px] text-muted-foreground/50">
          No follower minimum · No contracts · Free to join
        </p>
      </div>
    </div>

    {/* Dashboard preview */}
    <div className="relative z-10 max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
      <DashboardMockup />
    </div>
  </section>
);
