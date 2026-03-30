import React, { useEffect, useRef, useState } from "react";

/**
 * Gaming crosshair reticle that floats near the cursor with a soft delay.
 * Offset from the actual pointer so it never overlaps it.
 * Hidden on touch devices.
 */
export const CursorGlow: React.FC = () => {
  const elRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if ("ontouchstart" in window) {
      setIsTouch(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      // Offset 18px to the top-right so it never sits on the pointer
      mouse.current = { x: e.clientX + 18, y: e.clientY - 18 };
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    let raf: number;
    const ease = 0.08; // very floaty

    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * ease;
      pos.current.y += (mouse.current.y - pos.current.y) * ease;

      if (elRef.current) {
        elRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, [visible]);

  if (isTouch) return null;

  return (
    <div
      ref={elRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
        willChange: "transform",
      }}
    >
      {/* Gaming crosshair reticle */}
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        {/* Outer ring */}
        <circle cx="9" cy="9" r="6.5" stroke="hsl(var(--primary))" strokeWidth="1.2" opacity="0.4" />
        {/* Centre dot */}
        <circle cx="9" cy="9" r="1.5" fill="hsl(var(--primary))" opacity="0.6" />
        {/* Crosshair lines — top, bottom, left, right with gap */}
        <line x1="9" y1="0.5" x2="9" y2="4.5" stroke="hsl(var(--primary))" strokeWidth="1.2" opacity="0.45" strokeLinecap="round" />
        <line x1="9" y1="13.5" x2="9" y2="17.5" stroke="hsl(var(--primary))" strokeWidth="1.2" opacity="0.45" strokeLinecap="round" />
        <line x1="0.5" y1="9" x2="4.5" y2="9" stroke="hsl(var(--primary))" strokeWidth="1.2" opacity="0.45" strokeLinecap="round" />
        <line x1="13.5" y1="9" x2="17.5" y2="9" stroke="hsl(var(--primary))" strokeWidth="1.2" opacity="0.45" strokeLinecap="round" />
      </svg>
    </div>
  );
};
