import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * Rich, full-width editorial page for the April 2026 Twitch platform-overhaul
 * post. Replaces the narrow markdown column with a designed layout (stat strip,
 * data-viz, timeline, before/after, action grid) via BlogPost's hasDashboard +
 * wideLayout hooks, keeping the /blog/... URL, SEO, JSON-LD and hreflang intact.
 *
 * Every number is from the post's sourced facts or checkable arithmetic:
 * - Market share 71% (late 2023) -> ~54% (2026): Streams Charts.
 * - 1080p -> 1440p 2K: a 10%-area overlay gains +78% pixels
 *   (2560x1440 / 1920x1080 = 1.778): stated in-post, arithmetic verified.
 * - Combos shut down 2026-03-31, ~11 months after beta: StreamChat AI.
 * - Affiliate floor 50 -> 25 followers (+ 4h, 4 days, 3 CCV): Twitch.
 */

const serif = { fontFamily: "'Instrument Serif', serif" };

const heroStats = [
  { value: "5", label: "Parallel changes" },
  { value: "54%", label: "Twitch share, from 71%" },
  { value: "+78%", label: "Overlay pixels at 2K" },
  { value: "25", label: "New affiliate floor, was 50" },
];

const changes = [
  {
    n: "01",
    tag: "Apr 13, 2026",
    title: "The MSA now shares viewer data with advertisers",
    change:
      "Twitch's updated Monetized Streamer Agreement lets it share personal data with Amazon and advertisers to facilitate monetization. Withdrawing consent means leaving the monetization program entirely. First spotted by reporter Zach Bussey.",
    action:
      "Confirm GDPR compliance for any Amazon Ads targeting derived from Twitch viewer data.",
  },
  {
    n: "02",
    tag: "Rolling out",
    title: "A vertical Discovery Feed opens a new inventory surface",
    change:
      "Dual-format streaming lets creators broadcast 16:9 and 9:16 at once, feeding a TikTok-style vertical Discovery Feed. Vertical pre-rolls and mid-rolls are a different product: shorter attention window, different creative.",
    action:
      "Audit creative for 9:16, and decide whether to buy vertical inventory separately.",
  },
  {
    n: "03",
    tag: "Eligible channels",
    title: "2K (1440p) streaming makes overlay ads legible",
    change:
      "Twitch expanded to 1440p over HEVC. For the same proportional overlay, 1440p carries roughly 78% more pixels than 1080p - enough to make a product shot legible, a URL readable, or a QR code scannable.",
    action:
      "Review overlay templates so text, logos and codes hold up at 1440p.",
  },
  {
    n: "04",
    tag: "Mar 31, 2026",
    title: "Combos died, and it says where Bits is headed",
    change:
      "Twitch shut down Combos, its Bits-chaining animation feature, ~11 months after beta, admitting it failed to bring in new spenders. Fast discipline, but a warning: Bits-based mechanics get deprecated on short notice.",
    action:
      "Do not build campaign mechanics on Bits-based features.",
  },
  {
    n: "05",
    tag: "Requirements cut",
    title: "A lower affiliate floor roughly doubles the creator pool",
    change:
      "The affiliate threshold dropped to 25 followers, 4 hours streamed, 4 unique broadcast days and 3 average concurrent viewers, down from 50 followers. In the Nordics, that unlocks a new layer of micro-creators.",
    action:
      "Explore micro-creator portfolio strategies for Nordic-language campaigns.",
  },
];

// Twitch share of hours watched, from the post's Streams Charts citation.
const share = [
  { year: "Late 2023", pct: 71 },
  { year: "2026", pct: 54, highlight: true },
];

// A 10%-area overlay: total px = w*h, 10% of it. Arithmetic, not a claim.
const overlayPx = [
  { res: "1080p", dims: "1920 × 1080", px: 207360, display: "207,360 px" },
  { res: "1440p (2K)", dims: "2560 × 1440", px: 368640, display: "368,640 px", highlight: true },
];
const overlayMax = 368640;

const durable = [
  { name: "Channel Points", funded: "Watch-time funded", ok: true },
  { name: "Predictions", funded: "Watch-time funded", ok: true },
  { name: "Polls", funded: "Watch-time funded", ok: true },
  { name: "Bits / Combos", funded: "Direct spend, being pruned", ok: false },
];

const affiliate = {
  before: ["50 followers"],
  after: ["25 followers", "4 hours streamed", "4 unique broadcast days", "3 average concurrent viewers"],
};

const actions = [
  { change: "MSA data sharing", action: "Confirm GDPR compliance for any Amazon Ads targeting derived from Twitch viewer data." },
  { change: "Vertical Discovery Feed", action: "Audit creative assets for 9:16; decide whether to buy vertical inventory separately." },
  { change: "2K streaming", action: "Review overlay ad templates for 1440p clarity." },
  { change: "Combos shutdown", action: "Avoid building campaign mechanics on Bits-based features." },
  { change: "Lower affiliate threshold", action: "Explore micro-creator portfolio strategies for Nordic-language campaigns." },
];

const sources = [
  { label: "Twitch Monetized Streamer Agreement", href: "https://legal.twitch.com/legal/monetized-streamer-agreement/" },
  { label: "Zach Bussey - MSA data-sharing update", href: "https://x.com/zachbussey/status/2043773101364650085" },
  { label: "StreamChat AI - Twitch killed Combos", href: "https://streamchatai.com/blog/twitch-just-killed-combos-heres-what-that-tells-us-about-the-future-of-bits" },
  { label: "Streams Charts - Twitch for new streamers 2026", href: "https://streamscharts.com/news/twitch-still-good-new-streamers-data-based-answer-2026" },
  { label: "What's Trending - Twitch 2026 updates", href: "https://whatstrending.com/twitch-previews-2026-updates-focused-on-streaming-moderation-and-monetization/" },
  { label: "Streaming Media - Twitch dual-layout streaming", href: "https://www.streamingmedia.com/Articles/News/Online-Video-News/Twitchs-Dual-Layout-Streaming-Technical-Innovation-or-Industry-Revolution-170053.aspx" },
];

const Reveal: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
};

const TwitchApril2026Overhaul: React.FC = () => {
  return (
    <div className="pb-4">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden rounded-3xl bg-[hsl(240_11%_5%)] px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
        <div className="absolute -top-24 -right-24 w-[32rem] h-[32rem] rounded-full bg-primary/20 blur-[120px] pointer-events-none" aria-hidden />
        <div className="relative max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 mb-7 text-xs font-semibold tracking-widest uppercase">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80">
              <img src="/lovable-uploads/platform-twitch.png" alt="Twitch" className="h-3.5 w-auto" />
              Twitch Insights
            </span>
            <span className="text-white/40">21 Apr 2026 · 8 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-6">
            Twitch just rewrote{" "}
            <span style={serif} className="italic font-normal">the rules</span> again
          </h1>
          <p className="text-lg text-white/65 leading-relaxed max-w-xl">
            Between April 13 and the end of the month, Twitch changed how it shares viewer data,
            launched vertical streaming, doubled its resolution, killed a monetization experiment
            and halved its affiliate floor. Here is what each shift means for brands buying live
            stream inventory.
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

      {/* ── The five changes ── */}
      <section className="mt-20 lg:mt-28">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Five shifts, one month</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
            No single change reshapes the market. Together they do.
          </h2>
        </div>
        <div className="space-y-3">
          {changes.map((c) => (
            <Reveal key={c.n}>
              <div className="group grid md:grid-cols-[auto_1fr_1fr] gap-5 md:gap-10 items-start rounded-2xl border border-border bg-card p-6 lg:p-8 hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-4 md:block">
                  <div className="text-4xl font-bold text-primary/20 tracking-tighter leading-none">{c.n}</div>
                  <div className="text-[11px] font-semibold tracking-widest uppercase text-primary md:mt-3">{c.tag}</div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 leading-snug">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.change}</p>
                </div>
                <div className="md:border-l md:border-border md:pl-8">
                  <div className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground/70 mb-2">Advertiser action</div>
                  <p className="text-sm text-foreground/90 leading-relaxed">{c.action}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Market share context (data-viz) ── */}
      <section className="mt-20 lg:mt-28 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Why now</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-5">
            A platform defending its lead
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-md mb-4">
            Twitch's share of hours watched has slipped from about 71% in late 2023 to
            roughly 54% in 2026, with YouTube Gaming and Kick taking mid-tier and frustrated
            creators. The vertical feed and the lower affiliate floor are its play to
            recapture mobile-first and long-tail creators before the gap widens.
          </p>
          <p className="text-xs text-muted-foreground/70 leading-relaxed max-w-md">
            Share of hours watched. Source: Streams Charts, 2026.
          </p>
        </Reveal>
        <Reveal>
          <div className="rounded-2xl border border-border bg-card p-8 space-y-6">
            {share.map((d) => (
              <div key={d.year}>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground">{d.year}</span>
                  <span className="text-2xl font-bold text-foreground tabular-nums">{d.pct}%</span>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full ${d.highlight ? "bg-primary" : "bg-primary/50"}`} style={{ width: `${d.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── 2K overlay math (the standout viz) ── */}
      <section className="mt-20 lg:mt-28 rounded-3xl bg-[hsl(240_11%_5%)] px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">The 2K detail brands miss</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-5">
              Same overlay, 78% more pixels
            </h2>
            <p className="text-base text-white/60 leading-relaxed max-w-md mb-4">
              An overlay lives in a small, fixed slice of the frame. Hold that slice at 10% of
              the screen and move from 1080p to 1440p, and the pixels inside it jump from
              207,360 to 368,640. That is the difference between a soft logo and a scannable
              QR code from a couch.
            </p>
            <p className="text-sm text-white/50 leading-relaxed max-w-md">
              Assets built for 1080p can look soft on upgraded streams. Worth rendering overlay
              text and logos for both output targets.
            </p>
          </div>
          <div className="space-y-6">
            {overlayPx.map((d) => (
              <div key={d.res}>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm font-semibold text-white">{d.res} <span className="text-white/40 font-normal">· {d.dims}</span></span>
                  <span className="text-lg font-bold text-white tabular-nums">{d.display}</span>
                </div>
                <div className="h-4 rounded-full bg-white/10 overflow-hidden">
                  <div className={`h-full rounded-full ${d.highlight ? "bg-primary" : "bg-white/40"}`} style={{ width: `${Math.round((d.px / overlayMax) * 100)}%` }} />
                </div>
              </div>
            ))}
            <p className="text-xs text-white/40 pt-2">Pixel area of a 10%-of-screen overlay. Arithmetic on stated resolutions.</p>
          </div>
        </div>
      </section>

      {/* ── Combos timeline + durable tools ── */}
      <section className="mt-20 lg:mt-28 grid lg:grid-cols-2 gap-14 items-start">
        <Reveal>
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">The Combos lesson</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">
            Built on Bits? Build on something else.
          </h2>
          <div className="relative pl-6 border-l-2 border-border space-y-6">
            <div className="relative">
              <span className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-muted-foreground/40 ring-4 ring-background" />
              <div className="text-sm font-semibold text-foreground">Combos launches (beta)</div>
              <div className="text-xs text-muted-foreground">Bits-chaining animations, borrowed from TikTok gifting</div>
            </div>
            <div className="relative">
              <span className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-muted-foreground/40 ring-4 ring-background" />
              <div className="text-sm font-semibold text-foreground">~11 months of testing</div>
              <div className="text-xs text-muted-foreground">Meant to convert first-time spenders</div>
            </div>
            <div className="relative">
              <span className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-background" />
              <div className="text-sm font-semibold text-foreground">Mar 31, 2026 - shut down</div>
              <div className="text-xs text-muted-foreground">Twitch admitted it failed to bring in new spenders</div>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="text-sm font-semibold text-foreground mb-1">What to build interactive campaigns on instead</div>
            <p className="text-xs text-muted-foreground mb-6">Engagement-funded mechanics have a bigger base and a longer track record than anything in Bits.</p>
            <ul className="divide-y divide-border">
              {durable.map((t) => (
                <li key={t.name} className="flex items-center justify-between py-3">
                  <div>
                    <div className="text-sm font-medium text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.funded}</div>
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${t.ok ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                    {t.ok ? "Durable" : "Deprecating"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* ── Affiliate before/after ── */}
      <section className="mt-20 lg:mt-28">
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">A wider creator pool</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
            The affiliate floor just halved, and the Nordics feel it most
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mt-4 max-w-xl">
            Nordic-language inventory has always been thin. A lower threshold unlocks a layer of
            micro-creators with 25 to 100 followers and tight communities. A portfolio across 20
            to 30 of them can beat a single mid-tier partnership on engagement and CPM.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground/70 mb-4">Before</div>
            <div className="text-3xl font-bold text-foreground/50 mb-4">50 followers</div>
            <p className="text-sm text-muted-foreground">A single follower gate that kept the long tail out of monetization.</p>
          </div>
          <div className="rounded-2xl border border-primary/40 bg-primary/[0.03] p-8">
            <div className="text-[11px] font-semibold tracking-widest uppercase text-primary mb-4">Now</div>
            <ul className="space-y-2.5">
              {affiliate.after.map((r) => (
                <li key={r} className="flex items-center gap-2.5 text-sm text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── What brands should do now (action grid) ── */}
      <section className="mt-20 lg:mt-28">
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Your playbook</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">What to do before it becomes table stakes</h2>
        </div>
        <div className="rounded-2xl border border-border overflow-hidden">
          {actions.map((a, i) => (
            <div key={a.change} className={`grid sm:grid-cols-[minmax(0,14rem)_1fr] gap-2 sm:gap-8 px-6 py-5 ${i > 0 ? "border-t border-border" : ""}`}>
              <div className="text-sm font-semibold text-foreground">{a.change}</div>
              <div className="text-sm text-muted-foreground leading-relaxed">{a.action}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mt-20 lg:mt-28">
        <div className="rounded-3xl bg-foreground text-background p-10 md:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-lg">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-3">
              Updating your Twitch playbook for 2026?
            </h2>
            <p className="text-background/60 text-sm leading-relaxed">
              We run native overlay campaigns across 39,000+ Nordic streamers and keep the creative
              current with every platform shift. See how the format works and what a campaign costs.
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
          <Link to="/twitch-advertising" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
            <ArrowRight className="w-3.5 h-3.5" /> How Twitch advertising works
          </Link>
          <Link to="/case-studies" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
            <ArrowRight className="w-3.5 h-3.5" /> See real Nordic campaign results
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
      </section>
    </div>
  );
};

export default TwitchApril2026Overhaul;
