import React from "react";
import { Link } from "react-router-dom";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedShaderBackground from "@/components/ui/lazy-animated-background";

const serifFont = { fontFamily: "'Instrument Serif', serif" };

const stats = [
  { value: "200–300 kr", label: "Effective CPM" },
  { value: "2", label: "Pricing models" },
  { value: "5", label: "Cost drivers" },
  { value: "0", label: "Public rate cards" },
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

// Real Twitch hours streamed over the trailing 12 months, by Nordic broadcast
// language. Source: SullyGnome (sullygnome.com/channels?language=..), snapshot
// July 2026. Streamed hours (supply/inventory), not hours watched.
const inventory = [
  { lang: "Finnish", hours: 1142810, display: "1.14M" },
  { lang: "Swedish", hours: 1133250, display: "1.13M" },
  { lang: "Danish", hours: 690539, display: "691K" },
  { lang: "Norwegian", hours: 504216, display: "504K" },
];
const inventoryMax = 1142810;

// Buying direct vs through a managed agency. All figures verified from primary
// sources (Amazon Ads product pages; Kick CEO statements 2026). No CPM is
// stated because none is published for either platform.
const directBuy: {
  tag: string;
  title: string;
  highlight: boolean;
  facts: string[];
  link?: { href: string; label: string };
}[] = [
  {
    tag: "Twitch, direct",
    title: "Amazon Ads",
    highlight: false,
    facts: [
      "Self-serve exists for standard display and programmatic video",
      "But Amazon's Streaming TV and DSP products carry a $10,000 self-serve / $50,000 managed minimum",
      "Premium placements (homepage takeover, first-impression) are quote-only, no public price",
    ],
  },
  {
    tag: "Kick, direct",
    title: "Easygo",
    highlight: false,
    facts: [
      "As of mid-2026 Kick's CEO says ads are still in testing and not yet sold to sponsors",
      "No self-serve platform, no rate card, no advertiser portal",
      "The only route onto Kick is a negotiated creator sponsorship",
    ],
    link: { href: "/kick-advertising-cost", label: "What Kick advertising costs" },
  },
  {
    tag: "Either platform",
    title: "Managed with Beta Ads",
    highlight: true,
    facts: [
      "No five-figure platform minimum to clear",
      "One transparently-quoted engagement across Twitch and Kick",
      "Native overlay and creator integration handled end to end",
    ],
  },
];

// Real, verified campaign outcomes (from the case studies on this site).
const proof = [
  { brand: "Samsung", logo: "/lovable-uploads/logo-samsung.png", metric: "500,131", label: "completed views", extra: "2.93% avg CTR", href: "/case-study/samsung" },
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
        locale: "en",
        alternates: [
          { hreflang: "en", href: "/twitch-advertising-cost" },
          { hreflang: "no", href: "/twitch-annonsering-pris" },
          { hreflang: "x-default", href: "/twitch-advertising-cost" },
        ],
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
              { "@type": "Question", name: "How much does Twitch advertising cost?", acceptedAnswer: { "@type": "Answer", text: "For a managed Nordic campaign, Beta Ads runs at a blended effective CPM of roughly 200 to 300 NOK per thousand verified impressions, across overlay and creator formats. That is a premium to broad global display because it buys a high-value Nordic audience in a native format that completes and cannot be ad-blocked. Where a campaign lands in that range depends on five variables (category, audience geography, seasonality, creator tier and format) and on which of two pricing models you use." } },
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
              Here's the number you came for
            </h2>
            <div className="mt-10 pt-8 border-t border-border">
              <div className="text-6xl md:text-7xl font-bold text-primary tracking-tight leading-none">200–300 kr</div>
              <div className="text-sm text-muted-foreground mt-4 max-w-sm leading-relaxed">
                Blended effective CPM for a managed Nordic campaign, per 1,000 verified impressions, across overlay and creator formats.
              </div>
            </div>
          </div>
          <div className="space-y-5 text-base md:text-lg font-light leading-relaxed text-muted-foreground lg:pt-3">
            <p>
              You searched for a straight "Twitch ads price." Most of the industry won't give you one: Amazon Ads, which runs Twitch's ad exchange, doesn't post a rate card, and every "average CPM" online contradicts the next. So here is ours, plainly.
            </p>
            <p>
              That range sits at a premium to broad global display, and deliberately so. It buys a high-value Nordic audience in a native format that completes, isn't skipped, and can't be stripped by an ad blocker. Where a campaign lands inside it comes down to five variables, and to which of two pricing models you use.
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

      {/* ── The inventory / opportunity size (real SullyGnome data) ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={seasonRef} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${seasonVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">The size of the opportunity</span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">
                3.4 million hours of Nordic Twitch a year
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed max-w-md mb-5">
                That is how much gets streamed annually across the four Nordic languages, the inventory a campaign actually buys against. Finnish and Swedish each pass a million hours a year on their own.
              </p>
              <p className="text-xs text-muted-foreground/70 leading-relaxed max-w-md">
                Hours streamed on Twitch over the trailing 12 months, by broadcast language. Source: SullyGnome, snapshot July 2026. This is streamed hours (supply), not hours watched.
              </p>
            </div>
            <div className="space-y-6">
              {inventory.map((d) => (
                <div key={d.lang}>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-sm font-semibold text-foreground">{d.lang}</span>
                    <span className="text-lg font-bold text-foreground tabular-nums">{d.display}<span className="text-xs font-normal text-muted-foreground ml-1">hrs/yr</span></span>
                  </div>
                  <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary/80" style={{ width: `${Math.round((d.hours / inventoryMax) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
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

      {/* ── Buying direct vs managed ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Direct or managed</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">Can't you just buy it direct?</h2>
            <p className="text-base text-muted-foreground leading-relaxed mt-4">
              Sometimes, and it's worth knowing exactly what "direct" costs before you assume it's cheaper.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {directBuy.map((c) => (
              <div
                key={c.title}
                className={`p-8 rounded-2xl border ${c.highlight ? "border-primary/40 bg-primary/[0.03]" : "border-border bg-card"}`}
              >
                <span className="text-[11px] font-semibold tracking-widest uppercase text-primary">{c.tag}</span>
                <h3 className="text-xl font-semibold text-foreground mt-3 mb-5">{c.title}</h3>
                <ul className="space-y-3">
                  {c.facts.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80 leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                {c.highlight && (
                  <Link to="/contact" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-6">
                    Get a quote <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
                {c.link && (
                  <Link to={c.link.href} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-6">
                    {c.link.label} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground/60 leading-relaxed mt-8 max-w-3xl">
            Sources: Amazon Ads product pages (Streaming TV ads, Amazon DSP) for the published minimums; Kick co-founder statements to Digiday (2023) and win.gg (2026) confirming Kick is still testing ads and not yet selling to sponsors. No public CPM rate card exists for either platform, which is why none is quoted here.
          </p>
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
