import React, { useRef, useState, useEffect, useCallback } from "react";
import { Play, Volume2, VolumeX, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ScrollCaseVideoProps {
  src: string;
  poster?: string;
  title: string;
  subtitle?: string;
  metrics?: { label: string; value: string }[];
  ctaText?: string;
  ctaHref?: string;
  t?: any;
}

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

export const ScrollCaseVideo: React.FC<ScrollCaseVideoProps> = ({
  src,
  poster,
  title,
  subtitle,
  metrics,
  ctaText = "Watch with sound",
  ctaHref = "/case-studies",
  t,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const ticking = useRef(false);

  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Lazy load video when section approaches viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Track if video is in view for autoplay/pause
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Autoplay when in view, pause when out
  useEffect(() => {
    if (!videoRef.current || prefersReducedMotion) return;

    if (isInView) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  }, [isInView, prefersReducedMotion]);

  // Scroll progress calculation - FIXED
  const calculateProgress = useCallback(() => {
    if (!containerRef.current) return 0;

    const rect = containerRef.current.getBoundingClientRect();
    const containerHeight = containerRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;

    // Progress: 0 when top of section hits top of viewport
    // Progress: 1 when bottom of section hits bottom of viewport
    const scrollableDistance = containerHeight - viewportHeight;
    const scrolled = -rect.top;

    if (scrolled <= 0) return 0;
    if (scrolled >= scrollableDistance) return 1;

    return scrolled / scrollableDistance;
  }, []);

  // Scroll listener with RAF
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          setProgress(calculateProgress());
          ticking.current = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [calculateProgress, prefersReducedMotion]);

  // Map scroll progress to animation progress with dead scroll
  const getAnimationProgress = (scrollProgress: number): number => {
    // Phase 1: 0-0.25 - Card format (no animation)
    if (scrollProgress < 0.25) return 0;
    
    // Phase 2: 0.25-0.55 - Scale to fullscreen
    if (scrollProgress < 0.55) {
      return (scrollProgress - 0.25) / 0.3;
    }
    
    // Phase 3: 0.55-1.0 - Dead scroll (fullscreen, no change)
    return 1;
  };

  const animationProgress = getAnimationProgress(progress);

  // Easing function for smooth animation
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const easedProgress = easeOutCubic(animationProgress);

  // FIXED: Use inset animation instead of size animation
  // The video wrapper has animated padding/inset, video always fills it
  const maxInsetX = isMobile ? 16 : 64; // px on each side
  const maxInsetY = isMobile ? 32 : 48; // px top/bottom
  
  const insetX = maxInsetX * (1 - easedProgress);
  const insetY = maxInsetY * (1 - easedProgress);
  const borderRadius = 24 * (1 - easedProgress);
  
  // Overlay fades out during the second half of animation
  const overlayOpacity = animationProgress < 0.5 
    ? 1 
    : Math.max(0, 1 - (animationProgress - 0.5) * 2);

  // Toggle mute
  const toggleMute = () => {
    if (!videoRef.current) return;
    
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };

  // Container height for scroll distance
  const containerHeight = isMobile ? "160vh" : "250vh";

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative rounded-2xl overflow-hidden bg-black/20">
            <video
              src={src}
              poster={poster}
              controls
              playsInline
              className="w-full aspect-video"
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-xl font-light text-foreground">{title}</h3>
              {subtitle && (
                <p className="text-muted-foreground mt-1">{subtitle}</p>
              )}
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground text-sm uppercase tracking-widest mb-4">
              {t?.exploreMoreCampaigns || "Explore more campaigns"}
            </p>
            <Link
              to={ctaHref}
              className="inline-flex items-center gap-2 text-foreground text-lg font-light hover:text-primary transition-colors"
            >
              {t?.seeOurWork || "See our work"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        ref={containerRef}
        className="relative"
        style={{ height: containerHeight }}
      >
        {/* Sticky wrapper - always fills viewport */}
        <div className="sticky top-0 h-screen w-screen overflow-hidden">
          {/* Video container with animated inset - this is the key fix */}
          <div
            className="absolute overflow-hidden"
            style={{
              top: insetY,
              left: insetX,
              right: insetX,
              bottom: insetY,
              borderRadius: `${borderRadius}px`,
              willChange: "top, left, right, bottom, border-radius",
            }}
          >
            {/* Video - always fills the container */}
            {shouldLoad && (
              <video
                ref={videoRef}
                src={src}
                poster={poster}
                muted={isMuted}
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
              >
                Your browser does not support the video tag.
              </video>
            )}

            {/* Placeholder while loading */}
            {!shouldLoad && poster && (
              <img
                src={poster}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}

            {/* Overlay - fades out as video expands */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"
              style={{ opacity: overlayOpacity }}
            >
              {/* Play/Mute button - always interactive */}
              <button
                onClick={toggleMute}
                className="pointer-events-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? (
                  <Play className="w-8 h-8 lg:w-10 lg:h-10 text-white ml-1" />
                ) : (
                  <Volume2 className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                )}
              </button>

              {/* Content at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                <div className="space-y-2">
                  <h3 className="text-2xl lg:text-3xl font-light text-white tracking-wide">
                    {title}
                  </h3>
                  {subtitle && (
                    <p className="text-white/70 text-base lg:text-lg">
                      {subtitle}
                    </p>
                  )}

                  {/* Metrics */}
                  {metrics && metrics.length > 0 && (
                    <div className="flex gap-6 mt-4 pt-4 border-t border-white/10">
                      {metrics.map((metric, index) => (
                        <div key={index}>
                          <p className="text-white text-xl lg:text-2xl font-light">
                            {metric.value}
                          </p>
                          <p className="text-white/50 text-sm uppercase tracking-wider">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* CTA hint */}
                <p className="mt-4 text-white/50 text-sm flex items-center gap-2">
                  <VolumeX className="w-4 h-4" />
                  {ctaText}
                </p>
              </div>
            </div>

            {/* Mute button when overlay is faded - always accessible */}
            {overlayOpacity < 0.3 && (
              <button
                onClick={toggleMute}
                className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/70 transition-colors z-10"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* See Our Work CTA */}
      <div className="relative z-10 py-16 lg:py-24 text-center">
        <p className="text-muted-foreground text-sm uppercase tracking-widest mb-4">
          {t?.exploreMoreCampaigns || "Explore more campaigns"}
        </p>
        <Link
          to={ctaHref}
          className="inline-flex items-center gap-2 text-foreground text-xl lg:text-2xl font-light hover:text-primary transition-colors"
        >
          {t?.seeOurWork || "See our work"}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </>
  );
};
