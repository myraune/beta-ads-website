import React from "react";
import { Play } from "lucide-react";
import { SocialIcon } from "@/components/blog/SocialIcon";

export interface YouTubeVideo {
  id: string;
  title: string;
  published: string;
}

interface Props {
  videos: YouTubeVideo[];
  channelHandle: string; // for "Se alle"-lenken
  ownerName: string;
}

/**
 * Karusell-rad med de siste YouTube-videoene per streamer.
 * Bruker YouTubes egne thumbnails (hqdefault), klikker ut til selve videoen.
 * Lastes inn ved build (data hentet fra YouTube RSS), ingen runtime-API.
 */
export const YouTubeVideos: React.FC<Props> = ({ videos, channelHandle, ownerName }) => {
  if (!videos || videos.length === 0) return null;

  const fmtDate = (iso: string) => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("nb-NO", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <section className="mb-14">
      <div className="flex items-end justify-between gap-4 mb-5">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-primary">
          Siste videoer på YouTube
        </h2>
        <a
          href={`https://www.youtube.com/@${channelHandle}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${ownerName} på YouTube`}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <SocialIcon label="YouTube" className="w-3.5 h-3.5" />
          Se alle på YouTube
        </a>
      </div>

      {/* Karusell - horisontal scroll på alle viewports, snap til hvert kort. */}
      <div className="-mx-6 lg:-mx-8 px-6 lg:px-8 overflow-x-auto scrollbar-none">
        <ul className="flex gap-4 snap-x snap-mandatory pb-2">
          {videos.map((v) => (
            <li
              key={v.id}
              className="snap-start shrink-0 w-72 sm:w-80"
            >
              <a
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-video overflow-hidden rounded-xl bg-muted ring-1 ring-border group-hover:ring-primary/40 transition-all">
                  <img
                    src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {/* Play-overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/20 group-hover:bg-primary group-hover:ring-white/40 transition-all">
                      <Play className="w-5 h-5 text-white fill-current pl-0.5" />
                    </span>
                  </div>
                </div>
                <p className="mt-2.5 text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                  {v.title}
                </p>
                <p className="text-[11px] text-muted-foreground mt-1">
                  {fmtDate(v.published)}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default YouTubeVideos;
