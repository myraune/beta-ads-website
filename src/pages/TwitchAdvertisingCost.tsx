import React from "react";
import { Link } from "react-router-dom";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedShaderBackground from "@/components/ui/lazy-animated-background";

const serifFont = { fontFamily: "'Instrument Serif', serif" };

const stats = [
  { value: "2", label: "Pricing models" },
  { value: "5", label: "Cost drivers" },
  { value: "0", label: "Public rate cards" },
  { value: "Custom", label: "Per campaign" },
];

const models = [
  {
    tag: "Auction",
    title: "CPM programmatic & overlay",
    body: "Bought the way most digital video is: per thousand impressions, priced by real-time auction rather than a fixed sticker. You set a budget and a target CPM; the exchange fills it across eligible inventory.",
    facts: [
      "No published CPM, it moves with demand",
      "Amazon's self-serve tier has no minimum spend",
      "Best for reach and frequency at scale",
    ],
  },
  {
    tag: "Negotiated",
    title: "Flat-fee creator integrations",
    body: "A direct deal with a streamer or their agency: a flat fee for a defined deliverable. An overlay for a set duration, a dedicated segment, clip and VOD rights, sometimes category exclusivity.",
    facts: [
      "Priced by concurrent viewership and fit",
      "No exchange, no rate card, it's a negotiation",
      "Best for credibility and conversion intent",
    ],
  },
];

// Directional price pressure per driver (0-100). Deliberately labelled as
// directional, NOT a rate card - these encode "how much this variable moves
// the number," from the article's five real cost drivers.
const drivers = [
  { term: "Category", weight: 92, desc: "Just Chatting and major esports draw broad, brand-safe audiences advertisers compete for. Niche or mature-rated categories cost less and reach less." },
  { term: "Audience geography", weight: 86, desc: "Reaching high-value Nordic viewers specifically costs more than broad global impressions, because that audience is worth more to everyone bidding on it." },
  { term: "Seasonality", weight: 74, desc: "Q4, big game launches and major esports moments tighten inventory. Q1 and Q2 are the best-value windows of the year." },
  { term: "Creator tier", weight: 58, desc: "Rates track concurrent viewership, but not linearly. Mid-tier creators often deliver the best efficiency for a focused Nordic audience." },
  { term: "Format", weight: 52, desc: "A persistent overlay, a one-off mention and a full sponsored segment are priced very differently for the same creator." },
];

// Directional CPM pressure across the year (0-100). Q1-Q2 value, Q4 peak.
const season = [
  { m: "Jan", v: 40 }, { m: "Feb", v: 39 }, { m: "Mar", v: 44 }, { m: "Apr", v: 43 },
  { m: "May", v: 41 }, { m: "Jun", v: 40 }, { m: "Jul", v: 49 }, { m: "Aug", v: 56 },
  { m: "Sep", v: 69 }, { m: "Oct", v: 83 }, { m: "Nov", v: 95 }, { m: "Dec", v: 100 },
];

// Real, verified campaign outcomes (from the case studies on this site).
const proof = [
  { brand: "Samsung", logo: "/lovable-uploads/logo-client-1.png", metric: "500,131", label: "completed views", extra: "2.93% avg CTR", href: "/case-study/samsung" },
  { brand: "Shure", logo: "/lovable-uploads/logo-shure.png", metric: "9.12%", label: "peak-day CTR", extra: "182,554 views", href: "/case-study/shure" },
  { brand: "NKI", logo: "/lovable-uploads/logo-nki.svg", metric: "220,003", label: "completed views", extra: "1,595 clicks", href: "/case-study/nki" },
  { brand: "Komplett", logo: "/lovable-uploads/logo-komplett.png", metric: "151,278", label: "display views", extra: "1.17% CTR", href: "/case-study/komplett" },
];

const bring = [
  { step: "01", title: "The goal", desc: "Awareness, consideration or a measurable action. It changes both the format and the budget shape." },
  { step: "02", title: "The market", desc: "Which of Norway, Sweden, Denmark or Finland, and in which language. Nordic targeting is the whole point." },
  { step: "03", title: "A budget bracket", desc: "Not a final number, a range. It tells us whether to scope a test, an always-on program or an integrated campaign." },
  { step: "04", title: "A timeline", desc: "A launch window lets us tell you honestly whether it lands in a premium or a value season." },
];

const TwitchAdvertisingCost: React.FC = () => {
  const { ref: modelsRef, isVisible: modelsVisible } = useScrollAnimation();
  const { ref: driversRef, isVisible: driversVisible } = useScrollAnimation();
  const { ref: seasonRef, isVisible: seasonVisible } = useScrollAnimation();
  const { ref: proofRef, isVisible: proofVisible } = useScrollAnimation();
  const { ref: nordicRef, isVisible: nordicVisible } = useScrollAnimation();
  const { ref: bringRef, isVisible: bringVisible } = useScrollAnimation();

  return (
    <MarketingPageLayout
      seo={{
        title: "What Does Twitch Advertising Cost? | Beta Ads",
        description:
          "No platform publishes a Twitch advertising rate card, not even Twitch. Here is how live-stream advertising is actually priced in the Nordics, the five cost drivers, and how to get a real quote.",
        canonical: "/twitch-advertising-cost",
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://beta-ads.no/twitch-advertising-cost#service",
            name: "Twitch Advertising - Beta Ads",
            serviceType: "Native Livestream Advertising",
            description:
              "Managed Twitch advertising campaigns across 28,000+ Nordic streamers, priced per campaign by category, geography, seasonality, creator tier and format.",
            provider: { "@id": "https://beta-ads.no/#organization" },
            areaServed: ["Norway", "Sweden", "Denmark", "Finland"],
            url: "https://beta-ads.no/twitch-advertising-cost",
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://beta-ads.no/" },
              { "@type": "ListItem", position: 2, name: "What Does Twitch Advertising Cost?", item: "https://beta-ads.no/twitch-advertising-cost" },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: "How much does Twitch advertising cost?", acceptedAnswer: { "@type": "Answer", text: "There is no single price. Nobody publishes a Twitch advertising rate card, not even Twitch. Cost depends on which of two pricing models you use (auction-based CPM buys or flat-fee creator integrations) and on five variables: category, audience geography, seasonality, creator tier and format. The honest answer is a scoped quote based on your goal, market and timeline." } },
              { "@type": "Question", name: "Is there a published Twitch ad rate card?", acceptedAnswer: { "@type": "Answer", text: "No. Amazon Ads, which runs Twitch's ad exchange, does not post a public rate card. Its self-serve video tier has no minimum spend, and larger buys are quoted by an account executive. The CPM itself moves in real time based on auction demand." } },
              { "@type": "Question", name: "What is the difference between CPM buys and creator integrations?", acceptedAnswer: { "@type": "Answer", text: "CPM programmatic and overlay ads are bought per thousand impressions by auction. Flat-fee creator integrations are negotiated directly with a streamer for a defined deliverable, priced by their concurrent viewership and fit. Most effective campaigns combine both." } },
              { "@type": "Question", name: "Why do Nordic Twitch campaigns cost differently?", acceptedAnswer: { "@type": "Answer", text: "Nordic audiences carry high purchasing power, so reaching them specifically is worth more to every advertiser bidding on that inventory. Nordic-language streamers are also a small, concentrated slice of global inventory, so precise targeting requires market-specific creator data." } },
            ],
          },
        ],
      }}
      cta={{
        heading: "Want an honest number?",
        subtext: "We won't publish a fake range or quote you one over a form field. Tell us your goal, market and timeline and we'll tell you plainly what a campaign like yours costs to run well.",
        primaryLabel: "Get a quote",
        primaryHref: "/contact",
        secondaryLabel: "See real campaign outcomes",
        secondaryHref: "/case-studies",
      }}
    >
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ background: "hsl(240 11% 5%)" }}>
        <AnimatedShaderBackground heightFactor={0.85} />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent z-[1] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/80 backdrop-blur-sm mb-7">
              <img src="/lovable-uploads/platform-twitch.png" alt="Twitch" className="h-3.5 w-auto" />
              Twitch Advertising Cost
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
              What Twitch advertising{" "}
              <span style={serifFont} className="italic font-normal">actually</span> costs
            </h1>
            <p className="text-lg text-white/65 leading-relaxed mb-10 max-w-lg">
              No platform publishes a rate card, not even Twitch. Here is how live-stream advertising is really priced in the Nordics, the five things that move the number, and how to get a real quote instead of a guess.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12">
                  Get a quote <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/case-studies">
                <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 rounded-full px-8 h-12 border border-white/20">
                  Case Studies
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-20 border border-white/10 rounded-2xl overflow-hidden bg-white/10">
            {stats.map((s) => (
              <div key={s.label} className="bg-black/30 backdrop-blur-sm px-6 py-5">
                <div className="text-2xl font-bold text-white tracking-tight">{s.value}</div>
                <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The honest opening (two-column, full width) ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">The honest answer</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-foreground leading-tight">
              Nobody publishes a price, and that's not evasion
            </h2>
          </div>
          <div className="space-y-5 text-base md:text-lg font-light leading-relaxed text-muted-foreground lg:pt-3">
            <p>
              If you searched for a straight "Twitch ads price," here it is up front: there isn't one. Amazon Ads, which runs Twitch's ad exchange, doesn't post a rate card. Standard video buys route to a self-serve entry point; anything larger is quoted by an account executive.
            </p>
            <p>
              That reflects how pricing actually works. Two genuinely different products get sold under the same "Twitch advertising" label, priced by different mechanics, and both move on category, geography, timing and who is on stream.
            </p>
          </div>
        </div>
      </section>

      {/* ── The two pricing models (full-width cards) ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={modelsRef} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${modelsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">How it's priced</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">Two products, two pricing mechanics</h2>
            <p className="text-base text-muted-foreground leading-relaxed mt-4">Confusing these is the single biggest reason people get surprised by a quote.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {models.map((m) => (
              <div key={m.title} className="p-8 lg:p-10 rounded-2xl border border-border bg-card">
                <span className="text-[11px] font-semibold tracking-widest uppercase text-primary">{m.tag}</span>
                <h3 className="text-2xl font-semibold text-foreground mt-3 mb-4">{m.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">{m.body}</p>
                <ul className="space-y-2.5 border-t border-border pt-6">
                  {m.facts.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The five cost drivers (chart + columns) ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={driversRef} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${driversVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">What moves the number</span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">Five variables that set the price</h2>
              <p className="text-base text-muted-foreground leading-relaxed max-w-md">
                Two campaigns with the same budget can buy very different results. These five variables decide which. The bars show directional price pressure, not a rate card.
              </p>
            </div>
            <div className="space-y-6">
              {drivers.map((d) => (
                <div key={d.term}>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-sm font-semibold text-foreground">{d.term}</span>
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{d.weight >= 80 ? "High" : d.weight >= 60 ? "Med-High" : "Medium"}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary/80" style={{ width: `${d.weight}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-2">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Seasonality (column chart, full width) ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={seasonRef} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${seasonVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Timing is a discount</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">The same audience costs less in Q1</h2>
            <p className="text-base text-muted-foreground leading-relaxed mt-4">
              Inventory tightens around game launches and the holidays. Q1 and Q2 are the best-value windows of the year; Q4 runs at a premium. Directional, not to scale.
            </p>
          </div>
          {/* Bars are DIRECT children of the fixed-height row so their % height
              resolves against a definite-height parent. Labels sit in a matched
              row below. */}
          <div className="flex items-end gap-2 sm:gap-4 h-56">
            {season.map((s) => (
              <div
                key={s.m}
                className={`flex-1 rounded-t-md ${s.v >= 90 ? "bg-primary" : "bg-primary/25"}`}
                style={{ height: `${s.v}%` }}
                aria-label={`${s.m}: directional price ${s.v}`}
              />
            ))}
          </div>
          <div className="flex gap-2 sm:gap-4 mt-3">
            {season.map((s) => (
              <span key={s.m} className="flex-1 text-center text-[10px] sm:text-xs text-muted-foreground">{s.m}</span>
            ))}
          </div>
          <div className="flex items-center gap-6 mt-6 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-primary/25" /> Value window</span>
            <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-primary" /> Peak season</span>
          </div>
        </div>
      </section>

      {/* ── Proof band (full-width dark: real results + real creative) ── */}
      <section ref={proofRef} className={`py-20 md:py-28 border-t border-border transition-all duration-700 ${proofVisible ? "opacity-100" : "opacity-0"}`} style={{ background: "hsl(240 11% 5%)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">What the spend delivers</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white">
              The number only matters next to the outcome
            </h2>
            <p className="text-base text-white/60 leading-relaxed mt-4">
              Verified results from real Nordic campaigns. This is what the budget actually bought.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px border border-white/10 rounded-2xl overflow-hidden bg-white/10 mb-8">
            {proof.map((p) => (
              <Link key={p.brand} to={p.href} className="group bg-black/40 backdrop-blur-sm px-6 py-7 hover:bg-black/20 transition-colors">
                <div className="flex items-center justify-between mb-5 h-6">
                  <img src={p.logo} alt={p.brand} className="h-5 w-auto object-contain opacity-70" style={{ filter: "brightness(0) invert(1)" }} />
                  <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-primary transition-colors" />
                </div>
                <div className="text-3xl font-bold text-white tracking-tight">{p.metric}</div>
                <div className="text-xs text-white/50 mt-1">{p.label}</div>
                <div className="text-xs text-primary mt-3">{p.extra}</div>
              </Link>
            ))}
          </div>

          {/* Real overlay creative */}
          <div className="grid lg:grid-cols-2 gap-10 items-center pt-8">
            <div className="rounded-2xl overflow-hidden bg-black ring-1 ring-white/10">
              <video
                src="/lovable-uploads/overlay-samsung.webm"
                autoPlay loop muted playsInline preload="metadata"
                className="w-full h-auto"
                aria-label="A native branded overlay ad rendered live inside a Twitch stream"
              />
            </div>
            <div>
              <h3 className="text-2xl font-light tracking-tight text-white mb-4">This is the format you're paying for</h3>
              <p className="text-base text-white/60 leading-relaxed mb-6">
                Not a pre-roll the viewer skips or an ad blocker strips out. A branded overlay rendered inside the live stream, present through a 90-minute session, impossible to block because it is part of the broadcast feed.
              </p>
              <Link to="/twitch-advertising" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                How the formats work <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Nordic premium (two-column) ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={nordicRef} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${nordicVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">The Nordic premium</span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
                Why Nordic campaigns price differently, and why that's fine
              </h2>
            </div>
            <div className="space-y-5 text-base font-light leading-relaxed text-muted-foreground lg:pt-2">
              <p>
                Nordic audiences carry some of the highest purchasing power and digital purchase intent in Europe. Reaching them specifically is worth more to every advertiser bidding on that inventory, so it prices at a premium. That premium is justified precisely because your competitors pay it: opting out isn't a saving, it's ceding the audience.
              </p>
              <p>
                The practical constraint is supply. Nordic-language streamers are a small, concentrated slice of global Twitch inventory but an outsized share of value for brands targeting local markets. Getting that targeting right takes market-specific creator data, which is exactly the gap a Nordic partner exists to close.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What to bring (4-column steps) ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={bringRef} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${bringVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Getting a real number</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">Four things to bring, and you'll get a straight answer</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {bring.map((b, i) => (
              <div key={b.step} className="relative">
                {i < bring.length - 1 && <div className="hidden md:block absolute top-4 left-full w-full h-px bg-border -translate-x-4" />}
                <div className="text-4xl font-bold text-primary/15 mb-4 tracking-tighter">{b.step}</div>
                <h3 className="text-base font-semibold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default TwitchAdvertisingCost;
