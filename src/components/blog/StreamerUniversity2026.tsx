import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ClientLogoStrip from "@/components/blog/ClientLogoStrip";

/**
 * Streamer University 2026 - a brand-side breakdown.
 *
 * SOURCING RULE: every number here is third-party verified, not organiser-
 * reported, unless explicitly labelled. Three independent sources were used:
 *   - StreamsCharts (category analytics)
 *   - SullyGnome (Twitch category analytics; the week-after deltas independently
 *     reverse-confirm the event-week peak and hours watched)
 *   - Digiday (27 Jul 2026), on-record brand executives
 * Plus Hendrix College (host, official), Tubefilter, Dexerto, Complex.
 *
 * DELIBERATELY CUT from the organiser's own "Wrapped" post because independent
 * data contradicts it: "1.6M+ combined" (StreamsCharts measured 1.45M),
 * "403K YouTube peak" (that was the 6 July reveal stream, not event week),
 * "234,549 average / 10.9% of Twitch" (StreamsCharts: 435,724 avg, ~15% of
 * watch time), and "over a billion impressions" (self-labelled estimate).
 */

const serif = { fontFamily: "'Instrument Serif', serif" };

const heroStats = [
  { value: "1.2M", label: "Peak Twitch viewers, one category" },
  { value: "~57M", label: "Hours watched in six days" },
  { value: "120", label: "Creators on campus" },
  { value: "20+", label: "Brand partners" },
];

// 2025 -> 2026 growth. StreamsCharts, both years.
const growth = [
  { year: "2025 · University of Akron", pct: 731, display: "731K", note: "Peak viewers, inaugural edition" },
  { year: "2026 · Hendrix College", pct: 1200, display: "1.2M", note: "Peak viewers, Twitch category", highlight: true },
];
const growthMax = 1200;

// The distribution point: the audience arrived through thousands of channels.
const distribution = [
  { label: "Channels broadcasting the event", value: "6,004", note: "StreamsCharts" },
  { label: "Average concurrent viewers", value: "435,724", note: "Twitch + YouTube, StreamsCharts" },
  { label: "Share of all Twitch watch time", value: "~15%", note: "Across the six days, StreamsCharts" },
  { label: "Twitch's #1 category", value: "Jul 15-20", note: "Ahead of Just Chatting" },
];

// Brand activations. Every row is Digiday, StreamsCharts or Hendrix College.
const sponsors: { brand: string; what: string; tag: string }[] = [
  { brand: "Ch@mobile", tag: "Hardware + service", what: "Gave all 120 students a smartphone and a year of wireless, then hired clipping agencies that drove well over 30 million views." },
  { brand: "Zaxby's", tag: "Catering as content", what: "Fed the campus: 15,000+ chicken fingerz, 6,000 wings, 2,500 slices of Texas Toast, 400+ gallons of sauce." },
  { brand: "Epic Games", tag: "In-world game", what: "Hid 31 Fortnite Sprites across campus, tradeable and stealable. The winner got a custom in-game cosmetic and a $7,500 Epic brand deal." },
  { brand: "Red Bull", tag: "Set dressing", what: "Branded mini-fridges became lecture backdrops, and it sponsored the Best Professor award (won by Ludwig Ahgren)." },
  { brand: "Meta", tag: "Capture tech", what: "Ray-Ban Meta glasses to students, turning every creator into a POV camera for the week." },
  { brand: "State Farm", tag: "Live gifting", what: "Gifted subscriptions to streamers on stream for doing good things." },
  { brand: "Dell", tag: "Kit", what: "Laptops for every student." },
  { brand: "Shopify", tag: "Commerce", what: "Powered limited-edition product drops during the week, including a collab that sold out." },
  { brand: "Crocs", tag: "Merch", what: "A pair for every student." },
  { brand: "TVU", tag: "Prize", what: "Gave away one $30,000 mobile streaming backpack." },
];

// Breakout creators. StreamsCharts.
const breakouts = [
  { name: "Suburbbaby", peak: 195.3, display: "195.3K", note: "Campus MVP, passed 777K followers" },
  { name: "Rakai", peak: 230.5, display: "230.5K", note: "Highest individual peak on campus" },
  { name: "Fanum", peak: 191, display: "191K", note: "Established creator" },
  { name: "JasonTheWeen", peak: 161.8, display: "161.8K", note: "Personal record" },
];
const breakoutMax = 230.5;

const quotes = [
  {
    q: "It was a masterclass in how you should actually approach branded activations in digital media.",
    who: "Mustafa Aijaz",
    role: "VP of Gaming and Digital Culture, SoaR Gaming",
  },
  {
    q: "You don't pander to this audience, they'll see right through that.",
    who: "Bernt Ullmann",
    role: "Co-founder, Ch@mobile",
  },
  {
    q: "Control is a tough thing for a brand.",
    who: "Nathaniel Weiss",
    role: "CEO and co-founder, Tone",
  },
];

const lessons = [
  {
    n: "01",
    title: "Be useful, not present",
    body: "The activations that worked gave creators something they needed on the day: a phone, a laptop, food, a camera. Nobody bought a logo placement. The brand became part of the story because it solved a problem on camera.",
  },
  {
    n: "02",
    title: "Give up control on purpose",
    body: "Every brand in the building accepted that 120 creators would use their product unscripted, in public, live. That is the trade: you cannot direct the moment, and that is exactly why the audience believes it.",
  },
  {
    n: "03",
    title: "Buy the network, not the star",
    body: "The audience did not arrive through one channel. It arrived through 6,004 of them. The reach came from the swarm of small and mid-tier creators around the headline name, which is a very different media buy than a single sponsorship.",
  },
  {
    n: "04",
    title: "Build for the clip, not the broadcast",
    body: "The live number is the smallest part. Ch@mobile hired clipping agencies and got 30 million-plus views on the aftermath. The event was the production; the clips were the campaign.",
  },
];

const sources = [
  { label: "StreamsCharts - Streamer University 2026 results", href: "https://streamscharts.com/news/streamer-university-2026-results" },
  { label: "SullyGnome - Streamer University category data", href: "https://sullygnome.com/game/streamer_university_1266647210/7/summary" },
  { label: "Digiday - Streamer U was a masterclass for brands", href: "https://digiday.com/media/kai-cenats-streamer-u-was-a-masterclass-for-brands-looking-to-tap-content-creators/" },
  { label: "Hendrix College - Streamer U brings thousands of visitors", href: "https://www.hendrix.edu/Streamer-U-brings-thousands-of-visitors-to-Hendrix-College/" },
  { label: "Tubefilter - Cenat turned down Netflix and Amazon", href: "https://www.tubefilter.com/2025/05/28/kai-cenat-streamer-university-viewership-amazon-netflix-talks/" },
  { label: "Reed Duchscher - Streamer University Wrapped", href: "https://www.linkedin.com/pulse/streamer-university-wrapped-reed-duchscher-57z4c/" },
];

const Reveal: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
};

const StreamerUniversity2026: React.FC = () => {
  return (
    <div className="pb-4">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden rounded-3xl bg-[hsl(240_11%_5%)] px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
        <div className="absolute -top-24 -right-24 w-[32rem] h-[32rem] rounded-full bg-primary/20 blur-[120px] pointer-events-none" aria-hidden />
        <div className="relative max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 mb-7 text-xs font-semibold tracking-widest uppercase">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80">
              <img src="/lovable-uploads/platform-twitch.png" alt="Twitch" className="h-3.5 w-auto" />
              Industry Insights
            </span>
            <span className="text-white/40">July 2026 · 9 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-6">
            Streamer University put 1.2 million people in one room.{" "}
            <span style={serif} className="italic font-normal">Then it went to Europe.</span>
          </h1>
          <p className="text-lg text-white/65 leading-relaxed max-w-2xl">
            For six days in July, a small liberal-arts college in Arkansas was the most-watched place
            on Twitch. 120 creators, more than 20 brands, roughly 57 million hours watched. Kai Cenat
            has announced the 2027 edition is coming to Europe, and no location has been chosen yet.
            Here is what actually happened, what the brands did, and why Nordic marketers should be
            reading this now.
          </p>
        </div>
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-px mt-14 border border-white/10 rounded-2xl overflow-hidden bg-white/10 max-w-3xl">
          {heroStats.map((s) => (
            <div key={s.label} className="bg-black/30 backdrop-blur-sm px-5 py-5">
              <div className="text-2xl font-bold text-white tracking-tight">{s.value}</div>
              <div className="text-xs text-white/50 mt-1 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What it is ── */}
      <section className="mt-20 lg:mt-28 grid lg:grid-cols-2 gap-14 items-start">
        <Reveal>
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">What it actually is</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-5">
            A real campus, run as a live production
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-md mb-4">
            Streamer University is Kai Cenat's in-person creator bootcamp, streamed almost
            continuously. The 2026 edition ran 15 to 20 July at Hendrix College in Conway, Arkansas,
            with 120 students selected through auditions in New York, Los Angeles and Atlanta.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed max-w-md">
            Established creators teach as professors, students join clubs, and the whole thing is
            broadcast from every participant's own channel at once. Cenat is managed by Reed
            Duchscher's agency Night, whose post-event breakdown is one of the sources below.
          </p>
        </Reveal>
        <Reveal>
          <div className="rounded-2xl border border-border bg-card divide-y divide-border">
            {[
              ["Host campus", "Hendrix College, Conway, Arkansas"],
              ["Dates", "15 - 20 July 2026"],
              ["Students", "120, selected by audition"],
              ["Faculty", "Creators including Ludwig, Pokimane, Agent00, Adapt"],
              ["Format", "Classes, clubs, campus activities, streamed live"],
              ["2025 edition", "University of Akron, Ohio, late May"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-6 px-6 py-4">
                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground/70 shrink-0">{k}</span>
                <span className="text-sm text-foreground text-right">{v}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── The scale (dark, data-viz) ── */}
      <section className="mt-20 lg:mt-28 rounded-3xl bg-[hsl(240_11%_5%)] px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">The scale</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-5">
              Peak viewership more than doubled in one year
            </h2>
            <p className="text-base text-white/60 leading-relaxed max-w-md mb-4">
              The inaugural 2025 edition peaked at 731,000. The 2026 edition hit roughly 1.2 million
              concurrent viewers on Twitch alone, and about 1.45 million counting YouTube. For six
              days it was the single most-watched category on Twitch, ahead of Just Chatting.
            </p>
            <p className="text-sm text-white/45 leading-relaxed max-w-md">
              Independently confirmed: SullyGnome's following-week data shows the category shedding
              57.2 million hours and 1.2 million peak viewers once the event ended, which reverse-
              confirms the event-week figures.
            </p>
          </div>
          <div className="space-y-8">
            {growth.map((g) => (
              <div key={g.year}>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm font-semibold text-white">{g.year}</span>
                  <span className="text-2xl font-bold text-white tabular-nums">{g.display}</span>
                </div>
                <div className="h-4 rounded-full bg-white/10 overflow-hidden">
                  <div className={`h-full rounded-full ${g.highlight ? "bg-primary" : "bg-white/40"}`} style={{ width: `${Math.round((g.pct / growthMax) * 100)}%` }} />
                </div>
                <p className="text-[11px] text-white/40 mt-1.5">{g.note}</p>
              </div>
            ))}
            <p className="text-xs text-white/40 pt-2">Peak concurrent viewers, category-wide. Source: StreamsCharts.</p>
          </div>
        </div>
      </section>

      {/* ── The distribution insight ── */}
      <section className="mt-20 lg:mt-28">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">The part media buyers should notice</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
            The audience did not come from one channel. It came from 6,004.
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mt-4">
            This is the structural point, and it is the one most write-ups miss. Cenat's own channel
            peaked at 594,100 on Twitch, well under half the category peak. The rest of the audience
            was watching 120 students and thousands of other channels covering the same event from
            the inside. The reach was a swarm, not a broadcast.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px border border-border rounded-2xl overflow-hidden bg-border">
          {distribution.map((d) => (
            <div key={d.label} className="bg-card px-6 py-7">
              <div className="text-3xl font-bold text-foreground tracking-tight">{d.value}</div>
              <div className="text-sm text-foreground/80 mt-2 leading-snug">{d.label}</div>
              <div className="text-[11px] text-muted-foreground/70 mt-2">{d.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── The sponsor roll ── */}
      <section className="mt-20 lg:mt-28">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">What the brands actually did</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
            More than 20 partners, and almost no traditional ads
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mt-4">
            Not one of these was a pre-roll buy. Every activation was a physical object or a mechanic
            that 120 creators had to interact with on camera, which is why they became content
            instead of interruption.
          </p>
        </div>
        <div className="rounded-2xl border border-border overflow-hidden">
          {sponsors.map((s, i) => (
            <div key={s.brand} className={`grid sm:grid-cols-[minmax(0,10rem)_minmax(0,9rem)_1fr] gap-2 sm:gap-6 px-6 py-5 items-baseline ${i > 0 ? "border-t border-border" : ""}`}>
              <div className="text-sm font-semibold text-foreground">{s.brand}</div>
              <div className="text-[11px] font-semibold tracking-widest uppercase text-primary">{s.tag}</div>
              <div className="text-sm text-muted-foreground leading-relaxed">{s.what}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground/70 mt-4 max-w-3xl leading-relaxed">
          Sources: Digiday, StreamsCharts, Hendrix College, Complex. MrBeast also hid ten briefcases
          holding $10,000 each across campus, but he attended as a guest rather than a sponsor. In
          2025 the phone sponsor was T-Mobile; in 2026 that slot went to the creator-owned challenger
          Ch@mobile.
        </p>
      </section>

      {/* ── Zaxby's hard ROI ── */}
      <section className="mt-20 lg:mt-28 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">The clearest ROI in the building</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-5">
            Zaxby's catered lunch and grew 20,000 followers
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-md mb-4">
            The fast-food chain did not run a single ad unit. It fed the campus, and its own social
            channels added more than 20,000 followers during the week, a lift of over 1,000% week
            over week. The brand's stated goal, per its VP of brand strategy, was content that could
            "live well beyond the event itself."
          </p>
          <p className="text-xs text-muted-foreground/70">Source: Digiday, 27 July 2026.</p>
        </Reveal>
        <Reveal>
          <div className="rounded-2xl border border-border bg-card p-8 grid grid-cols-2 gap-y-8 gap-x-6">
            {[
              ["15,000+", "chicken fingerz served"],
              ["6,000", "wings"],
              ["20,000+", "new social followers"],
              ["1,000%+", "week-over-week lift"],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="text-3xl font-bold text-primary tracking-tight">{v}</div>
                <div className="text-xs text-muted-foreground mt-1">{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Quotes ── */}
      <section className="mt-20 lg:mt-28">
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">On the record</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">What the brand side said</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map((q) => (
            <Reveal key={q.who}>
              <figure className="h-full rounded-2xl border border-border bg-card p-7 flex flex-col">
                <blockquote className="text-lg font-light leading-relaxed text-foreground flex-1">
                  "{q.q}"
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-border">
                  <div className="text-sm font-semibold text-foreground">{q.who}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{q.role}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="text-xs text-muted-foreground/70 mt-5">Interviews via Digiday, 27 July 2026.</p>
      </section>

      {/* ── Breakout creators ── */}
      <section className="mt-20 lg:mt-28 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">The discovery engine</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-5">
            An unknown finished the week with 777,000 followers
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-md mb-4">
            Suburbbaby arrived as a student and left as campus MVP, peaking at 195,300 concurrent
            viewers and passing 777,000 Twitch followers. Across the category, roughly 12.5 million
            follows and about 40,000 paid subscriptions were recorded during the week.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
            For brands, that is the real signal: this format manufactures mid-tier creators in a
            week. The people worth partnering with next year are on this list now, at a fraction of
            the price they will command later.
          </p>
        </Reveal>
        <Reveal>
          <div className="space-y-6">
            {breakouts.map((b) => (
              <div key={b.name}>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground">{b.name}</span>
                  <span className="text-lg font-bold text-foreground tabular-nums">{b.display}</span>
                </div>
                <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary/80" style={{ width: `${Math.round((b.peak / breakoutMax) * 100)}%` }} />
                </div>
                <p className="text-[11px] text-muted-foreground/70 mt-1.5">{b.note}</p>
              </div>
            ))}
            <p className="text-xs text-muted-foreground/70 pt-1">Peak concurrent viewers. Source: StreamsCharts. Follower and subscription totals via Digiday, from Streamlabs partner data.</p>
          </div>
        </Reveal>
      </section>

      {/* ── The four lessons ── */}
      <section className="mt-20 lg:mt-28">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">The transferable part</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
            Four things that worked, and translate to a normal budget
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {lessons.map((l) => (
            <Reveal key={l.n}>
              <div className="h-full rounded-2xl border border-border bg-card p-8">
                <div className="text-4xl font-bold text-primary/20 tracking-tighter mb-4">{l.n}</div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{l.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{l.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Europe 2027 (dark) ── */}
      <section className="mt-20 lg:mt-28 rounded-3xl bg-[hsl(240_11%_5%)] px-6 sm:px-10 lg:px-16 py-16">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">2027</span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-6 leading-tight">
            It is coming to Europe, and nobody has picked the country yet
          </h2>
          <p className="text-lg text-white/65 leading-relaxed mb-5">
            At the closing ceremony on 20 July, Cenat announced that Streamer University 2027 will be
            held in Europe. Alumni from both classes will be eligible to attend. No country, city,
            venue or date has been announced, and anyone telling you otherwise is guessing.
          </p>
          <p className="text-base text-white/50 leading-relaxed">
            That matters for Nordic brands for one practical reason: a European edition puts a
            1.2-million-viewer format inside European time zones, with European creators in the cast
            and European brands in the room. The 2026 sponsor list was locked long before July. If
            the 2027 list works the same way, the useful time to think about it is now, not when the
            location is announced.
          </p>
        </div>
      </section>

      {/* ── What Nordic brands should take from it ── */}
      <section className="mt-20 lg:mt-28">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Closer to home</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
            You do not need a campus to run this play
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mt-4">
            Streamer University is an extreme version of a mechanic that scales down cleanly. The
            logic that made it work is the same logic behind a native Nordic overlay campaign: show
            up inside content the audience already chose, across many creators rather than one, and
            let the creator frame it.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-primary/30 bg-primary/[0.03] p-8">
            <div className="text-sm font-semibold text-foreground mb-4">What transfers</div>
            <ul className="space-y-3">
              {[
                "Many creators at once beats one big name",
                "Physical or in-world mechanics beat impressions",
                "The clip afterwards is the real reach",
                "Creator framing is what makes it credible",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/90">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="text-sm font-semibold text-foreground mb-4">What does not</div>
            <ul className="space-y-3">
              {[
                "The budget: this was a six-day live production",
                "The guaranteed audience: Cenat brings his own",
                "The control: you cannot approve any of it in advance",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <X className="w-4 h-4 text-muted-foreground/60 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ClientLogoStrip />

      {/* ── CTA ── */}
      <section className="mt-20 lg:mt-28">
        <div className="rounded-3xl bg-foreground text-background p-10 md:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-lg">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-3">
              Run the same mechanic in the Nordics
            </h2>
            <p className="text-background/60 text-sm leading-relaxed">
              Native overlay campaigns across 39,000+ Nordic streamers: many creators at once, inside
              the stream, with verified reporting. See how the format works and what it costs.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link to="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-7">
                Get a quote <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/twitch-advertising-cost">
              <Button size="lg" variant="ghost" className="text-background hover:bg-background/10 rounded-full px-7 border border-background/20">
                What it costs
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm">
          <Link to="/blog/how-twitch-advertising-works-2026" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
            <ArrowRight className="w-3.5 h-3.5" /> How Twitch advertising works
          </Link>
          <Link to="/case-studies" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
            <ArrowRight className="w-3.5 h-3.5" /> Nordic case studies
          </Link>
          <Link to="/norge" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
            <ArrowRight className="w-3.5 h-3.5" /> Norsk oversikt
          </Link>
        </div>
      </section>

      {/* ── Sources ── */}
      <section className="mt-16 pt-8 border-t border-border">
        <div className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground/70 mb-4">Sources</div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {sources.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
              {s.label} <ArrowUpRight className="w-3 h-3" />
            </a>
          ))}
        </div>
        <p className="text-xs text-muted-foreground/60 mt-5 max-w-3xl leading-relaxed">
          Note on figures: viewership numbers here are third-party measured (StreamsCharts,
          SullyGnome) rather than organiser-reported. Four figures circulating from the organiser's
          own recap are not used because independent data contradicts them, including a "1.6M
          combined" peak (measured at 1.45M) and a "403K YouTube peak" that belongs to Cenat's 6 July
          reveal stream rather than event week.
        </p>
      </section>
    </div>
  );
};

export default StreamerUniversity2026;
