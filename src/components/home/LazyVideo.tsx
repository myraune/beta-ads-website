import React, { useEffect, useRef, useState } from "react";

/** True when the visitor asked the OS for less motion. Read once on mount. */
export const useReducedMotion = () => {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    setReduce(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return reduce;
};

/**
 * Muted looping video that never downloads until it scrolls into view.
 * - poster is always set, so there is a finished frame before (or instead of) playback
 * - src is only attached when the element is at least 20% visible; it pauses when it leaves
 * - under prefers-reduced-motion the src is never attached: the poster stays,
 *   and a click starts (or pauses) the loop
 */
export const LazyVideo: React.FC<{
  src: string;
  poster?: string;
  className?: string;
  label: string;
}> = ({ src, poster, className, label }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const arm = () => {
      if (v.getAttribute("src") !== src) v.src = src;
      v.play().catch(() => {});
    };

    if (reduce) {
      v.pause();
      const onClick = () => (v.paused || !v.getAttribute("src") ? arm() : v.pause());
      v.style.cursor = "pointer";
      v.addEventListener("click", onClick);
      return () => v.removeEventListener("click", onClick);
    }

    if (!("IntersectionObserver" in window)) {
      arm();
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) arm();
          else if (v.getAttribute("src")) v.pause();
        }),
      { threshold: 0.2 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src, reduce]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    />
  );
};
