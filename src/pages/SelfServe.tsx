/*
  CLAIMS ANDREAS STILL MUST CONFIRM before this page is promoted:
  1. Programmatic: confirmed by LIVAD (Arda, 2026-10-15): a private deal on our
     Adform or Magnite SSP seat (Equativ coming), deal ID shared, the agency
     targets it in its own DSP (DealFlow.tsx and the FAQ). Still unconfirmed:
     which DSPs, and what reporting a programmatic buyer gets.
  2. Whether agencies can have Beta Ads build the creative for a self-serve
     campaign. The page currently only says the client's creative is set up in
     the platform and avoids promising that we design it.
  3. White-label wording. The page says "sell it as your own" and "on your terms";
     it does not say "white-label", "your logo on the dashboard" or similar.
*/
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { BuildPanel, ReportPanel } from "@/components/home-final/panels";
import { DealFlow } from "@/components/working/DealFlow";
import "@/components/home-final/home-final.css";
import {
  BOOKING_URL, PARTNER_MAIL, W, kicker, h2,
  PrimaryBtn, GhostBtn, GhostLink, Crumbs, Faq, Split,
  breadcrumbLd, faqLd, usePanelVideos,
} from "@/components/working/shared";

/* Self-serve: the second card on /working-with-us, for media agencies and
   partners. Facts confirmed by Andreas: own login to the same platform Beta Ads
   uses, Streamer Explorer (39,000+ streamers, 37,599 recently active and open to
   collaborations; never call them Nordic), build, launch, follow live, end report,
   programmatic private deals as described above, request access by email.
   Pricing (Andreas 2026-10-30): self-serve from 50,000 NOK per campaign (managed
   from 100,000 NOK), live a few days after booking, smaller and shorter campaigns
   run more often. */

const TITLE = "Self-serve livestream ads for media agencies | Beta Ads";
const DESCRIPTION =
  "Your own Beta Ads login to launch livestream campaigns for clients, from 50,000 NOK per campaign and live in days. Or buy a private deal in your DSP.";

const flow: { t: string; d: string }[] = [
  { t: "Find streamers", d: "Search the Streamer Explorer and build the streamer list for your client." },
  { t: "Build the campaign", d: "Objective, target audience, format, asset and review, in five steps." },
  { t: "Launch when it suits the client", d: "You decide when it goes live. No waiting on us." },
  { t: "Follow it live", d: "Views, clicks and CTR per streamer and per stream while the campaign runs, with a recorded clip of every ad play." },
  { t: "Forward the report", d: "An end report you can put in front of your client." },
];

const you = [
  "Pick the streamers in the Streamer Explorer",
  "Build and launch the campaign",
  "Package it in your media plan",
  "Sell it to your client on your terms",
  "Report to your client",
];
const us = [
  "Set up your platform login",
  "Set up a private deal and share the deal ID, if you buy programmatically",
  "Run the platform and the streamer database",
  "Count views per stream",
  "Record a clip of every ad play",
];

const faqs: { q: string; a: string }[] = [
  { q: "What does self-serve cost?", a: "Campaigns from 50,000 NOK each, priced per 1,000 views that fully played. Managed campaigns start at 100,000 NOK, so with your own login you can run smaller and shorter campaigns more often." },
  { q: "How fast can a campaign go live?", a: "A few days from booking." },
  { q: "Who is self-serve for?", a: "Media agencies and partners that want livestream in their own media plans and run campaigns for several clients. Brands and first test campaigns usually start managed." },
  { q: "Is it the same platform Beta Ads uses?", a: "Yes. You get your own login to the platform we use for our own campaigns: the Streamer Explorer, the campaign builder, live monitoring and the end report." },
  { q: "How many streamers can we choose from?", a: "The Streamer Explorer has more than 39,000 streamers in the database, and 37,599 of them are recently active and open to collaborations." },
  { q: "Can we buy it through our DSP?", a: "Yes. We set up a private deal on our SSP seat, on Adform or Magnite (Equativ is coming), and share the deal ID with you. Your team targets the deal ID in your DSP, and the overlay runs inside the streams." },
  { q: "Can we sell it to our clients as our own?", a: "Yes. You package livestream in your media plan and sell it to your client on your terms." },
  { q: "What counts as a view?", a: "One view is one viewer watching while the animation fully played on Twitch, YouTube or Kick, counted by the platform per stream." },
  { q: "How do we get access?", a: "Email sales@beta-ads.no with the subject Self-serve partner access. We set up the login with you, or a private deal if you buy programmatically, then you launch." },
  { q: "Can we start with a managed campaign first?", a: "Yes. Many agencies run one campaign with us first, then move to self-serve for the next ones." },
];

const SelfServe: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  usePanelVideos(rootRef);

  return (
    <>
      <SEO
        title={TITLE}
        description={DESCRIPTION}
        canonical="/self-serve"
        jsonLd={[
          faqLd(faqs),
          breadcrumbLd("Self-serve", "/self-serve"),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Self-serve livestream advertising for media agencies",
            serviceType: "Livestream advertising platform",
            url: "https://beta-ads.no/self-serve",
            provider: { "@id": "https://beta-ads.no/#organization" },
            audience: { "@type": "BusinessAudience", audienceType: "Media agencies and partners" },
            description: DESCRIPTION,
          },
        ]}
      />

      <div ref={rootRef} className="min-h-screen bg-background text-foreground">
        {/* ───────── Hero ───────── */}
        <header className={`${W} pt-28 md:pt-36 pb-12 md:pb-16`}>
          <Crumbs current="Self-serve" />
          <div className={`${kicker} mb-5`}>Self-serve · for media agencies and partners</div>
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-end">
            <div>
              <h1 className="text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.4rem] font-bold tracking-[-0.03em] max-w-4xl m-0">
                Launch it.<br className="hidden sm:block" /> <span className="hl">Sell it to your clients.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                Your own login to the platform we use, to build and launch livestream campaigns for
                your clients. Or buy programmatically: a private deal you target in your own DSP.
              </p>
              <dl className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl m-0">
                {[
                  ["From 50,000 NOK", "per campaign with your own login"],
                  ["A few days", "from booking to live on stream"],
                  ["Run it more often", "smaller, shorter campaigns through the year"],
                ].map(([v, l]) => (
                  <div key={v} className="border-l-2 border-border pl-4">
                    <dt className="text-xl font-semibold tracking-tight">{v}</dt>
                    <dd className="m-0 mt-1 text-sm text-muted-foreground">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="flex flex-wrap gap-3 lg:pb-2">
              <PrimaryBtn href={PARTNER_MAIL} cta="email">Request a login</PrimaryBtn>
              <GhostBtn href={BOOKING_URL} cta="book">Book a call</GhostBtn>
            </div>
          </div>
        </header>

        <section className={W} aria-label="Campaign builder">
          <div className="bf wwu-panel" style={{ background: "transparent" }}>
            <BuildPanel reveal={false} />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">The campaign builder on the format step. Example UI.</p>
        </section>

        {/* ───────── Streamer Explorer numbers ───────── */}
        <section className="border-t border-border mt-16 md:mt-24 py-16 md:py-24">
          <div className={`${W} grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-end`}>
            <div>
              <div className={`${kicker} mb-4`}>Streamer Explorer</div>
              <h2 className={h2}>The same streamer database <span className="hl">we book from.</span></h2>
              <p className="mt-5 text-muted-foreground leading-relaxed max-w-xl">
                Find the streamers that fit each client and build the list yourself, in the same tool we use for our own campaigns.
              </p>
            </div>
            <dl className="m-0 grid sm:grid-cols-2 gap-x-10">
              <div className="border-t border-foreground pt-5 pb-6">
                <dt className="text-sm text-muted-foreground">Streamers in the database</dt>
                <dd className="m-0 mt-2 text-5xl md:text-6xl font-bold tracking-[-0.03em] tabular-nums">39,000+</dd>
              </div>
              <div className="border-t border-border pt-5 pb-6">
                <dt className="text-sm text-muted-foreground">Recently active and open to collaborations</dt>
                <dd className="m-0 mt-2 text-5xl md:text-6xl font-light tracking-[-0.03em] tabular-nums">37,599</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ───────── Platform flow ───────── */}
        <section id="platform" className="scroll-mt-24 border-t border-border py-16 md:py-24">
          <div className={`${W} grid lg:grid-cols-[0.75fr_1.25fr] gap-10 lg:gap-16`}>
            <div className="lg:sticky lg:top-28 self-start">
              <div className={`${kicker} mb-4`}>In your login</div>
              <h2 className={h2}>From streamer list <span className="hl">to client report.</span></h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Everything we use to run our own campaigns, on your schedule.
              </p>
            </div>
            <ol className="m-0 p-0 list-none">
              {flow.map((s, i) => (
                <li key={s.t} className="grid grid-cols-[3rem_minmax(0,1fr)] sm:grid-cols-[4rem_minmax(0,1fr)] gap-x-4 py-6 border-t border-border last:border-b">
                  <span className="text-2xl sm:text-3xl font-light tabular-nums text-muted-foreground leading-none pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="m-0 text-lg md:text-xl font-semibold tracking-tight">{s.t}</h3>
                    <p className="mt-1.5 mb-0 text-[15px] leading-relaxed text-muted-foreground max-w-xl">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────── Programmatic ───────── */}
        <section id="programmatic" className="scroll-mt-24 border-t border-border py-16 md:py-24">
          <div className={W}>
            <div className="max-w-3xl">
              <div className={`${kicker} mb-4`}>Programmatic · Adform and Magnite</div>
              <h2 className={h2}>Buy it in your DSP, with a private deal.</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed max-w-2xl">
                We have SSP seats on Adform and Magnite, with Equativ coming. We set up a private deal
                for the campaign and share the deal ID, and your team targets it in your own DSP, next
                to the rest of the programmatic plan.
              </p>
            </div>
            <div className="mt-10 md:mt-12">
              <DealFlow />
            </div>
          </div>
        </section>

        {/* ───────── Sell it as your own ───────── */}
        <section id="sell" className="scroll-mt-24 border-t border-border py-16 md:py-24">
          <div className={W}>
            <div className="grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-16 items-end">
              <div className="max-w-4xl">
                <div className={`${kicker} mb-4`}>Sell it as your own</div>
                <h2 className={h2}>Livestream in your media plan. <span className="hl">On your terms.</span></h2>
                <p className="mt-5 text-muted-foreground leading-relaxed max-w-2xl">
                  Package livestream next to the rest of the plan and sell it to your client the way you
                  sell everything else. Here is who does what.
                </p>
              </div>
            </div>
            <div className="mt-10 md:mt-12">
              <Split you={you} us={us} youLabel="Your agency" />
            </div>
          </div>
        </section>

        {/* ───────── Report ───────── */}
        <section id="report" className="scroll-mt-24 border-t border-border py-16 md:py-24">
          <div className={W}>
            <div className="max-w-3xl">
              <div className={`${kicker} mb-4`}>Reporting</div>
              <h2 className={h2}>A report you can <span className="hl">forward to the client.</span></h2>
              <p className="mt-5 text-muted-foreground leading-relaxed max-w-2xl">
                Live numbers per streamer and per stream, clip verification and an end report with
                setup verification and chat tracking.
              </p>
            </div>
            <div className="bf wwu-panel mt-10 md:mt-12" style={{ background: "transparent" }}>
              <ReportPanel reveal={false} />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Chat tracking in the end report. Example UI.</p>
          </div>
        </section>

        {/* ───────── Getting started ───────── */}
        <section id="start" className="scroll-mt-24 border-t border-border py-16 md:py-24">
          <div className={W}>
            <div className={`${kicker} mb-4`}>Getting started</div>
            <h2 className={`${h2} max-w-3xl`}>Three steps <span className="hl">to your first launch.</span></h2>
            <div className="mt-10 md:mt-12 grid lg:grid-cols-[1.4fr_0.6fr] gap-4 md:gap-5">
              <ol className="m-0 p-0 list-none rounded-[20px] border border-border divide-y divide-border">
                {[
                  ["Request access", <>Email <a href={PARTNER_MAIL} data-cta="email" className="text-foreground underline underline-offset-4">sales@beta-ads.no</a> with the subject Self-serve partner access. Tell us about your agency and clients.</>],
                  ["We set it up with you", "Your platform login, or a private deal ID if you buy programmatically."],
                  ["You launch", "Build the first campaign for a client and launch it when it suits them."],
                ].map(([t, d], i) => (
                  <li key={String(t)} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 p-6 md:p-8">
                    <span className="text-2xl font-light tabular-nums text-muted-foreground leading-none">{i + 1}</span>
                    <div>
                      <h3 className="m-0 text-lg font-semibold tracking-tight">{t}</h3>
                      <p className="mt-1.5 mb-0 text-[15px] leading-relaxed text-muted-foreground">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <aside className="rounded-[8px] bg-muted p-6 md:p-8 flex flex-col">
                <div className={kicker}>Not ready to run it yourself?</div>
                <p className="mt-3 mb-0 text-xl font-semibold tracking-tight leading-snug">Start with one managed campaign, then move to self-serve.</p>
                <p className="mt-3 mb-6 text-[15px] text-muted-foreground leading-relaxed">We run the first one from brief to report, so your team sees how it works. Managed campaigns start at 100,000 NOK.</p>
                <div className="mt-auto"><GhostLink to="/managed-campaigns">How managed works</GhostLink></div>
              </aside>
            </div>
          </div>
        </section>

        <Faq title={<>Questions agencies <span className="hl">ask</span></>} faqs={faqs} />

        {/* ───────── CTA ───────── */}
        <section className="border-t border-border py-16 md:py-24">
          <div className={W}>
            <div className="rounded-[24px] bg-[#0b0a0b] text-white p-8 md:p-14 grid lg:grid-cols-[1fr_auto] gap-8 items-end dark:bg-white/[0.04] dark:ring-1 dark:ring-white/10">
              <div>
                <h2 className="text-3xl md:text-5xl leading-[1.05] font-bold tracking-tight m-0">
                  Get your own <span className="font-light text-white/55">platform login.</span>
                </h2>
                <p className="mt-4 mb-0 text-white/65 max-w-xl">Tell us about your agency and clients, and we set up a login or a private deal.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={PARTNER_MAIL} data-cta="email" className="inline-flex items-center h-11 px-6 rounded-full bg-white text-[#0b0a0b] text-sm font-semibold hover:bg-white/90 transition-colors">Request a login</a>
                <a href={BOOKING_URL} data-cta="book" target="_blank" rel="noopener noreferrer" className="inline-flex items-center h-11 px-6 rounded-full border border-white/25 text-white text-sm font-semibold hover:border-white/50 transition-colors">Book a call</a>
              </div>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Compare both ways of working on <Link to="/working-with-us" className="text-foreground underline underline-offset-4">working with us</Link>.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default SelfServe;
