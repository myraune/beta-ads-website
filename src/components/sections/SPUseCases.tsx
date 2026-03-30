import React, { useRef, useState, useEffect } from "react";
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

/* ── Tilt card wrapper ── */
const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setStyle({ transform: `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`, transition: "transform 0.1s ease-out" });
  };
  const onLeave = () => setStyle({ transform: "perspective(600px) rotateY(0) rotateX(0) scale(1)", transition: "transform 0.4s ease-out" });
  return <div ref={ref} style={style} onMouseMove={onMove} onMouseLeave={onLeave} className={className}>{children}</div>;
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
    <section ref={ref} className="py-20 md:py-32" aria-label="Platforms and ad formats">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Header ── */}
        <div className={`text-center max-w-3xl mx-auto mb-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary mb-5">
            Platform Reach
          </span>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-4">
            39,445 streamers.<br />4 platforms. One dashboard.
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
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
        <div className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary mb-5">
            Ad Formats
          </span>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-4">
            6 formats. Zero adblock.
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Every format renders directly inside the stream — invisible to blockers, impossible to skip.
          </p>
        </div>

        {/* ── Ad format cards ── */}
        <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {adFormats.map((format) => (
            <TiltCard key={format.name}>
              <div className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src={format.image}
                    alt={`${format.name} ad format demo`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-foreground">{format.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{format.desc}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};
