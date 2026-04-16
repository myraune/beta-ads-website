import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { BetaLoader } from "@/components/ui/beta-loader";

/**
 * RouteTransition — shows the BetaLoader briefly when navigating between pages.
 *
 * Pattern:
 *  - Fires on pathname change (not hash/search)
 *  - Delays showing by 120ms to avoid flash on near-instant transitions
 *  - Holds for a minimum 400ms once shown, so the animation is perceivable
 *  - Fades out via CSS
 *
 * Does NOT fire on the initial page load (the Suspense fallback handles that).
 */
export const RouteTransition = () => {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const prevPathRef = useRef<string | null>(null);
  const showAtRef = useRef<number>(0);

  useEffect(() => {
    const prev = prevPathRef.current;
    prevPathRef.current = pathname;

    // Don't fire on initial mount
    if (prev === null) return;
    if (prev === pathname) return;

    let delayTimer: number | undefined;
    let hideTimer: number | undefined;

    // Only show if navigation takes longer than 120ms (avoids flash on cached routes)
    delayTimer = window.setTimeout(() => {
      showAtRef.current = performance.now();
      setShow(true);

      // Min visible time 400ms
      hideTimer = window.setTimeout(() => {
        setShow(false);
      }, 400);
    }, 120);

    return () => {
      if (delayTimer) window.clearTimeout(delayTimer);
      if (hideTimer) window.clearTimeout(hideTimer);
    };
  }, [pathname]);

  if (!show) return null;
  return <BetaLoader fullscreen />;
};

export default RouteTransition;
