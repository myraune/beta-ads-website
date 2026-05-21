import React, { useRef, useState } from "react";

/* ── Reveal hook ── */

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ── Format data ── */

const formats = [
  {
    id: "video",
    name: "Video",
    dimensions: "640 × 360",
    description: "In-stream video that blends into the broadcast without interrupting the viewer.",
    image: "/lovable-uploads/videoDemo1.png",
    keyMetric: "94%",
    metricLabel: "view-through rate",
    highlight: false,
  },
  {
    id: "snipe",
    name: "Snipe Banner",
    dimensions: "1920 × 250",
    description: "Horizontal banner that appears at key stream moments - high visibility, low intrusion.",
    image: "/lovable-uploads/snipeDemo1.png",
    keyMetric: "3.8%",
    metricLabel: "click-through rate",
    highlight: false,
  },
  {
    id: "sidebar",
    name: "Side Bar",
    dimensions: "300 × 1080",
    description: "Always-visible vertical placement alongside the stream for sustained brand presence.",
    image: "/lovable-uploads/sideBarDemo1.png",
    keyMetric: "12 min",
    metricLabel: "avg screen time",
    highlight: false,
  },
  {
    id: "richmedia",
    name: "Rich Media",
    dimensions: "1920 × 1080",
    description: "Full-screen animated overlay for maximum brand impact. Our most-booked format.",
    image: "/lovable-uploads/richMediaDemo1.png",
    keyMetric: "500K+",
    metricLabel: "views per campaign",
    highlight: true,
  },
  {
    id: "poll",
    name: "Poll",
    dimensions: "Dynamic",
    description: "Interactive poll that drives real-time viewer participation and brand recall.",
    image: "/lovable-uploads/pollDemo1.png",
    keyMetric: "67%",
    metricLabel: "participation rate",
    highlight: false,
  },
  {
    id: "interactive",
    name: "Interactive",
    dimensions: "1920 × 1080",
    description: "Clickable overlays viewers engage with directly - tracked in real time.",
    image: "/lovable-uploads/interactiveDemo1.png",
    keyMetric: "5.2×",
    metricLabel: "vs display ads",
    highlight: false,
  },
];

/* ── Format Card ── */

const FormatCard: React.FC<{
  format: (typeof formats)[0];
  index: number;
  isVisible: boolean;
}> = ({ format, index, isVisible }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative flex flex-col rounded-2xl border bg-card overflow-hidden transition-all duration-300 ${
        format.highlight
          ? "border-primary/40 shadow-lg"
          : "border-border hover:border-primary/20 hover:shadow-sm"
      } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{
        transitionDelay: isVisible ? `${index * 70}ms` : "0ms",
        transitionProperty: "opacity, transform",
        transitionDuration: "600ms",
        transitionTimingFunction: "ease-out",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Preview image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={format.image}
          alt={`${format.name} ad format`}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            hovered ? "scale-[1.04]" : "scale-100"
          }`}
          loading="lazy"
        />
        {/* Dimension badge */}
        <div className="absolute bottom-2 right-2">
          <span className="text-[9px] font-mono bg-black/60 text-white px-2 py-0.5 rounded backdrop-blur-sm">
            {format.dimensions}
          </span>
        </div>
        {/* Most popular badge */}
        {format.highlight && (
          <div className="absolute top-3 left-3">
            <span className="text-[9px] font-semibold px-2.5 py-1 rounded-full bg-primary text-white uppercase tracking-wide">
              Most Popular
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-baseline justify-between mb-1.5">
          <h3 className="text-base font-semibold text-foreground">{format.name}</h3>
          <div className="text-right shrink-0 ml-3">
            <span className="text-sm font-bold text-primary tabular-nums">{format.keyMetric}</span>
            <span className="text-[10px] text-muted-foreground block leading-none mt-0.5">{format.metricLabel}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{format.description}</p>
      </div>
    </div>
  );
};

/* ===================================================
   AD FORMATS
   =================================================== */

export const SPAdFormats: React.FC = () => {
  const { ref, visible } = useReveal(0.1);

  return (
    <section ref={ref} className="py-20 md:py-28 border-t border-border" aria-label="Ad formats">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`max-w-2xl mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
            Ad Formats
          </span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
            Six formats. One platform.
          </h2>
          <p className="text-base font-light leading-relaxed text-muted-foreground">
            Every format renders natively inside the stream - no pre-rolls, no ad breaks, no adblock.
            Pick what fits your campaign and we handle everything else.
          </p>
        </div>

        {/* Format cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {formats.map((format, i) => (
            <FormatCard
              key={format.id}
              format={format}
              index={i}
              isVisible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
