import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import "@/components/home-final/home-final.css";
import { BOOKING_URL, SALES_MAIL, W, kicker, h2, PrimaryBtn, GhostBtn, Faq, faqLd } from "@/components/working/shared";

/* One template for the Platform feature pages (/campaign-builder,
   /streamer-explorer, /reporting, /programmatic): hero with a coded product panel or image,
   alternating sections, related links, FAQ and a closing CTA. Each page passes
   only its own copy and images; claims stay with the page that makes them. */

export type FeatureSection = {
  kicker: string;
  title: string;
  body: React.ReactNode;
  points?: string[];
  img?: { src: string; alt: string; caption?: string };
  /** A coded visual instead of a screenshot (e.g. a product panel). */
  visual?: React.ReactNode;
};

export type FeaturePageProps = {
  path: string;
  crumb: string;
  seoTitle: string;
  seoDescription: string;
  kicker: string;
  title: string;
  lead: string;
  hero: { src: string; alt: string; caption?: string } | { visual: React.ReactNode; caption?: string };
  sections: FeatureSection[];
  related: [string, string, string][];
  faqs: { q: string; a: string }[];
  faqTitle: string;
  close: { title: string; body: string };
  /** Optional block after the sections, e.g. plans. */
  extra?: React.ReactNode;
};

/** A platform screenshot. On phones a full app screen shrunk to 360px is
    unreadable, so it keeps a readable minimum width and scrolls sideways. */
export const Shot: React.FC<{ src: string; alt: string; caption?: string; eager?: boolean }> = ({ src, alt, caption, eager }) => (
  <figure className="m-0">
    <div className="rounded-[16px] overflow-hidden border border-border bg-card shadow-[0_24px_48px_-28px_rgba(15,16,18,.28)]">
      <div className="overflow-x-auto overscroll-x-contain [scrollbar-width:thin]" tabIndex={0} role="group" aria-label={alt}>
        <img src={src} alt={alt} className="block w-full min-w-[680px] md:min-w-0 h-auto" loading={eager ? "eager" : "lazy"} />
      </div>
    </div>
    <figcaption className="mt-3 text-xs text-muted-foreground">
      {caption}
      <span className="md:hidden">{caption ? " " : ""}Swipe to see the full screen.</span>
    </figcaption>
  </figure>
);

export const FeaturePage: React.FC<FeaturePageProps> = (p) => (
  <>
    <SEO
      title={p.seoTitle}
      description={p.seoDescription}
      canonical={p.path}
      jsonLd={[
        faqLd(p.faqs),
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://beta-ads.no/" },
            { "@type": "ListItem", position: 2, name: p.crumb, item: `https://beta-ads.no${p.path}` },
          ],
        },
      ]}
    />

    <div className="min-h-screen bg-background text-foreground">
      <header className={`${W} pt-28 md:pt-36 pb-12 md:pb-16`}>
        <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-muted-foreground">
          <ol className="m-0 p-0 list-none flex items-center gap-2">
            <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">{p.crumb}</li>
          </ol>
        </nav>
        <div className={`${kicker} mb-5`}>{p.kicker}</div>
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-end">
          <div>
            <h1 className="text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.2rem] font-bold tracking-[-0.03em] max-w-4xl m-0">{p.title}</h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">{p.lead}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:pb-2">
            <PrimaryBtn href={BOOKING_URL} cta="book">Book a demo</PrimaryBtn>
            <GhostBtn href={SALES_MAIL} cta="email">sales@beta-ads.no</GhostBtn>
          </div>
        </div>
      </header>

      <section className={W} aria-label={p.crumb}>
        {"src" in p.hero ? (
          <Shot src={p.hero.src} alt={p.hero.alt} caption={p.hero.caption} eager />
        ) : (
          <figure className="m-0">
            {p.hero.visual}
            {p.hero.caption && <figcaption className="mt-3 text-xs text-muted-foreground">{p.hero.caption}</figcaption>}
          </figure>
        )}
      </section>

      {p.sections.map((s, i) => s.visual ? (
        /* Coded panels are built for the full content width: squeezed into half
           a column they stack and grow far taller than the text beside them. */
        <section key={s.title} className={`border-t border-border py-16 md:py-24 ${i === 0 ? "mt-16 md:mt-24" : ""}`}>
          <div className={W}>
            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 lg:gap-16 items-end">
              <div>
                <div className={`${kicker} mb-4`}>{s.kicker}</div>
                <h2 className={h2}>{s.title}</h2>
              </div>
              <div>
                <div className="text-muted-foreground leading-relaxed max-w-xl">{s.body}</div>
                {s.points && (
                  <ul className="mt-5 m-0 p-0 list-none max-w-xl">
                    {s.points.map((pt) => (
                      <li key={pt} className="border-t border-border py-3 text-[15px]">{pt}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="fp-wide mt-10 md:mt-12 min-w-0">{s.visual}</div>
          </div>
        </section>
      ) : (
        <section key={s.title} className={`border-t border-border py-16 md:py-24 ${i === 0 ? "mt-16 md:mt-24" : ""}`}>
          <div className={`${W} grid lg:grid-cols-2 gap-10 lg:gap-16 items-center`}>
            <div className={i % 2 ? "lg:order-2" : ""}>
              <div className={`${kicker} mb-4`}>{s.kicker}</div>
              <h2 className={h2}>{s.title}</h2>
              <div className="mt-5 text-muted-foreground leading-relaxed max-w-xl">{s.body}</div>
              {s.points && s.img && (
                <ul className="mt-6 m-0 p-0 list-none max-w-xl">
                  {s.points.map((pt) => (
                    <li key={pt} className="border-t border-border py-3 text-[15px]">{pt}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className={`min-w-0 ${i % 2 ? "lg:order-1" : ""}`}>
              {s.img ? (
                <Shot {...s.img} />
              ) : (
                /* No visual: the points take the right-hand column. */
                <ol className="m-0 p-0 list-none">
                  {s.points?.map((pt) => (
                    <li key={pt} className="border-t border-border py-4 text-lg font-semibold tracking-tight">{pt}</li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </section>
      ))}

      {p.extra}

      <section className="border-t border-border py-16 md:py-20">
        <div className={`${W} grid sm:grid-cols-3 gap-x-10 gap-y-6`}>
          {p.related.map(([t, d, to]) => (
            <Link key={to} to={to} className="group border-t border-border pt-5">
              <span className="text-lg font-semibold tracking-tight">{t} <span aria-hidden="true" className="text-muted-foreground group-hover:text-foreground transition-colors">&rarr;</span></span>
              <p className="mt-1.5 mb-0 text-[15px] leading-relaxed text-muted-foreground">{d}</p>
            </Link>
          ))}
        </div>
      </section>

      <Faq title={p.faqTitle} faqs={p.faqs} />

      <section className="border-t border-border py-16 md:py-24">
        <div className={`${W} flex flex-col md:flex-row md:items-end md:justify-between gap-8`}>
          <div className="max-w-2xl">
            <h2 className={h2}>{p.close.title}</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{p.close.body}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <PrimaryBtn href={BOOKING_URL} cta="book">Book a demo</PrimaryBtn>
            <GhostBtn href={SALES_MAIL} cta="email">sales@beta-ads.no</GhostBtn>
          </div>
        </div>
      </section>
    </div>
  </>
);
