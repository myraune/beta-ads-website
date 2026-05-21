import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/* ── Count-up animation hook ── */
function useCountUp(target: string, isVisible: boolean) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isVisible) return;
    const cleaned = target.replace(/,/g, "");
    const numMatch = cleaned.match(/^([\d.]+)/);
    if (!numMatch) { setDisplay(target); return; }
    const numericTarget = parseFloat(numMatch[1]);
    const suffix = cleaned.replace(/^[\d.]+/, "");
    const hasCommas = target.includes(",");
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(numericTarget * eased);
      setDisplay((hasCommas ? current.toLocaleString() : current.toString()) + suffix);
      if (progress < 1) requestAnimationFrame(tick);
    };
    setDisplay("0" + suffix);
    requestAnimationFrame(tick);
  }, [isVisible, target]);

  return display;
}

/* ── Ad Format Preview - single interactive viewer, format-switching tabs ──
 *
 * Replaces the previous 6 stacked text+image rows (which read as a blog post).
 * Instead, ONE 16:9 mock-stream preview frame whose contents swap as the user
 * picks a format from the tab strip. Spec details live in a compact row
 * underneath the preview, not in a paragraph. Auto-rotates through formats
 * until interacted with, then yields to manual selection. */
const AdFormatShowcase: React.FC = () => {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

  // Auto-rotate the active format every 4s while in view, until user clicks
  useEffect(() => {
    if (!autoplay || !isVisible) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % adFormats.length);
    }, 4000);
    return () => clearInterval(id);
  }, [autoplay, isVisible]);

  const fmt = adFormats[active];

  return (
    <div
      ref={ref}
      className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Tab strip */}
      <div className="flex flex-wrap items-center gap-2 mb-6 md:mb-8">
        {adFormats.map((f, i) => {
          const isActive = i === active;
          return (
            <button
              key={f.name}
              onClick={() => { setActive(i); setAutoplay(false); }}
              className={`group inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[12px] font-medium tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-foreground/[0.04] text-muted-foreground hover:bg-foreground/[0.08] hover:text-foreground"
              }`}
            >
              <span className={`text-[10px] tabular-nums font-semibold ${
                isActive ? "text-primary-foreground/70" : "text-muted-foreground/60"
              }`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{f.name}</span>
            </button>
          );
        })}
      </div>

      {/* Preview frame - 16:9 with crossfade between formats */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-black ring-1 ring-border/40 dark:ring-white/[0.08] shadow-2xl shadow-black/40" style={{ aspectRatio: "16 / 9" }}>
        {adFormats.map((f, i) => (
          <img
            key={f.name}
            src={f.image}
            alt={`${f.name} ad format preview`}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Bottom-left chip overlay - format index + kicker */}
        <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white text-[11px] font-medium pointer-events-none">
          <span className="tabular-nums text-white/60">{String(active + 1).padStart(2, "0")}</span>
          <span>{fmt.kicker}</span>
        </div>
      </div>

      {/* Details - single row beneath the preview. Format name on the left,
          four spec columns on the right. Updates with the active format. */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:gap-12 items-start">
        <div>
          <h4 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-2">
            {fmt.name}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
            {fmt.body}
          </p>
        </div>

        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 sm:gap-x-10 gap-y-3 lg:min-w-[480px]">
          {fmt.specs.map((s) => (
            <div key={s.label}>
              <dt className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-1">
                {s.label}
              </dt>
              <dd className="text-[13px] font-medium text-foreground tabular-nums">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

/* ── Platform data ── */
const platforms = [
  {
    name: "Twitch",
    slug: "/twitch-advertising",
    streamers: "28,000+",
    tagline: "Largest gaming audience",
    logo: "/lovable-uploads/platform-twitch.png",
    color: "#9146FF",
  },
  {
    name: "YouTube",
    slug: "/youtube-advertising",
    streamers: "8,200+",
    tagline: "Broadest demographics",
    logo: "/lovable-uploads/platform-youtube.png",
    color: "#FF0000",
  },
  {
    name: "Kick",
    slug: "/kick-advertising",
    streamers: "2,800+",
    tagline: "Fastest growing platform",
    logo: "/lovable-uploads/platform-kick.png",
    color: "#53FC18",
  },
  {
    name: "Trovo",
    slug: "#",
    streamers: "445+",
    tagline: "Untapped niche communities",
    logo: "/lovable-uploads/platform-trovo.png",
    color: "#19D66B",
  },
];

const adFormats = [
  {
    name: "Snipe Ad",
    kicker: "Moment-triggered banner",
    body:
      "A short animated banner that slides in at streamer-cued moments - match wins, sponsor reads, breaks between rounds. Minimal screen real-estate, high memorability. Every campaign's bread-and-butter.",
    specs: [
      { label: "Format", value: "400 × 200 px" },
      { label: "Duration", value: "3–8 s" },
      { label: "Typical CTR", value: "1.1–1.6%" },
      { label: "Best for", value: "Gaming, CPG, drinks" },
    ],
    image: "/lovable-uploads/snipeDemo1.png",
  },
  {
    name: "Sidebar",
    kicker: "Always-on placement",
    body:
      "A persistent overlay that sits inside the streamer's own layout frame for the entire broadcast. Always visible means maximum impressions - ideal when the goal is sustained brand awareness across a full session.",
    specs: [
      { label: "Format", value: "180–240 px wide" },
      { label: "Duration", value: "Full session" },
      { label: "Max impressions", value: "1 per viewer-minute" },
      { label: "Best for", value: "SaaS, finance, telecom" },
    ],
    image: "/lovable-uploads/sideBarDemo1.png",
  },
  {
    name: "Rich Media",
    kicker: "Full-frame takeover",
    body:
      "The biggest single visual hit a stream can run - a full 1920 × 1080 animated takeover rendered between content beats (between matches, post-raid, or at commercial breaks). Feels cinematic, brand-first, TV-quality.",
    specs: [
      { label: "Format", value: "1920 × 1080" },
      { label: "Duration", value: "10–30 s" },
      { label: "Placement", value: "Match/break windows" },
      { label: "Best for", value: "Product launches" },
    ],
    image: "/lovable-uploads/richMediaDemo1.png",
  },
  {
    name: "Video",
    kicker: "TV spot, live-streamed",
    body:
      "A 15–60 second video unit rendered via OBS browser source, with optional audio. Slotted pre-stream, mid-break, or end-of-stream - effectively a TV commercial inserted inside the live broadcast, ad-block free.",
    specs: [
      { label: "Format", value: "MP4 or WebM" },
      { label: "Duration", value: "15–60 s" },
      { label: "Audio", value: "Optional" },
      { label: "Best for", value: "Existing TV creative" },
    ],
    image: "/lovable-uploads/videoDemo1.png",
  },
  {
    name: "Poll",
    kicker: "Chat-driven interaction",
    body:
      "An on-screen sponsored poll tied directly to Twitch chat - results update live as viewers type !vote. Typically pulls 5–20% of concurrent viewers into active participation, doubling as a campaign recall mechanism.",
    specs: [
      { label: "Format", value: "Branded poll card" },
      { label: "Input", value: "Chat (!vote)" },
      { label: "Participation", value: "5–20% of CCU" },
      { label: "Best for", value: "Brand recall, research" },
    ],
    image: "/lovable-uploads/pollDemo1.png",
  },
  {
    name: "Interactive",
    kicker: "Click-tracked overlays",
    body:
      "Clickable overlay elements that resolve to brand landing pages with verified, platform-level click tracking. This is the format we use to measure conversion on every campaign - the CTR numbers in our case studies all come from here.",
    specs: [
      { label: "Tracking", value: "Per-click, verified" },
      { label: "Destination", value: "Brand landing page" },
      { label: "Attribution", value: "Platform-level" },
      { label: "Best for", value: "Performance campaigns" },
    ],
    image: "/lovable-uploads/interactiveDemo1.png",
  },
];

/* ── Individual platform column ── */
const PlatformCol: React.FC<{ p: typeof platforms[0]; isVisible: boolean; index: number }> = ({ p, isVisible, index }) => {
  const count = useCountUp(p.streamers, isVisible);
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={p.slug}
      className="group flex flex-col items-center text-center gap-4 py-8 px-4 rounded-2xl transition-all duration-300 hover:bg-foreground/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      style={{ transitionDelay: `${index * 60}ms`, opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Logo */}
      <div className="h-10 flex items-center justify-center">
        <img
          src={p.logo}
          alt={p.name}
          className="h-8 w-auto object-contain transition-all duration-300"
          style={{ filter: hovered ? `drop-shadow(0 0 8px ${p.color}60)` : "none" }}
        />
      </div>

      {/* Streamer count */}
      <div>
        <span
          className="text-3xl md:text-4xl font-bold tabular-nums tracking-tight"
          style={{ color: p.color }}
        >
          {count}
        </span>
        <p className="text-xs text-muted-foreground mt-0.5">streamers</p>
      </div>

      {/* Platform name + tagline */}
      <div>
        <p className="text-sm font-semibold text-foreground">{p.name}</p>
        <p className="text-xs text-muted-foreground leading-snug mt-0.5">{p.tagline}</p>
      </div>

      {/* Underline accent on hover */}
      <div
        className="h-px w-8 rounded-full transition-all duration-300"
        style={{ backgroundColor: p.color, opacity: hovered ? 0.8 : 0.2, width: hovered ? "48px" : "32px" }}
      />
    </Link>
  );
};

export const SPUseCases: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={ref} className="pt-20 md:pt-32 pb-0 relative" aria-label="Platforms and ad formats">
      {/* Red depth glow behind the ad format carousel */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden" style={{ height: "600px" }} aria-hidden>
        <div className="absolute left-1/2 bottom-[10%] -translate-x-1/2 w-[120%] h-full rounded-full" style={{ background: "radial-gradient(ellipse at center, rgba(233,79,55,0.12) 0%, rgba(233,79,55,0.05) 45%, transparent 65%)" }} />
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Header ── */}
        <div className={`mb-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">Platform Reach</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-3 max-w-xl">
            39,445 streamers. 4 platforms. One dashboard.
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
            Browse recently active streamers across all major platforms and launch native overlay ads from a single dashboard.
          </p>
        </div>

        {/* ── Platform columns ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 mb-4">
          {/* Vertical dividers via grid gap substitute */}
          {platforms.map((p, i) => (
            <PlatformCol key={p.name} p={p} isVisible={isVisible} index={i} />
          ))}
        </div>

        {/* Divider */}
        <div className={`border-t border-border my-16 transition-all duration-700 delay-300 ${isVisible ? "opacity-100" : "opacity-0"}`} />

        {/* ── Ad Formats header ── */}
        <div className={`mb-12 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">Ad Formats</span>
          {/* h3: sub-section within same page section - preserves h1 > h2 > h3 heading hierarchy */}
          <h3 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-3 max-w-xl">
            6 formats. Zero adblock.
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
            Every format renders directly inside the stream - invisible to blockers, impossible to skip.
          </p>
        </div>

      </div>

      {/* ── Ad format showcase - stacked rows, each scroll-reveals individually ── */}
      <div className="pb-20 md:pb-32">
        <AdFormatShowcase />
      </div>
    </section>
  );
};
