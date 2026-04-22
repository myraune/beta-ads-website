import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { SPFooter } from "@/components/sections/SPFooter";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const serifFont = { fontFamily: "'Instrument Serif', serif" };

/**
 * Dedicated Norwegian-market landing page — serves as the geo-targeted hub
 * for Norwegian organic traffic, Norwegian paid-search landings, and the
 * x-default fallback for Google's hreflang graph. Content is fully in
 * Norwegian (bokmål) so the page reads as native to the local market rather
 * than as a translated English page.
 */

const stats = [
  { value: "39 000+", label: "Aktive norske streamere" },
  { value: "800 000+", label: "Verifiserte visninger (Samsung)" },
  { value: "2.93%", label: "CTR — Galaxy S25 Ultra" },
  { value: "0%", label: "Adblock-impact" },
];

const norwegianCaseStudies = [
  {
    brand: "Samsung",
    slug: "/case-study/samsung",
    tagline: "Galaxy S25 Ultra + Z Fold7",
    headline: "800 000+ visninger · 2.34–2.93% CTR",
    accent: "#1428A0",
    logo: "/lovable-uploads/icon-samsung.svg",
    logoInvert: true,
  },
  {
    brand: "Shure",
    slug: "/case-study/shure",
    tagline: "MV6 lansering på detoo",
    headline: "182 554 visninger · 2 378 verifiserte klikk",
    accent: "#E30613",
    logo: "/lovable-uploads/logo-shure.png",
    logoInvert: true,
  },
  {
    brand: "Komplett",
    slug: "/case-study/komplett",
    tagline: "Retail-kampanje",
    headline: "151 278 visninger · 4.48% peak-day CTR · 34 streamere",
    accent: "#E30613",
    logo: "/lovable-uploads/logo-komplett.png",
    logoInvert: true,
  },
  {
    brand: "Høyskolen Kristiania",
    slug: "/case-study/kristiania",
    tagline: "Rekruttering + avstemning (to parallelle kampanjer)",
    headline: "599 252 visninger kombinert · 5 997 klikk",
    accent: "#E30613",
    logo: "/lovable-uploads/logo-kristiania-mark.svg",
    logoInvert: false,
  },
  {
    brand: "NKI",
    slug: "/case-study/nki",
    tagline: "Interaktiv quiz — «Hva slags type student er du?»",
    headline: "220 003 visninger · 1 595 klikk · 19 streamere",
    accent: "#5C2D56",
    logo: "/lovable-uploads/logo-nki.svg",
    logoInvert: false,
  },
  {
    brand: "Gokstad Akademiet",
    slug: "/case-study/gokstad",
    tagline: "Studentrekruttering høst 2026",
    headline: "100 000+ visninger · 1.22% CTR · 22 skapere",
    accent: "#b8212e",
    logo: "/lovable-uploads/logo-gokstad.webp",
    logoInvert: false,
  },
  {
    brand: "Saily",
    slug: "/case-study/saily",
    tagline: "eSIM-launch — reisepublikum",
    headline: "102 794 visninger · 1.08% verifisert CTR",
    accent: "#7B4DFF",
    logo: "/lovable-uploads/logo-saily.png",
    logoInvert: true,
  },
];

const norwegianBlogPosts = [
  {
    slug: "twitch-annonsering-norge-guide",
    title: "Twitch-annonsering i Norge: Komplett Guide 2026",
    desc: "Alt du trenger å vite om å annonsere på Twitch i det norske markedet.",
  },
  {
    slug: "norges-storste-streamer-merkevare-samarbeid",
    title: "Norges største Twitch-streamer jobber med Shure og Samsung",
    desc: "detoo topper TwitchTracker. Slik ser et ekte streamer-merkevare-samarbeid ut.",
  },
  {
    slug: "gaming-markedsforing-forste-kampanje-guide",
    title: "Gaming-markedsføring for merkevarer: Slik lager du din første Twitch-kampanje",
    desc: "Fra brief til live-publisering — en steg-for-steg-guide.",
  },
  {
    slug: "medieplanlegging-twitch-nordisk-mediemiks",
    title: "Medieplanlegging for Twitch: Integrer livestreaming i mediemiksen",
    desc: "Hvor passer livestream inn — og hvordan beregner du effekt mot TV, YouTube og display?",
  },
  {
    slug: "merkevarer-utenfor-gaming-twitch-annonsering",
    title: "Merkevarer utenfor gaming: Hvorfor FMCG, finans og retail lykkes på Twitch",
    desc: "Det er ikke bare gaming-brands som ser resultater.",
  },
  {
    slug: "overlay-ads-kreativ-design-beste-praksis",
    title: "Slik designer du overlay ads som fungerer",
    desc: "Kreativt rammeverk for native Twitch-annonsering.",
  },
];

const Norge: React.FC = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: casesRef, isVisible: casesVisible } = useScrollAnimation();
  const { ref: blogRef, isVisible: blogVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen">
      <SEO
        title="Twitch-annonsering Norge | Beta Ads"
        description="Native Twitch-annonsering for norske merkevarer. Samsung, Shure, Komplett, Kristiania og NKI har kjørt verifiserte kampanjer gjennom Beta Ads på tvers av 39 000+ aktive norske streamere. Bestill en 20-minutters konsultasjon."
        canonical="/norge"
        locale="no"
        alternates={[
          { hreflang: "no", href: "/norge" },
          { hreflang: "en", href: "/" },
          { hreflang: "x-default", href: "/" },
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Twitch-annonsering i Norge — Beta Ads",
            description:
              "Norsk markeds-landingsside for native Twitch-annonsering. Verifiserte kampanjer for Samsung, Shure, Komplett, Kristiania og NKI.",
            url: "https://beta-ads.no/norge",
            inLanguage: "no",
            isPartOf: { "@id": "https://beta-ads.no/#website" },
            about: { "@id": "https://beta-ads.no/#organization" },
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Native Twitch-annonsering for norske merkevarer",
            serviceType: "Livestream advertising",
            provider: { "@id": "https://beta-ads.no/#organization" },
            areaServed: { "@type": "Country", name: "Norway" },
            inLanguage: "no",
          },
        ]}
      />

      {/* ── HERO ── */}
      <section className="relative">
        <div
          className="absolute inset-x-0 top-0 h-px z-[2]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, hsl(var(--primary)) 50%, transparent 100%)",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-x-0 top-0 h-[500px] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 30% 0%, hsl(var(--primary) / 0.08), transparent 70%)",
          }}
          aria-hidden
        />
        <div
          ref={heroRef}
          className={`relative max-w-7xl mx-auto px-6 lg:px-12 pt-32 lg:pt-44 pb-20 lg:pb-28 transition-all duration-1000 ease-out ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-[11px] uppercase tracking-[0.22em] text-primary mb-6 font-semibold">
            Norge · Twitch-annonsering
          </p>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl leading-[1.04] tracking-tight text-foreground mb-10 max-w-4xl"
            style={serifFont}
          >
            Native Twitch-annonsering{" "}
            <span className="italic text-primary">for norske merkevarer</span>.
          </h1>
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-16 max-w-5xl">
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Samsung, Shure, Komplett, Høyskolen Kristiania, NKI og Gokstad
              Akademiet har alle kjørt Twitch-kampanjer gjennom Beta Ads med
              verifisert rapportering på visninger og klikk. Vi kjører native
              overlay-annonser på 39 000+ aktive norske streamere — kampanjer
              som også overlever adblock.
            </p>
            <p className="text-lg lg:text-xl text-muted-foreground/70 leading-relaxed">
              Det norske 18–34-segmentet ser mer Twitch per dag enn de ser
              lineær-TV. Vi er den eneste plattformen bygget for å levere den
              målgruppen native inne i selve streamen — uten ekstern video-
              pre-roll som blir skippet eller blokkert.
            </p>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-5">
            <a
              href="https://calendar.app.google/coW5NLQJtLxfRer19"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-white hover:bg-primary/90 px-7 h-12 rounded-full text-sm font-medium tracking-wide transition-colors"
            >
              Bestill en 20-minutters konsultasjon{" "}
              <ArrowRight size={14} />
            </a>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground text-sm tracking-wide transition-colors"
            >
              Se alle publiserte kampanjer <ArrowRight size={14} />
            </Link>
          </div>

          {/* Stat strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-foreground/[0.08] mt-16">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`py-6 pr-4 ${
                  i > 0 ? "md:pl-6 md:border-l border-foreground/[0.08]" : ""
                }`}
              >
                <div className="text-3xl lg:text-4xl font-light text-foreground tracking-tight mb-1.5">
                  {s.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section className="relative border-t border-foreground/[0.06]">
        <div
          ref={casesRef}
          className={`max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32 transition-all duration-1000 ${
            casesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-[11px] uppercase tracking-[0.22em] text-primary mb-4 font-semibold">
            Publiserte kampanjer
          </p>
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-foreground mb-14 max-w-2xl">
            Sju verifiserte norske kampanjer
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {norwegianCaseStudies.map((c) => (
              <Link
                key={c.slug}
                to={c.slug}
                className="group flex flex-col rounded-2xl border border-foreground/[0.08] bg-card hover:border-foreground/20 p-7 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div
                  className="flex items-center justify-center h-14 w-14 rounded-xl border mb-6"
                  style={{
                    borderColor: `${c.accent}33`,
                    boxShadow: `0 0 0 1px ${c.accent}1a`,
                  }}
                >
                  <img
                    src={c.logo}
                    alt={c.brand}
                    className="max-h-8 max-w-10 object-contain"
                    style={
                      c.logoInvert ? { filter: "brightness(0) invert(1) opacity(0.85)" } : undefined
                    }
                  />
                </div>
                <p
                  className="text-[11px] font-semibold tracking-[0.18em] uppercase mb-2"
                  style={{ color: c.accent }}
                >
                  {c.brand}
                </p>
                <h3 className="text-lg font-medium text-foreground mb-2 tracking-tight">
                  {c.tagline}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {c.headline}
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-medium text-foreground/70 group-hover:text-primary group-hover:gap-3 transition-all mt-auto">
                  Les hele analysen <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section className="relative border-t border-foreground/[0.06]">
        <div
          ref={blogRef}
          className={`max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32 transition-all duration-1000 ${
            blogVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-[11px] uppercase tracking-[0.22em] text-primary mb-4 font-semibold">
            Norsk innhold
          </p>
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-foreground mb-14 max-w-2xl">
            Guider og innsikt på norsk
          </h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {norwegianBlogPosts.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="group border-t border-foreground/[0.08] pt-6 hover:border-foreground/20 transition-colors"
              >
                <h3 className="text-base lg:text-lg font-medium text-foreground leading-tight mb-2 group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {p.desc}
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-medium text-foreground/70 group-hover:text-primary group-hover:gap-3 transition-all">
                  Les innlegget <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-12">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all duration-300"
            >
              Se hele bloggen <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative border-t border-foreground/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.22em] text-primary mb-4 font-semibold">
                Kom i gang
              </p>
              <h2
                className="text-3xl lg:text-4xl font-light tracking-tight text-foreground"
                style={serifFont}
              >
                Skal du kjøre en norsk Twitch-kampanje i 2026?
              </h2>
              <p className="text-base text-muted-foreground mt-6 leading-relaxed">
                Typiske kampanjer starter på 5 000–50 000 € per runde. Vi
                booker 4–6 uker i forveien i de mest ettertraktede vinduene
                (Black Friday, Nordic Game, juleuka). Bestill en
                20-minutters konsultasjon så tar vi en gjennomgang av
                kategori, brief og anslått CTR-bånd.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://calendar.app.google/coW5NLQJtLxfRer19"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white hover:bg-primary/90 px-8 h-12 rounded-full text-sm font-medium tracking-wide transition-colors"
              >
                Bestill samtale <ArrowRight size={14} />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground border border-foreground/15 px-8 h-12 rounded-full text-sm font-medium tracking-wide transition-colors"
              >
                Kontakt oss
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SPFooter />
    </div>
  );
};

export default Norge;
