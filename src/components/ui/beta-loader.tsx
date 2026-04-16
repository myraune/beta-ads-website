import { cn } from "@/lib/utils";

interface BetaLoaderProps {
  /** Full-viewport overlay (used for route transitions). Default: false (inline) */
  fullscreen?: boolean;
  /** Size in pixels of the ring + logo. Default: 96 */
  size?: number;
  className?: string;
}

/**
 * BetaLoader — brand-colored spinning ring with the Beta Ads mark centered.
 * Used as Suspense fallback for lazy-loaded routes and during page transitions.
 *
 * Uses keyframes `beta-loader-rotate` defined in `src/index.css`.
 */
export const BetaLoader = ({
  fullscreen = false,
  size = 96,
  className,
}: BetaLoaderProps) => {
  const ringSize = size;
  const logoSize = Math.round(size * 0.42);

  const inner = (
    <div
      className="relative flex items-center justify-center"
      style={{ width: ringSize, height: ringSize }}
      role="status"
      aria-label="Loading"
    >
      {/* Spinning ring */}
      <div
        className="absolute inset-0 rounded-full beta-loader-ring"
        style={{ width: ringSize, height: ringSize }}
      />
      {/* Static logo in the center */}
      <img
        src="/lovable-uploads/favicon.png"
        alt=""
        aria-hidden="true"
        className="relative z-10 select-none"
        style={{ width: logoSize, height: logoSize }}
        draggable={false}
      />
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
        "animate-in fade-in duration-200",
        className
      )}
    >
      {inner}
    </div>
  );
};

export default BetaLoader;
