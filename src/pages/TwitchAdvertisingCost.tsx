import React from "react";
import { Link } from "react-router-dom";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight } from "lucide-react";
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

const drivers = [
  { term: "Category", desc: "Just Chatting and major esports draw broad, brand-safe audiences that many advertisers compete for, pushing demand up. Niche or mature-rated categories cost less but reach less." },
  { term: "Audience geography", desc: "Reaching high-value Nordic viewers specifically costs more than buying broad global impressions, because the audience is worth more to every advertiser bidding on it." },
  { term: "Seasonality", desc: "Q4, major game launches and big esports moments tighten inventory and lift prices. Q1 and Q2 are the best-value windows of the year." },
  { term: "Creator tier", desc: "Rates track concurrent viewership, but not linearly. Mid-tier creators often deliver the best efficiency for a focused Nordic audience versus top-tier generalists." },
  { term: "Format", desc: "A persistent overlay, a one-off mention and a full sponsored segment are priced very differently for the same creator. What you ask for sets the number as much as who you ask." },
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
              { "@type": "Question", name: "Is there a published Twitch ad rate card?", acceptedAnswer: { "@type": "Answer", text: "No. Amazon Ads, which runs Twitch's ad exchange, does not post a public rate card. Its self-serve video tier has no minimum spend, and larger buys are quoted by an account executive. The CPM itself moves in real time based on auction demand, which is why every 'average Twitch CPM' figure online disagrees with the next." } },
              { "@type": "Question", name: "What is the difference between CPM buys and creator integrations?", acceptedAnswer: { "@type": "Answer", text: "CPM programmatic and overlay ads are bought per thousand impressions by auction, filling a budget across eligible inventory. Flat-fee creator integrations are negotiated directly with a streamer for a defined deliverable, priced by their concurrent viewership and fit rather than by an exchange. Most effective campaigns combine both." } },
              { "@type": "Question", name: "Why do Nordic Twitch campaigns cost differently?", acceptedAnswer: { "@type": "Answer", text: "Nordic audiences carry high purchasing power, so reaching them specifically is worth more to every advertiser bidding on that inventory. At the same time Nordic-language streamers are a small, concentrated slice of global inventory, so precise targeting requires market-specific creator data rather than broad global buys." } },
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

          {/* Stat strip */}
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

      {/* ── The honest opening ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">The honest answer</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">
            Nobody publishes a price, and that's not evasion
          </h2>
          <p className="text-base md:text-lg font-light leading-relaxed text-muted-foreground">
            If you searched for a straight "Twitch ads price," here it is up front: there isn't one. Amazon Ads, which runs Twitch's ad exchange, doesn't post a rate card. Its advertiser guides route standard video buys to a self-serve entry point and send anything larger to an account executive for a negotiated quote. That reflects how the pricing actually works. Two genuinely different products get sold under the same "Twitch advertising" label, priced by different mechanics, and both move on category, geography, timing and who is on stream.
          </p>
        </div>
      </section>

      {/* ── The two pricing models ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={modelsRef} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${modelsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">How it's priced</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
              Two products, two pricing mechanics
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mt-4">
              Confusing these is the single biggest reason people get surprised by a quote.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {models.map((m) => (
              <div key={m.title} className="p-8 rounded-2xl border border-border bg-card">
                <span className="text-[11px] font-semibold tracking-widest uppercase text-primary">{m.tag}</span>
                <h3 className="text-xl font-semibold text-foreground mt-3 mb-4">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{m.body}</p>
                <ul className="space-y-2.5">
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

      {/* ── The five cost drivers ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={driversRef} className={`max-w-4xl mx-auto px-6 lg:px-12 transition-all duration-700 ${driversVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="mb-12">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">What moves the number</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
              Five variables that set the price
            </h2>
          </div>
          <div>
            {drivers.map((d, i) => (
              <div key={d.term} className="grid md:grid-cols-[280px_1fr] gap-4 md:gap-10 py-7 border-t border-border first:border-t-0">
                <div className="flex items-baseline gap-4">
                  <span className="text-2xl font-light text-primary/30 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-lg font-semibold text-foreground">{d.term}</h3>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Nordic premium ── */}
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
                Nordic audiences carry some of the highest purchasing power and digital purchase intent in Europe. Reaching them specifically is worth more to every advertiser bidding on that inventory, so it prices at a premium. That premium is justified precisely because your competitors are willing to pay it: opting out isn't a saving, it's ceding the audience.
              </p>
              <p>
                The practical constraint is supply. Nordic-language streamers and Scandinavian esports communities are a small, concentrated slice of global Twitch inventory but an outsized share of value for brands targeting local markets. Getting that targeting right takes market-specific creator data, not a broad global buy, which is exactly the gap a Nordic partner exists to close.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What to bring for a real quote ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={bringRef} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${bringVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-3 block">Getting a real number</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
              Four things to bring, and you'll get a straight answer
            </h2>
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
