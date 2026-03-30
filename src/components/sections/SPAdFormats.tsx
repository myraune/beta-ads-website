import React, { useRef, useState } from "react";
import {
  Play,
  Zap,
  BarChart,
  Layers,
  MessageSquare,
  MousePointerClick,
  ArrowRight,
  Check,
} from "lucide-react";

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
    icon: Play,
    dimensions: "640 x 360",
    description: "In-stream video that blends into the broadcast.",
    image: "/lovable-uploads/videoDemo1.png",
    features: [
      "Unskippable & non-intrusive",
      "94% view-through rate",
      "Story-driven campaigns",
    ],
    highlight: false,
  },
  {
    id: "snipe",
    name: "Snipe Banner",
    icon: Zap,
    dimensions: "1920 x 250",
    description: "Horizontal banner overlay at key stream moments.",
    image: "/lovable-uploads/snipeDemo1.png",
    features: [
      "High visibility placement",
      "3.8% click-through rate",
      "Awareness & launches",
    ],
    highlight: false,
  },
  {
    id: "sidebar",
    name: "Side Bar",
    icon: BarChart,
    dimensions: "300 x 1080",
    description: "Always-visible vertical ad alongside the stream.",
    image: "/lovable-uploads/sideBarDemo1.png",
    features: [
      "12 min avg screen time",
      "Persistent brand presence",
      "Non-disruptive placement",
    ],
    highlight: false,
  },
  {
    id: "richmedia",
    name: "Rich Media",
    icon: Layers,
    dimensions: "1920 x 1080",
    description: "Full-screen takeover for premium brand moments.",
    image: "/lovable-uploads/richMediaDemo1.png",
    features: [
      "500K+ completed views per campaign",
      "Animated overlays (webm/mp4)",
      "Maximum brand impact",
    ],
    highlight: true,
  },
  {
    id: "poll",
    name: "Poll",
    icon: MessageSquare,
    dimensions: "Dynamic",
    description: "Interactive poll that drives real-time viewer participation.",
    image: "/lovable-uploads/pollDemo1.png",
    features: [
      "67% participation rate",
      "Real-time chat integration",
      "Direct viewer engagement",
    ],
    highlight: false,
  },
  {
    id: "interactive",
    name: "Interactive",
    icon: MousePointerClick,
    dimensions: "1920 x 1080",
    description: "Clickable overlays viewers interact with directly.",
    image: "/lovable-uploads/interactiveDemo1.png",
    features: [
      "5.2x vs display ads",
      "Click tracking built-in",
      "Full-screen brand moments",
    ],
    highlight: false,
  },
];

/* ── Format Card ── */

const FormatCard: React.FC<{
  format: (typeof formats)[0];
  index: number;
  isVisible: boolean;
}> = ({ format, index, isVisible }) => {
  const Icon = format.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltStyle({
      transform: `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTiltStyle({
      transform: "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)",
      transition: "transform 0.4s ease-out",
    });
  };

  return (
    <div
      ref={cardRef}
      className={`relative flex flex-col rounded-2xl border bg-card overflow-hidden ${
        format.highlight
          ? "border-primary/40 shadow-lg ring-1 ring-primary/20"
          : "border-border hover:border-primary/20 hover:shadow-md"
      } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{
        ...tiltStyle,
        transitionDelay: isVisible ? `${index * 80}ms` : "0ms",
        transitionProperty: "opacity, translate",
        transitionDuration: "700ms",
        transitionTimingFunction: "ease-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Popular badge */}
      {format.highlight && (
        <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10">
          MOST POPULAR
        </div>
      )}

      {/* Preview image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={format.image}
          alt={`${format.name} format`}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            hovered ? "scale-105" : "scale-100"
          }`}
          loading="lazy"
        />
        {/* Gradient overlay on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "linear-gradient(to top, hsl(var(--primary)/0.15) 0%, transparent 60%)",
            opacity: hovered ? 1 : 0,
          }}
        />
        <div className="absolute bottom-2 right-2">
          <span className="text-[9px] font-mono bg-black/60 text-white px-2 py-0.5 rounded backdrop-blur-sm">
            {format.dimensions}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2.5 mb-2">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              format.highlight ? "bg-primary/15" : "bg-muted"
            }`}
          >
            <Icon
              className={`w-4 h-4 ${
                format.highlight ? "text-primary" : "text-muted-foreground"
              }`}
            />
          </div>
          <h3 className="text-lg font-bold text-foreground">{format.name}</h3>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {format.description}
        </p>

        {/* Feature checklist */}
        <ul className="space-y-2 mt-auto mb-5">
          {format.features.map((feat) => (
            <li key={feat} className="flex items-start gap-2 text-sm">
              <Check
                className={`w-4 h-4 shrink-0 mt-0.5 ${
                  format.highlight ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <span className="text-foreground/80">{feat}</span>
            </li>
          ))}
        </ul>

        {/* CTA button with slide-in arrow */}
        <button
          className={`group/btn w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 overflow-hidden ${
            format.highlight
              ? "bg-primary text-white hover:bg-primary/90"
              : "bg-muted/60 text-foreground hover:bg-muted"
          }`}
        >
          <span>Learn more</span>
          <span className="relative w-3.5 h-3.5 overflow-hidden">
            <ArrowRight className="w-3.5 h-3.5 absolute transition-[transform,box-shadow,border-color] duration-300 group-hover/btn:translate-x-5 group-hover/btn:opacity-0" />
            <ArrowRight className="w-3.5 h-3.5 absolute transition-[transform,box-shadow,border-color] duration-300 -translate-x-5 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100" />
          </span>
        </button>
      </div>
    </div>
  );
};

/* ===================================================
   AD FORMATS -- Pricing-style grid
   =================================================== */

export const SPAdFormats: React.FC = () => {
  const { ref, visible } = useReveal(0.1);

  return (
    <section ref={ref} className="py-20 md:py-28" aria-label="Ad formats">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary mb-4">
            Ad Formats
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pick the best format for
            <br />
            your campaign
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Choose a format. Pick your streamers. Launch in minutes.
            <br className="hidden md:block" />
            Every format bypasses adblock and renders inside the stream.
          </p>
        </div>

        {/* Steps indicator */}
        <div
          className={`flex items-center justify-center gap-3 mb-10 transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {["Pick a format", "Select streamers", "Go live"].map(
            (step, i) => (
              <React.Fragment key={step}>
                {i > 0 && (
                  <div className="w-8 h-px bg-border" />
                )}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    {step}
                  </span>
                </div>
              </React.Fragment>
            )
          )}
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
