import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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

/* ── Ad Format Showcase — single 16:9 preview with crossfade + thumbnail strip ── */
const AdFormatCarousel: React.FC = () => {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const n = adFormats.length;

  const goTo = useCallback((idx: number) => setActive(idx), []);

  useEffect(() => {
    if (hovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => setActive((a) => (a + 1) % n), 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hovered, n]);

  const fmt = adFormats[active];

  return (
    <div
      className="max-w-6xl mx-auto px-6 lg:px-8"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Preview — single 16:9 frame, clean crossfade between formats */}
      <div
        className="relative w-full rounded-2xl overflow-hidden bg-muted/30 dark:bg-white/[0.04] ring-1 ring-border/40 dark:ring-white/[0.06]"
        style={{ aspectRatio: "16 / 9" }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={fmt.image}
            src={fmt.image}
            alt={fmt.name}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </AnimatePresence>

        {/* Live indicator — small status pill bottom-left */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#5adbb5]"
            style={{ boxShadow: "0 0 6px rgba(90,219,181,0.6)" }}
          />
          <span className="text-[10px] font-semibold tracking-widest uppercase text-white">
            Live preview
          </span>
        </div>

        {/* Format name pill — bottom-right, fades in on change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={fmt.name + "-pill"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-3.5 py-1.5"
          >
            <span className="text-[11px] font-semibold text-white">
              {fmt.name}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Active format description — clean text strip below the preview */}
      <AnimatePresence mode="wait">
        <motion.div
          key={fmt.name + "-desc"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className="mt-6 flex items-baseline gap-4"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-primary shrink-0">
            Ad Format
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            <span className="text-foreground font-medium">{fmt.name}</span>
            <span className="mx-2 text-muted-foreground/40">·</span>
            {fmt.desc}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Thumbnail strip — 6 format cards, click to switch.
          Serves as both the navigator and a visual index of every format. */}
      <div
        className="mt-8 grid grid-cols-3 md:grid-cols-6 gap-3"
        role="tablist"
        aria-label="Ad format thumbnails"
      >
        {adFormats.map((f, i) => {
          const isActive = i === active;
          return (
            <button
              key={f.name}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={isActive}
              aria-label={`Show ${f.name} ad format`}
              className={`group relative flex flex-col rounded-xl overflow-hidden text-left transition-all duration-300 ${
                isActive
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  : "ring-1 ring-border/40 dark:ring-white/[0.08] hover:ring-foreground/30"
              }`}
            >
              <div
                className="relative w-full bg-muted/30 dark:bg-white/[0.04]"
                style={{ aspectRatio: "16 / 9" }}
              >
                <img
                  src={f.image}
                  alt=""
                  aria-hidden
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
                    isActive ? "" : "opacity-70 group-hover:opacity-100"
                  }`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div
                className={`px-3 py-2 text-[11px] md:text-xs font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-foreground bg-primary/10"
                    : "text-muted-foreground bg-transparent group-hover:text-foreground"
                }`}
              >
                {f.name}
              </div>
            </button>
          );
        })}
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
  { name: "Snipe Ad", desc: "Animated banner overlay at key stream moments", image: "/lovable-uploads/snipeDemo1.png" },
  { name: "Sidebar", desc: "Persistent side placement, always visible", image: "/lovable-uploads/sideBarDemo1.png" },
  { name: "Rich Media", desc: "Full-screen 1920×1080 animated takeover", image: "/lovable-uploads/richMediaDemo1.png" },
  { name: "Video", desc: "Pre/mid-roll video via OBS browser source", image: "/lovable-uploads/videoDemo1.png" },
  { name: "Poll", desc: "Interactive chat polls with live results", image: "/lovable-uploads/pollDemo1.png" },
  { name: "Interactive", desc: "Clickable elements with click tracking", image: "/lovable-uploads/interactiveDemo1.png" },
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

      {/* ── Ad format carousel — full bleed, outside max-w container ── */}
      <div className={`transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <AdFormatCarousel />
      </div>
    </section>
  );
};
