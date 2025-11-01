import React, { useEffect, useState } from "react";

export const MouseTracker: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    let trailId = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add trail particle
      setTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: trailId++ }];
        return newTrail.slice(-8); // Keep last 8 particles
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    // Fade out trail particles
    const trailInterval = setInterval(() => {
      setTrail(prev => prev.slice(1));
    }, 100);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(trailInterval);
    };
  }, []);

  return (
    <>
      {/* Main glow */}
      <div
        className="fixed pointer-events-none z-[1] transition-all duration-300 ease-out opacity-70"
        style={{
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
          width: 600,
          height: 600,
          background: `radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, rgba(220, 38, 38, 0.18) 30%, rgba(220, 38, 38, 0.1) 60%, transparent 100%)`,
          borderRadius: "50%",
          filter: "blur(80px)",
          transform: "translate3d(0, 0, 0)",
          mixBlendMode: "screen",
        }}
      />
      
      {/* Trail particles */}
      {trail.map((particle, index) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-[1]"
          style={{
            left: particle.x,
            top: particle.y,
            width: 4,
            height: 4,
            background: `rgba(220, 38, 38, ${(index + 1) / trail.length * 0.6})`,
            borderRadius: "50%",
            filter: "blur(2px)",
            transform: "translate(-50%, -50%)",
            transition: "opacity 0.1s",
          }}
        />
      ))}
    </>
  );
};