import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ClientLogoStrip from "@/components/blog/ClientLogoStrip";

/**
 * Rich, full-width editorial page: the ad-block reality and why native overlay
 * is the format that survives it. This REPLACES an earlier version that was cut
 * for fabricated stats (a "64%" headline from a vendor report, invented Nordic
 * market sizing, made-up "94% blocked / 61% bypass" figures). Every number here
 * is from a named, checkable source:
 * - >1B ad-block users (1.77B by monthly-user measures, 29.5% of internet
 *   users): Backlinko / DataReportal, Q2 2025.
 * - 16-24 block rate ~34% (highest cohort): Backlinko / DataReportal.
 * - US 18-24 ~41%: eMarketer. Nordic 15+ ~36%: AudienceProject.
 * - Display CTR ~0.46% avg: WordStream / Google Display Network.
 * - Native display ad spend +13.1% in 2026: eMarketer.
 * - Twitch trust: 54% trust favorite streamers' brand recs, 67% of highly
 *   engaged users, 44% research products after sponsored streams - Twitch RPG
 *   "ROI of Live Communities", Jul 2025, n=9,960, via Amazon Ads.
 * - Native overlay is unblockable by design (rendered in the broadcast feed,
 *   no separate ad request to filter) - a format property, not a claim.
 */

const serif = { fontFamily: "'Instrument Serif', serif" };

const heroStats = [
  { value: "1B+", label: "People run ad-blockers" },
  { value: "~34%", label: "Block rate, ages 16-24" },
  { value: "0%", label: "Ad-block reach on native overlay" },
  { value: "39,000+", label: "Nordic streamers on-platform" },
];

// Ad-block rate by segment. Every line has a named source.
const rates = [
  { seg: "Global internet users", pct: 29.5, display: "29.5%", note: "1.77B people - Backlinko / DataReportal, Q2 2025", highlight: true },
  { seg: "Ages 16 - 24 (highest cohort)", pct: 34, display: "~34%", note: "Backlinko / DataReportal" },
  { seg: "United States, ages 18 - 24", pct: 41, display: "41%", note: "eMarketer" },
  { seg: "Nordic internet users 15+", pct: 36, display: "~36%", note: "AudienceProject" },
];

// Real Twitch trust data (Twitch RPG "ROI of Live Communities", Jul 2025,
// n=9,960 adults 18-44 across 10 markets), via Amazon Ads.
const trust = [
  { pct: "54%", label: "trust their favourite streamers to recommend brands" },
  { pct: "67%", label: "of highly engaged viewers trust streamer recommendations" },
  { pct: "44%", label: "research a product after seeing it in a sponsored stream" },
];

// Verified Beta Ads campaign CTR (matches the live case studies). Solid
// numbers only; disputed Samsung/Kristiania CTRs are excluded.
const campaigns = [
  { brand: "Shure MV6", logo: "/lovable-uploads/logo-shure.png", ctr: 1.31, ctrLabel: "1.31%", peak: "9.12% peak", href: "/case-study/shure" },
  { brand: "Komplett", logo: "/lovable-uploads/logo-komplett.png", ctr: 1.17, ctrLabel: "1.17%", peak: "4.48% peak", href: "/case-study/komplett" },
  { brand: "NKI", logo: "/lovable-uploads/logo-nki.svg", ctr: 0.72, ctrLabel: "0.72%", peak: null, href: "/case-study/nki" },
  { brand: "Surfshark", logo: "/lovable-uploads/logo-surfshark.png", ctr: 0.62, ctrLabel: "0.62%", peak: null, href: "/case-study/surfshark" },
  { brand: "Saily", logo: "/lovable-uploads/logo-saily.png", ctr: 0.50, ctrLabel: "0.50%", peak: null, href: "/case-study/saily" },
];
const ctrMax = 1.4;

const sources = [
  { label: "Backlinko - Ad-blocker usage statistics (Q2 2025)", href: "https://backlinko.com/ad-blockers-users" },
  { label: "AudienceProject - Ad blocking in the Nordics", href: "https://audienceproject.com/resources/insight-studies/ad-blocking-the-nordics/" },
  { label: "eMarketer - native advertising & ad-block data", href: "https://www.emarketer.com/content/faq-on-native-advertising--formats--ai-opportunities--best-metrics-2026" },
  { label: "Amazon Ads - Earn credibility with the Twitch community", href: "https://advertising.amazon.com/library/news/earn-credibility-with-the-twitch-community" },
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

const AdBlockerCrisis: React.FC = () => {
  return (
    <div className="pb-4">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden rounded-3xl bg-[hsl(240_11%_5%)] px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
        <div className="absolute -top-24 -right-24 w-[32rem] h-[32rem] rounded-full bg-primary/20 blur-[120px] pointer-events-none" aria-hidden />
        <div className="relative max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 mb-7 text-xs font-semibold tracking-widest uppercase">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80">
              <img src="/lovable-uploads/platform-twitch.png" alt="Twitch" className="h-3.5 w-auto" />
              Industry
            </span>
            <span className="text-white/40">Updated 2026 · 6 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-6">
            The ad-block wall, and the one format that{" "}
            <span style={serif} className="italic font-normal">gets through</span>
          </h1>
          <p className="text-lg text-white/65 leading-relaxed max-w-xl">
            More than a billion people run ad-blockers, and streaming's young, technical audience
            blocks at the highest rates of all. That breaks the buy-impressions-and-hope playbook.
            Here is what the data actually says, and why native overlay is the one livestream
            format an ad-blocker cannot touch.
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

      {/* ── The scale (data-viz) ── */}
      <section className="mt-20 lg:mt-28 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">The scale of it</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-5">
            Ad-block is heaviest exactly where streaming skews youngest
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-md mb-4">
            The audience brands most want to reach - young, engaged, digitally native - is the
            audience most likely to install a blocker. They chose to open the stream; they resent
            formats that seize attention rather than earn it, and they have the technical fluency
            to shut them off.
          </p>
          <p className="text-xs text-muted-foreground/70 leading-relaxed max-w-md">
            Share of internet users running ad-blockers, by segment. Sources named per row.
          </p>
        </Reveal>
        <Reveal>
          <div className="rounded-2xl border border-border bg-card p-8 space-y-7">
            {rates.map((d) => (
              <div key={d.seg}>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground">{d.seg}</span>
                  <span className="text-xl font-bold text-foreground tabular-nums">{d.display}</span>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full ${d.highlight ? "bg-primary" : "bg-primary/60"}`} style={{ width: `${d.pct}%` }} />
                </div>
                <p className="text-[11px] text-muted-foreground/70 mt-1.5">{d.note}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Why traditional fails ── */}
      <section className="mt-20 lg:mt-28 grid lg:grid-cols-2 gap-14 items-start">
        <Reveal>
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Why the old playbook breaks</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-5">
            You pay for impressions that never render
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-md">
            Programmatic pre-roll and display are exactly what blockers are built to intercept. A
            large share of every euro aimed at young streaming viewers is delivered to software that
            strips the creative before it shows. The CPM on the dashboard looks fine; the ad never
            rendered.
          </p>
        </Reveal>
        <Reveal>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="text-3xl font-bold text-foreground tracking-tight">~0.46%</div>
              <div className="text-xs text-muted-foreground mt-1">Average display CTR - and that is before a blocker strips it (WordStream / GDN)</div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="text-3xl font-bold text-foreground tracking-tight">Skipped</div>
              <div className="text-xs text-muted-foreground mt-1">Pre-roll before a stream is the first thing an intentional viewer clicks past or blocks</div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Native overlay is unblockable (dark + video) ── */}
      <section className="mt-20 lg:mt-28 rounded-3xl bg-[hsl(240_11%_5%)] px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">The format that gets through</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-5">
              Nothing for a blocker to strip
            </h2>
            <p className="text-base text-white/60 leading-relaxed max-w-md mb-4">
              A native overlay is rendered inside the broadcast feed, not fetched as a separate ad
              request. There is no ad-server call to intercept and no recognisable ad pattern - it is
              part of the stream the viewer chose to watch. That is why its ad-block reach is a
              structural 0%, a property of the format, not an advertising claim.
            </p>
            <p className="text-sm text-white/45 leading-relaxed max-w-md">
              It also sidesteps banner blindness: the streamer frames it in their own words, so it
              reads as content, not an interruption.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden bg-black ring-1 ring-white/10">
            <video
              src="/lovable-uploads/overlay-glorious.webm"
              autoPlay loop muted playsInline preload="none"
              className="w-full h-auto"
              aria-label="A native overlay ad rendered live inside a Nordic Twitch stream"
            />
          </div>
        </div>
      </section>

      {/* ── The trust transfer ── */}
      <section className="mt-20 lg:mt-28">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Why it also converts</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
            The streamer's trust transfers to the brand
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mt-4">
            Getting through is only half of it. Native overlay works because the endorsement rides on
            a relationship the viewer already has with the creator - something programmatic display
            can never offer.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {trust.map((t) => (
            <Reveal key={t.pct}>
              <div className="rounded-2xl border border-border bg-card p-7 h-full">
                <div className="text-4xl font-bold text-primary tracking-tight mb-3">{t.pct}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="text-xs text-muted-foreground/70 mt-5 max-w-2xl">
          Twitch Research Power Group, "ROI of Live Communities", July 2025 (n=9,960 adults 18-44
          across 10 markets), via Amazon Ads.
        </p>
      </section>

      {/* ── Verified Nordic results ── */}
      <section className="mt-20 lg:mt-28">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Verified, not aspirational</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
            What that gets through actually delivers
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mt-4">
            Verified CTR from published Beta Ads case studies - roughly
            <strong className="text-foreground"> 0.5 to 1.3%</strong> across B2C categories, with
            peak-day CTR of <strong className="text-foreground">4 to 9%</strong> when the creative
            lands on a streamer mention. Every one of these ran unblockable, inside the stream.
          </p>
        </div>
        <div className="rounded-2xl border border-border overflow-hidden">
          {campaigns.map((c, i) => (
            <Link key={c.brand} to={c.href} className={`group grid grid-cols-[1fr_auto] sm:grid-cols-[minmax(0,14rem)_1fr_auto] items-center gap-4 sm:gap-8 px-6 py-5 hover:bg-muted/40 transition-colors ${i > 0 ? "border-t border-border" : ""}`}>
              <div className="flex items-center gap-4 min-w-0">
                <img src={c.logo} alt={c.brand} className="h-5 w-16 object-contain shrink-0 opacity-80 [filter:brightness(0)] dark:[filter:brightness(0)_invert(1)]" />
                <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">{c.brand}</div>
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
      </section>

      {/* ── Where money is going ── */}
      <section className="mt-20 lg:mt-28 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">The budget is already moving</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-5">
            Native is where spend is heading
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-md">
            As programmatic display loses reach to blockers, budget follows the formats that survive.
            US native display ad spend is forecast to grow 13.1% in 2026 to about $148 billion - the
            market catching up to what a blocked audience has been signalling for years.
          </p>
        </Reveal>
        <Reveal>
          <div className="rounded-2xl border border-border bg-card p-8 flex items-center gap-8">
            <div>
              <div className="text-5xl font-bold text-primary tracking-tight">+13.1%</div>
              <div className="text-sm text-muted-foreground mt-2">US native display ad spend growth, 2026 - to roughly $148B. Source: eMarketer.</div>
            </div>
          </div>
        </Reveal>
      </section>

      <ClientLogoStrip />

      {/* ── CTA ── */}
      <section className="mt-20 lg:mt-28">
        <div className="rounded-3xl bg-foreground text-background p-10 md:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-lg">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-3">Reach the audience that blocks everything else</h2>
            <p className="text-background/60 text-sm leading-relaxed">
              We run native overlay campaigns across 39,000+ Nordic streamers - unblockable by design,
              with verified reporting. See how the format works and what a campaign costs.
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
          <Link to="/twitch-advertising" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
            <ArrowRight className="w-3.5 h-3.5" /> The Twitch advertising overview
          </Link>
          <Link to="/case-studies" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
            <ArrowRight className="w-3.5 h-3.5" /> Nordic case studies
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

export default AdBlockerCrisis;
