import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * Data sourced from `nki-hva-slags-type-student-er-du-report.pdf` (Drive).
 * NKI is Norway's largest distance-learning university; this campaign ran
 * an interactive "what type of student are you?" quiz format Oct–Nov 2025.
 */
const stats = [
  { value: "220,003", label: "Completed views" },
  { value: "0.72%", label: "Verified CTR" },
  { value: "1,595", label: "Verified clicks" },
  { value: "1,528 h", label: "Screen time" },
];

const results = [
  { value: "19", label: "Streamers" },
  { value: "45", label: "Categories" },
  { value: "90,356", label: "Unique viewers" },
  { value: "1.90%", label: "Peak-day CTR" },
];

const NkiCaseStudy: React.FC = () => {
  const { ref: bodyRef, isVisible: bodyVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: solutionRef, isVisible: solutionVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: resultsRef, isVisible: resultsVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div>
      <section className="relative overflow-clip" style={{ background: "hsl(240 11% 5%)" }}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 60% 30%, rgba(140,90,220,0.14) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 40% 70%, rgba(90,219,181,0.08) 0%, transparent 65%)",
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
                Distance Learning
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/70 tracking-wider uppercase">
                Case Study
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
              NKI Distance Learning<br />
              <span
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="italic font-normal"
              >
                Hva slags type student er du?
              </span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-xl">
              An interactive quiz-format campaign for Norway's largest distance-learning
              university — 220K completed views, 1,595 verified clicks driven into the
              "what type of student are you?" landing experience.
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
                Pull young Norwegians into a quiz format that drives lead capture
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                NKI offers distance learning — a category that has to fight a perception
                problem with younger audiences who default to physical campuses. The
                "what type of student are you?" quiz was the team's lead-gen vehicle:
                the goal was to land enough quiz starts that the brand could re-target
                qualified prospects further down the funnel.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                A long-form quiz needs more attention than a banner ad — so the creative
                had to land in moments where viewers were already paying focused
                attention to a screen and an open browser tab.
              </p>
            </div>
            <div className="space-y-4 pt-2">
              {[
                { label: "Market", value: "Norway (93.8% viewership)" },
                { label: "Format", value: "Rich Media Overlay → Quiz" },
                { label: "Run", value: "Oct 24 – Nov 21 2025 (~4 weeks)" },
                { label: "Best day", value: "Nov 11 — 7,484 views, 1.9% CTR" },
                { label: "Top region", value: "Oslo (13.8% of viewers)" },
                { label: "Device split", value: "Desktop 78.5% / Mobile 21.1%" },
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

      <section className="py-20 md:py-28 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div
            ref={solutionRef}
            className={`transition-all duration-700 ${
              solutionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              The Solution
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4 max-w-2xl">
              19 streamers, 45 categories, 1,528 hours of total screen time
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mb-12">
              Beta concentrated NKI's run on creators with high desktop-share viewership
              — exactly the audience that opens a quiz tab in another window. The
              campaign earned 90,356 unique viewers and 5,469 unverified clicks across
              the four-week run.
            </p>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4 block">
                  Top 5 creators
                </span>
                <div className="space-y-3">
                  {[
                    { name: "danniz", views: "80,042", clicks: "327", avgViewers: "118" },
                    { name: "rubengks", views: "—", clicks: "—", avgViewers: "—" },
                    { name: "detoo", views: "—", clicks: "—", avgViewers: "—" },
                    { name: "lasanias", views: "—", clicks: "—", avgViewers: "—" },
                    { name: "joonieboi", views: "—", clicks: "—", avgViewers: "—" },
                  ].map((s, i) => (
                    <div
                      key={s.name}
                      className="flex items-center justify-between py-3 border-b border-border last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground tabular-nums w-4">
                          {i + 1}
                        </span>
                        <span className="text-sm font-semibold text-foreground">{s.name}</span>
                      </div>
                      {s.views !== "—" && (
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {s.views} views · {s.clicks} clicks
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4 block">
                  Top 5 live categories
                </span>
                <div className="space-y-3">
                  {[
                    { cat: "Just Chatting", pct: "40.02%" },
                    { cat: "Grand Theft Auto V", pct: "15.88%" },
                    { cat: "IRL", pct: "13.93%" },
                    { cat: "Minecraft", pct: "13.91%" },
                    { cat: "Fortnite", pct: "3.66%" },
                  ].map((c) => (
                    <div
                      key={c.cat}
                      className="flex items-center justify-between py-3 border-b border-border last:border-0"
                    >
                      <span className="text-sm font-semibold text-foreground">{c.cat}</span>
                      <span className="text-xs text-muted-foreground tabular-nums">{c.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground max-w-2xl">
              40% Just Chatting + 14% IRL gave NKI a contextual home — viewers were
              already attentive, often multi-tabbing, and primed to engage with the
              quiz creative as a curiosity-driven moment rather than an interruption.
            </p>
          </div>
        </div>
      </section>

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
                90K unique viewers driven into a long-form lead-gen experience
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                NKI's quiz campaign drove 220,003 completed views with 1,528 hours of
                cumulative screen time. The 1.9% peak-day CTR validated the central
                hypothesis: gamer-adjacent audiences will engage with thoughtful quiz
                formats when the placement is contextual rather than interruptive.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                With 1,434 unique clicks (and 5,469 raw clicks) the campaign delivered
                meaningful top-of-funnel volume into NKI's quiz funnel — at a fraction
                of typical higher-ed CPL benchmarks.
              </p>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-px rounded-2xl overflow-hidden bg-border">
                {results.map((s) => (
                  <div key={s.label} className="bg-background px-6 py-5">
                    <div className="text-2xl font-bold text-foreground tracking-tight">
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

      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
                Run a Similar Campaign
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
                Drive lead-capture into long-form experiences
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

export default NkiCaseStudy;
