import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Loader2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { BOOKING_URL, SALES_MAIL, W, kicker, h2, PrimaryBtn, GhostBtn, Faq, faqLd } from "@/components/working/shared";
import { LIVE_DEALS } from "@/data/liveDeals";

const SNAPSHOT_DATE = "21. oktober 2026"; // the scan date in src/data/liveDeals.ts, in Norwegian

/* "Hva koster det å sponse en streamer?": the sponsorship-fee question, kept
   apart from /twitch-annonsering-pris (ad prices) so the two do not compete.
   There is no sourced price list for Norwegian streamer sponsorships, so the
   page publishes no fee ranges. The page IS the calculator: search a Twitch
   channel (GET /api/creator-sponsors?q= and ?stats=, Twitch only, no Claude
   call) or pick a real stream from the 21 October scan (src/data/liveDeals.ts),
   type the fee, and see kr per 1 000 viewers on a log scale next to Beta Ads'
   public effective CPM of 100 to 300 kr (Andreas, 2026-10-30). Twitch only
   exposes the viewer count right now, not a 30-day average, and the page says so.
   The internal CPM ladder is never shown. */

const SIST_OPPDATERT = "2026-10-30";
const URL = "https://beta-ads.no/sponse-streamer-pris";
const BAND: [number, number] = [100, 300];

type Hit = { login: string; name: string; avatar: string; live: boolean; game: string };
type Kanal = { login: string; name: string; avatar: string; followers: number | null; live: { viewers: number; game: string; title: string } | null };
type Kilde = { navn: string; avatar?: string; tekst: string };

const drivere: [string, string][] = [
  ["Snittseere, ikke følgere", "Det som teller er hvor mange som ser på samtidig mens merkevaren er på skjermen. Twitch kaller det Average Viewers. Følgertall sier lite om hvor mange som faktisk er der."],
  ["Hvor mye sendetid", "Én omtale, en overlay som ligger ute en hel sending og et sponset segment er tre forskjellige leveranser fra samme streamer."],
  ["Nisje og publikum", "En streamer med et smalt publikum som passer produktet ditt, kan være verdt mer enn en større kanal med feil målgruppe."],
  ["Eksklusivitet", "Skal streameren ikke jobbe med konkurrentene dine i en periode, koster det ekstra."],
  ["Rettigheter til innholdet", "Vil du bruke klipp fra sendingen i egne annonser, må det avtales og betales for."],
  ["Management eller ikke", "Mange større streamere har et management som forhandler for dem og tar en andel."],
];

const sjekk: string[] = [
  "Be om snittseere de siste 30 dagene, ikke toppen fra én god kveld.",
  "Avtal hvor mange ganger og hvor lenge merkevaren er på skjermen.",
  "Spør hvem som rapporterer, og hva rapporten inneholder.",
  "Avtal hva som skjer hvis sendingen blir kortere eller avlyst.",
  "Sjekk hvilke merkevarer streameren allerede jobber med.",
];

const faqs: { q: string; a: string }[] = [
  { q: "Hva koster det å sponse en streamer i Norge?", a: "Det finnes ingen offentlig prisliste. Honoraret forhandles med streameren eller managementet, og avhenger mest av snittseere, hvor mye sendetid du får, eksklusivitet og rettigheter. Regn om tilbudet til pris per 1 000 seere, så kan du sammenligne streamere og kanaler." },
  { q: "Hvordan regner jeg om et honorar til pris per 1 000 seere?", a: "Del honoraret på snittseere ganger antall ganger merkevaren vises, og gang med 1 000. Et honorar på 20 000 kr hos en streamer med 500 snittseere, der merkevaren vises 8 ganger, blir 20 000 / (500 × 8) × 1 000 = 5 000 kr per 1 000 seere." },
  { q: "Er det billigere å kjøpe annonser i sendingen enn å sponse én streamer?", a: "Det kommer an på målet. Én streamer gir et ansikt og en personlig anbefaling. Annonser i sendingen hos mange streamere prises per 1 000 fullførte visninger, typisk 100 til 300 kr i effektiv CPM, med kampanjer fra 100 000 kr, og det som ikke leveres betales tilbake." },
  { q: "Hvorfor viser kalkulatoren seere akkurat nå og ikke snittet?", a: "Twitch deler bare hvor mange som ser på akkurat nå. Snittet over tid finner streameren i sin egen Channel Analytics, så be om de siste 30 dagene og skriv det inn." },
  { q: "Hvordan ser jeg hvem som allerede sponser en streamer?", a: "Bruk den gratis Twitch-sponsorsjekkeren vår. Den leser streamtitler, bio og chat-kommandoer og viser hvilke merkevarer kanalen jobber med, med titlene som bevis." },
];

const nf = new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 });
const digits = (s: string) => s.replace(/\D/g, "").slice(0, 9);

/* Log scale from 10 to 100 000 kr, so a 50 kr and a 20 000 kr result both land on the line. */
const LO = 1, HI = 5;
const pos = (v: number) => Math.min(100, Math.max(0, ((Math.log10(Math.max(v, 10)) - LO) / (HI - LO)) * 100));
const TICKS = [10, 100, 1000, 10000, 100000];

const ekte = [...LIVE_DEALS].sort((a, b) => b.viewers - a.viewers).slice(0, 10);

const Kalkulator: React.FC = () => {
  const [honorar, setHonorar] = useState("20000");
  const [seere, setSeere] = useState("500");
  const [ganger, setGanger] = useState(8);
  const [kilde, setKilde] = useState<Kilde | null>(null);

  const [q, setQ] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [feil, setFeil] = useState("");
  const timer = useRef<number>();

  useEffect(() => {
    window.clearTimeout(timer.current);
    if (q.trim().length < 2) { setHits([]); return; }
    timer.current = window.setTimeout(() => {
      fetch(`/api/creator-sponsors?q=${encodeURIComponent(q.trim())}`)
        .then((r) => r.json()).then((d) => { setHits(d.results ?? []); setOpen(true); })
        .catch(() => setHits([]));
    }, 250);
  }, [q]);

  const velg = async (login: string) => {
    setOpen(false); setBusy(true); setFeil("");
    try {
      const r = await fetch(`/api/creator-sponsors?stats=${encodeURIComponent(login)}`);
      const k: Kanal & { error?: string } = await r.json();
      if (!r.ok) throw new Error(k.error || "Fant ikke kanalen.");
      setQ(k.name);
      if (k.live) {
        setSeere(String(k.live.viewers));
        setKilde({ navn: k.name, avatar: k.avatar, tekst: `Live nå med ${nf.format(k.live.viewers)} seere i ${k.live.game || "ukjent kategori"}. Dette er seere akkurat nå, ikke snittet.` });
      } else {
        setKilde({ navn: k.name, avatar: k.avatar, tekst: `Ikke live nå${k.followers ? `, ${nf.format(k.followers)} følgere` : ""}. Twitch viser bare seere mens kanalen sender, så skriv inn snittseere du har fått fra streameren.` });
      }
    } catch (e) {
      setFeil(e instanceof Error ? e.message : "Fant ikke kanalen.");
    } finally {
      setBusy(false);
    }
  };

  const h = Number(honorar), s = Number(seere);
  const kpm = h > 0 && s > 0 && ganger > 0 ? (h / (s * ganger)) * 1000 : null;
  const sammenlign = kpm === null ? "" : kpm < BAND[0] ? "under" : kpm > BAND[1] ? "over" : "innenfor";
  const felt = "mt-1.5 w-full h-12 rounded-xl border border-border bg-background px-3.5 text-[16px] tabular-nums focus:outline-none focus:border-foreground/50";

  return (
    <div className="grid lg:grid-cols-[1fr_1fr] rounded-[22px] border border-border overflow-hidden">
      {/* ── Inndata ── */}
      <div className="p-5 md:p-8 bg-card">
        <label className="block text-[13px] font-semibold" htmlFor="kanal">Twitch-kanal</label>
        <div className="relative mt-1.5">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
          <input
            id="kanal" value={q} autoComplete="off" placeholder="Søk etter en streamer"
            onChange={(e) => setQ(e.target.value)} onFocus={() => hits.length && setOpen(true)}
            onKeyDown={(e) => { if (e.key === "Enter" && hits[0]) velg(hits[0].login); if (e.key === "Escape") setOpen(false); }}
            className="w-full h-12 rounded-xl border border-border bg-background pl-10 pr-10 text-[16px] focus:outline-none focus:border-foreground/50"
          />
          {busy && <Loader2 className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" aria-hidden />}
          {open && hits.length > 0 && (
            <ul className="absolute z-20 mt-1.5 w-full m-0 p-1.5 list-none rounded-xl border border-border bg-background shadow-xl">
              {hits.map((c) => (
                <li key={c.login}>
                  <button type="button" onClick={() => velg(c.login)} className="w-full flex items-center gap-3 rounded-lg px-2.5 py-2 text-left hover:bg-foreground/[0.05]">
                    <img src={c.avatar} alt="" className="h-7 w-7 rounded-full" loading="lazy" />
                    <span className="min-w-0 flex-1 truncate text-[15px] font-medium">{c.name}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">{c.live ? "Live" : c.game}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {feil && <p className="mt-2 mb-0 text-[13px] text-[#e5322d]">{feil}</p>}
        {kilde && (
          <div className="mt-3 flex gap-3 items-start rounded-xl border border-border p-3">
            {kilde.avatar && <img src={kilde.avatar} alt="" className="h-9 w-9 rounded-full shrink-0" />}
            <p className="m-0 text-[13.5px] leading-relaxed text-muted-foreground"><b className="text-foreground font-semibold">{kilde.navn}.</b> {kilde.tekst}</p>
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 gap-4">
          <label className="block text-[13px] font-semibold">Honorar
            <span className="relative block">
              <input className={`${felt} pr-10`} inputMode="numeric" value={honorar} onChange={(e) => setHonorar(digits(e.target.value))} />
              <span className="absolute right-3.5 top-1/2 translate-y-[-25%] text-[14px] text-muted-foreground">kr</span>
            </span>
          </label>
          <label className="block text-[13px] font-semibold">Snittseere
            <input className={felt} inputMode="numeric" value={seere} onChange={(e) => { setSeere(digits(e.target.value)); setKilde(null); }} />
          </label>
        </div>

        <div className="mt-6">
          <div className="flex items-baseline justify-between text-[13px]">
            <label htmlFor="ganger" className="font-semibold">Ganger merkevaren vises</label>
            <span className="tabular-nums text-[15px] font-semibold">{ganger}</span>
          </div>
          <input id="ganger" type="range" min={1} max={30} value={ganger} onChange={(e) => setGanger(Number(e.target.value))} className="mt-3 w-full accent-[#e5322d]" />
          <p className="mt-1 mb-0 text-xs text-muted-foreground">Én omtale er 1. En overlay som spilles av hver halvtime i en firetimers sending er 8.</p>
        </div>
      </div>

      {/* ── Resultat ── */}
      <div className="p-5 md:p-8 border-t lg:border-t-0 lg:border-l border-border flex flex-col" aria-live="polite">
        <div className="text-[13px] font-semibold text-muted-foreground">Pris per 1 000 seere</div>
        <div className="mt-1 text-[3.4rem] md:text-[4.2rem] leading-none font-bold tracking-[-0.03em] tabular-nums">{kpm === null ? "–" : `${nf.format(kpm)} kr`}</div>
        <p className="mt-2 mb-0 text-[13px] text-muted-foreground tabular-nums">
          {kpm === null ? "Fyll inn honorar og seere." : `${nf.format(h)} kr / (${nf.format(s)} seere × ${ganger}) × 1 000`}
        </p>

        {/* scale */}
        <div className="mt-10 mb-2">
          <div className="relative h-14">
            <div className="absolute inset-x-0 top-7 h-px bg-border" />
            <div className="absolute top-[22px] h-[11px] rounded-full bg-foreground/15" style={{ left: `${pos(BAND[0])}%`, width: `${pos(BAND[1]) - pos(BAND[0])}%` }} />
            <span className="absolute top-0 -translate-x-1/2 whitespace-nowrap text-[11px] text-muted-foreground" style={{ left: `${(pos(BAND[0]) + pos(BAND[1])) / 2}%` }}>Beta Ads</span>
            {kpm !== null && (
              <span className="absolute top-[18px] -translate-x-1/2 h-[19px] w-[19px] rounded-full bg-[#e5322d] ring-4 ring-background transition-[left] duration-300" style={{ left: `${pos(kpm)}%` }} aria-hidden />
            )}
            {TICKS.map((t) => (
              <span key={t} className="absolute top-10 -translate-x-1/2 text-[11px] tabular-nums text-muted-foreground" style={{ left: `${pos(t)}%` }}>{nf.format(t)}</span>
            ))}
          </div>
        </div>

        <p className="mt-6 mb-0 text-[15px] leading-relaxed">
          {kpm === null ? null : (
            <>Det er <b className="font-semibold">{sammenlign}</b> det annonser i sendingen hos Beta Ads typisk lander på: <b className="font-semibold">100 til 300 kr</b> i effektiv CPM, hos mange streamere samtidig, og det som ikke leveres betales tilbake.</>
          )}
        </p>
        <div className="mt-auto pt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
          <Link to="/twitch-sponsorship-checker" className="font-semibold">Se hvem som sponser kanalen &rarr;</Link>
          <Link to="/pricing" className="font-semibold text-muted-foreground hover:text-foreground">Slik priser vi &rarr;</Link>
        </div>
      </div>

      {/* ── Ekte sendinger ── */}
      <div className="lg:col-span-2 border-t border-border p-5 md:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="text-[13px] font-semibold">Prøv med en ekte sponset sending</span>
          <span className="text-xs text-muted-foreground">Seere da de sendet med en merkevare-kommando i tittelen, {SNAPSHOT_DATE}</span>
        </div>
        <div className="mt-4 flex gap-2.5 overflow-x-auto pb-1 -mx-1 px-1">
          {ekte.map((d) => (
            <button
              key={d.login} type="button"
              onClick={() => { setSeere(String(d.viewers)); setQ(d.name); setKilde({ navn: d.name, avatar: `/checker/av-${d.login}.webp`, tekst: `Sendte ${d.game} med en ${d.brand}-kommando i tittelen og ${nf.format(d.viewers)} seere, ${SNAPSHOT_DATE}.` }); }}
              className="shrink-0 flex items-center gap-2.5 rounded-full border border-border pl-1.5 pr-4 py-1.5 text-left hover:border-foreground/40 transition-colors"
            >
              <img src={`/checker/av-${d.login}.webp`} alt="" className="h-8 w-8 rounded-full" loading="lazy" />
              <span className="leading-tight">
                <span className="block text-[14px] font-semibold">{d.name}</span>
                <span className="block text-[12px] text-muted-foreground tabular-nums">{nf.format(d.viewers)} seere · {d.brand}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const SponseStreamerPris: React.FC = () => (
  <>
    <SEO
      title="Hva koster det å sponse en streamer i Norge? | Beta Ads"
      description="Regn om et sponsortilbud til pris per 1 000 seere med ekte Twitch-seertall. Hva honoraret bygger på, og hva du bør avtale før du signerer."
      canonical="/sponse-streamer-pris"
      ogImage="/lovable-uploads/og/sponse-streamer-pris.jpg"
      ogImageAlt="En streamer i en sponset Just Chatting-sending på Twitch"
      locale="no"
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Kalkulator for streamer-sponsing",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: URL,
          inLanguage: "nb-NO",
          offers: { "@type": "Offer", price: "0", priceCurrency: "NOK" },
          publisher: { "@type": "Organization", name: "Beta Ads", legalName: "BETA AGENCY AS", url: "https://beta-ads.no/" },
        },
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Hva koster det å sponse en streamer i Norge?",
          inLanguage: "nb-NO",
          dateModified: SIST_OPPDATERT,
          mainEntityOfPage: URL,
          author: { "@type": "Organization", name: "Beta Ads", url: "https://beta-ads.no/" },
        },
        faqLd(faqs),
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Beta Ads", item: "https://beta-ads.no/" },
            { "@type": "ListItem", position: 2, name: "Hva koster det å sponse en streamer?", item: URL },
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
            <li aria-current="page" className="text-foreground">Sponse en streamer</li>
          </ol>
        </nav>
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-16 items-end">
          <h1 className="text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.2rem] font-bold tracking-[-0.03em] m-0">
            Hva koster det å sponse en streamer?
          </h1>
          <p className="m-0 text-lg text-muted-foreground leading-relaxed">
            Det finnes ingen prisliste. Honoraret forhandles, og det som avgjør er hvor mange som ser på
            mens merkevaren din er på skjermen. Søk opp kanalen, skriv inn tilbudet, og se hva det koster
            per 1 000 seere.
          </p>
        </div>
      </header>

      <section className={`${W} pb-16 md:pb-24`} aria-label="Kalkulator">
        <Kalkulator />
      </section>

      {/* ───────── Hva prisen bygger på ───────── */}
      <section className="border-t border-border py-16 md:py-24">
        <div className={`${W} grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16`}>
          <div className="lg:sticky lg:top-28 self-start">
            <div className={`${kicker} mb-4`}>Hva prisen bygger på</div>
            <h2 className={h2}>Seks ting som avgjør honoraret.</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Snittseere finner streameren i sin egen Channel Analytics. Be om de siste 30 dagene.
            </p>
          </div>
          <dl className="m-0 border-t border-border">
            {drivere.map(([t, d], i) => (
              <div key={t} className="grid grid-cols-[44px_minmax(0,1fr)] gap-x-4 border-b border-border py-5">
                <span className="text-sm tabular-nums text-muted-foreground pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <dt className="text-lg font-semibold tracking-tight">{t}</dt>
                  <dd className="mt-1 m-0 text-[15px] leading-relaxed text-muted-foreground">{d}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ───────── Før du signerer ───────── */}
      <section className="border-t border-border py-16 md:py-24">
        <div className={`${W} grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start`}>
          <div>
            <div className={`${kicker} mb-4`}>Før du signerer</div>
            <h2 className={h2}>Fem ting å avtale.</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Se hvilke merkevarer streameren allerede jobber med i{" "}
              <Link to="/twitch-sponsorship-checker" className="text-foreground underline underline-offset-2">Twitch-sponsorsjekkeren</Link>.
              Den er gratis.
            </p>
          </div>
          <ol className="m-0 p-0 list-none border-t border-border">
            {sjekk.map((s, i) => (
              <li key={s} className="grid grid-cols-[44px_minmax(0,1fr)] gap-x-4 border-b border-border py-4 text-[16px] leading-relaxed">
                <span className="text-sm tabular-nums text-muted-foreground pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                {s}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Faq title="Vanlige spørsmål om streamer-sponsing" faqs={faqs} />

      <section className="border-t border-border py-16 md:py-24">
        <div className={`${W} flex flex-col md:flex-row md:items-end md:justify-between gap-8`}>
          <div className="max-w-2xl">
            <h2 className={h2}>Mange streamere, én pris per visning.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Fortell oss målgruppe og budsjett, så viser vi hvor mange visninger det gir og hvilke
              streamere som passer. Kampanjer fra 100 000 kr.
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

export default SponseStreamerPris;
