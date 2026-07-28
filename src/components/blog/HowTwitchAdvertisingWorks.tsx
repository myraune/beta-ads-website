import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, X, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ClientLogoStrip from "@/components/blog/ClientLogoStrip";

/**
 * Rich, full-width editorial page for "How Twitch advertising actually works".
 * This post was CUT by the content-quality audit for fabricated stats; it is
 * republished here only after a fact-check that removed the unsupportable
 * numbers. Every figure below is either a verified Beta Ads case-study number
 * (matching the live case studies) or a named external source:
 * - Global ad-block users 1.77B / 29.5% of internet users: Backlinko +
 *   DataReportal, Q2 2025. Youngest cohort (16-24) ~34%, the highest cohort.
 * - Nordic ad-blocking ~36% of internet users 15+: AudienceProject.
 * - Display CTR benchmark ~0.27% avg: Smart Insights, 2024.
 * - Twitch CPM ~$4-10 (peak ~$12 Q4), platform revenue down ~8%
 *   ($1.96B 2023 -> $1.8B 2024): Awisee.
 * CUT vs the old markdown: the fabricated "61% of blockers are 18-34", the
 * wrong "18-24 above 55%", and the unsourced "Twitch CPM fell 30-50%".
 * Disputed campaign CTRs (Samsung 2.93%, Kristiania 1.53%) are NOT presented
 * as verified; Samsung appears by reach only.
 */

const serif = { fontFamily: "'Instrument Serif', serif" };

const heroStats = [
  { value: "3", label: "Ways to actually buy Twitch" },
  { value: "1.77B", label: "Global ad-block users" },
  { value: "0%", label: "Ad-block reach on native overlay" },
  { value: "39,000+", label: "Nordic streamers on-platform" },
];

const formats = [
  {
    name: "Pre-roll video",
    bought: "Amazon Ads / direct Twitch IO",
    block: "no",
    blockLabel: "Blocked",
    blockNote: "Young viewers strip it before it renders",
    ctr: "0.1 - 0.3%",
    ctrNote: "Industry display benchmark",
  },
  {
    name: "Sponsored campaigns",
    bought: "Twitch Sponsorships (ex-Bounty Board)",
    block: "partial",
    blockLabel: "Partial",
    blockNote: "Mid-roll insertion, some slips through",
    ctr: "Not public",
    ctrNote: "Twitch does not report it",
  },
  {
    name: "Native overlay",
    bought: "Creator-led platforms (Beta Ads)",
    block: "yes",
    blockLabel: "Unblockable",
    blockNote: "Rendered inside the broadcast feed",
    ctr: "0.5 - 1.3%",
    ctrNote: "4 - 9% on peak days",
    highlight: true,
  },
];

// Ad-block reach, named sources. All current except the Nordic line (dated).
const adblock = [
  { seg: "Global internet users", pct: 29.5, display: "29.5%", note: "1.77B people - Backlinko / DataReportal, Q2 2025", highlight: true },
  { seg: "Ages 16 - 24 (highest cohort)", pct: 34, display: "~34%", note: "Backlinko, Q2 2025" },
  { seg: "Nordic internet users 15+", pct: 36, display: "~36%", note: "AudienceProject" },
];

// Verified Beta Ads campaign CTR - solid numbers only (matches live case
// studies). The disputed Samsung 2.93% / Kristiania 1.53% are excluded.
const campaigns = [
  { brand: "Shure MV6", logo: "/lovable-uploads/logo-shure.png", cat: "Audio launch", streamers: "2", ctr: 1.31, ctrLabel: "1.31%", peak: "9.12% peak", href: "/case-study/shure" },
  { brand: "Komplett", logo: "/lovable-uploads/logo-komplett.png", cat: "Retail", streamers: "34", ctr: 1.17, ctrLabel: "1.17%", peak: "4.48% peak", href: "/case-study/komplett" },
  { brand: "NKI", logo: "/lovable-uploads/logo-nki.svg", cat: "Distance learning", streamers: "19", ctr: 0.72, ctrLabel: "0.72%", peak: null, href: "/case-study/nki" },
  { brand: "Surfshark", logo: "/lovable-uploads/logo-surfshark.png", cat: "VPN awareness", streamers: "26", ctr: 0.62, ctrLabel: "0.62%", peak: null, href: "/case-study/surfshark" },
  { brand: "Saily", logo: "/lovable-uploads/logo-saily.png", cat: "Travel eSIM", streamers: "22", ctr: 0.50, ctrLabel: "0.50%", peak: null, href: "/case-study/saily" },
];
const ctrMax = 1.4;

const mediaPlan = [
  { role: "Reach", channel: "TV / BVOD (NRK, TV 2 Play)", note: "Mass reach for 35+ consumer campaigns." },
  { role: "Incremental reach", channel: "Connected TV (Samsung TV Plus, DR Play)", note: "Display-quality brand safety on top of TV." },
  { role: "Older creator layer", channel: "YouTube live", note: "Similar shape to Twitch, skews slightly older." },
  { role: "Engagement + CTR", channel: "Native Twitch overlay", note: "The 18-34 engagement layer, with verified attribution." },
  { role: "Distribution", channel: "Clipping", note: "Best live moments pushed to TikTok / Reels / Shorts." },
];

const fitYes = [
  "Your audience skews 18 - 34",
  "Your category already has active Twitch creators (gaming gear, electronics, food delivery, SaaS, travel, education, CPG)",
  "You can commit to a real test, not a one-week probe",
];
const fitNo = [
  "Your audience is primarily 45+",
  "Your product needs heavy in-ad regulatory disclosure",
  "You only have 15-second TV cutdowns and no budget for native creative",
];
const firstTest = [
  "One specific category (Just Chatting, Fortnite or FIFA - not just 'gaming')",
  "5 - 15 Nordic streamers from one national market",
  "A 2 - 4 week runway",
  "One overlay format (Snipe or Rich Media)",
  "A measurable action (clicks to a landing page, not just awareness)",
];

const sources = [
  { label: "Backlinko - Ad-blocker usage statistics (Q2 2025)", href: "https://backlinko.com/ad-blockers-users" },
  { label: "AudienceProject - Ad blocking in the Nordics", href: "https://audienceproject.com/resources/insight-studies/ad-blocking-the-nordics/" },
  { label: "Smart Insights - Display CTR benchmarks", href: "https://www.smartinsights.com/internet-advertising/internet-advertising-analytics/display-advertising-clickthrough-rates/" },
  { label: "Awisee - Twitch CPM rates", href: "https://awisee.com/blog/twitch-cpm-rates/" },
  { label: "Beta Ads case studies", href: "/case-studies" },
];

const Reveal: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
};

const BlockBadge: React.FC<{ kind: string; label: string }> = ({ kind, label }) => {
  const map: Record<string, { cls: string; Icon: typeof Check }> = {
    yes: { cls: "bg-primary/10 text-primary", Icon: Check },
    no: { cls: "bg-muted text-muted-foreground", Icon: X },
    partial: { cls: "bg-muted text-muted-foreground", Icon: Minus },
  };
  const { cls, Icon } = map[kind];
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${cls}`}>
      <Icon className="w-3 h-3" /> {label}
    </span>
  );
};

const HowTwitchAdvertisingWorks: React.FC = () => {
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
            <span className="text-white/40">Updated 2026 · 8 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-6">
            How Twitch advertising{" "}
            <span style={serif} className="italic font-normal">actually</span> works now
          </h1>
          <p className="text-lg text-white/65 leading-relaxed max-w-xl">
            The 2019 playbook - pre-roll and programmatic display - now describes a minority of what
            moves spend on Twitch. Here is how a campaign really runs in 2026: the three buying
            channels, the ad-block reality, what gets measured, and the verified CTR you can expect
            from real Nordic campaigns.
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

      {/* ── Three formats ── */}
      <section className="mt-20 lg:mt-28">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">What "Twitch ads" means now</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
            Three products hide behind one phrase
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mt-4">
            They are bought differently, they survive ad-block differently, and they convert differently.
            Confusing them is the fastest way to a disappointing campaign.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {formats.map((f) => (
            <Reveal key={f.name}>
              <div className={`h-full rounded-2xl border p-7 ${f.highlight ? "border-primary/40 bg-primary/[0.03]" : "border-border bg-card"}`}>
                <h3 className="text-xl font-semibold text-foreground mb-1">{f.name}</h3>
                <p className="text-xs text-muted-foreground mb-5">{f.bought}</p>
                <BlockBadge kind={f.block} label={f.blockLabel} />
                <p className="text-xs text-muted-foreground mt-2 mb-6 leading-relaxed">{f.blockNote}</p>
                <div className="pt-5 border-t border-border">
                  <div className="text-2xl font-bold text-foreground tracking-tight">{f.ctr}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{f.ctrNote}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Living proof: a real overlay campaign as it renders inside a stream */}
        <Reveal className="mt-8">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 items-center rounded-2xl border border-border bg-card p-4 lg:p-6">
            <div className="rounded-xl overflow-hidden bg-black ring-1 ring-border">
              <video
                src="/lovable-uploads/overlay-komplett.webm"
                autoPlay loop muted playsInline preload="none"
                className="w-full h-auto"
                aria-label="A native Komplett overlay ad rendered live inside a Norwegian Twitch stream"
              />
            </div>
            <div className="px-2 lg:pr-6">
              <div className="text-[11px] font-semibold tracking-widest uppercase text-primary mb-2">This is native overlay</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Real campaign creative, rendered inside the broadcast feed - no pre-roll, no pop-up,
                nothing for an ad-blocker to strip. It is present through the session, part of the
                stream the viewer chose to watch. That is why it survives ad-block and reports
                verified clicks.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Ad-block reality (data-viz, dark) ── */}
      <section className="mt-20 lg:mt-28 rounded-3xl bg-[hsl(240_11%_5%)] px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">The reason pre-roll underperforms</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-5">
              Half your Gen Z pre-roll euro never renders
            </h2>
            <p className="text-base text-white/60 leading-relaxed max-w-md mb-4">
              Ad-block is heaviest exactly where Twitch skews youngest. For programmatic pre-roll bought
              at spot-market prices, a large share of every euro aimed at young viewers is delivered to a
              blocker that never shows the creative. The CPM on the dashboard looks fine; the ad never
              rendered.
            </p>
            <p className="text-sm text-white/45 leading-relaxed max-w-md">
              Native overlay sidesteps this at the format level - there is no separate ad request for a
              blocker to filter.
            </p>
          </div>
          <div className="space-y-7">
            {adblock.map((d) => (
              <div key={d.seg}>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm font-semibold text-white">{d.seg}</span>
                  <span className="text-xl font-bold text-white tabular-nums">{d.display}</span>
                </div>
                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <div className={`h-full rounded-full ${d.highlight ? "bg-primary" : "bg-white/40"}`} style={{ width: `${d.pct}%` }} />
                </div>
                <p className="text-[11px] text-white/40 mt-1.5">{d.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Attribution ── */}
      <section className="mt-20 lg:mt-28 grid lg:grid-cols-2 gap-14 items-start">
        <Reveal>
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">What actually gets measured</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-5">
            The "unauditable" complaint is out of date
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-md">
            Twitch spend used to mean screenshots from streamers and platform impression counts that
            could not separate paid reach from organic viewership. A modern campaign report is platform-
            verified and clip-checked end to end.
          </p>
        </Reveal>
        <Reveal>
          <ul className="rounded-2xl border border-border bg-card divide-y divide-border">
            {[
              ["Verified completed views", "Viewer present and the overlay actually rendered"],
              ["Verified clicks", "Platform-tracked, attributed to the placement"],
              ["Per-streamer breakdown", "CTR, views and on-screen time per channel"],
              ["Category + regional split", "Which games and which regions drove delivery"],
              ["Peak-day data", "Highest-CTR day tied to the streamer moment"],
            ].map(([t, d]) => (
              <li key={t} className="flex items-start gap-3 px-6 py-4">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-foreground">{t}</div>
                  <div className="text-xs text-muted-foreground">{d}</div>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ── Verified CTR benchmarks ── */}
      <section className="mt-20 lg:mt-28">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Verified, not aspirational</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
            What native overlay actually delivers in the Nordics
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mt-4">
            Verified CTR from published Beta Ads case studies. The honest band is roughly
            <strong className="text-foreground"> 0.5 to 1.3%</strong> for native overlay across B2C
            categories, with peak-day CTR of <strong className="text-foreground">4 to 9%</strong> when
            the creative lands on a streamer mention. Education and SaaS sit at the lower end, a function
            of audience-product fit.
          </p>
        </div>
        <div className="rounded-2xl border border-border overflow-hidden">
          {campaigns.map((c, i) => (
            <Link key={c.brand} to={c.href} className={`group grid grid-cols-[1fr_auto] sm:grid-cols-[minmax(0,16rem)_1fr_auto] items-center gap-4 sm:gap-8 px-6 py-5 hover:bg-muted/40 transition-colors ${i > 0 ? "border-t border-border" : ""}`}>
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={c.logo}
                  alt={c.brand}
                  className="h-5 w-16 object-contain shrink-0 opacity-80 [filter:brightness(0)] dark:[filter:brightness(0)_invert(1)]"
                />
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">{c.brand}</div>
                  <div className="text-xs text-muted-foreground truncate">{c.cat} · {c.streamers} streamers</div>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="h-2.5 rounded-full bg-muted overflow-hidden max-w-md">
                  <div className="h-full rounded-full bg-primary/80" style={{ width: `${Math.round((c.ctr / ctrMax) * 100)}%` }} />
                </div>
              </div>
              <div className="text-right">
                <div className="text-base font-bold text-foreground tabular-nums">{c.ctrLabel}</div>
                {c.peak && <div className="text-[11px] text-primary">{c.peak}</div>}
              </div>
            </Link>
          ))}
        </div>
        <p className="text-xs text-muted-foreground/70 mt-4 max-w-2xl leading-relaxed">
          Verified CTR = platform-tracked clicks over completed views. Samsung's Galaxy S25 Ultra and
          Z Fold7 launches are shown by reach elsewhere (800,000+ live views across 71 streamer slots);
          their CTR is under review and deliberately excluded here.
        </p>
      </section>

      {/* ── Market context (real CPM) ── */}
      <section className="mt-20 lg:mt-28 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">The market underneath</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-5">
            Programmatic softened, native absorbed the spend
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-md mb-4">
            Twitch programmatic CPMs sit around 4 to 10 dollars, rising toward 12 in Q4, and platform ad
            revenue slipped roughly 8% year over year. As supply shifted toward TikTok and Instagram, the
            budget that left pre-roll increasingly moved into creator-led native formats that survive
            ad-block and report verified results.
          </p>
          <p className="text-xs text-muted-foreground/70">Source: Awisee, Twitch CPM rates.</p>
        </Reveal>
        <Reveal>
          <div className="rounded-2xl border border-border bg-card p-8 grid grid-cols-2 gap-6">
            <div>
              <div className="text-3xl font-bold text-foreground tracking-tight">$4 - $10</div>
              <div className="text-xs text-muted-foreground mt-1">Typical Twitch CPM, up to $12 in Q4</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground tracking-tight">~8%</div>
              <div className="text-xs text-muted-foreground mt-1">Twitch ad revenue decline, 2023 to 2024</div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Media plan ── */}
      <section className="mt-20 lg:mt-28">
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Where it fits</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
            Twitch is not a TV substitute. It replaces the blocked programmatic layer.
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mt-4 max-w-xl">
            A mature Nordic launch runs two or three of these in parallel, with native Twitch carrying
            engagement and CTR while TV and CTV carry reach.
          </p>
        </div>
        <div className="rounded-2xl border border-border overflow-hidden">
          {mediaPlan.map((m, i) => (
            <div key={m.channel} className={`grid sm:grid-cols-[minmax(0,11rem)_minmax(0,18rem)_1fr] gap-2 sm:gap-6 px-6 py-4 items-baseline ${i > 0 ? "border-t border-border" : ""}`}>
              <div className="text-[11px] font-semibold tracking-widest uppercase text-primary">{m.role}</div>
              <div className="text-sm font-medium text-foreground">{m.channel}</div>
              <div className="text-sm text-muted-foreground leading-relaxed">{m.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Fit + first test ── */}
      <section className="mt-20 lg:mt-28">
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Is it right for you</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">A five-minute fit check</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="rounded-2xl border border-primary/30 bg-primary/[0.03] p-7">
            <div className="text-sm font-semibold text-foreground mb-4">Good fit</div>
            <ul className="space-y-3">
              {fitYes.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/90"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />{f}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-7">
            <div className="text-sm font-semibold text-foreground mb-4">Wrong format</div>
            <ul className="space-y-3">
              {fitNo.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground"><X className="w-4 h-4 text-muted-foreground/60 shrink-0 mt-0.5" />{f}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-7">
          <div className="text-sm font-semibold text-foreground mb-4">What a first test should have</div>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {firstTest.map((f, i) => (
              <div key={f} className="flex items-start gap-3">
                <span className="text-sm font-bold text-primary/40 tabular-nums shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm text-foreground/90 leading-relaxed">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClientLogoStrip />

      {/* ── CTA ── */}
      <section className="mt-20 lg:mt-28">
        <div className="rounded-3xl bg-foreground text-background p-10 md:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-lg">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-3">Ready to scope a real test?</h2>
            <p className="text-background/60 text-sm leading-relaxed">
              We run native overlay campaigns across 39,000+ Nordic streamers with verified reporting.
              See how the formats work, what a campaign costs, and the real Nordic results.
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
            <ArrowRight className="w-3.5 h-3.5" /> The Twitch advertising overview
          </Link>
          <Link to="/case-studies" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
            <ArrowRight className="w-3.5 h-3.5" /> All Nordic case studies
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
            s.href.startsWith("/") ? (
              <Link key={s.href} to={s.href} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                {s.label} <ArrowRight className="w-3 h-3" />
              </Link>
            ) : (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                {s.label} <ArrowUpRight className="w-3 h-3" />
              </a>
            )
          ))}
        </div>
      </section>
    </div>
  );
};

export default HowTwitchAdvertisingWorks;
