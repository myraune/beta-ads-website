import React, { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTheme } from "next-themes";

// Client logos for the carousel with individual scale adjustments
const logos: Array<{ src: string; alt: string; scale?: string }> = [
  { src: "/lovable-uploads/logo-client-1.png", alt: "Samsung", scale: "scale-100" },
  { src: "/lovable-uploads/logo-saily.png", alt: "Saily", scale: "scale-90" },
  { src: "/lovable-uploads/logo-foodora.png", alt: "Foodora", scale: "scale-100" },
  { src: "/lovable-uploads/logo-shure.png", alt: "Shure", scale: "scale-100" },
  { src: "/lovable-uploads/logo-client-5.png", alt: "Client 5", scale: "scale-75" },
  { src: "/lovable-uploads/logo-client-6.png", alt: "Client 6", scale: "scale-90" },
  { src: "/lovable-uploads/logo-glorious.png", alt: "Glorious", scale: "scale-100" },
  { src: "/lovable-uploads/logo-client-8.png", alt: "Publicis", scale: "scale-75" },
  { src: "/lovable-uploads/logo-logitech.png", alt: "Logitech", scale: "scale-100" },
  { src: "/lovable-uploads/logo-komplett.png", alt: "Komplett", scale: "scale-90" },
  { src: "/lovable-uploads/logo-dentsu.png", alt: "Dentsu", scale: "scale-75" },
  { src: "/lovable-uploads/logo-carat.png", alt: "Carat", scale: "scale-80" }, // SEO fix: corrected mislabeled alt text (was "Firi", matches SPBrands.tsx)
  { src: "/lovable-uploads/logo-steelseries.png", alt: "SteelSeries", scale: "scale-110" },
  { src: "/lovable-uploads/logo-surfshark.png", alt: "Surfshark", scale: "scale-100" },
];

interface LogoItemProps {
  src: string;
  alt: string;
  scale?: string;
  isLightTheme: boolean;
}

const LogoItem: React.FC<LogoItemProps> = ({ src, alt, scale = "scale-100", isLightTheme }) => {
  return (
    <div className="flex-shrink-0 flex items-center justify-center h-14 w-40">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`max-h-12 max-w-36 w-auto h-auto object-contain transition-all duration-300 ${scale} ${
          isLightTheme
            ? "brightness-0 opacity-60 hover:opacity-80"
            : "brightness-0 invert opacity-60 hover:opacity-90"
        }`}
      />
    </div>
  );
};

interface LogoType {
  src: string;
  alt: string;
  scale?: string;
}

const LogoSet: React.FC<{ logos: LogoType[]; keyPrefix?: string; isLightTheme: boolean; ariaHidden?: boolean }> = ({ logos, keyPrefix = "", isLightTheme, ariaHidden }) => (
  <div className="flex items-center gap-16 px-8 shrink-0" aria-hidden={ariaHidden}>
    {logos.map((logo) => (
      <LogoItem key={`${keyPrefix}${logo.alt}`} {...logo} isLightTheme={isLightTheme} />
    ))}
  </div>
);

export const TrustedBy: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isLightTheme = !mounted || resolvedTheme !== "dark";

  // Don't render section if no logos
  if (logos.length === 0) {
    return null;
  }

  return (
    <section id="trusted-by" className="py-8 overflow-hidden relative">
      <div ref={ref} className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative">
          <div
            className="flex overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
            }}
          >
            <div 
              className="flex animate-scroll-smooth"
              style={{ width: 'max-content' }}
            >
              <LogoSet logos={logos} isLightTheme={isLightTheme} />
              {/* Duplicate set for seamless infinite scroll — hidden from screen readers */}
              <LogoSet logos={logos} keyPrefix="dup-" isLightTheme={isLightTheme} ariaHidden={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
