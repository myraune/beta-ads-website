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
  negative: "Pushback",
};

const FILTERS: Array<{ key: ChatTone | "all"; label: string }> = [
  { key: "all", label: "All" },
  { key: "positive", label: "Positive" },
  { key: "question", label: "Questions" },
  { key: "neutral", label: "Neutral" },
  { key: "negative", label: "Pushback" },
];

const heroStats = [
  { value: "3", label: "Nordic languages, translated live" },
  { value: "12", label: "Channels watched at once" },
  { value: "0", label: "Screenshots to collect by hand" },
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

  const capRef = useScrollAnimation();
  const howRef = useScrollAnimation();

  return (
    <MarketingPageLayout
      seo={{
        title: "Livestream Chat Monitoring for Brand Campaigns | Beta Ads",
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
      <section className="relative overflow-hidden bg-[hsl(240_11%_5%)]">
        <div
          className="absolute -top-32 -right-24 w-[38rem] h-[38rem] rounded-full bg-primary/20 blur-[130px] pointer-events-none"
          aria-hidden
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/80 mb-7">
              Chat monitoring
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.04] mb-6 tracking-tight">
              A banner has never been{" "}
              <span style={serif} className="italic font-normal text-primary">
                argued with
              </span>
              .
            </h1>
            <p className="text-lg text-white/65 leading-relaxed mb-10 max-w-xl">
              When a sponsor appears inside a live stream, the audience talks back. Our chat
              monitoring reads every channel on the campaign at once, keeps the messages that
              mention you, translates them, and tells you what the room actually felt.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12">
                  Book a demo <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/twitch-advertising-cost">
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-white hover:bg-white/10 rounded-full px-8 h-12 border border-white/20"
                >
                  What it costs
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-px mt-16 border border-white/10 rounded-2xl overflow-hidden bg-white/10 max-w-2xl">
            {heroStats.map((s) => (
              <div key={s.label} className="bg-black/30 px-5 py-6">
                <div className="text-3xl font-bold text-white tracking-tight">{s.value}</div>
                <div className="text-xs text-white/50 mt-1 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The dashboard preview. Coded HTML, not an image. ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              The dashboard
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
              Every mention, as it happens
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              One feed for the whole campaign. Filter by how the message reads, switch between the
              original language and the translation, and export the lot when the campaign ends.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 px-6 py-4 border-b border-border bg-muted/40">
              {[
                ["Keywords tracked", String(SAMPLE_SUMMARY.tracked)],
                ["Mentions", String(SAMPLE_SUMMARY.mentions)],
                ["Chatters", String(SAMPLE_SUMMARY.chatters)],
                ["Channels", String(SAMPLE_SUMMARY.channels)],
                ["Markets", String(SAMPLE_SUMMARY.markets)],
              ].map(([l, v]) => (
                <div key={l}>
                  <div className="text-lg font-bold text-foreground tabular-nums leading-none">{v}</div>
                  <div className="text-[11px] text-muted-foreground mt-1">{l}</div>
                </div>
              ))}
              <span className="ml-auto text-[11px] font-semibold tracking-widest uppercase text-muted-foreground/70">
                Sample data
              </span>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 px-6 py-4 border-b border-border" role="group" aria-label="Filter by tone">
              {FILTERS.map((f) => {
                const active = filter === f.key;
                const count = f.key === "all" ? CHAT_MENTIONS.length : toneCounts[f.key] || 0;
                return (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setFilter(f.key)}
                    aria-pressed={active}
                    className={`rounded-full px-4 h-9 text-sm font-medium transition-colors border ${
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

            {/* Feed */}
            <ul className="divide-y divide-border">
              {visible.map((m, i) => (
                <li key={`${m.c}-${i}`} className="px-6 py-4 grid sm:grid-cols-[5.5rem_1fr_7rem] gap-x-5 gap-y-1 items-baseline">
                  <div className="text-xs text-muted-foreground tabular-nums">
                    {m.t} <span className="text-muted-foreground/50">{m.market}</span>
                  </div>
                  <div>
                    <div className="text-sm text-foreground">
                      <span className="font-semibold mr-2">{m.c}</span>
                      {m.orig}
                    </div>
                    <div className="text-sm text-muted-foreground mt-0.5">{m.en}</div>
                  </div>
                  <div className="text-xs text-muted-foreground sm:text-right">{TONE_LABEL[m.tone]}</div>
                </li>
              ))}
            </ul>
            <div className="px-6 py-3 border-t border-border text-xs text-muted-foreground/70">
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
      <section className="py-20 md:py-28 border-t border-border">
        <div
          ref={capRef.ref}
          className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${
            capRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              What the tool does
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
              Built so the number you report is the number that happened
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {capabilities.map((c) => (
              <div key={c.t} className="rounded-2xl border border-border bg-card p-8">
                <h3 className="text-base font-semibold text-foreground mb-3">{c.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why it matters ── */}
      <section className="py-20 md:py-28 border-t border-border">
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
