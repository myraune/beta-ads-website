import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Client logos for the carousel
const logos: Array<{ src: string; alt: string; className?: string; isLarge?: boolean }> = [
  { src: "/lovable-uploads/samsung-logo.webp", alt: "Samsung", isLarge: true },
  { src: "/lovable-uploads/wpp-logo.webp", alt: "WPP", isLarge: true },
  { src: "/lovable-uploads/surfshark-logo.png", alt: "Surfshark" },
  { src: "/lovable-uploads/saily-logo.png", alt: "Saily" },
  { src: "/lovable-uploads/komplett-logo.webp", alt: "Komplett" },
  { src: "/lovable-uploads/shure-logo.webp", alt: "Shure" },
  { src: "/lovable-uploads/foodora-logo.png", alt: "Foodora" },
  { src: "/lovable-uploads/logitech-logo.png", alt: "Logitech" },
  { src: "/lovable-uploads/glorious-logo.png", alt: "Glorious" },
  { src: "/lovable-uploads/panel-logo.png", alt: "Panel" },
];

interface LogoItemProps {
  src: string;
  alt: string;
  className?: string;
  isLarge?: boolean;
}

const LogoItem: React.FC<LogoItemProps> = ({ src, alt, className = "", isLarge }) => (
  <div className={`flex-shrink-0 flex items-center justify-center ${isLarge ? 'h-16 w-44' : 'h-12 w-32'}`}>
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`${isLarge ? 'h-16' : 'h-10'} w-auto opacity-60 object-contain transition-all duration-300 hover:scale-110 hover:opacity-90 ${className}`}
    />
  </div>
);

interface LogoType {
  src: string;
  alt: string;
  className?: string;
  isLarge?: boolean;
}

const LogoSet: React.FC<{ logos: LogoType[]; keyPrefix?: string }> = ({ logos, keyPrefix = "" }) => (
  <div className="flex items-center gap-20 px-10 shrink-0">
    {logos.map((logo) => (
      <LogoItem key={`${keyPrefix}${logo.alt}`} {...logo} />
    ))}
  </div>
);

export const TrustedBy: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

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
              <LogoSet logos={logos} />
              <LogoSet logos={logos} keyPrefix="dup-" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
