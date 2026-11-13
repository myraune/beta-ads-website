import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { RecapFilm, recapVideoLd } from "@/components/blog/RecapFilm";
import { FILMS, filmUrl, formatDuration, getFilm } from "@/data/films";

const SITE = "https://beta-ads.no";

/**
 * Watch page for one campaign recap film. The film is the main content: first
 * thing under the H1, full width. This page is the film's canonical home and
 * the only page with its VideoObject; the case page links here.
 */
const FilmWatch: React.FC = () => {
  const { slug } = useParams();
  const film = getFilm(slug);
  if (!film) return <Navigate to="/films" replace />;

  const pageUrl = `${SITE}${filmUrl(film.slug)}`;
  const poster = `/videos/${film.slug}-recap-poster.webp`;
  const mp4 = `${SITE}/videos/${film.slug}-recap.mp4`;
  const others = FILMS.filter((f) => f.slug !== film.slug);

  return (
    <>
      <SEO
        title={film.seoTitle}
        description={film.metaDescription}
        canonical={filmUrl(film.slug)}
        ogType="video.other"
        ogImage={poster}
        ogImageWidth={1600}
        ogImageHeight={900}
        ogImageAlt={`Frame from the ${film.title}`}
        jsonLd={[
          recapVideoLd(film.slug, film.title, film.metaDescription, film.seconds, film.uploadDate, pageUrl),
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
              { "@type": "ListItem", position: 2, name: "Recap films", item: `${SITE}/films` },
              { "@type": "ListItem", position: 3, name: film.title, item: pageUrl },
            ],
          },
        ]}
      />
      <Helmet>
        <meta property="og:video" content={mp4} />
        <meta property="og:video:secure_url" content={mp4} />
        <meta property="og:video:type" content="video/mp4" />
        <meta property="og:video:width" content="1600" />
        <meta property="og:video:height" content="900" />
        <meta property="video:duration" content={String(Math.round(film.seconds))} />
      </Helmet>

      <article className="max-w-6xl mx-auto px-6 lg:px-12 pt-28 md:pt-36 pb-20 md:pb-28">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
          <Link to="/films" className="hover:text-foreground transition-colors">Recap films</Link>
          <span className="mx-2" aria-hidden>/</span>
          <span className="text-foreground">{film.brand}</span>
        </nav>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-foreground max-w-4xl">
          {film.title}
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          {film.context} · <span className="tabular-nums">{formatDuration(film.seconds)}</span>
        </p>

        <div className="mt-8 md:mt-10 overflow-hidden rounded-2xl bg-black aspect-video">
          <RecapFilm slug={film.slug} label={film.title} className="w-full h-full object-contain bg-black" />
        </div>

        <div className="max-w-2xl mt-12 md:mt-16">
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">{film.description}</p>
          <Link
            to={film.caseUrl}
            className="inline-flex items-center gap-2 mt-6 text-base font-medium text-foreground hover:gap-3 transition-all"
          >
            Read the full case study <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>

          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mt-16 mb-6">Results</h2>
          <dl>
            {film.results.map(([label, value]) => (
              <div key={label} className="flex items-baseline justify-between gap-6 py-3 border-b border-border last:border-0">
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="text-base font-semibold text-foreground tabular-nums text-right">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-muted-foreground">
            Figures from the campaign report, as published on the <Link to={film.caseUrl} className="underline underline-offset-2 hover:text-foreground">{film.brand} case study</Link>.
          </p>

          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mt-16 mb-4">What you see in the film</h2>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">{film.inFilm}</p>

          {film.quotes && film.quotes.length > 0 && (
            <div className="mt-8 space-y-6">
              {film.quotes.map((q) => (
                <figure key={q.text} className="border-l-2 border-border pl-5">
                  <blockquote className="text-lg md:text-xl font-light leading-snug text-foreground">"{q.text}"</blockquote>
                  <figcaption className="mt-2 text-sm text-muted-foreground">{q.note}</figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>

        <section className="mt-20 md:mt-28 pt-12 border-t border-border" aria-label="More recap films">
          <div className="flex items-baseline justify-between gap-6 mb-8">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground">More recap films</h2>
            <Link to="/films" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors shrink-0">
              All films
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-5 gap-y-8">
            {others.map((f) => (
              <Link key={f.slug} to={filmUrl(f.slug)} className="group block">
                <span className="block overflow-hidden rounded-xl bg-muted aspect-video">
                  <img
                    src={`/videos/${f.slug}-recap-poster.webp`}
                    alt=""
                    width={1600}
                    height={900}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </span>
                <span className="block mt-3 text-sm font-semibold text-foreground leading-snug">{f.brand}</span>
                <span className="block text-xs text-muted-foreground tabular-nums">{formatDuration(f.seconds)}</span>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </>
  );
};

export default FilmWatch;
