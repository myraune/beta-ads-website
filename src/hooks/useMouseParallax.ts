import { useState, useEffect, useCallback, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export const useMouseParallax = (intensity: number = 20) => {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ticking.current) {
      ticking.current = true;
      requestAnimationFrame(() => {
        const container = containerRef.current;
        if (container) {
          const rect = container.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          // Calculate offset from center (-1 to 1)
          const x = (e.clientX - centerX) / (rect.width / 2);
          const y = (e.clientY - centerY) / (rect.height / 2);
          
          setPosition({ x, y });
        }
        ticking.current = false;
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const getParallaxStyle = (depth: number = 1) => ({
    transform: `translate3d(${position.x * intensity * depth}px, ${position.y * intensity * depth}px, 0)`,
    transition: 'transform 0.3s cubic-bezier(0.2, 0, 0.2, 1)',
  });

  return { containerRef, position, getParallaxStyle, handleMouseLeave };
};
