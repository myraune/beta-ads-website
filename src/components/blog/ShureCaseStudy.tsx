import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * Data sourced from the verified Shure report (Drive file
 * `shure-report-general.pdf`) covering a concentrated two-streamer run
 * focused on the Shure MV7+ / SM7B microphone category.
 */
const BRAND = {
  // Shure brand — red primary, warm gold accent
  primary: "#e4002b",
  secondary: "#ffb800",
  glow: "rgba(228,0,43,0.14)",
};

const stats = [
  { value: "182,554", label: "Completed views" },
  { value: "1.31%", label: "Verified CTR" },
  { value: "2,378", label: "Verified clicks" },
  { value: "761 h", label: "Screen time" },
];

const results = [
  { value: "48,617", label: "Unique viewers" },
  { value: "11", label: "Live categories" },
  { value: "9.12%", label: "Peak-day CTR" },
  { value: "2.16%", label: "Unique-viewer CTR" },
];

const regions = [
  { name: "Oslo", pct: 36 },
  { name: "Akershus (Viken)", pct: 24 },
  { name: "Bergen / Vestland", pct: 11 },
  { name: "Trondheim / Trøndelag", pct: 8 },
  { name: "Rogaland / Stavanger", pct: 6 },
];

const timeline = [
  { date: "Jul 12", label: "Kick-off", value: "detoo launch stream" },
  { date: "Jul 19", label: "detoo scale-up", value: "+272 avg viewers, MV6 feature" },
  { date: "Jul 26", label: "Peak day", value: "9.12% CTR — 7× display benchmark" },
  { date: "Aug 5", label: "Campaign close", value: "2,378 verified clicks" },
];

const ShureCaseStudy: React.FC = () => {
  const { ref: bodyRef, isVisible: bodyVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: solutionRef, isVisible: solutionVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: demoRef, isVisible: demoVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: resultsRef, isVisible: resultsVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative overflow-clip" style={{ background: "hsl(240 11% 5%)" }}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 70% 50% at 60% 30%, ${BRAND.glow} 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 40% 70%, rgba(255,184,0,0.10) 0%, transparent 65%)`,
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
              <div
                className="flex items-center justify-center rounded-xl bg-white/[0.06] border border-white/10 p-3 backdrop-blur-sm"
                style={{ boxShadow: `0 0 0 1px ${BRAND.primary}55` }}
              >
                <img
                  src="/lovable-uploads/logo-shure.png"
                  alt="Shure"
                  className="h-8 w-auto object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span
                  className="text-[11px] font-semibold tracking-[0.2em] uppercase"
                  style={{ color: BRAND.primary }}
                >
                  🇳🇴 Norway · Pro-audio hardware
                </span>
                <span className="text-xs text-white/50 tracking-wide">Case Study · Jul–Aug</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
              Shure MV7+<br />
              <span
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="italic font-normal"
              >
                × Beta Ads
              </span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-xl">
              A concentrated two-creator launch for the MV7+ microphone — 761 hours of
              on-screen presence, 2,378 verified clicks, and a 9.12% best-day CTR driven by
              audio-focused Norwegian streamers.
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
            MV6 microphone overlay shown live in-stream
          </h2>
          <div
            className="rounded-2xl overflow-hidden bg-black border max-w-3xl"
            style={{ borderColor: `${BRAND.primary}33` }}
          >
            <video
              src="/lovable-uploads/case-studies/shure-overlay.webm"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-auto"
              aria-label="Shure MV6 microphone overlay creative as displayed on Norwegian Twitch streams"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-4 max-w-3xl">
            detoo ran the overlay alongside his actual Shure mic pickup — audience saw the
            product live, on-stream, in the hands of the creator they tuned in for.
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
                Reach creators who actually care about audio quality
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                Shure's MV7+ is a premium streaming microphone — the kind of product that
                benefits more from one demonstrated endorsement than from a million broad
                impressions. The target wasn't casual viewers; it was creators and
                aspiring creators who invest in gear and spread gospel to their audiences.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Rather than spread paid media thin across 30+ streamers, Shure doubled down
                on two creators whose audiences already valued production quality. Depth
                over breadth — a radically different media-mix approach for a hardware
                launch.
              </p>
            </div>
            <div className="space-y-4 pt-2">
              {[
                { label: "Market", value: "🇳🇴 Norway (95.6% viewership)" },
                { label: "Format", value: "Rich Media Overlay" },
                { label: "Strategy", value: "Concentrated 2-streamer run" },
                { label: "Top streamer", value: "detoo — 2,377 link clicks alone" },
                { label: "Best day CTR", value: "9.12% (Jul 26)" },
                { label: "Device split", value: "Desktop 93.6% / Mobile 5.6%" },
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

      {/* ── SOLUTION ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div
            ref={solutionRef}
            className={`transition-all duration-700 ${
              solutionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span
              className="text-xs font-semibold tracking-widest uppercase mb-3 block"
              style={{ color: BRAND.primary }}
            >
              The Solution
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4 max-w-2xl">
              Two creators, deep exposure, one lead creator carrying 2,377 clicks
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mb-12">
              The overlay ran across 11 different live categories (Just Chatting, FIFA 23,
              GTA V, COD, Slots) — wherever detoo and BetaNorway streamed, the overlay was
              present. detoo's audience alone drove nearly every verified click in the
              campaign, averaging 272 concurrent viewers throughout the run.
            </p>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4 block">
                  Streamer breakdown
                </span>
                <div className="space-y-3">
                  {[
                    {
                      name: "detoo",
                      avgViewers: "272",
                      clicks: "2,377",
                      views: "182,546",
                    },
                    { name: "BetaNorway", avgViewers: "—", clicks: "—", views: "—" },
                  ].map((s, i) => (
                    <div
                      key={s.name}
                      className="flex items-center justify-between py-3 border-b border-border last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground tabular-nums w-4">
                          {i + 1}
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          {s.name}
                        </span>
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
                    { cat: "Just Chatting", pct: "67.91%" },
                    { cat: "FIFA 23", pct: "7.96%" },
                    { cat: "Slots", pct: "7.05%" },
                    { cat: "Grand Theft Auto V", pct: "5.19%" },
                    { cat: "Call of Duty: Modern Warfare", pct: "4.25%" },
                  ].map((c) => (
                    <div
                      key={c.cat}
                      className="flex items-center justify-between py-3 border-b border-border last:border-0"
                    >
                      <span className="text-sm font-semibold text-foreground">{c.cat}</span>
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {c.pct}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground max-w-2xl">
              68% of screen time happened inside Just Chatting — exactly when streamers
              were talking directly to audiences, often about their setups. The overlay
              became a conversation starter rather than an interruption.
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
              Depth beats breadth — 48K unique creators &amp; creator-curious reached
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
                            width: `${(r.pct / 36) * 100}%`,
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
                        93.6%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: "93.6%", background: BRAND.primary }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="text-sm text-foreground">Mobile</span>
                      <span className="text-sm font-semibold text-foreground tabular-nums">
                        5.6%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: "5.6%", background: BRAND.primary, opacity: 0.5 }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="text-sm text-foreground">Tablet / Other</span>
                      <span className="text-sm font-semibold text-foreground tabular-nums">
                        0.8%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: "0.8%", background: BRAND.primary, opacity: 0.3 }}
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
                  <div className="text-xl font-semibold text-foreground mb-5">18–34</div>
                  <div className="text-xs text-muted-foreground mb-1.5">Avg concurrent</div>
                  <div className="text-xl font-semibold text-foreground">272 viewers</div>
                </div>
                <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                  detoo's audience is a sweet spot for Shure — Gen Z / Millennial men on
                  desktop, in front of their own streaming rig, in the market for a
                  better mic.
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
                Peak days outperformed benchmark CTR by 7×
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                At campaign peak (July 26), verified CTR hit 9.12% — roughly 7× a typical
                display benchmark for audio hardware. The sustained 1.31% verified / 2.16%
                unique-viewer CTR across 761 hours of on-stream exposure demonstrates that
                a concentrated creator approach can outperform broad reach for
                consideration-stage products.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                48,617 unique viewers encountered the MV7+ in the context of someone they
                already trusted — driving the kind of product awareness that's very hard
                to buy through traditional display or pre-roll.
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

      {/* ── CTA ── */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
            <div className="flex items-center gap-5">
              <img
                src="/lovable-uploads/logo-shure.png"
                alt="Shure"
                className="h-9 w-auto object-contain opacity-90"
              />
              <div>
                <span
                  className="text-xs font-semibold tracking-widest uppercase mb-3 block"
                  style={{ color: BRAND.primary }}
                >
                  Run a Similar Campaign
                </span>
                <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
                  Concentrated creator placements that outperform broad reach
                </h2>
              </div>
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

export default ShureCaseStudy;
