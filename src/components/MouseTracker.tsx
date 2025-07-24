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
      className="fixed pointer-events-none z-[1] transition-all duration-500 ease-out opacity-40"
      style={{
        left: mousePosition.x - 250,
        top: mousePosition.y - 250,
        width: 500,
        height: 500,
        background: `radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, rgba(220, 38, 38, 0.08) 40%, rgba(220, 38, 38, 0.03) 70%, transparent 100%)`,
        borderRadius: "50%",
        filter: "blur(60px)",
        transform: "translate3d(0, 0, 0)", // Hardware acceleration
      }}
    />
  );
};