import React, { useState } from "react";
import { Play } from "lucide-react";

/**
 * A YouTube embed that costs nothing until somebody presses play.
 *
 * Dropping three <iframe src="youtube.com/embed/..."> onto a page pulls in
 * roughly a megabyte of third-party script and a pile of cookies on load, for
 * every reader, including the ones who never watch. After the work we did
 * getting this site's page weight down, that is not a trade worth making.
 *
 * So the initial render is a local poster image and a button. The iframe is
 * only mounted on click, with `autoplay=1` so the press that reveals it also
 * starts it, and youtube-nocookie.com so a reader who never clicks is never
 * tracked.
 *
 * The poster lives in our own /public rather than i.ytimg.com, which keeps the
 * default state entirely first-party.
 */

interface YouTubeFacadeProps {
  /** The video id, e.g. "QdBZY2fkU-0". */
  id: string;
  /** Local poster path. Deliberately not an i.ytimg.com URL. */
  poster: string;
  /** Video title, shown under the play button and used as the iframe title. */
  title: string;
  /** Short line under the title, e.g. the release date and view count. */
  meta?: string;
  /** Accessible label for the play button. */
  playLabel: string;
}

export const YouTubeFacade: React.FC<YouTubeFacadeProps> = ({
  id,
  poster,
  title,
  meta,
  playLabel,
}) => {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="rounded-2xl overflow-hidden border border-border bg-card h-full flex flex-col">
      <div className="relative aspect-video bg-black">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`${playLabel}: ${title}`}
            className="group absolute inset-0 w-full h-full cursor-pointer"
          >
            <img
              src={poster}
              alt={title}
              loading="lazy"
              width={960}
              height={540}
              className="w-full h-full object-cover"
            />
            <span className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex items-center justify-center h-14 w-14 rounded-full bg-primary text-white shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="p-4">
        <div className="text-sm font-semibold text-foreground">{title}</div>
        {meta && <p className="text-xs text-muted-foreground mt-1">{meta}</p>}
      </figcaption>
    </figure>
  );
};

export default YouTubeFacade;
