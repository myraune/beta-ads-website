import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/** Campaign recap film: real clips from the campaign's streams, cut to the final report numbers.
    Click to play (preload none) so the page stays light; the poster is a frame from the film. */
export const RecapFilm: React.FC<{ slug: string; label: string; className?: string }> = ({ slug, label, className = "w-full h-auto rounded-xl bg-muted" }) => (
  <video
    controls
    playsInline
    preload="none"
    poster={`/videos/${slug}-recap-poster.webp`}
    width={1600}
    height={900}
    className={className}
    aria-label={label}
  >
    <source src={`/videos/${slug}-recap.mp4`} type="video/mp4" />
  </video>
);

/** Small link from a case page to the film's watch page (/films/<slug>), which is the
    film's canonical home and the only page that carries its VideoObject. */
export const RecapFilmLink: React.FC<{ slug: string; className?: string }> = ({ slug, className = "mt-3" }) => (
  <Link
    to={`/films/${slug}`}
    className={`inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors ${className}`}
  >
    Watch the film <ArrowRight className="w-3.5 h-3.5" aria-hidden />
  </Link>
);

/** VideoObject JSON-LD for a recap film. Only the watch page (/films/<slug>) emits it;
    pass that page's absolute URL as pageUrl so it becomes url and embedUrl. */
export const recapVideoLd = (slug: string, name: string, description: string, seconds: number, uploadDate: string, pageUrl?: string) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name,
  description,
  thumbnailUrl: `https://beta-ads.no/videos/${slug}-recap-poster.webp`,
  contentUrl: `https://beta-ads.no/videos/${slug}-recap.mp4`,
  ...(pageUrl ? { embedUrl: pageUrl, url: pageUrl } : {}),
  uploadDate,
  duration: `PT${Math.round(seconds)}S`,
  width: 1600,
  height: 900,
  publisher: {
    "@type": "Organization",
    name: "Beta Ads",
    url: "https://beta-ads.no",
    logo: { "@type": "ImageObject", url: "https://beta-ads.no/brand/beta-ads-logo-512.png", width: 512, height: 512 },
  },
});
