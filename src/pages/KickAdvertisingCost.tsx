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
    tag: "Emerging",
    title: "Programmatic & display",
    body: "Kick's own ad stack is young. There is no mature self-serve exchange yet, and the display and video inventory that does exist is thin and priced case by case rather than by open auction.",
    facts: [
      "No public CPM, and no advertiser self-serve portal",
      "Kick's own ads are still in testing (per its CEO, 2026)",
      "Not yet a reliable at-scale reach buy",
    ],
  },
  {
    tag: "Negotiated",
    title: "Creator integrations",
    body: "The real way onto Kick today is a direct deal with a streamer: a flat fee for a defined deliverable. An overlay for a set duration, a dedicated segment, clip and VOD rights.",
    facts: [
      "Priced by concurrent viewership and fit",
      "The primary route brands actually use on Kick",
      "Best for credibility and conversion intent",
    ],
  },
];

const drivers = [
  { term: "Category", weight: 92, desc: "Just Chatting, IRL and the gambling/slots verticals draw very different audiences and advertiser demand. Category sets both reach and brand-safety fit." },
  { term: "Audience geography", weight: 86, desc: "Reaching high-value Nordic viewers specifically costs more than broad global impressions, because that audience is worth more to everyone bidding on it." },
  { term: "Seasonality", weight: 74, desc: "Inventory and attention shift around game launches and major events. Streaming activity is softest in the Apr to Jul window and steadier in fall and winter." },
  { term: "Creator tier", weight: 58, desc: "Rates track concurrent viewership, but not linearly. Mid-tier creators often deliver the best efficiency for a focused Nordic audience." },
  { term: "Format", weight: 52, desc: "A persistent overlay, a one-off mention and a full sponsored segment are priced very differently for the same creator." },
];

// Real, verified Beta Ads campaign outcomes (Nordic native campaigns).
const proof = [
  { brand: "Samsung", logo: "/lovable-uploads/logo-samsung.png", metric: "500,131", label: "completed views", extra: "2.93% avg CTR", href: "/case-study/samsung" },
  { brand: "Shure", logo: "/lovable-uploads/logo-shure.png", metric: "9.12%", label: "peak-day CTR", extra: "182,554 views", href: "/case-study/shure" },
  { brand: "NKI", logo: "/lovable-uploads/logo-nki.svg", metric: "220,003", label: "completed views", extra: "1,595 clicks", href: "/case-study/nki" },
  { brand: "Komplett", logo: "/lovable-uploads/logo-komplett.png", metric: "151,278", label: "display views", extra: "1.17% CTR", href: "/case-study/komplett" },
];

const directBuy: {
  tag: string;
  title: string;
  highlight: boolean;
  facts: string[];
  link?: { href: string; label: string };
}[] = [
  {
    tag: "Kick, direct",
    title: "Easygo",
    highlight: false,
    facts: [
      "As of mid-2026 Kick's CEO says ads are still in testing and not yet sold to sponsors",
      "No self-serve platform, no rate card, no advertiser portal",
      "The only route onto Kick is a negotiated creator sponsorship",
    ],
  },
  {
    tag: "Twitch, direct",
    title: "Amazon Ads",
    highlight: false,
    facts: [
      "Self-serve exists for standard display and programmatic video",
      "But Amazon's Streaming TV and DSP products carry a $10,000 self-serve / $50,000 managed minimum",
      "Premium placements are quote-only, no public price",
    ],
    link: { href: "/twitch-advertising-cost", label: "What Twitch advertising costs" },
  },
  {
    tag: "Either platform",
    title: "Managed with Beta Ads",
    highlight: true,
    facts: [
      "No five-figure platform minimum to clear",
      "One transparently-quoted engagement across Kick and Twitch",
      "Native overlay and creator integration handled end to end",
    ],
  },
];

const bring = [
  { step: "01", title: "The goal", desc: "Awareness, consideration or a measurable action. It changes both the format and the budget shape." },
  { step: "02", title: "The market", desc: "Which of Norway, Sweden, Denmark or Finland, and in which language. Nordic targeting is the whole point." },
  { step: "03", title: "A budget bracket", desc: "Not a final number, a range. It tells us whether to scope a test, an always-on program or an integrated campaign." },
  { step: "04", title: "A timeline", desc: "A launch window lets us tell you honestly whether it lands in a premium or a value period." },
];

const KickAdvertisingCost: React.FC = () => {
  const { ref: modelsRef, isVisible: modelsVisible } = useScrollAnimation();
  const { ref: driversRef, isVisible: driversVisible } = useScrollAnimation();
  const { ref: growthRef, isVisible: growthVisible } = useScrollAnimation();
  const { ref: proofRef, isVisible: proofVisible } = useScrollAnimation();
  const { ref: nordicRef, isVisible: nordicVisible } = useScrollAnimation();
  const { ref: bringRef, isVisible: bringVisible } = useScrollAnimation();

  return (
    <MarketingPageLayout
      seo={{
        title: "What Does Kick Advertising Cost? | Beta Ads",
        description:
          "Kick has no public rate card, and as of 2026 no self-serve ad platform at all. Here is how Kick advertising is actually priced in the Nordics, what it costs to buy direct, and how to get a real quote.",
        canonical: "/kick-advertising-cost",
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://beta-ads.no/kick-advertising-cost#service",
            name: "Kick Advertising - Beta Ads",
            serviceType: "Native Livestream Advertising",
            description:
              "Managed Kick advertising campaigns across Nordic streamers, priced per campaign by category, geography, seasonality, creator tier and format.",
            provider: { "@id": "https://beta-ads.no/#organization" },
            areaServed: ["Norway", "Sweden", "Denmark", "Finland"],
            url: "https://beta-ads.no/kick-advertising-cost",
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://beta-ads.no/" },
              { "@type": "ListItem", position: 2, name: "What Does Kick Advertising Cost?", item: "https://beta-ads.no/kick-advertising-cost" },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: "How much does Kick advertising cost?", acceptedAnswer: { "@type": "Answer", text: "For a managed Nordic campaign, Beta Ads runs at a blended effective CPM of roughly 200 to 300 NOK per thousand verified impressions, the same as on Twitch. Kick itself publishes no rate card. Cost depends on the creator, the category, the audience geography, timing and format, and the practical route is a negotiated creator integration rather than a platform buy." } },
              { "@type": "Question", name: "Can you buy Kick ads directly?", acceptedAnswer: { "@type": "Answer", text: "Not really, not yet. As of mid-2026 Kick's co-founder has said the platform is still testing ads and is not yet selling to sponsors. There is no self-serve advertiser platform, no rate card and no advertiser portal. The only working route onto Kick today is a negotiated sponsorship with a creator." } },
              { "@type": "Question", name: "Does Kick have a published ad rate card?", acceptedAnswer: { "@type": "Answer", text: "No. Kick has never published a CPM, rate card or minimum spend for advertisers. Any Kick CPM figure circulating online is a third-party estimate, and the sources that publish them say so themselves." } },
            ],
          },
        ],
      }}
      cta={{
        heading: "Want an honest number?",
        subtext: "Kick won't quote you and there's no self-serve portal to price it yourself. Tell us your goal, market and timeline and we'll tell you plainly what a Kick campaign costs to run well.",
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
              <img src="/lovable-uploads/platform-kick.png" alt="Kick" className="h-3.5 w-auto" />
              Kick Advertising Cost
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
              What Kick advertising{" "}
              <span style={serifFont} className="italic font-normal">actually</span> costs
            </h1>
            <p className="text-lg text-white/65 leading-relaxed mb-10 max-w-lg">
              Kick has no rate card, and as of 2026 no self-serve ad platform at all. Here is how it's really priced in the Nordics, what "direct" would even mean, and how to get a real quote.
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

      {/* ── The honest opening (two-column) ── */}
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
                Blended effective CPM for a managed Nordic campaign, per 1,000 verified impressions, the same range we run on Twitch.
              </div>
            </div>
          </div>
          <div className="space-y-5 text-base md:text-lg font-light leading-relaxed text-muted-foreground lg:pt-3">
            <p>
              Kick is the harder platform to price, because Kick itself won't price it. There is no rate card, and, as its own co-founder confirmed in 2026, no self-serve ad platform yet. The practical route onto Kick is a negotiated creator deal.
            </p>
            <p>
              What that costs is driven by the same things a Twitch campaign is: the creator, the category, the audience you're reaching, the timing and the format. Run through us as a managed Nordic campaign, it lands in the same effective CPM band, without a platform minimum to clear.
            </p>
          </div>
        </div>
      </section>

      {/* ── The two pricing routes ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={modelsRef} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${modelsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">How it's priced</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">Two routes onto Kick, one that actually works today</h2>
            <p className="text-base text-muted-foreground leading-relaxed mt-4">Kick's own ad stack isn't ready yet, so in practice one of these does the work.</p>
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

      {/* ── Why Kick now (real milestone) ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={growthRef} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${growthVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Why Kick, why now</span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">
                The audience arrived before the ad platform did
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed max-w-md mb-5">
                Kick crossed 100 million registered users, one of the fastest audience build-outs streaming has seen, while its advertising stack is still in testing. That gap is the opportunity: real reach, and almost no brands there yet because there's no easy self-serve button to press.
              </p>
              <p className="text-xs text-muted-foreground/70 leading-relaxed max-w-md">
                100 million users per Kick's own 2026 announcement. Getting onto that audience today takes creator relationships, not a media-buying console.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-10 lg:p-12">
              <div className="text-6xl md:text-7xl font-bold text-primary tracking-tight leading-none">100M+</div>
              <div className="text-sm text-muted-foreground mt-4">registered Kick users, and counting</div>
              <div className="mt-8 pt-8 border-t border-border">
                <div className="text-2xl font-semibold text-foreground">Testing</div>
                <div className="text-sm text-muted-foreground mt-1">the current state of Kick's own ad platform (per its CEO, 2026)</div>
              </div>
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
              Verified results from real Beta Ads Nordic campaigns. The same native format runs on Kick.
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

          <div className="grid lg:grid-cols-2 gap-10 items-center pt-8">
            <div className="rounded-2xl overflow-hidden bg-black ring-1 ring-white/10">
              <video
                src="/lovable-uploads/overlay-samsung.webm"
                autoPlay loop muted playsInline preload="metadata"
                className="w-full h-auto"
                aria-label="A native branded overlay ad rendered live inside a stream"
              />
            </div>
            <div>
              <h3 className="text-2xl font-light tracking-tight text-white mb-4">This is the format you're paying for</h3>
              <p className="text-base text-white/60 leading-relaxed mb-6">
                Not a pre-roll the viewer skips or an ad blocker strips out. A branded overlay rendered inside the live stream, present through the whole session, impossible to block because it is part of the broadcast feed.
              </p>
              <Link to="/kick-advertising" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                How Kick advertising works <ArrowRight className="w-3.5 h-3.5" />
              </Link>
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
              On Kick, not yet. Here is what "direct" actually means on each platform.
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
            Sources: Kick co-founder statements to Digiday (2023) and win.gg (2026) confirming Kick is still testing ads and not yet selling to sponsors; Amazon Ads product pages (Streaming TV ads, Amazon DSP) for Twitch's published minimums. No public CPM rate card exists for either platform, which is why none is quoted here.
          </p>
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
                Nordic audiences carry some of the highest purchasing power and digital purchase intent in Europe. Reaching them specifically is worth more to every advertiser, so it prices at a premium. That premium is justified precisely because your competitors pay it: opting out isn't a saving, it's ceding the audience.
              </p>
              <p>
                The practical constraint is supply. Nordic-language streamers are a small, concentrated slice of any platform's inventory but an outsized share of value for brands targeting local markets. Getting that targeting right takes market-specific creator data, which is exactly the gap a Nordic partner exists to close.
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

export default KickAdvertisingCost;
