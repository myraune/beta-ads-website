import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedShaderBackground } from "@/components/ui/animated-shader-background";
import { useScrollAnimation, useMultipleScrollAnimations } from "@/hooks/useScrollAnimation";

const DRIVE_VIDEO_EMBED = "https://drive.google.com/file/d/1FxgGtpweqtrJ-gCRPp38PX_iVenr0gLt/preview";

/* ─── Data ─── */
const s25Results = [
  { value: "500,131", label: "Completed views" },
  { value: "138,633", label: "Unique viewers" },
  { value: "14,642", label: "Unverified clicks" },
  { value: "2.93%", label: "Unverified CTR" },
  { value: "3,819", label: "Verified clicks" },
  { value: "3,750h", label: "Artwork watch time" },
];

const fold7Results = [
  { value: "300,054", label: "Completed views" },
  { value: "141,930", label: "Unique viewers" },
  { value: "7,028", label: "Unverified clicks" },
  { value: "2.34%", label: "Unverified CTR" },
  { value: "1,965", label: "Verified clicks" },
  { value: "~76 NOK", label: "Cost per verified click" },
];

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

const fold7Weekly = [
  { week: "Week 1", ctr: 3.70, label: "3.70%", viewers: "29,549" },
  { week: "Week 2", ctr: 3.20, label: "3.20%", viewers: "70,019" },
  { week: "Week 3", ctr: 2.56, label: "2.56%", viewers: "112,248" },
  { week: "Final", ctr: 2.34, label: "2.34%", viewers: "141,930" },
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
  { title: "Consistent audience", body: "Both campaigns hit the same demographic: Norwegian males 18-24, 90-93% Norway-based, 73-80% desktop. The audience did not drift between spring and autumn." },
  { title: "Just Chatting dominates", body: "50.28% of S25 views and 34.45% of Fold7 views from Just Chatting. Conversational content is consistently the most receptive environment for interactive CTAs." },
  { title: "Micro-influencers convert", body: "Simmlings: 11.80% CTR from 746 views. m4r5t3in: 10.00%. The small-channel, high-trust dynamic delivers 9-18x the campaign average CTR." },
  { title: "CTR peaks in Week 1", body: "Fold7 opened at 3.70% and closed at 2.34%. The decline is predictable. Rotating creatives mid-campaign sustains early-phase performance throughout." },
  { title: "VOD doubles reach for free", body: "Fold7 accumulated 558,257+ VOD views on top of 300K live. Every campaign keeps generating impressions weeks after it ends, at no extra cost." },
  { title: "Zero adblock impact", body: "Overlays render as OBS browser sources. Both campaigns: every impression was a genuine live view. The format is structurally invisible to adblock software." },
];

/* ─── Creator table (expandable) ─── */
const CreatorTable: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? fold7Creators : fold7Creators.slice(0, 8);
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
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">New followers</th>
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
                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground hidden md:table-cell">+{s.followers}</td>
                  </tr>
                );
              })}
              {!expanded && (
                <tr className="bg-muted/5 hover:bg-muted/10 transition-colors cursor-pointer" onClick={() => setExpanded(true)}>
                  <td colSpan={6} className="px-4 py-3 text-center">
                    <span className="text-xs text-primary font-medium inline-flex items-center gap-1">
                      Show all 20 streamers <ChevronDown className="w-3 h-3" />
                    </span>
                  </td>
                </tr>
              )}
              <tr className="border-t-2 border-border bg-muted/20 font-semibold">
                <td className="px-4 py-3 text-xs text-muted-foreground" colSpan={2}>Total (28 streamers)</td>
                <td className="px-4 py-3 text-right tabular-nums text-foreground">300,054</td>
                <td className="px-4 py-3 text-right tabular-nums text-foreground">1,889</td>
                <td className="px-4 py-3 text-right tabular-nums text-foreground">0.63%</td>
                <td className="px-4 py-3 text-right tabular-nums text-foreground hidden md:table-cell">+2,185</td>
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

/* ─── CTR bar component ─── */
const CtrBar: React.FC<{ ctr: number; max: number; label: string; viewers: string; index: number }> = ({ ctr, max, label, viewers, index }) => {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setAnimated(true), index * 120); observer.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);
  const pct = (ctr / max) * 100;
  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-sm font-semibold text-foreground">{label}</span>
          <span className="text-xs text-muted-foreground ml-2">{viewers} unique viewers</span>
        </div>
        <span className={`text-lg font-bold tracking-tight transition-colors duration-300 ${index === 0 ? "text-primary" : "text-foreground"}`}>{ctr.toFixed(2)}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${index === 0 ? "bg-primary" : "bg-foreground/60"}`}
          style={{ width: animated ? `${pct}%` : "0%" }}
        />
      </div>
    </div>
  );
};

/* ─── Category bar component ─── */
const CategoryBar: React.FC<{ name: string; share: number; views: string; ctr: string; index: number }> = ({ name, share, views, ctr, index }) => {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setAnimated(true), index * 80); observer.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);
  return (
    <div ref={ref} className="py-3 border-b border-border last:border-0">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <div className="text-right">
          <span className="text-sm font-bold text-foreground">{share}%</span>
          <span className="text-xs text-muted-foreground ml-2">{ctr} CTR</span>
        </div>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary/60 rounded-full transition-all duration-700 ease-out"
          style={{ width: animated ? `${(share / 35) * 100}%` : "0%" }}
        />
      </div>
      <div className="text-xs text-muted-foreground mt-1">{views} views</div>
    </div>
  );
};

/* ─── Main component ─── */
const SamsungCaseStudy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"s25" | "fold7">("s25");

  const { ref: insightsRef, isVisible: insightsVisible } = useScrollAnimation<HTMLDivElement>();
  const { setRef: setInsightRef, visibleItems: insightVisible } = useMultipleScrollAnimations<HTMLDivElement>(insights.length);
  const { ref: creatorRef, isVisible: creatorVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: microRef, isVisible: microVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: vodRef, isVisible: vodVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div>

      {/* ── HERO with AnimatedShaderBackground ── */}
      <section className="relative overflow-clip" style={{ background: "hsl(240 11% 5%)" }}>
        <AnimatedShaderBackground heightFactor={1.1} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent z-[1] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-28 md:pt-36 pb-20">

          <Link to="/case-studies" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors mb-10">
            <ArrowLeft className="w-4 h-4" /> Back to campaigns
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: headline */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src="/lovable-uploads/icon-samsung.svg" alt="Samsung" className="h-5 w-auto opacity-70" />
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/70 backdrop-blur-sm tracking-wider uppercase">
                  Case Study
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
                Samsung<br />
                <span style={{ fontFamily: "'Instrument Serif', serif" }} className="italic font-normal">x Beta Ads</span>
              </h1>
              <p className="text-lg text-white/60 leading-relaxed mb-10 max-w-md">
                Two smartphone launches. One consistent audience. Over 800,000 completed views on Norwegian Twitch,
                with zero adblock impact across both campaigns.
              </p>
              <div className="grid grid-cols-3 gap-px rounded-2xl overflow-hidden bg-white/10">
                {[
                  { value: "~800K", label: "Combined views" },
                  { value: "71", label: "Streamers" },
                  { value: "0%", label: "Adblock impact" },
                ].map((s) => (
                  <div key={s.label} className="bg-black/30 backdrop-blur-sm px-5 py-4">
                    <div className="text-2xl font-bold text-white tracking-tight">{s.value}</div>
                    <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: video */}
            <div className="rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl aspect-video">
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

      {/* ── CAMPAIGN TAB SWITCHER ── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Tab buttons */}
          <div className="flex gap-0 border-b border-border">
            {[
              { id: "s25" as const, label: "Galaxy S25 Ultra", sub: "Mar–May 2025" },
              { id: "fold7" as const, label: "Galaxy Z Fold7", sub: "Sep–Oct 2025" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-8 py-5 text-left transition-all duration-200 group ${activeTab === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <div className="text-sm font-semibold">{tab.label}</div>
                <div className="text-xs text-muted-foreground">{tab.sub}</div>
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-opacity duration-200 ${activeTab === tab.id ? "opacity-100" : "opacity-0"}`} />
              </button>
            ))}
          </div>

          {/* ── S25 ULTRA PANEL ── */}
          {activeTab === "s25" && (
            <div className="py-16 grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">Campaign 1 of 2</span>
                <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">
                  Galaxy S25 Ultra<br />Norwegian Twitch
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base mb-5">
                  Samsung needed to reach young Norwegian tech consumers who skip pre-roll and run adblock on
                  every browser. Beta deployed animated overlay ads across 43 streamers for 56 days. The
                  overlays rendered as OBS browser sources, completely invisible to adblock, across 74 game
                  categories.
                </p>
                <p className="text-muted-foreground leading-relaxed text-base mb-8">
                  Just Chatting dominated at 50.28% of all views. Best day CTR hit 2.68% on March 24 with
                  127 clicks. At a CPM of 10 EUR per 1,000 completed views, the S25 Ultra campaign represented
                  approximately 200,000 NOK in revenue for Beta Ads.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Top category", value: "Just Chatting", sub: "50.28% of all views" },
                    { label: "Best day CTR", value: "2.68%", sub: "March 24, 127 clicks" },
                    { label: "Norway audience", value: "90.07%", sub: "86.54% aged 18-24" },
                    { label: "Adblock impact", value: "0%", sub: "OBS browser source" },
                  ].map((s) => (
                    <div key={s.label} className="p-4 rounded-xl border border-border bg-muted/20">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{s.label}</div>
                      <div className="text-xl font-bold text-foreground">{s.value}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{s.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="grid grid-cols-2 gap-px rounded-2xl overflow-hidden bg-border mb-4">
                  {s25Results.map((s) => (
                    <div key={s.label} className="bg-background px-5 py-5">
                      <div className="text-2xl font-bold text-foreground tracking-tight">{s.value}</div>
                      <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="p-5 rounded-2xl bg-foreground">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">Why it worked</p>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Standard display ads average 0.1% CTR. The S25 Ultra campaign delivered 2.93% on an
                    unverified basis — 29 times the benchmark — against an audience that actively blocks
                    conventional advertising.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── FOLD7 PANEL ── */}
          {activeTab === "fold7" && (
            <div className="py-16">
              <div className="grid lg:grid-cols-2 gap-16 items-start mb-12">
                <div>
                  <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">Campaign 2 of 2</span>
                  <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">
                    Galaxy Z Fold7<br />Norwegian Twitch
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-base mb-5">
                    Foldable phones require education. A viewer needs to understand the hinge, the inner
                    display, the multitasking workflow, and why the form factor justifies the price premium.
                    Banner ads cannot convey this.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-base mb-5">
                    Beta ran two simultaneous formats: a rich media overlay inside OBS (adblock-proof),
                    plus a live chatbot CTA in stream chat. All creative was built in-house by Beta's motion
                    design team to match Samsung's official launch campaign exactly.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    Week 1 CTR hit 3.70%. Best single day: 160 clicks on September 25. The campaign closed
                    at 2.34% after 31 days across 28 streamers.
                  </p>
                </div>
                <div>
                  <div className="grid grid-cols-2 gap-px rounded-2xl overflow-hidden bg-border mb-4">
                    {fold7Results.map((s) => (
                      <div key={s.label} className="bg-background px-5 py-5">
                        <div className="text-2xl font-bold text-foreground tracking-tight">{s.value}</div>
                        <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-px rounded-2xl overflow-hidden bg-border">
                    {[
                      { value: "2,000h 22m", label: "Watch time" },
                      { value: "558,257+", label: "VOD views" },
                      { value: "54", label: "Categories" },
                      { value: "93.05%", label: "Norway audience" },
                    ].map((s) => (
                      <div key={s.label} className="bg-background px-5 py-4">
                        <div className="text-xl font-bold text-foreground tracking-tight">{s.value}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ad creative */}
              <div className="grid md:grid-cols-2 gap-5 mb-12">
                <div className="rounded-2xl overflow-hidden border border-border bg-black">
                  <img src="/lovable-uploads/samsung-zfold7-banner.png" alt="Samsung Galaxy Z Fold7 overlay" className="w-full h-auto" />
                  <div className="px-5 py-3 border-t border-border bg-background">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Format 1</p>
                    <p className="text-sm text-foreground font-medium">Rich Media Overlay</p>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-border bg-black">
                  <video autoPlay loop muted playsInline className="w-full h-auto">
                    <source src="/lovable-uploads/samsung-zfold7-overlay.webm" type="video/webm" />
                  </video>
                  <div className="px-5 py-3 border-t border-border bg-background">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Format 2</p>
                    <p className="text-sm text-foreground font-medium">Animated Overlay, Live on Stream</p>
                  </div>
                </div>
              </div>

              {/* Data: CTR + Categories + Audience */}
              <div className="grid lg:grid-cols-3 gap-10 mb-12">
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-5">Weekly CTR</p>
                  <div className="space-y-5">
                    {fold7Weekly.map((w, i) => (
                      <CtrBar key={w.week} ctr={w.ctr} max={4} label={w.week} viewers={w.viewers} index={i} />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                    Natural ad fatigue. Rotating creatives or adding streamers mid-campaign sustains Week 1 CTR.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-5">Top Categories</p>
                  <div>
                    {fold7Categories.map((c, i) => (
                      <CategoryBar key={c.name} name={c.name} share={c.share} views={c.views} ctr={c.ctr} index={i} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-5">Audience Profile</p>
                  <div className="grid grid-cols-2 gap-px rounded-xl overflow-hidden bg-border mb-6">
                    {[
                      { value: "100%", label: "Male" },
                      { value: "100%", label: "Age 18-24" },
                      { value: "93.05%", label: "Norway" },
                      { value: "80.39%", label: "Desktop" },
                    ].map((s) => (
                      <div key={s.label} className="bg-background px-4 py-4">
                        <div className="text-xl font-bold text-foreground">{s.value}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">Top 5 Days</p>
                  {[
                    { date: "Sep 25", clicks: 160, ctr: "1.51%", best: true },
                    { date: "Sep 30", clicks: 116, ctr: "1.17%", best: false },
                    { date: "Oct 8", clicks: 105, ctr: "0.53%", best: false },
                    { date: "Sep 27", clicks: 100, ctr: "1.02%", best: false },
                    { date: "Sep 29", clicks: 99, ctr: "1.30%", best: false },
                  ].map((d) => (
                    <div key={d.date} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-foreground">{d.date}</span>
                        {d.best && <span className="text-xs text-primary font-semibold">Best</span>}
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-foreground">{d.clicks} clicks</span>
                        <span className="text-xs text-muted-foreground ml-2">{d.ctr}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Creator table */}
              <div ref={creatorRef} className={`transition-all duration-700 ${creatorVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <div className="flex items-end justify-between mb-4">
                  <p className="text-xs font-semibold tracking-widest uppercase text-primary">All Streamers</p>
                  <p className="text-xs text-muted-foreground hidden md:block">Click-through rate highlighted in red above 3%</p>
                </div>
                <CreatorTable />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── MICRO-INFLUENCER SECTION — dark, scroll animated ── */}
      <section className="py-20 md:py-28 bg-foreground">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div ref={microRef} className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-700 ${microVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">Micro-Influencer Effect</span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-6">
                Small audience.<br />Enormous engagement.
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-6">
                Simmlings generated 88 clicks from 746 views — an 11.80% CTR. That is 18 times the
                campaign verified average. The pattern held across five separate micro-influencers,
                confirming that community trust converts at a rate no reach-focused channel can match.
              </p>
              <p className="text-white/60 text-base leading-relaxed">
                The optimal Samsung campaign uses both tiers: large channels like Danniz (97,110 views)
                for brand exposure, and micro-influencers for qualified, high-intent traffic.
              </p>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {fold7HighCTR.map((s, i) => (
                <div
                  key={s.name}
                  className="text-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/40 transition-all duration-300 cursor-default"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="text-xl font-bold text-primary mb-1">{s.ctr}</div>
                  <div className="text-xs text-white/70 font-medium">{s.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VOD + IN-STREAM FOOTAGE ── */}
      <section className="py-20 md:py-28 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div ref={vodRef} className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${vodVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">The Long Tail</span>
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
              <div className="grid grid-cols-3 gap-px rounded-xl overflow-hidden bg-border">
                {[{ value: "300K", label: "Live views" }, { value: "558K+", label: "VOD views" }, { value: "~858K", label: "Total reach" }].map((s) => (
                  <div key={s.label} className="bg-background px-4 py-4 text-center">
                    <div className="text-xl font-bold text-foreground">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live overlay video */}
            <div className="rounded-2xl overflow-hidden bg-black border border-border">
              <video autoPlay loop muted playsInline className="w-full h-auto">
                <source src="/lovable-uploads/overlay-samsung.webm" type="video/webm" />
              </video>
              <div className="px-5 py-3 border-t border-border bg-background">
                <p className="text-xs text-muted-foreground">Samsung Galaxy Z Fold7 overlay live on stream</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INSIGHTS GRID — scroll animated ── */}
      <section className="py-20 md:py-28 border-b border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div ref={insightsRef} className={`mb-10 transition-all duration-700 ${insightsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">Key Takeaways</span>
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

      {/* ── FINAL COMBINED RESULTS — dark ── */}
      <section className="bg-foreground">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-3 block">Combined Results</span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white">Samsung on Twitch, 2025</h2>
            </div>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 shrink-0">
              <Link to="/contact">Book a campaign like this <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/10 rounded-2xl overflow-hidden">
            {[
              { value: "~800K", label: "Total views" },
              { value: "71", label: "Streamers" },
              { value: "~21,670", label: "Link clicks" },
              { value: "2", label: "Campaigns" },
              { value: "0%", label: "Adblock" },
              { value: "23-29x", label: "vs. display CTR" },
            ].map((s) => (
              <div key={s.label} className="bg-foreground px-6 py-6">
                <div className="text-2xl font-bold text-white tracking-tight">{s.value}</div>
                <div className="text-xs text-white/40 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default SamsungCaseStudy;
