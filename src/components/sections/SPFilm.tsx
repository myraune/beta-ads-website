import React, { useRef, useState } from "react";
import { Play } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/* Front-page product film (58s). Click-to-play with a poster so the 16 MB
 * file is only fetched by visitors who actually press play. */

const FILM_SRC = "/videos/beta-ads-film.mp4";
const FILM_POSTER = "/videos/beta-ads-film-poster.webp";

export const SPFilm: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    setStarted(true);
    requestAnimationFrame(() => {
      const v = videoRef.current;
      if (!v) return;
      v.play().catch(() => {});
    });
    (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag?.("event", "film_play", { film: "beta-ads-film" });
  };

  return (
    <section id="film" className="py-20 md:py-28 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">Beta Ads in 60 seconds</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">See how it works</h2>
            <p className="text-base md:text-lg font-light leading-relaxed text-muted-foreground">
              Find streamers, launch a campaign and follow every view, click and chat mention in one dashboard.
            </p>
          </div>

          <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-black shadow-2xl ring-1 ring-black/5">
            {started ? (
              <video
                ref={videoRef}
                src={FILM_SRC}
                poster={FILM_POSTER}
                controls
                playsInline
                preload="auto"
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <button
                type="button"
                onClick={start}
                aria-label="Play the Beta Ads film"
                className="group absolute inset-0 h-full w-full"
              >
                <img
                  src={FILM_POSTER}
                  alt="Beta Ads film: ads inside the livestream, from finding streamers to the campaign dashboard"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  loading="lazy"
                  width={1920}
                  height={1080}
                />
                <span className="absolute left-1/2 top-[84%] md:top-[70%] -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-2 md:gap-3 whitespace-nowrap rounded-full bg-white/95 px-3.5 py-2 md:px-7 md:py-4 text-sm md:text-base font-semibold text-neutral-900 shadow-xl transition-transform duration-300 group-hover:scale-105">
                  <span className="inline-flex h-7 w-7 md:h-9 md:w-9 items-center justify-center rounded-full bg-primary text-white">
                    <Play className="h-3.5 w-3.5 md:h-4 md:w-4 translate-x-[1px]" fill="currentColor" />
                  </span>
                  Watch the film <span className="text-neutral-500 font-normal">0:58</span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
