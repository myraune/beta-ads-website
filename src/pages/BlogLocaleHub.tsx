import React, { useMemo } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { blogPostsMeta } from "@/data/blogPostsMeta";
import { getBlogImage } from "@/lib/blogImage";
import { SEO } from "@/components/SEO";
import { SPFooter } from "@/components/sections/SPFooter";
import {
  NORDIC_MARKETS,
  marketByHubSlug,
  resolvePostLocale,
  type NordicMarket,
} from "@/lib/blogLocale";

/**
 * Per-country blog hub (/blog/norge, /blog/sverige, /blog/suomi, /blog/danmark).
 *
 * A crawlable landing page that lists every post written in that market's
 * language, with localized chrome, a language switcher across the Nordic hubs,
 * and hreflang alternates so Google ranks each hub in the right country.
 */

/** Localized page chrome, per market. */
const HUB_COPY: Record<
  NordicMarket["code"],
  { h1: string; intro: string; eyebrow: string; readMore: string; empty: string; switcher: string }
> = {
  no: {
    eyebrow: "Innsikt for det norske markedet",
    h1: "Twitch-annonsering i Norge",
    intro:
      "Data og guider om Twitch, native overlay-annonsering og hvordan norske merkevarer når Gen Z der de faktisk er.",
    readMore: "Les artikkelen",
    empty: "Flere norske artikler kommer snart.",
    switcher: "Les på et annet språk:",
  },
  sv: {
    eyebrow: "Insikter för den svenska marknaden",
    h1: "Twitch-annonsering i Sverige",
    intro:
      "Data och guider om Twitch, native overlay-annonsering och hur svenska varumärken når Gen Z där de faktiskt är.",
    readMore: "Läs artikeln",
    empty: "Fler svenska artiklar kommer snart.",
    switcher: "Läs på ett annat språk:",
  },
  fi: {
    eyebrow: "Näkemyksiä Suomen markkinoille",
    h1: "Twitch-mainonta Suomessa",
    intro:
      "Dataa ja oppaita Twitchistä, natiiveista overlay-mainoksista ja siitä, miten suomalaiset brändit tavoittavat Z-sukupolven siellä missä se oikeasti on.",
    readMore: "Lue artikkeli",
    empty: "Lisää suomenkielisiä artikkeleita on tulossa pian.",
    switcher: "Lue toisella kielellä:",
  },
  da: {
    eyebrow: "Indsigt til det danske marked",
    h1: "Twitch-annoncering i Danmark",
    intro:
      "Data og guides om Twitch, native overlay-annoncering og hvordan danske brands når Gen Z, der hvor de faktisk er.",
    readMore: "Læs artiklen",
    empty: "Flere danske artikler er på vej.",
    switcher: "Læs på et andet sprog:",
  },
  en: {
    eyebrow: "Insights",
    h1: "Blog",
    intro: "Articles about Twitch advertising in the Nordics.",
    readMore: "Read article",
    empty: "More articles coming soon.",
    switcher: "Read in another language:",
  },
};

const BlogLocaleHub: React.FC<{ hubSlug?: string }> = ({ hubSlug }) => {
  // hubSlug is passed by the static routes (/blog/norge ...). Fall back to the
  // route param for safety.
  const { hub: hubParam } = useParams<{ hub: string }>();
  const hub = hubSlug ?? hubParam;
  const market = hub ? marketByHubSlug(hub) : undefined;

  // Posts in this market's language, newest first.
  const posts = useMemo(() => {
    if (!market) return [];
    return blogPostsMeta
      .filter((p) => resolvePostLocale(p) === market.code)
      .sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());
  }, [market]);

  // Unknown hub slug -> fall back to the main blog index.
  if (!market) return <Navigate to="/blog" replace />;

  const copy = HUB_COPY[market.code];
  const otherMarkets = NORDIC_MARKETS.filter((m) => m.code !== market.code);

  return (
    <>
      <SEO
        title={`${copy.h1} | Beta Ads`}
        description={copy.intro}
        canonical={`/blog/${market.hubSlug}`}
        locale={market.code}
        alternates={[
          ...NORDIC_MARKETS.map((m) => ({ hreflang: m.code, href: `/blog/${m.hubSlug}` })),
          { hreflang: "en" as const, href: "/blog" },
          { hreflang: "x-default" as const, href: "/blog" },
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": `https://beta-ads.no/blog/${market.hubSlug}#blog`,
            name: `${copy.h1} - Beta Ads`,
            description: copy.intro,
            url: `https://beta-ads.no/blog/${market.hubSlug}`,
            inLanguage: market.htmlLang,
            isPartOf: { "@id": "https://beta-ads.no/#website" },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://beta-ads.no/" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://beta-ads.no/blog" },
              { "@type": "ListItem", position: 3, name: market.label, item: `https://beta-ads.no/blog/${market.hubSlug}` },
            ],
          },
        ]}
      />

      <div className="min-h-screen pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              {copy.eyebrow}
            </span>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-4">
              {copy.h1}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">{copy.intro}</p>

            {/* Language switcher across the Nordic hubs + the international blog */}
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <span className="text-muted-foreground">{copy.switcher}</span>
              {otherMarkets.map((m) => (
                <Link
                  key={m.code}
                  to={`/blog/${m.hubSlug}`}
                  className="font-medium text-foreground/80 hover:text-primary transition-colors underline-offset-4 hover:underline"
                  hrefLang={m.htmlLang}
                >
                  {m.switchLabel}
                </Link>
              ))}
              <Link
                to="/blog"
                className="font-medium text-foreground/80 hover:text-primary transition-colors underline-offset-4 hover:underline"
                hrefLang="en"
              >
                English
              </Link>
            </div>
          </div>

          {/* Posts */}
          {posts.length === 0 ? (
            <p className="text-muted-foreground py-12">{copy.empty}</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 border-t border-border pt-12">
              {posts.map((post) => (
                <Link to={`/blog/${post.slug}`} key={post.id} className="group">
                  <article>
                    <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-muted">
                      <img
                        src={getBlogImage(post)}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                        width={480}
                        height={300}
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-semibold text-primary">{post.category}</span>
                      <span className="text-[11px] text-muted-foreground">· {post.date}</span>
                      {post.readTime && (
                        <span className="text-[11px] text-muted-foreground">· {post.readTime}</span>
                      )}
                    </div>
                    <h2 className="text-base font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-2">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                      {copy.readMore} <ArrowRight className="w-3 h-3" />
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <SPFooter />
    </>
  );
};

export default BlogLocaleHub;
