import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const brandLogos = [
  { src: "/lovable-uploads/logo-surfshark.png", alt: "Surfshark" },
  { src: "/lovable-uploads/logo-logitech.png", alt: "Logitech" },
  { src: "/lovable-uploads/logo-foodora.png", alt: "Foodora" },
  { src: "/lovable-uploads/logo-shure.png", alt: "Shure" },
  { src: "/lovable-uploads/logo-glorious.png", alt: "Glorious" },
];

export const StreamerBrands: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className={`py-12 lg:py-16 transition-all duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <p className="text-muted-foreground text-sm mb-8 uppercase tracking-wider">
          Brands on the platform
        </p>
        <div className="flex flex-wrap items-center gap-10 lg:gap-16">
          {brandLogos.map((logo) => (
            <img 
              key={logo.alt}
              src={logo.src} 
              alt={logo.alt} 
              className="h-7 lg:h-9 w-auto opacity-40 hover:opacity-70 transition-opacity duration-200" 
            />
          ))}
        </div>
      </div>
    </section>
  );
};
