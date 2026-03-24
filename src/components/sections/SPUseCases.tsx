import React, { useRef, useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/* ── Tilt card wrapper ── */
const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleLeave = () => {
    setStyle({ transform: "perspective(600px) rotateY(0) rotateX(0) scale(1)", transition: "transform 0.4s ease-out" });
  };

  return (
    <div ref={ref} style={style} onMouseMove={handleMove} onMouseLeave={handleLeave} className={className}>
      {children}
    </div>
  );
};

/* ── Count-up animation hook ── */
function useCountUp(target: string, isVisible: boolean) {
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (!isVisible) return;

    // Extract numeric part and suffix (e.g. "28,000+" -> 28000, "+")
    const cleaned = target.replace(/,/g, "");
    const numMatch = cleaned.match(/^([\d.]+)/);
    if (!numMatch) return;

    const numericTarget = parseFloat(numMatch[1]);
    const suffix = cleaned.replace(/^[\d.]+/, ""); // e.g. "+"
    const hasCommas = target.includes(",");
    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(numericTarget * eased);

      const formatted = hasCommas ? current.toLocaleString() : current.toString();
      setDisplay(formatted + suffix);

      if (progress < 1) requestAnimationFrame(tick);
    };

    // Start from 0
    setDisplay("0" + suffix);
    requestAnimationFrame(tick);
  }, [isVisible, target]);

  return display;
}

/* ── Brand colors for platform top borders ── */
const brandColors: Record<string, string> = {
  Twitch: "#9146FF",
  YouTube: "#FF0000",
  Kick: "#53FC18",
  Trovo: "#19D66B",
};

const platforms = [
  { name: "Twitch", logo: "/lovable-uploads/platform-twitch.png", streamers: "28,000+" },
  { name: "YouTube", logo: "/lovable-uploads/platform-youtube.png", streamers: "8,200+" },
  { name: "Kick", logo: "/lovable-uploads/platform-kick.svg", streamers: "2,800+" },
  { name: "Trovo", logo: "/lovable-uploads/platform-trovo.png", streamers: "445+" },
];

const adFormats = [
  { name: "Snipe Ad", desc: "Animated banner overlay at key stream moments", image: "/lovable-uploads/snipeDemo1.png" },
  { name: "Sidebar", desc: "Persistent side placement, always visible", image: "/lovable-uploads/sideBarDemo1.png" },
  { name: "Rich Media", desc: "Full-screen 1920x1080 animated takeover", image: "/lovable-uploads/richMediaDemo1.png" },
  { name: "Video", desc: "Pre/mid-roll video via OBS browser source", image: "/lovable-uploads/videoDemo1.png" },
  { name: "Poll", desc: "Interactive chat polls with live results", image: "/lovable-uploads/pollDemo1.png" },
  { name: "Interactive", desc: "Clickable elements with click tracking", image: "/lovable-uploads/interactiveDemo1.png" },
];

/* ── Platform Card with brand border + count-up ── */
const PlatformCard: React.FC<{
  platform: (typeof platforms)[0];
  isVisible: boolean;
  index: number;
}> = ({ platform, isVisible, index }) => {
  const animatedCount = useCountUp(platform.streamers, isVisible);
  const color = brandColors[platform.name] || "#888";

  return (
    <div
      className="relative rounded-2xl border border-border bg-card p-6 flex flex-col items-center gap-3 hover:shadow-md transition-all duration-500 overflow-hidden"
      style={{
        transitionDelay: `${index * 80}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
      }}
    >
      {/* Colored top border */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: `linear-gradient(90deg, ${color}80, ${color}, ${color}80)` }}
      />
      <img src={platform.logo} alt={platform.name} className="h-8 w-auto object-contain dark:invert" />
      <div className="text-center">
        <p className="text-sm font-semibold text-foreground">{platform.name}</p>
        <p className="text-xs text-muted-foreground tabular-nums">
          <span className="font-semibold text-foreground">{animatedCount}</span> streamers
        </p>
      </div>
    </div>
  );
};

export const SPUseCases: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 md:py-32" aria-label="Platforms and ad formats">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary mb-4">
            Platform Reach
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            39,445 streamers. 4 platforms. One dashboard.
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Every streamer is brand-safe scored, engagement-rated, and ready to go live with your campaign. Launch native overlay ads across Twitch, YouTube, Kick, and Trovo from a single dashboard.
          </p>
        </div>

        {/* Platforms row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {platforms.map((p, i) => (
            <PlatformCard key={p.name} platform={p} isVisible={isVisible} index={i} />
          ))}
        </div>

        {/* Ad Formats */}
        <div className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary mb-4">
            Ad Formats
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            6 native ad formats. Zero adblock.
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            From quick snipe banners to interactive polls — every format is rendered directly on the stream, making them impossible to block.
          </p>
        </div>

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
                  <p className="text-xs text-muted-foreground">{format.desc}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};
