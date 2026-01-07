import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ScrollVideoProps {
  t: any;
}

export const ScrollVideo: React.FC<ScrollVideoProps> = ({ t }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isUnmuted, setIsUnmuted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ticking = useRef(false);

  // Mobile detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const calculateProgress = useCallback(() => {
    if (!containerRef.current) return 0;
    
    const rect = containerRef.current.getBoundingClientRect();
    const containerHeight = containerRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    
    // Progress: 0 when section top hits viewport top, 1 when section bottom hits viewport bottom
    const scrollableDistance = containerHeight - viewportHeight;
    const scrolled = -rect.top;
    
    if (scrolled <= 0) return 0;
    if (scrolled >= scrollableDistance) return 1;
    
    return scrolled / scrollableDistance;
  }, []);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      ticking.current = true;
      requestAnimationFrame(() => {
        setProgress(calculateProgress());
        ticking.current = false;
      });
    }
  }, [calculateProgress]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // 3-phase animation:
  // Phase 1 (0-0.25): Card format, no animation
  // Phase 2 (0.25-0.55): Expand to fullscreen
  // Phase 3 (0.55-1.0): Dead scroll (fullscreen hold)
  
  const getAnimationProgress = () => {
    if (progress <= 0.25) return 0;
    if (progress >= 0.55) return 1;
    return (progress - 0.25) / 0.3; // 0 to 1 during phase 2
  };

  const animationProgress = getAnimationProgress();
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const easedProgress = easeOutCubic(animationProgress);

  // Inset values - starts with padding, animates to 0
  const maxInsetX = isMobile ? 16 : 64;
  const maxInsetY = isMobile ? 24 : 48;
  const insetX = maxInsetX * (1 - easedProgress);
  const insetY = maxInsetY * (1 - easedProgress);
  
  // Border radius: 24px -> 0
  const borderRadius = 24 * (1 - easedProgress);
  
  // Overlay fades out during phase 2
  const overlayOpacity = animationProgress < 0.5 ? 1 : Math.max(0, 1 - (animationProgress - 0.5) * 2);

  const handlePlayClick = () => {
    setIsUnmuted(true);
  };

  const videoSrc = isUnmuted
    ? "https://www.youtube.com/embed/Uw7IIecicB4?autoplay=1&rel=0&modestbranding=1"
    : "https://www.youtube.com/embed/Uw7IIecicB4?autoplay=1&mute=1&loop=1&playlist=Uw7IIecicB4&rel=0&modestbranding=1";

  // Container height: 280vh desktop, 160vh mobile
  const containerHeight = isMobile ? '160vh' : '280vh';

  return (
    <>
      <section 
        ref={containerRef}
        className="relative bg-background"
        style={{ height: containerHeight }}
      >
        {/* Sticky container - always full viewport */}
        <div className="sticky top-0 h-screen w-screen overflow-hidden">
          {/* Video wrapper with animated inset */}
          <div 
            className="absolute overflow-hidden"
            style={{
              top: insetY,
              left: insetX,
              right: insetX,
              bottom: insetY,
              borderRadius: `${borderRadius}px`,
              willChange: 'top, left, right, bottom, border-radius',
            }}
          >
            {/* YouTube iframe - always fills container */}
            <iframe
              src={videoSrc}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={t.caseVideoTitle || "Samsung Campaign"}
            />
            
            {/* Play overlay */}
            {!isUnmuted && overlayOpacity > 0 && (
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                style={{ opacity: overlayOpacity }}
              >
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
                
                {/* Play button */}
                <button
                  onClick={handlePlayClick}
                  className="relative z-10 group flex flex-col items-center gap-4 focus:outline-none pointer-events-auto"
                  aria-label={t.watchVideo || "Watch video"}
                >
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                  <span className="text-white text-lg font-light tracking-wide">
                    {t.watchVideo || "Watch with sound"}
                  </span>
                </button>
                
                {/* Case title at bottom */}
                <div className="absolute bottom-8 left-8 text-left z-10">
                  <p className="text-white/60 text-sm uppercase tracking-widest mb-1">
                    {t.caseStudy || "Case Study"}
                  </p>
                  <h3 className="text-white text-2xl font-light">
                    {t.caseVideoTitle || "Samsung Campaign"}
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* See Our Work CTA */}
      <div className="relative z-10 py-16 lg:py-24 text-center bg-background">
        <p className="text-muted-foreground text-sm uppercase tracking-widest mb-4">
          {t.exploreMoreCampaigns || "Explore more campaigns"}
        </p>
        <Link 
          to="/case-studies"
          className="inline-flex items-center gap-3 text-foreground text-xl lg:text-2xl font-light hover:text-primary transition-colors group"
        >
          {t.seeOurWork || "See our work"}
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </>
  );
};
