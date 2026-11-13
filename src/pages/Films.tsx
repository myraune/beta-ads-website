import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { FILMS, filmUrl, formatDuration } from "@/data/films";

const SITE = "https://beta-ads.no";

/** Index of the campaign recap films. Each card links to the film's watch page. */
const Films: React.FC = () => (
  <>
    <SEO
      title="Campaign recap films from Twitch"
      description="Short recap films from Beta Ads campaigns on Twitch for Samsung, Surfshark, Glorious, NKI, Norstat and Gokstad Akademiet, with real clips from the streams."
      canonical="/films"
      ogImage="/videos/surfshark-finland-recap-poster.webp"
      ogImageWidth={1600}
      ogImageHeight={900}
      ogImageAlt="Frame from the Surfshark VPN Finland campaign recap"
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${SITE}/films#page`,
          name: "Campaign recap films",
          url: `${SITE}/films`,
          isPartOf: { "@id": `${SITE}/#website` },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: FILMS.map((f, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE}${filmUrl(f.slug)}`,
              name: f.title,
            })),
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
            { "@type": "ListItem", position: 2, name: "Recap films", item: `${SITE}/films` },
          ],
        },
      ]}
    />

    <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 md:pt-36 pb-20 md:pb-28">
      <div className="max-w-2xl">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-foreground mb-6">
          Recap films <span className="hl">from the streams.</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Each film is cut from real clips of the campaign's streams and ends on the numbers from the final report.
          Under every film you find what the campaign was, the results and a link to the full case study.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 mt-16 md:mt-20">
        {FILMS.map((f) => (
          <Link key={f.slug} to={filmUrl(f.slug)} className="group block">
            <span className="block overflow-hidden rounded-2xl bg-muted aspect-video">
              <img
                src={`/videos/${f.slug}-recap-poster.webp`}
                alt={`Frame from the ${f.title}`}
                width={1600}
                height={900}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
            </span>
            <span className="flex items-baseline justify-between gap-4 mt-4">
              <span className="text-lg font-semibold text-foreground leading-snug">{f.title}</span>
              <span className="text-sm text-muted-foreground tabular-nums shrink-0">{formatDuration(f.seconds)}</span>
            </span>
            <span className="block mt-1 text-sm text-muted-foreground leading-relaxed">{f.line}</span>
          </Link>
        ))}
      </div>
    </section>
  </>
);

export default Films;
