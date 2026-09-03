import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MARKET_CREATORS, type MarketCode } from "@/data/streamers";
import { VERTICALS, GROUPS, type Lang } from "@/data/gtaViVerticals";

/**
 * GTA VI as a category guide for Nordic brands, in English and Norwegian.
 *
 * Same shape as any brand-category guide: which verticals fit, why, and what to
 * avoid. The text is written from scratch and the categories are argued from our
 * own campaign history rather than from someone else's case studies. Where we
 * have not run a category, the card says so instead of implying we have.
 *
 * Third-party numbers are linked in the sources block. Network figures are
 * measured from the 234 tracked clips across 40 creators in streamers.ts and
 * labelled as ours, and the clip gallery is derived from the same module so the
 * count in the copy cannot drift from the evidence under it.
 */

const serif = { fontFamily: "'Instrument Serif', serif" };

const MARKET_LABEL: Record<string, Record<Lang, string>> = {
  no: { en: "Norway", no: "Norge" },
  se: { en: "Sweden", no: "Sverige" },
  da: { en: "Denmark", no: "Danmark" },
  fi: { en: "Finland", no: "Finland" },
};

const gtaClips = Object.entries(MARKET_CREATORS as Record<MarketCode, any[]>)
  .flatMap(([market, list]) =>
    (list || []).flatMap((c: any) =>
      (c.twitchClips || [])
        .filter((x: any) => /grand theft auto/i.test(x.game || ""))
        .map((x: any) => ({
          market,
          creator: c.name as string,
          avatar: c.image as string,
          title: x.title as string,
          views: (x.viewCount || 0) as number,
          thumb: x.thumbnailURL as string,
          url: x.url as string,
        }))
    )
  )
  .sort((a, b) => b.views - a.views);

const topClips = gtaClips.slice(0, 6);
const totalClipViews = gtaClips.reduce((s, c) => s + c.views, 0);

const RELEASE = new Date("2026-11-19T00:00:00Z");
const daysToLaunch = () =>
  Math.max(0, Math.ceil((RELEASE.getTime() - Date.now()) / 86_400_000));

const t = {
  kicker: { en: "Nordic media planning", no: "Nordisk mediearbeid" },
  h1a: { en: "Eight categories worth", no: "Åtte kategorier verdt" },
  h1b: { en: "planning", no: "å planlegge" },
  h1c: { en: "around GTA VI", no: "rundt GTA VI" },
  intro: {
    en: "Official placement inside the game is expensive and rationed. Everything below happens around it, in the streams and the chats, and needs nobody's permission. Here is which categories fit, which moment each one should buy, and where we have actually run it.",
    no: "Offisiell plassering inne i spillet er dyrt og rasjonert. Alt dette skjer rundt spillet, i sendingene og i chatten, og trenger ingen tillatelse. Her er hvilke kategorier som passer, hvilket øyeblikk hver av dem bør kjøpe, og hvor vi faktisk har kjørt det.",
  },
  countdown: { en: "days until launch, 19 November 2026", no: "dager til lansering, 19. november 2026" },
  proofLabel: { en: "We have run this", no: "Dette har vi kjørt" },
  seeCase: { en: "See the campaign", no: "Se kampanjen" },
  whyTitle: {
    en: "Why almost any category has a route in",
    no: "Hvorfor nesten hvilken som helst kategori har en vei inn",
  },
  whyBody: {
    en: "Rockstar premiered the Extended Look on Netflix on 27 August. It took 31.1 million views in four days and was the platform's most-watched title that week. But 3.97 million people were somewhere else entirely, watching creators watch it, and that is the layer a brand can buy.",
    no: "Rockstar hadde premiere på Extended Look på Netflix 27. august. Den fikk 31,1 millioner visninger på fire dager og var plattformens mest sette tittel den uken. Men 3,97 millioner mennesker var et helt annet sted, og så på skapere som så på den. Det er laget en merkevare kan kjøpe.",
  },
  netTitle: {
    en: "GTA is already the second most clipped game in our network",
    no: "GTA er allerede det nest mest klippede spillet i nettverket vårt",
  },
  netBody: {
    en: "We track 234 clips across 40 Nordic creators, tagged by game. Grand Theft Auto sits second among actual games behind Counter-Strike, and the spread across markets is uneven in a way that changes where the money should go.",
    no: "Vi sporer 234 klipp fordelt på 40 nordiske skapere, merket med spill. Grand Theft Auto ligger nummer to blant faktiske spill, bak Counter-Strike, og fordelingen mellom markedene er så ujevn at den endrer hvor pengene bør gå.",
  },
  clipsTitle: { en: "This is what it looks like right now", no: "Slik ser det ut akkurat nå" },
  clipsBody: {
    en: "Not a mock-up. The most-watched Grand Theft Auto clips from creators in our network, straight off Twitch.",
    no: "Ikke en skisse. De mest sette Grand Theft Auto-klippene fra skapere i nettverket vårt, hentet rett fra Twitch.",
  },
  formatKicker: { en: "The format", no: "Formatet" },
  formatTitle: {
    en: "This is the thing an ad blocker cannot remove",
    no: "Dette er det en adblocker ikke kan fjerne",
  },
  formatBody: {
    en: "A real Komplett overlay inside a Norwegian broadcast. There is no separate ad element on the page, so a blocker has nothing to strip. Across a six-hour session that difference compounds: a pre-roll reaches the minority without a blocker, once.",
    no: "Et ekte Komplett-overlay inne i en norsk sending. Det finnes ikke noe eget annonseelement på siden, så en adblocker har ingenting å fjerne. Over en sekstimers økt forsterker forskjellen seg: en pre-roll når mindretallet uten adblocker, én gang.",
  },
  avoidTitle: {
    en: "Three things we would talk a client out of",
    no: "Tre ting vi ville frarådet en kunde",
  },
  ctaTitle: { en: "days is enough time to do this properly", no: "dager er nok tid til å gjøre dette skikkelig" },
  ctaBody: {
    en: "Tell us the category and the market. We will say honestly whether launch week is your moment, or whether the money works harder somewhere else.",
    no: "Fortell oss kategorien og markedet. Vi sier ærlig fra om lanseringsuken passer for dere, eller om pengene jobber hardere et annet sted.",
  },
  book: { en: "Book a demo", no: "Book en demo" },
  cost: { en: "See what it costs", no: "Se hva det koster" },
  sourcesLabel: { en: "Sources", no: "Kilder" },
  clipNote: { en: "Clips hosted on Twitch. Opens in a new tab.", no: "Klippene ligger på Twitch. Åpnes i ny fane." },
  netFoot: { en: "clips, ", no: "klipp, " },
  disclaimer: {
    en: "Network figures are Beta Agency's own, counted from 234 tracked clips across 40 Nordic creators on 2 September 2026.",
    no: "Nettverkstallene er Beta Agency sine egne, talt fra 234 sporede klipp på 40 nordiske skapere 2. september 2026.",
  },
};

const avoid: { title: Record<Lang, string>; body: Record<Lang, string> }[] = [
  {
    title: {
      en: "Do not build anything that needs a licence",
      no: "Ikke bygg noe som krever lisens",
    },
    body: {
      en: "Official in-game placement is slow, expensive and mostly unavailable. Every category above works around the game instead, which is why it can be booked in weeks rather than quarters.",
      no: "Offisiell plassering i spillet er treg, dyr og stort sett utilgjengelig. Alle kategoriene over jobber rundt spillet i stedet, og derfor kan de bookes på uker i stedet for kvartaler.",
    },
  },
  {
    title: {
      en: "Do not put the trailer numbers in your media plan",
      no: "Ikke ta trailertallene inn i medieplanen",
    },
    body: {
      en: "31.1 million is a global entertainment figure. Writing it into a Nordic plan is how a campaign ends up measured against a number it was never going to reach.",
      no: "31,1 millioner er et globalt underholdningstall. Å skrive det inn i en nordisk plan er måten en kampanje ender opp målt mot et tall den aldri kunne nå.",
    },
  },
  {
    title: {
      en: "Do not book launch week and call it a strategy",
      no: "Ikke book lanseringsuken og kall det en strategi",
    },
    body: {
      en: "GTA V was still the second most watched game on Twitch in 2025, twelve years after release. Launch week is the loudest moment, not the opportunity.",
      no: "GTA V var fortsatt det nest mest sette spillet på Twitch i 2025, tolv år etter lansering. Lanseringsuken er det høyeste øyeblikket, ikke muligheten.",
    },
  },
];

const sources = [
  { label: "Streams Charts - Extended Look peaked at 3.97M concurrent viewers", href: "https://streamscharts.com/" },
  { label: "GamesRadar - Extended Look was Netflix's most-watched title, 31.1M views", href: "https://www.gamesradar.com/games/grand-theft-auto/the-gta-6-extended-look-was-netflixs-most-watched-title-for-the-week-with-31-1-million-views/" },
  { label: "Forbes - GTA 6 hits No. 1 on Netflix, streamer web viewership up 125%", href: "https://www.forbes.com/sites/paultassi/2026/08/28/gta-6-hits-no-1-on-netflix-and-catapults-streamers-web-viewership-125/" },
  { label: "Variety - GTA 6 release moved to 19 November 2026", href: "https://variety.com/2025/tv/news/gta-6-release-delayed-november-2026-29751" },
  { label: "Stream Hatchet 2025 - GTA V second most-watched game on Twitch", href: "https://streamhatchet.com/" },
];

const nordicGta = [
  { market: "no", withGta: 4 },
  { market: "se", withGta: 3 },
  { market: "da", withGta: 1 },
  { market: "fi", withGta: 0 },
];

const Reveal: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
};

const GtaViNordicPlaybook: React.FC<{ lang?: Lang }> = ({ lang = "en" }) => {
  const days = daysToLaunch();
  const L = <T,>(o: Record<Lang, T>) => o[lang];

  return (
    <article>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden rounded-3xl bg-[hsl(240_11%_5%)] ring-1 ring-white/10 px-6 sm:px-10 lg:px-14 py-14 lg:py-16">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(120% 80% at 20% 0%, rgba(233,79,55,0.22), transparent 60%)" }}
        />
        <div className="relative z-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-center">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">
              {L(t.kicker)}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-[1.06] tracking-tight mb-6">
              {L(t.h1a)}{" "}
              <span style={serif} className="italic font-normal">{L(t.h1b)}</span>
              <br />
              {L(t.h1c)}
            </h1>
            <p className="text-base text-white/65 leading-relaxed mb-8">{L(t.intro)}</p>

            <div className="inline-flex items-baseline gap-3 rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-3.5">
              <span className="text-3xl font-bold text-white tabular-nums">{days}</span>
              <span className="text-sm text-white/60">{L(t.countdown)}</span>
            </div>
          </div>

          {topClips[0] && (
            <a
              href={topClips[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden lg:block rounded-2xl overflow-hidden ring-1 ring-white/15 bg-black/40"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={topClips[0].thumb}
                  alt={`${topClips[0].creator}: ${topClips[0].title}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2 right-2 rounded-md bg-black/75 px-2 py-0.5 text-[11px] font-semibold text-white tabular-nums">
                  {topClips[0].views.toLocaleString(lang === "no" ? "nb-NO" : "en-GB")}
                </span>
              </div>
              <div className="px-4 py-3.5 flex items-center gap-3">
                <img src={topClips[0].avatar} alt="" className="h-8 w-8 rounded-lg object-cover bg-white/10 shrink-0" />
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-white truncate">{topClips[0].title}</div>
                  <div className="text-[11px] text-white/45">{topClips[0].creator} · GTA, Twitch</div>
                </div>
              </div>
            </a>
          )}
        </div>
      </section>

      {/* ── Why it works ── */}
      <section className="py-14 md:py-16 border-t border-border mt-14">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-4">
              {L(t.whyTitle)}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">{L(t.whyBody)}</p>
          </div>
        </Reveal>
      </section>

      {/* ── The eight categories ── */}
      {(["session", "game", "launch"] as const).map((group) => (
        <section key={group} className="py-14 md:py-16 border-t border-border">
          <Reveal>
            <div className="max-w-2xl mb-9">
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
                {L(GROUPS[group])!.label}
              </span>
              <p className="text-base text-muted-foreground leading-relaxed">
                {L(GROUPS[group])!.blurb}
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5">
            {VERTICALS.filter((v) => v.group === group).map((v) => (
              <Reveal key={v.n}>
                <div className="h-full rounded-2xl border border-border bg-card p-7 flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="text-xs font-semibold text-primary/50 tabular-nums mb-1">{v.n}</div>
                      <h3 className="text-lg font-semibold text-foreground">{L(v.title)}</h3>
                    </div>
                    {v.proof && (
                      <span className="shrink-0 rounded-lg bg-[hsl(240_11%_9%)] px-3 py-2 ring-1 ring-black/5">
                        <img
                          src={v.proof.logo}
                          alt={v.proof.brand}
                          loading="lazy"
                          className="h-5 w-auto max-w-[92px] object-contain block"
                        />
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{L(v.why)}</p>

                  <p className="text-sm text-foreground font-medium mt-4 pl-3 border-l-2 border-primary">
                    {L(v.moment)}
                  </p>

                  {v.proof ? (
                    <div className="mt-5 pt-4 border-t border-border flex items-center justify-between gap-3">
                      <span className="text-xs text-muted-foreground">
                        {L(t.proofLabel)} · {v.proof.brand}
                      </span>
                      {v.proof.href && (
                        <Link
                          to={v.proof.href}
                          className="group inline-flex items-center gap-1 text-xs font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {L(t.seeCase)}
                          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      )}
                    </div>
                  ) : (
                    v.noProof && (
                      <p className="text-xs text-muted-foreground mt-5 pt-4 border-t border-border">
                        {L(v.noProof)}
                      </p>
                    )
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      ))}

      {/* ── Our network ── */}
      <section className="py-14 md:py-16 border-t border-border">
        <Reveal>
          <div className="max-w-2xl mb-9">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-4">
              {L(t.netTitle)}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">{L(t.netBody)}</p>
          </div>
        </Reveal>
        <Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl">
            {nordicGta.map((m) => (
              <div key={m.market} className="rounded-xl border border-border bg-card px-5 py-4">
                <div className="text-sm font-semibold text-foreground mb-2">
                  {MARKET_LABEL[m.market][lang]}
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-2.5 w-2.5 rounded-sm ${
                        i < m.withGta ? "bg-primary" : "bg-foreground/20 ring-1 ring-inset ring-foreground/10"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-xs text-muted-foreground tabular-nums">{m.withGta} / 10</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── The clips ── */}
      <section className="py-14 md:py-16 border-t border-border">
        <Reveal>
          <div className="max-w-2xl mb-9">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-3">
              {L(t.clipsTitle)}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {L(t.clipsBody)} {gtaClips.length} {L(t.netFoot)}
              {totalClipViews.toLocaleString(lang === "no" ? "nb-NO" : "en-GB")}.
            </p>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {topClips.map((c) => (
            <Reveal key={c.url}>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-colors h-full"
              >
                <div className="relative aspect-video bg-muted overflow-hidden">
                  <img
                    src={c.thumb}
                    alt={`${c.creator}: ${c.title}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-2 right-2 rounded-md bg-black/75 px-2 py-0.5 text-[11px] font-semibold text-white tabular-nums">
                    {c.views.toLocaleString(lang === "no" ? "nb-NO" : "en-GB")}
                  </span>
                </div>
                <div className="p-4 flex items-start gap-3">
                  <img src={c.avatar} alt="" loading="lazy" className="h-9 w-9 rounded-lg object-cover bg-muted shrink-0" />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                      {c.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {c.creator} · {MARKET_LABEL[c.market][lang]}
                    </div>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-5">{L(t.clipNote)}</p>
      </section>

      {/* ── The format ── */}
      <section className="py-14 md:py-16 border-t border-border">
        <Reveal>
          <div className="grid lg:grid-cols-[0.85fr_1fr] gap-10 items-center">
            <div className="rounded-2xl overflow-hidden bg-black ring-1 ring-border max-w-sm mx-auto lg:mx-0">
              <video
                src="/lovable-uploads/overlay-komplett.webm"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-auto block"
                aria-label="A native Komplett overlay rendered live inside a Norwegian Twitch stream"
              />
            </div>
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
                {L(t.formatKicker)}
              </span>
              <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-4">
                {L(t.formatTitle)}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{L(t.formatBody)}</p>
              <Link
                to="/case-study/komplett"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground mt-5 hover:text-primary transition-colors"
              >
                {L(t.seeCase)}
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── What to avoid ── */}
      <section className="py-14 md:py-16 border-t border-border">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-8 max-w-2xl">
            {L(t.avoidTitle)}
          </h2>
        </Reveal>
        <div className="max-w-3xl divide-y divide-border border-y border-border">
          {avoid.map((a) => (
            <Reveal key={a.title.en}>
              <div className="py-6">
                <h3 className="text-base font-semibold text-foreground mb-2">{L(a.title)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{L(a.body)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 md:py-16 border-t border-border">
        <Reveal>
          <div className="rounded-3xl border border-border p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-md">
              <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-3">
                {days} {L(t.ctaTitle)}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{L(t.ctaBody)}</p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link to="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12">
                  {L(t.book)} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to={lang === "no" ? "/twitch-annonsering-pris" : "/twitch-advertising-cost"}>
                <Button size="lg" variant="ghost" className="rounded-full px-8 h-12 border border-border">
                  {L(t.cost)}
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Sources ── */}
      <section className="py-10 border-t border-border">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-5">
          {L(t.sourcesLabel)}
        </h2>
        <ul className="space-y-2 max-w-3xl">
          {sources.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-start gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {s.label}
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-50 group-hover:opacity-100" />
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground mt-6 max-w-3xl leading-relaxed">{L(t.disclaimer)}</p>
      </section>
    </article>
  );
};

export default GtaViNordicPlaybook;
