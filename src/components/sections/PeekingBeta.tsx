import React from "react";

/**
 * Beta turning up where he is not strictly needed: standing on top of a banner,
 * peeking over the edge of a card, leaning on the side of one.
 *
 * These are jokes, not content, so they are `aria-hidden` and
 * `pointer-events-none` throughout. A screen reader gets nothing and a mouse
 * passes straight through to whatever is underneath.
 *
 * ── How to host one ──────────────────────────────────────────────────────
 * The host element needs `relative`, and for "stand" and "peek" it must NOT
 * have `overflow-hidden`, or the mascot gets clipped at the edge he is meant
 * to be standing on. "peek" additionally needs the host to paint an opaque
 * background (bg-card, bg-background) so the mascot's lower half is actually
 * hidden behind it rather than showing through.
 *
 * Everything is hidden below `md`. On a phone the banners go full width and a
 * figure standing on the corner either collides with the heading or forces the
 * section padding open, and neither is worth it for a gag.
 */

type Pose = "wave" | "thumbsup" | "pointing" | "shrug" | "cool";

type Placement =
  /** Feet planted on the host's top edge, standing on it like a ledge. */
  | "stand"
  /** Head and shoulders over the host's top edge, the rest behind it. */
  | "peek"
  /** Leaning in from the host's side, mostly off-frame. */
  | "lean";

interface PeekingBetaProps {
  pose?: Pose;
  placement?: Placement;
  /** Which side to sit on. Ignored by "lean", which always uses `side` as its edge. */
  side?: "left" | "right";
  /** Distance from that side, as a Tailwind spacing step. */
  inset?: 8 | 12 | 16 | 20 | 24 | 32;
  /** Height in Tailwind steps. 24 = 6rem, 28 = 7rem, 32 = 8rem. */
  size?: 20 | 24 | 28 | 32;
  /** Mirror him so he faces into the layout rather than off the edge. */
  mirror?: boolean;
  /**
   * Put a soft signal-red glow behind him. Needed on dark hosts: he is charcoal
   * on near-black there, and a black drop shadow does nothing, so without this
   * he goes murky. Same glow the dedicated mascot panels use.
   */
  glow?: boolean;
  className?: string;
}

const ALT: Record<Pose, string> = {
  wave: "Beta the mascot waving",
  thumbsup: "Beta the mascot giving a thumbs up",
  pointing: "Beta the mascot pointing",
  shrug: "Beta the mascot shrugging",
  cool: "Beta the mascot with his arms crossed",
};

const SIZE: Record<NonNullable<PeekingBetaProps["size"]>, string> = {
  20: "h-20",
  24: "h-24",
  28: "h-28",
  32: "h-32",
};

const INSET: Record<NonNullable<PeekingBetaProps["inset"]>, { left: string; right: string }> = {
  8: { left: "left-8", right: "right-8" },
  12: { left: "left-12", right: "right-12" },
  16: { left: "left-16", right: "right-16" },
  20: { left: "left-20", right: "right-20" },
  24: { left: "left-24", right: "right-24" },
  32: { left: "left-32", right: "right-32" },
};

export const PeekingBeta: React.FC<PeekingBetaProps> = ({
  pose = "wave",
  placement = "stand",
  side = "right",
  inset = 16,
  size = 24,
  mirror = false,
  glow = false,
  className = "",
}) => {
  // stand: bottom sits exactly on the host's top border.
  // peek:  same anchor, pushed back down so the host covers his lower half.
  // lean:  anchored to the host's bottom edge, hanging off the side.
  const position =
    placement === "stand"
      ? "bottom-full"
      : placement === "peek"
        ? "bottom-full translate-y-[55%] -z-10"
        : "bottom-0";

  const horizontal =
    placement === "lean"
      ? side === "right"
        ? "right-0 translate-x-1/3"
        : "left-0 -translate-x-1/3"
      : INSET[inset][side];

  const wrapper = `hidden md:block absolute ${position} ${horizontal} ${SIZE[size]} w-auto
        pointer-events-none select-none ${className}`;

  return (
    <span className={wrapper} aria-hidden="true">
      {glow && (
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220%] h-[180%] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(233,79,55,0.28), transparent 72%)" }}
        />
      )}
      <img
        src={`/lovable-uploads/beta-mascot-cut-${pose}.webp`}
        alt={ALT[pose]}
        loading="lazy"
        draggable={false}
        className={`relative h-full w-auto object-contain ${mirror ? "-scale-x-100" : ""}`}
        style={{ filter: "drop-shadow(0 10px 14px rgba(0,0,0,0.20))" }}
      />
    </span>
  );
};

export default PeekingBeta;
