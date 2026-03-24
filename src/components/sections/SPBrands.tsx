import React, { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTheme } from "next-themes";

/* ── Two rows of logos, scrolling in opposite directions (ColdIQ-style) ── */

const row1 = [
  { src: "/lovable-uploads/logo-client-1.png", alt: "Samsung" },
  { src: "/lovable-uploads/wpp-media-logo.png", alt: "WPP Media" },
  { src: "/lovable-uploads/logo-foodora.png", alt: "Foodora" },
  { src: "/lovable-uploads/logo-shure.png", alt: "Shure" },
  { src: "/lovable-uploads/logo-client-2.png", alt: "Saily" },
  { src: "/lovable-uploads/logo-glorious.png", alt: "Glorious" },
  { src: "/lovable-uploads/logo-client-8.png", alt: "Publicis" },
];

const row2 = [
  { src: "/lovable-uploads/logo-logitech.png", alt: "Logitech" },
  { src: "/lovable-uploads/logo-client-10.png", alt: "Komplett" },
  { src: "/lovable-uploads/logo-dentsu.png", alt: "Dentsu" },
  { src: "/lovable-uploads/logo-carat.png", alt: "Carat" },
  { src: "/lovable-uploads/logo-steelseries.png", alt: "SteelSeries" },
  { src: "/lovable-uploads/logo-surfshark.png", alt: "Surfshark" },
  { src: "/lovable-uploads/wal-logo.png", alt: "WAL" },
];

const MarqueeRow: React.FC<{
  logos: { src: string; alt: string }[];
  reverse?: boolean;
  logoFilter: string;
}> = ({ logos, reverse = false, logoFilter }) => {
  // Triple the logos for a seamless infinite loop
  const tripled = [...logos, ...logos, ...logos];

  return (
    <div className="group relative overflow-hidden py-5">
      <div
        className={`flex items-center gap-16 w-max ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } group-hover:[animation-play-state:paused]`}
      >
        {tripled.map((logo, i) => (
          <div
            key={`${logo.alt}-${i}`}
            className="flex-shrink-0 flex items-center justify-center h-8 w-28"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              decoding="async"
              className="max-h-7 max-w-[100px] w-auto h-auto object-contain
                opacity-35 hover:opacity-80 transition-all duration-300 hover:scale-110"
              style={{ filter: logoFilter }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const SPBrands: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const logoFilter = isDark ? "brightness(0) invert(1)" : "brightness(0)";

  return (
    <section
      ref={ref}
      className="py-8 md:py-12 overflow-hidden"
      aria-label="Trusted brands"
    >
      <div
        className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <p className="text-center text-xs font-medium text-muted-foreground mb-4 tracking-widest uppercase">
          Trusted by 50+ brands & agencies
        </p>

        {/* Fade edges */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Row 1 — scrolls left */}
          <MarqueeRow logos={row1} logoFilter={logoFilter} />

          {/* Row 2 — scrolls right */}
          <MarqueeRow logos={row2} reverse logoFilter={logoFilter} />
        </div>
      </div>
    </section>
  );
};
