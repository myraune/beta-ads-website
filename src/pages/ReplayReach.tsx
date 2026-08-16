import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CHANNEL_REACH } from "@/data/campaignSample";

/**
 * /replay-reach
 *
 * Product page for the replay side of campaign reporting: a native overlay is
 * baked into the recording, so it keeps being served every time somebody opens
 * the recording or a clip.
 *
 * DELIBERATELY NO PRICING. The internal version of this view derives an
 * effective CPM from contracted spend, and that rate is confidential. The
 * argument here is made entirely with a reach multiplier, which is the part
 * that is interesting to a buyer anyway: the same creative kept working after
 * the stream ended. Do not reintroduce spend, rate, CPM or currency.
 *
 * Sample data only, invented, labelled on screen. Channels anonymised.
 */

const serif = { fontFamily: "'Instrument Serif', serif" };
const MARKET_LABEL: Record<string, string> = { FI: "Finland", NO: "Norway", SE: "Sweden" };
const fmt = (n: number) => n.toLocaleString("en-US");

const capabilities = [
  {
    t: "The overlay is part of the recording",
    b: "It is rendered into the broadcast, not served next to it, so it survives into the recording and into every clip somebody cuts. There is no second placement to buy and no second creative to produce.",
  },
  {
    t: "Clips are the unambiguous part",
    b: "A clip view is a person choosing to watch a short, specific moment. Counted apart from the stream total, because the two are not the same quality of exposure and should not be blended into one number.",
  },
  {
    t: "Counted per channel, not estimated",
    b: "Every figure is read back per channel from the platform rather than modelled from an average, so the total is the sum of real rows you can inspect.",
  },
  {
    t: "Reported without double counting",
    b: "The platform's stream total already includes everyone who watched live, so we never add the two together to manufacture a bigger number. You get the total, the live subset inside it, and clips counted apart.",
  },
];

const ReplayReach: React.FC = () => {
  /**
   * The platform's stream view count is EVERY view the stream generated: people
   * who joined while it was live and everyone who opened the recording after.
   * Live is a subset of it, so the two must never be summed. The honest figures
   * are total, the live subset, and what the recording added on top.
   */
  const totals = useMemo(() => {
    const live = CHANNEL_REACH.reduce((s, c) => s + c.live, 0);
    const total = CHANNEL_REACH.reduce((s, c) => s + c.total, 0);
    const clip = CHANNEL_REACH.reduce((s, c) => s + c.clip, 0);
    return { live, total, clip, afterLive: total - live, mult: total / live };
  }, []);

  const bars = useMemo(() => {
    const rows = [
      {
        label: "Total views on the stream",
        value: totals.total,
        note: "everyone who watched, live and afterwards",
        accent: true,
      },
      {
        label: "Of which watched live",
        value: totals.live,
        note: "present while the broadcast was running",
        accent: false,
      },
      {
        label: "Clip views",
        value: totals.clip,
        note: "counted separately, someone opening a single moment",
        accent: false,
      },
    ];
    const max = Math.max(...rows.map((r) => r.value));
    return rows.map((r) => ({ ...r, width: Math.round((r.value / max) * 100) }));
  }, [totals]);

  const sortedChannels = useMemo(
    () => [...CHANNEL_REACH].sort((a, b) => b.total - a.total),
    []
  );
  const channelMax = Math.max(...sortedChannels.map((c) => c.total));

  const heroStats = [
    { value: `${totals.mult.toFixed(1)}x`, label: "Total views over live" },
    { value: fmt(totals.afterLive), label: "Added after the stream" },
    { value: "0", label: "Extra placements bought" },
  ];

  const capRef = useScrollAnimation();
  const chanRef = useScrollAnimation();

  return (
    <MarketingPageLayout
      darkPage
      seo={{
        title: "Replay Reach: What a Livestream Ad Does After the Stream | Beta Ads",
        description:
          "A native overlay is baked into the recording, so the stream keeps collecting views long after it ends. See total stream views, the live audience inside them, and clips, counted per channel without double counting.",
        canonical: "/replay-reach",
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Beta Ads replay reach reporting",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            publisher: { "@type": "Organization", name: "Beta Ads" },
          },
        ],
      }}
      cta={{
        heading: "See the reach your campaign keeps earning",
        subtext:
          "Book a walkthrough and we will show you the live reporting view, with the live audience and clips separated from the stream total.",
        primaryLabel: "Book a demo",
        primaryHref: "/contact",
        secondaryLabel: "See what it costs",
        secondaryHref: "/twitch-advertising-cost",
      }}
    >
      {/* ── Hero ── */}
      <section className="relative bg-[hsl(240_11%_5%)]">
        <div
          className="absolute -top-32 -right-24 w-[38rem] h-[38rem] rounded-full bg-primary/20 blur-[130px] pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute -bottom-64 -left-32 w-[46rem] h-[46rem] rounded-full bg-primary/10 blur-[150px] pointer-events-none"
          aria-hidden
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-7">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-end">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.06] mb-3 tracking-tight">
                The stream ends. The ad{" "}
                <span style={serif} className="italic font-normal text-primary">
                  does not
                </span>
                .
              </h1>
              <p className="text-base text-white/65 leading-relaxed max-w-lg">
                A native overlay is rendered into the broadcast, so it stays in the recording. The
                stream keeps collecting views long after it ends, and every one of them serves the
                same placement, with nothing extra bought and no second creative made.
              </p>
            </div>
            <div className="lg:text-right">
              <div className="grid grid-cols-3 gap-x-5 gap-y-2 mb-5">
                {heroStats.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-bold text-white tracking-tight leading-none">
                      {s.value}
                    </div>
                    <div className="text-[11px] text-white/50 mt-1.5 leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 lg:justify-end">
                <Link to="/contact">
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 h-10">
                    Book a demo <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/campaign-compliance">
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/10 rounded-full px-6 h-10 border border-white/20"
                  >
                    Setup verification
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Where the exposure comes from ── */}
      <section className="pt-6 pb-14 md:pt-7 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="flex flex-wrap items-center gap-x-7 gap-y-2 px-5 py-3 border-b border-border bg-muted/40">
              <h2 className="text-sm font-semibold text-foreground mr-1">Where the views came from</h2>
              {[
                [fmt(totals.total), "total views"],
                [fmt(totals.live), "watched live"],
                [fmt(totals.clip), "clips"],
                [`${totals.mult.toFixed(1)}x`, "total over live"],
              ].map(([v, l]) => (
                <div key={l} className="flex items-baseline gap-1.5">
                  <span className="text-sm font-bold text-foreground tabular-nums">{v}</span>
                  <span className="text-[11px] text-muted-foreground">{l}</span>
                </div>
              ))}
              <span className="ml-auto text-[10px] font-semibold tracking-widest uppercase text-muted-foreground/60">
                Sample data
              </span>
            </div>

            <div className="px-5 py-5 space-y-5">
              {bars.map((b) => (
                <div key={b.label}>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-sm font-medium text-foreground">{b.label}</span>
                    <span className="text-sm text-muted-foreground tabular-nums">{fmt(b.value)}</span>
                  </div>
                  <div className="h-3 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full ${b.accent ? "bg-primary" : "bg-foreground/25"}`}
                      style={{ width: `${b.width}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground/60 mt-1">{b.note}</p>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-border text-xs text-muted-foreground/70">
              Read these as a range, not a headline. The stream total counts every view including
              the live audience, so live is a subset of it and the two are never added together. A
              recorded view is also a weaker signal than a live one.
            </div>
          </div>
        </div>
      </section>

      {/* ── Per channel ── */}
      <section className="py-14 md:py-16 border-t border-border">
        <div
          ref={chanRef.ref}
          className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${
            chanRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              Per channel
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
              Every row is read back, not modelled
            </h2>
          </div>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="hidden md:grid grid-cols-[8rem_1fr_6rem_6rem_6rem] gap-x-4 px-5 py-2 border-b border-border text-[11px] font-semibold tracking-wide uppercase text-muted-foreground/70">
              <span>Channel</span>
              <span>Share of total views</span>
              <span className="text-right">Total</span>
              <span className="text-right">Live</span>
              <span className="text-right">Clips</span>
            </div>
            <ul className="divide-y divide-border">
              {sortedChannels.map((c) => {
                // c.total already includes the live audience, so it is used as
                // the row total rather than summed with c.live.
                const total = c.total;
                return (
                  <li
                    key={c.ch}
                    className="grid md:grid-cols-[8rem_1fr_6rem_6rem_6rem] gap-x-4 gap-y-1 px-5 py-2.5 items-center hover:bg-muted/40 transition-colors"
                  >
                    <span className="text-sm font-semibold text-foreground">
                      {c.ch}{" "}
                      <span className="font-normal text-[11px] text-muted-foreground/60">
                        {MARKET_LABEL[c.market]}
                      </span>
                    </span>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary/70"
                        style={{ width: `${Math.round((total / channelMax) * 100)}%` }}
                      />
                    </div>
                    <span className="text-xs text-foreground tabular-nums md:text-right">
                      {fmt(c.total)}
                    </span>
                    <span className="text-xs text-muted-foreground tabular-nums md:text-right">
                      {fmt(c.live)}
                    </span>
                    <span className="text-xs text-muted-foreground tabular-nums md:text-right">
                      {fmt(c.clip)}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="px-5 py-3 border-t border-border flex flex-wrap items-baseline gap-x-6 text-xs">
              <span className="font-semibold text-foreground">Total</span>
              <span className="text-foreground tabular-nums">{fmt(totals.total)} total views</span>
              <span className="text-muted-foreground tabular-nums">{fmt(totals.live)} of them live</span>
              <span className="text-muted-foreground tabular-nums">{fmt(totals.clip)} clips</span>
              <span className="ml-auto text-muted-foreground/60">
                Channels anonymised, figures illustrative
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it is counted ── */}
      <section className="py-14 md:py-16 border-t border-border">
        <div
          ref={capRef.ref}
          className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${
            capRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              How it is counted
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
              Honest about what each number is worth
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {capabilities.map((c) => (
              <div key={c.t} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-base font-semibold text-foreground mb-3">{c.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.b}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-sm">
            <Link
              to="/livestream-chat-engagement"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5" /> Chat tracking
            </Link>
            <Link
              to="/campaign-compliance"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5" /> Setup verification
            </Link>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5" /> Campaign case studies
            </Link>
          </div>
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default ReplayReach;
