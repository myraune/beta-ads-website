import { cn } from "@/lib/utils";

interface BetaLoaderProps {
  /** Full-viewport overlay (used for Suspense fallback). Default: false (inline) */
  fullscreen?: boolean;
  /** Override the word that animates letter-by-letter. Default: "Generating" */
  text?: string;
  className?: string;
}

/**
 * BetaLoader — faithful port of the 21st.dev `ai-loader` by @theutkarshmail:
 *   https://21st.dev/community/components/theutkarshmail/ai-loader/default
 *
 * The author published only the keyframes (loader-rotate, loader-letter-anim)
 * and the HTML structure — the class styles (.loader-wrapper, .loader-letter,
 * .loader) were missing from the published CSS. Those classes are defined
 * locally in `src/index.css` so the component actually renders.
 *
 * Original palette preserved: purple (#ad5fff) → indigo (#471eec) → magenta
 * (#d60a47) → deep-purple (#311e80). Do not re-brand without explicit ask.
 */
export const BetaLoader = ({
  fullscreen = false,
  text = "Generating",
  className,
}: BetaLoaderProps) => {
  const letters = Array.from(text);

  const inner = (
    <div className="loader-wrapper" role="status" aria-label="Loading">
      {letters.map((char, i) => (
        <span key={i} className="loader-letter" aria-hidden="true">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
      <div className="loader" aria-hidden="true" />
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
