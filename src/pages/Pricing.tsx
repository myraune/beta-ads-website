import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { BOOKING_URL, SALES_MAIL, W, kicker, h2, PrimaryBtn, GhostBtn, Faq, faqLd } from "@/components/working/shared";

/* Beta Ads pricing, for every platform. Only the public, confirmed terms:
   priced per 1,000 views that fully played, campaigns from 100,000 NOK,
   undelivered views refunded pro rata, replay and clip views reported on top and
   not billed, effective CPM usually 200 to 300 NOK once those are counted,
   clicks and CTR reported but not guaranteed. The internal CPM ladder is never
   published here. TikTok LIVE is quoted case by case while it is new. */

const TITLE = "Pricing: Pay Per View That Played | Beta Ads";
const DESCRIPTION =
  "Livestream ads on Twitch, YouTube, Kick and TikTok LIVE, priced per 1,000 views that fully played. From 100,000 NOK. Undelivered views refunded.";

const terms: { k: string; v: string; d: string }[] = [
  { k: "You pay for", v: "Views that played", d: "One view is one full run of the animation on a live stream. Priced per 1,000." },
  { k: "Campaigns from", v: "100,000 NOK", d: "The minimum for one campaign, on one or several platforms." },
  { k: "Effective CPM", v: "200 to 300 NOK", d: "What it usually lands at once replay and clip views are counted." },
  { k: "Undelivered", v: "Refunded", d: "Views that do not play are refunded pro rata, never billed." },
];

const included: string[] = [
  "Streamer shortlist for your market, approved by you",
  "Animated overlay with a chat command, and a poll if you want one",
  "Setup verification on every stream, a clip of every ad play",
  "Brand safety: the speech around each ad, translated and rated",
  "Your own dashboard login while it runs",
  "End report with delivery, replay reach, clicks and chat tracking",
];

const notBilled: { t: string; d: string }[] = [
  { t: "Replay views", d: "The overlay stays in the VOD. Those views are reported on top." },
  { t: "Clip views", d: "Clips viewers make of the stream keep counting, at no cost." },
  { t: "Undelivered views", d: "Anything that did not play is refunded pro rata." },
];

const routes: { t: string; d: string; to: string }[] = [
  { t: "Managed", d: "We run the campaign for you, brief to report.", to: "/managed-campaigns" },
  { t: "Self-serve", d: "Your agency's own login to launch and resell campaigns.", to: "/self-serve" },
  { t: "Programmatic", d: "A private deal on Adform or Magnite, bought in your DSP.", to: "/programmatic" },
];

const faqs: { q: string; a: string }[] = [
  { q: "How is it priced?", a: "Per 1,000 views that fully played on a live stream, with campaigns from 100,000 NOK. Undelivered views are refunded pro rata." },
  { q: "Why does the effective CPM end up lower than the price?", a: "You pay for live views only. The overlay stays in the replay and in clips, and those views are reported on top without being billed, so the cost per view seen usually lands around 200 to 300 NOK per 1,000." },
  { q: "Are clicks guaranteed?", a: "No. You buy completed views. Clicks and CTR are tracked and reported in the dashboard and the report, but not guaranteed." },
  { q: "Is the price the same on every platform?", a: "Twitch, YouTube and Kick follow the same model. TikTok LIVE is new, and we quote those campaigns with you." },
  { q: "Is the overlay design included?", a: "In a managed campaign we design the animated overlay in your brand. In self-serve, your agency sets up the client's creative in the platform." },
  { q: "How do we get a quote?", a: "Book a call or email sales@beta-ads.no with the market, the product and the budget. We come back with a streamer shortlist and the number of views." },
];

const Pricing: React.FC = () => (
  <>
    <SEO
      title={TITLE}
      description={DESCRIPTION}
      canonical="/pricing"
      jsonLd={[
        faqLd(faqs),
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://beta-ads.no/" },
            { "@type": "ListItem", position: 2, name: "Pricing", item: "https://beta-ads.no/pricing" },
          ],
        },
      ]}
    />

    <div className="min-h-screen bg-background text-foreground">
      {/* ───────── Hero ───────── */}
      <header className={`${W} pt-28 md:pt-36 pb-12 md:pb-16`}>
        <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-muted-foreground">
          <ol className="m-0 p-0 list-none flex items-center gap-2">
            <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">Pricing</li>
          </ol>
        </nav>
        <div className={`${kicker} mb-5`}>Pricing · Twitch, YouTube, Kick and TikTok LIVE</div>
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-end">
          <div>
            <h1 className="text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.2rem] font-bold tracking-[-0.03em] max-w-4xl m-0">
              Pay only for views that played.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              One model on every platform: priced per 1,000 views that fully played on a live stream.
              Replays come on top, and anything undelivered is refunded.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:pb-2">
            <PrimaryBtn href={BOOKING_URL} cta="book">Get a quote</PrimaryBtn>
            <GhostBtn href={SALES_MAIL} cta="email">sales@beta-ads.no</GhostBtn>
          </div>
        </div>

        <div className="mt-12 md:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 rounded-[18px] border border-border bg-card overflow-hidden">
          {terms.map((t, i) => (
            <div key={t.k} className={`p-6 md:p-7 ${i > 0 ? "border-t sm:border-t-0 lg:border-l border-border" : ""} ${i === 2 ? "sm:border-t lg:border-t-0" : ""} ${i === 1 ? "sm:border-l" : ""} ${i === 3 ? "sm:border-t sm:border-l lg:border-t-0" : ""}`}>
              <div className="text-[13px] text-muted-foreground">{t.k}</div>
              <div className="mt-2 text-2xl md:text-[1.7rem] font-semibold tracking-tight">{t.v}</div>
              <p className="mt-2 mb-0 text-[14.5px] leading-relaxed text-muted-foreground">{t.d}</p>
            </div>
          ))}
        </div>
      </header>

      {/* ───────── Worked example + not billed ───────── */}
      <section className="border-t border-border py-16 md:py-24">
        <div className={`${W} grid lg:grid-cols-2 gap-10 lg:gap-16 items-start`}>
          <div>
            <div className={`${kicker} mb-4`}>How the bill works</div>
            <h2 className={h2}>You are billed for what played. Nothing else.</h2>
            <div className="mt-8 grid gap-y-1">
              {notBilled.map((n) => (
                <div key={n.t} className="border-t border-border py-4">
                  <h3 className="m-0 text-lg font-semibold tracking-tight">{n.t} <span className="ml-2 align-middle rounded-full border border-border px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">Not billed</span></h3>
                  <p className="mt-1 mb-0 text-[15px] leading-relaxed text-muted-foreground">{n.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[18px] bg-[#0b0a0b] text-white p-6 md:p-8 dark:bg-white/[0.04] dark:ring-1 dark:ring-white/10">
            <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/50">Worked example</div>
            <div className="mt-5 grid">
              {[
                ["Views you buy", "100,000", ""],
                ["Views that fully played", "96,000", ""],
                ["You are billed for", "96,000", "font-semibold text-white"],
                ["Refunded", "4,000", ""],
                ["Replay and clip views, on top", "reported, not billed", "text-white/60"],
              ].map(([k, v, cls]) => (
                <div key={k} className="flex items-baseline justify-between gap-6 border-t border-white/10 py-3.5 text-[15px]">
                  <span className="text-white/70">{k}</span>
                  <span className={`tabular-nums ${cls || "text-white"}`}>{v}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 mb-0 text-xs text-white/50">Illustrative numbers.</p>
          </div>
        </div>
      </section>

      {/* ───────── Included ───────── */}
      <section className="border-t border-border py-16 md:py-24">
        <div className={`${W} grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16`}>
          <div>
            <div className={`${kicker} mb-4`}>Included</div>
            <h2 className={h2}>Every campaign comes with this.</h2>
          </div>
          <ul className="m-0 p-0 list-none grid sm:grid-cols-2 gap-x-10">
            {included.map((x) => (
              <li key={x} className="border-t border-border py-4 text-[15.5px] leading-relaxed">{x}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── Ways to buy ───────── */}
      <section className="border-t border-border py-16 md:py-24">
        <div className={W}>
          <div className="max-w-3xl">
            <div className={`${kicker} mb-4`}>Ways to buy</div>
            <h2 className={h2}>Same pricing, three ways in.</h2>
          </div>
          <div className="mt-10 md:mt-12 grid md:grid-cols-3 gap-4 md:gap-5">
            {routes.map((r) => (
              <Link key={r.t} to={r.to} className="group rounded-[18px] border border-border bg-card p-7 flex flex-col hover:border-foreground/30 transition-colors">
                <span className="text-2xl font-semibold tracking-tight">{r.t}</span>
                <span className="mt-2 text-[15px] text-muted-foreground">{r.d}</span>
                <span className="mt-6 text-sm font-semibold">Learn more <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-0.5">&rarr;</span></span>
              </Link>
            ))}
          </div>
          <Link to="/streamer-explorer#plans" className="group mt-4 md:mt-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 rounded-[18px] bg-muted/60 px-7 py-5 text-[15px]">
            <span className="font-semibold">Streamer Explorer on its own</span>
            <span className="text-muted-foreground">Research plans from $249 a month with Beta Credits for the AI features. Campaigns stay free.</span>
            <span className="sm:ml-auto text-sm font-semibold whitespace-nowrap">See plans <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-0.5">&rarr;</span></span>
          </Link>
        </div>
      </section>

      {/* ───────── Platform guides ───────── */}
      <section className="border-t border-border py-16 md:py-20">
        <div className={W}>
          <div className={`${kicker} mb-6`}>Price guides by platform</div>
          <div className="grid sm:grid-cols-3 gap-x-10 gap-y-6">
            {[
              ["Twitch advertising cost", "What moves the price of a Twitch campaign.", "/twitch-advertising-cost"],
              ["Kick advertising cost", "How Kick campaigns are priced.", "/kick-advertising-cost"],
              ["Twitch-annonsering pris", "The price guide in Norwegian.", "/twitch-annonsering-pris"],
            ].map(([t, d, to]) => (
              <Link key={to} to={to} className="group border-t border-border pt-5">
                <span className="text-lg font-semibold tracking-tight">{t} <span aria-hidden="true" className="text-muted-foreground group-hover:text-foreground transition-colors">&rarr;</span></span>
                <p className="mt-1.5 mb-0 text-[15px] leading-relaxed text-muted-foreground">{d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Faq title="Questions about pricing" faqs={faqs} />

      {/* ───────── Close ───────── */}
      <section className="border-t border-border py-16 md:py-24">
        <div className={`${W} flex flex-col md:flex-row md:items-end md:justify-between gap-8`}>
          <div className="max-w-2xl">
            <h2 className={h2}>Get a quote for your market.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">Tell us the market, the product and the budget. We come back with a streamer shortlist and the number of views.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <PrimaryBtn href={BOOKING_URL} cta="book">Get a quote</PrimaryBtn>
            <GhostBtn href={SALES_MAIL} cta="email">sales@beta-ads.no</GhostBtn>
          </div>
        </div>
      </section>
    </div>
  </>
);

export default Pricing;
