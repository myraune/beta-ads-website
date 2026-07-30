import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ClientLogoStrip from "@/components/blog/ClientLogoStrip";

/**
 * Streamer University 2026 - a brand-side breakdown, built visual-first.
 *
 * REAL IMAGERY (no AI, no stock): Streamer University's own logo and Hendrix
 * College's logo (both public domain, Wikimedia Commons); a real photo of Kai
 * Cenat (CC BY 3.0, "MILLION DOLLAZ WORTH OF GAME"); the actual Hendrix campus
 * (CC BY-SA 3.0, Valis55); an embedded real news segment (FOX 16 KLRT); and the
 * sponsors' own brand marks (simple-icons, CC0). Credits render at page foot.
 *
 * SOURCING RULE: every number is third-party verified (StreamsCharts, SullyGnome,
 * Digiday), not organiser-reported, unless labelled. Four figures from the
 * organiser's own recap are deliberately excluded because independent data
 * contradicts them (see the note at the foot).
 */

const serif = { fontFamily: "'Instrument Serif', serif" };
const SU_LOGO = "/lovable-uploads/su-real/streamer-university-logo.svg";

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

const distribution = [
  { label: "Channels broadcasting the event", value: "6,004", note: "StreamsCharts" },
  { label: "Average concurrent viewers", value: "435,724", note: "Twitch + YouTube, StreamsCharts" },
  { label: "Share of all Twitch watch time", value: "~15%", note: "Across the six days, StreamsCharts" },
  { label: "Twitch's #1 category", value: "Jul 15-20", note: "Ahead of Just Chatting" },
];

// Sponsor activations. Logos are the brands' own marks (simple-icons, CC0)
// where one exists; the rest render as a clean wordmark tile. These are
// STREAMER UNIVERSITY's sponsors, not Beta Ads clients - labelled as such.
const sponsors: { brand: string; logo?: string; what: string }[] = [
  { brand: "Epic Games", logo: "/lovable-uploads/su-sponsors/epicgames.svg", what: "Hid 31 tradeable, stealable Fortnite Sprites across campus. The winner got a custom in-game cosmetic and a $7,500 Epic brand deal." },
  { brand: "Red Bull", logo: "/lovable-uploads/su-sponsors/redbull.svg", what: "Branded mini-fridges became lecture backdrops, and it sponsored the Best Professor award, won by Ludwig Ahgren." },
  { brand: "Meta", logo: "/lovable-uploads/su-sponsors/meta.svg", what: "Ray-Ban Meta glasses to students, turning every creator into a live POV camera for the week." },
  { brand: "Dell", logo: "/lovable-uploads/su-sponsors/dell.svg", what: "Laptops for every student on campus." },
  { brand: "Shopify", logo: "/lovable-uploads/su-sponsors/shopify.svg", what: "Powered limited-edition product drops during the week, including a collab that sold out." },
  { brand: "Ch@mobile", what: "A phone and a year of wireless for all 120 students, then clipping agencies that drove 30M+ views." },
  { brand: "Zaxby's", what: "Catered the campus: 15,000+ chicken fingerz, 6,000 wings, 400+ gallons of sauce." },
  { brand: "State Farm", what: "Gifted subscriptions to streamers on stream, for doing good things." },
  { brand: "Crocs", what: "A pair for every student." },
  { brand: "TVU", what: "Gave away one $30,000 mobile streaming backpack." },
];

// Breakout creators. StreamsCharts.
const breakouts = [
  { name: "Rakai", peak: 230.5, display: "230.5K", note: "Highest individual peak on campus" },
  { name: "Suburbbaby", peak: 195.3, display: "195.3K", note: "Campus MVP, passed 777K followers" },
  { name: "Fanum", peak: 191, display: "191K", note: "Established creator" },
  { name: "JasonTheWeen", peak: 161.8, display: "161.8K", note: "Personal record" },
];
const breakoutMax = 230.5;

const quotes = [
  { q: "It was a masterclass in how you should actually approach branded activations in digital media.", who: "Mustafa Aijaz", role: "VP of Gaming and Digital Culture, SoaR Gaming" },
  { q: "You don't pander to this audience, they'll see right through that.", who: "Bernt Ullmann", role: "Co-founder, Ch@mobile" },
  { q: "Control is a tough thing for a brand.", who: "Nathaniel Weiss", role: "CEO and co-founder, Tone" },
];

const lessons = [
  { n: "01", title: "Be useful, not present", body: "The activations that worked gave creators something they needed on the day: a phone, a laptop, food, a camera. The brand became part of the story because it solved a problem on camera." },
  { n: "02", title: "Give up control on purpose", body: "Every brand accepted that 120 creators would use their product unscripted, in public, live. That is the trade, and it is exactly why the audience believes it." },
  { n: "03", title: "Buy the network, not the star", body: "The audience did not arrive through one channel. It arrived through 6,004. The reach came from the swarm of creators around the headline name." },
  { n: "04", title: "Build for the clip, not the broadcast", body: "The live number is the smallest part. Ch@mobile hired clipping agencies and got 30 million-plus views on the aftermath. The clips were the campaign." },
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

// Click-to-play facade for the real news segment. Shows the real thumbnail,
// loads the iframe only on click (fast, and no third-party cookies until then).
const VideoEmbed: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden ring-1 ring-border bg-black">
      {playing ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src="https://www.youtube-nocookie.com/embed/ZZml3bav4wc?autoplay=1&rel=0"
          title="Local news covers Streamer University at Hendrix College"
          allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 w-full h-full"
          aria-label="Play the news segment"
        >
          <img src="/lovable-uploads/su-video-thumb.webp" alt="News crews at Hendrix College for Streamer University" className="absolute inset-0 w-full h-full object-cover" />
          <span className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-primary shadow-xl group-hover:scale-105 transition-transform">
            <Play className="w-6 h-6 text-white translate-x-0.5" fill="currentColor" />
          </span>
        </button>
      )}
    </div>
  );
};

const StreamerUniversity2026: React.FC = () => {
  return (
    <div className="pb-4">
      {/* ── Hero (two-column, real photo) ── */}
      <section className="relative overflow-hidden rounded-3xl bg-[hsl(240_11%_5%)] px-6 sm:px-10 lg:px-16 py-14 lg:py-20">
        <div className="absolute -top-24 -right-24 w-[32rem] h-[32rem] rounded-full bg-primary/20 blur-[120px] pointer-events-none" aria-hidden />
        <div className="relative grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-center">
          <div>
            <div className="flex flex-wrap items-center gap-4 mb-7">
              <img src={SU_LOGO} alt="Streamer University" className="h-8 w-auto [filter:brightness(0)_invert(1)]" />
              <span className="text-xs font-semibold tracking-widest uppercase text-white/40">July 2026 · 9 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.05] tracking-tight mb-6">
              1.2 million people, one campus.{" "}
              <span style={serif} className="italic font-normal">Then it went to Europe.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
              For six days in July, a small college in Arkansas was the most-watched place on Twitch.
              120 creators, 20+ brands, ~57 million hours watched. Here is what the brands actually
              did, and why Nordic marketers should be reading it now.
            </p>
          </div>
          {/* Real photo of Kai Cenat */}
          <figure className="relative">
            <div className="rounded-2xl overflow-hidden ring-1 ring-white/15 shadow-2xl shadow-black/50 max-w-[20rem] lg:max-w-none mx-auto">
              <img src="/lovable-uploads/su-real/kai-cenat.webp" alt="Kai Cenat, founder of Streamer University" className="w-full h-auto" loading="eager" />
            </div>
            <figcaption className="text-[11px] text-white/40 mt-2 text-center lg:text-right">Kai Cenat, who founded and hosts Streamer University</figcaption>
          </figure>
        </div>
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-px mt-12 border border-white/10 rounded-2xl overflow-hidden bg-white/10">
          {heroStats.map((s) => (
            <div key={s.label} className="bg-black/30 backdrop-blur-sm px-5 py-5">
              <div className="text-2xl md:text-3xl font-bold text-white tracking-tight">{s.value}</div>
              <div className="text-xs text-white/50 mt-1 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What it is (real campus photo) ── */}
      <section className="mt-20 lg:mt-28 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <Reveal>
          <div className="rounded-2xl overflow-hidden ring-1 ring-border shadow-xl">
            <img src="/lovable-uploads/su-real/hendrix-campus.webp" alt="Hendrix College campus in Conway, Arkansas, the 2026 venue" className="w-full h-auto" loading="lazy" />
          </div>
          <p className="text-[11px] text-muted-foreground/60 mt-2">The real venue: Hendrix College, Conway, Arkansas.</p>
        </Reveal>
        <Reveal>
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">What it actually is</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-5">
            A real campus, run as a live production
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
            Streamer University is Kai Cenat's in-person creator bootcamp, streamed almost
            continuously. The 2026 edition ran 15 to 20 July at Hendrix College, with 120 students
            selected through auditions in New York, Los Angeles and Atlanta.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Established creators teach as professors, students join clubs, and the whole thing is
            broadcast from every participant's channel at once. Cenat is managed by Reed Duchscher's
            agency Night.
          </p>
        </Reveal>
      </section>

      {/* ── Watch: real video ── */}
      <section className="mt-20 lg:mt-28">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14 items-center">
          <div>
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">See it</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
              It was a real event, on real local news
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              This was not a purely online phenomenon. Hundreds of people physically descended on
              Conway, Arkansas, enough that the local FOX affiliate sent a crew to campus.
            </p>
          </div>
          <VideoEmbed />
        </div>
      </section>

      {/* ── The scale (dark, data-viz + platform marks) ── */}
      <section className="mt-20 lg:mt-28 rounded-3xl bg-[hsl(240_11%_5%)] px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">The scale</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-5">
              Peak viewership more than doubled in a year
            </h2>
            <p className="text-base md:text-lg text-white/65 leading-relaxed mb-5">
              The 2025 edition peaked at 731,000. The 2026 edition hit roughly 1.2 million concurrent
              viewers on Twitch alone, and about 1.45 million counting YouTube. For six days it was
              the single most-watched category on Twitch.
            </p>
            <div className="flex items-center gap-3 text-white/50">
              <span className="text-xs uppercase tracking-widest">Broadcast on</span>
              <img src="/lovable-uploads/su-sponsors/twitch.svg" alt="Twitch" className="h-4 w-auto opacity-80" />
              <img src="/lovable-uploads/su-sponsors/youtube.svg" alt="YouTube" className="h-4 w-auto opacity-80" />
            </div>
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
            <p className="text-xs text-white/40 pt-2">Peak concurrent viewers, category-wide. Independently confirmed by SullyGnome's week-after drop of 57.2M hours and 1.2M peak. Source: StreamsCharts.</p>
          </div>
        </div>
      </section>

      {/* ── The distribution insight ── */}
      <section className="mt-20 lg:mt-28">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">The part media buyers should notice</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
            The audience did not come from one channel. It came from 6,004.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Cenat's own channel peaked at 594,100 on Twitch, under half the category peak. The rest
            was watching 120 students and thousands of other channels covering the event from the
            inside. The reach was a swarm, not a broadcast.
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

      {/* ── Sponsor LOGO GRID ── */}
      <section className="mt-20 lg:mt-28">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">What the brands actually did</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
            More than 20 partners, almost no traditional ads
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Not one major activation was a pre-roll buy. Every one was a physical object or a mechanic
            that 120 creators had to use on camera, which is why they became content, not interruption.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sponsors.map((s) => (
            <Reveal key={s.brand}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 hover:border-primary/30 transition-colors">
                <div className="h-9 flex items-center mb-4">
                  {s.logo ? (
                    <img src={s.logo} alt={s.brand} className="h-6 w-auto max-w-[9rem] object-contain [filter:brightness(0)] dark:[filter:brightness(0)_invert(1)]" />
                  ) : (
                    <span className="text-lg font-bold tracking-tight text-foreground">{s.brand}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.what}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="text-xs text-muted-foreground/70 mt-6 max-w-3xl leading-relaxed">
          Sources: Digiday, StreamsCharts, Hendrix College. MrBeast also hid ten briefcases holding
          $10,000 each across campus, but attended as a guest, not a sponsor. In 2025 the phone
          sponsor was T-Mobile; in 2026 that slot went to creator-owned challenger Ch@mobile.
        </p>
      </section>

      {/* ── Zaxby's hard ROI ── */}
      <section className="mt-20 lg:mt-28 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">The clearest ROI in the building</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-5">
            Zaxby's catered lunch and grew 20,000 followers
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
            The fast-food chain ran no ad unit. It fed the campus, and its own social channels added
            more than 20,000 followers that week, a lift of over 1,000% week over week. The stated
            goal, per its VP of brand strategy, was content that could "live well beyond the event."
          </p>
          <p className="text-xs text-muted-foreground/70">Source: Digiday, 27 July 2026.</p>
        </Reveal>
        <Reveal>
          <div className="rounded-2xl border border-border bg-card p-8 grid grid-cols-2 gap-y-8 gap-x-6">
            {[["15,000+", "chicken fingerz served"], ["6,000", "wings"], ["20,000+", "new social followers"], ["1,000%+", "week-over-week lift"]].map(([v, l]) => (
              <div key={l}>
                <div className="text-3xl md:text-4xl font-bold text-primary tracking-tight">{v}</div>
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
                <blockquote className="text-lg font-light leading-relaxed text-foreground flex-1">"{q.q}"</blockquote>
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
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
            Suburbbaby arrived as a student and left as campus MVP, peaking at 195,300 concurrent
            viewers. Across the category, roughly 12.5 million follows and about 40,000 paid
            subscriptions were recorded during the week.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            The format manufactures mid-tier creators in a week. The people worth partnering with next
            year are on that list now, at a fraction of the price they will command later.
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
                <p className="text-base text-muted-foreground leading-relaxed">{l.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Europe 2027 (dark, with SU + Hendrix logos) ── */}
      <section className="mt-20 lg:mt-28 rounded-3xl bg-[hsl(240_11%_5%)] px-6 sm:px-10 lg:px-16 py-16">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">2027</span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-6 leading-tight">
            It is coming to Europe, and nobody has picked the country yet
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-5">
            At the closing ceremony on 20 July, Cenat announced Streamer University 2027 will be held
            in Europe, with alumni from both classes eligible to attend. No country, city, venue or
            date has been announced, and anyone telling you otherwise is guessing.
          </p>
          <p className="text-base md:text-lg text-white/55 leading-relaxed">
            That matters for Nordic brands for one practical reason: a European edition puts a
            1.2-million-viewer format inside European time zones, with European creators in the cast
            and European brands in the room. The 2026 sponsor list was locked long before July. The
            useful time to think about 2027 is now, not when the location is announced.
          </p>
        </div>
      </section>

      {/* ── What Nordic brands should take from it ── */}
      <section className="mt-20 lg:mt-28">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Closer to home</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
            You do not need a campus to run this play
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Streamer University is an extreme version of a mechanic that scales down cleanly. The logic
            behind it is the logic behind a native Nordic overlay campaign: show up inside content the
            audience already chose, across many creators rather than one, and let the creator frame it.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-primary/30 bg-primary/[0.03] p-8">
            <div className="text-sm font-semibold text-foreground mb-4">What transfers</div>
            <ul className="space-y-3">
              {["Many creators at once beats one big name", "Physical or in-world mechanics beat impressions", "The clip afterwards is the real reach", "Creator framing is what makes it credible"].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-base text-foreground/90">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-1" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="text-sm font-semibold text-foreground mb-4">What does not</div>
            <ul className="space-y-3">
              {["The budget: this was a six-day live production", "The guaranteed audience: Cenat brings his own", "The control: you cannot approve any of it in advance"].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-base text-muted-foreground">
                  <X className="w-4 h-4 text-muted-foreground/60 shrink-0 mt-1" />
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
            <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-3">Run the same mechanic in the Nordics</h2>
            <p className="text-background/60 text-sm md:text-base leading-relaxed">
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

      {/* ── Sources + image credits ── */}
      <section className="mt-16 pt-8 border-t border-border">
        <div className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground/70 mb-4">Sources</div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {sources.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
              {s.label} <ArrowUpRight className="w-3 h-3" />
            </a>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground/60 mt-5 max-w-3xl leading-relaxed">
          Image credits: Streamer University and Hendrix College logos, public domain. Kai Cenat photo
          by MILLION DOLLAZ WORTH OF GAME (CC BY 3.0). Hendrix College campus by Valis55 (CC BY-SA 3.0),
          both via Wikimedia Commons. News segment: FOX 16 KLRT. Brand marks are each company's own.
        </p>
        <p className="text-[11px] text-muted-foreground/50 mt-4 max-w-3xl leading-relaxed">
          Note on figures: viewership numbers are third-party measured (StreamsCharts, SullyGnome), not
          organiser-reported. Four figures from the organiser's own recap are excluded because
          independent data contradicts them, including a "1.6M combined" peak (measured at 1.45M) and a
          "403K YouTube peak" that belongs to Cenat's 6 July reveal stream rather than event week.
        </p>
      </section>
    </div>
  );
};

export default StreamerUniversity2026;
