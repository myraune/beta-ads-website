import React, { useEffect, useState } from "react";

export const MouseTracker: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-[1] transition-all duration-300 ease-out opacity-60"
      style={{
        left: mousePosition.x - 300,
        top: mousePosition.y - 300,
        width: 600,
        height: 600,
        background: `radial-gradient(circle, rgba(220, 38, 38, 0.25) 0%, rgba(220, 38, 38, 0.15) 30%, rgba(220, 38, 38, 0.08) 60%, transparent 100%)`,
        borderRadius: "50%",
        filter: "blur(80px)",
        transform: "translate3d(0, 0, 0)",
        mixBlendMode: "multiply",
      }}
    />
  );
};