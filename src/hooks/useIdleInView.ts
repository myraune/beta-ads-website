import { useEffect, useRef, useState } from "react";

/**
 * True once the element has been near the viewport AND the page has gone idle.
 *
 * useScrollAnimation was not the right tool for gating the footer's three.js
 * wave. It reports visible immediately when the element is already on screen at
 * mount, and a 600px rootMargin covers the whole footer on a short page, so
 * /case-study/samsung and /nordic-livestream-advertising still pulled 477 kB of
 * three.js during first paint. It was the LCP resource on both.
 *
 * This waits for the load event and then an idle callback before it even starts
 * observing, so a decorative chunk can never compete with the critical path no
 * matter how short the page is.
 *
 * It also stays false for viewers who prefer reduced motion. The wave is a
 * continuous rAF animation, and unlike CSS, WebGL is not covered by the OS
 * setting. Skipping it is both the correct behaviour and 477 kB saved.
 */
export const useIdleInView = <T extends HTMLElement = HTMLDivElement>(
  rootMargin = "200px",
) => {
  const ref = useRef<T>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let observer: IntersectionObserver | undefined;
    let idleHandle: number | undefined;
    let cancelled = false;

    const startObserving = () => {
      if (cancelled) return;
      const el = ref.current;
      if (!el) return;
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setReady(true);
            observer?.disconnect();
          }
        },
        { rootMargin },
      );
      observer.observe(el);
    };

    const whenIdle = () => {
      if (cancelled) return;
      const ric = (window as unknown as {
        requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      }).requestIdleCallback;
      // Safari has no requestIdleCallback; a timeout is close enough for a
      // decoration that nobody is waiting on.
      idleHandle = ric
        ? ric(startObserving, { timeout: 3000 })
        : window.setTimeout(startObserving, 1200);
    };

    if (document.readyState === "complete") whenIdle();
    else window.addEventListener("load", whenIdle, { once: true });

    return () => {
      cancelled = true;
      observer?.disconnect();
      window.removeEventListener("load", whenIdle);
      if (idleHandle !== undefined) window.clearTimeout(idleHandle);
    };
  }, [rootMargin]);

  return { ref, ready };
};
