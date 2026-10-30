import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { ReportPanel } from "@/components/home-final/panels";
import "@/components/home-final/home-final.css";
import { BOOKING_URL, SALES_MAIL, W, kicker, h2, PrimaryBtn, GhostBtn, Faq, faqLd } from "@/components/working/shared";

/* For marketing executives (CMOs, marketing directors): the third "Solutions" page.
   Structure follows a classic executive landing page (one report, the questions a
   leader asks, proof, how it fits the team). Every claim is one already confirmed
   on the site: priced per completed view from 100,000 NOK, pro rata refund, setup
   verification with a clip per play, brand safety per channel, own dashboard
   login, end report, programmatic private deals (Adform, Magnite), managed or self-serve. Case numbers are
   copied from the case pages. */

const TITLE = "Livestream Advertising for Marketing Executives | Beta Ads";
const DESCRIPTION =
  "Livestream ads on Twitch, YouTube and Kick, reported like the rest of your media: what you bought, what was delivered, where it ran and if it was safe.";

const questions: { q: string; a: string; link: [string, string] }[] = [
  { q: "Did it actually run?", a: "Every stream is checked on air and every ad play is saved as a clip. On Surfshark Finland, 98.7% of 759 plays were verified with a recorded clip.", link: ["Setup verification", "/campaign-compliance"] },
  { q: "Was it brand safe?", a: "The speech around each ad is transcribed, translated into English and checked for swearing, then rated per channel. A channel that drifts can be dropped mid-flight.", link: ["Brand safety", "/brand-safety"] },
  { q: "What did we get?", a: "Completed views, clicks from the chat command, and every brand mention in chat, translated and scored.", link: ["Reporting", "/reporting"] },
  { q: "What did it cost?", a: "You pay per 1,000 views that fully played. Anything undelivered is refunded pro rata.", link: ["Pricing", "/pricing"] },
];

const cases: { brand: string; n: string; k: string; to: string }[] = [
  { brand: "Samsung", n: "800,185", k: "completed views, Galaxy S25 and Z Fold7", to: "/case-study/samsung" },
  { brand: "Høyskolen Kristiania", n: "599,252", k: "views across 31 streamers", to: "/case-study/kristiania" },
  { brand: "Surfshark Finland", n: "119,041", k: "completed views delivered, 100,000 bought", to: "/case-study/surfshark-finland" },
];

const faqs: { q: string; a: string }[] = [
  { q: "What is the minimum budget?", a: "Campaigns start at 100,000 NOK, priced per 1,000 views that fully played. Undelivered views are refunded pro rata." },
  { q: "Which markets can we run in?", a: "Norway, Sweden, Denmark and Finland with local streamers, on Twitch, YouTube and Kick. The Streamer Explorer covers 39,000+ streamers worldwide if a campaign goes wider." },
  { q: "Can our media agency run it?", a: "Yes. Agencies get their own self-serve login, or buy it programmatically: we set up a private deal on Adform or Magnite and they target the deal ID in their own DSP. Or we run it for you, managed." },
  { q: "What do we get at the end?", a: "A report with delivery per streamer and per stream, clicks, chat tracking, brand safety and the verification clips, as a live dashboard and a PDF." },
  { q: "How do we know the numbers are real?", a: "Every ad play leaves a recorded clip you can open, and every stream is checked on air. You follow it in your own dashboard login while it runs." },
];

const ForMarketingExecutives: React.FC = () => (
  <>
    <SEO
      title={TITLE}
      description={DESCRIPTION}
      canonical="/for-marketing-executives"
      jsonLd={[
        faqLd(faqs),
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://beta-ads.no/" },
            { "@type": "ListItem", position: 2, name: "For marketing executives", item: "https://beta-ads.no/for-marketing-executives" },
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
            <li aria-current="page" className="text-foreground">For marketing executives</li>
          </ol>
        </nav>
        <div className={`${kicker} mb-5`}>Solutions · For marketing executives</div>
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-end">
          <div>
            <h1 className="text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.2rem] font-bold tracking-[-0.03em] max-w-4xl m-0">
              Livestream, reported like the rest of your media plan.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              What you bought, what was delivered, where it ran and whether it was brand safe. One
              report per campaign, with the proof behind every number, that you can take to the board.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:pb-2">
            <PrimaryBtn href={BOOKING_URL} cta="book">Book a demo</PrimaryBtn>
            <GhostBtn href={SALES_MAIL} cta="email">sales@beta-ads.no</GhostBtn>
          </div>
        </div>
      </header>

      <section className={W} aria-label="Campaign report">
        <div className="bf wwu-panel" style={{ background: "transparent" }}>
          <ReportPanel reveal={false} />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">The end report: completed views, chat tracking and a PDF you can forward. Example UI.</p>
      </section>

      {/* ───────── Four questions ───────── */}
      <section className="border-t border-border mt-16 md:mt-24 py-16 md:py-24">
        <div className={W}>
          <div className="max-w-3xl">
            <div className={`${kicker} mb-4`}>What leadership asks</div>
            <h2 className={h2}>Four questions, answered in the report.</h2>
          </div>
          <div className="mt-10 md:mt-12 grid md:grid-cols-2 gap-x-10 gap-y-2">
            {questions.map((x, i) => (
              <div key={x.q} className="border-t border-border py-6">
                <span className="text-sm tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 m-0 text-xl font-semibold tracking-tight">{x.q}</h3>
                <p className="mt-2 mb-0 text-[15.5px] leading-relaxed text-muted-foreground max-w-xl">{x.a}</p>
                <Link to={x.link[1]} className="mt-3 inline-flex gap-1.5 text-sm font-semibold hover:opacity-80">
                  {x.link[0]} <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Proof ───────── */}
      <section className="border-t border-border py-16 md:py-24">
        <div className={W}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className={`${kicker} mb-4`}>Results</div>
              <h2 className={h2}>What brands took back to their teams.</h2>
            </div>
            <Link to="/case-studies" className="text-sm font-semibold hover:opacity-80">All case studies <span aria-hidden="true">&rarr;</span></Link>
          </div>
          <div className="mt-10 md:mt-12 grid sm:grid-cols-3 gap-x-10 gap-y-8">
            {cases.map((c) => (
              <Link key={c.to} to={c.to} className="group border-t border-border pt-5">
                <span className="text-[15px] font-semibold">{c.brand}</span>
                <span className="mt-2 block text-4xl font-semibold tracking-[-0.03em] tabular-nums">{c.n}</span>
                <span className="mt-1 block text-[14.5px] text-muted-foreground">{c.k}</span>
                <span className="mt-3 inline-flex gap-1.5 text-sm font-semibold">Read case <span aria-hidden="true" className="text-muted-foreground group-hover:text-foreground transition-colors">&rarr;</span></span>
              </Link>
            ))}
          </div>
          <p className="mt-10 mb-0 text-[15px] text-muted-foreground">
            Across all campaigns: <b className="text-foreground font-semibold">3M+</b> completed views, <b className="text-foreground font-semibold">19,000+</b> hours of sponsored airtime, <b className="text-foreground font-semibold">29</b> campaigns, each with a full report.
          </p>
        </div>
      </section>

      {/* ───────── How it fits the team ───────── */}
      <section className="border-t border-border py-16 md:py-24">
        <div className={W}>
          <div className="max-w-3xl">
            <div className={`${kicker} mb-4`}>How it fits your team</div>
            <h2 className={h2}>We run it, or your agency does.</h2>
          </div>
          <div className="mt-10 md:mt-12 grid md:grid-cols-2 gap-4 md:gap-5">
            <Link to="/managed-campaigns" className="rounded-[18px] border border-border bg-card p-7 md:p-9 flex flex-col hover:border-foreground/30 transition-colors">
              <span className={kicker}>Managed</span>
              <span className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">We run the whole campaign.</span>
              <span className="mt-3 text-[15px] text-muted-foreground max-w-md">Streamers, overlay, launch, monitoring and report. Your team approves and follows along in its own login.</span>
              <span className="mt-8 text-sm font-semibold">How managed works <span aria-hidden="true">&rarr;</span></span>
            </Link>
            <Link to="/self-serve" className="rounded-[18px] border border-border bg-card p-7 md:p-9 flex flex-col hover:border-foreground/30 transition-colors">
              <span className={kicker}>Self-serve with your agency</span>
              <span className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">Your agency runs it, next to the plan.</span>
              <span className="mt-3 text-[15px] text-muted-foreground max-w-md">Their own login to build and launch campaigns, or a private deal on Adform or Magnite they target in their own DSP.</span>
              <span className="mt-8 text-sm font-semibold">How self-serve works <span aria-hidden="true">&rarr;</span></span>
            </Link>
          </div>
        </div>
      </section>

      <Faq title="Questions from marketing leads" faqs={faqs} />

      {/* ───────── Close ───────── */}
      <section className="border-t border-border py-16 md:py-24">
        <div className={`${W} flex flex-col md:flex-row md:items-end md:justify-between gap-8`}>
          <div className="max-w-2xl">
            <h2 className={h2}>See a full report before you spend anything.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">In 30 minutes we open a real campaign report and walk through what your team would get.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <PrimaryBtn href={BOOKING_URL} cta="book">Book a demo</PrimaryBtn>
            <Link to="/case-study/surfshark-finland" className="inline-flex items-center h-11 px-6 rounded-full border border-border text-foreground text-sm font-semibold hover:border-foreground/40 transition-colors">See a real report</Link>
          </div>
        </div>
      </section>
    </div>
  </>
);

export default ForMarketingExecutives;
