import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Cinematic full-screen transition when switching between
 * light pages (business) ↔ dark page (/streamers).
 *
 * Two diagonal panels slide across the screen while the Beta
 * logo briefly appears in the centre.
 */
export const ThemeTransition: React.FC = () => {
  const location = useLocation();
  const [phase, setPhase] = useState<"idle" | "cover" | "reveal">("idle");
  const [toDark, setToDark] = useState(false);
  const prevPath = useRef(location.pathname);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const wasStreamer = prevPath.current === "/streamers";
    const isStreamer = location.pathname === "/streamers";
    prevPath.current = location.pathname;

    // Only animate when crossing the theme boundary
    if (wasStreamer === isStreamer) return;

    setToDark(isStreamer);
    setPhase("cover");

    // Clear any existing timeouts
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];

    // After panels have covered the screen → reveal
    const t1 = setTimeout(() => setPhase("reveal"), 600);
    // After reveal animation completes → idle
    const t2 = setTimeout(() => setPhase("idle"), 1200);
    timeouts.current = [t1, t2];

    return () => timeouts.current.forEach(clearTimeout);
  }, [location.pathname]);

  if (phase === "idle") return null;

  const bg = toDark ? "#0e1115" : "#ffffff";
  const logoBrightness = toDark ? "invert(1)" : "none";

  return (
    <div className="fixed inset-0 z-[999] pointer-events-none" aria-hidden>
      {/* Panel 1 — slides from top-left */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: bg,
          transformOrigin: "top left",
          animation:
            phase === "cover"
              ? "tt-panel-in 0.5s cubic-bezier(0.7, 0, 0.3, 1) forwards"
              : "tt-panel-out 0.5s cubic-bezier(0.7, 0, 0.3, 1) forwards",
        }}
      />

      {/* Panel 2 — slightly delayed, creates depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: toDark
            ? "linear-gradient(135deg, #0e1115 0%, #1a1d23 100%)"
            : "linear-gradient(135deg, #f8f8f8 0%, #ffffff 100%)",
          transformOrigin: "bottom right",
          animation:
            phase === "cover"
              ? "tt-panel2-in 0.55s cubic-bezier(0.7, 0, 0.3, 1) forwards"
              : "tt-panel2-out 0.45s cubic-bezier(0.7, 0, 0.3, 1) forwards",
        }}
      />

      {/* Logo in centre */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation:
            phase === "cover"
              ? "tt-logo-in 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards"
              : "tt-logo-out 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        }}
      >
        <img
          src="/lovable-uploads/favicon.png"
          alt=""
          aria-hidden="true"
          style={{
            width: 48,
            height: 48,
            filter: logoBrightness,
            transition: "filter 0.3s",
          }}
        />
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes tt-panel-in {
          0%   { clip-path: inset(0 100% 100% 0); }
          100% { clip-path: inset(0 0 0 0); }
        }
        @keyframes tt-panel-out {
          0%   { clip-path: inset(0 0 0 0); }
          100% { clip-path: inset(100% 0 0 100%); }
        }
        @keyframes tt-panel2-in {
          0%   { clip-path: inset(100% 0 0 100%); }
          100% { clip-path: inset(0 0 0 0); }
        }
        @keyframes tt-panel2-out {
          0%   { clip-path: inset(0 0 0 0); }
          100% { clip-path: inset(0 100% 100% 0); }
        }
        @keyframes tt-logo-in {
          0%   { opacity: 0; transform: scale(0.6) rotate(-8deg); }
          50%  { opacity: 1; transform: scale(1.05) rotate(0deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes tt-logo-out {
          0%   { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
};
