import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const lightLogos = [
  { src: "/lovable-uploads/711bde8c-3d71-40eb-8c93-2f8bf7350a57.png", alt: "Samsung", className: "mix-blend-multiply" },
  { src: "/lovable-uploads/08646782-d620-4f3a-bcd4-128419cc79d3.png", alt: "Surfshark" },
  { src: "/lovable-uploads/1e56f4d8-0545-4132-8d6f-8738cdb1ae4f.png", alt: "Komplett" },
  { src: "/lovable-uploads/5b2346c1-8226-4f68-9806-5b03cba8e17c.png", alt: "Shure" },
  { src: "/lovable-uploads/59160e7a-4d18-4413-9f1b-f681271f8dde.png", alt: "Foodora" },
  { src: "/lovable-uploads/wal-logo.png", alt: "WAL", className: "invert", isLarge: true },
  { src: "/lovable-uploads/cda69e31-7632-469a-b206-367ba4350480.png", alt: "Logitech G" },
  { src: "/lovable-uploads/1fc4788c-f973-403f-9b01-4f3b4fa2ba20.png", alt: "SteelSeries" },
];

const darkLogos = [
  { src: "/lovable-uploads/4d784a07-41cb-46c9-9bfc-b33f83db6f0c.png", alt: "Samsung" },
  { src: "/lovable-uploads/e18a5eac-737e-480f-8556-08251ac73021.png", alt: "Surfshark" },
  { src: "/lovable-uploads/2c535017-d05f-4886-9c58-9ca401e9b44f.png", alt: "Komplett" },
  { src: "/lovable-uploads/958b1a7f-a00c-46bc-acdb-bbefda64b9da.png", alt: "Shure" },
  { src: "/lovable-uploads/a716bb91-525c-4779-a530-ceb1daad954f.png", alt: "Foodora" },
  { src: "/lovable-uploads/wal-logo.png", alt: "WAL", isLarge: true },
  { src: "/lovable-uploads/770b37b2-e4fc-4e77-86f5-7fc95755ab72.png", alt: "Logitech G" },
  { src: "/lovable-uploads/9fee36e6-a901-40bb-961b-b20b878b80de.png", alt: "SteelSeries" },
];

interface LogoItemProps {
  src: string;
  alt: string;
  className?: string;
  isLarge?: boolean;
  isDark?: boolean;
}

const LogoItem: React.FC<LogoItemProps> = ({ src, alt, className = "", isLarge, isDark }) => (
  <div className={`flex-shrink-0 flex items-center justify-center ${isLarge ? (isDark ? 'h-16 w-44' : 'h-14 w-40') : (isDark ? 'h-12 w-32' : 'h-10 w-28')}`}>
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`${isLarge ? (isDark ? 'h-16' : 'max-h-14 max-w-40') : (isDark ? 'h-10' : 'max-h-10 max-w-28')} w-auto ${isDark ? 'opacity-60' : 'opacity-50'} object-contain transition-all duration-300 hover:scale-110 ${isDark ? 'hover:opacity-90' : 'hover:opacity-80'} ${className}`}
    />
  </div>
);

export const TrustedBy: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="trusted-by" className="py-8 overflow-hidden relative">
      <div ref={ref} className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Logo Carousel */}
        <div className="relative">
          <div
            className="flex overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
            }}
          >
            {/* Light theme carousel */}
            <div className="flex animate-scroll dark:hidden" style={{ willChange: 'transform' }}>
              <div className="flex items-center gap-24 px-12">
                {lightLogos.map((logo) => (
                  <LogoItem key={logo.alt} {...logo} isDark={false} />
                ))}
              </div>
              <div className="flex items-center gap-24 px-12">
                {lightLogos.map((logo) => (
                  <LogoItem key={`dup-${logo.alt}`} {...logo} isDark={false} />
                ))}
              </div>
            </div>

            {/* Dark theme carousel */}
            <div className="hidden dark:flex animate-scroll" style={{ willChange: 'transform' }}>
              <div className="flex items-center gap-16 px-8">
                {darkLogos.map((logo) => (
                  <LogoItem key={logo.alt} {...logo} isDark={true} />
                ))}
              </div>
              <div className="flex items-center gap-16 px-8">
                {darkLogos.map((logo) => (
                  <LogoItem key={`dup-${logo.alt}`} {...logo} isDark={true} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
