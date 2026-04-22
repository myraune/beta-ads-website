import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * Data sourced from the verified Saily eSIM report (Drive file
 * `saily-report-02-07-2025.pdf`) for the June 2025 Norway Twitch
 * campaign. Saily is Surfshark's travel-eSIM brand.
 */
const BRAND = {
  // Saily brand colors — vivid purple primary + mint accent
  primary: "#7b4aff",
  secondary: "#5adbb5",
  glow: "rgba(123,74,255,0.18)",
};

const stats = [
  { value: "102,794", label: "Completed views" },
  { value: "1.08%", label: "Verified CTR" },
  { value: "518", label: "Verified clicks" },
  { value: "685 h", label: "Screen time" },
];

const results = [
  { value: "22", label: "Streamers" },
  { value: "27", label: "Categories" },
  { value: "53,229", label: "Unique viewers" },
  { value: "2.41%", label: "Unverified CTR" },
];

const regions = [
  { name: "Oslo", pct: 29 },
  { name: "Akershus (Viken)", pct: 22 },
  { name: "Bergen / Vestland", pct: 14 },
  { name: "Trondheim / Trøndelag", pct: 10 },
  { name: "Rogaland / Stavanger", pct: 8 },
];

const timeline = [
  { date: "Jun 5", label: "Kick-off", value: "Summer travel window opens" },
  { date: "Jun 12", label: "Best day", value: "743 views · 1.08% CTR" },
  { date: "Jun 18", label: "forstegir peak", value: "37,869 views, 168 clicks" },
  { date: "Jun 30", label: "Campaign close", value: "685 h screen-time" },
];

const SailyCaseStudy: React.FC = () => {
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
              background: `radial-gradient(ellipse 70% 50% at 70% 40%, ${BRAND.glow} 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 30% 60%, rgba(90,219,181,0.10) 0%, transparent 65%)`,
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
                style={{ boxShadow: `0 0 0 1px ${BRAND.primary}33` }}
              >
                <img
                  src="/lovable-uploads/logo-saily.png"
                  alt="Saily"
                  className="h-8 w-auto object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span
                  className="text-[11px] font-semibold tracking-[0.2em] uppercase"
                  style={{ color: BRAND.primary }}
                >
                  🇳🇴 Norway · Travel eSIM
                </span>
                <span className="text-xs text-white/50 tracking-wide">Case Study · Jun 2025</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
              Saily eSIM<br />
              <span
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="italic font-normal"
              >
                × Beta Ads
              </span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-xl">
              Travel eSIM awareness placed exactly where travel is being talked about live —
              685 hours of on-screen presence across 22 Norwegian streamers during the
              summer travel season.
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
            Mobile eSIM popup creative shown in-stream
          </h2>
          <div
            className="rounded-2xl overflow-hidden bg-black border max-w-3xl"
            style={{ borderColor: `${BRAND.primary}33` }}
          >
            <video
              src="/lovable-uploads/case-studies/saily-mobile-overlay.webm"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-auto"
              aria-label="Saily eSIM mobile overlay creative as displayed on Norwegian Twitch streams"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-4 max-w-3xl">
            The popup landed natively inside streams the moment viewers were already in
            travel-thinking mode — Travel &amp; Outdoors, driving content, Just Chatting
            recaps from trips.
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
                Travel intent is seasonal. The creative needed to land at the right moment.
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                Saily (Surfshark's travel-eSIM product) needed to reach Norwegian travellers
                ahead of the June–July peak. Paid search captures people already shopping
                for travel eSIMs — the harder problem was getting in front of the ones who
                hadn't yet realised they needed one.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                The answer was contextual: ride along with creators who were already
                mid-trip. Travel &amp; Outdoors streams, driving content, Just Chatting
                recaps — exactly when viewers were daydreaming about their own trip.
              </p>
            </div>
            <div className="space-y-4 pt-2">
              {[
                { label: "Market", value: "🇳🇴 Norway (94.6% viewership)" },
                { label: "Format", value: "Rich Media Overlay" },
                { label: "Run", value: "Jun 2025 (4 weeks)" },
                { label: "Best day", value: "Jun 12 — 743 views, 1.08% CTR" },
                { label: "Audience", value: "Male 100%, 25–34 skew" },
                { label: "Device split", value: "Desktop 79.7% / Mobile 20.3%" },
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
              65% of screen time inside Travel &amp; Outdoors streams
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mb-12">
              Beta concentrated delivery in the category where Saily's message was already
              contextually relevant. The overlay showed 986 times across 22 streamers — the
              most productive single placement drove 37,869 completed views alone.
            </p>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4 block">
                  Top 5 creators
                </span>
                <div className="space-y-3">
                  {[
                    { name: "forstegir", views: "37,869", clicks: "168", avgViewers: "170" },
                    { name: "LaSanias", views: "—", clicks: "—", avgViewers: "—" },
                    { name: "kamillala", views: "—", clicks: "—", avgViewers: "—" },
                    { name: "dennisvareide", views: "—", clicks: "—", avgViewers: "—" },
                    { name: "Danniz", views: "—", clicks: "—", avgViewers: "—" },
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
                    { cat: "Travel & Outdoors", pct: "65.43%" },
                    { cat: "Just Chatting", pct: "15.71%" },
                    { cat: "Grand Theft Auto V", pct: "7.50%" },
                    { cat: "Fortnite", pct: "2.73%" },
                    { cat: "Other", pct: "6.78%" },
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
              The Travel &amp; Outdoors concentration (65%) meant overlay impressions landed
              when viewers were already in travel-thinking mode — a degree of contextual
              relevance paid search can't replicate.
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
              53K unique Norwegian travellers reached mid-planning
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
                            width: `${(r.pct / 29) * 100}%`,
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
                        79.7%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: "79.7%", background: BRAND.primary }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="text-sm text-foreground">Mobile</span>
                      <span className="text-sm font-semibold text-foreground tabular-nums">
                        20.3%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: "20.3%", background: BRAND.primary, opacity: 0.6 }}
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
                  <div className="text-xl font-semibold text-foreground mb-5">25–34</div>
                  <div className="text-xs text-muted-foreground mb-1.5">Language</div>
                  <div className="text-xl font-semibold text-foreground">Norwegian</div>
                </div>
                <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                  25–34 skew matters — that's Saily's core travel-eSIM buyer: working-age
                  travellers heading abroad in the Jun–Jul window.
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
                53K unique viewers reached at peak travel-planning season
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                The campaign delivered 102,794 completed views with 685 hours of on-screen
                presence over four weeks. 518 verified clicks through the chat-pinned CTA
                (2,477 unverified) put the product in front of travellers right as they
                were planning June–July trips.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                The verified 1.08% CTR is in line with benchmarks for broad-funnel travel
                creative — but the unverified 2.41% and the category distribution matter
                more: Saily showed up where travel intent was already active.
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
                src="/lovable-uploads/logo-saily.png"
                alt="Saily"
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
                  Land your message inside the moment, not around it
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

export default SailyCaseStudy;
