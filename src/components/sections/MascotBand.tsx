import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * One reusable band for every Beta-the-mascot placement outside the homepage.
 *
 * Before this existed each page hand-rolled its own panel, which is how the
 * treatment drifted: some floated a cut-out on a red glow, one used a full
 * bleed scene, and the two that were added last got neither. Everything now
 * goes through here so the mascot reads as the same character in the same
 * house style wherever it turns up.
 *
 * Two variants, because the two kinds of art want opposite treatment:
 *  - "scene"  the 1200x685 renders where Beta is *in* a room. These carry
 *             their own lighting and framing, so they fill the panel edge to
 *             edge and get a vignette rather than a glow.
 *  - "cutout" the transparent PNGs. No background of their own, so they float
 *             bottom-anchored on a dark panel with the signal-red radial glow.
 */

type Variant = "scene" | "cutout";

interface MascotBandProps {
  /** Path under /lovable-uploads. */
  src: string;
  alt: string;
  variant?: Variant;
  eyebrow?: string;
  heading: string;
  body: string;
  /** Optional short list under the body. Plain text, no icons. */
  points?: string[];
  cta?: { label: string; to: string };
  /** Put the art on the right instead of the left. */
  flip?: boolean;
  /** Drop the section chrome when the parent already provides padding. */
  bare?: boolean;
}

export const MascotBand: React.FC<MascotBandProps> = ({
  src,
  alt,
  variant = "scene",
  eyebrow,
  heading,
  body,
  points,
  cta,
  flip = false,
  bare = false,
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  const art = (
    <div
      className={`relative min-h-[300px] lg:min-h-[380px] overflow-hidden bg-[#0c0c0f] ${
        flip ? "order-1 lg:order-2" : "order-1"
      }`}
    >
      {variant === "cutout" ? (
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 40% 8%, rgba(233,79,55,0.20), transparent 62%)",
            }}
          />
          <img
            src={src}
            alt={alt}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[92%] w-auto object-contain drop-shadow-2xl"
            loading="lazy"
          />
        </>
      ) : (
        <>
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="lazy"
          />
          {/* Keeps the panel edge from competing with the copy beside it. */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        </>
      )}
    </div>
  );

  const copy = (
    <div
      className={`p-8 md:p-12 flex flex-col justify-center ${
        flip ? "order-2 lg:order-1" : "order-2"
      }`}
    >
      {eyebrow && (
        <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-4">
        {heading}
      </h2>
      <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">{body}</p>

      {points && points.length > 0 && (
        <ul className="mt-6 space-y-2.5 max-w-md">
          {points.map((p) => (
            <li
              key={p}
              className="text-sm text-muted-foreground leading-relaxed pl-4 border-l border-border"
            >
              {p}
            </li>
          ))}
        </ul>
      )}

      {cta && (
        <Link
          to={cta.to}
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground mt-7 hover:text-primary transition-colors w-fit"
        >
          {cta.label}
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );

  const card = (
    <div
      ref={ref}
      className={`rounded-3xl border border-border overflow-hidden bg-card grid lg:grid-cols-2 items-stretch transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {art}
      {copy}
    </div>
  );

  if (bare) return card;

  return (
    <section className="py-20 md:py-28 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">{card}</div>
    </section>
  );
};

export default MascotBand;
