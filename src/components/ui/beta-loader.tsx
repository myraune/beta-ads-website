import { cn } from "@/lib/utils";

interface BetaLoaderProps {
  /** Full-viewport overlay (used for Suspense fallback). Default: false (inline) */
  fullscreen?: boolean;
  className?: string;
}

const LETTERS = ["B", "E", "T", "A", "\u00A0", "A", "D", "S"];

/**
 * BetaLoader — animated "BETA ADS" wordmark with a rotating brand-colored
 * ring behind it. Each letter pulses in sequence. Used as the Suspense
 * fallback for lazy-loaded routes.
 *
 * Animations are defined in `src/index.css`:
 *  - `beta-loader-ring-spin`   → the ring
 *  - `beta-loader-letter-pulse` → individual letters
 */
export const BetaLoader = ({ fullscreen = false, className }: BetaLoaderProps) => {
  const inner = (
    <div
      className="beta-loader-wrapper"
      role="status"
      aria-label="Loading"
    >
      {LETTERS.map((char, i) => (
        <span
          key={i}
          className="beta-loader-letter"
          style={{ animationDelay: `${i * 0.1}s` }}
          aria-hidden="true"
        >
          {char}
        </span>
      ))}
      <div className="beta-loader-ring" aria-hidden="true" />
      <span className="sr-only">Loading</span>
    </div>
  );

  if (!fullscreen) {
    return <div className={cn("inline-flex", className)}>{inner}</div>;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center",
        "bg-background/80 backdrop-blur-sm",
        "pointer-events-none",
        className
      )}
    >
      {inner}
    </div>
  );
};

export default BetaLoader;
