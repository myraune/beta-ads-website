import React, { useState, useEffect } from "react";
import { Play, X } from "lucide-react";
import { MediaCarousel } from "@/components/blog/MediaCarousel";
import { SocialIcon } from "@/components/blog/SocialIcon";
import { TikTokEmbed } from "@/components/blog/TikTokEmbed";
import type { TwitchClip, YouTubeVideo, TikTokVideo } from "@/data/norskeStreamere";
import { type MarketCode, profileLabels } from "@/data/streamers";

interface Props {
  name: string;
  market?: MarketCode;
  twitchHandle: string;
  twitchClips?: TwitchClip[];
  youtubeVideos?: YouTubeVideo[];
  youtubeChannelHandle?: string;
  tiktokVideos?: TikTokVideo[];
  tiktokHandle?: string;
}

type TabKey = "twitch" | "youtube" | "tiktok";

const fmtViews = (n: number): string => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(".0", "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(n >= 10_000 ? 0 : 1).replace(".0", "") + "K";
  return String(n);
};

const fmtDuration = (s: number): string => {
  const m = Math.floor(s / 60);
  const sec = Math.round(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
};

const fmtDate = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("nb-NO", { day: "numeric", month: "short", year: "numeric" });
};

/**
 * Samlet medieseksjon med faner: Twitch-klipp, YouTube-videoer og TikTok.
 * Viser kun faner som faktisk har innhold. Hver fane bruker MediaCarousel.
 */
export const StreamerMedia: React.FC<Props> = ({
  name,
  market = "no",
  twitchHandle,
  twitchClips,
  youtubeVideos,
  youtubeChannelHandle,
  tiktokVideos,
  tiktokHandle,
}) => {
  const L = profileLabels(market);
  const [activeClip, setActiveClip] = useState<TwitchClip | null>(null);
  const hasTikTok = Boolean(tiktokVideos?.length || tiktokHandle);
  const tabs: { key: TabKey; label: string; count: number }[] = [];
  if (twitchClips?.length) tabs.push({ key: "twitch", label: L.clipsTab, count: twitchClips.length });
  // Vis kun YouTube-fanen med et reelt feed (en ensom video ser uferdig ut).
  if (youtubeVideos && youtubeVideos.length >= 2) tabs.push({ key: "youtube", label: "YouTube", count: youtubeVideos.length });
  if (hasTikTok) tabs.push({ key: "tiktok", label: "TikTok", count: tiktokVideos?.length ?? 0 });

  const [active, setActive] = useState<TabKey>(tabs[0]?.key ?? "twitch");

  if (tabs.length === 0) return null;

  const seeAll =
    active === "twitch"
      ? { url: `https://www.twitch.tv/${twitchHandle}/clips`, label: L.allClipsTwitch, icon: "Twitch" }
      : active === "youtube"
        ? {
            url: youtubeChannelHandle?.startsWith("UC")
              ? `https://www.youtube.com/channel/${youtubeChannelHandle}`
              : `https://www.youtube.com/@${youtubeChannelHandle}`,
            label: L.seeAllYouTube,
            icon: "YouTube",
          }
        : { url: `https://www.tiktok.com/@${tiktokHandle}`, label: L.seeAllTikTok, icon: "TikTok" };

  return (
    <section className="border-t border-border/60 pt-12 mb-14">
      <div className="flex items-end justify-between gap-4 mb-5 flex-wrap">
        {/* Faner */}
        <div className="flex items-center gap-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setActive(t.key)}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                active === t.key
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <SocialIcon label={t.key === "twitch" ? "Twitch" : t.key === "youtube" ? "YouTube" : "TikTok"} className="w-3.5 h-3.5" />
              {t.label}
            </button>
          ))}
        </div>

        <a
          href={seeAll.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <SocialIcon label={seeAll.icon} className="w-3.5 h-3.5" />
          {seeAll.label}
        </a>
      </div>

      {/* Twitch-klipp */}
      {active === "twitch" && twitchClips && (
        <MediaCarousel label={`Twitch-klipp fra ${name}`}>
          {twitchClips.map((c) => (
            <li key={c.slug} className="snap-start shrink-0 w-72 sm:w-80">
              <button
                type="button"
                onClick={() => setActiveClip(c)}
                aria-label={`Spill av klipp: ${c.title}`}
                className="group block w-full text-left"
              >
                <div className="relative aspect-video overflow-hidden rounded-xl bg-muted ring-1 ring-border group-hover:ring-primary/40 transition-all">
                  <img
                    src={c.thumbnailURL}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/20 group-hover:bg-primary group-hover:ring-white/40 transition-all">
                      <Play className="w-5 h-5 text-white fill-current pl-0.5" />
                    </span>
                  </div>
                  {/* Varighet */}
                  <span className="absolute bottom-2 right-2 rounded bg-black/75 px-1.5 py-0.5 text-[10px] font-semibold text-white tabular-nums">
                    {fmtDuration(c.duration)}
                  </span>
                  {/* Visninger */}
                  <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-sm px-2 py-0.5 text-[10px] font-semibold text-white">
                    <SocialIcon label="Twitch" className="w-3 h-3" />
                    {fmtViews(c.viewCount)}
                  </span>
                </div>
                <p className="mt-2.5 text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                  {c.title}
                </p>
                <p className="text-[11px] text-muted-foreground mt-1">
                  {c.game ? `${c.game} · ` : ""}
                  {fmtDate(c.createdAt)}
                </p>
              </button>
            </li>
          ))}
        </MediaCarousel>
      )}

      {/* YouTube */}
      {active === "youtube" && youtubeVideos && (
        <MediaCarousel label={`YouTube-videoer fra ${name}`}>
          {youtubeVideos.map((v) => (
            <li key={v.id} className="snap-start shrink-0 w-72 sm:w-80">
              <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="relative aspect-video overflow-hidden rounded-xl bg-muted ring-1 ring-border group-hover:ring-primary/40 transition-all">
                  <img
                    src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/20 group-hover:bg-primary group-hover:ring-white/40 transition-all">
                      <Play className="w-5 h-5 text-white fill-current pl-0.5" />
                    </span>
                  </div>
                </div>
                <p className="mt-2.5 text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                  {v.title}
                </p>
                <p className="text-[11px] text-muted-foreground mt-1">{fmtDate(v.published)}</p>
              </a>
            </li>
          ))}
        </MediaCarousel>
      )}

      {/* TikTok - offisiell creator-embed når vi ikke har manuelle videoer */}
      {active === "tiktok" && !tiktokVideos?.length && tiktokHandle && (
        <TikTokEmbed handle={tiktokHandle} name={name} />
      )}

      {/* TikTok - manuelt kuraterte vertikale 9:16 kort (hvis tilgjengelig) */}
      {active === "tiktok" && tiktokVideos && tiktokVideos.length > 0 && (
        <MediaCarousel label={`TikTok-videoer fra ${name}`}>
          {tiktokVideos.map((v) => (
            <li key={v.id} className="snap-start shrink-0 w-44 sm:w-48">
              <a href={v.url} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="relative aspect-[9/16] overflow-hidden rounded-xl bg-muted ring-1 ring-border group-hover:ring-primary/40 transition-all">
                  {v.thumbnail ? (
                    <img
                      src={v.thumbnail}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 via-muted to-foreground/5">
                      <SocialIcon label="TikTok" className="w-8 h-8 text-foreground/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/20 group-hover:bg-primary group-hover:ring-white/40 transition-all">
                      <Play className="w-4.5 h-4.5 text-white fill-current pl-0.5" />
                    </span>
                  </div>
                </div>
                {v.title && (
                  <p className="mt-2.5 text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {v.title}
                  </p>
                )}
              </a>
            </li>
          ))}
        </MediaCarousel>
      )}

      {/* In-site Twitch-klipp-spiller (offisiell embed, ingen redirect til Twitch) */}
      {activeClip && (
        <ClipModal clip={activeClip} onClose={() => setActiveClip(null)} />
      )}
    </section>
  );
};

interface ClipModalProps {
  clip: TwitchClip;
  onClose: () => void;
}

/** Modal som spiller Twitch-klippet via clips.twitch.tv/embed - rett i siden. */
const ClipModal: React.FC<ClipModalProps> = ({ clip, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  // Twitch krever parent = domenet embeden vises på (localhost i dev, beta-ads.no i prod).
  const host = typeof window !== "undefined" ? window.location.hostname : "beta-ads.no";
  const src = `https://clips.twitch.tv/embed?clip=${encodeURIComponent(clip.slug)}&parent=${host}&autoplay=true`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={clip.title}
    >
      <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Lukk"
          className="absolute -top-10 right-0 inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors"
        >
          Lukk <X className="w-5 h-5" />
        </button>
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black ring-1 ring-white/15 shadow-2xl">
          <iframe
            src={src}
            title={clip.title}
            allow="autoplay; fullscreen"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-sm text-white/90 font-medium line-clamp-1">{clip.title}</p>
          <a
            href={clip.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/60 hover:text-white shrink-0 inline-flex items-center gap-1.5"
          >
            <SocialIcon label="Twitch" className="w-3.5 h-3.5" /> Twitch
          </a>
        </div>
      </div>
    </div>
  );
};

export default StreamerMedia;
