import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { BOOKING_URL, SALES_MAIL, W, kicker, h2, PrimaryBtn, GhostBtn, Faq, faqLd } from "@/components/working/shared";
import "@/components/home-final/home-final.css";
import { PanelFrame, ClipReviewPanel } from "@/components/home-final/product-panels";

/* Brand safety: how the platform reads the stream around each ad play.
   Facts (Andreas / product, see memory reference_betaads_report_dimensions):
   every ad play is recorded as a clip; the speech in the clip is transcribed,
   translated into English and checked for swearing; the content around each ad
   is rated no / low / medium / high risk, broken out per channel so a channel can
   be dropped mid-flight. It rates the surroundings of the ad, not the creator.
   The two Clip Review panels are coded dark product panels: the flagged one
   is the real Surfshark Finland clip (frame, transcript and scores from the
   platform view); the clean Norwegian Samsung clip has a short example
   transcript.
   The per-channel table is labelled example UI. */

const TITLE = "Brand Safety for Livestream Ads: Swearing Detected | Beta Ads";
const DESCRIPTION =
  "Every ad play on Twitch, YouTube and Kick is recorded, transcribed, translated into English and checked for swearing, then rated no, low, medium or high risk.";

type Risk = "No risk" | "Low" | "Medium" | "High";

const steps: { t: string; d: string }[] = [
  { t: "Every ad play is recorded", d: "A short clip of the stream is saved around each play of your overlay, on every channel." },
  { t: "The speech is transcribed", d: "What the streamer says in the clip is turned into text, with timestamps." },
  { t: "Translated into English", d: "Norwegian, Swedish, Finnish or anything else: you read every stream in English, next to the original." },
  { t: "Swearing is flagged", d: "Curse words are detected in the original language and marked in the transcript, so nothing hides behind a translation." },
  { t: "Each play gets a risk rating", d: "The content around the ad is rated no, low, medium or high risk." },
  { t: "Rolled up per channel", d: "Ratings add up per channel while the campaign runs, so a channel that drifts can be dropped mid-flight." },
];

/* Example per-channel split: share of ad plays in each risk band. */
const channels: { name: string; plays: number; split: [number, number, number, number] }[] = [
  { name: "Channel A", plays: 64, split: [88, 12, 0, 0] },
  { name: "Channel B", plays: 51, split: [76, 20, 4, 0] },
  { name: "Channel C", plays: 47, split: [91, 9, 0, 0] },
  { name: "Channel D", plays: 38, split: [42, 31, 19, 8] },
];
const BANDS: { k: Risk; cls: string }[] = [
  { k: "No risk", cls: "bg-foreground/15" },
  { k: "Low", cls: "bg-foreground/35" },
  { k: "Medium", cls: "bg-foreground/70" },
  { k: "High", cls: "bg-[#e5322d]" },
];

const faqs: { q: string; a: string }[] = [
  { q: "What exactly is checked?", a: "The speech in the clip recorded around each ad play. It is transcribed, translated into English and checked for swearing, and the content around the ad is rated no, low, medium or high risk." },
  { q: "Which languages does it handle?", a: "The transcript keeps the original language and adds an English translation next to it, so a Finnish or Swedish stream reads the same way as a Norwegian one. Swearing is detected in the original language." },
  { q: "Does it rate the streamer?", a: "No. It rates what surrounds your ad, play by play. That is the moment your brand is on screen, and the moment that matters to you." },
  { q: "What happens if a channel rates badly?", a: "Ratings roll up per channel while the campaign runs. A channel that drifts toward medium or high risk can be dropped mid-flight, and you can see why in the transcript." },
  { q: "Where do we see it?", a: "In your dashboard during the campaign and in the end report, next to delivery, clicks and chat tracking." },
  { q: "Is the chat checked too?", a: "Chat tracking is a separate view: every brand mention in chat, translated and scored for tone. Brand safety reads what is said on stream around the ad." },
];

const BrandSafety: React.FC = () => (
  <>
    <SEO
      title={TITLE}
      description={DESCRIPTION}
      canonical="/brand-safety"
      jsonLd={[
        faqLd(faqs),
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://beta-ads.no/" },
            { "@type": "ListItem", position: 2, name: "Brand safety", item: "https://beta-ads.no/brand-safety" },
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
            <li aria-current="page" className="text-foreground">Brand safety</li>
          </ol>
        </nav>
        <div className={`${kicker} mb-5`}>Platform · Brand safety</div>
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-end">
          <div>
            <h1 className="text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.2rem] font-bold tracking-[-0.03em] max-w-4xl m-0">
              Know what was said around every ad.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Every play of your overlay is recorded. The speech around it is transcribed, translated
              into English and checked for swearing, then rated for risk per stream and per channel.
              In any language the stream ran in.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:pb-2">
            <PrimaryBtn href={BOOKING_URL} cta="book">Book a demo</PrimaryBtn>
            <GhostBtn href={SALES_MAIL} cta="email">sales@beta-ads.no</GhostBtn>
          </div>
        </div>
      </header>

      {/* ───────── Clip Review, from the platform ───────── */}
      <section className={W} aria-label="Clip Review in the platform">
        <figure className="m-0">
          <PanelFrame><ClipReviewPanel variant="flagged" /></PanelFrame>
          <figcaption className="mt-3 text-xs text-muted-foreground">Clip Review: a Finnish clip, translated into English, flagged as Obscenity and Profanity.</figcaption>
        </figure>
      </section>

      {/* ───────── How it works ───────── */}
      <section className="border-t border-border mt-16 md:mt-24 py-16 md:py-24">
        <div className={W}>
          <div className="max-w-3xl">
            <div className={`${kicker} mb-4`}>How it works</div>
            <h2 className={h2}>From the clip to a rating, play by play.</h2>
          </div>
          <ol className="mt-10 md:mt-12 m-0 p-0 list-none grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-2">
            {steps.map((s, i) => (
              <li key={s.t} className="border-t border-border py-5">
                <span className="text-sm tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 m-0 text-lg font-semibold tracking-tight">{s.t}</h3>
                <p className="mt-1.5 mb-0 text-[15px] leading-relaxed text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────── No risk ───────── */}
      <section className="border-t border-border py-16 md:py-24">
        <div className={`${W} grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16`}>
          <div className="lg:sticky lg:top-28 self-start">
            <div className={`${kicker} mb-4`}>Every clip gets a rating</div>
            <h2 className={h2}>Most clips come back clean.</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Each clip gets a brand safety score and a category. Here a Norwegian Samsung clip is rated
              No Risk, with the brand mention in the streamer's words highlighted, so you see the safe
              plays and the flagged ones side by side.
            </p>
          </div>
          <figure className="m-0 min-w-0">
            <PanelFrame><ClipReviewPanel variant="clean" /></PanelFrame>
            <figcaption className="mt-3 text-xs text-muted-foreground">Clip Review: a Norwegian Samsung clip rated No Risk.</figcaption>
          </figure>
        </div>
      </section>

      {/* ───────── Per channel ───────── */}
      <section className="border-t border-border py-16 md:py-24">
        <div className={`${W} grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start`}>
          <div>
            <div className={`${kicker} mb-4`}>Per channel</div>
            <h2 className={h2}>Spot the channel that drifts. Drop it mid-flight.</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Every rating rolls up per channel while the campaign runs. Most channels sit in no or
              low risk. When one does not, you see it early, read the transcripts behind it, and
              take it out of the campaign.
            </p>
            <p className="mt-4 text-[15px] text-foreground font-semibold">It rates what surrounds your ad, not the streamer as a person.</p>
          </div>
          <div className="rounded-[18px] border border-border bg-card p-5 md:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-[15px] font-semibold">Risk around ad plays, by channel</span>
              <span className="flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-muted-foreground">
                {BANDS.map((b) => (
                  <span key={b.k} className="inline-flex items-center gap-1.5"><span className={`h-2.5 w-2.5 rounded-sm ${b.cls}`} />{b.k}</span>
                ))}
              </span>
            </div>
            <div className="mt-5 space-y-4">
              {channels.map((c) => (
                <div key={c.name} className="grid grid-cols-[92px_minmax(0,1fr)_64px] items-center gap-4">
                  <span className="text-[14.5px] font-medium">{c.name}</span>
                  <span className="flex h-3 rounded-full overflow-hidden bg-muted" role="img" aria-label={`${c.name}: ${c.split.map((v, i) => `${v}% ${BANDS[i].k}`).join(", ")}`}>
                    {c.split.map((v, i) => v > 0 && <span key={i} className={BANDS[i].cls} style={{ width: `${v}%` }} />)}
                  </span>
                  <span className="text-right text-[13px] tabular-nums text-muted-foreground">{c.plays} plays</span>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-border p-4 text-[14.5px] leading-relaxed">
              <b className="font-semibold">Channel D:</b> <span className="text-muted-foreground">27% of plays rated medium or high, mostly swearing. Flagged for review.</span>
            </div>
            <p className="mt-3 mb-0 text-xs text-muted-foreground">Example UI with example channels.</p>
          </div>
        </div>
      </section>

      {/* ───────── Related ───────── */}
      <section className="border-t border-border py-16 md:py-20">
        <div className={`${W} grid sm:grid-cols-3 gap-x-10 gap-y-6`}>
          {[
            ["Setup verification", "Every stream checked on air, every play clipped.", "/campaign-compliance"],
            ["Chat tracking", "Every brand mention in chat, translated and scored.", "/livestream-chat-engagement"],
            ["Replay reach", "Views that keep counting after the stream.", "/replay-reach"],
          ].map(([t, d, to]) => (
            <Link key={to} to={to} className="group border-t border-border pt-5">
              <span className="text-lg font-semibold tracking-tight">{t} <span aria-hidden="true" className="text-muted-foreground group-hover:text-foreground transition-colors">&rarr;</span></span>
              <p className="mt-1.5 mb-0 text-[15px] leading-relaxed text-muted-foreground">{d}</p>
            </Link>
          ))}
        </div>
      </section>

      <Faq title="Questions about brand safety" faqs={faqs} />

      {/* ───────── Close ───────── */}
      <section className="border-t border-border py-16 md:py-24">
        <div className={`${W} flex flex-col md:flex-row md:items-end md:justify-between gap-8`}>
          <div className="max-w-2xl">
            <h2 className={h2}>See the transcripts from a real campaign.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">In a 30 minute demo we open a live dashboard and walk through the brand safety view.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <PrimaryBtn href={BOOKING_URL} cta="book">Book a demo</PrimaryBtn>
            <GhostBtn href={SALES_MAIL} cta="email">sales@beta-ads.no</GhostBtn>
          </div>
        </div>
      </section>
    </div>
  </>
);

export default BrandSafety;
