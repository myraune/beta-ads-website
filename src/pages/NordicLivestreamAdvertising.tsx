import React from "react";
import { Link } from "react-router-dom";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MascotBand } from "@/components/sections/MascotBand";


// Scope is stated on every label on purpose. "105M monthly Twitch viewers" is a
// GLOBAL figure, and sitting unlabelled beside a Nordic stat on a page titled
// "Nordic Livestream Advertising" it read as 105M Nordic viewers, which is
// impossible: the whole Nordic region is about 27 million people.
const heroStats = [
  { value: "105M", label: "Twitch viewers monthly, global" },
  { value: "72%", label: "of them aged 16 to 34, global" },
  { value: "3.4M", label: "Nordic stream hours / yr" },
  { value: "<5%", label: "of ad budgets go here" },
];

// Platform hours watched, 2025 full year (Stream Hatchet Yearly report). Billions.
const platforms = [
  { name: "Twitch", value: 19.2, display: "19.2B", note: "largest, but declining", accent: true },
  { name: "YouTube Gaming", value: 8.8, display: "8.8B", note: "record year" },
  { name: "Kick", value: 4.5, display: "4.5B", note: "up 131% year over year" },
];
const platformMax = 19.2;

// Nordic Twitch inventory, streamed hours per year (SullyGnome, July 2026 snapshot).
const nordic = [
  { lang: "Finnish", value: 1.142, display: "1.14M" },
  { lang: "Swedish", value: 1.133, display: "1.13M" },
  { lang: "Danish", value: 0.691, display: "691K" },
  { lang: "Norwegian", value: 0.504, display: "504K" },
];
const nordicMax = 1.142;

// Real, verified Beta Ads Nordic campaigns (from the case studies on this site).
const proof = [
  { brand: "Samsung", logo: "/lovable-uploads/logo-samsung.png", metric: "500,131", label: "completed views", extra: "43 Norwegian streamers", video: "/lovable-uploads/overlay-samsung.webm", href: "/case-study/samsung" },
  { brand: "Shure", logo: "/lovable-uploads/logo-shure.png", metric: "9.12%", label: "peak-day CTR", extra: "182,554 views", video: "/lovable-uploads/overlay-shure-gca.webm", href: "/case-study/shure" },
  { brand: "Komplett", logo: "/lovable-uploads/logo-komplett.png", metric: "151,278", label: "display views", extra: "1.17% CTR, 34 streamers", video: "/lovable-uploads/overlay-komplett.webm", href: "/case-study/komplett" },
  { brand: "Surfshark", logo: "/lovable-uploads/logo-surfshark.png", metric: "119,041", label: "live views in Finland", extra: "1.08% CTR, 2,833 poll votes", video: "/lovable-uploads/case-surfshark-finland/overlay-animation.webm", href: "/case-study/surfshark-finland" },
];

const steps = [
  { step: "01", title: "The brief", desc: "Your goal, market and budget bracket. We tell you honestly whether the format fits before anyone spends." },
  { step: "02", title: "The match", desc: "We filter 39,000+ creators in our Streamer Explorer database by category, language and verified CTR history, then you approve the shortlist." },
  { step: "03", title: "The overlay", desc: "We produce the creative and it renders natively in each stream through OBS. No pre-roll, no pop-up, no ad-block." },
  { step: "04", title: "The proof", desc: "Real-time views, verified CTR and clip verification, broken down by streamer and day. Not a screenshot, a receipt." },
];

const NordicLivestreamAdvertising: React.FC = () => {
  const audRef = useScrollAnimation();
  const platRef = useScrollAnimation();
  const nordRef = useScrollAnimation();
  const overlayRef = useScrollAnimation();
  const gapRef = useScrollAnimation();
  const proofRef = useScrollAnimation();
  const stepRef = useScrollAnimation();

  return (
    <MarketingPageLayout
      seo={{
        title: "Nordic Livestream Advertising: Brand Field Guide | Beta Ads",
        description:
          "Who is watching, which platforms matter, what Nordic inventory exists and what native overlay campaigns deliver. A field guide with real campaign results.",
        canonical: "/nordic-livestream-advertising",
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "The Nordic Livestream Advertising Landscape in 2026",
            author: { "@type": "Organization", name: "Beta Ads" },
            publisher: { "@type": "Organization", name: "Beta Ads", logo: { "@type": "ImageObject", url: "https://beta-ads.no/brand/beta-ads-logo-512.png" } },
            datePublished: "2026-07-13",
          },
        ],
      }}
      cta={{
        heading: "Put your brand inside the stream",
        subtext: "Tell us your market and goal. We will tell you honestly whether native livestream advertising fits, and what it would take.",
        primaryLabel: "Book a demo",
        primaryHref: "/contact",
        secondaryLabel: "See what it costs",
        secondaryHref: "/twitch-advertising-cost",
      }}
    >
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-foreground/[0.04] text-foreground backdrop-blur-sm mb-7">
              Field guide, 2026
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.04] mb-6 tracking-tight">
              The Nordic audience nobody
              <br />
              <span className="hl">else can reach.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl">
              Young, engaged, ad-block-proof, and watching millions of hours of Nordic streaming a year. Here is who the global Twitch audience is, what the Nordic slice of it looks like, and what a native campaign actually delivers.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-12">
                  Book a demo <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/twitch-advertising-cost">
                <Button size="lg" variant="ghost" className="text-foreground hover:bg-foreground/[0.06] rounded-full px-8 h-12 border border-border">
                  What it costs
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-16 border border-border rounded-2xl overflow-hidden bg-border">
            {heroStats.map((s) => (
              <div key={s.label} className="bg-card backdrop-blur-sm px-6 py-6">
                <div className="text-3xl font-bold text-foreground tracking-tight">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The audience ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={audRef.ref} className={`max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${audRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="max-w-xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3 block">Who is watching</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-5">
              The hardest audience in media to reach anywhere else
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-4">
              Twitch draws 105 million average monthly visitors worldwide, and 70% of them are between 18 and 34, per Amazon Ads' own Twitch advertising figures. GWI puts the audience at roughly 72% aged 16 to 34, two thirds male, and over-indexing the top 10% of income earners worldwide.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              The number that matters most: 65% of Twitch viewers cannot be reached on leading social channels (GWI, cited by Amazon Ads). This is not an audience you are already buying somewhere cheaper.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-px border border-border rounded-2xl overflow-hidden bg-border">
            {[
              { v: "105M", l: "avg monthly visitors, worldwide", s: "Amazon Ads" },
              { v: "70%", l: "of them aged 18 to 34", s: "Amazon Ads" },
              { v: "65%", l: "unreachable on social", s: "GWI" },
              { v: "72%", l: "of them aged 16 to 34", s: "GWI" },
            ].map((x) => (
              <div key={x.l} className="bg-card px-7 py-8">
                <div className="text-4xl font-bold tracking-tight text-foreground">{x.v}</div>
                <div className="text-sm text-muted-foreground mt-1">{x.l}</div>
                <div className="text-[11px] text-muted-foreground mt-3 uppercase tracking-wider">{x.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The platforms ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={platRef.ref} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${platRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3 block">Where they watch</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">Three platforms, 36.4 billion hours</h2>
            <p className="text-base text-muted-foreground leading-relaxed mt-4">
              Live streaming had a real year in 2025: 36.4 billion hours watched across the major platforms, up 6%, per Stream Hatchet. Twitch is still the centre of gravity, but Kick's growth is the fastest of any platform.
            </p>
          </div>
          <div className="space-y-7 max-w-4xl">
            {platforms.map((p) => (
              <div key={p.name}>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-base font-semibold text-foreground">{p.name}</span>
                  <span className="text-sm text-muted-foreground">{p.display} hours <span className="text-muted-foreground">· {p.note}</span></span>
                </div>
                <div className="h-4 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full ${p.accent ? "bg-primary" : "bg-foreground/25"}`} style={{ width: `${Math.round((p.value / platformMax) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-8 text-xs text-muted-foreground">
            <img src="/lovable-uploads/icon-streamhatchet.png" alt="Stream Hatchet" className="h-4 w-auto opacity-60" />
            Source: Stream Hatchet 2025 Yearly Live Streaming Trends Report (hours watched, full year 2025).
          </div>
        </div>
      </section>

      {/* ── Nordic inventory ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={nordRef.ref} className={`max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-16 items-center transition-all duration-700 ${nordRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="max-w-md">
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3 block">The Nordic inventory</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-5">3.4 million hours of Nordic Twitch a year</h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              This is the supply a Nordic campaign draws from: streamed hours per year by language, snapshotted from SullyGnome. Finnish and Swedish lead, but Norwegian and Danish carry the highest CPMs and the least competition.
            </p>
          </div>
          <div className="space-y-6">
            {nordic.map((n) => (
              <div key={n.lang}>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-base font-medium text-foreground">{n.lang}</span>
                  <span className="text-sm font-semibold text-foreground tabular-nums">{n.display}</span>
                </div>
                <div className="h-4 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${Math.round((n.value / nordicMax) * 100)}%` }} />
                </div>
              </div>
            ))}
            <p className="text-xs text-muted-foreground pt-2">
              SullyGnome, July 2026 snapshot. Streamed hours (supply), not hours watched.
            </p>
          </div>
        </div>
      </section>

      {/* ── The overlay in action ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={overlayRef.ref} className={`max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${overlayRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl bg-black aspect-video">
            <video
              src="/lovable-uploads/overlay-samsung.webm"
              autoPlay loop muted playsInline
              className="w-full h-full object-cover"
            />
            <span className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-white" /> Live
            </span>
          </div>
          <div className="max-w-xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3 block">The format</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-5">The ad renders inside the stream</h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-4">
              That is a real Beta Ads overlay for the Samsung Galaxy S25 Ultra, running natively in a Norwegian Twitch stream. It is drawn into the video feed through OBS, so ad-block software has nothing to detect and nothing to remove.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              That matters because ad blockers strip pre-rolls. An overlay rendered inside the stream can't be blocked, so it is one of the few formats this audience does not, and cannot, skip.
            </p>
          </div>
        </div>
      </section>

      {/* ── The opportunity ── */}
      <section className="py-24 md:py-32 border-t border-border bg-foreground text-background">
        <div ref={gapRef.ref} className={`max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-12 items-center transition-all duration-700 ${gapRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-[120px] md:text-[180px] font-bold leading-none tracking-tighter text-background">
            &lt;5<span className="text-[0.5em] align-top">%</span>
          </div>
          <div className="max-w-lg">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-5">of media budgets reach an audience this size</h2>
            <p className="text-base text-background/70 leading-relaxed">
              Gaming and live streaming still take less than 5% of overall media investment, per eMarketer data cited in Dentsu's 2025 Gaming Trends Report, despite reaching billions of hours of the exact demographic brands say they want. That gap is the entire opportunity, and it closes a little every quarter.
            </p>
          </div>
        </div>
      </section>

      {/* ── Proof: real Nordic campaigns ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={proofRef.ref} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${proofRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3 block">Proof, not promises</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">What it delivers in the Nordics</h2>
            <p className="text-base text-muted-foreground leading-relaxed mt-4">
              Beta Ads has run 29 campaigns with full reports, picking creators from 39,000+ in our Streamer Explorer. The numbers below come from real streams, and each one links to the full case study.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {proof.map((p) => (
              <Link key={p.brand} to={p.href} className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
                <div className="relative aspect-video bg-black overflow-hidden">
                  <video src={p.video} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90" />
                </div>
                <div className="p-6">
                  <img src={p.logo} alt={p.brand} className="h-5 w-auto object-contain mb-5 opacity-80" style={{ filter: "brightness(0) invert(0.75)" }} />
                  <div className="text-3xl font-bold tracking-tight text-foreground">{p.metric}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{p.label}</div>
                  <div className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border flex items-center justify-between">
                    {p.extra}
                    <ArrowUpRight className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 max-w-2xl">
            <div className="flex items-start gap-4 p-6 rounded-2xl border border-border bg-card">
              <div className="text-3xl font-bold text-primary tracking-tight shrink-0">44%</div>
              <p className="text-sm text-muted-foreground leading-relaxed">of Twitch viewers have bought a product a streamer they watch recommended (Twitch RPG survey, US, Feb 2023).</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How a brand enters ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div ref={stepRef.ref} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${stepRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3 block">How it works</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">From brief to broadcast, managed end to end</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={s.step} className="relative">
                {i < steps.length - 1 && <div className="hidden md:block absolute top-4 left-full w-full h-px bg-border -translate-x-4" />}
                <div className="text-4xl font-light text-head-light mb-4 tracking-tighter">{s.step}</div>
                <h3 className="text-base font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Beta ── */}
      <MascotBand
        src="/lovable-uploads/beta-mascot-onair.jpg"
        alt="Beta, the Beta Ads mascot, live at a broadcast desk under an on-air sign"
        variant="scene"
        eyebrow="Who is buying this"
        heading="Under 5 percent of Nordic ad budgets reach here"
        body="Nordic viewers spend millions of hours a year in livestreams, and the money has not followed. That gap is the whole opportunity: the audience is already assembled and almost nobody is competing for the one format they do not skip."
        points={[
            "Native integrations run in Norway, Sweden, Denmark and Finland",
            "Chat is tracked in the original language and shown in English too",
            "One campaign can span channels across all four markets",
          ]}
        cta={{ label: "See what the chat said", to: "/livestream-chat-engagement" }}
        flip={false}
      />

    </MarketingPageLayout>
  );
};

export default NordicLivestreamAdvertising;
