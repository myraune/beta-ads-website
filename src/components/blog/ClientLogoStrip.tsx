import React from "react";

/**
 * A clean band of REAL client logos - the "trusted by" proof strip, shared
 * across the rich editorial pages. Real marks only (no decorative graphics),
 * theme-aware (black on light, white on dark), muted so it reads as proof, not
 * decoration. Mirrors the homepage logo wall.
 */

const LOGOS: { src: string; alt: string }[] = [
  { src: "/lovable-uploads/logo-samsung.png", alt: "Samsung" },
  { src: "/lovable-uploads/logo-shure.png", alt: "Shure" },
  { src: "/lovable-uploads/logo-komplett.png", alt: "Komplett" },
  { src: "/lovable-uploads/logo-foodora.png", alt: "Foodora" },
  { src: "/lovable-uploads/logo-glorious.png", alt: "Glorious" },
  { src: "/lovable-uploads/logo-logitech.png", alt: "Logitech" },
  { src: "/lovable-uploads/logo-surfshark.png", alt: "Surfshark" },
  { src: "/lovable-uploads/logo-nki.svg", alt: "NKI" },
  { src: "/lovable-uploads/logo-dentsu.png", alt: "Dentsu" },
  { src: "/lovable-uploads/wpp-media-logo.png", alt: "WPP Media" },
];

export const ClientLogoStrip: React.FC<{ label?: string }> = ({
  label = "Native Nordic campaigns delivered for",
}) => (
  <section className="mt-20 lg:mt-28">
    <p className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground/70 text-center mb-8">
      {label}
    </p>
    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
      {LOGOS.map((l) => (
        <img
          key={l.alt}
          src={l.src}
          alt={l.alt}
          className="h-6 sm:h-7 w-auto max-w-[120px] object-contain opacity-60 hover:opacity-100 transition-opacity [filter:brightness(0)] dark:[filter:brightness(0)_invert(1)]"
        />
      ))}
    </div>
  </section>
);

export default ClientLogoStrip;
