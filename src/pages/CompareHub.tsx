import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { competitors, competitorRoute } from "@/data/competitors";
import { LogoTile } from "@/pages/Compare";
import "@/components/home-final/home-final.css";

/* /compare: every alternative to Beta Ads, one line each. */

const W = "max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-10";

const CompareHub: React.FC = () => (
  <>
    <SEO
      title="Beta Ads alternatives and comparisons | Beta Ads"
      description="How Beta Ads compares with Twitch Ads, StreamElements, inStreamly, Lurkit and influencer agencies for Nordic livestream ads. Sourced, dated and honest."
      canonical="/compare"
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: competitors.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `Beta Ads vs ${c.name}`,
            url: `https://beta-ads.no${competitorRoute(c.slug)}`,
          })),
        },
      ]}
    />
    <div className="min-h-screen bg-background text-foreground">
      <header className={`${W} pt-32 md:pt-40 pb-12`}>
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-5">Compare</div>
        <h1 className="text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.4rem] font-bold tracking-[-0.03em] max-w-4xl m-0">
          Beta Ads <span className="hl">and the alternatives.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          What else Nordic brands look at before they run livestream ads, and how it differs from us. Every claim about another company links to its source, and every page says when the other option fits better.
        </p>
      </header>
      <section className="border-t border-border pb-24">
        <ul className={`${W} m-0 p-0 list-none`}>
          {competitors.map((c) => (
            <li key={c.slug} className="border-b border-border">
              <Link to={competitorRoute(c.slug)} className="group grid grid-cols-[7.5rem_minmax(0,1fr)] md:grid-cols-[10rem_17rem_minmax(0,1fr)_auto] gap-x-5 gap-y-2 md:gap-8 py-6 items-center">
                <LogoTile c={c} size="sm" />
                <span className="text-xl font-bold tracking-tight">Beta Ads vs {c.name}<span className="block text-sm font-normal text-muted-foreground mt-1">{c.hq === "Not stated on its site" || c.hq === "Varies" ? c.kind : c.hq}</span></span>
                <span className="col-span-2 md:col-span-1 text-[15px] text-muted-foreground">{c.summary}</span>
                <span className="text-sm font-semibold group-hover:underline underline-offset-4">Compare</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  </>
);

export default CompareHub;
