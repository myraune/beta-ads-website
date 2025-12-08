import { useState, useEffect, useCallback } from 'react';

export const useParallax = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      setScrollY(window.scrollY);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const getParallaxStyle = (speed: number = 0.5) => ({
    transform: `translateY(${scrollY * speed}px)`,
  });

  return { scrollY, getParallaxStyle };
};
