import React from "react";

/**
 * Floating decorative shapes — scattered across the page for visual depth.
 * All pointer-events: none, purely aesthetic.
 */

export const FloatingCross: React.FC<{
  className?: string;
  size?: number;
  color?: string;
}> = ({ className = "", size = 16, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    className={`pointer-events-none ${className}`}
    aria-hidden
  >
    <path d="M8 0v16M0 8h16" stroke={color} strokeWidth="1.5" />
  </svg>
);

export const FloatingDot: React.FC<{
  className?: string;
  size?: number;
  color?: string;
}> = ({ className = "", size = 6, color = "currentColor" }) => (
  <div
    className={`rounded-full pointer-events-none ${className}`}
    style={{ width: size, height: size, background: color }}
    aria-hidden
  />
);

export const FloatingRing: React.FC<{
  className?: string;
  size?: number;
  color?: string;
}> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={`pointer-events-none ${className}`}
    aria-hidden
  >
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" strokeDasharray="4 3" />
  </svg>
);

export const FloatingDiamond: React.FC<{
  className?: string;
  size?: number;
  color?: string;
}> = ({ className = "", size = 12, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 12 12"
    fill="none"
    className={`pointer-events-none ${className}`}
    aria-hidden
  >
    <rect x="6" y="0" width="8.49" height="8.49" rx="1" transform="rotate(45 6 0)" stroke={color} strokeWidth="1" />
  </svg>
);

/**
 * A cluster of decorative elements positioned absolutely.
 * Place inside a relative container.
 */
export const DecoCluster: React.FC<{
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center-left" | "center-right";
  variant?: "red" | "mint" | "muted";
}> = ({ position, variant = "muted" }) => {
  const color =
    variant === "red"
      ? "hsl(357 70% 60% / 0.15)"
      : variant === "mint"
        ? "hsl(170 50% 50% / 0.15)"
        : "hsl(220 10% 50% / 0.1)";

  const posClass = {
    "top-left": "top-12 left-8",
    "top-right": "top-12 right-12",
    "bottom-left": "bottom-16 left-12",
    "bottom-right": "bottom-12 right-8",
    "center-left": "top-1/2 -translate-y-1/2 left-4",
    "center-right": "top-1/2 -translate-y-1/2 right-6",
  }[position];

  return (
    <div className={`absolute ${posClass} hidden lg:block`} aria-hidden>
      <FloatingCross size={14} color={color} className="mb-3" />
      <FloatingDot size={5} color={color} className="ml-4 mb-2" />
      <FloatingRing size={20} color={color} />
    </div>
  );
};
