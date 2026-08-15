import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CHANNEL_SETUP, type SetupStatus } from "@/data/campaignSample";

/**
 * /campaign-compliance
 *
 * Product page for the setup-verification side of the platform: did every
 * creator actually put the banner up, get the command in the title, go live,
 * and point at a tracked link.
 *
 * Same rules as the other campaign-tool pages:
 * - Sample data only, invented, labelled on screen.
 * - No pricing of any kind. No CPM, spend or budget.
 * - No creator names. Channels are anonymised to two characters plus **, so a
 *   setup failure is never attributable to a named creator.
 */

const serif = { fontFamily: "'Instrument Serif', serif" };

const MARKET_LABEL: Record<string, string> = { FI: "Finland", NO: "Norway", SE: "Sweden" };

const STATUS_LABEL: Record<SetupStatus, string> = {
  ok: "Yes",
  warn: "Check",
  missing: "No",
};

const heroStats = [
  { value: "12", label: "Channels checked" },
  { value: "4", label: "Needed fixing" },
  { value: "0", label: "Checked by hand" },
];

const capabilities = [
  {
    t: "Reads the channel, not the invoice",
    b: "For every creator on the campaign the tool opens the actual Twitch profile: is the sponsor banner in the About section, is the command in the current stream title, have they gone live at all yet.",
  },
  {
    t: "Catches the silent failures",
    b: "The expensive problems are quiet ones. A banner pointing at a plain landing page instead of the tracked link still looks fine to the eye, and it means none of those clicks are attributed to the campaign.",
  },
  {
    t: "Worst first, not alphabetical",
    b: "The list sorts by how much is wrong, so the channels that need a message today are at the top instead of buried in the middle of a roster.",
  },
  {
    t: "Checked continuously, not once",
    b: "Setup drifts. Titles change between streams and panels get reordered. The check runs against the live profile rather than a screenshot someone took in week one.",
  },
];

const CampaignCompliance: React.FC = () => {
  const [onlyIssues, setOnlyIssues] = useState(false);

  const sorted = useMemo(() => {
    const score = (c: (typeof CHANNEL_SETUP)[number]) =>
      [c.banner, c.command, c.streamed].filter((s) => s === "ok").length +
      (c.link === "Tracked link" ? 1 : 0);
    return [...CHANNEL_SETUP].sort((a, b) => score(a) - score(b));
  }, []);

  const visible = useMemo(
    () => (onlyIssues ? sorted.filter((c) => c.note) : sorted),
    [onlyIssues, sorted]
  );

  const totals = useMemo(() => {
    const ok = (s: SetupStatus) => s === "ok";
    return {
      tracked: CHANNEL_SETUP.length,
      banner: CHANNEL_SETUP.filter((c) => ok(c.banner)).length,
      command: CHANNEL_SETUP.filter((c) => ok(c.command)).length,
      streamed: CHANNEL_SETUP.filter((c) => ok(c.streamed)).length,
      clean: CHANNEL_SETUP.filter((c) => !c.note).length,
    };
  }, []);

  const capRef = useScrollAnimation();

  return (
    <MarketingPageLayout
      darkPage
      seo={{
        title: "Campaign Setup Verification | Beta Ads",
        description:
          "Check that every creator on a livestream campaign actually put the banner up, got the command in the title, went live, and pointed at a tracked link. Continuous verification across every channel, in one view.",
        canonical: "/campaign-compliance",
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Beta Ads campaign setup verification",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            publisher: { "@type": "Organization", name: "Beta Ads" },
          },
        ],
      }}
      cta={{
        heading: "Know the campaign is actually running",
        subtext:
          "Book a walkthrough and we will show you the live verification view on a real campaign roster.",
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
                Setup{" "}
                <span style={serif} className="italic font-normal text-primary">
                  verification
                </span>
              </h1>
              <p className="text-base text-white/65 leading-relaxed max-w-lg">
                A campaign is only live where the creator actually set it up. We check every channel
                continuously, so a missing banner or an untracked link surfaces on day one instead of
                in the end-of-campaign report.
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
                <Link to="/livestream-chat-engagement">
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/10 rounded-full px-6 h-10 border border-white/20"
                  >
                    Chat tracking
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The verification table ── */}
      <section className="pt-6 pb-14 md:pt-7 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="flex flex-wrap items-center gap-x-7 gap-y-2 px-5 py-3 border-b border-border bg-muted/40">
              <h2 className="text-sm font-semibold text-foreground mr-1">Setup check</h2>
              {[
                [`${totals.clean}/${totals.tracked}`, "fully set up"],
                [String(totals.banner), "banner up"],
                [String(totals.command), "command set"],
                [String(totals.streamed), "have streamed"],
              ].map(([v, l]) => (
                <div key={l} className="flex items-baseline gap-1.5">
                  <span className="text-sm font-bold text-foreground tabular-nums">{v}</span>
                  <span className="text-[11px] text-muted-foreground">{l}</span>
                </div>
              ))}
              <div className="ml-auto flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setOnlyIssues((v) => !v)}
                  aria-pressed={onlyIssues}
                  className={`rounded-full px-3 h-7 text-xs font-medium border transition-colors ${
                    onlyIssues
                      ? "bg-primary text-white border-primary"
                      : "bg-background text-muted-foreground border-border hover:text-foreground hover:border-primary/30"
                  }`}
                >
                  Needs attention only
                </button>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground/60">
                  Sample data
                </span>
              </div>
            </div>

            {/* Column headers */}
            <div className="hidden md:grid grid-cols-[7rem_5rem_5rem_5rem_9rem_1fr] gap-x-4 px-5 py-2 border-b border-border text-[11px] font-semibold tracking-wide uppercase text-muted-foreground/70">
              <span>Channel</span>
              <span>Banner</span>
              <span>Command</span>
              <span>Streamed</span>
              <span>Attribution</span>
              <span>Note</span>
            </div>

            <ul className="divide-y divide-border">
              {visible.map((c) => (
                <li
                  key={c.ch}
                  className="grid md:grid-cols-[7rem_5rem_5rem_5rem_9rem_1fr] gap-x-4 gap-y-1 px-5 py-2.5 items-baseline hover:bg-muted/40 transition-colors"
                >
                  <span className="text-sm font-semibold text-foreground">
                    {c.ch}{" "}
                    <span className="font-normal text-[11px] text-muted-foreground/60">
                      {MARKET_LABEL[c.market]}
                    </span>
                  </span>
                  {([c.banner, c.command, c.streamed] as SetupStatus[]).map((s, i) => (
                    <span
                      key={i}
                      className={`text-xs font-medium ${
                        s === "ok" ? "text-muted-foreground" : "text-primary"
                      }`}
                    >
                      {STATUS_LABEL[s]}
                    </span>
                  ))}
                  <span
                    className={`text-xs ${
                      c.link === "Tracked link" ? "text-muted-foreground" : "text-primary"
                    }`}
                  >
                    {c.link}
                  </span>
                  <span className="text-xs text-muted-foreground/70 leading-snug">
                    {c.note ?? ""}
                  </span>
                </li>
              ))}
            </ul>
            <div className="px-5 py-3 border-t border-border text-xs text-muted-foreground/70">
              Showing {visible.length} of {CHANNEL_SETUP.length} channels, worst first. Channels are
              anonymised and the rows are illustrative.
            </div>
          </div>
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
              Why it exists
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
              The campaign you bought is not always the campaign that ran
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mt-4">
              Across a roster of a dozen creators, a few will always miss a step. Without a check,
              nobody finds out until the campaign is over and the numbers come in lower than they
              should have.
            </p>
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
              to="/replay-reach"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5" /> Replay reach
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

export default CampaignCompliance;
