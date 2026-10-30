import React from "react";
import { brandInk } from "@/lib/brandInk";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MascotBand } from "@/components/sections/MascotBand";


/**
 * Dedicated Norwegian-market landing page - serves as the geo-targeted hub
 * for Norwegian organic traffic, Norwegian paid-search landings, and the
 * x-default fallback for Google's hreflang graph. Content is fully in
 * Norwegian (bokmål) so the page reads as native to the local market rather
 * than as a translated English page.
 */

const stats = [
  { value: "39 000+", label: "Streamere i Streamer Explorer" },
  { value: "800 000+", label: "Verifiserte visninger (Samsung)" },
  { value: "2,4M+", label: "Visninger i publiserte caser" },
  { value: "0%", label: "Adblock-impact" },
];

const norwegianCaseStudies = [
  {
    brand: "Samsung",
    slug: "/case-study/samsung",
    tagline: "Galaxy S25 Ultra + Z Fold7",
    headline: "800 185 fullførte live-visninger · 71 streamer-slots",
    accent: "#1428A0",
    logo: "/lovable-uploads/logo-samsung.png",
  },
  {
    brand: "Shure",
    slug: "/case-study/shure",
    tagline: "MV6 lansering på detoo",
    headline: "182 554 visninger · 2 378 verifiserte klikk",
    accent: "#E30613",
    logo: "/lovable-uploads/logo-shure.png",
  },
  {
    brand: "Komplett",
    slug: "/case-study/komplett",
    tagline: "Retail-kampanje",
    headline: "151 278 visninger · 4,48 % CTR på beste dag · 34 streamere",
    accent: "#E30613",
    logo: "/lovable-uploads/logo-komplett.png",
  },
  {
    brand: "Høyskolen Kristiania",
    slug: "/case-study/kristiania",
    tagline: "Rekruttering + avstemning (to parallelle kampanjer)",
    headline: "599 252 visninger kombinert · 5 997 klikk",
    accent: "#E30613",
    logo: "/lovable-uploads/logo-kristiania-mark.svg",
  },
  {
    brand: "NKI",
    slug: "/case-study/nki",
    tagline: "Interaktiv quiz - «Hva slags type student er du?»",
    headline: "220 003 visninger · 1 595 klikk · 19 streamere",
    accent: "#5C2D56",
    logo: "/lovable-uploads/logo-nki.svg",
  },
  {
    brand: "Gokstad Akademiet",
    slug: "/case-study/gokstad",
    tagline: "Studentrekruttering høst 2026",
    headline: "100 000+ visninger · 1.22% CTR · 22 skapere",
    accent: "#b8212e",
    logo: "/lovable-uploads/logo-gokstad.webp",
  },
  {
    brand: "Saily",
    slug: "/case-study/saily",
    tagline: "Reisekampanje for eSIM",
    headline: "102 794 visninger · 53 229 unike seere",
    accent: "#7B4DFF",
    logo: "/lovable-uploads/logo-saily.png",
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
    slug: "clip-analytics-ad-verification-nordic-streaming-no",
    title: "Slik verifiserer vi hver annonsevisning",
    desc: "Clip Analytics sjekker levering, brand safety og merkeomtaler på Twitch, YouTube og Kick.",
  },
  {
    slug: "how-to-brief-streamer-native-ad-integration-2026-no",
    title: "Slik briefer du en streamer for en nativ annonse",
    desc: "Briefen avgjør om kampanjen føles ekte eller tvunget. Slik skriver du en som fungerer.",
  },
  {
    slug: "norske-twitch-streamere-2026",
    title: "Norske Twitch-streamere du bør kjenne til i 2026",
    desc: "Fra MrSavage og Knut til detoo, Emzia og Klokkismann.",
  },
  {
    slug: "gta-vi-nordisk-merkevareguide",
    title: "GTA VI: guide for nordiske merkevarer",
    desc: "Hva GTA VI er før du planlegger rundt lanseringen 19. november.",
  },
];

const Norge: React.FC = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: casesRef, isVisible: casesVisible } = useScrollAnimation();
  const { ref: blogRef, isVisible: blogVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen">
      <SEO
        title="Twitch-byrå og Twitch-annonsering i Norge | Beta Ads"
        description="Twitch-annonsering for norske merkevarer. Samsung, Shure, Komplett og NKI har kjørt kampanjer via Beta Ads, med streamere fra 39 000+ i Streamer Explorer."
        canonical="/norge"
        locale="no"
        ogImageAlt="Beta Ads - native Twitch-annonsering for norske merkevarer"
        alternates={[
          { hreflang: "no", href: "/norge" },
          { hreflang: "en", href: "/" },
          { hreflang: "x-default", href: "/" },
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Twitch-annonsering i Norge - Beta Ads",
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
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            inLanguage: "no",
            mainEntity: [
              { "@type": "Question", name: "Hva koster en Twitch-kampanje i Norge?", acceptedAnswer: { "@type": "Answer", text: "Kampanjer starter på 100 000 kr. Du betaler per 1 000 visninger som faktisk ble spilt av, og visninger som ikke ble levert, får du tilbake." } },
              { "@type": "Question", name: "Hvordan fungerer overlay-annonsering på Twitch?", acceptedAnswer: { "@type": "Answer", text: "Overlay-annonser er grafiske elementer som vises direkte i streamen, ikke som en pause eller avbrudd. De vises som en del av innholdet og omgår adblock helt. Seere ser annonsen mens de ser på favorittstreameren sin." } },
              { "@type": "Question", name: "Hvilke norske merkevarer har annonsert på Twitch?", acceptedAnswer: { "@type": "Answer", text: "Samsung, Shure, Komplett, Høyskolen Kristiania, NKI, Gokstad Akademiet og Saily er blant merkene som har kjørt kampanjer via Beta Ads på norske Twitch-streamere. Se våre case studies for verifiserte resultater." } },
              { "@type": "Question", name: "Hvem er Twitch-publikummet i Norge?", acceptedAnswer: { "@type": "Answer", text: "Norske Twitch-seere er primært mellom 18–34 år, med høy kjøpekraft og lav eksponering for tradisjonell TV-reklame. Mange bruker adblock, som fjerner pre-roll og vanlige annonseformater. En overlay som vises inne i selve streamen, kan ikke blokkeres." } },
              { "@type": "Question", name: "Hvor raskt kan en kampanje gå live?", acceptedAnswer: { "@type": "Answer", text: "Fra godkjent brief til live kampanje tar det vanligvis 5–10 virkedager. Vi håndterer streamervalg, kreativproduksjon og teknisk oppsett, og du godkjenner streamerlisten og designet." } },
              { "@type": "Question", name: "Hva slags rapportering får vi?", acceptedAnswer: { "@type": "Answer", text: "Du får tilgang til sanntidsdata på visninger, klikkrate (CTR), skjermtid og engasjement via vårt dashboard. Når kampanjen er ferdig, får du én rapport du kan videresende." } },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Hjem", item: "https://beta-ads.no/" },
              { "@type": "ListItem", position: 2, name: "Twitch-annonsering Norge", item: "https://beta-ads.no/norge" },
            ],
          },
        ]}
      />

      {/* ── HERO ── */}
      <section className="relative">
        <div
          ref={heroRef}
          className={`relative max-w-7xl mx-auto px-6 lg:px-12 pt-32 lg:pt-44 pb-20 lg:pb-28 transition-all duration-1000 ease-out ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-6 font-semibold">
            Norge · Twitch-annonsering
          </p>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.04] tracking-tight text-foreground mb-6 max-w-4xl"
          >
            Native Twitch-annonsering{" "}
            <span className="hl">for norske merkevarer.</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-light text-foreground/90 mb-10 max-w-3xl leading-snug">
            Et norsk byrå som bare jobber med annonser i livestreams.
          </p>
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-16 max-w-5xl">
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Samsung, Shure, Komplett, Høyskolen Kristiania, NKI og Gokstad
              Akademiet har alle kjørt Twitch-kampanjer gjennom Beta Ads med
              verifisert rapportering på visninger og klikk. Vi plukker streamere
              fra 39 000+ i Streamer Explorer-databasen vår og kjører native
              overlay-annonser som også overlever adblock.
            </p>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Annonsen vises inne i selve sendingen, ikke som pre-roll før
              den. Den kan ikke skippes, og den blir liggende i reprisen. Hver
              visning tas opp som et klipp, så du ser at den faktisk ble vist.
            </p>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-5">
            <a
              href="https://calendar.app.google/coW5NLQJtLxfRer19"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-7 h-12 rounded-full text-sm font-medium tracking-wide transition-colors"
            >
              Bestill en 30-minutters konsultasjon{" "}
              <ArrowRight size={14} />
            </a>
            <Link
              to="/twitch-annonsering-pris"
              className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground text-sm tracking-wide transition-colors"
            >
              Hva koster det? <ArrowRight size={14} />
            </Link>
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
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-4 font-semibold">
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
                <div className="flex items-center h-10 mb-6">
                  {/* Every client mark here is monochrome, so the filter has to
                      follow the theme. A hard-coded invert renders white logos
                      on the light-theme card (bg-card, near-white) invisible. */}
                  <img
                    src={c.logo}
                    alt={c.brand}
                    className="max-h-8 max-w-10 object-contain opacity-85 [filter:brightness(0)] dark:[filter:brightness(0)_invert(1)]"
                  />
                </div>
                <p
                  className="text-[11px] font-semibold tracking-[0.18em] uppercase mb-2"
                  style={{ color: brandInk(c.accent) }}
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
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-4 font-semibold">
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

      {/* ── FAQ ── */}
      <section className="relative border-t border-foreground/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-4 font-semibold">
              Spørsmål og svar
            </p>
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-foreground mb-10">
              Vanlige spørsmål om Twitch-annonsering
            </h2>
            <div className="divide-y divide-border/50">
              {[
                {
                  q: "Hva koster en Twitch-kampanje i Norge?",
                  a: "Kampanjer starter på 100 000 kr. Du betaler per 1 000 visninger som faktisk ble spilt av, og visninger som ikke ble levert, får du tilbake.",
                },
                {
                  q: "Hvordan fungerer overlay-annonsering på Twitch?",
                  a: "Overlay-annonser er grafiske elementer som vises direkte i streamen, ikke som en pause eller avbrudd. De vises som en del av innholdet og omgår adblock helt. Seere ser annonsen mens de ser på favorittstreameren sin.",
                },
                {
                  q: "Hvilke norske merkevarer har annonsert på Twitch?",
                  a: "Samsung, Shure, Komplett, Høyskolen Kristiania, NKI, Gokstad Akademiet og Saily er blant merkene som har kjørt kampanjer via Beta Ads på norske Twitch-streamere. Se våre case studies for verifiserte resultater.",
                },
                {
                  q: "Hvem er Twitch-publikummet i Norge?",
                  a: "Norske Twitch-seere er primært mellom 18–34 år, med høy kjøpekraft og lav eksponering for tradisjonell TV-reklame. Mange bruker adblock, som fjerner pre-roll og vanlige annonseformater. En overlay som vises inne i selve streamen, kan ikke blokkeres.",
                },
                {
                  q: "Hvor raskt kan en kampanje gå live?",
                  a: "Fra godkjent brief til live kampanje tar det vanligvis 5–10 virkedager. Vi håndterer streamervalg, kreativproduksjon og teknisk oppsett, og du godkjenner streamerlisten og designet.",
                },
                {
                  q: "Hva slags rapportering får vi?",
                  a: "Du får tilgang til sanntidsdata på visninger, klikkrate (CTR), skjermtid og engasjement via vårt dashboard. Når kampanjen er ferdig, får du én rapport du kan videresende.",
                },
              ].map(({ q, a }) => (
                <details key={q} className="group py-5">
                  <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-foreground hover:text-primary transition-colors select-none list-none">
                    {q}
                    <ArrowRight className="w-4 h-4 shrink-0 ml-4 transition-transform group-open:rotate-90 text-muted-foreground" />
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative border-t border-foreground/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-4 font-semibold">
                Kom i gang
              </p>
              <h2
                className="text-3xl lg:text-4xl font-light tracking-tight text-foreground"
              >
                Skal du kjøre en norsk Twitch-kampanje i 2026?
              </h2>
              <p className="text-base text-muted-foreground mt-6 leading-relaxed">
                Vi booker 4–6 uker i forveien i de mest ettertraktede vinduene
                (Black Friday, Nordic Game, juleuka). Bestill en 30-minutters
                konsultasjon så tar vi en gjennomgang av kategori, brief og
                anslått leveranse, og du får et forslag innen én arbeidsdag.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://calendar.app.google/coW5NLQJtLxfRer19"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-12 rounded-full text-sm font-medium tracking-wide transition-colors"
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


      {/* ── Beta ── */}
      <MascotBand
        src="/lovable-uploads/beta-mascot-cut-cool.webp"
        alt="Beta, maskoten til Beta Ads"
        variant="cutout"
        eyebrow="Hils på Beta"
        heading="Et norsk byrå som bare gjør dette"
        body="Beta Ads er norsk, og vi kjøper ikke bannerannonser på si. Vi bygger native integrasjoner inn i selve sendingen: overlay i layouten, chat-kommando i tittelen, og streameren som sier det med sine egne ord."
        points={[
            "Norske streamere, norsk chat, norske kunder",
            "Vi rapporterer hva chatten faktisk sa, ikke bare visninger",
            "Sier fra hvis livestream er feil kanal for deg",
          ]}
        cta={{ label: "Slik velger du Twitch-byrå i Norge", to: "/twitch-byra-norge" }}
        flip={true}
      />

    </div>
  );
};

export default Norge;
