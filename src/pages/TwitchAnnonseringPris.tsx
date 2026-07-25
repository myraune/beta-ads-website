import React from "react";
import { Link } from "react-router-dom";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedShaderBackground from "@/components/ui/lazy-animated-background";

/**
 * Norwegian-language cost page - the bokmål counterpart of
 * /twitch-advertising-cost, targeting Norwegian buyer-intent queries
 * ("hva koster twitch reklame", "twitch annonsering pris"). Norway is the
 * most engaged, right-audience segment in analytics but had no native-language
 * commercial page. Content mirrors the English page; every number is either
 * Beta Ads' own pricing or a sourced figure (SullyGnome, verified case
 * studies). Registered as an hreflang alternate of the English cost page.
 */

const serifFont = { fontFamily: "'Instrument Serif', serif" };

const stats = [
  { value: "200-300 kr", label: "Effektiv CPM" },
  { value: "2", label: "Prismodeller" },
  { value: "5", label: "Kostnadsdrivere" },
  { value: "0", label: "Offentlige prislister" },
];

const models = [
  {
    tag: "Auksjon",
    title: "CPM programmatisk og overlay",
    body: "Kjøpes slik det meste av digital video kjøpes: per tusen visninger, priset i en sanntidsauksjon i stedet for en fast prislapp. Du setter budsjett og mål-CPM, og børsen fyller det på tvers av kvalifisert beholdning.",
    facts: [
      "Ingen publisert CPM, den beveger seg med etterspørselen",
      "Amazons selvbetjeningsnivå har ingen minstesum",
      "Best for rekkevidde og frekvens i stor skala",
    ],
  },
  {
    tag: "Forhandlet",
    title: "Faste kreatør-integrasjoner",
    body: "En direkte avtale med en streamer eller byrået deres: en fast pris for en definert leveranse. En overlay i et gitt tidsrom, et dedikert segment, klipp- og VOD-rettigheter, noen ganger kategori-eksklusivitet.",
    facts: [
      "Priset etter samtidige seere og relevans",
      "Ingen børs, ingen prisliste, det er en forhandling",
      "Best for troverdighet og konverteringsintensjon",
    ],
  },
];

// Retningsgivende prispress per driver (0-100). Bevisst merket som
// retningsgivende, IKKE en prisliste - fra de fem reelle kostnadsdriverne.
const drivers = [
  { term: "Kategori", weight: 92, desc: "Just Chatting og store e-sport-titler trekker brede, merkevaretrygge publikum som annonsører konkurrerer om. Nisje- eller aldersgrensede kategorier koster mindre og når færre." },
  { term: "Publikums-geografi", weight: 86, desc: "Å nå verdifulle nordiske seere spesifikt koster mer enn brede globale visninger, fordi det publikumet er verdt mer for alle som byr på det." },
  { term: "Sesong", weight: 74, desc: "Q4, store spillanseringer og viktige e-sport-øyeblikk strammer beholdningen. Q1 og Q2 er årets beste kjøpsvinduer." },
  { term: "Kreatørnivå", weight: 58, desc: "Prisene følger samtidige seertall, men ikke lineært. Mellomsjiktet leverer ofte best effektivitet for et fokusert norsk publikum." },
  { term: "Format", weight: 52, desc: "En vedvarende overlay, en enkel omtale og et fullt sponset segment prises svært forskjellig for samme kreatør." },
];

// Reelle Twitch-timer strømmet siste 12 måneder, per nordisk sendespråk.
// Kilde: SullyGnome (sullygnome.com/channels?language=..), øyeblikksbilde
// juli 2026. Strømmede timer (tilbud/beholdning), ikke sette timer.
const inventory = [
  { lang: "Finsk", hours: 1142810, display: "1,14M" },
  { lang: "Svensk", hours: 1133250, display: "1,13M" },
  { lang: "Dansk", hours: 690539, display: "691K" },
  { lang: "Norsk", hours: 504216, display: "504K", highlight: true },
];
const inventoryMax = 1142810;

// Kjøpe direkte vs. gjennom et byrå. Alle tall verifisert fra primærkilder
// (Amazon Ads produktsider; Kick-ledelsens uttalelser 2026). Ingen CPM oppgis
// fordi ingen er publisert for noen av plattformene.
const directBuy: {
  tag: string;
  title: string;
  highlight: boolean;
  facts: string[];
  link?: { href: string; label: string };
}[] = [
  {
    tag: "Twitch, direkte",
    title: "Amazon Ads",
    highlight: false,
    facts: [
      "Selvbetjening finnes for standard display og programmatisk video",
      "Men Amazons Streaming TV- og DSP-produkter har $10 000 selvbetjening / $50 000 administrert minstekjøp",
      "Premiumplasseringer (forsideovertakelse, første visning) er kun på forespørsel, ingen offentlig pris",
    ],
  },
  {
    tag: "Kick, direkte",
    title: "Easygo",
    highlight: false,
    facts: [
      "Per midten av 2026 sier Kicks CEO at annonser fortsatt testes og ennå ikke selges til sponsorer",
      "Ingen selvbetjeningsplattform, ingen prisliste, ingen annonseportal",
      "Eneste vei inn på Kick er en forhandlet kreatør-sponsing",
    ],
    link: { href: "/kick-advertising-cost", label: "Hva Kick-annonsering koster" },
  },
  {
    tag: "Begge plattformer",
    title: "Administrert med Beta Ads",
    highlight: true,
    facts: [
      "Ingen femsifret plattform-minstesum å passere",
      "Ett transparent priset oppdrag på tvers av Twitch og Kick",
      "Native overlay og kreatør-integrasjon håndtert fra ende til ende",
    ],
  },
];

// Reelle, verifiserte kampanjeresultater (fra case-studiene på dette nettstedet).
// Rekkevidde- og antallstall - ingen omdiskuterte CTR-tall.
const proof = [
  { brand: "Samsung", logo: "/lovable-uploads/logo-samsung.png", metric: "500 131", label: "fullførte visninger", extra: "43 norske streamere", href: "/case-study/samsung" },
  { brand: "Shure", logo: "/lovable-uploads/logo-shure.png", metric: "9,12 %", label: "topp-dag CTR", extra: "182 554 visninger", href: "/case-study/shure" },
  { brand: "NKI", logo: "/lovable-uploads/logo-nki.svg", metric: "220 003", label: "fullførte visninger", extra: "1 595 klikk", href: "/case-study/nki" },
  { brand: "Komplett", logo: "/lovable-uploads/logo-komplett.png", metric: "151 278", label: "visninger", extra: "34 streamere", href: "/case-study/komplett" },
];

const bring = [
  { step: "01", title: "Målet", desc: "Kjennskap, vurdering eller en målbar handling. Det endrer både format og budsjettform." },
  { step: "02", title: "Markedet", desc: "Hvilket av Norge, Sverige, Danmark eller Finland, og på hvilket språk. Nordisk målretting er hele poenget." },
  { step: "03", title: "En budsjettramme", desc: "Ikke et endelig tall, en ramme. Den forteller oss om vi skal skissere en test, et alltid-på-program eller en integrert kampanje." },
  { step: "04", title: "En tidsplan", desc: "Et lanseringsvindu lar oss si ærlig om det lander i en premium- eller en verdisesong." },
];

const TwitchAnnonseringPris: React.FC = () => {
  const { ref: modelsRef, isVisible: modelsVisible } = useScrollAnimation();
  const { ref: driversRef, isVisible: driversVisible } = useScrollAnimation();
  const { ref: seasonRef, isVisible: seasonVisible } = useScrollAnimation();
  const { ref: proofRef, isVisible: proofVisible } = useScrollAnimation();
  const { ref: nordicRef, isVisible: nordicVisible } = useScrollAnimation();
  const { ref: bringRef, isVisible: bringVisible } = useScrollAnimation();

  return (
    <MarketingPageLayout
      seo={{
        title: "Hva koster Twitch-annonsering i Norge? | Beta Ads",
        description:
          "Ingen plattform publiserer en prisliste for Twitch-annonsering, ikke engang Twitch. Slik prises livestream-annonsering faktisk i Norge: de fem kostnadsdriverne og hvordan du får et reelt tilbud.",
        canonical: "/twitch-annonsering-pris",
        locale: "no",
        alternates: [
          { hreflang: "no", href: "/twitch-annonsering-pris" },
          { hreflang: "en", href: "/twitch-advertising-cost" },
          { hreflang: "x-default", href: "/twitch-advertising-cost" },
        ],
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://beta-ads.no/twitch-annonsering-pris#service",
            name: "Twitch-annonsering - Beta Ads",
            serviceType: "Native livestream-annonsering",
            description:
              "Administrerte Twitch-kampanjer på tvers av 28 000+ nordiske streamere, priset per kampanje etter kategori, geografi, sesong, kreatørnivå og format.",
            provider: { "@id": "https://beta-ads.no/#organization" },
            areaServed: ["Norway", "Sweden", "Denmark", "Finland"],
            inLanguage: "no",
            url: "https://beta-ads.no/twitch-annonsering-pris",
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Hjem", item: "https://beta-ads.no/" },
              { "@type": "ListItem", position: 2, name: "Hva koster Twitch-annonsering?", item: "https://beta-ads.no/twitch-annonsering-pris" },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            inLanguage: "no",
            mainEntity: [
              { "@type": "Question", name: "Hva koster Twitch-annonsering i Norge?", acceptedAnswer: { "@type": "Answer", text: "For en administrert nordisk kampanje kjører Beta Ads på en blandet effektiv CPM på omtrent 200 til 300 kr per tusen verifiserte visninger, på tvers av overlay- og kreatørformater. Det er en premie over bred global display fordi det kjøper et verdifullt nordisk publikum i et native format som fullføres og ikke kan blokkeres. Hvor en kampanje lander i det spennet avhenger av fem variabler (kategori, publikums-geografi, sesong, kreatørnivå og format) og hvilken av to prismodeller du bruker." } },
              { "@type": "Question", name: "Finnes det en publisert prisliste for Twitch-annonser?", acceptedAnswer: { "@type": "Answer", text: "Nei. Amazon Ads, som driver Twitchs annonsebørs, publiserer ingen offentlig prisliste. Selvbetjeningsnivået for video har ingen minstesum, og større kjøp prises av en kundeansvarlig. CPM-en beveger seg i sanntid basert på etterspørsel i auksjonen." } },
              { "@type": "Question", name: "Hva er forskjellen på CPM-kjøp og kreatør-integrasjoner?", acceptedAnswer: { "@type": "Answer", text: "CPM programmatisk og overlay-annonser kjøpes per tusen visninger i auksjon. Faste kreatør-integrasjoner forhandles direkte med en streamer for en definert leveranse, priset etter samtidige seere og relevans. De mest effektive kampanjene kombinerer begge." } },
              { "@type": "Question", name: "Hvorfor prises nordiske Twitch-kampanjer annerledes?", acceptedAnswer: { "@type": "Answer", text: "Nordiske publikum har høy kjøpekraft, så å nå dem spesifikt er verdt mer for alle annonsører som byr på beholdningen. Nordisk-språklige streamere er også en liten, konsentrert del av den globale beholdningen, så presis målretting krever markedsspesifikk kreatørdata." } },
            ],
          },
        ],
      }}
      cta={{
        heading: "Vil du ha et ærlig tall?",
        subtext: "Vi publiserer ikke et falskt spenn eller gir deg et tilbud over et skjemafelt. Fortell oss målet, markedet og tidsplanen, så sier vi rett ut hva en kampanje som din koster å kjøre godt.",
        primaryLabel: "Få et tilbud",
        primaryHref: "/contact",
        secondaryLabel: "Se ekte kampanjeresultater",
        secondaryHref: "/case-studies",
      }}
    >
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "hsl(240 11% 5%)" }}>
        <AnimatedShaderBackground heightFactor={0.85} />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent z-[1] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/80 backdrop-blur-sm mb-7">
              <img src="/lovable-uploads/platform-twitch.png" alt="Twitch" className="h-3.5 w-auto" />
              Twitch-annonsering pris
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
              Hva Twitch-annonsering{" "}
              <span style={serifFont} className="italic font-normal">faktisk</span> koster
            </h1>
            <p className="text-lg text-white/65 leading-relaxed mb-10 max-w-lg">
              Ingen plattform publiserer en prisliste, ikke engang Twitch. Her er hvordan livestream-annonsering egentlig prises i Norge, de fem tingene som flytter tallet, og hvordan du får et reelt tilbud i stedet for en gjetning.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12">
                  Få et tilbud <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/norge">
                <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 rounded-full px-8 h-12 border border-white/20">
                  Norsk oversikt
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-20 border border-white/10 rounded-2xl overflow-hidden bg-white/10">
            {stats.map((s) => (
              <div key={s.label} className="bg-black/30 backdrop-blur-sm px-6 py-5">
                <div className="text-2xl font-bold text-white tracking-tight">{s.value}</div>
                <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Det ærlige svaret */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Det ærlige svaret</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-foreground leading-tight">
              Her er tallet du kom for
            </h2>
            <div className="mt-10 pt-8 border-t border-border">
              <div className="text-6xl md:text-7xl font-bold text-primary tracking-tight leading-none">200-300 kr</div>
              <div className="text-sm text-muted-foreground mt-4 max-w-sm leading-relaxed">
                Blandet effektiv CPM for en administrert nordisk kampanje, per 1 000 verifiserte visninger, på tvers av overlay- og kreatørformater.
              </div>
            </div>
          </div>
          <div className="space-y-5 text-base md:text-lg font-light leading-relaxed text-muted-foreground lg:pt-3">
            <p>
              Du søkte etter en rett "Twitch-annonser pris." Mesteparten av bransjen gir deg ikke en: Amazon Ads, som driver Twitchs annonsebørs, publiserer ingen prisliste, og hver "gjennomsnittlig CPM" på nettet motsier den neste. Så her er vår, rett ut.
            </p>
            <p>
              Det spennet ligger med en premie over bred global display, og med vilje. Det kjøper et verdifullt nordisk publikum i et native format som fullføres, ikke hoppes over, og ikke kan fjernes av en adblocker. Hvor en kampanje lander i det kommer an på fem variabler, og på hvilken av to prismodeller du bruker.
            </p>
          </div>
        </div>
      </section>

      {/* To prismodeller */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={modelsRef} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${modelsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Slik prises det</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">To produkter, to prismekanismer</h2>
            <p className="text-base text-muted-foreground leading-relaxed mt-4">Å blande disse er den enkeltstående største grunnen til at folk blir overrasket av et tilbud.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {models.map((m) => (
              <div key={m.title} className="p-8 lg:p-10 rounded-2xl border border-border bg-card">
                <span className="text-[11px] font-semibold tracking-widest uppercase text-primary">{m.tag}</span>
                <h3 className="text-2xl font-semibold text-foreground mt-3 mb-4">{m.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">{m.body}</p>
                <ul className="space-y-2.5 border-t border-border pt-6">
                  {m.facts.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fem kostnadsdrivere */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={driversRef} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${driversVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Hva flytter tallet</span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">Fem variabler som setter prisen</h2>
              <p className="text-base text-muted-foreground leading-relaxed max-w-md">
                To kampanjer med samme budsjett kan kjøpe svært forskjellige resultater. Disse fem variablene avgjør hvilke. Søylene viser retningsgivende prispress, ikke en prisliste.
              </p>
            </div>
            <div className="space-y-6">
              {drivers.map((d) => (
                <div key={d.term}>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-sm font-semibold text-foreground">{d.term}</span>
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{d.weight >= 80 ? "Høy" : d.weight >= 60 ? "Middels-høy" : "Middels"}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary/80" style={{ width: `${d.weight}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-2">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Beholdning / mulighetsstørrelse */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={seasonRef} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${seasonVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Størrelsen på muligheten</span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">
                504 000 timer norsk Twitch i året
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed max-w-md mb-5">
                Så mye strømmes årlig på norsk, beholdningen en kampanje faktisk kjøper mot. På tvers av alle fire nordiske språk passerer det 3,4 millioner timer, der finsk og svensk hver passerer en million i året.
              </p>
              <p className="text-xs text-muted-foreground/70 leading-relaxed max-w-md">
                Timer strømmet på Twitch siste 12 måneder, per sendespråk. Kilde: SullyGnome, øyeblikksbilde juli 2026. Dette er strømmede timer (tilbud), ikke sette timer.
              </p>
            </div>
            <div className="space-y-6">
              {inventory.map((d) => (
                <div key={d.lang}>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className={`text-sm font-semibold ${d.highlight ? "text-primary" : "text-foreground"}`}>{d.lang}</span>
                    <span className="text-lg font-bold text-foreground tabular-nums">{d.display}<span className="text-xs font-normal text-muted-foreground ml-1">t/år</span></span>
                  </div>
                  <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full rounded-full ${d.highlight ? "bg-primary" : "bg-primary/80"}`} style={{ width: `${Math.round((d.hours / inventoryMax) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bevis-bånd */}
      <section ref={proofRef} className={`py-20 md:py-28 border-t border-border transition-all duration-700 ${proofVisible ? "opacity-100" : "opacity-0"}`} style={{ background: "hsl(240 11% 5%)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Hva pengene leverer</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white">
              Tallet betyr bare noe ved siden av resultatet
            </h2>
            <p className="text-base text-white/60 leading-relaxed mt-4">
              Verifiserte resultater fra ekte norske kampanjer. Dette er hva budsjettet faktisk kjøpte.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px border border-white/10 rounded-2xl overflow-hidden bg-white/10 mb-8">
            {proof.map((p) => (
              <Link key={p.brand} to={p.href} className="group bg-black/40 backdrop-blur-sm px-6 py-7 hover:bg-black/20 transition-colors">
                <div className="flex items-center justify-between mb-5 h-6">
                  <img src={p.logo} alt={p.brand} className="h-5 w-auto object-contain opacity-70" style={{ filter: "brightness(0) invert(1)" }} />
                  <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-primary transition-colors" />
                </div>
                <div className="text-3xl font-bold text-white tracking-tight">{p.metric}</div>
                <div className="text-xs text-white/50 mt-1">{p.label}</div>
                <div className="text-xs text-primary mt-3">{p.extra}</div>
              </Link>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center pt-8">
            <div className="rounded-2xl overflow-hidden bg-black ring-1 ring-white/10">
              <video
                src="/lovable-uploads/overlay-samsung.webm"
                autoPlay loop muted playsInline preload="metadata"
                className="w-full h-auto"
                aria-label="En native merkevare-overlay vist live inne i en Twitch-stream"
              />
            </div>
            <div>
              <h3 className="text-2xl font-light tracking-tight text-white mb-4">Dette er formatet du betaler for</h3>
              <p className="text-base text-white/60 leading-relaxed mb-6">
                Ikke en pre-roll seeren hopper over eller en adblocker fjerner. En merkevare-overlay vist inne i direktesendingen, til stede gjennom en 90-minutters økt, umulig å blokkere fordi den er en del av sendingen.
              </p>
              <Link to="/twitch-advertising" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                Slik fungerer formatene <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Den nordiske premien */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={nordicRef} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${nordicVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Den nordiske premien</span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
                Hvorfor nordiske kampanjer prises annerledes, og hvorfor det er greit
              </h2>
            </div>
            <div className="space-y-5 text-base font-light leading-relaxed text-muted-foreground lg:pt-2">
              <p>
                Nordiske publikum har noen av de høyeste kjøpekraftene og digitale kjøpsintensjonene i Europa. Å nå dem spesifikt er verdt mer for alle annonsører som byr på beholdningen, så det prises med en premie. Den premien er berettiget nettopp fordi konkurrentene dine betaler den: å velge bort er ikke en besparelse, det er å gi fra seg publikumet.
              </p>
              <p>
                Den praktiske begrensningen er tilbud. Nordisk-språklige streamere er en liten, konsentrert del av den globale Twitch-beholdningen, men en uforholdsmessig stor andel av verdien for merkevarer som målretter lokale markeder. Å få den målrettingen riktig krever markedsspesifikk kreatørdata, som er akkurat gapet en nordisk partner finnes for å tette.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Direkte eller administrert */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Direkte eller administrert</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">Kan du ikke bare kjøpe det direkte?</h2>
            <p className="text-base text-muted-foreground leading-relaxed mt-4">
              Noen ganger, og det er verdt å vite nøyaktig hva "direkte" koster før du antar at det er billigere.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {directBuy.map((c) => (
              <div
                key={c.title}
                className={`p-8 rounded-2xl border ${c.highlight ? "border-primary/40 bg-primary/[0.03]" : "border-border bg-card"}`}
              >
                <span className="text-[11px] font-semibold tracking-widest uppercase text-primary">{c.tag}</span>
                <h3 className="text-xl font-semibold text-foreground mt-3 mb-5">{c.title}</h3>
                <ul className="space-y-3">
                  {c.facts.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80 leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                {c.highlight && (
                  <Link to="/contact" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-6">
                    Få et tilbud <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
                {c.link && (
                  <Link to={c.link.href} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-6">
                    {c.link.label} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground/60 leading-relaxed mt-8 max-w-3xl">
            Kilder: Amazon Ads produktsider (Streaming TV ads, Amazon DSP) for de publiserte minstesummene; uttalelser fra Kicks medgrunnlegger til Digiday (2023) og win.gg (2026) som bekrefter at Kick fortsatt tester annonser og ennå ikke selger til sponsorer. Ingen offentlig CPM-prisliste finnes for noen av plattformene, som er grunnen til at ingen oppgis her.
          </p>
        </div>
      </section>

      {/* Hva du bør ta med */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={bringRef} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${bringVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Slik får du et reelt tall</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">Fire ting å ta med, så får du et rett svar</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {bring.map((b, i) => (
              <div key={b.step} className="relative">
                {i < bring.length - 1 && <div className="hidden md:block absolute top-4 left-full w-full h-px bg-border -translate-x-4" />}
                <div className="text-4xl font-bold text-primary/15 mb-4 tracking-tighter">{b.step}</div>
                <h3 className="text-base font-semibold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default TwitchAnnonseringPris;
