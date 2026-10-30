import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { BOOKING_URL, SALES_MAIL, W, kicker, h2, PrimaryBtn, GhostBtn, Faq, faqLd } from "@/components/working/shared";
import { LIVE_DEALS } from "@/data/liveDeals";

const SNAPSHOT_DATE = "21. oktober 2026"; // the scan date in src/data/liveDeals.ts, in Norwegian

/* "Gaming influencer-byrå i Norge": the broader query where AI answers and Bing
   list Kontent, United Influencers, Metapic and NOT Management, and Beta Ads is
   absent (checked 2026-10-29). /twitch-byra-norge owns "Twitch-byrå"; this page
   owns the influencer wording and shows the three ways to reach gamers on one
   stream frame you switch between:
     - influencer deal: a real stream from the 21 October scan with a brand
       !command in the title (src/data/liveDeals.ts, frame in /public/checker);
     - ad inside the stream: the real Samsung Galaxy S25 Ultra campaign stream;
     - Twitch ad: a coded pre-roll, labelled as an illustration.
   Price terms are the public ones (per 1 000 fully played views, from 100 000 kr,
   undelivered views refunded, effective CPM 100 to 300 kr). The internal CPM
   ladder is never shown. Case numbers are the homepage ones, each from its page. */

const SIST_OPPDATERT = "2026-10-30";
const URL = "https://beta-ads.no/gaming-influencer-byra-norge";

type Vei = "avtale" | "sending" | "twitch";
const deal = LIVE_DEALS.find((d) => d.login === "agurin")!;

const VEIER: { id: Vei; t: string; hva: string; fakta: [string, string][]; passer: string }[] = [
  {
    id: "avtale",
    t: "Influencer-avtale",
    hva: "Én streamer eller YouTuber snakker om produktet med egne ord, ofte over flere måneder.",
    fakta: [
      ["Du betaler", "Et fast honorar per stream, video eller periode"],
      ["Hvem lager annonsen", "Streameren"],
      ["Antall streamere", "Én eller noen få"],
      ["Hvis det leveres mindre", "Står i kontrakten"],
      ["Hva du ser underveis", "Det streameren eller byrået rapporterer"],
    ],
    passer: "Du vil ha et ansikt for merkevaren og en lang relasjon til én profil.",
  },
  {
    id: "sending",
    t: "Annonse i sendingen",
    hva: "En animert overlay spilles av i hjørnet hos mange streamere samtidig, og en !kommando i chatten gir seerne lenken.",
    fakta: [
      ["Du betaler", "Per 1 000 fullførte visninger, typisk 100 til 300 kr i effektiv CPM"],
      ["Hvem lager annonsen", "Vi lager overlayen for merkevaren din"],
      ["Antall streamere", "Mange i samme kampanje"],
      ["Hvis det leveres mindre", "Betales tilbake for det som mangler"],
      ["Hva du ser underveis", "Eget dashbord med visninger og klikk per streamer"],
    ],
    passer: "Du vil nå mange gamere i Norge eller Norden på kort tid og betale for det som faktisk ble vist.",
  },
  {
    id: "twitch",
    t: "Twitch-annonse",
    hva: "Pre-roll og display kjøpt gjennom Amazon Ads, som selger Twitch sine egne annonseflater.",
    fakta: [
      ["Du betaler", "Per 1 000 visninger i auksjon, uten offentlig prisliste"],
      ["Hvem lager annonsen", "Du leverer video eller banner"],
      ["Antall streamere", "Ingen, plattformen plasserer"],
      ["Hvis det leveres mindre", "Du betaler for det som ble levert"],
      ["Hva du ser underveis", "Rapporter i Amazon Ads"],
    ],
    passer: "Du vil ha bred rekkevidde og allerede kjøper programmatisk video.",
  },
];

const tabell: [string, string, string, string][] = [
  ["Prismodell", "Fast honorar", "Per 1 000 fullførte visninger", "Per 1 000 visninger i auksjon"],
  ["Hvem lager annonsen", "Streameren", "Vi lager overlayen", "Du leverer video eller banner"],
  ["Antall streamere", "Én eller noen få", "Mange i samme kampanje", "Ingen, plattformen plasserer"],
  ["Hvis det leveres mindre", "Står i kontrakten", "Betales tilbake", "Du betaler for det som ble levert"],
  ["Blokkeres av adblock", "Nei", "Nei, overlayen ligger i videobildet", "Ofte"],
];

const kampanjer: { navn: string; tall: string; tekst: string; to: string; img: string }[] = [
  { navn: "Samsung", tall: "800K+", tekst: "visninger. Galaxy S25 og Z Fold7, to kampanjer i Norge.", to: "/case-study/samsung", img: "/lovable-uploads/home-case-samsung.webp" },
  { navn: "Høyskolen Kristiania", tall: "599K+", tekst: "visninger. To Twitch-kampanjer med 31 streamere.", to: "/case-study/kristiania", img: "/lovable-uploads/home-case-kristiania.webp" },
  { navn: "Shure", tall: "182K+", tekst: "visninger. Egen overlay til lanseringen av MV6.", to: "/case-study/shure", img: "/lovable-uploads/home-case-shure.webp" },
  { navn: "Komplett", tall: "151K+", tekst: "visninger. Månedens gaming-deal hos 34 streamere.", to: "/case-study/komplett", img: "/lovable-uploads/home-case-komplett.webp" },
];

const faqs: { q: string; a: string }[] = [
  { q: "Hva er et gaming influencer-byrå?", a: "Et byrå som kobler merkevarer med gaming-streamere og YouTubere. Noen forhandler influencer-avtaler med én profil om gangen, andre kjører annonser inne i livesendinger hos mange streamere samtidig. Beta Ads gjør det siste, i Norge og resten av Norden." },
  { q: "Hvilke gaming influencer-byråer finnes i Norge?", a: "De største typene er management-byråer som representerer en fast gruppe profiler, brede influencer-byråer som også tar gaming, nordiske creator-nettverk som selger sporbare lenker, og Beta Ads, som kjører annonser i selve sendingen på Twitch, YouTube og Kick. Vi har laget en oversikt over byråene med kilder." },
  { q: "Hva koster influencer marketing på Twitch?", a: "En influencer-avtale prises som et honorar per stream eller periode og forhandles med streameren. Hos Beta Ads betaler du per 1 000 fullførte visninger, typisk 100 til 300 kr i effektiv CPM, med kampanjer fra 100 000 kr. Visninger som ikke leveres betales tilbake." },
  { q: "Kan jeg velge hvilke streamere som er med?", a: "Ja. Du kan godkjenne listen over streamere før kampanjen starter, og du ser hver streamer i dashbordet mens kampanjen går." },
  { q: "Dekker dere bare Twitch?", a: "Nei. Annonsene kjører på Twitch, YouTube og Kick, i Norge, Sverige, Danmark og Finland." },
];

/** Video plays only when motion is allowed and not in the prerender (headless Chrome sets webdriver). */
function useMotion() {
  const [ok, setOk] = useState(false);
  useEffect(() => { setOk(!window.matchMedia("(prefers-reduced-motion: reduce)").matches && !navigator.webdriver); }, []);
  return ok;
}

const Video: React.FC<{ src: string; poster: string; alt: string; className?: string }> = ({ src, poster, alt, className }) => {
  const motion = useMotion();
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || !motion) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { rootMargin: "120px" });
    io.observe(v);
    return () => io.disconnect();
  }, [motion]);
  if (!motion) return <img src={poster} alt={alt} className={className} loading="lazy" />;
  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" aria-label={alt} className={className} />;
};

/* The three states of the stream frame. */
const Ramme: React.FC<{ vei: Vei }> = ({ vei }) => {
  if (vei === "sending")
    return <Video src="/home/samsung-s25-stream-a.mp4" poster="/home/samsung-s25-stream-a.jpg" alt="Norsk Twitch-sending med Samsung Galaxy S25 Ultra-overlayen i hjørnet" className="absolute inset-0 h-full w-full object-cover" />;
  if (vei === "avtale")
    return <img src={`/checker/${deal.login}.webp`} alt={`${deal.name} sin Twitch-sending ${SNAPSHOT_DATE}`} className="absolute inset-0 h-full w-full object-cover" />;
  return (
    <div className="absolute inset-0 bg-[#0b0b0d] text-white">
      <div className="absolute left-4 top-4 rounded bg-[#f5c518] px-2 py-0.5 text-[12px] font-bold text-black">Annonse · 0:15</div>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="text-[22px] md:text-[28px] font-bold tracking-tight">Din video-annonse</div>
          <div className="mt-1 text-[13px] text-white/60">Spilles før eller midt i sendingen</div>
        </div>
      </div>
      <div className="absolute right-4 bottom-8 rounded-full border border-white/25 px-3 py-1 text-[12px]">Sendingen fortsetter etter annonsen</div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-white/15"><div className="h-full w-1/3 bg-[#f5c518]" /></div>
    </div>
  );
};

const SeForskjellen: React.FC = () => {
  const [vei, setVei] = useState<Vei>("sending");
  const valgt = VEIER.find((v) => v.id === vei)!;
  const tekst = vei === "sending"
    ? "Ekte sending fra Samsung Galaxy S25 Ultra-kampanjen i Norge. Overlayen spilles av i hjørnet mens streameren sender som vanlig."
    : vei === "avtale"
      ? `Ekte sending ${SNAPSHOT_DATE}: ${deal.name} med ${deal.brand}-kommandoen i tittelen, ${deal.viewers.toLocaleString("nb-NO")} seere.`
      : "Illustrasjon av en pre-roll. Annonsen spilles før sendingen, og blokkeres ofte av adblock.";
  return (
    <div>
      <div role="tablist" aria-label="Tre måter å nå gamere på" className="inline-flex flex-wrap gap-1 rounded-full border border-border p-1">
        {VEIER.map((v) => (
          <button
            key={v.id} type="button" role="tab" aria-selected={vei === v.id} aria-controls="vei-panel" onClick={() => setVei(v.id)}
            className={`h-10 rounded-full px-4 md:px-5 text-[14px] font-semibold transition-colors ${vei === v.id ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
          >
            {v.t}
          </button>
        ))}
      </div>

      <div id="vei-panel" role="tabpanel" className="mt-6 grid lg:grid-cols-[1.35fr_1fr] gap-6 lg:gap-10 items-start">
        <figure className="m-0">
          <div className="relative aspect-video overflow-hidden rounded-[18px] border border-border bg-black">
            <Ramme vei={vei} />
            {vei === "sending" && <span className="absolute left-3 top-3 rounded-full bg-[#e5322d] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">Live</span>}
          </div>
          {vei === "avtale" && (
            <div className="mt-3 flex items-center gap-3 rounded-xl border border-border px-3 py-2.5">
              <img src={`/checker/av-${deal.login}.webp`} alt="" className="h-8 w-8 rounded-full shrink-0" />
              <div className="min-w-0">
                <div className="text-[13px] font-semibold">{deal.name} <span className="font-normal text-muted-foreground">· {deal.game}</span></div>
                <div className="truncate text-[13px] text-muted-foreground">{deal.title}</div>
              </div>
            </div>
          )}
          <figcaption className="mt-3 text-xs text-muted-foreground">{tekst}</figcaption>
        </figure>

        <div>
          <h3 className="m-0 text-2xl font-bold tracking-tight">{valgt.t}</h3>
          <p className="mt-2 mb-0 text-[16px] leading-relaxed text-muted-foreground">{valgt.hva}</p>
          <dl className="mt-6 m-0 border-t border-border">
            {valgt.fakta.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[140px_minmax(0,1fr)] gap-4 border-b border-border py-3 text-[15px]">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="m-0 font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 mb-0 text-[15px] leading-relaxed"><b className="font-semibold">Passer når:</b> {valgt.passer}</p>
        </div>
      </div>
    </div>
  );
};

const GamingInfluencerByraNorge: React.FC = () => (
  <>
    <SEO
      title="Gaming influencer-byrå i Norge | Beta Ads"
      description="Slik når du gamere i Norge: influencer-avtale med én streamer, annonse inne i sendingen hos mange, eller Twitch-annonse. Se forskjellen på en ekte sending."
      canonical="/gaming-influencer-byra-norge"
      ogImage="/lovable-uploads/og/gaming-influencer-byra-norge.jpg"
      ogImageAlt="Samsung Galaxy S25 Ultra-overlay i hjørnet av en norsk Twitch-sending, med chatten ved siden av"
      locale="no"
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Gaming influencer marketing i livesendinger",
          serviceType: ["Gaming influencer marketing", "Livestream-annonsering", "Twitch-annonsering"],
          url: URL,
          dateModified: SIST_OPPDATERT,
          provider: { "@type": "Organization", name: "Beta Ads", legalName: "BETA AGENCY AS", url: "https://beta-ads.no/" },
          areaServed: ["Norge", "Sverige", "Danmark", "Finland"].map((name) => ({ "@type": "Country", name })),
        },
        faqLd(faqs),
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Beta Ads", item: "https://beta-ads.no/" },
            { "@type": "ListItem", position: 2, name: "Gaming influencer-byrå i Norge", item: URL },
          ],
        },
      ]}
    />

    <div className="min-h-screen bg-background text-foreground">
      <header className={`${W} pt-28 md:pt-36 pb-10 md:pb-14`}>
        <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-muted-foreground">
          <ol className="m-0 p-0 list-none flex items-center gap-2">
            <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">Gaming influencer-byrå</li>
          </ol>
        </nav>
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-16 items-end">
          <h1 className="text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.2rem] font-bold tracking-[-0.03em] m-0">
            Gaming influencer-byrå i Norge
          </h1>
          <div>
            <p className="m-0 text-lg text-muted-foreground leading-relaxed">
              Et gaming influencer-byrå kobler merkevarer med streamere og YouTubere. Beta Ads er det norske
              byrået for annonser inne i livesendinger på Twitch, YouTube og Kick: én annonse hos mange
              streamere samtidig, og du betaler per 1 000 fullførte visninger.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <PrimaryBtn href={BOOKING_URL} cta="book">Book en demo</PrimaryBtn>
              <GhostBtn href={SALES_MAIL} cta="email">sales@beta-ads.no</GhostBtn>
            </div>
          </div>
        </div>
      </header>

      {/* ───────── Se forskjellen ───────── */}
      <section className={`${W} pb-16 md:pb-24`} aria-labelledby="forskjell">
        <h2 id="forskjell" className="sr-only">Tre måter å nå gamere på</h2>
        <SeForskjellen />
      </section>

      {/* ───────── Mange sendinger ───────── */}
      <section className="border-t border-border py-16 md:py-24">
        <div className={W}>
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-16 items-end">
            <div>
              <div className={`${kicker} mb-4`}>Én annonse, mange sendinger</div>
              <h2 className={h2}>43 norske streamere. Samme overlay.</h2>
            </div>
            <p className="m-0 text-muted-foreground leading-relaxed">
              Det er forskjellen fra en influencer-avtale: du forhandler ikke med én og én streamer. Samsung
              Galaxy S25 Ultra-kampanjen gikk hos 43 norske streamere og ga 500 131 fullførte visninger, med
              en !kommando i chatten som ga seerne lenken.
            </p>
          </div>
          <figure className="mt-10 m-0">
            <div className="overflow-hidden rounded-[18px] border border-border bg-black">
              <Video src="/home/samsung-s25-wall.mp4" poster="/home/samsung-s25-wall.jpg" alt="25 norske Twitch-sendinger med Samsung-overlayen" className="block w-full h-auto" />
            </div>
            <figcaption className="mt-3 text-xs text-muted-foreground">Ekte sendinger fra Samsung Galaxy S25 Ultra-kampanjen. <Link to="/case-study/samsung" className="underline underline-offset-2">Les hele kampanjen</Link>.</figcaption>
          </figure>
        </div>
      </section>

      {/* ───────── Kampanjer ───────── */}
      <section className="border-t border-border py-16 md:py-24">
        <div className={W}>
          <div className={`${kicker} mb-4`}>Kampanjer vi har kjørt</div>
          <h2 className={h2}>Norske og nordiske merkevarer.</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {kampanjer.map((k) => (
              <Link key={k.to} to={k.to} className="group block">
                <div className="aspect-video overflow-hidden rounded-[14px] border border-border bg-black">
                  <img src={k.img} alt={`${k.navn}-overlay i en Twitch-sending`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <span className="text-[15px] font-semibold">{k.navn}</span>
                  <span className="text-2xl font-bold tracking-tight tabular-nums">{k.tall}</span>
                </div>
                <p className="mt-1 mb-0 text-[14.5px] leading-relaxed text-muted-foreground">{k.tekst}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Alt på ett sted ───────── */}
      <section className="border-t border-border py-16 md:py-24">
        <div className={W}>
          <div className={`${kicker} mb-4`}>Alt på ett sted</div>
          <h2 className={h2}>De tre måtene side om side.</h2>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-[15px]">
              <thead>
                <tr className="text-left">
                  <th className="py-3 pr-6 w-[22%]"><span className="sr-only">Tema</span></th>
                  <th className="py-3 pr-6 font-semibold">Influencer-avtale</th>
                  <th className="py-3 pr-6 font-semibold">Annonse i sendingen</th>
                  <th className="py-3 font-semibold">Twitch-annonse</th>
                </tr>
              </thead>
              <tbody>
                {tabell.map(([tema, a, b, c]) => (
                  <tr key={tema} className="border-t border-border align-top">
                    <th scope="row" className="py-4 pr-6 text-left font-semibold">{tema}</th>
                    <td className="py-4 pr-6 text-muted-foreground">{a}</td>
                    <td className="py-4 pr-6">{b}</td>
                    <td className="py-4 text-muted-foreground">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 mb-0 text-[15px] text-muted-foreground leading-relaxed max-w-3xl">
            Skal du ha en fast ambassadør, er et management-byrå som representerer profilen ofte riktig valg.
            Skal du nå mange gamere på kort tid og vite nøyaktig hva du fikk, er det annonser i sendingen vi gjør.
          </p>
        </div>
      </section>

      {/* ───────── Videre ───────── */}
      <section className="border-t border-border py-16 md:py-20">
        <div className={`${W} grid sm:grid-cols-3 gap-x-10 gap-y-6`}>
          {[
            ["Twitch-byråer i Norge", "Kart over byråene, med kilder.", "/beste-twitch-byra-norge"],
            ["Hva koster det å sponse en streamer?", "Regn om et tilbud med ekte seertall.", "/sponse-streamer-pris"],
            ["Twitch-sponsorsjekker", "Se hvilke merkevarer en streamer allerede jobber med.", "/twitch-sponsorship-checker"],
          ].map(([t, d, to]) => (
            <Link key={to} to={to} className="group border-t border-border pt-5">
              <span className="text-lg font-semibold tracking-tight">{t} <span aria-hidden="true" className="text-muted-foreground group-hover:text-foreground transition-colors">&rarr;</span></span>
              <p className="mt-1.5 mb-0 text-[15px] leading-relaxed text-muted-foreground">{d}</p>
            </Link>
          ))}
        </div>
      </section>

      <Faq title="Vanlige spørsmål om gaming influencer-byråer" faqs={faqs} />

      <section className="border-t border-border py-16 md:py-24">
        <div className={`${W} flex flex-col md:flex-row md:items-end md:justify-between gap-8`}>
          <div className="max-w-2xl">
            <h2 className={h2}>Se en ekte kampanje i dashbordet.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              På 30 minutter viser vi en norsk kampanje fra start til rapport, og sier ærlig fra om
              livestream passer for deg.
            </p>
            <p className="mt-4 mb-0 text-xs text-muted-foreground">
              Sist oppdatert {new Date(`${SIST_OPPDATERT}T12:00:00`).toLocaleDateString("nb-NO", { day: "numeric", month: "long", year: "numeric" })}.
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

export default GamingInfluencerByraNorge;
