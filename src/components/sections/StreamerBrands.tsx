import React, { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTheme } from "next-themes";

const brandLogos = [
  { src: "/lovable-uploads/logo-surfshark.png", alt: "Surfshark" },
  { src: "/lovable-uploads/logo-logitech.png", alt: "Logitech" },
  { src: "/lovable-uploads/logo-foodora.png", alt: "Foodora" },
  { src: "/lovable-uploads/logo-shure.png", alt: "Shure" },
  { src: "/lovable-uploads/logo-glorious.png", alt: "Glorious" },
  { src: "/lovable-uploads/logo-client-1.png", alt: "Samsung" },
  { src: "/lovable-uploads/logo-steelseries.png", alt: "SteelSeries" },
];

export const StreamerBrands: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const logoFilter = isDark ? "brightness(0) invert(1)" : "brightness(0)";

  const tripled = [...brandLogos, ...brandLogos, ...brandLogos];

  return (
    <section
      ref={ref}
      className="pt-12 pb-10 overflow-hidden border-t border-border"
      aria-label="Brands on platform"
    >
      <div
        className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <p className="text-center text-xs font-medium text-muted-foreground mb-6 tracking-widest uppercase">
          Brands looking for streamers right now
        </p>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="group flex items-center gap-14 animate-marquee group-hover:[animation-play-state:paused]">
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
                  className="max-h-6 max-w-[90px] w-auto h-auto object-contain opacity-40 hover:opacity-80 transition-all duration-300"
                  style={{ filter: logoFilter }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
