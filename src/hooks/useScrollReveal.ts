import { useState, useEffect, useRef, useCallback } from 'react';

interface ScrollRevealOptions {
  maxOffset?: number;
  scrollRange?: number;
}

export const useScrollReveal = (options: ScrollRevealOptions = {}) => {
  const { maxOffset = 80, scrollRange = 400 } = options;
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

  // Calculate reveal progress (0 to 1) based on scroll
  const progress = Math.min(scrollY / scrollRange, 1);
  
  // Smooth easing function for premium feel
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const easedProgress = easeOutCubic(progress);

  const getRevealStyle = () => ({
    transform: `translate3d(0, ${maxOffset * (1 - easedProgress)}px, 0)`,
    willChange: 'transform',
    transition: 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)',
  });

  return { scrollY, progress: easedProgress, getRevealStyle };
};
