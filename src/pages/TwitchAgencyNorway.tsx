import React from "react";
import { Link } from "react-router-dom";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedShaderBackground from "@/components/ui/lazy-animated-background";
import { MascotBand } from "@/components/sections/MascotBand";

/**
 * English twin of /twitch-byra-norge, targeting "twitch agency norway" and
 * "twitch agencies in Norway".
 *
 * Same reasoning as the Norwegian page: the agencies that get recommended for
 * this query have a URL and an H1 that restate it almost verbatim, and they say
 * "agency" and "Norway" repeatedly in the body. This is the version of that page
 * for buyers searching in English, which is most of the international brands and
 * media agencies who come to us.
 *
 * Deliberately NOT a translation. A Norwegian brand manager and a London media
 * planner are asking different questions, so the framing differs even though the
 * structure matches.
 *
 * Claims about other agencies come from their own websites and are attributed.
 * Numbers are ones the site already publishes.
 */

const serif = { fontFamily: "'Instrument Serif', serif" };

const heroStats = [
  { value: "39K+", label: "streamers in network" },
  { value: "4", label: "platforms" },
  { value: "0%", label: "blocked by adblock" },
  { value: "NO/SE/DK/FI", label: "markets covered" },
];

const agencyTypes = [
  {
    type: "Global influencer agency",
    source:
      "GOAT Agency describes itself as a global influencer marketing agency with offices in London and New York.",
    fits: "Multi-country campaigns where Norway is one market among many.",
    falls:
      "Norwegian creators become a line in a spreadsheet. You pay for an apparatus you use a fraction of.",
  },
  {
    type: "Nordic creator network",
    source:
      "Metapic positions itself as a gaming influencer marketing agency in Norway, with trackable links that show clicks and revenue.",
    fits: "Performance campaigns where clicks and conversions are the goal.",
    falls:
      "Built around link sharing and discount codes. Building the ad into the broadcast itself is rarely the core.",
  },
  {
    type: "Talent agency",
    source: "A talent agency represents a fixed roster of streamers and sells access to it.",
    fits: "You already know exactly which streamer you want.",
    falls: "You get the roster they have, not the one that fits the brief. The advice is rarely neutral.",
  },
  {
    type: "Native in-stream specialist",
    source: "This is what Beta Agency does.",
    fits:
      "You want to be inside the broadcast: overlay in the layout, chat command in the title, the streamer saying it in their own words.",
    falls: "Wrong choice if you just want a TikTok video or a discount code pushed to as many people as possible.",
  },
];

const checklist = [
  {
    q: "How many Norwegian streamers do you actually have, and who are they?",
    why: "A European creator network of hundreds of thousands says nothing about how many broadcast in Norwegian to Norwegians.",
  },
  {
    q: "Do you run inside the broadcast, or next to it?",
    why: "An overlay in the layout is not the same as a link in the description. Ask to see a recording.",
  },
  {
    q: "What happens to the campaign after the stream ends?",
    why: "The overlay is baked into the recording. An agency that does not count views after the broadcast is not counting half the campaign.",
  },
  {
    q: "How do you know the overlay was actually live?",
    why: "Ask to see the daily check: banner up, command in the title, streamer live, link tracked. Not a screenshot at the end.",
  },
  {
    q: "What did chat say?",
    why: "Chat is the most honest read you get on a sponsorship. An agency that does not read it is only reporting impressions.",
  },
  {
    q: "What is the agency fee, and what does the streamer get?",
    why: "Ask for the split. An agency that will not show you has a reason.",
  },
];

const process = [
  { step: "01", title: "We tell you if it does not fit", text: "Livestream is the wrong channel for some products. We say so before you spend, not after." },
  { step: "02", title: "Streamer selection", text: "Chosen on category, audience and how they actually talk, not a list sorted by follower count. Minimum five streamers per campaign." },
  { step: "03", title: "The ad is built into the broadcast", text: "Overlay in the layout, chat command in the title, a tracked link. Read live by the streamer in their own words." },
  { step: "04", title: "Checked daily, not in the final report", text: "Every channel verified while the campaign runs: banner up, command in the title, live, link pointing where it should." },
  { step: "05", title: "A report with chat in it", text: "Views live and after the broadcast, per channel, and what chat actually wrote, translated and scored by tone." },
];

const faq = [
  {
    q: "Are there Twitch agencies in Norway?",
    a: "A few, but very few that treat Twitch as their main channel. Most Norwegian options are influencer or content agencies that also take streaming work, or Nordic creator networks where Norway is one of several markets. Beta Agency AS is registered in Norway and runs native in-broadcast advertising as its core business.",
  },
  {
    q: "What does a Twitch campaign in Norway cost?",
    a: "Effective CPM on a Nordic campaign we run for you is typically around 200 to 300 NOK per 1,000 verified impressions. Price depends on how many channels are involved, how long the overlay stays up, and how narrowly the roster is selected. We run campaigns from five streamers upward.",
  },
  {
    q: "Why not just buy standard Twitch ads?",
    a: "Around 80% of Norwegians aged 18 to 34 run an adblocker, and pre-roll is the first thing to disappear. An overlay sits inside the video frame and is not blocked. It is also the format the audience accepts: 79% of Twitch viewers say they prefer ads that do not interrupt the stream.",
  },
  {
    q: "What is the difference between a Twitch agency and an influencer agency?",
    a: "An influencer agency usually sells a post or a video with a link beside it. A Twitch agency works inside a live broadcast that runs for hours: an overlay in the layout, chat responding in real time, and a recording that keeps collecting views after the stream ends.",
  },
  {
    q: "Can you run Norway on its own, or only the whole Nordics?",
    a: "Either. We work from Oslo, Stockholm and Helsinki and run campaigns in Norwegian, Swedish, Danish and Finnish. Norway can run alone or as part of a Nordic buy.",
  },
  {
    q: "How do I know the campaign ran as agreed?",
    a: "Every channel is checked daily while the campaign runs, and you see the result: which channels were set up correctly, which needed fixing, and what was done. The report shows views live and after the broadcast per channel, plus what chat wrote.",
  },
];

const TwitchAgencyNorway: React.FC = () => {
  const whatRef = useScrollAnimation();
  const typesRef = useScrollAnimation();
  const checkRef = useScrollAnimation();
  const procRef = useScrollAnimation();
  const priceRef = useScrollAnimation();

  return (
    <MarketingPageLayout
      seo={{
        title: "Twitch Agency in Norway | Beta Ads",
        description:
          "Beta Agency is a Norwegian Twitch agency running native advertising inside the broadcast. How to choose a Twitch agency in Norway, what it costs, and how the alternatives compare.",
        canonical: "/twitch-agency-norway",
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Beta Agency AS",
            alternateName: "Beta Ads",
            description:
              "Norwegian Twitch agency running native advertising inside live broadcasts on Twitch, Kick and YouTube Live.",
            url: "https://beta-ads.no/twitch-agency-norway",
            areaServed: [
              { "@type": "Country", name: "Norway" },
              { "@type": "Country", name: "Sweden" },
              { "@type": "Country", name: "Denmark" },
              { "@type": "Country", name: "Finland" },
            ],
            serviceType: [
              "Twitch agency",
              "Twitch advertising",
              "Livestream advertising",
              "Influencer marketing",
              "Native in-stream advertising",
            ],
            address: { "@type": "PostalAddress", addressCountry: "NO", addressLocality: "Oslo" },
            email: "andreas@beta-ads.no",
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Beta Ads", item: "https://beta-ads.no/" },
              { "@type": "ListItem", position: 2, name: "Twitch Agency in Norway", item: "https://beta-ads.no/twitch-agency-norway" },
            ],
          },
        ],
      }}
      cta={{
        heading: "Talk to a Norwegian Twitch agency",
        subtext:
          "Tell us the audience and the goal. We will tell you honestly whether Twitch fits, and what a Norwegian campaign would take.",
        primaryLabel: "Book a demo",
        primaryHref: "/contact",
        secondaryLabel: "See what it costs",
        secondaryHref: "/twitch-advertising-cost",
      }}
    >
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ background: "hsl(240 11% 5%)" }}>
        <AnimatedShaderBackground heightFactor={0.85} />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent z-[1] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/80 backdrop-blur-sm mb-7">
              Beta Agency AS · Registered in Norway · Org.nr 933 303 136
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
              Twitch agency
              <br />
              <span style={serif} className="italic font-normal">
                in Norway
              </span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-2xl">
              We are a Norwegian Twitch agency that works inside the broadcast. An overlay in the
              layout, a chat command in the title, and the streamer saying it in their own words.
              Not a pre-roll most of the audience blocks.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12">
                  Book a demo <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/case-studies">
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-white hover:bg-white/10 rounded-full px-8 h-12 border border-white/20"
                >
                  See campaigns we have run
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-20 border border-white/10 rounded-2xl overflow-hidden bg-white/10">
            {heroStats.map((s) => (
              <div key={s.label} className="bg-black/30 backdrop-blur-sm px-6 py-5">
                <div className="text-2xl font-bold text-white tracking-tight">{s.value}</div>
                <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What a Twitch agency does ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div
          ref={whatRef.ref}
          className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${
            whatRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
                The definition
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">
                What a Twitch agency actually does
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5 max-w-xl">
                A Twitch agency connects brands to streamers and builds the ad into the live
                broadcast. That is a different job from what a general influencer agency does,
                because the format is different: a stream runs for hours, chat answers in real time,
                and the recording keeps collecting views long after the streamer logs off.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                In Norway, very few agencies treat Twitch as their main channel. Most are influencer
                agencies that also take streaming work, or Nordic creator networks where Norway is
                one market among several.
              </p>
            </div>
            <div className="space-y-px rounded-2xl overflow-hidden border border-border">
              {[
                ["Selects streamers", "On category, audience and tone, not follower count."],
                ["Negotiates and contracts", "Fees, rights, exclusivity, brand safety."],
                ["Builds the ad itself", "Overlay, chat command, tracked link, a script the streamer makes their own."],
                ["Verifies it is live", "Daily, per channel, while the campaign runs."],
                ["Reports what happened", "Views live and after the broadcast, and what chat wrote."],
              ].map(([t, d]) => (
                <div key={t} className="bg-card px-6 py-5">
                  <h3 className="text-sm font-semibold text-foreground mb-1">{t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Four types ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div
          ref={typesRef.ref}
          className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${
            typesRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              The alternatives
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
              Four kinds of agency, and when each one is right
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              We are not right for everything. These are the four kinds of supplier a brand meets
              when buying Twitch in Norway, what each is good at, and where each falls short.
              Descriptions come from the companies' own sites.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {agencyTypes.map((a) => {
              const isUs = a.type === "Native in-stream specialist";
              return (
                <div
                  key={a.type}
                  className={`rounded-2xl border p-7 ${
                    isUs ? "border-primary/40 bg-primary/[0.03]" : "border-border bg-card"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4 mb-3">
                    <h3 className="text-base font-semibold text-foreground">{a.type}</h3>
                    {isUs && (
                      <span className="text-[10px] font-semibold tracking-widest uppercase text-primary shrink-0">
                        That is us
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground/70 mb-4">{a.source}</p>
                  <div className="space-y-3">
                    <div className="pl-4 border-l border-border">
                      <p className="text-xs font-semibold text-foreground mb-1">Fits when</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{a.fits}</p>
                    </div>
                    <div className="pl-4 border-l border-border">
                      <p className="text-xs font-semibold text-foreground mb-1">Falls short</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{a.falls}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Checklist ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div
          ref={checkRef.ref}
          className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${
            checkRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              Before you sign
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
              Six questions to ask any Twitch agency
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Ask us too. If our answers do not hold up, pick someone else.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {checklist.map((c, i) => (
              <div key={c.q} className="flex gap-4">
                <span className="text-2xl font-bold text-primary/20 tracking-tighter shrink-0 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-2">{c.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div
          ref={procRef.ref}
          className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${
            procRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              How we work
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
              From brief to report
            </h2>
          </div>
          <div className="grid md:grid-cols-5 gap-8">
            {process.map((p, i) => (
              <div key={p.step} className="relative">
                {i < process.length - 1 && (
                  <div className="hidden md:block absolute top-4 left-full w-full h-px bg-border -translate-x-4" />
                )}
                <div className="text-4xl font-bold text-primary/15 mb-4 tracking-tighter">{p.step}</div>
                <h3 className="text-base font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Price ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div
          ref={priceRef.ref}
          className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${
            priceRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
                Price
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">
                What a Twitch agency costs in Norway
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-4 max-w-xl">
                Effective CPM on a Nordic campaign we run for you is typically{" "}
                <strong className="text-foreground">200 to 300 NOK</strong> per 1,000 verified
                impressions. We run from five streamers upward.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed max-w-xl mb-7">
                Price depends on how many channels are involved, how long the overlay stays up, and
                how narrowly the roster is selected. Always ask for the split between agency fee and
                what the streamer actually receives.
              </p>
              <Link
                to="/twitch-advertising-cost"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                See the full pricing breakdown
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8">
              <h3 className="text-sm font-semibold text-foreground mb-5">
                Why overlay and not pre-roll
              </h3>
              <div className="space-y-5">
                {[
                  ["80%", "of Norwegians aged 18 to 34 run an adblocker. Pre-roll is the first thing to go."],
                  ["0%", "of overlays are blocked. They sit inside the video frame."],
                  ["79%", "of Twitch viewers prefer ads that do not interrupt the stream."],
                  ["73%", "of Twitch's audience is between 18 and 34."],
                ].map(([v, t]) => (
                  <div key={v} className="flex gap-4">
                    <span className="text-xl font-bold text-foreground tabular-nums w-14 shrink-0">
                      {v}
                    </span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Beta ── */}
      <MascotBand
        src="/lovable-uploads/beta-mascot-onair.jpg"
        alt="Beta, the Beta Ads mascot, in the studio"
        variant="scene"
        eyebrow="Norwegian, not a Nordic satellite office"
        heading="Beta Agency AS is registered in Norway"
        body="We work from Oslo, Stockholm and Helsinki and run campaigns in Norwegian, Swedish, Danish and Finnish. Norway can run on its own, or as part of a Nordic buy."
        points={[
          "Norwegian streamers, Norwegian chat, Norwegian clients",
          "We report what chat actually said, not just impressions",
          "We tell you if livestream is the wrong channel for you",
        ]}
        cta={{ label: "See campaigns we have run", to: "/case-studies" }}
        flip
      />

      {/* ── FAQ ── */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-10">
            Frequently asked questions about Twitch agencies in Norway
          </h2>
          {faq.map((f) => (
            <details key={f.q} className="group border-b border-border last:border-b-0">
              <summary className="flex items-center justify-between py-5 cursor-pointer text-sm font-medium text-foreground hover:text-primary transition-colors select-none">
                {f.q}
                <ArrowRight className="w-4 h-4 shrink-0 ml-4 transition-transform group-open:rotate-90 text-muted-foreground" />
              </summary>
              <div className="pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default TwitchAgencyNorway;
