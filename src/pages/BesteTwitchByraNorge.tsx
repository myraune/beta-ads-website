import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { BOOKING_URL, SALES_MAIL, W, kicker, h2, PrimaryBtn, GhostBtn, Faq, faqLd } from "@/components/working/shared";

/* "Beste Twitch-byråer i Norge": the kind of roundup AI answers are built from
   (ChatGPT listed Beta, Forevr, NOT Management, Metapic and AtPlay, 2026-10-29).
   Deliberately an overview grouped by what the buyer needs, not a ranking with
   Beta Ads on top: self-ranking lists tend to get cited for the competitors
   anyway, and the same rules as /compare apply here:
     - every fact comes from the company's own site or Brønnøysund, with the URL;
     - "Ikke oppgitt" when it is not published;
     - checked 2026-10-30. AtPlay could not be found and is left out.
   Forevr is Danish (Frederiksberg), not Norwegian. Kontent is left out because
   Kom24 reported on 13 Feb 2026 that it is being wound up.
   The map: rows are how each agency's own site treats Twitch (sourced), the
   horizontal position is our reading of their model from one creator at a time
   to many streamers at once, and it is labelled as our reading. */

const SJEKKET = "2026-10-30";
const URL = "https://beta-ads.no/beste-twitch-byra-norge";

type Byra = {
  navn: string;
  url: string;
  base: string;
  hva: string;
  twitch: string;
  modell: string;
  pris: string;
  passer: string;
  kilder: [string, string][];
  oss?: boolean;
};

const grupper: { tittel: string; intro: string; byraer: Byra[] }[] = [
  {
    tittel: "Annonser og mediekjøp på Twitch",
    intro: "Byråer som selger Twitch som en egen kanal, med annonser du kjøper per visning.",
    byraer: [
      {
        navn: "Beta Ads",
        url: "https://beta-ads.no/",
        base: "Oslo. BETA AGENCY AS, org.nr. 933 303 136, stiftet 2024.",
        hva: "Animerte annonser inne i livesendinger på Twitch, YouTube og Kick, hos mange streamere samtidig, med en !kommando i chatten som gir lenken.",
        twitch: "Ja, hovedkanal.",
        modell: "Per 1 000 fullførte visninger. Visninger som ikke leveres, betales tilbake.",
        pris: "Kampanjer fra 100 000 kr.",
        passer: "Merkevarer som vil nå mange gamere i Norden og betale for det som faktisk ble vist.",
        kilder: [["Beta Ads: priser", "https://beta-ads.no/pricing"], ["Brønnøysundregistrene", "https://virksomhet.brreg.no/nb/oppslag/enheter/933303136"]],
        oss: true,
      },
      {
        navn: "M51",
        url: "https://www.m51.no/",
        base: "Oslo. M51 Marketing AS, org.nr. 918 703 950, stiftet 2017.",
        hva: "Digitalt byrå for SEO, annonser og innhold, som også kjøper Twitch-annonser.",
        twitch: "Ja: programmatisk kjøp via Amazon DSP, direkte premiumplasseringer og streamer-samarbeid med rabattkoder og UTM-lenker.",
        modell: "Mediekjøp på CPM, og samarbeid priset per avtale.",
        pris: "Ikke oppgitt.",
        passer: "Annonsører som vil kjøpe Twitch sammen med andre annonsekanaler.",
        kilder: [["M51: Twitch Ads", "https://www.m51.no/tjenester/mediekjop/twitch-ads/"], ["Brønnøysundregistrene", "https://virksomhet.brreg.no/nb/oppslag/enheter/918703950"]],
      },
    ],
  },
  {
    tittel: "Kampanjer med gaming-streamere",
    intro: "Byråer som setter sammen kampanjer med utvalgte streamere og creators.",
    byraer: [
      {
        navn: "Forevr",
        url: "https://forevr.gg/",
        base: "Frederiksberg, Danmark. Ingen norsk adresse oppgitt.",
        hva: "Skandinavisk mediepartner for gaming-, livsstils- og teknologimerker, fra brief til levering, med talenter og annonsekjøp.",
        twitch: "Ja, oppgir Twitch- og YouTube-kompetanse og viser kampanjer merket streaming.",
        modell: "Kampanjer, talent management og annonsekjøp.",
        pris: "Ikke oppgitt.",
        passer: "Merkevarer som vil ha en skandinavisk gaming-kampanje med talenter, styrt fra Danmark.",
        kilder: [["Forevr", "https://forevr.gg/"]],
      },
      {
        navn: "Metapic",
        url: "https://metapic.com/industry/gaming-norway",
        base: "Kontorer i blant annet Stockholm og Berlin. Ingen norsk adresse oppgitt.",
        hva: "Gaming influencer marketing i Norge, med creators fra et europeisk nettverk og lenker som viser klikk og salg.",
        twitch: "Nevner streamere og sendinger der seerne kan handle, men ikke Twitch ved navn.",
        modell: "Byrå eller selvbetjent plattform, målt med sporbare lenker.",
        pris: "Ikke oppgitt.",
        passer: "Merkevarer som først og fremst vil ha salg de kan spore.",
        kilder: [["Metapic: gaming i Norge", "https://metapic.com/industry/gaming-norway"]],
      },
      {
        navn: "GOAT Agency",
        url: "https://goatagency.com/twitch-influencer-marketing-agency/",
        base: "London og New York.",
        hva: "Globalt influencer-byrå som hjelper merkevarer inn i gaming-miljøer gjennom Twitch-streamere.",
        twitch: "Ja: sponsede sendinger, produktplassering og annonsekjøp.",
        modell: "Ikke oppgitt.",
        pris: "Ikke oppgitt.",
        passer: "Globale merkevarer som kjører Twitch i mange land samtidig.",
        kilder: [["GOAT Agency: Twitch", "https://goatagency.com/twitch-influencer-marketing-agency/"]],
      },
    ],
  },
  {
    tittel: "Management for streamere",
    intro: "Byråer som representerer en fast gruppe creators. Du kommer til profilene gjennom dem.",
    byraer: [
      {
        navn: "NOT Management",
        url: "https://notmanagement.no/",
        base: "Alver (Frekhaug). NOT Management AS, org.nr. 931 067 915, stiftet 2023.",
        hva: "Management for gaming- og tech-creators: kontrakter, forhandling og langsiktig strategi, og hjelp til merkevarer med å velge riktige profiler.",
        twitch: "Ikke som egen tjeneste, men flere av profilene deres streamer på Twitch.",
        modell: "Fast talentportefølje og et bredere nettverk av creators.",
        pris: "Ikke oppgitt.",
        passer: "Merkevarer som vil inngå avtale med bestemte norske gaming-creators.",
        kilder: [["NOT Management", "https://notmanagement.no/"], ["Brønnøysundregistrene", "https://virksomhet.brreg.no/nb/oppslag/enheter/931067915"]],
      },
    ],
  },
  {
    tittel: "Brede influencer-byråer",
    intro: "Byråer som kjører influencer-kampanjer på tvers av kanaler. Twitch er ikke nevnt som tjeneste.",
    byraer: [
      {
        navn: "United Influencers",
        url: "https://unitedinfluencers.com/",
        base: "Kontorer i Norge og Sverige. United Influencers Norway AS, org.nr. 912 892 220.",
        hva: "Nordisk influencer-byrå for kampanjer og innhold laget med creators, fra valg av creators til rapport.",
        twitch: "Ikke nevnt. Instagram, TikTok og LinkedIn er kanalene som nevnes.",
        modell: "Kampanjer fra start til slutt.",
        pris: "Ikke oppgitt. Avhenger av omfang og bruksrettigheter.",
        passer: "Livsstils- og forbrukermerker som vil ha kampanjer på Instagram og TikTok.",
        kilder: [["United Influencers", "https://unitedinfluencers.com/"], ["Brønnøysundregistrene", "https://virksomhet.brreg.no/nb/oppslag/enheter/912892220"]],
      },
      {
        navn: "Splay One",
        url: "https://splayone.com/",
        base: "Kontorer i Stockholm, Oslo, Helsingfors og København. Del av Caybon.",
        hva: "Innholdsbyrå som lager underholdning og innhold sammen med creators, med egen talentavdeling.",
        twitch: "Ikke nevnt.",
        modell: "Innholdsproduksjon, talent management og egen plattform.",
        pris: "Ikke oppgitt.",
        passer: "Nordiske merkevarer som vil lage innhold med creators.",
        kilder: [["Splay One", "https://splayone.com/"]],
      },
    ],
  },
];

type Rad = 0 | 1 | 2 | 3;
const RADER: [Rad, string, string][] = [
  [0, "Twitch er hovedkanalen", "Selger først og fremst annonser i livesendinger"],
  [1, "Twitch som egen tjeneste", "Står på byråets egne sider"],
  [2, "Twitch gjennom creators", "Nevnt via streamere eller talenter"],
  [3, "Twitch ikke nevnt", "Andre kanaler først"],
];

type Behov = "visning" | "talenter" | "creator" | "sosiale";
const BEHOV: [Behov, string][] = [
  ["visning", "Annonser per visning"],
  ["talenter", "Kampanje med gaming-talenter"],
  ["creator", "Avtale med bestemte creators"],
  ["sosiale", "Instagram og TikTok"],
];

/* x: 0 = one creator at a time, 1 = many streamers at once (our reading). */
const KART: Record<string, { x: number; rad: Rad; behov: Behov }> = {
  "Beta Ads": { x: 0.86, rad: 0, behov: "visning" },
  "M51": { x: 0.74, rad: 1, behov: "visning" },
  "GOAT Agency": { x: 0.5, rad: 1, behov: "talenter" },
  "Forevr": { x: 0.27, rad: 1, behov: "talenter" },
  "Metapic": { x: 0.7, rad: 2, behov: "talenter" },
  "NOT Management": { x: 0.15, rad: 2, behov: "creator" },
  "United Influencers": { x: 0.6, rad: 3, behov: "sosiale" },
  "Splay One": { x: 0.25, rad: 3, behov: "sosiale" },
};

const faqs: { q: string; a: string }[] = [
  { q: "Hvilket Twitch-byrå i Norge er best?", a: "Det avhenger av hva du skal ha. Vil du kjøpe annonser per visning hos mange streamere, er det byråer som Beta Ads og M51. Vil du ha en kampanje med utvalgte gaming-talenter, er det byråer som Forevr, GOAT Agency og Metapic. Vil du ha avtale med bestemte creators, går du gjennom managementet deres, for eksempel NOT Management." },
  { q: "Finnes det norske byråer som jobber med Twitch?", a: "Ja. Blant de norskregistrerte selger Beta Ads og M51 Twitch som egen tjeneste, og NOT Management representerer norske gaming-creators som streamer på Twitch." },
  { q: "Hvordan er denne oversikten laget?", a: "Den er laget av Beta Ads. Alle opplysninger om de andre byråene er hentet fra byråenes egne nettsider og Brønnøysundregistrene, og lenket til. Det som ikke er oppgitt offentlig, står som Ikke oppgitt. Radene i kartet bygger på hvordan byråene selv omtaler Twitch, og plasseringen fra venstre mot høyre er vår lesning av modellen deres. Listen er ikke rangert." },
  { q: "Hvorfor er ikke Kontent med?", a: "Kom24 meldte 13. februar 2026 at influencer-byrået Kontent skal avvikles i løpet av året." },
  { q: "Noe er feil eller mangler. Hva gjør jeg?", a: "Send en e-post til sales@beta-ads.no med kilden, så retter vi det." },
];

const datoNo = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString("nb-NO", { day: "numeric", month: "long", year: "numeric" });

const Kort: React.FC<{ b: Byra; dim?: boolean; aktiv?: boolean; onVelg?: () => void }> = ({ b, dim, aktiv, onVelg }) => (
  <article
    onClick={onVelg}
    className={`${b.oss ? "rounded-[20px] bg-foreground text-background dark:bg-white/[0.05] dark:text-foreground dark:ring-1 dark:ring-white/10" : "rounded-[12px] border border-border"} p-6 md:p-7 transition-opacity duration-200 ${dim ? "opacity-35" : ""} ${aktiv && !b.oss ? "border-foreground/60" : ""} ${onVelg ? "cursor-pointer" : ""}`}
  >
    <div className="flex items-baseline justify-between gap-3">
      <h3 className="m-0 text-xl font-semibold tracking-tight">
        {b.oss ? b.navn : <a href={b.url} target="_blank" rel="nofollow noopener noreferrer" className="hover:underline underline-offset-2" onClick={(e) => e.stopPropagation()}>{b.navn}</a>}
      </h3>
      {b.oss && <span className="text-[11px] font-semibold uppercase tracking-[0.18em] opacity-60">Det er oss</span>}
    </div>
    <p className="mt-1 mb-0 text-[13px] opacity-60">{b.base}</p>
    <p className="mt-4 mb-0 text-[15px] leading-relaxed">{b.hva}</p>
    <dl className="mt-5 m-0 grid gap-3 text-[14.5px] leading-relaxed">
      {([["Twitch", b.twitch], ["Modell", b.modell], ["Pris", b.pris], ["Passer for", b.passer]] as const).map(([k, v]) => (
        <div key={k} className="grid grid-cols-[92px_minmax(0,1fr)] gap-3">
          <dt className="font-semibold">{k}</dt>
          <dd className="m-0 opacity-80">{v}</dd>
        </div>
      ))}
    </dl>
    <p className="mt-5 mb-0 text-xs opacity-60">
      Kilde:{" "}
      {b.kilder.map(([l, u], i) => (
        <React.Fragment key={u}>
          {i > 0 && ", "}
          <a href={u} target="_blank" rel="nofollow noopener noreferrer" className="underline underline-offset-2" onClick={(e) => e.stopPropagation()}>{l}</a>
        </React.Fragment>
      ))}
    </p>
  </article>
);

const alle = grupper.flatMap((g) => g.byraer);

const Kart: React.FC = () => {
  const [behov, setBehov] = useState<Behov | null>(null);
  const [valgt, setValgt] = useState("Beta Ads");
  const treff = (n: string) => !behov || KART[n].behov === behov;
  const velgBehov = (b: Behov | null) => {
    setBehov(b);
    const forste = alle.find((x) => !b || KART[x.navn].behov === b);
    if (forste) setValgt(forste.navn);
  };
  const v = alle.find((b) => b.navn === valgt)!;
  const pill = (n: string) =>
    `whitespace-nowrap rounded-full px-3.5 h-9 text-[14px] font-semibold border transition-all duration-200 ${
      valgt === n ? "bg-foreground text-background border-foreground" : "bg-background border-border hover:border-foreground/50"
    } ${treff(n) ? "" : "opacity-30"}`;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-[13px] font-semibold">Hva trenger du?</span>
        {[[null, "Alle"] as [Behov | null, string], ...BEHOV].map(([k, l]) => (
          <button key={l} type="button" aria-pressed={behov === k} onClick={() => velgBehov(k)}
            className={`h-9 rounded-full px-3.5 text-[13.5px] font-semibold border transition-colors ${behov === k ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>
            {l}
          </button>
        ))}
      </div>

      <div className="mt-6 grid xl:grid-cols-[1.25fr_1fr] gap-6 items-start">
        {/* map */}
        <div className="rounded-[20px] border border-border p-4 md:p-6">
          <div className="hidden md:grid grid-cols-[170px_minmax(0,1fr)] text-[12px] text-muted-foreground mb-2">
            <span />
            <div className="flex justify-between"><span>&larr; Én creator om gangen</span><span>Mange streamere samtidig &rarr;</span></div>
          </div>
          {RADER.map(([r, t, d]) => {
            const her = alle.filter((b) => KART[b.navn].rad === r);
            return (
              <div key={r} className="grid md:grid-cols-[170px_minmax(0,1fr)] gap-2 md:gap-0 border-t border-border py-4 md:py-0 md:h-[92px] items-center">
                <div className="md:pr-4">
                  <div className="text-[14px] font-semibold leading-tight">{t}</div>
                  <div className="text-[12px] text-muted-foreground leading-snug">{d}</div>
                </div>
                {/* desktop: placed on the axis */}
                <div className="relative hidden md:block h-full">
                  <div className="absolute inset-x-0 top-1/2 h-px border-t border-dashed border-border" />
                  {her.map((b) => (
                    <button key={b.navn} type="button" onClick={() => setValgt(b.navn)} aria-pressed={valgt === b.navn}
                      className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 ${pill(b.navn)}`} style={{ left: `${KART[b.navn].x * 100}%` }}>
                      {b.navn}
                    </button>
                  ))}
                </div>
                {/* phone: a row of pills */}
                <div className="flex flex-wrap gap-2 md:hidden">
                  {her.map((b) => (
                    <button key={b.navn} type="button" onClick={() => setValgt(b.navn)} aria-pressed={valgt === b.navn} className={pill(b.navn)}>{b.navn}</button>
                  ))}
                </div>
              </div>
            );
          })}
          <p className="mt-3 mb-0 text-[12px] text-muted-foreground leading-relaxed border-t border-border pt-3">
            Radene bygger på hvordan byråene selv omtaler Twitch. Plasseringen fra venstre mot høyre er vår
            lesning av modellen deres. Trykk på et byrå for å se fakta og kilder.
          </p>
        </div>

        {/* detail */}
        <div aria-live="polite"><Kort b={v} /></div>
      </div>
    </div>
  );
};

const BesteTwitchByraNorge: React.FC = () => {
  return (
    <>
      <SEO
        title="Twitch-byråer i Norge 2026: oversikt med kilder | Beta Ads"
        description="Kart over byråene som jobber med Twitch og gaming-streamere i Norge: hva de gjør, hvordan de tar betalt og hvem de passer for. Alle fakta med kilde."
        canonical="/beste-twitch-byra-norge"
        ogImage="/lovable-uploads/og/beste-twitch-byra-norge.jpg"
        ogImageAlt="Vegg av norske Twitch-sendinger med samme annonse-overlay"
        locale="no"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Twitch-byråer i Norge 2026: oversikt med kilder",
            inLanguage: "nb-NO",
            dateModified: SJEKKET,
            mainEntityOfPage: URL,
            author: { "@type": "Organization", name: "Beta Ads", legalName: "BETA AGENCY AS", url: "https://beta-ads.no/" },
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Twitch-byråer i Norge",
            itemListOrder: "https://schema.org/ItemListUnordered",
            numberOfItems: alle.length,
            itemListElement: alle.map((b, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "Organization", name: b.navn, url: b.url } })),
          },
          faqLd(faqs),
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Beta Ads", item: "https://beta-ads.no/" },
              { "@type": "ListItem", position: 2, name: "Twitch-byråer i Norge", item: URL },
            ],
          },
        ]}
      />

      <div className="min-h-screen bg-background text-foreground">
        <header className={`${W} pt-28 md:pt-36 pb-10 md:pb-12`}>
          <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-muted-foreground">
            <ol className="m-0 p-0 list-none flex items-center gap-2">
              <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">Twitch-byråer i Norge</li>
            </ol>
          </nav>
          <div className={`${kicker} mb-5`}>Oversikt · Sjekket {datoNo(SJEKKET)}</div>
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-16 items-end">
            <h1 className="text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.2rem] font-bold tracking-[-0.03em] m-0">
              Twitch-byråer i Norge 2026
            </h1>
            <div>
              <p className="m-0 text-lg text-muted-foreground leading-relaxed">
                Hvilket byrå som er best, avhenger av hva du skal ha. Her er byråene en norsk merkevare møter,
                plassert etter hva de faktisk gjør.
              </p>
              <p className="mt-4 mb-0 text-[14px] leading-relaxed text-muted-foreground">
                <b className="text-foreground font-semibold">Laget av Beta Ads,</b> som selv er et av byråene. Alt
                om de andre er hentet fra deres egne sider og Brønnøysundregistrene, med lenke. Ikke rangert.
              </p>
            </div>
          </div>
        </header>

        <section className={`${W} pb-16 md:pb-24`} aria-label="Kart over Twitch-byråer i Norge">
          <Kart />
        </section>

        <section className="border-t border-border py-16 md:py-24">
          <div className={W}>
            <div className={`${kicker} mb-4`}>Alle byråene</div>
            <h2 className={h2}>Fakta og kilder, byrå for byrå.</h2>
            <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 items-start">
              {alle.map((b) => <Kort key={b.navn} b={b} />)}
            </div>
          </div>
        </section>

        <section className="border-t border-border py-16 md:py-20">
          <div className={`${W} grid sm:grid-cols-3 gap-x-10 gap-y-6`}>
            {[
              ["Beta Ads mot et influencer-byrå", "Hva du betaler for, og når et byrå passer bedre.", "/compare/influencer-agency"],
              ["Beta Ads mot Twitch Ads", "Annonse i sendingen eller kjøp via Amazon Ads.", "/compare/twitch-ads"],
              ["Gaming influencer-byrå i Norge", "Se forskjellen på en ekte sending.", "/gaming-influencer-byra-norge"],
            ].map(([t, d, to]) => (
              <Link key={to} to={to} className="group border-t border-border pt-5">
                <span className="text-lg font-semibold tracking-tight">{t} <span aria-hidden="true" className="text-muted-foreground group-hover:text-foreground transition-colors">&rarr;</span></span>
                <p className="mt-1.5 mb-0 text-[15px] leading-relaxed text-muted-foreground">{d}</p>
              </Link>
            ))}
          </div>
        </section>

        <Faq title="Spørsmål om Twitch-byråer i Norge" faqs={faqs} />

        <section className="border-t border-border py-16 md:py-24">
          <div className={`${W} flex flex-col md:flex-row md:items-end md:justify-between gap-8`}>
            <div className="max-w-2xl">
              <h2 className={h2}>Vil du se hvordan vi jobber?</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                På 30 minutter viser vi en norsk kampanje i dashbordet, og sier ærlig fra hvis et annet byrå
                passer bedre for det du skal gjøre.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <PrimaryBtn href={BOOKING_URL} cta="book">Book en demo</PrimaryBtn>
              <GhostBtn href={SALES_MAIL} cta="email">sales@beta-ads.no</GhostBtn>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BesteTwitchByraNorge;
