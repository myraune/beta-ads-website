import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Component as AILoader } from "@/components/ui/ai-loader";

/**
 * RouteTransition — shows the Beta orb loader on every in-app navigation.
 *
 * Implementation notes:
 *  - Outer component tracks whether ANY navigation has happened (it
 *    increments a `navId` counter on every pathname change except the
 *    first). `navId` is used as the React `key` of the inner <NavOverlay>
 *    so each navigation mounts a FRESH overlay instance. This sidesteps
 *    StrictMode effect-doubling, stale-timer, and state-reset concerns
 *    because each transition has its own dedicated component lifecycle.
 *  - The overlay owns its own lifecycle: show immediately, fade-out after
 *    ~400ms, unmount after ~580ms.
 *  - ALWAYS `pointer-events-none` on the overlay so clicks never get
 *    trapped during the visible window.
 *  - The `route-transition-overlay` class is exempt from the global
 *    prefers-reduced-motion rule in src/index.css so the fade is actually
 *    animated (otherwise it'd snap to opacity 0 in ~1ms on macOS with
 *    Reduce Motion on).
 */
export function RouteTransition() {
  const { pathname } = useLocation();
  const firstPathRef = useRef<string>(pathname);
  const [navId, setNavId] = useState(0);

  useEffect(() => {
    // Skip initial mount — Suspense fallback handles the cold page load
    if (pathname === firstPathRef.current) return;
    setNavId((n) => n + 1);
  }, [pathname]);

  if (navId === 0) return null;
  return <NavOverlay key={navId} />;
}

function NavOverlay() {
  const [phase, setPhase] = useState<"showing" | "fading" | "done">("showing");

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setPhase("fading"), 400);
    const doneTimer = window.setTimeout(() => setPhase("done"), 580);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className="route-transition-overlay fixed inset-0 z-[100] flex items-center justify-center bg-background pointer-events-none"
      style={{
        opacity: phase === "showing" ? 1 : 0,
        transition: "opacity 180ms ease-out",
      }}
      aria-hidden="true"
    >
      <AILoader />
    </div>
  );
}

export default RouteTransition;
