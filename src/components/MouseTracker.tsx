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
      className="fixed pointer-events-none z-0 transition-opacity duration-300 opacity-30"
      style={{
        left: mousePosition.x - 200,
        top: mousePosition.y - 200,
        width: 400,
        height: 400,
        background: `radial-gradient(circle, rgba(220, 38, 38, 0.1) 0%, rgba(220, 38, 38, 0.05) 50%, transparent 70%)`,
        borderRadius: "50%",
        filter: "blur(50px)",
        transform: "translate3d(0, 0, 0)", // Hardware acceleration
      }}
    />
  );
};