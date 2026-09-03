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
 *
 * The title and meta sit inside the frame on a gradient scrim rather than in a
 * panel below it, so each card reads as one object instead of a thumbnail with
 * a label box attached.
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
    <figure className="relative rounded-2xl overflow-hidden bg-black aspect-video">
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
          className="group absolute inset-0 w-full h-full cursor-pointer text-left"
        >
          <img
            src={poster}
            alt={title}
            loading="lazy"
            width={960}
            height={540}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* One scrim doing two jobs: lifting the play button off a bright
              poster, and giving the caption a floor to sit on. Keeping the
              text inside the frame means the card is the video, rather than a
              thumbnail with a separate label box bolted underneath it. */}
          <span
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 34%, rgba(0,0,0,0.12) 60%, rgba(0,0,0,0.28) 100%)",
            }}
          />
          <span className="absolute inset-x-0 top-0 flex justify-center pt-[22%]">
            <span className="flex items-center justify-center h-14 w-14 rounded-full bg-primary text-white shadow-xl transition-transform duration-300 group-hover:scale-110">
              <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
            </span>
          </span>
          <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <span className="block text-[15px] font-semibold text-white leading-tight">
              {title}
            </span>
            {meta && (
              <span className="block text-xs text-white/65 mt-1 leading-snug">{meta}</span>
            )}
          </figcaption>
        </button>
      )}
    </figure>
  );
};

export default YouTubeFacade;
