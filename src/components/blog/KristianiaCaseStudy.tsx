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
const BRAND = {
  // Høyskolen Kristiania red
  primary: "#e30613",
  secondary: "#ffb800",
  glow: "rgba(227,6,19,0.18)",
};

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

const regions = [
  { name: "Oslo", pct: 31 },
  { name: "Akershus (Viken)", pct: 22 },
  { name: "Bergen / Vestland", pct: 13 },
  { name: "Trondheim / Trøndelag", pct: 10 },
  { name: "Rogaland / Stavanger", pct: 7 },
];

const timeline = [
  { date: "Feb 27", label: "Voting peak", value: "2.81% CTR day-1 surge" },
  { date: "Feb 28", label: "Awareness peak", value: "5,171 views · 2.15% CTR" },
  { date: "Mar 10", label: "danniz consistency", value: "102K views across run" },
  { date: "Apr 5", label: "Combined close", value: "~600K total views" },
];

const KristianiaCaseStudy: React.FC = () => {
  const { ref: bodyRef, isVisible: bodyVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: campaignsRef, isVisible: campaignsVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: demoRef, isVisible: demoVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: resultsRef, isVisible: resultsVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div>
      <section className="relative overflow-clip" style={{ background: "hsl(240 11% 5%)" }}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 70% 50% at 60% 30%, ${BRAND.glow} 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 40% 70%, rgba(255,184,0,0.08) 0%, transparent 65%)`,
            }}
          />
        </div>
        <div
          className="absolute inset-x-0 top-0 h-px z-[2]"
          style={{ background: `linear-gradient(90deg, transparent 0%, ${BRAND.primary} 50%, transparent 100%)` }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent z-[1] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-28 md:pt-36 pb-20">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> Back to campaigns
          </Link>

          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              {/* Kristiania's signature "K" mark — extracted from their official brand sprite */}
              <div
                className="flex items-center justify-center rounded-xl bg-white/[0.06] border border-white/10 p-3 backdrop-blur-sm"
                style={{ boxShadow: `0 0 0 1px ${BRAND.primary}55` }}
              >
                <img
                  src="/lovable-uploads/logo-kristiania-mark.svg"
                  alt="Høyskolen Kristiania"
                  className="h-8 w-8 object-contain"
                  style={{ color: BRAND.primary }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span
                  className="text-[11px] font-semibold tracking-[0.2em] uppercase"
                  style={{ color: BRAND.primary }}
                >
                  Norway · Higher Ed · Two campaigns
                </span>
                <span className="text-xs text-white/50 tracking-wide">
                  Case Study · Feb–Apr 2025
                </span>
              </div>
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

      {/* ── CREATIVE PREVIEW ── */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <span
            className="text-xs font-semibold tracking-widest uppercase mb-3 block"
            style={{ color: BRAND.primary }}
          >
            The creative
          </span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-8 max-w-2xl">
            Recruitment overlay shown live across 31 Norwegian streamers
          </h2>
          <div
            className="rounded-2xl overflow-hidden bg-black border max-w-3xl"
            style={{ borderColor: `${BRAND.primary}33` }}
          >
            <video
              src="/lovable-uploads/case-studies/kristiania-overlay.webm"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-auto"
              aria-label="Høyskolen Kristiania recruitment overlay creative as displayed on Norwegian Twitch streams"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-4 max-w-3xl">
            Two distinct creatives — recruitment awareness and a voting CTA — ran the same
            overlay slot on the same 30-strong Norwegian creator network without
            cannibalising each other.
          </p>
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
              <span
                className="text-xs font-semibold tracking-widest uppercase mb-3 block"
                style={{ color: BRAND.primary }}
              >
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
                { label: "Market", value: "🇳🇴 Norway (95.4–95.7% viewership)" },
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
            <span
              className="text-xs font-semibold tracking-widest uppercase mb-3 block"
              style={{ color: BRAND.primary }}
            >
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
                  className="rounded-2xl border border-border p-7 lg:p-8 bg-card relative overflow-hidden"
                >
                  {/* Top brand-colored accent stripe */}
                  <div
                    className="absolute inset-x-0 top-0 h-0.5"
                    style={{ background: BRAND.primary, opacity: idx === 0 ? 1 : 0.55 }}
                  />
                  <div className="flex items-baseline justify-between mb-5">
                    <span
                      className="text-xs font-semibold tracking-widest uppercase"
                      style={{ color: BRAND.primary }}
                    >
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

      {/* ── DEMOGRAPHICS & REACH ── */}
      <section className="py-20 md:py-28 border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div
            ref={demoRef}
            className={`transition-all duration-700 ${
              demoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span
              className="text-xs font-semibold tracking-widest uppercase mb-3 block"
              style={{ color: BRAND.primary }}
            >
              Reach &amp; Demographics
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-10 max-w-2xl">
              ~221K unique Norwegian Gen Z viewers across 8 weeks
            </h2>

            <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-5 block">
                  Top regions (NO)
                </span>
                <div className="space-y-3.5">
                  {regions.map((r) => (
                    <div key={r.name}>
                      <div className="flex justify-between items-baseline mb-1.5">
                        <span className="text-sm text-foreground">{r.name}</span>
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {r.pct}%
                        </span>
                      </div>
                      <div className="h-1 rounded-full bg-border overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(r.pct / 31) * 100}%`,
                            background: BRAND.primary,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-5 block">
                  Device split
                </span>
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="text-sm text-foreground">Desktop</span>
                      <span className="text-sm font-semibold text-foreground tabular-nums">
                        96.4%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: "96.4%", background: BRAND.primary }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="text-sm text-foreground">Mobile</span>
                      <span className="text-sm font-semibold text-foreground tabular-nums">
                        3.0%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: "3%", background: BRAND.primary, opacity: 0.5 }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="text-sm text-foreground">Tablet / Other</span>
                      <span className="text-sm font-semibold text-foreground tabular-nums">
                        0.6%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: "0.6%", background: BRAND.primary, opacity: 0.3 }}
                      />
                    </div>
                  </div>
                </div>

                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mt-10 mb-5 block">
                  Platform
                </span>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Twitch</span>
                    <span className="text-foreground font-semibold tabular-nums">100%</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-5 block">
                  Audience
                </span>
                <div className="rounded-2xl border border-border bg-background p-6">
                  <div className="text-xs text-muted-foreground mb-1.5">Gender</div>
                  <div className="text-xl font-semibold text-foreground mb-5">Male 100%</div>
                  <div className="text-xs text-muted-foreground mb-1.5">Dominant age</div>
                  <div className="text-xl font-semibold text-foreground mb-5">18–24</div>
                  <div className="text-xs text-muted-foreground mb-1.5">Language</div>
                  <div className="text-xl font-semibold text-foreground">Norwegian</div>
                </div>
                <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                  The 18–24 skew is exactly the recruitment target — prospective students
                  in the decision window for the 2025 academic year.
                </p>
              </div>
            </div>

            <div className="mt-16 pt-10 border-t border-border">
              <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-6 block">
                Campaign moments
              </span>
              <div className="grid md:grid-cols-4 gap-6">
                {timeline.map((m, i) => (
                  <div key={m.date} className="relative">
                    {i < timeline.length - 1 && (
                      <div className="hidden md:block absolute top-3 left-full w-full h-px bg-border -translate-x-4" />
                    )}
                    <div
                      className="text-xs font-semibold tracking-widest uppercase mb-2"
                      style={{ color: BRAND.primary }}
                    >
                      {m.date}
                    </div>
                    <div className="text-sm font-semibold text-foreground mb-1">{m.label}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
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
              <span
                className="text-xs font-semibold tracking-widest uppercase mb-3 block"
                style={{ color: BRAND.primary }}
              >
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
              <div className="flex items-baseline gap-2 mb-3">
                <span
                  className="text-sm font-bold tracking-tight text-foreground"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Høyskolen{" "}
                  <span style={{ color: BRAND.primary }}>Kristiania</span>
                </span>
              </div>
              <span
                className="text-xs font-semibold tracking-widest uppercase mb-3 block"
                style={{ color: BRAND.primary }}
              >
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
