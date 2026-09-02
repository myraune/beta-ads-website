import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { MARKET_CREATORS, type MarketCode } from "@/data/streamers";

/**
 * GTA VI, from the Nordic media-planning side.
 *
 * Every number on this page is either from a named third party (linked in the
 * sources block at the bottom) or measured from our own creator network. The
 * network figures come from the 234 tracked clips across the 40 creators in
 * src/data/streamers.ts, counted on 2026-09-02. They are labelled as ours so
 * nobody mistakes them for market-wide data.
 *
 * No Rockstar artwork is used. The game's promotional stills are theirs, and a
 * piece arguing that brands should stop borrowing IP they have no licence to
 * should not open by borrowing IP it has no licence to.
 */

const serif = { fontFamily: "'Instrument Serif', serif" };

const MARKET_LABEL: Record<string, string> = { no: "Norway", se: "Sweden", da: "Denmark", fi: "Finland" };

/**
 * The real GTA clips our Nordic creators have on Twitch, derived from the same
 * data module the streamer pages use rather than copied into this file. If a
 * creator's clips change, this section changes with them, and the count in the
 * copy above cannot drift away from the evidence below it.
 */
const gtaClips = Object.entries(MARKET_CREATORS as Record<MarketCode, any[]>)
  .flatMap(([market, list]) =>
    (list || []).flatMap((c: any) =>
      (c.twitchClips || [])
        .filter((x: any) => /grand theft auto/i.test(x.game || ""))
        .map((x: any) => ({
          market,
          creator: c.name as string,
          handle: c.handle as string,
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

/** Whole days from today to launch. Recomputed on render so it never goes stale. */
const daysToLaunch = () =>
  Math.max(0, Math.ceil((RELEASE.getTime() - Date.now()) / 86_400_000));

const heroStats = [
  { value: "31.1M", label: "Netflix views in four days" },
  { value: "3.97M", label: "Peak viewers watching reactions" },
  { value: "17K", label: "Twitch outage reports at peak" },
  { value: "Nov 19", label: "Launch, 2026" },
];

/**
 * Where the audience actually was during the Extended Look. The point of the
 * comparison is that the second row is not the trailer, it is people watching
 * other people watch the trailer.
 */
const audience = [
  {
    logo: null,
    label: "Netflix, the trailer itself",
    value: 31.1,
    display: "31.1M views",
    note: "Four days. Netflix's most-watched title that week.",
  },
  {
    logo: "/lovable-uploads/platform-twitch.png",
    label: "Twitch and YouTube, reactions and watch parties",
    value: 3.97,
    display: "3.97M peak concurrent",
    note: "Biggest gaming showcase Streams Charts tracked in 2026.",
  },
];
const audienceMax = 31.1;

/** Our own network. 10 creators per market, clips tagged by game on Twitch. */
const nordicGta = [
  { market: "Norway", withGta: 4, note: "Most GTA-active market in our network" },
  { market: "Sweden", withGta: 3, note: "Highest view count per GTA clip" },
  { market: "Denmark", withGta: 1, note: "Concentrated in a single creator" },
  { market: "Finland", withGta: 0, note: "No GTA clips tracked at all" },
];

/** Clips by game across the whole network. Just Chatting is a category, not a game. */
const clipMix = [
  { game: "Just Chatting", clips: 80, isGame: false },
  { game: "Counter-Strike", clips: 35, isGame: true },
  { game: "Grand Theft Auto", clips: 22, isGame: true },
  { game: "Fortnite", clips: 20, isGame: true },
];
const clipMax = 80;

const plays = [
  {
    n: "01",
    title: "Buy the reaction, not the launch",
    body:
      "The launch night itself will be the most expensive inventory of the year and the least differentiated. The week after is when creators play, fail, rage, and rebuild, and when a brand can sit in the stream without competing with Rockstar for attention.",
  },
  {
    n: "02",
    title: "Treat the first 72 hours as infrastructure, not media",
    body:
      "Twitch logged more than 17,000 outage reports during a six-minute trailer. Launch week will be heavier. If your activation depends on a live overlay firing on schedule, plan for the platform being degraded, and check the placement daily rather than reading a report afterwards.",
  },
  {
    n: "03",
    title: "Go where the game is not",
    body:
      "Finland has zero GTA clips in our network. That is not a gap to fix with GTA money, it is a signal that Finnish creators and their audiences are somewhere else. Buying GTA adjacency in Finland during launch week means paying a premium to reach people who were not watching.",
  },
  {
    n: "04",
    title: "Use the format the audience already tolerates",
    body:
      "Roughly 80 percent of Nordic 18 to 34 year olds run an ad blocker. Pre-roll on a GTA stream reaches the subset who have not installed one. An overlay built into the broadcast reaches everyone watching, because there is no separate ad element for a blocker to remove.",
  },
  {
    n: "05",
    title: "Write the brief for a six-hour session",
    body:
      "GTA sessions run long. A creative that works as a 15 second spot does not work as something a viewer sees for the fourth hour running. Plan a rotation, a chat command that changes, or a moment tied to something happening in the game, rather than one asset looping until it is wallpaper.",
  },
];

const avoid = [
  {
    title: "Do not build anything that needs Rockstar's permission",
    body:
      "Official in-game placement is expensive, slow, and mostly unavailable. Everything on this page happens around the game, in streams and chats, and needs no licence.",
  },
  {
    title: "Do not assume the trailer numbers are your reach",
    body:
      "31.1 million people watched on Netflix. That is a global figure for a piece of entertainment, not an addressable Nordic audience, and quoting it in a media plan is how a campaign gets judged against a number it was never going to hit.",
  },
  {
    title: "Do not book launch week and call it a GTA strategy",
    body:
      "The game is a live-service title with a multi-year tail. GTA V was still the second most watched game on Twitch in 2025, twelve years after release. Launch week is the loudest moment, not the whole opportunity.",
  },
];

const sources = [
  {
    label: "Streams Charts - GTA VI Extended Look peaked at 3.97M viewers",
    href: "https://streamscharts.com/",
  },
  {
    label: "GamesRadar - Extended Look was Netflix's most-watched title, 31.1M views",
    href: "https://www.gamesradar.com/games/grand-theft-auto/the-gta-6-extended-look-was-netflixs-most-watched-title-for-the-week-with-31-1-million-views/",
  },
  {
    label: "Forbes - GTA 6 hits No. 1 on Netflix, streamer web viewership up 125%",
    href: "https://www.forbes.com/sites/paultassi/2026/08/28/gta-6-hits-no-1-on-netflix-and-catapults-streamers-web-viewership-125/",
  },
  {
    label: "Variety - GTA 6 release delayed to November 19, 2026",
    href: "https://variety.com/2025/tv/news/gta-6-release-delayed-november-2026-29751",
  },
  {
    label: "Stream Hatchet 2025 - GTA V second most-watched game on Twitch, 1.9B hours",
    href: "https://streamhatchet.com/",
  },
];

const Reveal: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const GtaViNordicPlaybook: React.FC = () => {
  const days = daysToLaunch();

  return (
    <article>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[hsl(240_11%_5%)]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(120% 80% at 20% 0%, rgba(233,79,55,0.22), transparent 60%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">
            Nordic media planning
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight max-w-3xl mb-6">
            Four million people watched
            <br />
            <span style={serif} className="italic font-normal">
              someone else
            </span>{" "}
            watch a trailer
          </h1>
          <p className="text-lg text-white/65 leading-relaxed max-w-xl mb-8">
            Rockstar put the GTA VI Extended Look on Netflix. The reaction layer on Twitch was
            almost four million concurrent viewers, and Twitch fell over. Here is what that means
            for a Nordic media plan, with our own network numbers on where GTA already lives.
          </p>

          <div className="inline-flex items-baseline gap-3 rounded-2xl border border-white/15 bg-white/[0.06] px-6 py-4 mb-10">
            <span className="text-4xl font-bold text-white tabular-nums">{days}</span>
            <span className="text-sm text-white/60">
              days until launch, 19 November 2026
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-white/10 rounded-2xl overflow-hidden bg-white/10">
            {heroStats.map((s) => (
              <div key={s.label} className="bg-black/40 backdrop-blur-sm px-5 py-5">
                <div className="text-2xl font-bold text-white tracking-tight">{s.value}</div>
                <div className="text-xs text-white/50 mt-1 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What the Extended Look proved ── */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="max-w-2xl mb-10">
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
                27 August 2026
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
                The audience was not where the trailer was
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Rockstar premiered the Extended Look on Netflix and held it there for six hours
                before putting it on YouTube. Netflix got 31.1 million views in four days and its
                most-watched title of the week. But the number that matters for anyone buying
                media is the second one.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="space-y-5 max-w-4xl">
              {audience.map((a) => (
                <div key={a.label}>
                  <div className="flex items-baseline justify-between mb-2 gap-4">
                    <span className="text-sm font-medium text-foreground flex items-center gap-2">
                      {a.logo && (
                        <img src={a.logo} alt="" className="h-4 w-auto" loading="lazy" />
                      )}
                      {a.label}
                    </span>
                    <span className="text-sm font-semibold text-foreground tabular-nums shrink-0">
                      {a.display}
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${(a.value / audienceMax) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{a.note}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-10 rounded-2xl border border-border bg-card p-7 max-w-3xl">
              <p className="text-base text-foreground leading-relaxed">
                Those 3.97 million were not watching Rockstar. They were watching creators watch
                Rockstar. That reaction layer is the part a brand can actually buy, and it is the
                part that does not need anyone's permission.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                Twitch did not cope. Downdetector logged more than 17,000 reports at peak and
                Twitch's own status page called it a major outage across web, chat and video.
                Launch week will be heavier than a six-minute trailer.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Our own Nordic data ── */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="max-w-2xl mb-10">
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
                Our network, measured
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
                GTA is already the second most clipped game in the Nordics
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                We track 234 clips across 40 Nordic creators, tagged by game. Counting them on
                2 September 2026, Grand Theft Auto sits second among actual games, behind
                Counter-Strike. This is our own network rather than market-wide data, but it is
                the part of the market we can see clearly.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12">
            <Reveal>
              <h3 className="text-sm font-semibold text-foreground mb-5">
                Clips by game, whole network
              </h3>
              <div className="space-y-4">
                {clipMix.map((c) => (
                  <div key={c.game}>
                    <div className="flex items-baseline justify-between mb-1.5 gap-4">
                      <span className="text-sm text-foreground">
                        {c.game}
                        {!c.isGame && (
                          <span className="text-xs text-muted-foreground ml-2">
                            category, not a game
                          </span>
                        )}
                      </span>
                      <span className="text-sm font-semibold tabular-nums text-foreground">
                        {c.clips}
                      </span>
                    </div>
                    <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          c.game === "Grand Theft Auto" ? "bg-primary" : "bg-foreground/25"
                        }`}
                        style={{ width: `${(c.clips / clipMax) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <h3 className="text-sm font-semibold text-foreground mb-5">
                Creators with GTA clips, out of 10 per market
              </h3>
              <div className="space-y-3">
                {nordicGta.map((m) => (
                  <div
                    key={m.market}
                    className="rounded-xl border border-border bg-card px-5 py-4 flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="text-sm font-semibold text-foreground">{m.market}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{m.note}</div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0 pt-1">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <span
                          key={i}
                          className={`h-2.5 w-2.5 rounded-sm ${
                            i < m.withGta ? "bg-primary" : "bg-foreground/20 ring-1 ring-inset ring-foreground/10"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                24 GTA clips, 170,190 views across the network.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── The evidence: real clips ── */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="max-w-2xl mb-10">
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
                The clips themselves
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
                This is what GTA looks like in the Nordics right now
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Not a mock-up. These are the most-watched Grand Theft Auto clips from creators in our
                network, straight off Twitch. {gtaClips.length} clips, {totalClipViews.toLocaleString("en-GB")} views
                between them, and every one is a moment a brand could have been present for.
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
                      {c.views.toLocaleString("en-GB")} views
                    </span>
                  </div>
                  <div className="p-4 flex items-start gap-3">
                    <img
                      src={c.avatar}
                      alt=""
                      loading="lazy"
                      className="h-9 w-9 rounded-lg object-cover bg-muted shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                        {c.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {c.creator} · {MARKET_LABEL[c.market]}
                      </div>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-5">
            Clips hosted on Twitch. Opens in a new tab.
          </p>
        </div>
      </section>

      {/* ── What the format actually is ── */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
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
                  aria-label="A native Komplett overlay ad rendered live inside a Norwegian Twitch stream"
                />
              </div>
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
                  The format
                </span>
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-4">
                  This is the thing an ad blocker cannot remove
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  A real Komplett overlay, rendered inside a Norwegian broadcast. There is no separate
                  ad element on the page, so there is nothing for a blocker to strip. It sits in the
                  layout through the session rather than interrupting it.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  During a six-hour GTA session that difference compounds. A pre-roll reaches the
                  minority without a blocker, once. This is present for everyone watching, for as long
                  as they watch.
                </p>
                <Link
                  to="/case-study/komplett"
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground mt-5 hover:text-primary transition-colors"
                >
                  Read the Komplett campaign
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── The plays ── */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="max-w-2xl mb-10">
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
                What to actually do
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
                Five plays, in the order we would run them
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5 max-w-5xl">
            {plays.map((p) => (
              <Reveal key={p.n}>
                <div className="h-full rounded-2xl border border-border bg-card p-7">
                  <div className="text-3xl font-bold text-primary/20 mb-4 tracking-tighter">
                    {p.n}
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-3">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── What not to do ── */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-10 max-w-2xl">
              Three things we would talk a client out of
            </h2>
          </Reveal>
          <div className="max-w-3xl divide-y divide-border border-y border-border">
            {avoid.map((a) => (
              <Reveal key={a.title}>
                <div className="py-6">
                  <h3 className="text-base font-semibold text-foreground mb-2">{a.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="rounded-3xl border border-border p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="max-w-md">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-3">
                  {days} days is enough time to do this properly
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tell us the market and the product. We will say honestly whether GTA launch
                  week is the right moment for you, or whether your money works harder somewhere
                  else.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12"
                  >
                    Book a demo <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/twitch-advertising-cost">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="rounded-full px-8 h-12 border border-border"
                  >
                    See what it costs
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Sources ── */}
      <section className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-5">
            Sources
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
          <p className="text-xs text-muted-foreground mt-6 max-w-3xl leading-relaxed">
            Network figures are Beta Agency's own, counted from 234 tracked clips across 40 Nordic
            creators on 2 September 2026. No Rockstar artwork is used on this page.
          </p>
        </div>
      </section>
    </article>
  );
};

export default GtaViNordicPlaybook;
