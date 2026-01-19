import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Client logos for the carousel (dark theme only)
const logos = [
  { src: "/lovable-uploads/4d784a07-41cb-46c9-9bfc-b33f83db6f0c.png", alt: "Samsung" },
  { src: "/lovable-uploads/e18a5eac-737e-480f-8556-08251ac73021.png", alt: "Surfshark" },
  { src: "/lovable-uploads/2c535017-d05f-4886-9c58-9ca401e9b44f.png", alt: "Komplett" },
  { src: "/lovable-uploads/958b1a7f-a00c-46bc-acdb-bbefda64b9da.png", alt: "Shure" },
  { src: "/lovable-uploads/a716bb91-525c-4779-a530-ceb1daad954f.png", alt: "Foodora" },
  { src: "/lovable-uploads/wal-logo.png", alt: "WAL", isLarge: true },
  { src: "/lovable-uploads/770b37b2-e4fc-4e77-86f5-7fc95755ab72.png", alt: "Logitech G" },
  { src: "/lovable-uploads/9fee36e6-a901-40bb-961b-b20b878b80de.png", alt: "SteelSeries" },
  // TODO: Add Norstat and Shark Gaming logos when uploaded
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
