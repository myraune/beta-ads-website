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

  // Width: 85vw -> 100vw
  const videoWidth = 85 + (15 * easedProgress);
  
  // Height: 70vh -> 100vh
  const videoHeight = 70 + (30 * easedProgress);
  
  // Border radius from 20px to 0
  const borderRadius = 20 * (1 - easedProgress);
  
  // Overlay fades out later (starts fading at 60% progress)
  const overlayOpacity = progress < 0.6 ? 1 : Math.max(0, 1 - (progress - 0.6) * 2.5);

  const handlePlayClick = () => {
    setIsUnmuted(true);
  };

  const videoSrc = isUnmuted
    ? "https://www.youtube.com/embed/Uw7IIecicB4?autoplay=1&rel=0&modestbranding=1"
    : "https://www.youtube.com/embed/Uw7IIecicB4?autoplay=1&mute=1&loop=1&playlist=Uw7IIecicB4&rel=0&modestbranding=1";

  return (
    <>
      <section 
        ref={containerRef}
        className="relative"
        style={{ height: '250vh' }}
      >
        {/* Sticky container */}
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          {/* Video container with width/height animation */}
          <div 
            className="relative overflow-hidden"
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
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                style={{ opacity: overlayOpacity }}
              >
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
                
                {/* Play button - always clickable */}
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
      
      {/* See Our Work CTA - outside sticky container */}
      <div className="relative z-10 py-16 lg:py-24 text-center">
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
