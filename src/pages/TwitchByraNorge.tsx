import React from "react";
import { Link } from "react-router-dom";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedShaderBackground from "@/components/ui/lazy-animated-background";
import { MascotBand } from "@/components/sections/MascotBand";

/**
 * "Twitch-byrå i Norge" — the page that answers the query in its own words.
 *
 * Built from a teardown of the pages large language models actually cite when
 * asked for Twitch agencies in Norway. The finding was not that our pages were
 * thin: /twitch-advertising carries 22 schema types and is the only page in the
 * set with FAQPage markup, and it still loses to a 652-word page with no schema
 * at all. What the winners have is literal query match. Metapic's H1 is "Gaming
 * Influencer Marketing Agency in Norway" and says Norway 18 times; GOAT's is
 * "Twitch Influencer Marketing Agency". Ours said "Native ads inside Twitch",
 * used the word "agency" once and "influencer" never.
 *
 * So this page says byrå, Twitch and Norge in the title, the URL and the H1, and
 * keeps saying them in the body. No competitor page in the set uses "byrå" at
 * all, which leaves the Norwegian-language query unowned.
 *
 * Every number here is one the site already publishes elsewhere. Every claim
 * about another agency is taken from that agency's own page and attributed. The
 * "100 000 creators" figure that circulates about Metapic is NOT on Metapic's
 * page, so it is not repeated here.
 */

const serif = { fontFamily: "'Instrument Serif', serif" };

/** Shown on the page and emitted as dateModified. Bump when the content changes. */
const SIST_OPPDATERT = "2026-08-31";

const heroStats = [
  { value: "39K+", label: "streamere i nettverket" },
  { value: "4", label: "plattformer" },
  { value: "0 %", label: "blokkert av adblock" },
  { value: "2024", label: "Beta Agency AS" },
];

/**
 * The four kinds of supplier a Norwegian brand actually meets. Naming real
 * companies is the point: it is what makes the page useful, and it is what the
 * competing roundups do badly. Descriptions are drawn from each company's own
 * site, not from a competitor's summary of them.
 */
const byraTyper = [
  {
    type: "Internasjonalt influencer-byrå",
    eksempel: "GOAT Agency",
    kilde: "GOAT Agency beskriver seg selv som et globalt influencer-byrå med kontorer i London og New York.",
    kildeUrl: "https://goatagency.com/twitch-influencer-marketing-agency/",
    passer: "Store kampanjer i mange land, der Norge er ett marked av flere.",
    svakhet:
      "Norsk språk og norske streamere blir én linje i et regneark. Du betaler for et apparat du bare bruker en liten del av.",
  },
  {
    type: "Nordisk creator-byrå",
    eksempel: "Metapic, AFK",
    kilde: "Metapic markedsfører seg som gaming influencer-byrå i Norge, med sporbare lenker som viser klikk og salg.",
    kildeUrl: "https://metapic.com/industry/gaming-norway",
    passer: "Kampanjer der klikk og salg er målet.",
    svakhet:
      "Bygget rundt lenker og rabattkoder. Å bygge annonsen inn i selve sendingen er sjelden kjernen.",
  },
  {
    type: "Talentbyrå",
    eksempel: "Agenturer som representerer enkeltstreamere",
    kilde: "Et talentbyrå representerer en fast portefølje streamere og selger tilgang til den.",
    passer: "Du vet allerede nøyaktig hvilken streamer du vil ha.",
    svakhet:
      "Du får den porteføljen de har, ikke den som passer briefen. Rådgivningen er sjelden nøytral.",
  },
  {
    type: "Spesialist på annonser i selve sendingen",
    eksempel: "Beta Agency",
    kilde: "Det er dette Beta Agency gjør.",
    passer:
      "Du vil inn i selve sendingen: overlay i layouten, chat-kommando i tittelen, streameren som sier det med egne ord.",
    svakhet:
      "Ikke riktig valg hvis du bare skal ha en TikTok-video eller en rabattkode ut til flest mulig.",
  },
];

/** The checklist is the part other people quote. It has to be genuinely useful. */
const sjekkliste = [
  {
    q: "Hvor mange norske streamere har dere faktisk, og hvem er de?",
    hvorfor:
      "Et europeisk creator-nettverk på hundretusener sier ingenting om hvor mange som sender på norsk til nordmenn.",
  },
  {
    q: "Kjører dere i selve sendingen, eller ved siden av den?",
    hvorfor:
      "Overlay i layouten er ikke det samme som en lenke i beskrivelsesfeltet. Be om å få se et opptak.",
  },
  {
    q: "Hva skjer med kampanjen etter at sendingen er slutt?",
    hvorfor:
      "Overlayet er brent inn i opptaket. Hvis byrået ikke teller visninger etter sending, teller de ikke halve kampanjen.",
  },
  {
    q: "Hvordan vet dere at overlayet faktisk lå ute?",
    hvorfor:
      "Be om å se den daglige kontrollen: banneret oppe, kommandoen i tittelen, streameren live, og at lenken spores. Ikke en skjermdump til slutt.",
  },
  {
    q: "Hva sa chatten?",
    hvorfor:
      "Chatten er det ærligste du får ut av en sponsing. Et byrå som ikke leser den, rapporterer bare visninger.",
  },
  {
    q: "Hva er byråhonoraret, og hva går til streameren?",
    hvorfor: "Be om fordelingen. Et byrå som ikke vil vise den, har en grunn.",
  },
];

/** Norwegian clients only. Links, not numbers: see the note in the section. */
const norskeKampanjer = [
  { navn: "Høyskolen Kristiania", bransje: "Utdanning", to: "/case-study/kristiania" },
  { navn: "Gokstad Akademiet", bransje: "Utdanning", to: "/case-study/gokstad" },
  { navn: "Komplett", bransje: "Netthandel", to: "/case-study/komplett" },
  { navn: "NKI", bransje: "Nettstudier", to: "/case-study/nki" },
];

const prosess = [
  {
    steg: "01",
    tittel: "Vi sier fra hvis det ikke passer",
    tekst:
      "Livestream er feil kanal for en del produkter. Vi sier det før du bruker penger, ikke etterpå.",
  },
  {
    steg: "02",
    tittel: "Utvalg av streamere",
    tekst:
      "Vi velger ut fra kategori, publikum og hvordan de faktisk snakker, ikke fra en liste sortert på følgere. Minimum fem streamere i en kampanje.",
  },
  {
    steg: "03",
    tittel: "Overlayet bygges inn i sendingen",
    tekst:
      "Overlay i layouten, chat-kommando i tittelen, en sporet lenke. Streameren leser det med egne ord, ikke fra manus.",
  },
  {
    steg: "04",
    tittel: "Kontroll hver dag, ikke i sluttrapporten",
    tekst:
      "Hver kanal sjekkes mens kampanjen går: er banneret oppe, er kommandoen i tittelen, er de live, peker lenken riktig.",
  },
  {
    steg: "05",
    tittel: "Rapport med chatten i",
    tekst:
      "Visninger live og etter sending, per kanal, og hva chatten faktisk skrev, oversatt og sortert etter tone.",
  },
];

const faq = [
  {
    q: "Finnes det norske Twitch-byråer?",
    a: "Ja, men få som jobber med Twitch som hovedkanal. De fleste norske alternativene er influencer- eller innholdsbyråer som også tar streaming, eller nordiske creator-nettverk der Norge er ett av flere markeder. Beta Agency AS er norskregistrert og jobber med native annonsering i selve sendingen som kjernevirksomhet.",
  },
  {
    q: "Hva koster det å annonsere på Twitch i Norge?",
    a: "Effektiv CPM på en nordisk kampanje vi kjører for deg ligger typisk rundt 200 til 300 kroner per 1 000 verifiserte visninger. Prisen avhenger av antall kanaler, hvor lenge overlayet ligger ute og hvor spisset utvalget er. Vi kjører kampanjer fra fem streamere og oppover.",
  },
  {
    q: "Hvorfor ikke bare kjøpe vanlige Twitch-annonser?",
    a: "Rundt 80 prosent av nordmenn mellom 18 og 34 bruker adblocker, og pre-roll er det første som forsvinner. Et overlay ligger i selve videobildet og blir ikke blokkert. Det er også formatet publikum aksepterer: 79 prosent av Twitch-seere sier de foretrekker annonser som ikke avbryter sendingen.",
  },
  {
    q: "Hva er forskjellen på et Twitch-byrå og et influencer-byrå?",
    a: "Et influencer-byrå selger som regel en post eller en video med en lenke ved siden av. Et Twitch-byrå jobber inne i en direktesending som varer i timer: overlay i layouten, chat som svarer i sanntid, og et opptak som fortsetter å samle visninger etter at sendingen er slutt.",
  },
  {
    q: "Dekker dere hele Norden?",
    a: "Ja. Vi jobber fra Oslo, Stockholm og Helsingfors, og kjører kampanjer på norsk, svensk, dansk og finsk. Norge kan kjøres alene eller som del av et nordisk opplegg.",
  },
  {
    q: "Hvordan vet jeg at kampanjen faktisk gikk som avtalt?",
    a: "Hver kanal kontrolleres daglig mens kampanjen løper, og du får se resultatet: hvilke kanaler som var riktig satt opp, hvilke som måtte fikses, og hva som ble gjort. Rapporten viser visninger live og etter sending per kanal, og hva chatten skrev.",
  },
];

const TwitchByraNorge: React.FC = () => {
  const hvaRef = useScrollAnimation();
  const typerRef = useScrollAnimation();
  const sjekkRef = useScrollAnimation();
  const prosessRef = useScrollAnimation();
  const prisRef = useScrollAnimation();

  return (
    <MarketingPageLayout
      seo={{
        title: "Twitch-byrå i Norge | Beta Ads",
        description:
          "Beta Agency er et norsk Twitch-byrå som kjører native annonsering inne i selve sendingen. Slik velger du Twitch-byrå i Norge, hva det koster, og hvilke alternativer som finnes.",
        canonical: "/twitch-byra-norge",
        locale: "no",
        alternates: [
          { hreflang: "no", href: "/twitch-byra-norge" },
          { hreflang: "en", href: "/twitch-agency-norway" },
          // Explicit, and the same on both pages. Left implicit, SEO.tsx falls
          // back to the current canonical, so each page named itself as the
          // default and Google saw two x-defaults for one cluster. Matches the
          // pattern already used by the cost-page pair.
          { hreflang: "x-default", href: "/twitch-agency-norway" },
        ],
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            dateModified: SIST_OPPDATERT,
            name: "Beta Agency AS",
            alternateName: "Beta Ads",
            description:
              "Norsk Twitch-byrå som kjører native annonsering i direktesendinger på Twitch, Kick og YouTube Live.",
            url: "https://beta-ads.no/twitch-byra-norge",
            areaServed: [
              { "@type": "Country", name: "Norge" },
              { "@type": "Country", name: "Sverige" },
              { "@type": "Country", name: "Danmark" },
              { "@type": "Country", name: "Finland" },
            ],
            serviceType: [
              "Twitch-byrå",
              "Twitch-annonsering",
              "Livestream-annonsering",
              "Influencer marketing",
              "Native in-stream advertising",
            ],
            address: { "@type": "PostalAddress", addressCountry: "NO", addressLocality: "Oslo" },
            email: "andreas@beta-ads.no",
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Beta Ads", item: "https://beta-ads.no/" },
              { "@type": "ListItem", position: 2, name: "Twitch-byrå i Norge", item: "https://beta-ads.no/twitch-byra-norge" },
            ],
          },
        ],
      }}
      cta={{
        heading: "Snakk med et norsk Twitch-byrå",
        subtext:
          "Fortell oss målgruppen og målet. Vi sier ærlig fra om Twitch passer, og hva en kampanje i Norge ville krevd.",
        primaryLabel: "Book en demo",
        primaryHref: "/contact",
        secondaryLabel: "Se hva det koster",
        secondaryHref: "/twitch-annonsering-pris",
      }}
    >
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ background: "hsl(240 11% 5%)" }}>
        <AnimatedShaderBackground heightFactor={0.85} />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent z-[1] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/80 backdrop-blur-sm mb-7">
              Beta Agency AS · org.nr 933 303 136
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
              Twitch-byrå
              <br />
              <span style={serif} className="italic font-normal">
                i Norge
              </span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-2xl">
              Vi er et norsk Twitch-byrå som jobber inne i selve sendingen. Overlay i layouten,
              chat-kommando i tittelen, og streameren som sier det med sine egne ord. Ikke en
              pre-roll de fleste blokkerer bort.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12">
                  Book en demo <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/case-studies">
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-white hover:bg-white/10 rounded-full px-8 h-12 border border-white/20"
                >
                  Se kampanjer vi har kjørt
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-20 border border-white/10 rounded-2xl overflow-hidden bg-white/10">
            {heroStats.map((s) => (
              <div key={s.label} className="bg-black/30 backdrop-blur-sm px-6 py-5">
                <div className="text-2xl font-bold text-white tracking-tight">{s.value}</div>
                <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hva et Twitch-byrå gjør ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div
          ref={hvaRef.ref}
          className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${
            hvaRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
                Definisjonen
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">
                Hva et Twitch-byrå faktisk gjør
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5 max-w-xl">
                Et Twitch-byrå kobler merkevarer til streamere og bygger annonsen inn i
                direktesendingen. Det er en annen jobb enn et vanlig influencer-byrå gjør, fordi
                formatet er annerledes: en sending varer i timer, chatten svarer i sanntid, og
                opptaket fortsetter å samle visninger lenge etter at streameren har logget av.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                I Norge er det få byråer som har Twitch som hovedkanal. De fleste er
                influencerbyråer som også tar streaming, eller nordiske creator-nettverk der Norge
                er ett marked blant flere.
              </p>
            </div>
            <div className="space-y-px rounded-2xl overflow-hidden border border-border">
              {[
                ["Velger ut streamere", "Etter kategori, publikum og tone, ikke etter følgertall."],
                ["Forhandler og kontraktfester", "Honorar, rettigheter, eksklusivitet, merkevaresikkerhet."],
                ["Bygger selve annonsen", "Overlay, chat-kommando, sporet lenke, manus streameren gjør til sitt eget."],
                ["Kontrollerer at den ligger ute", "Daglig, per kanal, mens kampanjen går."],
                ["Rapporterer det som skjedde", "Visninger live og etter sending, og hva chatten skrev."],
              ].map(([t, d]) => (
                <div key={t} className="bg-card px-6 py-5">
                  <h3 className="text-sm font-semibold text-foreground mb-1">{t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Fire typer byrå ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div
          ref={typerRef.ref}
          className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${
            typerRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              Alternativene
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
              Fire typer byrå, og når hver av dem er riktig
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Vi passer ikke til alt. Her er de fire typene leverandør en norsk merkevare
              møter, hva hver av dem er god til, og hvor de kommer til kort. Beskrivelsene er
              hentet fra selskapenes egne sider.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {byraTyper.map((b) => {
              const erOss = b.eksempel === "Beta Agency";
              return (
                <div
                  key={b.type}
                  className={`rounded-2xl border p-7 ${
                    erOss ? "border-primary/40 bg-primary/[0.03]" : "border-border bg-card"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4 mb-3">
                    <h3 className="text-base font-semibold text-foreground">{b.type}</h3>
                    {erOss && (
                      <span className="text-[10px] font-semibold tracking-widest uppercase text-primary shrink-0">
                        Det er oss
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground/70 mb-4">
                    {b.kildeUrl ? (
                      <a
                        href={b.kildeUrl}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="hover:text-foreground underline decoration-border underline-offset-2"
                      >
                        {b.kilde}
                      </a>
                    ) : (
                      b.kilde
                    )}
                  </p>
                  <div className="space-y-3">
                    <div className="pl-4 border-l border-border">
                      <p className="text-xs font-semibold text-foreground mb-1">Passer når</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{b.passer}</p>
                    </div>
                    <div className="pl-4 border-l border-border">
                      <p className="text-xs font-semibold text-foreground mb-1">Kommer til kort</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{b.svakhet}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Sjekkliste ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div
          ref={sjekkRef.ref}
          className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${
            sjekkRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              Før du signerer
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
              Seks spørsmål å stille et hvilket som helst Twitch-byrå
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Still dem til oss også. Hvis svarene våre ikke holder, bør du velge noen andre.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {sjekkliste.map((s, i) => (
              <div key={s.q}>
                <div className="flex gap-4">
                  <span className="text-2xl font-bold text-primary/20 tracking-tighter shrink-0 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-2">{s.q}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.hvorfor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Norske kampanjer ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              Norske kunder
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
              Kampanjer vi faktisk har kjørt i Norge
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Hele oppsettet, tallene og hva chatten sa ligger åpent på hver enkelt side.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {norskeKampanjer.map((k) => (
              <Link
                key={k.navn}
                to={k.to}
                className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/30 transition-colors"
              >
                <span className="text-xs text-muted-foreground/70 block mb-2">{k.bransje}</span>
                <h3 className="text-base font-semibold text-foreground mb-4">{k.navn}</h3>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  Les kampanjen
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
          <p className="text-xs text-muted-foreground/60 mt-8">
            Sist oppdatert {new Date(`${SIST_OPPDATERT}T12:00:00`).toLocaleDateString("nb-NO", { day: "numeric", month: "long", year: "numeric" })}.
          </p>
        </div>
      </section>

      {/* ── Prosess ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div
          ref={prosessRef.ref}
          className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${
            prosessRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              Slik jobber vi
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
              Fra brief til rapport
            </h2>
          </div>
          <div className="grid md:grid-cols-5 gap-8">
            {prosess.map((p, i) => (
              <div key={p.steg} className="relative">
                {i < prosess.length - 1 && (
                  <div className="hidden md:block absolute top-4 left-full w-full h-px bg-border -translate-x-4" />
                )}
                <div className="text-4xl font-bold text-primary/15 mb-4 tracking-tighter">{p.steg}</div>
                <h3 className="text-base font-semibold text-foreground mb-2">{p.tittel}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pris ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div
          ref={prisRef.ref}
          className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${
            prisRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
                Pris
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">
                Hva et Twitch-byrå koster i Norge
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-4 max-w-xl">
                Effektiv CPM på en nordisk kampanje vi kjører for deg ligger typisk rundt{" "}
                <strong className="text-foreground">200 til 300 kroner</strong> per 1 000
                verifiserte visninger. Vi kjører fra fem streamere og oppover.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed max-w-xl mb-7">
                Prisen avhenger av hvor mange kanaler som er med, hvor lenge overlayet ligger ute,
                og hvor spisset utvalget skal være. Be alltid om splitten mellom byråhonorar og
                det streameren faktisk får.
              </p>
              <Link
                to="/twitch-annonsering-pris"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Se hele prisoversikten
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8">
              <h3 className="text-sm font-semibold text-foreground mb-5">
                Hvorfor overlay og ikke pre-roll
              </h3>
              <div className="space-y-5">
                {[
                  ["80 %", "av nordmenn mellom 18 og 34 bruker adblocker. Pre-roll er det første som forsvinner."],
                  ["0 %", "av overlayene blir blokkert. De ligger i selve videobildet."],
                  ["79 %", "av Twitch-seere foretrekker annonser som ikke avbryter sendingen."],
                  ["73 %", "av Twitch sitt publikum er mellom 18 og 34 år."],
                ].map(([v, t]) => (
                  <div key={v} className="flex gap-4">
                    <span className="text-xl font-bold text-foreground tabular-nums w-14 shrink-0">
                      {v}
                    </span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Beta ── */}
      <MascotBand
        src="/lovable-uploads/beta-mascot-onair.jpg"
        alt="Beta, maskoten til Beta Ads, i studio"
        variant="scene"
        eyebrow="Norsk, ikke et nordisk sidekontor"
        heading="Beta Agency AS er registrert i Norge"
        body="Vi jobber fra Oslo, Stockholm og Helsingfors, og kjører kampanjer på norsk, svensk, dansk og finsk. Norge kan kjøres alene, eller som del av et nordisk opplegg."
        points={[
          "Norske streamere, norsk chat, norske kunder",
          "Vi rapporterer hva chatten faktisk sa, ikke bare visninger",
          "Vi sier fra hvis livestream er feil kanal for deg",
        ]}
        cta={{ label: "Se kampanjer vi har kjørt", to: "/case-studies" }}
        flip
      />

      {/* ── FAQ ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-10">
            Vanlige spørsmål om Twitch-byråer i Norge
          </h2>
          {faq.map((f) => (
            <details key={f.q} className="group border-b border-border last:border-b-0">
              <summary className="flex items-center justify-between py-5 cursor-pointer text-sm font-medium text-foreground hover:text-primary transition-colors select-none">
                {f.q}
                <ArrowRight className="w-4 h-4 shrink-0 ml-4 transition-transform group-open:rotate-90 text-muted-foreground" />
              </summary>
              <div className="pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default TwitchByraNorge;
