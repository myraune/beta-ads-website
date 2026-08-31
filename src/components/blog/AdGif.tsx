import React, { useState } from "react";

/**
 * Campaign creative that ships as an animated GIF, shown as a poster until the
 * reader asks for it.
 *
 * The creatives live on LIVAD's storage bucket as GIFs: 41 MB across six files,
 * the largest being 13 MB. /case-study/gokstad loaded four of them on sight and
 * measured 31.56 MB with an LCP of 48 seconds. A static poster is not a
 * substitute here the way it was for the /case-studies grid tiles, because on
 * these pages the animation IS the ad being discussed. So the poster loads
 * eagerly and the GIF only on click.
 *
 * GIF is a terrible container for this: the same creatives as MP4 would be
 * roughly a tenth of the size and would autoplay cheaply. Converting needs
 * ffmpeg, which is not on this machine, so this keeps the byte cost off the
 * page load without touching the source files.
 */

interface AdGifProps {
  /** Full URL of the animated GIF. */
  src: string;
  /** Poster generated from the GIF's first frame, under /lovable-uploads. */
  poster: string;
  alt: string;
  className?: string;
  /** Roughly how big the GIF is, shown so the reader knows what they're loading. */
  sizeLabel?: string;
}

export const AdGif: React.FC<AdGifProps> = ({ src, poster, alt, className = "", sizeLabel }) => {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return <img src={src} alt={alt} className={className} style={{ aspectRatio: "16 / 9" }} />;
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className={`group relative block w-full cursor-pointer overflow-hidden ${className}`}
      style={{ aspectRatio: "16 / 9" }}
      aria-label={`Play animation: ${alt}`}
    >
      <img src={poster} alt={alt} className="w-full h-full object-cover" loading="lazy" />
      <span className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
      <span
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white"
        aria-hidden
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/40 group-hover:bg-white/25 transition-colors">
          {/* Play triangle, nudged right so it reads as centred inside the circle. */}
          <span className="ml-1 border-y-[10px] border-y-transparent border-l-[16px] border-l-white" />
        </span>
        <span className="text-xs font-medium tracking-wide">
          Play animation{sizeLabel ? ` (${sizeLabel})` : ""}
        </span>
      </span>
    </button>
  );
};

export default AdGif;
