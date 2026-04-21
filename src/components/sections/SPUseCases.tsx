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

/* ── Ad Format Showcase — stacked, alternating rows, no carousel ── */
const AdFormatRow: React.FC<{
  fmt: typeof adFormats[0];
  index: number;
}> = ({ fmt, index }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });
  // Even rows: text on left, image on right. Odd rows: reversed.
  const imageFirst = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`grid lg:grid-cols-2 gap-10 lg:gap-20 items-center transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Text column */}
      <div className={imageFirst ? "lg:order-2" : ""}>
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
            {fmt.kicker}
          </span>
        </div>
        <h4 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-5 max-w-md">
          {fmt.name}
        </h4>
        <p className="text-base text-muted-foreground leading-relaxed max-w-lg mb-8">
          {fmt.body}
        </p>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-4 max-w-md">
          {fmt.specs.map((s) => (
            <div key={s.label}>
              <dt className="text-xs text-muted-foreground mb-1">{s.label}</dt>
              <dd className="text-sm font-medium text-foreground tabular-nums">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Image column — 16:9, object-cover, no letterbox */}
      <div className={imageFirst ? "lg:order-1" : ""}>
        <div
          className="relative w-full rounded-2xl overflow-hidden bg-muted/30 dark:bg-white/[0.04] ring-1 ring-border/40 dark:ring-white/[0.06]"
          style={{ aspectRatio: "16 / 9" }}
        >
          <img
            src={fmt.image}
            alt={`${fmt.name} ad format preview`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
};

const AdFormatShowcase: React.FC = () => (
  <div className="max-w-7xl mx-auto px-6 lg:px-12">
    <div className="space-y-24 lg:space-y-36">
      {adFormats.map((fmt, i) => (
        <AdFormatRow key={fmt.name} fmt={fmt} index={i} />
      ))}
    </div>
  </div>
);

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
      "A short animated banner that slides in at streamer-cued moments — match wins, sponsor reads, breaks between rounds. Minimal screen real-estate, high memorability. Every campaign's bread-and-butter.",
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
      "A persistent overlay that sits inside the streamer's own layout frame for the entire broadcast. Always visible means maximum impressions — ideal when the goal is sustained brand awareness across a full session.",
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
      "The biggest single visual hit a stream can run — a full 1920 × 1080 animated takeover rendered between content beats (between matches, post-raid, or at commercial breaks). Feels cinematic, brand-first, TV-quality.",
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
      "A 15–60 second video unit rendered via OBS browser source, with optional audio. Slotted pre-stream, mid-break, or end-of-stream — effectively a TV commercial inserted inside the live broadcast, ad-block free.",
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
      "An on-screen sponsored poll tied directly to Twitch chat — results update live as viewers type !vote. Typically pulls 5–20% of concurrent viewers into active participation, doubling as a campaign recall mechanism.",
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
      "Clickable overlay elements that resolve to brand landing pages with verified, platform-level click tracking. This is the format we use to measure conversion on every campaign — the CTR numbers in our case studies all come from here.",
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
      className="group flex flex-col items-center text-center gap-4 py-8 px-4 rounded-2xl transition-all duration-300 hover:bg-foreground/[0.03]"
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
          {/* h3: sub-section within same page section — preserves h1 > h2 > h3 heading hierarchy */}
          <h3 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-3 max-w-xl">
            6 formats. Zero adblock.
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
            Every format renders directly inside the stream — invisible to blockers, impossible to skip.
          </p>
        </div>

      </div>

      {/* ── Ad format showcase — stacked rows, each scroll-reveals individually ── */}
      <div className="pb-20 md:pb-32">
        <AdFormatShowcase />
      </div>
    </section>
  );
};
