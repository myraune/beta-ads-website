import { useState, useEffect, useRef, useCallback } from 'react';

export const useParallax = () => {
  const [scrollY, setScrollY] = useState(0);
  const ticking = useRef(false);

  const updateScrollY = useCallback(() => {
    setScrollY(window.scrollY);
    ticking.current = false;
  }, []);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      ticking.current = true;
      requestAnimationFrame(updateScrollY);
    }
  }, [updateScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const getParallaxStyle = (speed: number = 0.5) => ({
    transform: `translate3d(0, ${scrollY * speed}px, 0)`,
    willChange: 'transform',
  });

  return { scrollY, getParallaxStyle };
};
