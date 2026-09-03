import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MARKET_CREATORS, type MarketCode } from "@/data/streamers";
import { VERTICALS, GROUPS } from "@/data/gtaViVerticals";
import { BASICS, PLACES, TIMELINE, SCALE, PLATFORM_SPLIT, SOURCES, FILMS, type Lang } from "@/data/gtaVi";
import { YouTubeFacade } from "@/components/blog/YouTubeFacade";

/**
 * Grand Theft Auto VI, explained first and sold second.
 *
 * An earlier version of this post opened with our own campaign history and used
 * our creators' clips as the illustration. The feedback was blunt and correct:
 * a reader who does not follow games learned nothing about the thing the post
 * is named after. So the spine here is the game. What it is, where it is set,
 * who you play, how it got to a November 2026 date, and how big the numbers
 * actually are, all with Rockstar's own stills and third-party sources.
 *
 * The brand argument only starts at "Netflix had the premiere", which is the
 * one place the two subjects genuinely meet: the showcase was on Netflix, and
 * roughly four million people watched it somewhere else entirely.
 *
 * Every figure above that point is somebody else's, sourced in the block at the
 * bottom. The only numbers we claim are our own tracked clips, and those are
 * derived live from streamers.ts so the copy cannot drift from the evidence.
 *
 * Artwork is Rockstar Games' promotional material, used editorially. We have no
 * relationship with Rockstar or Take-Two and the credit line says so.
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

const topClips = gtaClips.slice(0, 3);
const totalClipViews = gtaClips.reduce((s, c) => s + c.views, 0);

const RELEASE = new Date("2026-11-19T00:00:00Z");
const daysToLaunch = () =>
  Math.max(0, Math.ceil((RELEASE.getTime() - Date.now()) / 86_400_000));

const sourceById = (id: string) => SOURCES.find((s) => s.id === id);

const t = {
  kicker: { en: "The game, explained", no: "Spillet, forklart" },
  h1a: { en: "The biggest launch", no: "Årets største" },
  h1b: { en: "of the year", no: "lansering" },
  h1c: { en: "is a video game", no: "er et videospill" },
  intro: {
    en: "Grand Theft Auto VI arrives on 19 November. If you plan media in the Nordics and have not been following it, this is the part worth reading before somebody asks you for a launch plan: what the game is, how big it already is, and where its audience actually sits.",
    no: "Grand Theft Auto VI kommer 19. november. Planlegger du media i Norden og ikke har fulgt med, er dette verdt å lese før noen ber deg om en lanseringsplan: hva spillet er, hvor stort det allerede er, og hvor publikummet faktisk sitter.",
  },
  countdown: { en: "days to launch", no: "dager til lansering" },

  filmsTitle: { en: "Watch it yourself", no: "Se det selv" },
  filmsBody: {
    en: "Three videos, all from Rockstar's own channel, and between them the whole public record of what the game looks like. The second trailer was the biggest video launch ever measured; the third premiered on Netflix before it reached YouTube. Nothing loads until you press play.",
    no: "Tre videoer, alle fra Rockstars egen kanal, og til sammen alt som er offentlig kjent om hvordan spillet ser ut. Trailer to var den største videolanseringen som er målt, og den tredje hadde premiere på Netflix før den kom på YouTube. Ingenting lastes før du trykker play.",
  },
  playLabel: { en: "Play", no: "Spill av" },

  basicsTitle: { en: "Start here", no: "Start her" },
  basicsBody: {
    en: "Four things that settle most of the questions.",
    no: "Fire ting som avklarer de fleste spørsmålene.",
  },
  artCaption: {
    en: "Jason and Lucia, the two playable leads. Rockstar's own key art for the game.",
    no: "Jason og Lucia, de to spillbare hovedpersonene. Rockstars egen nøkkelkunst for spillet.",
  },

  mapTitle: { en: "It is a whole state, not a city", no: "Det er en hel delstat, ikke en by" },
  mapBody: {
    en: "GTA V was Los Angeles and the desert behind it. GTA VI is Leonida: a coastal metropolis, an island chain, wetlands, a national park and the small towns in between. Six of the places Rockstar has shown so far.",
    no: "GTA V var Los Angeles og ørkenen bak. GTA VI er Leonida: en kystby, en øyrekke, våtmarker, en nasjonalpark og småbyene imellom. Seks av stedene Rockstar har vist så langt.",
  },

  castTitle: { en: "Two leads, one story", no: "To hovedpersoner, én historie" },
  castBody: {
    en: "For the first time in the numbered series you play a pair rather than a person. The series has never had a female protagonist before, and it has never built a whole story on a relationship.",
    no: "For første gang i den nummererte serien spiller du et par i stedet for én person. Serien har aldri hatt en kvinnelig hovedperson før, og har aldri bygget en hel historie på et forhold.",
  },
  luciaName: { en: "Lucia Caminos", no: "Lucia Caminos" },
  luciaBody: {
    en: "Out of Leonida Penitentiary and back in Vice City, doing whatever it takes to get her mother out of the life they left Liberty City for. The first female protagonist in the mainline series.",
    no: "Ute fra Leonida-fengselet og tilbake i Vice City, der hun gjør det som skal til for å få moren ut av livet de forlot Liberty City for. Den første kvinnelige hovedpersonen i hovedserien.",
  },
  jasonName: { en: "Jason Duval", no: "Jason Duval" },
  jasonBody: {
    en: "Grew up around grifters, did a stint in the army, and is now looking for the easy way out that this series has never once granted anybody. The other half of the partnership.",
    no: "Vokste opp blant svindlere, hadde en periode i militæret, og leter nå etter den enkle utveien denne serien aldri har gitt noen. Den andre halvdelen av forholdet.",
  },

  scaleTitle: { en: "The scale is not a games number", no: "Tallene er ikke gamingtall" },
  scaleBody: {
    en: "None of these are ours and none of them are estimates. They are published third-party figures, and they are why this is a media event rather than a product launch.",
    no: "Ingen av disse er våre, og ingen av dem er anslag. Det er publiserte tall fra tredjepart, og de er grunnen til at dette er en mediebegivenhet og ikke en produktlansering.",
  },

  timeTitle: { en: "How it got to November", no: "Veien til november" },
  timeBody: {
    en: "Two delays have made people cynical about the date. The pre-order figures suggest the market is not.",
    no: "To utsettelser har gjort folk skeptiske til datoen. Forhåndssalget tyder på at markedet ikke er det.",
  },

  splitKicker: { en: "Where this touches media", no: "Der dette møter media" },
  splitTitle: {
    en: "Netflix had the premiere. Creators had the audience.",
    no: "Netflix hadde premieren. Skaperne hadde publikummet.",
  },
  splitBody: {
    en: "Rockstar put the Extended Look on Netflix, where it drew 31.1 million views in four days. At the same time, people watching creators react to it peaked at an estimated 3.97 million at once, more than Summer Game Fest managed this year. That second audience is the one a brand can actually buy, and this is how its hours split across platforms.",
    no: "Rockstar la Extended Look på Netflix, der den fikk 31,1 millioner visninger på fire dager. Samtidig toppet folk som så skapere reagere på den seg på anslagsvis 3,97 millioner samtidig, mer enn Summer Game Fest klarte i år. Det andre publikummet er det en merkevare faktisk kan kjøpe, og slik fordelte timene seg mellom plattformene.",
  },
  splitCaveat: {
    en: "The 3.97 million figure is Streams Charts' estimate from public stream data, not an official Netflix or Twitch disclosure. The platform split is theirs too, measured in hours watched.",
    no: "Tallet 3,97 millioner er Streams Charts sitt anslag basert på offentlige strømmedata, ikke en offisiell opplysning fra Netflix eller Twitch. Fordelingen mellom plattformer er også deres, målt i sette timer.",
  },
  splitConcurrent: {
    en: "estimated peak concurrent viewers on reaction streams",
    no: "anslått topp i samtidige seere på reaksjonsstrømmer",
  },
  splitShare: {
    en: "Share of hours watched, on a full 100% track. ",
    no: "Andel av sette timer, på en full 100 %-skala. ",
  },

  netTitle: {
    en: "GTA is already the second most clipped game in our network",
    no: "GTA er allerede det nest mest klippede spillet i nettverket vårt",
  },
  netBody: {
    en: "None of the numbers above are ours. This one is. We track 234 clips across 40 Nordic creators, tagged by game, and Grand Theft Auto sits second among actual games behind Counter-Strike, on the twelve-year-old edition. The spread across markets is uneven enough to change where the money should go.",
    no: "Ingen av tallene over er våre. Dette er det. Vi sporer 234 klipp fordelt på 40 nordiske skapere, merket med spill, og Grand Theft Auto ligger nummer to blant faktiske spill bak Counter-Strike, på den tolv år gamle utgaven. Fordelingen mellom markedene er ujevn nok til å endre hvor pengene bør gå.",
  },
  clipNote: { en: "Clips hosted on Twitch. Opens in a new tab.", no: "Klippene ligger på Twitch. Åpnes i ny fane." },

  vertTitle: { en: "Eight categories with a route in", no: "Åtte kategorier med en vei inn" },
  vertBody: {
    en: "Official placement inside the game is expensive and rationed. Everything below happens around it and needs nobody's permission. Where we have run the category the brand is named, and where we have not, the card says so.",
    no: "Offisiell plassering inne i spillet er dyrt og rasjonert. Alt dette skjer rundt spillet og trenger ingen tillatelse. Der vi har kjørt kategorien er merket navngitt, og der vi ikke har, står det på kortet.",
  },
  proofLabel: { en: "We have run this", no: "Dette har vi kjørt" },
  seeCase: { en: "See the campaign", no: "Se kampanjen" },

  formatKicker: { en: "The format", no: "Formatet" },
  formatTitle: {
    en: "This is what an ad blocker cannot remove",
    no: "Dette er det en adblocker ikke kan fjerne",
  },
  formatBody: {
    en: "A real Komplett overlay inside a Norwegian broadcast. There is no separate ad element on the page, so a blocker has nothing to strip. Across a six-hour launch stream that difference compounds: a pre-roll reaches the minority without a blocker, once.",
    no: "Et ekte Komplett-overlay inne i en norsk sending. Det finnes ikke noe eget annonseelement på siden, så en adblocker har ingenting å fjerne. Over en seks timers lanseringsstream forsterker forskjellen seg: en pre-roll når mindretallet uten adblocker, én gang.",
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
  disclaimer: {
    en: "Grand Theft Auto VI artwork and screenshots are Rockstar Games' promotional material, shown here to illustrate coverage of the game. Beta Agency AS is not affiliated with, endorsed by or working with Rockstar Games or Take-Two Interactive. Network figures are our own, counted from 234 tracked clips across 40 Nordic creators on 3 September 2026.",
    no: "Kunst og skjermbilder fra Grand Theft Auto VI er Rockstar Games sitt promoteringsmateriell, vist her for å illustrere omtale av spillet. Beta Agency AS er ikke tilknyttet, godkjent av eller i samarbeid med Rockstar Games eller Take-Two Interactive. Nettverkstallene er våre egne, talt fra 234 sporede klipp på 40 nordiske skapere 3. september 2026.",
  },
};

const avoid: { title: Record<Lang, string>; body: Record<Lang, string> }[] = [
  {
    title: {
      en: "Do not build anything that needs a licence",
      no: "Ikke bygg noe som krever lisens",
    },
    body: {
      en: "Official in-game placement is slow, expensive and mostly unavailable. Everything on this page works around the game instead, which is why it can be booked in weeks rather than quarters.",
      no: "Offisiell plassering i spillet er treg, dyr og stort sett utilgjengelig. Alt på denne siden jobber rundt spillet i stedet, og derfor kan det bookes på uker i stedet for kvartaler.",
    },
  },
  {
    title: {
      en: "Do not put the global numbers in a Nordic media plan",
      no: "Ikke ta de globale tallene inn i en nordisk medieplan",
    },
    body: {
      en: "31.1 million and 3.97 million are worldwide entertainment figures. Writing them into a Nordic plan is how a campaign ends up measured against a number it was never going to reach.",
      no: "31,1 millioner og 3,97 millioner er globale underholdningstall. Å skrive dem inn i en nordisk plan er måten en kampanje ender opp målt mot et tall den aldri kunne nå.",
    },
  },
  {
    title: {
      en: "Do not book launch week and call it a strategy",
      no: "Ikke book lanseringsuken og kall det en strategi",
    },
    body: {
      en: "GTA V came out in 2013 and is still one of the most watched games on Twitch. Launch week is the loudest moment, not the whole opportunity.",
      no: "GTA V kom i 2013 og er fortsatt et av de mest sette spillene på Twitch. Lanseringsuken er det høyeste øyeblikket, ikke hele muligheten.",
    },
  },
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

/** Inline attribution next to a figure, so the number and its source travel together. */
const SourceLink: React.FC<{ id?: string }> = ({ id }) => {
  const s = id ? sourceById(id) : undefined;
  if (!s) return null;
  return (
    <a
      href={s.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-0.5 text-[11px] text-muted-foreground/70 hover:text-primary transition-colors"
    >
      {s.publisher}
      <ArrowUpRight className="w-2.5 h-2.5" />
    </a>
  );
};

const GtaViNordicPlaybook: React.FC<{ lang?: Lang }> = ({ lang = "en" }) => {
  const days = daysToLaunch();
  const L = <T,>(o: Record<Lang, T>) => o[lang];
  const loc = lang === "no" ? "nb-NO" : "en-GB";

  return (
    <article>
      {/* ── Hero: Rockstar's key art, the countdown, the premise ── */}
      <section className="relative overflow-hidden rounded-3xl bg-[hsl(240_11%_5%)] ring-1 ring-white/10">
        <img
          src="/lovable-uploads/gta6/jason-lucia-car.webp"
          alt="Rockstar key art of Jason and Lucia in Vice City"
          width={1280}
          height={720}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* The headline sits on the left, so the art is only allowed to be
            legible on the right third. Two layers: a hard horizontal wipe for
            the text, and a light vertical one so the countdown chip keeps its
            contrast against the bright lower half of the illustration. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(95deg, hsl(240 11% 5%) 0%, hsl(240 11% 5% / 0.96) 38%, hsl(240 11% 5% / 0.72) 62%, hsl(240 11% 5% / 0.35) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, hsl(240 11% 5% / 0.55), transparent 55%)",
          }}
        />
        <div className="relative z-10 px-6 sm:px-10 lg:px-14 py-14 lg:py-20 max-w-2xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">
            {L(t.kicker)}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-[1.06] tracking-tight mb-6">
            {L(t.h1a)}{" "}
            <span style={serif} className="italic font-normal">{L(t.h1b)}</span>
            <br />
            {L(t.h1c)}
          </h1>
          <p className="text-base text-white/70 leading-relaxed mb-8">{L(t.intro)}</p>
          <div className="inline-flex items-baseline gap-3 rounded-2xl border border-white/15 bg-white/[0.07] px-5 py-3.5 backdrop-blur-sm">
            <span className="text-3xl font-bold text-white tabular-nums">{days}</span>
            <span className="text-sm text-white/60">{L(t.countdown)}</span>
          </div>
        </div>
      </section>

      {/* ── The videos: Rockstar's own uploads, click to load ── */}
      <section className="py-14 md:py-16 border-t border-border mt-14">
        <Reveal>
          <div className="max-w-2xl mb-9">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-3">
              {L(t.filmsTitle)}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">{L(t.filmsBody)}</p>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FILMS.map((f) => (
            <Reveal key={f.id}>
              <YouTubeFacade
                id={f.id}
                poster={f.poster}
                title={L(f.title)}
                meta={L(f.meta)}
                playLabel={L(t.playLabel)}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── The basics ── */}
      <section className="py-14 md:py-16 border-t border-border">
        <Reveal>
          <div className="max-w-2xl mb-9">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-3">
              {L(t.basicsTitle)}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">{L(t.basicsBody)}</p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-8 max-w-4xl">
          {BASICS.map((b) => (
            <Reveal key={b.label.en}>
              <div className="border-t border-border pt-5">
                <div className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">
                  {L(b.label)}
                </div>
                <div className="text-xl font-semibold text-foreground tracking-tight mb-2">
                  {L(b.value)}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{L(b.detail)}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <figure className="mt-12">
            <div className="rounded-2xl overflow-hidden ring-1 ring-border bg-muted">
              <img
                src="/lovable-uploads/gta6/jason-lucia-car.webp"
                alt="Rockstar key art of Jason and Lucia sitting on a car in Vice City at sunset"
                loading="lazy"
                width={1280}
                height={720}
                className="w-full h-auto block"
              />
            </div>
            <figcaption className="text-xs text-muted-foreground mt-3">{L(t.artCaption)}</figcaption>
          </figure>
        </Reveal>
      </section>

      {/* ── The map ── */}
      <section className="py-14 md:py-16 border-t border-border">
        <Reveal>
          <div className="max-w-2xl mb-9">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-3">
              {L(t.mapTitle)}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">{L(t.mapBody)}</p>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PLACES.map((p) => (
            <Reveal key={p.name}>
              <figure className="rounded-2xl overflow-hidden border border-border bg-card h-full">
                <div className="aspect-video bg-muted overflow-hidden">
                  <img
                    src={p.img}
                    alt={`${p.name} in Grand Theft Auto VI`}
                    loading="lazy"
                    width={1280}
                    height={720}
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="p-4">
                  <div className="text-sm font-semibold text-foreground mb-1">{p.name}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{L(p.caption)}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── The two leads ── */}
      <section className="py-14 md:py-16 border-t border-border">
        <Reveal>
          <div className="max-w-2xl mb-9">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-3">
              {L(t.castTitle)}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">{L(t.castBody)}</p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { img: "/lovable-uploads/gta6/lucia.webp", name: L(t.luciaName), body: L(t.luciaBody) },
            { img: "/lovable-uploads/gta6/jason.webp", name: L(t.jasonName), body: L(t.jasonBody) },
          ].map((c) => (
            <Reveal key={c.name}>
              <figure className="rounded-2xl overflow-hidden border border-border bg-card h-full">
                <div className="aspect-video bg-muted overflow-hidden">
                  <img
                    src={c.img}
                    alt={`${c.name} in Grand Theft Auto VI`}
                    loading="lazy"
                    width={1280}
                    height={720}
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="p-5">
                  <div className="text-base font-semibold text-foreground mb-1.5">{c.name}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── The scale ── */}
      <section className="py-14 md:py-16 border-t border-border">
        <Reveal>
          <div className="max-w-2xl mb-9">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-3">
              {L(t.scaleTitle)}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">{L(t.scaleBody)}</p>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-9">
          {SCALE.map((f) => (
            <Reveal key={f.value}>
              <div className="border-t-2 border-primary/70 pt-4">
                <div className="text-3xl md:text-4xl font-bold text-foreground tracking-tight tabular-nums mb-2">
                  {f.value}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">{L(f.label)}</p>
                <SourceLink id={f.source} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-14 md:py-16 border-t border-border">
        <Reveal>
          <div className="max-w-2xl mb-9">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-3">
              {L(t.timeTitle)}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">{L(t.timeBody)}</p>
          </div>
        </Reveal>
        <div className="max-w-3xl">
          {TIMELINE.map((b) => (
            <Reveal key={b.date.en}>
              <div className="grid sm:grid-cols-[170px_1fr] gap-x-8 gap-y-2 py-6 border-t border-border">
                <div className="text-sm font-semibold text-primary pt-0.5">{L(b.date)}</div>
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-1.5">{L(b.title)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">{L(b.body)}</p>
                  <SourceLink id={b.source} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── The pivot: where the audience actually watched ── */}
      <section className="py-14 md:py-16 border-t border-border">
        <Reveal>
          <div className="grid lg:grid-cols-[1fr_0.85fr] gap-12 items-start">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
                {L(t.splitKicker)}
              </span>
              <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-4">
                {L(t.splitTitle)}
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">{L(t.splitBody)}</p>
              <p className="text-xs text-muted-foreground/80 leading-relaxed">{L(t.splitCaveat)}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-7">
              <div className="text-4xl font-bold text-foreground tracking-tight tabular-nums">3.97M</div>
              <p className="text-sm text-muted-foreground mt-1.5 mb-7">{L(t.splitConcurrent)}</p>
              <div className="space-y-4 border-t border-border pt-6">
                {PLATFORM_SPLIT.map((p) => (
                  <div key={p.name}>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="text-sm font-medium text-foreground">{p.name}</span>
                      <span className="text-sm text-muted-foreground tabular-nums">
                        {p.pct.toLocaleString(loc)} %
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-foreground/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${p.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground/70 mt-5">
                {L(t.splitShare)}
                <SourceLink id="inven-concurrents" />
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Our own network ── */}
      <section className="py-14 md:py-16 border-t border-border">
        <Reveal>
          <div className="max-w-2xl mb-9">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-3">
              {L(t.netTitle)}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">{L(t.netBody)}</p>
          </div>
        </Reveal>
        <Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mb-10">
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
        <div className="grid sm:grid-cols-3 gap-5">
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
                    {c.views.toLocaleString(loc)}
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
        <p className="text-xs text-muted-foreground mt-5">
          {gtaClips.length} {lang === "no" ? "klipp, " : "clips, "}
          {totalClipViews.toLocaleString(loc)} {lang === "no" ? "visninger. " : "views. "}
          {L(t.clipNote)}
        </p>
      </section>

      {/* ── The categories ── */}
      <section className="py-14 md:py-16 border-t border-border">
        <Reveal>
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-3">
              {L(t.vertTitle)}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">{L(t.vertBody)}</p>
          </div>
        </Reveal>
        {(["session", "game", "launch"] as const).map((g) => (
          <div key={g} className="mb-12 last:mb-0">
            <Reveal>
              <div className="max-w-2xl mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">{GROUPS[g][lang].label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{GROUPS[g][lang].blurb}</p>
              </div>
            </Reveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {VERTICALS.filter((v) => v.group === g).map((v) => (
                <Reveal key={v.n}>
                  <div className="rounded-2xl border border-border bg-card p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h4 className="text-base font-semibold text-foreground">{L(v.title)}</h4>
                      <span className="text-xs font-semibold text-muted-foreground/50 tabular-nums shrink-0">
                        {v.n}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{L(v.why)}</p>
                    <p className="text-sm font-medium text-foreground leading-relaxed mb-5">{L(v.moment)}</p>
                    <div className="mt-auto">
                      {v.proof ? (
                        <div className="pt-4 border-t border-border">
                          <div className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                            {L(t.proofLabel)}
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="shrink-0 rounded-lg bg-[hsl(240_11%_9%)] px-3 py-2 ring-1 ring-black/5">
                              <img
                                src={v.proof.logo}
                                alt={v.proof.brand}
                                loading="lazy"
                                className="h-5 w-auto max-w-[92px] object-contain block"
                              />
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
                        </div>
                      ) : (
                        v.noProof && (
                          <p className="text-xs text-muted-foreground pt-4 border-t border-border">
                            {L(v.noProof)}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
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
        <ul className="space-y-2.5 max-w-3xl">
          {SOURCES.map((s) => (
            <li key={s.id}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-start gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="font-medium text-foreground/80 group-hover:text-primary shrink-0">
                  {s.publisher}
                </span>
                <span>{s.title}</span>
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
