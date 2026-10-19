import React, { useState, useEffect } from "react";
import { brandInk } from "@/lib/brandInk";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Mail, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation, useMultipleScrollAnimations } from "@/hooks/useScrollAnimation";
import { CategoryDonut, CampaignComparisonChart } from "./SamsungCharts";
import founderImage from "@/assets/founder-andreas-portrait.jpg";

const DRIVE_VIDEO_EMBED = "https://drive.google.com/file/d/1FxgGtpweqtrJ-gCRPp38PX_iVenr0gLt/preview";

/* ── Count-up hook ── */
function useCountUp(target: string, isVisible: boolean) {
  const [display, setDisplay] = useState(target);
  useEffect(() => {
    if (!isVisible) return;
    const prefix = target.startsWith("~") ? "~" : "";
    const stripped = prefix ? target.slice(1) : target;
    const cleaned = stripped.replace(/,/g, "");
    const numMatch = cleaned.match(/^([\d.]+)/);
    if (!numMatch) { setDisplay(target); return; }
    const numericTarget = parseFloat(numMatch[1]);
    // Skip animation for non-integers (e.g. "1.2M") - just show as-is
    if (numericTarget !== Math.floor(numericTarget)) { setDisplay(target); return; }
    const suffix = cleaned.replace(/^[\d.]+/, "");
    const hasCommas = target.includes(",");
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(numericTarget * eased);
      setDisplay(prefix + (hasCommas ? current.toLocaleString() : current.toString()) + suffix);
      if (progress < 1) requestAnimationFrame(tick);
    };
    setDisplay(prefix + "0" + suffix);
    requestAnimationFrame(tick);
  }, [isVisible, target]);
  return display;
}

/* ── Animated stat cell ── */
const AnimStat: React.FC<{ value: string; label: string; isVisible: boolean; className?: string }> = ({ value, label, isVisible, className = "" }) => {
  const display = useCountUp(value, isVisible);
  return (
    <div className={className}>
      <div className="text-xl font-bold text-foreground tracking-tight tabular-nums">{display}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
};

/* ── Animated dark stat cell ── */
const AnimStatDark: React.FC<{ value: string; label: string; isVisible: boolean; size?: "lg" | "sm" }> = ({ value, label, isVisible, size = "lg" }) => {
  const display = useCountUp(value, isVisible);
  return (
    <div className="py-4">
      <div className={`font-bold text-white tracking-tight tabular-nums ${size === "lg" ? "text-2xl" : "text-xl"}`}>{display}</div>
      <div className="text-xs text-white/40 mt-1">{label}</div>
    </div>
  );
};

/* ── Data ── */
const s25Stats = [
  { value: "500,131", label: "Completed views" },
  { value: "138,633", label: "Unique viewers" },
  { value: "0.76%", label: "Verified CTR" },
  { value: "3,750h", label: "Watch time" },
  { value: "43", label: "Streamers" },
  { value: "56", label: "Campaign days" },
  { value: "74", label: "Game categories" },
  { value: "90.07%", label: "Norway audience" },
  { value: "73.39%", label: "Aged 18-24" },
  { value: "86.54%", label: "Desktop" },
  { value: "50.28%", label: "Just Chatting" },
  { value: "0%", label: "Adblock impact" },
];

const fold7Stats = [
  { value: "300,054", label: "Completed views" },
  { value: "141,930", label: "Unique viewers" },
  { value: "558,257+", label: "VOD views" },
  { value: "2,000h", label: "Watch time" },
  { value: "28", label: "Streamers" },
  { value: "31", label: "Campaign days" },
  { value: "54", label: "Game categories" },
  { value: "93.05%", label: "Norway audience" },
  { value: "80.39%", label: "Desktop" },
  { value: "34.45%", label: "Just Chatting" },
  { value: "+2,185", label: "New followers" },
  { value: "0%", label: "Adblock impact" },
];

/* ── Galaxy S25 Ultra streamer roster (43 creators, source: PDF report) ── */
const s25Creators = [
  { rank: 1, name: "rubengks", completedViews: "150,600", clicks: 937, ctr: "0.62", followers: 322, note: "Top streamer · 30.1% of all views" },
  { rank: 2, name: "forstegir", completedViews: "61,670", clicks: 243, ctr: "0.39", followers: 130, note: "449 displays" },
  { rank: 3, name: "danniz", completedViews: "53,966", clicks: 376, ctr: "0.70", followers: 175, note: "" },
  { rank: 4, name: "mystixx", completedViews: "42,565", clicks: 156, ctr: "0.37", followers: 99, note: "" },
  { rank: 5, name: "dennisvareide", completedViews: "31,855", clicks: 96, ctr: "0.30", followers: 278, note: "" },
  { rank: 6, name: "linnea", completedViews: "19,074", clicks: 139, ctr: "0.73", followers: 254, note: "" },
  { rank: 7, name: "lasanias", completedViews: "19,037", clicks: 122, ctr: "0.64", followers: 54, note: "" },
  { rank: 8, name: "fjolsenfn", completedViews: "16,077", clicks: 110, ctr: "0.68", followers: 39, note: "" },
  { rank: 9, name: "andersmish", completedViews: "14,266", clicks: 93, ctr: "0.65", followers: 63, note: "" },
  { rank: 10, name: "101henrik", completedViews: "11,776", clicks: 104, ctr: "0.88", followers: 93, note: "" },
  { rank: 11, name: "namine1", completedViews: "8,959", clicks: 187, ctr: "2.09", followers: 79, note: "" },
  { rank: 12, name: "madelenejohnsen", completedViews: "7,482", clicks: 61, ctr: "0.82", followers: 48, note: "" },
  { rank: 13, name: "fredrikreinholt", completedViews: "5,928", clicks: 41, ctr: "0.69", followers: 78, note: "" },
  { rank: 14, name: "texazrexaz", completedViews: "5,408", clicks: 94, ctr: "1.74", followers: 144, note: "" },
  { rank: 15, name: "heenrikg", completedViews: "5,289", clicks: 91, ctr: "1.72", followers: 33, note: "" },
  { rank: 16, name: "byrbotten", completedViews: "4,575", clicks: 160, ctr: "3.50", followers: 43, note: "160 clicks · high engagement" },
  { rank: 17, name: "hjartholm90", completedViews: "4,566", clicks: 30, ctr: "0.66", followers: 13, note: "" },
  { rank: 18, name: "healingsaint", completedViews: "4,371", clicks: 89, ctr: "2.04", followers: 11, note: "" },
  { rank: 19, name: "jonieboi", completedViews: "4,039", clicks: 47, ctr: "1.16", followers: 105, note: "" },
  { rank: 20, name: "trulssolberg", completedViews: "3,745", clicks: 16, ctr: "0.43", followers: 37, note: "" },
];

const s25Categories = [
  { name: "Just Chatting", share: 50.28, views: "251,295", ctr: "0.70%" },
  { name: "Grand Theft Auto V", share: 16.08, views: "80,386", ctr: "0.86%" },
  { name: "IRL", share: 16.00, views: "79,946", ctr: "0.42%" },
  { name: "Fortnite", share: 3.82, views: "19,095", ctr: "0.83%" },
  { name: "Counter-Strike 2", share: 2.56, views: "12,770", ctr: "0.85%" },
];

const s25HighCTR = [
  { name: "d1gitor", ctr: "17.72%", views: "79 views" },
  { name: "deivy11", ctr: "8.19%", views: "1,429 views" },
  { name: "matsheart", ctr: "7.50%", views: "640 views" },
  { name: "10nita", ctr: "5.92%", views: "608 views" },
  { name: "marcusthomassen", ctr: "5.04%", views: "278 views" },
];

/* ── Galaxy Z Fold7 streamer roster (28 creators total, top 20 listed) ── */
const fold7Creators = [
  { rank: 1, name: "Danniz", completedViews: "97,110", clicks: 288, ctr: "0.30", followers: 99, note: "32.4% of all views" },
  { rank: 2, name: "RubenGKS", completedViews: "51,085", clicks: 379, ctr: "0.74", followers: 131, note: "Most link clicks" },
  { rank: 3, name: "ForsteGir", completedViews: "45,841", clicks: 194, ctr: "0.42", followers: 95, note: "665h airtime" },
  { rank: 4, name: "LaSanias", completedViews: "33,234", clicks: 116, ctr: "0.35", followers: 106, note: "IRL, high watch time" },
  { rank: 5, name: "Jonieboi", completedViews: "28,996", clicks: 111, ctr: "0.38", followers: 857, note: "+857 followers" },
  { rank: 6, name: "namine1", completedViews: "5,410", clicks: 128, ctr: "2.37", followers: 139, note: "" },
  { rank: 7, name: "FJ Olsen FN", completedViews: "5,922", clicks: 144, ctr: "2.43", followers: 45, note: "" },
  { rank: 8, name: "karbo1x", completedViews: "2,259", clicks: 81, ctr: "3.59", followers: 39, note: "High click rate" },
  { rank: 9, name: "Simmlings", completedViews: "746", clicks: 88, ctr: "11.80", followers: 32, note: "Best CTR in campaign" },
  { rank: 10, name: "MatsHeart", completedViews: "635", clicks: 28, ctr: "4.41", followers: 11, note: "Small channel, high CTR" },
  { rank: 11, name: "heenrikg", completedViews: "4,431", clicks: 41, ctr: "0.93", followers: 50, note: "" },
  { rank: 12, name: "oreokjeks1x", completedViews: "2,331", clicks: 46, ctr: "1.97", followers: 133, note: "" },
  { rank: 13, name: "lifelessb", completedViews: "2,853", clicks: 44, ctr: "1.54", followers: 26, note: "" },
  { rank: 14, name: "BuldreLIVE", completedViews: "2,409", clicks: 26, ctr: "1.08", followers: 10, note: "" },
  { rank: 15, name: "Kamillala", completedViews: "4,304", clicks: 20, ctr: "0.46", followers: 149, note: "" },
  { rank: 16, name: "Arialah", completedViews: "1,332", clicks: 23, ctr: "1.73", followers: 119, note: "" },
  { rank: 17, name: "Jenserkongen", completedViews: "1,855", clicks: 12, ctr: "0.65", followers: 16, note: "" },
  { rank: 18, name: "VikingDuden", completedViews: "757", clicks: 4, ctr: "0.53", followers: 18, note: "" },
  { rank: 19, name: "101 henrik", completedViews: "1,306", clicks: 3, ctr: "0.23", followers: 24, note: "" },
  { rank: 20, name: "fayazczar", completedViews: "1,156", clicks: 20, ctr: "1.73", followers: 86, note: "" },
];

const fold7Categories = [
  { name: "Just Chatting", share: 34.45, views: "103,358", ctr: "0.73%" },
  { name: "Minecraft", share: 17.95, views: "53,869", ctr: "0.39%" },
  { name: "IRL", share: 16.35, views: "49,046", ctr: "0.45%" },
  { name: "Grand Theft Auto V", share: 11.28, views: "33,852", ctr: "0.67%" },
  { name: "Rust", share: 4.32, views: "12,975", ctr: "0.79%" },
];

const fold7HighCTR = [
  { name: "Simmlings", ctr: "11.80%", views: "746 views" },
  { name: "m4r5t3in", ctr: "10.00%", views: "" },
  { name: "healingsaint", ctr: "7.39%", views: "" },
  { name: "mrrxspect", ctr: "6.64%", views: "" },
  { name: "midtboe", ctr: "5.85%", views: "" },
];

const insights = [
  { title: "Consistent audience", body: "Both campaigns hit the same demographic: Norwegian males 18-24, 90-93% Norway-based, desktop-first. The audience did not drift between spring and autumn." },
  { title: "Just Chatting dominates", body: "50.28% of S25 views and 34.45% of Fold7 views from Just Chatting. Conversational content is consistently the most receptive environment for interactive CTAs." },
  { title: "Micro-influencers convert", body: "Simmlings: 11.80% CTR from 746 views. m4r5t3in: 10.00%. The small-channel, high-trust dynamic delivers 9-18x the campaign average CTR." },
  { title: "A few channels carry reach", body: "rubengks delivered 150,600 of the S25 Ultra's 500,131 completed views, and Danniz 97,110 of the Fold7's 300,054. Pair large channels for reach with smaller ones for engagement." },
  { title: "VOD doubles reach for free", body: "Fold7 accumulated 558,257+ VOD views on top of 300K live. Every campaign keeps generating impressions weeks after it ends, at no extra cost." },
  { title: "Zero adblock impact", body: "Overlays render as OBS browser sources. Both campaigns: every impression was a genuine live view. The format is structurally invisible to adblock software." },
];

/* ── Creator table (expandable, dual campaign) ── */
type CreatorRow = { rank: number; name: string; completedViews: string; clicks: number; ctr: string; followers: number; note: string };

interface CreatorTableProps {
  data: CreatorRow[];
  totalLabel: string;
  totalViews: string;
  totalClicks: string;
  totalCTR: string;
  totalFollowers: string;
  followersLabel?: string;
}

const CreatorTable: React.FC<CreatorTableProps> = ({ data, totalLabel, totalViews, totalClicks, totalCTR, totalFollowers, followersLabel = "New followers" }) => {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? data : data.slice(0, 8);
  const showAllLabel = `Show ${data.length === 20 ? "top 20" : `all ${data.length}`} streamers`;
  return (
    <div>
      <div className="rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[520px]">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">#</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Streamer</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Views</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Clicks</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">CTR</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">{followersLabel}</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((s) => {
                const high = parseFloat(s.ctr) >= 3;
                return (
                  <tr key={s.name} className={`border-b border-border last:border-0 transition-colors hover:bg-muted/20 ${s.rank <= 5 ? "bg-muted/10" : ""}`}>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{s.rank}</td>
                    <td className="px-4 py-3 font-medium text-foreground">
                      {s.name}
                      {s.note && <span className="ml-2 text-xs text-muted-foreground font-normal hidden lg:inline">{s.note}</span>}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">{s.completedViews}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">{s.clicks}</td>
                    <td className={`px-4 py-3 text-right tabular-nums font-bold ${high ? "text-primary" : "text-muted-foreground"}`}>{s.ctr}%</td>
                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground hidden md:table-cell">{followersLabel === "Avg viewers" ? s.followers : `+${s.followers}`}</td>
                  </tr>
                );
              })}
              {!expanded && data.length > 8 && (
                <tr className="bg-muted/5 hover:bg-muted/10 transition-colors cursor-pointer" onClick={() => setExpanded(true)}>
                  <td colSpan={6} className="px-4 py-3 text-center">
                    <span className="text-xs text-primary font-medium inline-flex items-center gap-1">
                      {showAllLabel} <ChevronDown className="w-3 h-3" />
                    </span>
                  </td>
                </tr>
              )}
              <tr className="border-t-2 border-border bg-muted/20 font-semibold">
                <td className="px-4 py-3 text-xs text-muted-foreground" colSpan={2}>{totalLabel}</td>
                <td className="px-4 py-3 text-right tabular-nums text-foreground">{totalViews}</td>
                <td className="px-4 py-3 text-right tabular-nums text-foreground">{totalClicks}</td>
                <td className="px-4 py-3 text-right tabular-nums text-foreground">{totalCTR}</td>
                <td className="px-4 py-3 text-right tabular-nums text-foreground hidden md:table-cell">{totalFollowers}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {expanded && (
          <div className="border-t border-border px-4 py-2 text-center cursor-pointer hover:bg-muted/10 transition-colors" onClick={() => setExpanded(false)}>
            <span className="text-xs text-primary font-medium inline-flex items-center gap-1">Collapse <ChevronUp className="w-3 h-3" /></span>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Main component ── */
type DeepDiveTab = "s25" | "fold7";

const SamsungCaseStudy: React.FC = () => {
  const { ref: insightsRef, isVisible: insightsVisible } = useScrollAnimation<HTMLDivElement>();
  const { setRef: setInsightRef, visibleItems: insightVisible } = useMultipleScrollAnimations<HTMLDivElement>(insights.length);
  const { ref: creatorRef, isVisible: creatorVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: microRef, isVisible: microVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: vodRef, isVisible: vodVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: campaignsRef, isVisible: campaignsVisible } = useScrollAnimation<HTMLDivElement>();

  // Deep Dive: which campaign is currently selected for the analytics tab
  const [activeTab, setActiveTab] = useState<DeepDiveTab>("s25");
  const isS25 = activeTab === "s25";

  return (
    <div>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-28 md:pt-36 pb-20">

          <Link to="/case-studies" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10">
            <ArrowLeft className="w-4 h-4" /> Back to campaigns
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: headline */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="shrink-0 flex items-center justify-center rounded-xl bg-foreground/[0.04] border border-border p-3 backdrop-blur-sm"
                  style={{ boxShadow: "0 0 0 1px #1428A044" }}
                >
                  <img
                    src="/lovable-uploads/logo-samsung.png"
                    alt="Samsung"
                    className="h-4 w-auto max-w-none shrink-0 [filter:brightness(0)] dark:[filter:brightness(0)_invert(1)]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span
                    className="text-[11px] font-semibold tracking-[0.2em] uppercase"
                    style={{ color: brandInk("#5B7AE5") }}
                  >
                    Norway · Smartphone launch · 2 campaigns
                  </span>
                  <span className="text-xs text-muted-foreground tracking-wide">Case Study · Galaxy S25 Ultra + Z Fold7</span>
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] tracking-tight mb-6">
                Samsung<br />
                <span className="hl">x Beta Ads</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-md">
                Two smartphone launches. One consistent audience. 800,000+ live completed views on Norwegian Twitch, plus another 558,000+ on VOD - all with zero adblock impact.
              </p>
              <div className="grid grid-cols-3 border-t border-border pt-5">
                {[
                  { value: "800K+", label: "Live views" },
                  { value: "43 + 28", label: "Streamer slots" },
                  { value: "0%", label: "Adblock impact" },
                ].map((s, i) => (
                  <div key={s.label} className={`py-2 ${i < 2 ? "pr-3 sm:pr-5 border-r border-border" : ""} ${i > 0 ? "pl-3 sm:pl-5" : ""}`}>
                    {/* whitespace-nowrap + smaller font on mobile keeps "43 + 28" on one line inside the 3-col grid at 375px so the middle column doesn't stretch taller than its siblings */}
                    <div className="text-xl sm:text-2xl font-bold text-foreground tracking-tight whitespace-nowrap">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: video */}
            <div className="rounded-2xl overflow-hidden bg-black border border-border shadow-2xl aspect-video">
              <iframe
                src={DRIVE_VIDEO_EMBED}
                className="w-full h-full"
                allow="autoplay"
                title="Samsung x Beta Ads campaign video"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SIDE-BY-SIDE CAMPAIGN COMPARISON ── */}
      <section className="relative overflow-hidden py-24 md:py-32 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div ref={campaignsRef} className={`mb-14 max-w-2xl transition-all duration-700 ${campaignsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3 block">Two campaigns · 2025</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">Galaxy S25 Ultra and Z Fold7, side by side</h2>
            <p className="text-muted-foreground leading-relaxed">
              Two smartphone launches, six months apart, on the same Norwegian Twitch audience. Every number below comes directly from the campaign reports.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

            {/* ── S25 Ultra ── */}
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2 block">Campaign 1 - March to May 2025</span>
                <h3 className="text-2xl font-semibold text-foreground mb-3">Galaxy S25 Ultra</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Samsung needed to reach Norwegian tech buyers who skip pre-roll and run adblock everywhere.
                  Beta deployed animated overlay ads across 43 streamers for 56 days. The overlays rendered as
                  OBS browser sources, completely invisible to adblock, across 74 game categories.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Just Chatting dominated at 50.28% of all views. Verified CTR across the run was 0.76%.
                </p>
              </div>

              {/* Primary stats */}
              <div className="grid grid-cols-2">
                {s25Stats.slice(0, 6).map((s, i) => (
                  <AnimStat key={s.label} value={s.value} label={s.label} isVisible={campaignsVisible} className={`px-0 py-4 ${i < 4 ? "border-b border-border" : ""} ${i % 2 === 0 ? "pr-6 border-r border-border" : "pl-6"}`} />
                ))}
              </div>

              {/* Secondary stats */}
              <div className="grid grid-cols-3 border-t border-border pt-4">
                {s25Stats.slice(6).map((s, i) => (
                  <AnimStat key={s.label} value={s.value} label={s.label} isVisible={campaignsVisible} className={`px-0 py-2 ${i % 3 !== 2 ? "pr-4 border-r border-border" : ""} ${i % 3 !== 0 ? "pl-4" : ""}`} />
                ))}
              </div>

              <div className="p-5 rounded-2xl border border-border">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Why it worked</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  500,131 completed live views from 138,633 unique viewers, with a verified CTR of 0.76%,
                  against an audience that actively blocks conventional advertising.
                </p>
              </div>
            </div>

            {/* ── Galaxy Z Fold7 ── */}
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2 block">Campaign 2 - September to October 2025</span>
                <h3 className="text-2xl font-semibold text-foreground mb-3">Galaxy Z Fold7</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Foldable phones require education. A viewer needs to understand the hinge, the inner display,
                  the multitasking workflow, and why the form factor justifies the price premium. Banner ads
                  cannot convey this.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Beta ran two simultaneous formats: a rich media overlay inside OBS, plus a live chatbot CTA
                  in stream chat. The run delivered 300,054 completed live views from 141,930 unique viewers.
                </p>
              </div>

              {/* Primary stats */}
              <div className="grid grid-cols-2">
                {fold7Stats.slice(0, 6).map((s, i) => (
                  <AnimStat key={s.label} value={s.value} label={s.label} isVisible={campaignsVisible} className={`px-0 py-4 ${i < 4 ? "border-b border-border" : ""} ${i % 2 === 0 ? "pr-6 border-r border-border" : "pl-6"}`} />
                ))}
              </div>

              {/* Secondary stats */}
              <div className="grid grid-cols-3 border-t border-border pt-4">
                {fold7Stats.slice(6).map((s, i) => (
                  <AnimStat key={s.label} value={s.value} label={s.label} isVisible={campaignsVisible} className={`px-0 py-2 ${i % 3 !== 2 ? "pr-4 border-r border-border" : ""} ${i % 3 !== 0 ? "pl-4" : ""}`} />
                ))}
              </div>

              <div className="p-5 rounded-2xl border border-border">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Why it worked</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  300,054 completed live views in 31 days, with 93.05% of the audience in Norway. VOD views
                  added 558,257+ additional impressions after the campaign ended, at zero extra cost.
                </p>
              </div>
            </div>

          </div>

          {/* Comparison - efficiency line chart (per streamer, removes budget bias) */}
          <div className="mt-16 rounded-3xl border border-border/60 p-7 md:p-10">
            <div className="mb-2">
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Efficiency · per streamer</p>
              <h3 className="text-lg font-semibold text-foreground tracking-tight">Two campaigns, two different strengths</h3>
              <p className="text-xs text-muted-foreground mt-2 max-w-2xl leading-relaxed">
                Fold7 was a smaller buy (28 streamers vs S25's 43), so absolute totals don't tell the whole story. Normalised <span className="text-foreground">per streamer</span>, the two campaigns trade wins: <span className="text-foreground">Fold7 dominates reach efficiency</span> (5,069 unique viewers per streamer vs 3,224 - a 57% advantage) while <span className="text-foreground">S25 leads on depth</span> (more completed views and more watch time per streamer). Index 100 = the average of both campaigns on each metric.
              </p>
            </div>
            <div className="flex items-center gap-6 text-[11px] mb-4 mt-5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-[2px] rounded-full" style={{ background: "hsl(357 70% 60%)" }} />
                <span className="text-muted-foreground font-medium">S25 Ultra (43 streamers)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-[2px] rounded-full" style={{ background: "hsl(220 12% 60%)" }} />
                <span className="text-muted-foreground font-medium">Z Fold7 (28 streamers)</span>
              </div>
            </div>
            <CampaignComparisonChart />
          </div>
        </div>
      </section>

      {/* ── FOLD7 DEEP DIVE ── */}
      <section className="relative overflow-hidden py-24 md:py-32 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3 block">Campaign Deep Dive</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
              Two campaigns, two creatives,<br />one Norwegian audience
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Both campaigns ran rich-media overlay ads on Norwegian Twitch. Watch the actual creatives below, then switch between campaigns to see the full analytics breakdown.
            </p>
          </div>

          {/* Ad creative - one per campaign */}
          <div className="grid md:grid-cols-2 gap-5 mb-12">
            <button
              onClick={() => setActiveTab("s25")}
              className={`group text-left rounded-2xl overflow-hidden border bg-black transition-all duration-300 ${isS25 ? "border-primary/60 shadow-[0_0_0_1px_hsl(var(--primary)/0.3)]" : "border-border hover:border-foreground/30"}`}
            >
              <video autoPlay loop muted playsInline className="w-full aspect-square object-cover">
                <source src="/lovable-uploads/overlay-samsung.webm" type="video/webm" />
              </video>
              <div className="px-5 py-4 border-t border-border bg-background flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Campaign 1 · Mar–May 2025</p>
                  <p className="text-sm text-foreground font-medium mt-0.5">Galaxy S25 Ultra - Animated overlay</p>
                </div>
                {isS25 && <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Viewing</span>}
              </div>
            </button>
            <button
              onClick={() => setActiveTab("fold7")}
              className={`group text-left rounded-2xl overflow-hidden border bg-black transition-all duration-300 ${!isS25 ? "border-primary/60 shadow-[0_0_0_1px_hsl(var(--primary)/0.3)]" : "border-border hover:border-foreground/30"}`}
            >
              <video autoPlay loop muted playsInline className="w-full aspect-square object-cover">
                <source src="/lovable-uploads/samsung-zfold7-overlay.webm" type="video/webm" />
              </video>
              <div className="px-5 py-4 border-t border-border bg-background flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Campaign 2 · Sep–Oct 2025</p>
                  <p className="text-sm text-foreground font-medium mt-0.5">Galaxy Z Fold7 - Rich media overlay</p>
                </div>
                {!isS25 && <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Viewing</span>}
              </div>
            </button>
          </div>

          {/* iOS-style segmented control */}
          <div className="flex items-center justify-center mb-10">
            <div className="inline-flex items-center p-1 rounded-full border border-border bg-background/40 backdrop-blur-sm">
              <button
                onClick={() => setActiveTab("s25")}
                className={`px-6 py-2 text-xs font-semibold tracking-widest uppercase rounded-full transition-all duration-300 ${isS25 ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                Galaxy S25 Ultra
              </button>
              <button
                onClick={() => setActiveTab("fold7")}
                className={`px-6 py-2 text-xs font-semibold tracking-widest uppercase rounded-full transition-all duration-300 ${!isS25 ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                Galaxy Z Fold7
              </button>
            </div>
          </div>

          {/* iOS-style chart cards - campaign-aware */}
          <div className="grid lg:grid-cols-2 gap-5 mb-5">

            {/* Card 1 - Reach (views-based, both campaigns) */}
            <div className="rounded-3xl border border-border/60 p-7 md:p-8">
              <div className="flex items-baseline justify-between mb-5">
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Reach</p>
                  <h3 className="text-lg font-semibold text-foreground tracking-tight">Completed live views</h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground tracking-tight tabular-nums">{isS25 ? "500,131" : "300,054"}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{isS25 ? "56 days" : "31 days"}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                {(isS25
                  ? [
                      { value: "138,633", label: "Unique viewers" },
                      { value: "3,750h", label: "Watch time" },
                      { value: "43", label: "Streamers" },
                      { value: "74", label: "Game categories" },
                    ]
                  : [
                      { value: "141,930", label: "Unique viewers" },
                      { value: "2,000h", label: "Watch time" },
                      { value: "28", label: "Streamers" },
                      { value: "558,257+", label: "VOD views" },
                    ]
                ).map((s) => (
                  <div key={s.label}>
                    <div className="text-3xl font-bold text-foreground tracking-tight tabular-nums">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-6 leading-relaxed">
                {isS25
                  ? "A completed view is one fully played ad run on a live stream. Together the two campaigns delivered 800,185 completed live views."
                  : "VOD views kept adding impressions after the live run ended, at no extra cost."}
              </p>
            </div>

            {/* Card 2 - Top Categories donut */}
            <div className="rounded-3xl border border-border/60 p-7 md:p-8">
              <div className="flex items-baseline justify-between mb-5">
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Top Categories</p>
                  <h3 className="text-lg font-semibold text-foreground tracking-tight">Where the views came from</h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground tracking-tight tabular-nums">{isS25 ? "50%" : "34%"}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">just chatting</div>
                </div>
              </div>
              <CategoryDonut data={isS25 ? s25Categories : fold7Categories} />
            </div>

          </div>

          {/* Audience + top streamers row */}
          <div className="grid lg:grid-cols-2 gap-5 mb-5">

            {/* Audience Profile */}
            <div className="rounded-3xl border border-border/60 p-7 md:p-8">
              <div className="mb-6">
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Audience</p>
                <h3 className="text-lg font-semibold text-foreground tracking-tight">{isS25 ? "Norwegian male, mostly 18–24" : "Norwegian, male, 18–24"}</h3>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                {(isS25
                  ? [
                      { value: "100%", label: "Male" },
                      { value: "73.39%", label: "Aged 18–24" },
                      { value: "90.07%", label: "Norway-based" },
                      { value: "86.54%", label: "Desktop" },
                    ]
                  : [
                      { value: "100%", label: "Male" },
                      { value: "100%", label: "Aged 18–24" },
                      { value: "93.05%", label: "Norway-based" },
                      { value: "80.39%", label: "Desktop" },
                    ]
                ).map((s) => (
                  <div key={s.label}>
                    <div className="text-3xl font-bold text-foreground tracking-tight tabular-nums">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-6 leading-relaxed">
                {isS25
                  ? "Top regions: Innlandet (11.07%), Oslo (10.27%), Trøndelag (10.27%), Vestland (10.03%) - Samsung's key Norwegian markets."
                  : "Top regions: Oslo (14.20%), Trøndelag (12.33%), Akershus (10.21%) - Samsung's key urban markets."}
              </p>
            </div>

            {/* Top streamers by completed views */}
            <div className="rounded-3xl border border-border/60 p-7 md:p-8">
              <div className="mb-6">
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Top streamers</p>
                <h3 className="text-lg font-semibold text-foreground tracking-tight">Biggest channels by completed views</h3>
              </div>
              <div className="space-y-1">
                {(isS25 ? s25Creators : fold7Creators).slice(0, 5).map((c) => (
                  <div key={c.name} className="flex justify-between items-center py-3 border-b border-border/40 last:border-0">
                    <span className="text-sm font-medium text-foreground">{c.name}</span>
                    <div className="text-right">
                      <span className="text-base font-bold text-foreground tabular-nums">{c.completedViews}</span>
                      <span className="text-xs text-muted-foreground ml-1">views</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Creator table */}
          <div ref={creatorRef} className={`transition-all duration-700 ${creatorVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">
                  {isS25 ? "S25 Ultra · Top 20 streamers" : "Fold7 · Top 20 streamers"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isS25
                    ? "Top 20 of the 43 S25 Ultra streamers, ranked by completed views. Totals below cover all 43."
                    : "Top 20 of the 28 Fold7 streamers, ranked by completed views. Totals below cover all 28."}
                </p>
              </div>
              <p className="text-xs text-muted-foreground hidden md:block">CTR highlighted in red above 3%</p>
            </div>
            {isS25 ? (
              <CreatorTable
                data={s25Creators}
                totalLabel="S25 Ultra total (43 streamers)"
                totalViews="500,131"
                totalClicks="-"
                totalCTR="0.76%"
                totalFollowers="-"
                followersLabel="Avg viewers"
              />
            ) : (
              <CreatorTable
                data={fold7Creators}
                totalLabel="Fold7 total (28 streamers)"
                totalViews="300,054"
                totalClicks="1,889"
                totalCTR="0.63%"
                totalFollowers="+2,185"
                followersLabel="New followers"
              />
            )}
          </div>
        </div>
      </section>

      {/* ── MICRO-INFLUENCER SECTION ── */}
      <section className="relative overflow-hidden py-24 md:py-32 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div ref={microRef} className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-700 ${microVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3 block">Fold7 · Micro-Influencer Effect</span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">
                Small audience.<br />Enormous engagement.
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                Simmlings generated 88 clicks from 746 views - an 11.80% CTR. That is 18 times the
                campaign verified average. The pattern held across five separate micro-influencers,
                confirming that community trust converts at a rate no reach-focused channel can match.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                The optimal Samsung campaign uses both tiers: large channels like Danniz (97,110 views)
                for brand exposure, and micro-influencers for qualified, high-intent traffic.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {fold7HighCTR.map((s, i) => (
                <div
                  key={s.name}
                  className="text-center p-4 rounded-2xl border border-border hover:border-primary/40 transition-all duration-300 cursor-default"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="text-xl font-bold text-primary mb-1">{s.ctr}</div>
                  <div className="text-xs text-muted-foreground font-medium">{s.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VOD + IN-STREAM FOOTAGE ── */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div ref={vodRef} className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${vodVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3 block">Fold7 · The Long Tail</span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">
                VOD reach: the campaign that keeps running
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                Twitch streams stay live as VODs after broadcast. The Fold7 campaign's top three streamers
                alone accumulated more VOD views than the entire live run. Samsung's creative kept generating
                impressions weeks after the campaign ended, at no additional cost.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  { name: "RubenGKS", vod: "214,500", note: "Highest VOD reach" },
                  { name: "Danniz", vod: "148,800", note: "Includes subathon" },
                  { name: "Jonieboi", vod: "105,542", note: "+857 followers" },
                ].map((s) => (
                  <div key={s.name} className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/10 hover:bg-muted/20 transition-colors">
                    <div>
                      <div className="text-sm font-semibold text-foreground">{s.name}</div>
                      <div className="text-xs text-muted-foreground">{s.note}</div>
                    </div>
                    <div className="text-lg font-bold text-foreground tabular-nums">{s.vod}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 border-t border-border pt-4">
                {[{ value: "300,054", label: "Fold7 live views" }, { value: "558,257+", label: "Fold7 VOD views" }, { value: "~858K", label: "Fold7 total reach" }].map((s, i) => (
                  <div key={s.label} className={`py-2 ${i < 2 ? "pr-4 border-r border-border" : ""} ${i > 0 ? "pl-4" : ""}`}>
                    <div className="text-xl font-bold text-foreground">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Campaign banners */}
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl overflow-hidden border border-border bg-black">
                <img
                  src="/lovable-uploads/samsung-s25-banner.jpg"
                  width={320}
                  height={320}
                  alt="Samsung Galaxy Z Fold7 campaign banner"
                  className="w-full h-auto"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-border bg-black">
                <img
                  src="/lovable-uploads/samsung-fold7-banner.jpg"
                  width={850}
                  height={500}
                  alt="Samsung Galaxy S25 Ultra campaign banner"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INSIGHTS GRID ── */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div ref={insightsRef} className={`mb-10 transition-all duration-700 ${insightsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3 block">Key Takeaways</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">What two campaigns prove</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {insights.map((item, i) => (
              <div
                key={item.title}
                ref={setInsightRef(i)}
                className={`p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 ${insightVisible[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL COMBINED RESULTS ── */}
      <section className="relative overflow-hidden py-20 md:py-28 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3 block">Combined Results</span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">Samsung on Twitch, 2025</h2>
            </div>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-12 shrink-0">
              <Link to="/contact">Book a campaign like this <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-t border-border pt-8">
            {[
              { value: "800,185", label: "Live completed views" },
              { value: "1.35M+", label: "Including VOD" },
              { value: "43 + 28", label: "Streamer slots" },
              { value: "56 + 31", label: "Campaign days" },
              { value: "0%", label: "Adblock impact" },
              { value: "0.76%", label: "Verified CTR (S25 Ultra)" },
            ].map((s, i) => (
              <div key={s.label} className={`py-4 ${i % 2 === 0 && i < 5 ? "pr-6 border-r border-border" : ""} ${i % 2 !== 0 || i > 4 ? "pl-6" : ""} ${i < 4 ? "border-b border-border lg:border-b-0" : ""}`}>
                <div className="text-2xl font-bold text-foreground tracking-tight tabular-nums">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-6 max-w-2xl">
            Streamer slots are counted per campaign - 43 streamers ran on the S25 Ultra campaign and 28 on the Z Fold7. Some creators appeared in both, so the unique-streamer count is lower than the sum.
          </p>
        </div>
      </section>

      {/* ── CONTACT PERSON ── */}
      <section className="py-14 md:py-20 border-t border-border">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="grid sm:grid-cols-[160px_1fr] gap-6 sm:gap-8 items-center">
            <div className="rounded-2xl overflow-hidden border border-border w-[140px] sm:w-[160px] aspect-[4/5]">
              <img
                src={founderImage}
                alt="Andreas Myraune, founder of Beta Ads"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2 block">Contact Person</span>
              <p className="text-lg font-semibold text-foreground">Andreas Myraune</p>
              <p className="text-sm text-muted-foreground mb-4">Founder & CEO · Beta Ads</p>

              <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-md">
                I personally handle every Samsung-tier engagement. Send me a note about your launch window, target market, and rough budget - I'll come back within 24 hours.
              </p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <a
                  href="mailto:sales@beta-ads.no"
                  className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  sales@beta-ads.no
                </a>
                <a
                  href="https://www.linkedin.com/in/myraune"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-primary" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default SamsungCaseStudy;
