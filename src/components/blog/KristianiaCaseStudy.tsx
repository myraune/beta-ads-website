import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * Data sourced from TWO verified Kristiania campaign reports (Drive):
 *
 *   1. `kristiania-report-14-04-2025-08-46-58.pdf` — main awareness /
 *      student-recruitment run (Feb–Apr 2025)
 *   2. `kristiania-voting-report-14-04-2025-08-47-09.pdf` — parallel
 *      voting / engagement campaign run on the same talent pool
 *
 * Combined delivery across both reports: ~599K display views, ~6K
 * verified clicks, ~3,329 h on-screen presence.
 */

// Combined totals across both campaigns — these are the headline numbers.
const stats = [
  { value: "599,252", label: "Combined views" },
  { value: "5,997", label: "Verified clicks" },
  { value: "31", label: "Streamers" },
  { value: "3,329 h", label: "Screen time" },
];

// Per-campaign rows shown in the comparison block below.
const campaigns = [
  {
    name: "Awareness / Recruitment",
    file: "kristiania-report-14-04-2025-08-46-58.pdf",
    views: "459,237",
    verifiedClicks: "4,372",
    verifiedCTR: "1.53%",
    bestDay: "Feb 28 — 5,171 views, 2.15% CTR",
    artworkWatchTime: "28 h 7 m",
    screenTime: "2,551 h",
    streamers: "31",
    categories: "67",
    uniqueViewers: "136,828",
    topCreator: "danniz · 102,696 views · 519 clicks",
    topCategory: "Grand Theft Auto V (49.02%)",
  },
  {
    name: "Voting Campaign",
    file: "kristiania-voting-report-14-04-2025-08-47-09.pdf",
    views: "140,015",
    verifiedClicks: "1,625",
    verifiedCTR: "1.16%",
    bestDay: "Feb 27 — 1,461 views, 2.81% CTR",
    artworkWatchTime: "8 h 30 m",
    screenTime: "778 h",
    streamers: "30",
    categories: "49",
    uniqueViewers: "84,615",
    topCreator: "danniz · 34,430 views · 217 clicks",
    topCategory: "Grand Theft Auto V (56.69%)",
  },
];

const results = [
  { value: "~600K", label: "Combined views" },
  { value: "Norway", label: "95.4% viewership" },
  { value: "danniz", label: "Top creator both campaigns" },
  { value: "GTA V", label: "Dominant category" },
];

const KristianiaCaseStudy: React.FC = () => {
  const { ref: bodyRef, isVisible: bodyVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: campaignsRef, isVisible: campaignsVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: resultsRef, isVisible: resultsVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div>
      <section className="relative overflow-clip" style={{ background: "hsl(240 11% 5%)" }}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 60% 30%, rgba(233,79,55,0.16) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 40% 70%, rgba(255,200,80,0.08) 0%, transparent 65%)",
            }}
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent z-[1] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-28 md:pt-36 pb-20">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> Back to campaigns
          </Link>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/70 tracking-wider uppercase">
                Two-Campaign Run
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/70 tracking-wider uppercase">
                Case Study
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
              Høyskolen Kristiania<br />
              <span
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="italic font-normal"
              >
                × Beta Ads
              </span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-xl">
              Two parallel Twitch campaigns — recruitment awareness + a voting
              activation — running across the same Norwegian creator network.
              Combined delivery: <strong className="text-white">~600,000 views</strong>,
              ~6,000 verified clicks, 3,329 hours of on-screen presence.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-16 border border-white/10 rounded-2xl overflow-hidden bg-white/10">
            {stats.map((s) => (
              <div key={s.label} className="bg-black/30 backdrop-blur-sm px-6 py-5">
                <div className="text-2xl font-bold text-white tracking-tight">{s.value}</div>
                <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHALLENGE ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div
            ref={bodyRef}
            className={`grid lg:grid-cols-2 gap-16 items-start transition-all duration-700 ${
              bodyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
                The Challenge
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">
                Two parallel Gen Z asks. Same audience. Same window.
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                Kristiania needed presence inside a window traditional university
                marketing can't reach: Gen Z evenings, on Twitch, where Norwegian
                students actually spend their attention. Application season runs
                Feb–Apr; after that, the window closes for a year.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Two campaigns ran in parallel — a broad awareness / recruitment
                push and a tighter voting activation — both targeting the same
                gamer-adjacent demographic. Coordinating them on a single
                creator network meant the brand stayed consistently present
                without burning out the audience with repetition.
              </p>
            </div>
            <div className="space-y-4 pt-2">
              {[
                { label: "Market", value: "Norway (95.4–95.7% viewership)" },
                { label: "Format", value: "Rich Media Overlay × 2 creatives" },
                { label: "Run", value: "Feb 28 – Apr 5 2025 (~8 weeks)" },
                { label: "Top creator both campaigns", value: "danniz (267–268 avg viewers)" },
                { label: "Combined unique viewers", value: "~221K (some overlap)" },
                { label: "Device split", value: "Desktop 96.4% / Mobile 3.0%" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between items-baseline py-3 border-b border-border last:border-0 gap-6"
                >
                  <span className="text-sm text-muted-foreground">{row.label}</span>
                  <span className="text-sm font-semibold text-foreground text-right">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TWO CAMPAIGNS BREAKDOWN ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div
            ref={campaignsRef}
            className={`transition-all duration-700 ${
              campaignsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              The Solution
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4 max-w-2xl">
              Two campaigns, one creator network, ~600K combined views
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mb-12">
              Beta deployed two distinct Kristiania creatives across the same
              roster of Norwegian streamers. Both ran inside the same 8-week
              window — the awareness creative carrying recruitment messaging,
              the voting creative driving a parallel campaign action. Same
              talent, two outcomes.
            </p>

            <div className="grid lg:grid-cols-2 gap-6">
              {campaigns.map((c, idx) => (
                <div
                  key={c.name}
                  className="rounded-2xl border border-border p-7 lg:p-8 bg-card"
                >
                  <div className="flex items-baseline justify-between mb-5">
                    <span className="text-xs font-semibold tracking-widest uppercase text-primary">
                      Campaign {idx + 1}
                    </span>
                    <span className="text-xs text-muted-foreground tabular-nums">
                      Verified report
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-1 leading-snug">
                    {c.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-7 font-mono break-all">
                    {c.file}
                  </p>

                  <div className="grid grid-cols-2 gap-px bg-border rounded-xl overflow-hidden mb-6">
                    <div className="bg-background px-5 py-4">
                      <div className="text-2xl font-bold text-foreground tabular-nums tracking-tight">
                        {c.views}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        Display views
                      </div>
                    </div>
                    <div className="bg-background px-5 py-4">
                      <div className="text-2xl font-bold text-foreground tabular-nums tracking-tight">
                        {c.verifiedClicks}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        Verified clicks
                      </div>
                    </div>
                    <div className="bg-background px-5 py-4">
                      <div className="text-2xl font-bold text-foreground tabular-nums tracking-tight">
                        {c.verifiedCTR}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        Verified CTR
                      </div>
                    </div>
                    <div className="bg-background px-5 py-4">
                      <div className="text-2xl font-bold text-foreground tabular-nums tracking-tight">
                        {c.uniqueViewers}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        Unique viewers
                      </div>
                    </div>
                  </div>

                  <dl className="space-y-2.5 text-sm">
                    {[
                      ["Best day", c.bestDay],
                      ["Streamers", c.streamers],
                      ["Categories", c.categories],
                      ["Screen time", c.screenTime],
                      ["Artwork watch time", c.artworkWatchTime],
                      ["Top creator", c.topCreator],
                      ["Top category", c.topCategory],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex justify-between items-baseline gap-6 py-1.5 border-b border-border last:border-0"
                      >
                        <dt className="text-muted-foreground shrink-0">{label}</dt>
                        <dd className="text-foreground font-medium text-right">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground max-w-2xl mt-10">
              Both campaigns shared the same lead creator (danniz) and the same
              dominant category (GTA V — 49% awareness, 57% voting). The voting
              creative ran lighter total volume but landed a higher peak-day
              CTR (2.81% vs 2.15%) — a useful pattern: clear-action creatives
              spike harder on launch day, awareness creatives sustain over the
              campaign window.
            </p>
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section
        ref={resultsRef}
        className={`py-20 md:py-28 border-t border-border transition-all duration-700 ${
          resultsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
                Impact
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">
                ~600K combined views during the window that mattered
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                Across both campaigns, Kristiania reached ~221,000 unique
                Norwegian Gen Z viewers and racked up 5,997 verified clicks —
                inside an 8-week application-season window where recruitment
                outcomes for an entire academic year are decided.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Combined verified CTR of ~1.0% (weighted across both runs) and
                peak-day CTRs of 2.15% (awareness) and 2.81% (voting) sit
                comfortably above conventional higher-ed display benchmarks
                in the Nordic market.
              </p>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-px rounded-2xl overflow-hidden bg-border">
                {results.map((s) => (
                  <div key={s.label} className="bg-background px-6 py-5">
                    <div className="text-xl font-bold text-foreground tracking-tight">
                      {s.value}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
                Run a Similar Campaign
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
                Reach Norwegian Gen Z at scale, natively
              </h2>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 shrink-0"
            >
              <Link to="/contact">
                Book a demo <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-border pt-6">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`py-4 ${i < 3 ? "pr-6 border-r border-border" : ""} ${
                  i > 0 ? "pl-6" : ""
                }`}
              >
                <div className="text-2xl font-bold text-foreground tracking-tight">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default KristianiaCaseStudy;
