import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import AnimatedShaderBackground from "@/components/ui/lazy-animated-background";
import {
  AGE_18_34,
  CONTENT_MIX,
  EUROPE_SHARE,
  KICK_ALTERNATES,
  KICK_COPY,
  KICK_GREEN,
  KICK_LANGS,
  KICK_LANG_NAMES,
  KICK_OG,
  KICK_ROUTES,
  KICK_AGES,
  LANGUAGES,
  MARKET_SHARE,
  type KickLang,
} from "@/data/kickAds";

/**
 * Kick advertising, one component for five languages.
 *
 * The page is built on Kick's own 2026 media kit. The argument is a single
 * number, Kick's 20.0 percent share of Kick + Twitch hours in Northern Europe,
 * and everything else on the page exists to make that number credible: where
 * it sits against the global picture, who the viewers are, what they watch,
 * what Kick sells, what we sell, and the honest caveat that Nordic languages
 * are still a rounding error in Kick's audience.
 *
 * Every chart is drawn at true percentage width against a visible track, so a
 * 20 percent bar looks like 20 percent. Kick green is used only on Kick's own
 * numbers; the brand red stays on our calls to action.
 */

const serif = { fontFamily: "'Instrument Serif', serif" };
const MASCOT = "/lovable-uploads/beta-mascot-kick.jpg";
const KICK_LOGO = "/lovable-uploads/platform-kick.png";
const HOME_FIGURE = "/lovable-uploads/kick/kick-home-categories.webp";

const fmt = (lang: KickLang, n: number) =>
  lang === "en" ? n.toFixed(1) : n.toFixed(1).replace(".", ",");

/* Horizontal bar at true percentage width. */
const Bar: React.FC<{
  label: string;
  pct: number;
  lang: KickLang;
  highlight?: boolean;
  muted?: boolean;
  suffix?: string;
}> = ({ label, pct, lang, highlight, muted, suffix = "%" }) => (
  <div className="grid grid-cols-[minmax(0,12rem)_1fr_auto] items-center gap-3 py-2">
    <span className={`text-sm truncate ${highlight ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
      {label}
    </span>
    <div className="h-2.5 rounded-full bg-foreground/[0.07] overflow-hidden">
      <div
        className={`h-full rounded-full ${muted ? "bg-foreground/25" : highlight ? "" : "bg-foreground/60"}`}
        style={{ width: `${pct}%`, ...(highlight ? { background: KICK_GREEN } : {}) }}
      />
    </div>
    <span className={`text-sm tabular-nums w-14 text-right ${highlight ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
      {fmt(lang, pct)}{suffix}
    </span>
  </div>
);

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">{children}</span>
);

const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">{children}</h2>
);

const Reveal: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
};

const KickAdvertising: React.FC<{ lang?: KickLang }> = ({ lang = "en" }) => {
  const t = KICK_COPY[lang];
  const route = KICK_ROUTES[lang];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: t.seoTitle,
      description: t.seoDescription,
      url: `https://beta-ads.no${route}`,
      inLanguage: lang === "no" ? "nb" : lang,
      about: { "@type": "Thing", name: "Kick (streaming platform)" },
      publisher: { "@type": "Organization", name: "Beta Ads", url: "https://beta-ads.no" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: t.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <MarketingPageLayout
      seo={{
        title: t.seoTitle,
        description: t.seoDescription,
        canonical: route,
        locale: lang,
        alternates: KICK_ALTERNATES,
        ogImage: KICK_OG[lang],
        jsonLd,
      }}
      cta={{
        heading: t.cta.heading,
        subtext: t.cta.subtext,
        primaryLabel: t.cta.primary,
        primaryHref: "/demo",
        secondaryLabel: t.cta.secondary,
        secondaryHref: "/pricing",
      }}
    >
      {/* Hero */}
      <section className="relative overflow-hidden bg-[hsl(240_11%_5%)]">
        <AnimatedShaderBackground heightFactor={0.85} />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent z-[1] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-24">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/80 backdrop-blur-sm mb-7">
                <img src={KICK_LOGO} alt="" className="h-3.5 w-auto" width={3840} height={2160} />
                {t.hero.badge}
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
                <span style={serif} className="italic font-normal">{t.hero.h1Accent}</span>
                <br />
                {t.hero.h1Rest}
              </h1>
              <p className="text-lg text-white/65 leading-relaxed mb-10 max-w-lg">{t.hero.sub}</p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12">
                  <Link to="/demo">
                    {t.hero.primary} <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="ghost" className="text-white hover:bg-white/10 rounded-full px-8 h-12 border border-white/20">
                  <Link to="/kick-advertising-cost">{t.hero.secondary}</Link>
                </Button>
              </div>
            </div>
            <figure className="m-0 lg:justify-self-end w-full max-w-xl">
              <img
                src={MASCOT}
                alt="Beta, the Beta Ads mascot, streaming in front of two green Kick monitors"
                width={1200}
                height={685}
                className="w-full h-auto rounded-2xl ring-1 ring-white/10"
                loading="eager"
              />
            </figure>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-20 border border-white/10 rounded-2xl overflow-hidden bg-white/10">
            {t.hero.stats.map((s) => (
              <div key={s.label} className="bg-black/30 backdrop-blur-sm px-6 py-5">
                <div className="text-2xl font-bold text-white tracking-tight tabular-nums">{s.value}</div>
                <div className="text-xs text-white/50 mt-0.5 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market share: global and Europe */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-[0.8fr_1.2fr] gap-16 items-start">
          <div className="max-w-xl">
            <Label>{t.share.label}</Label>
            <H2>{t.share.heading}</H2>
            {t.share.body.map((p) => (
              <p key={p} className="text-base md:text-lg font-light leading-relaxed text-muted-foreground mb-5">{p}</p>
            ))}
          </div>
          <Reveal className="space-y-12">
            <div>
              <h3 className="text-base font-semibold text-foreground mb-4">{t.share.globalTitle}</h3>
              {MARKET_SHARE.map((m) => (
                <Bar key={m.name} lang={lang} label={m.name} pct={m.pct} highlight={m.name === "Kick"} />
              ))}
              <p className="text-xs text-muted-foreground mt-4">{t.share.globalNote}</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground mb-4">{t.share.europeTitle}</h3>
              {EUROPE_SHARE.map((r) => (
                <Bar key={r.key} lang={lang} label={t.share.regions[r.key]} pct={r.pct} highlight={r.key === "northern"} muted={r.key === "europe"} />
              ))}
              <p className="text-xs text-muted-foreground mt-4">{t.share.europeNote}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Audience */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-start">
          <div>
            <div className="max-w-xl">
              <Label>{t.audience.label}</Label>
              <H2>{t.audience.heading}</H2>
              {t.audience.body.map((p) => (
                <p key={p} className="text-base md:text-lg font-light leading-relaxed text-muted-foreground mb-5">{p}</p>
              ))}
            </div>
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-8 mt-12 max-w-2xl">
              {t.audience.engagement.map((e) => (
                <div key={e.label} className="border-t border-border pt-4 flex flex-col-reverse">
                  <dt className="text-xs text-muted-foreground">{e.label}</dt>
                  <dd className="text-2xl font-bold tracking-tight text-foreground tabular-nums m-0">{e.value}</dd>
                </div>
              ))}
            </dl>
            <p className="text-xs text-muted-foreground mt-4">{t.audience.engagementNote}</p>
          </div>
          <Reveal>
            <h3 className="text-base font-semibold text-foreground mb-4">{t.audience.chartTitle}</h3>
            {AGE_18_34.map((a) => (
              <Bar key={a.name} lang={lang} label={"key" in a ? t.audience.tv : a.name} pct={a.pct} highlight={a.name === "Kick"} />
            ))}
            <p className="text-xs text-muted-foreground mt-4 mb-12">{t.audience.chartNote}</p>

            <h3 className="text-base font-semibold text-foreground mb-4">{t.audience.splitTitle}</h3>
            <div className="flex h-3 rounded-full overflow-hidden bg-foreground/[0.07]">
              {KICK_AGES.map((a, i) => (
                <div
                  key={a.label}
                  style={{ width: `${a.pct}%`, background: KICK_GREEN, opacity: 1 - i * 0.22 }}
                  title={`${a.label}: ${fmt(lang, a.pct)}%`}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
              {KICK_AGES.map((a, i) => (
                <span key={a.label} className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ background: KICK_GREEN, opacity: 1 - i * 0.22 }} />
                  {a.label} <span className="tabular-nums text-foreground">{fmt(lang, a.pct)}%</span>
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Content mix */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-[0.8fr_1.2fr] gap-16 items-start">
          <div className="max-w-xl">
            <Label>{t.content.label}</Label>
            <H2>{t.content.heading}</H2>
            <p className="text-base md:text-lg font-light leading-relaxed text-muted-foreground mb-10">{t.content.body}</p>
            <dl className="m-0">
              {CONTENT_MIX.map((c) => (
                <div key={c.key} className="border-t border-border py-5 grid grid-cols-[4.5rem_1fr] gap-4">
                  <dt className="text-2xl font-bold tracking-tight tabular-nums text-foreground m-0">
                    {c.key === "sport" ? "~" : ""}{c.pct}%
                  </dt>
                  <dd className="m-0">
                    <div className="text-base font-semibold text-foreground">{t.content.rows[c.key].title}</div>
                    <p className="text-sm leading-relaxed text-muted-foreground mt-1 mb-0">{t.content.rows[c.key].desc}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <Reveal>
            <figure className="m-0">
              <img
                src={HOME_FIGURE}
                alt="Kick's front page showing the Top Live Categories row: Grand Theft Auto V with 203.6K watching, Just Chatting 167.8K, Slots and Casino 81.1K, IRL 58.2K, League of Legends 43.1K, PUBG Mobile 42.9K, Pummel Party 36.4K, and a green homepage banner underneath"
                width={1152}
                height={472}
                loading="lazy"
                className="w-full h-auto rounded-2xl ring-1 ring-border"
              />
              <figcaption className="text-xs text-muted-foreground mt-3 leading-relaxed">{t.content.figureCaption}</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Two routes */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <Label>{t.routes.label}</Label>
            <H2>{t.routes.heading}</H2>
            <p className="text-base md:text-lg font-light leading-relaxed text-muted-foreground">{t.routes.intro}</p>
          </div>

          <Reveal className="grid lg:grid-cols-2 gap-16 mt-16">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{t.routes.kick.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground mb-8 max-w-xl">{t.routes.kick.lead}</p>
              <dl className="m-0">
                {t.routes.kick.formats.map((f) => (
                  <div key={f.name} className="border-t border-border py-5">
                    <dt className="text-base font-semibold text-foreground">{f.name}</dt>
                    <dd className="m-0 mt-1">
                      <p className="text-sm leading-relaxed text-muted-foreground m-0">{f.desc}</p>
                      <p className="text-xs font-mono text-muted-foreground/80 mt-2 m-0">{f.spec}</p>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="text-sm leading-relaxed text-muted-foreground mt-6 border-t border-border pt-6">{t.routes.kick.buying}</p>
              <p className="text-sm text-muted-foreground mt-2">{t.routes.kick.contact}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{t.routes.beta.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground mb-8 max-w-xl">{t.routes.beta.lead}</p>
              <dl className="m-0">
                {t.routes.beta.formats.map((f) => (
                  <div key={f.name} className="border-t border-border py-5">
                    <dt className="text-base font-semibold text-foreground">{f.name}</dt>
                    <dd className="m-0 mt-1 text-sm leading-relaxed text-muted-foreground">{f.desc}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-sm leading-relaxed text-muted-foreground mt-6 border-t border-border pt-6">{t.routes.beta.network}</p>
              <Link to="/demo" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4 mt-4">
                {t.routes.beta.cta} <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>

          <p className="text-base md:text-lg font-light leading-relaxed text-foreground max-w-2xl mt-16 border-t border-border pt-10">
            {t.routes.verdict}
          </p>
        </div>
      </section>

      {/* Brand safety */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <Label>{t.safety.label}</Label>
            <H2>{t.safety.heading}</H2>
            <p className="text-base md:text-lg font-light leading-relaxed text-muted-foreground">{t.safety.body}</p>
          </div>

          <Reveal className="grid sm:grid-cols-2 lg:grid-cols-4 mt-14 border-y border-border divide-y sm:divide-y-0 sm:divide-x divide-border">
            {t.safety.tiers.map((tier) => (
              <div key={tier.name} className="py-6 sm:px-6 first:sm:pl-0 last:sm:pr-0">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-base font-semibold text-foreground">{tier.name}</span>
                  <span className="text-xs font-mono text-muted-foreground">{tier.rating}</span>
                </div>
                {tier.note && <span className="text-xs font-semibold tracking-widest uppercase text-primary block mt-1">{tier.note}</span>}
                <p className="text-sm leading-relaxed text-muted-foreground mt-3 mb-0">{tier.desc}</p>
              </div>
            ))}
          </Reveal>

          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-16 mt-16 items-start">
            <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-8 m-0">
              {t.safety.systems.map((s) => (
                <div key={s.title}>
                  <dt className="text-base font-semibold text-foreground">{s.title}</dt>
                  <dd className="m-0 mt-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</dd>
                </div>
              ))}
            </dl>
            <div className="max-w-xl">
              <p className="text-base font-light leading-relaxed text-foreground">{t.safety.betaNote}</p>
              <Link to="/campaign-compliance" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4 mt-4">
                {t.safety.betaLink} <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Moments */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <Label>{t.moments.label}</Label>
            <H2>{t.moments.heading}</H2>
          </div>
          <Reveal className="grid md:grid-cols-2 gap-12 mt-10">
            {t.moments.items.map((m) => (
              <article key={m.title} className="border-t border-border pt-6">
                <time className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">{m.date}</time>
                <h3 className="text-2xl font-light tracking-tight text-foreground mt-2 mb-3">{m.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground max-w-xl">{m.desc}</p>
                {m.link && (
                  <Link to={m.link.href} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4 mt-4">
                    {m.link.label} <ArrowUpRight className="w-4 h-4" />
                  </Link>
                )}
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Honest part */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-start">
          <div className="max-w-xl">
            <Label>{t.honest.label}</Label>
            <H2>{t.honest.heading}</H2>
            {t.honest.body.map((p) => (
              <p key={p} className="text-base md:text-lg font-light leading-relaxed text-muted-foreground mb-5">{p}</p>
            ))}
          </div>
          <Reveal>
            <h3 className="text-base font-semibold text-foreground mb-4">{t.honest.chartTitle}</h3>
            {LANGUAGES.map((l) => (
              <Bar key={l.key} lang={lang} label={t.honest.languages[l.key]} pct={l.pct} highlight={l.key === "other"} />
            ))}
            <p className="text-xs text-muted-foreground mt-4">{t.honest.chartNote}</p>
          </Reveal>
        </div>
      </section>

      {/* FAQ + sources + languages */}
      <section className="border-t border-border py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-start">
          <div>
            <Label>FAQ</Label>
            <div className="max-w-2xl">
              {t.faq.map((f) => (
                <details key={f.q} className="group border-b border-border last:border-b-0">
                  <summary className="flex items-center justify-between py-5 cursor-pointer text-sm font-medium text-foreground hover:text-primary transition-colors select-none">
                    {f.q}
                    <ArrowRight className="w-4 h-4 shrink-0 ml-4 transition-transform group-open:rotate-90 text-muted-foreground" />
                  </summary>
                  <div className="pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</div>
                </details>
              ))}
            </div>
          </div>
          <div>
            <Label>{t.sources.label}</Label>
            <p className="text-sm leading-relaxed text-muted-foreground mb-4">{t.sources.intro}</p>
            <ol className="list-decimal pl-5 m-0 space-y-2">
              {t.sources.items.map((s) => (
                <li key={s} className="text-sm leading-relaxed text-muted-foreground">{s}</li>
              ))}
            </ol>
            <div className="mt-10 border-t border-border pt-6">
              <span className="text-xs text-muted-foreground block mb-3">{t.otherLanguages}</span>
              <nav className="flex flex-wrap gap-x-5 gap-y-2">
                {KICK_LANGS.filter((l) => l !== lang).map((l) => (
                  <Link key={l} to={KICK_ROUTES[l]} hrefLang={l} className="text-sm font-medium text-foreground hover:text-primary underline-offset-4 hover:underline">
                    {KICK_LANG_NAMES[l]}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default KickAdvertising;
