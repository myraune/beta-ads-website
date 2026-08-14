import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedShaderBackground from "@/components/ui/lazy-animated-background";
import { CHAT_MENTIONS, type ChatTone } from "@/data/chatMentions";

/**
 * /livestream-chat-engagement
 *
 * The differentiator page: what a live chat actually does when a sponsor shows
 * up. Built on 103 verbatim viewer messages from a real Finnish campaign, in
 * Finnish with English translations, anonymised.
 *
 * Deliberate constraints, do not undo without checking:
 * - No CPM, spend, budget, sales, conversions or CTR anywhere on this page. The
 *   negotiated rate is confidential and conversion figures are out of scope.
 * - No creator names. The campaign ran across named public channels, but tying
 *   creators to a campaign readout is off limits, so only counts are shown.
 * - Chatters are anonymised upstream in the data file (first two characters
 *   plus two asterisks). Full handles never reach this repo.
 * - The client is unbranded by default. Flip CLIENT to a name and logo path
 *   once written permission exists; everything below reads from it.
 * - Data is a local constant, never a runtime fetch, because the build
 *   prerenders every route and a fetch would ship an empty page to crawlers.
 */

/** Set to an object once the client approves attribution. Unbranded until then. */
const CLIENT: { name: string; logo: string } | null = null;

const serif = { fontFamily: "'Instrument Serif', serif" };

/**
 * Campaign figures. These come from the platform readout, not from counting the
 * anonymised array: anonymising to two characters collides (75 real chatters
 * compress to 61 visible prefixes), so a computed count would understate it.
 */
const CAMPAIGN = {
  messages: 103,
  chatters: 75,
  platformMentions: 528,
  platformChatters: 97,
  streamers: 12,
  streams: 68,
  categories: 30,
  watchHours: "349.46",
  liveViews: 43390,
  vodViews: 384130,
  clipViews: 9768,
};

const heroStats = [
  { value: "103", label: "Verbatim viewer messages" },
  { value: "75", label: "Distinct people typing" },
  { value: "9.1x", label: "Replay reach over live" },
  { value: "0", label: "Banner ads that do this" },
];

const TONE_LABEL: Record<ChatTone, string> = {
  positive: "Positive",
  question: "Questions",
  neutral: "Neutral",
  negative: "Pushback",
};

const TONE_NOTE: Record<ChatTone, string> = {
  positive: "Reads as interest or approval",
  question: "Someone asking to be sold to",
  neutral: "Noticed it, commented on it",
  negative: "Scepticism and complaints, kept in",
};

const FILTERS: Array<{ key: ChatTone | "all"; label: string }> = [
  { key: "all", label: "All" },
  { key: "positive", label: "Positive" },
  { key: "question", label: "Questions" },
  { key: "neutral", label: "Neutral" },
  { key: "negative", label: "Pushback" },
];

// Replay reach. Arithmetic is checkable: VOD plus clips over live views.
const replay = [
  { label: "Live ad views", value: CAMPAIGN.liveViews, display: "43,390", accent: false },
  { label: "VOD views", value: CAMPAIGN.vodViews, display: "384,130", accent: true },
  { label: "Clip views", value: CAMPAIGN.clipViews, display: "9,768", accent: false },
];
const replayMax = Math.max(...replay.map((r) => r.value));

const LivestreamChatEngagement: React.FC = () => {
  const [filter, setFilter] = useState<ChatTone | "all">("all");

  const toneCounts = useMemo(() => {
    return CHAT_MENTIONS.reduce<Record<string, number>>((acc, m) => {
      acc[m.t] = (acc[m.t] || 0) + 1;
      return acc;
    }, {});
  }, []);

  const toneRows = useMemo(() => {
    const order: ChatTone[] = ["positive", "neutral", "question", "negative"];
    const max = Math.max(...order.map((t) => toneCounts[t] || 0));
    return order.map((t) => ({
      tone: t,
      count: toneCounts[t] || 0,
      pct: Math.round(((toneCounts[t] || 0) / CHAT_MENTIONS.length) * 100),
      width: Math.round(((toneCounts[t] || 0) / max) * 100),
    }));
  }, [toneCounts]);

  // Default filter is "all", so the prerendered HTML carries every message.
  const visible = useMemo(
    () => (filter === "all" ? CHAT_MENTIONS : CHAT_MENTIONS.filter((m) => m.t === filter)),
    [filter]
  );

  const argRef = useScrollAnimation();
  const wallRef = useScrollAnimation();
  const toneRef = useScrollAnimation();
  const replayRef = useScrollAnimation();
  const scopeRef = useScrollAnimation();

  return (
    <MarketingPageLayout
      seo={{
        title: "What Livestream Chat Does When a Sponsor Appears | Beta Ads",
        description:
          "103 verbatim viewer messages from a real Finnish Twitch campaign, in Finnish with English translations. Real questions, real scepticism, real conversation. Proof that native livestream advertising starts conversations a banner cannot.",
        canonical: "/livestream-chat-engagement",
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "What Livestream Chat Actually Does When a Sponsor Appears",
            author: { "@type": "Organization", name: "Beta Ads" },
            publisher: {
              "@type": "Organization",
              name: "Beta Ads",
              logo: { "@type": "ImageObject", url: "https://beta-ads.no/lovable-uploads/logo-color.png" },
            },
            datePublished: "2026-08-14",
          },
        ],
      }}
      cta={{
        heading: "Get this reaction for your brand",
        subtext:
          "Tell us your market and product. We will tell you honestly whether a native livestream campaign fits, and what the conversation would look like.",
        primaryLabel: "Book a demo",
        primaryHref: "/contact",
        secondaryLabel: "See what it costs",
        secondaryHref: "/twitch-advertising-cost",
      }}
    >
      {/* ── Hero ──
          Explicit dark background, not just the shader. The shader canvas is
          alpha-transparent, so in the light theme the page background shows
          through and the white hero type becomes white on white. Painting the
          section dark makes the hero readable in both themes and the shader
          then sits on top as texture rather than as the only backdrop. */}
      <section className="relative overflow-hidden bg-[hsl(240_11%_5%)]">
        <AnimatedShaderBackground heightFactor={0.85} />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent z-[1] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/80 backdrop-blur-sm mb-7">
              Real campaign chat, August 2026
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.04] mb-6 tracking-tight">
              A banner has never been{" "}
              <span style={serif} className="italic font-normal text-primary">
                argued with
              </span>
              .
            </h1>
            <p className="text-lg text-white/65 leading-relaxed mb-10 max-w-xl">
              When a sponsor appears inside a live stream, the audience talks back. Here are 103
              verbatim messages from one Finnish campaign: people asking the price, recommending it
              to each other, and openly doubting it. Every one of them typed by a real viewer, in
              public, unprompted.
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-16 border border-white/10 rounded-2xl overflow-hidden bg-white/10">
            {heroStats.map((s) => (
              <div key={s.label} className="bg-black/30 backdrop-blur-sm px-6 py-6">
                <div className="text-3xl font-bold text-white tracking-tight">{s.value}</div>
                <div className="text-xs text-white/50 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The argument ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div
          ref={argRef.ref}
          className={`max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-start transition-all duration-700 ${
            argRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              The measurable difference
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-5">
              Display advertising gets ignored. This gets answered.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
              A display impression is a one way event. It renders, and at best nobody minds it. There
              is no version of a banner where a stranger asks what it costs, another stranger answers
              with the price they pay, and a third calls the whole category a scam.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              That is what happened here, repeatedly, across twelve channels and thirteen days. The
              conversation below is not a testimonial reel. It is the unedited reaction of a live
              audience to a brand entering their room.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="text-sm font-semibold text-foreground mb-5">
              What the chat log contains
            </div>
            <dl className="space-y-4">
              {[
                ["103", "verbatim viewer messages, deduplicated"],
                ["75", "distinct people typing them"],
                ["19", "unprompted questions about the product"],
                ["13", "messages of open scepticism, left in"],
              ].map(([v, l]) => (
                <div key={l} className="flex items-baseline gap-4">
                  <dt className="text-2xl font-bold text-primary tabular-nums w-14 shrink-0">{v}</dt>
                  <dd className="text-sm text-muted-foreground leading-snug">{l}</dd>
                </div>
              ))}
            </dl>
            <p className="text-xs text-muted-foreground/70 mt-6 pt-5 border-t border-border leading-relaxed">
              The campaign platform counted {CAMPAIGN.platformMentions.toLocaleString("en-US")} brand
              mentions from {CAMPAIGN.platformChatters} chatters, but it lists a message once per
              matching keyword. Deduplicated, the real figure is {CAMPAIGN.messages} messages from{" "}
              {CAMPAIGN.chatters} people. We publish the smaller, honest number.
            </p>
          </div>
        </div>
      </section>

      {/* ── The chat wall ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div
          ref={wallRef.ref}
          className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${
            wallRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              The chat, unedited
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
              Every message, in Finnish and English
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Typos, slang and all. Handles are shortened to two characters. Translations keep the
              register rather than smoothing it into business English, because the register is the
              evidence. Two messages contain strong language and are left exactly as typed.
            </p>
          </div>

          {/* Tone filter. Text-first buttons, no icons. */}
          <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter chat by tone">
            {FILTERS.map((f) => {
              const active = filter === f.key;
              const count =
                f.key === "all" ? CHAT_MENTIONS.length : toneCounts[f.key] || 0;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  aria-pressed={active}
                  className={`rounded-full px-5 h-11 text-sm font-medium transition-colors border ${
                    active
                      ? "bg-primary text-white border-primary"
                      : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-primary/30"
                  }`}
                >
                  {f.label} <span className="tabular-nums opacity-70">{count}</span>
                </button>
              );
            })}
          </div>

          <p className="text-sm text-muted-foreground mb-6" aria-live="polite">
            Showing {visible.length} of {CHAT_MENTIONS.length} messages
            {filter !== "all" ? ` in ${TONE_LABEL[filter as ChatTone].toLowerCase()}` : ""}.
          </p>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {visible.map((m, i) => (
              <figure
                key={`${m.c}-${m.d}-${i}`}
                className="rounded-2xl border border-border bg-card p-6 flex flex-col"
              >
                <div className="flex items-baseline justify-between gap-3 mb-4">
                  <span className="text-xs font-semibold text-foreground tabular-nums">{m.c}</span>
                  <span className="text-[11px] text-muted-foreground/60 tabular-nums">
                    {m.d} · {TONE_LABEL[m.t].toLowerCase()}
                  </span>
                </div>
                <blockquote className="text-base text-foreground leading-relaxed mb-3" lang="fi">
                  {m.fi}
                </blockquote>
                <p className="text-sm text-muted-foreground leading-relaxed mt-auto" lang="en">
                  {m.en}
                </p>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tone split ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div
          ref={toneRef.ref}
          className={`max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-16 items-center transition-all duration-700 ${
            toneRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-md">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              What the room actually felt
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-5">
              Two in five positive, one in eight hostile
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
              The pushback stays in. Thirteen messages argue that VPN companies sell your data, that
              the product is unnecessary, or that the sponsorship itself is tiresome. A brand that
              only ever sees approval is being marketed to, not measured.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              The nineteen questions are the commercially interesting group. Those are people asking
              to be sold to, in public, with the streamer able to answer.
            </p>
          </div>
          <div className="space-y-6">
            {toneRows.map((r) => (
              <div key={r.tone}>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-base font-medium text-foreground">{TONE_LABEL[r.tone]}</span>
                  <span className="text-sm font-semibold text-foreground tabular-nums">
                    {r.count} <span className="text-muted-foreground/60">· {r.pct}%</span>
                  </span>
                </div>
                <div className="h-4 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${r.width}%` }}
                  />
                </div>
                <p className="text-[11px] text-muted-foreground/60 mt-1.5">{TONE_NOTE[r.tone]}</p>
              </div>
            ))}
            <p className="text-xs text-muted-foreground/60 pt-2">
              Tone assigned per message on the deduplicated set of {CHAT_MENTIONS.length}.
            </p>
          </div>
        </div>
      </section>

      {/* ── Replay reach ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div
          ref={replayRef.ref}
          className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${
            replayRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              The part that keeps working
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
              The stream ends. The ad does not.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mt-4">
              A native overlay is baked into the recording, so it keeps being served every time
              somebody watches the VOD or a clip. On this campaign the replay audience was 9.1 times
              the live one, and it cost nothing extra.
            </p>
          </div>
          <div className="space-y-7 max-w-4xl">
            {replay.map((r) => (
              <div key={r.label}>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-base font-semibold text-foreground">{r.label}</span>
                  <span className="text-sm text-muted-foreground tabular-nums">{r.display} views</span>
                </div>
                <div className="h-4 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${r.accent ? "bg-primary" : "bg-foreground/25"}`}
                    style={{ width: `${Math.round((r.value / replayMax) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
            <p className="text-xs text-muted-foreground/60 pt-2">
              VOD plus clip views divided by live views gives 9.1 times the live reach, from the same
              creative, with no additional placement.
            </p>
          </div>
        </div>
      </section>

      {/* ── Campaign scope ── */}
      <section className="py-24 md:py-32 border-t border-border bg-foreground text-background">
        <div
          ref={scopeRef.ref}
          className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${
            scopeRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              The campaign behind the chat
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-5">
              Thirteen days, twelve channels, one continuous conversation
            </h2>
            <p className="text-base md:text-lg text-background/60 leading-relaxed">
              {CLIENT
                ? `Run for ${CLIENT.name} across Finnish Twitch in August 2026.`
                : "Run for a consumer software brand across Finnish Twitch in August 2026. Client named on request."}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-background/15 rounded-2xl overflow-hidden bg-background/15">
            {[
              { v: String(CAMPAIGN.streamers), l: "Streamers" },
              { v: String(CAMPAIGN.streams), l: "Sponsored streams" },
              { v: String(CAMPAIGN.categories), l: "Game categories" },
              { v: `${CAMPAIGN.watchHours}h`, l: "Watch time" },
            ].map((s) => (
              <div key={s.l} className="bg-foreground px-6 py-7">
                <div className="text-3xl font-bold tracking-tight">{s.v}</div>
                <div className="text-xs text-background/50 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-background/40 mt-6 max-w-3xl leading-relaxed">
            Creator names are withheld deliberately. Chat handles are shortened to two characters.
            No pricing, spend or conversion data appears on this page.
          </p>
        </div>
      </section>

      {/* ── What it means ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              Why this matters to a media buyer
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
              Attention you can read back
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                t: "It proves the ad was seen",
                b: "Not modelled, not sampled, not a viewability score. Seventy five people typed about the brand while the ad was on screen. That is the strongest attention signal a campaign can produce.",
              },
              {
                t: "It surfaces the objections",
                b: "The scepticism in this log is free research. It tells you exactly what the market pushes back on, in the words the market uses, before you spend the next budget answering it.",
              },
              {
                t: "It compounds after the stream",
                b: "Overlays are part of the recording, so the VOD and clip audience keeps seeing the same placement. Here that replay audience was 9.1 times the live one.",
              },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-border bg-card p-8">
                <h3 className="text-base font-semibold text-foreground mb-3">{c.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.b}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-10 text-sm">
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
            <Link
              to="/twitch-advertising-cost"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5" /> What a campaign costs
            </Link>
          </div>
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default LivestreamChatEngagement;
