import React from "react";

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

/** VideoObject JSON-LD for a recap film, to sit next to the page's Article schema. */
export const recapVideoLd = (slug: string, name: string, description: string, seconds: number, uploadDate: string) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name,
  description,
  thumbnailUrl: `https://beta-ads.no/videos/${slug}-recap-poster.webp`,
  contentUrl: `https://beta-ads.no/videos/${slug}-recap.mp4`,
  uploadDate,
  duration: `PT${Math.round(seconds)}S`,
  publisher: { "@type": "Organization", name: "Beta Ads", url: "https://beta-ads.no" },
});
