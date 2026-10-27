import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { LivePanel, ReportPanel } from "@/components/home-final/panels";
import "@/components/home-final/home-final.css";
import {
  BOOKING_URL, SALES_MAIL, W, kicker, h2,
  PrimaryBtn, GhostBtn, GhostLink, Crumbs, Faq, Split,
  breadcrumbLd, faqLd, usePanelVideos,
} from "@/components/working/shared";

/* Managed campaigns: the first card on /working-with-us, for brands and anyone
   running a first test campaign. Every claim here is confirmed by Andreas
   (process, setup verification, recorded clips, own dashboard login, end report,
   pro rata refund, priced per 1,000 views, campaigns from 100,000 NOK).
   Case numbers are copied from the case study pages, nothing else. */

const TITLE = "Managed livestream campaigns: we run it A to Z | Beta Ads";
const DESCRIPTION =
  "Managed Twitch, YouTube and Kick campaigns for brands and first tests. We pick the streamers, design the overlay, launch, verify and report. From 100,000 NOK.";

const steps: { t: string; d: string; who: "You" | "Beta Ads" | "Both" }[] = [
  { t: "Brief and budget", who: "You", d: "Tell us the product, the market and the goal. We agree the number of views before launch." },
  { t: "Streamer selection", who: "Both", d: "We pick the streamers from the Streamer Explorer. You can approve the list and remove anyone before it goes out." },
  { t: "Custom overlay", who: "Beta Ads", d: "We design the animated overlay in your brand, sized for a corner of the stream. Viewers type !brand in chat to get your link, and you can add a poll." },
  { t: "Briefing and setup", who: "Beta Ads", d: "We brief every streamer and set the overlay up in OBS with them." },
  { t: "Setup verification", who: "Beta Ads", d: "Every channel is checked on air: overlay placed, visible on stream, animation running." },
  { t: "Live monitoring", who: "Both", d: "Every ad play leaves a recorded clip. You follow views, clicks and CTR per streamer and per stream in your own dashboard login." },
  { t: "End report", who: "Beta Ads", d: "Delivery, clicks and chat tracking when the campaign ends. Undelivered views are refunded pro rata." },
];

const you = [
  "Share the brief, the market and the budget",
  "Approve the streamer list, or remove anyone on it",
  "Approve the overlay before launch",
  "Follow the campaign in your own dashboard login",
  "Read the end report",
];
const us = [
  "Pick the streamers in the Streamer Explorer",
  "Design the animated overlay in your brand",
  "Set up the !brand chat command and an optional poll",
  "Brief the streamers",
  "Set it up in OBS on every channel",
  "Check every channel on air",
  "Record a clip of every ad play",
  "Write the end report",
  "Refund undelivered views pro rata",
];

const cases: { brand: string; what: string; facts: string; to: string }[] = [
  { brand: "Samsung", what: "Galaxy S25 Ultra and Z Fold7", facts: "800,185 completed live views, 71 streamer slots", to: "/case-study/samsung" },
  { brand: "Samsung", what: "Galaxy Z Fold7", facts: "300,054 completed live views, 28 streamers", to: "/case-study/samsung-fold7" },
  { brand: "NKI", what: "Quiz campaign", facts: "220,003 completed views, 1,595 verified clicks, 19 streamers", to: "/case-study/nki" },
  { brand: "Shure", what: "MV6 microphone", facts: "182,554 completed views, 2,378 verified clicks, one creator", to: "/case-study/shure" },
  { brand: "Komplett", what: "Månedens Gaming Deal", facts: "151,278 display views, 1,768 verified clicks, 34 streamers", to: "/case-study/komplett" },
];

const faqs: { q: string; a: string }[] = [
  { q: "What does a managed campaign cost?", a: "Managed campaigns are priced per 1,000 animation views, and campaigns start from 100,000 NOK. We agree the number of views before launch." },
  { q: "What counts as a view?", a: "One view is one fully played run of your animation on a live stream on Twitch, YouTube or Kick. Views are counted by the campaign platform per stream." },
  { q: "What if the campaign delivers fewer views than agreed?", a: "You pay for the views in your agreement. If the campaign delivers fewer, we refund the undelivered share pro rata. Clicks and CTR are reported, not guaranteed." },
  { q: "Can we choose the streamers?", a: "We pick them from the Streamer Explorer, and you can approve the list and remove anyone on it before launch." },
  { q: "Do we need to make the creative?", a: "No. We design the animated overlay in your brand, sized for a corner of the stream, plus the chat command and an optional poll." },
  { q: "How do we know the ad actually ran?", a: "Every channel is checked on air, and every ad play leaves a recorded clip you can look at. You follow views, clicks and CTR in your own dashboard login." },
  { q: "What is in the end report?", a: "Delivery, clicks and chat tracking, per streamer and per stream, as a report you can forward." },
  { q: "We are an agency. Can we start managed?", a: "Yes. Many agencies run one managed campaign first, then move to their own self-serve login for the next ones." },
];

const ManagedCampaigns: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  usePanelVideos(rootRef);

  return (
    <>
      <SEO
        title={TITLE}
        description={DESCRIPTION}
        canonical="/managed-campaigns"
        jsonLd={[
          faqLd(faqs),
          breadcrumbLd("Managed campaigns", "/managed-campaigns"),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Managed livestream advertising campaigns",
            serviceType: "Livestream advertising",
            url: "https://beta-ads.no/managed-campaigns",
            provider: { "@id": "https://beta-ads.no/#organization" },
            areaServed: ["NO", "SE", "DK", "FI"],
            description: DESCRIPTION,
          },
        ]}
      />

      <div ref={rootRef} className="min-h-screen bg-background text-foreground">
        {/* ───────── Hero ───────── */}
        <header className={`${W} pt-28 md:pt-36 pb-12 md:pb-16`}>
          <Crumbs current="Managed campaigns" />
          <div className={`${kicker} mb-5`}>Managed · for brands and test campaigns</div>
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-end">
            <div>
              <h1 className="text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.4rem] font-bold tracking-[-0.03em] max-w-4xl m-0">
                We run it A&nbsp;to&nbsp;Z.<br className="hidden sm:block" /> <span className="hl">You approve and follow&nbsp;along.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                Streamers, overlay, launch, monitoring and report. You give us the brief and the
                budget, we run the campaign on Twitch, YouTube and Kick, and you watch it happen in
                your own dashboard login.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:pb-2">
              <PrimaryBtn href={BOOKING_URL} cta="book">Book a call</PrimaryBtn>
              <GhostBtn href={SALES_MAIL} cta="email">sales@beta-ads.no</GhostBtn>
            </div>
          </div>
        </header>

        <section className={W} aria-label="Live view">
          <div className="bf wwu-panel" style={{ background: "transparent" }}>
            <LivePanel reveal={false} />
          </div>
          <div className="mt-4 grid sm:grid-cols-[auto_minmax(0,1fr)] gap-x-10 gap-y-2 text-sm text-muted-foreground">
            <span className="text-foreground font-semibold">One overlay, 25 streams, checked on air.</span>
            <span>Every channel gets a setup verification on air. Example UI.</span>
          </div>
        </section>

        {/* ───────── You vs us ───────── */}
        <section className="border-t border-border mt-16 md:mt-24 py-16 md:py-24">
          <div className={W}>
            <div className="max-w-3xl">
              <div className={`${kicker} mb-4`}>Who does what</div>
              <h2 className={h2}>Five things on your side. <span className="hl">The rest is ours.</span></h2>
              <p className="mt-5 text-muted-foreground leading-relaxed max-w-2xl">
                The right start if livestream is new to you. You stay in control of the brand and the
                streamer list, we do the work in between.
              </p>
            </div>
            <div className="mt-10 md:mt-12">
              <Split you={you} us={us} />
            </div>
          </div>
        </section>

        {/* ───────── Timeline ───────── */}
        <section id="process" className="scroll-mt-24 border-t border-border py-16 md:py-24">
          <div className={`${W} grid lg:grid-cols-[0.75fr_1.25fr] gap-10 lg:gap-16`}>
            <div className="lg:sticky lg:top-28 self-start">
              <div className={`${kicker} mb-4`}>From brief to report</div>
              <h2 className={h2}>Seven steps. <span className="hl">One contact.</span></h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Each step is marked with who does it. Where it says both, you get a say before we move on.
              </p>
            </div>
            <ol className="m-0 p-0 list-none relative">
              {steps.map((s, i) => (
                <li key={s.t} className="relative grid grid-cols-[3rem_minmax(0,1fr)] sm:grid-cols-[4rem_minmax(0,1fr)_7rem] gap-x-4 py-6 border-t border-border last:border-b">
                  <span className="text-2xl sm:text-3xl font-light tabular-nums text-muted-foreground leading-none pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="m-0 text-lg md:text-xl font-semibold tracking-tight">{s.t}</h3>
                    <p className="mt-1.5 mb-0 text-[15px] leading-relaxed text-muted-foreground max-w-xl">{s.d}</p>
                  </div>
                  <span className={`col-start-2 sm:col-start-auto mt-3 sm:mt-1 justify-self-start sm:justify-self-end h-6 inline-flex items-center px-2.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em] ${s.who === "Beta Ads" ? "bg-muted text-muted-foreground" : "bg-foreground text-background"}`}>
                    {s.who}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────── The creative ───────── */}
        <section id="creative" className="scroll-mt-24 border-t border-border py-16 md:py-24">
          <div className={`${W} grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center`}>
            <figure className="m-0">
              <div className="relative rounded-[14px] overflow-hidden bg-[#0b0a0b] aspect-video">
                <img src="/home/komplett-stream.webp" alt="A Komplett overlay running in the corner of a live Twitch stream" className="block w-full h-full object-cover scale-[1.13]" loading="lazy" width={960} height={540} />
              </div>
              <figcaption className="mt-3 text-xs text-muted-foreground">Komplett overlay and the !komplett chat command on a live stream. Real campaign capture.</figcaption>
            </figure>
            <div>
              <div className={`${kicker} mb-4`}>The creative</div>
              <h2 className={h2}>Made in your brand. <span className="hl">Sized for the corner.</span></h2>
              <dl className="mt-8 m-0 border-t border-border">
                {[
                  ["Animated overlay", "Designed by us in your brand, sized for a corner of the stream so it sits next to the game, not on top of it."],
                  ["Chat command", "Viewers type !brand in chat and get your link, while the stream is on."],
                  ["Optional poll", "Ask the viewers a question in the stream and read the answers in the report."],
                ].map(([t, d]) => (
                  <div key={t} className="grid sm:grid-cols-[10rem_minmax(0,1fr)] gap-x-6 gap-y-1 py-4 border-b border-border">
                    <dt className="text-[15px] font-semibold">{t}</dt>
                    <dd className="m-0 text-[15px] leading-relaxed text-muted-foreground">{d}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ───────── Dashboard and report ───────── */}
        <section id="report" className="scroll-mt-24 border-t border-border py-16 md:py-24">
          <div className={W}>
            <div className="grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-16 items-end">
              <div className="max-w-4xl">
                <div className={`${kicker} mb-4`}>Monitoring and report</div>
                <h2 className={h2}>Your own login while it runs. <span className="hl">A report when it ends.</span></h2>
                <p className="mt-5 text-muted-foreground leading-relaxed max-w-2xl">
                  Views, clicks and CTR per streamer and per stream, with a recorded clip of every ad play.
                  The end report adds chat tracking, as a PDF you can forward.
                </p>
              </div>
            </div>
            <div className="bf wwu-panel mt-10 md:mt-12" style={{ background: "transparent" }}>
              <ReportPanel reveal={false} />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Chat tracking in the end report. Example UI.</p>
          </div>
        </section>

        {/* ───────── Pricing ───────── */}
        <section id="pricing" className="scroll-mt-24 border-t border-border py-16 md:py-24">
          <div className={`${W} grid lg:grid-cols-2 gap-10 lg:gap-16`}>
            <div>
              <div className={`${kicker} mb-4`}>Pricing</div>
              <h2 className={h2}>You pay for views. <span className="hl">Not for promises.</span></h2>
              <p className="mt-5 text-muted-foreground leading-relaxed max-w-xl">
                Priced per 1,000 animation views, with the number of views agreed before launch.
                See how livestream pricing works on the <Link to="/twitch-advertising-cost" className="text-foreground underline underline-offset-4">pricing page</Link>.
              </p>
            </div>
            <div>
              <div className="border-t border-border pt-6">
                <div className="text-sm text-muted-foreground">Campaigns from</div>
                <div className="mt-1 text-5xl md:text-6xl font-bold tracking-[-0.03em] tabular-nums">100,000 <span className="font-light text-muted-foreground">NOK</span></div>
              </div>
              <dl className="mt-8 m-0 border-t border-border">
                {[
                  ["One view", "One fully played run of the animation on a live stream on Twitch, YouTube or Kick."],
                  ["Undelivered views", "Refunded pro rata. Clicks and CTR are reported, not guaranteed."],
                  ["Contract and invoice", "BETA AGENCY AS, org.nr 933 303 136."],
                ].map(([t, d]) => (
                  <div key={t} className="grid sm:grid-cols-[10rem_minmax(0,1fr)] gap-x-6 gap-y-1 py-4 border-b border-border">
                    <dt className="text-[15px] font-semibold">{t}</dt>
                    <dd className="m-0 text-[15px] leading-relaxed text-muted-foreground">{d}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ───────── Cases ───────── */}
        <section id="cases" className="scroll-mt-24 border-t border-border py-16 md:py-24">
          <div className={W}>
            <div className="grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-16 items-end">
              <h2 className={`${h2} max-w-3xl`}>Campaigns we ran. <span className="hl">The numbers are on the case pages.</span></h2>
              <GhostLink to="/case-studies">All case studies</GhostLink>
            </div>
            <ul className="mt-10 m-0 p-0 list-none border-t border-border">
              {cases.map((c) => (
                <li key={c.to}>
                  <Link to={c.to} className="group grid grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[10rem_minmax(0,0.9fr)_minmax(0,1.3fr)_auto] gap-x-6 gap-y-1 py-5 border-b border-border items-baseline">
                    <span className="text-lg font-semibold tracking-tight">{c.brand}</span>
                    <span className="md:order-none order-3 col-span-2 md:col-span-1 text-[15px] text-muted-foreground">{c.what}</span>
                    <span className="order-4 md:order-none col-span-2 md:col-span-1 text-[15px] tabular-nums">{c.facts}</span>
                    <span className="order-2 md:order-none text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">Read <span aria-hidden="true">&rarr;</span></span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">Ask us for the full report behind any of them, or to talk to a recent client.</p>
          </div>
        </section>

        <Faq title={<>Questions about <span className="hl">managed campaigns</span></>} faqs={faqs} />

        {/* ───────── CTA ───────── */}
        <section className="border-t border-border py-16 md:py-24">
          <div className={W}>
            <div className="rounded-[24px] bg-[#0b0a0b] text-white p-8 md:p-14 grid lg:grid-cols-[1fr_auto] gap-8 items-end dark:bg-white/[0.04] dark:ring-1 dark:ring-white/10">
              <div>
                <h2 className="text-3xl md:text-5xl leading-[1.05] font-bold tracking-tight m-0">
                  Run your first campaign <span className="font-light text-white/55">with us.</span>
                </h2>
                <p className="mt-4 mb-0 text-white/65 max-w-xl">A 30 minute call with Andreas about your product, market and budget.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={BOOKING_URL} data-cta="book" target="_blank" rel="noopener noreferrer" className="inline-flex items-center h-11 px-6 rounded-full bg-white text-[#0b0a0b] text-sm font-semibold hover:bg-white/90 transition-colors">Book a call</a>
                <a href={SALES_MAIL} data-cta="email" className="inline-flex items-center h-11 px-6 rounded-full border border-white/25 text-white text-sm font-semibold hover:border-white/50 transition-colors">sales@beta-ads.no</a>
              </div>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Agency running campaigns for several clients? See <Link to="/self-serve" className="text-foreground underline underline-offset-4">self-serve</Link>.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default ManagedCampaigns;
