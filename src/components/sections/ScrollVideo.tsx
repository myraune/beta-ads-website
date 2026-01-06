import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play } from 'lucide-react';

interface ScrollVideoProps {
  t: any;
}

export const ScrollVideo: React.FC<ScrollVideoProps> = ({ t }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isUnmuted, setIsUnmuted] = useState(false);
  const ticking = useRef(false);

  const calculateProgress = useCallback(() => {
    if (!containerRef.current) return 0;
    
    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const containerHeight = rect.height;
    
    const scrollableDistance = containerHeight - windowHeight;
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

  // Smooth easing for premium feel
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const easedProgress = easeOutCubic(progress);

  // Width: 88vw -> 100vw
  const videoWidth = 88 + (12 * easedProgress);
  
  // Height: 75vh -> 100vh
  const videoHeight = 75 + (25 * easedProgress);
  
  // Border radius from 24px to 0
  const borderRadius = 24 * (1 - easedProgress);
  
  // Overlay fades out later (starts fading at 50% progress)
  const overlayOpacity = progress < 0.5 ? 1 : Math.max(0, 1 - (progress - 0.5) * 2);

  const handlePlayClick = () => {
    setIsUnmuted(true);
  };

  const videoSrc = isUnmuted
    ? "https://www.youtube.com/embed/Uw7IIecicB4?autoplay=1&rel=0&modestbranding=1"
    : "https://www.youtube.com/embed/Uw7IIecicB4?autoplay=1&mute=1&loop=1&playlist=Uw7IIecicB4&rel=0&modestbranding=1";

  return (
    <section 
      ref={containerRef}
      className="relative bg-background"
      style={{ height: '300vh' }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Video container with width/height animation */}
        <div 
          className="relative overflow-hidden bg-black"
          style={{
            width: `${videoWidth}vw`,
            height: `${videoHeight}vh`,
            borderRadius: `${borderRadius}px`,
            willChange: 'width, height, border-radius',
          }}
        >
          {/* YouTube iframe */}
          <iframe
            src={videoSrc}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={t.caseVideoTitle || "Samsung Campaign"}
          />
          
          {/* Play overlay - visible until late in scroll */}
          {!isUnmuted && overlayOpacity > 0 && (
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-200"
              style={{ opacity: overlayOpacity }}
            >
              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/40" />
              
              {/* Play button */}
              <button
                onClick={handlePlayClick}
                className="relative z-10 group flex flex-col items-center gap-4 focus:outline-none"
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
  );
};
