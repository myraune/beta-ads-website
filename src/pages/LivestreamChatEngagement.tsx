import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CHAT_MENTIONS, SAMPLE_SUMMARY, type ChatTone } from "@/data/chatMentions";

/**
 * /livestream-chat-engagement
 *
 * Product page for the chat-monitoring side of the platform: keyword tracking
 * across live chat, deduplicated, translated, and scored by tone.
 *
 * Rules for this page, do not undo without checking:
 * - Every message and number here is SAMPLE data, invented for illustration,
 *   and the interface says so on screen. No real client, no real campaign, no
 *   real performance figures. Real campaign chat needs written permission.
 * - No CPM, spend, budget, conversions or CTR.
 * - No creator names anywhere.
 * - The dashboard preview is coded HTML, never a screenshot, so it stays sharp
 *   and stays in the prerendered DOM for crawlers.
 * - Kept deliberately light: a short sample list rather than a large dump.
 */

const serif = { fontFamily: "'Instrument Serif', serif" };

const TONE_LABEL: Record<ChatTone, string> = {
  positive: "Positive",
  question: "Question",
  neutral: "Neutral",
  negative: "Critical",
};

const MARKET_LABEL: Record<string, string> = { FI: "Finland", NO: "Norway", SE: "Sweden" };
const LANG: Record<string, string> = { FI: "fi", NO: "no", SE: "sv" };

const FILTERS: Array<{ key: ChatTone | "all"; label: string }> = [
  { key: "all", label: "All" },
  { key: "positive", label: "Positive" },
  { key: "question", label: "Questions" },
  { key: "neutral", label: "Neutral" },
  { key: "negative", label: "Critical" },
];

// Short labels on purpose: these sit in a three-column grid beside the
// headline, and longer strings wrapped to three lines and unbalanced the row.
const heroStats = [
  { value: "3", label: "Languages translated" },
  { value: "12", label: "Channels watched" },
  { value: "0", label: "Manual screenshots" },
];

const capabilities = [
  {
    t: "Keyword tracking across every channel",
    b: "Set the brand name, the product and the discount code. The tool watches every channel on the campaign at the same time and captures each message that matches, with a timestamp.",
  },
  {
    t: "Deduplicated, so counts stay honest",
    b: "A message that matches three keywords is one message, not three. Raw trackers double count and inflate a report. This one collapses duplicates before anything is totalled.",
  },
  {
    t: "Translated, register kept",
    b: "Nordic chat is slang, typos and inside jokes. Each message is stored in the original language with an English translation beside it, so a buyer outside the market can read the room.",
  },
  {
    t: "Bots filtered out",
    b: "Chat bots post the campaign's own ad copy on a timer, and it matches every keyword. That is your message, not a viewer reaction, so it is excluded rather than counted.",
  },
];

const LivestreamChatEngagement: React.FC = () => {
  const [filter, setFilter] = useState<ChatTone | "all">("all");
  const [showOriginal, setShowOriginal] = useState(true);

  const toneCounts = useMemo(
    () =>
      CHAT_MENTIONS.reduce<Record<string, number>>((acc, m) => {
        acc[m.tone] = (acc[m.tone] || 0) + 1;
        return acc;
      }, {}),
    []
  );

  // Default is "all", so the prerendered HTML contains every sample message.
  const visible = useMemo(
    () => (filter === "all" ? CHAT_MENTIONS : CHAT_MENTIONS.filter((m) => m.tone === filter)),
    [filter]
  );

  // Group by day so the feed reads as a timeline rather than one long list.
  const groups = useMemo(() => {
    const map = new Map<string, typeof CHAT_MENTIONS>();
    for (const m of visible) map.set(m.d, [...(map.get(m.d) ?? []), m]);
    return [...map.entries()];
  }, [visible]);

  const capRef = useScrollAnimation();
  const howRef = useScrollAnimation();

  return (
    <MarketingPageLayout
      seo={{
        title: "Chat Tracking for Livestream Campaigns | Beta Ads",
        description:
          "See what live chat says about your brand while the campaign is running. Keyword tracking across every channel, deduplicated counts, Nordic to English translation and tone scoring, in one dashboard.",
        canonical: "/livestream-chat-engagement",
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Beta Ads chat monitoring",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            publisher: { "@type": "Organization", name: "Beta Ads" },
          },
        ],
      }}
      darkPage
      cta={{
        heading: "See what chat says about your brand",
        subtext:
          "Book a walkthrough and we will show you the live dashboard on a real campaign, with your keywords set up.",
        primaryLabel: "Book a demo",
        primaryHref: "/contact",
        secondaryLabel: "See what it costs",
        secondaryHref: "/twitch-advertising-cost",
      }}
    >
      {/* ── Hero. Explicit dark background: the page background is white in the
          light theme, so white type needs its own backdrop, not a transparent
          shader canvas. No shader here at all, which also keeps the page light. */}
      {/* The page itself is dark (darkPage above), so the hero does not clip its
          own glow. Two soft washes bleed past the hero and down behind the
          dashboard, which is what carries the colour through the whole page
          instead of ending in a hard band. */}
      <section className="relative bg-[hsl(240_11%_5%)]">
        <div
          className="absolute -top-32 -right-24 w-[38rem] h-[38rem] rounded-full bg-primary/20 blur-[130px] pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute -bottom-64 -left-32 w-[46rem] h-[46rem] rounded-full bg-primary/10 blur-[150px] pointer-events-none"
          aria-hidden
        />
        {/* Deliberately short. The dashboard is the point of this page, so the
            hero states the claim and gets out of the way rather than taking a
            full screen before anything useful appears. */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-7">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-end">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.06] mb-3 tracking-tight">
                Chat{" "}
                <span style={serif} className="italic font-normal text-primary">
                  tracking
                </span>
              </h1>
              <p className="text-base text-white/65 leading-relaxed max-w-lg">
                See what live chat says about your brand while the campaign is still running. We
                read every channel at once, keep the messages that mention you, translate them, and
                tell you what the room actually felt.
              </p>
            </div>
            {/* Fixed three-column grid, not a wrapping flex row. With flex-wrap
                the third stat dropped to its own line and left an orphan, which
                read as broken. The grid keeps all three on one row and the
                buttons on their own. */}
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
                <Link to="/twitch-advertising-cost">
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/10 rounded-full px-6 h-10 border border-white/20"
                  >
                    What it costs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The dashboard preview. Coded HTML, not an image. ── */}
      <section className="pt-6 pb-14 md:pt-7 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            {/* One header bar: title, live totals and the sample-data marker on
                a single line, so the feed itself starts as high as possible. */}
            <div className="flex flex-wrap items-center gap-x-7 gap-y-2 px-5 py-3 border-b border-border bg-muted/40">
              <h2 className="text-sm font-semibold text-foreground mr-1">Mentions feed</h2>
              {[
                [String(SAMPLE_SUMMARY.mentions), "mentions"],
                [String(SAMPLE_SUMMARY.chatters), "chatters"],
                [String(SAMPLE_SUMMARY.channels), "channels"],
                [String(SAMPLE_SUMMARY.tracked), "keywords"],
                [String(SAMPLE_SUMMARY.markets), "markets"],
              ].map(([v, l]) => (
                <div key={l} className="flex items-baseline gap-1.5">
                  <span className="text-sm font-bold text-foreground tabular-nums">{v}</span>
                  <span className="text-[11px] text-muted-foreground">{l}</span>
                </div>
              ))}
              <div className="ml-auto flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowOriginal((v) => !v)}
                  aria-pressed={showOriginal}
                  className="rounded-full px-3 h-7 text-xs font-medium border border-border bg-background text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                >
                  {showOriginal ? "Original shown" : "English only"}
                </button>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground/60">
                  Sample data
                </span>
              </div>
            </div>

            {/* Filters, compact */}
            <div className="flex flex-wrap gap-1.5 px-5 py-2.5 border-b border-border" role="group" aria-label="Filter by tone">
              {FILTERS.map((f) => {
                const active = filter === f.key;
                const count = f.key === "all" ? CHAT_MENTIONS.length : toneCounts[f.key] || 0;
                return (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setFilter(f.key)}
                    aria-pressed={active}
                    className={`rounded-full px-3 h-7 text-xs font-medium transition-colors border ${
                      active
                        ? "bg-primary text-white border-primary"
                        : "bg-background text-muted-foreground border-border hover:text-foreground hover:border-primary/30"
                    }`}
                  >
                    {f.label} <span className="tabular-nums opacity-70">{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Mention cards, grouped by day, matching the live mentions board:
                translation first, original underneath in italic, and a hairline
                footer carrying the handle and market. */}
            <div className="px-5 pt-3 pb-4 bg-muted/20">
              {groups.map(([day, items]) => (
                <section key={day}>
                  <h3 className="text-[11px] font-semibold tracking-wide uppercase text-muted-foreground/70 mt-3 mb-2.5 first:mt-0">
                    {day}
                  </h3>
                  <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))] items-start">
                    {items.map((m, i) => (
                      <article
                        key={`${m.c}-${i}`}
                        className="rounded-xl bg-card border border-border px-4 pt-3.5 pb-3 shadow-sm"
                      >
                        <p className="text-sm text-foreground leading-relaxed">{m.en}</p>
                        {showOriginal && (
                          <p className="text-[12.5px] italic text-muted-foreground leading-snug mt-2" lang={LANG[m.market]}>
                            {m.orig}
                          </p>
                        )}
                        <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-3 pt-2.5 border-t border-border text-xs">
                          <span className="font-semibold text-foreground">{m.c}</span>
                          <span className="text-muted-foreground/60">in</span>
                          <span className="text-muted-foreground">{MARKET_LABEL[m.market]}</span>
                          <span className="text-muted-foreground/50 tabular-nums">{m.t}</span>
                          <span
                            className={`ml-auto text-[10.5px] rounded-full px-2 py-0.5 border ${
                              m.tone === "negative"
                                ? "border-primary/30 text-primary"
                                : "border-border text-muted-foreground/70"
                            }`}
                          >
                            {TONE_LABEL[m.tone]}
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-border text-xs text-muted-foreground/70">
              Showing {visible.length} of {CHAT_MENTIONS.length} sample messages. A live campaign
              feed keeps filling for as long as the campaign runs.
            </div>
          </div>

          <p className="text-xs text-muted-foreground/70 mt-4 max-w-3xl leading-relaxed">
            Messages and totals above are invented for demonstration. Handles are shortened, and no
            client, creator or campaign is identified anywhere on this page.
          </p>
        </div>
      </section>

      {/* ── What it does ── */}
      <section className="py-14 md:py-16 border-t border-border">
        <div
          ref={capRef.ref}
          className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${
            capRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              What the tool does
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
              Built so the number you report is the number that happened
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
        </div>
      </section>

      {/* ── Why it matters ── */}
      <section className="py-14 md:py-16 border-t border-border">
        <div
          ref={howRef.ref}
          className={`max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-start transition-all duration-700 ${
            howRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              Why it matters
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-5">
              Display advertising gets ignored. This gets answered.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
              A display impression is a one way event. There is no version of a banner where a
              stranger asks what it costs, another answers with the price they pay, and a third
              argues the category is a scam.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              That happens in live chat constantly, and until now it disappeared when the stream
              ended. Monitoring keeps it, so the reaction is something you can read rather than
              something you hope happened.
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                t: "Attention you can read back",
                b: "Not a viewability score. People typing about your brand, unprompted, while the ad is on screen.",
              },
              {
                t: "The objections, in their words",
                b: "Scepticism in the feed is free research. It shows what the market pushes back on before you spend answering it.",
              },
              {
                t: "Honest totals",
                b: "Deduplicated and bot filtered, so the figure in the report is smaller than the raw tracker and actually defensible.",
              },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-base font-semibold text-foreground mb-2">{c.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.b}</p>
              </div>
            ))}
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm">
              <Link
                to="/nordic-livestream-advertising"
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowRight className="w-3.5 h-3.5" /> The Nordic field guide
              </Link>
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowRight className="w-3.5 h-3.5" /> Campaign case studies
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default LivestreamChatEngagement;
