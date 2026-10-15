import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { TikTokMark } from "@/components/home-final/marks";
import "@/components/home-final/home-final.css";
import { BOOKING_URL, SALES_MAIL, W, kicker, h2, PrimaryBtn, GhostBtn, Faq, faqLd } from "@/components/working/shared";

/* TikTok LIVE: new on Beta Ads (Andreas, 2026-10-15). Kept deliberately narrow
   until the details are confirmed: no TikTok-specific numbers, prices, chat
   commands or verification claims. The page says it is new, what the format is
   (an animated overlay inside the creator's live stream), and invites brands to
   run one of the first campaigns. The phone frame is a labelled illustration. */

const TITLE = "TikTok LIVE Advertising: Animated Ads Inside Creator Streams | Beta Ads";
const DESCRIPTION =
  "New on Beta Ads: animated brand overlays inside TikTok LIVE streams, next to Twitch, YouTube and Kick. Same platform, same approach. Talk to us about running one of the first TikTok LIVE campaigns.";

const carries: { t: string; d: string }[] = [
  { t: "An overlay in your brand", d: "Your creative as an animated overlay, sized for a vertical live stream." },
  { t: "Creators you approve", d: "We shortlist TikTok LIVE creators for your market, and you approve the list before launch." },
  { t: "One plan across platforms", d: "Run TikTok LIVE next to Twitch, YouTube and Kick in the same campaign and the same login." },
  { t: "A report at the end", d: "Delivery per creator and per stream, in the same report format as the rest of your campaigns." },
];

const faqs: { q: string; a: string }[] = [
  { q: "Can we run TikTok LIVE campaigns now?", a: "Yes, TikTok LIVE is new on Beta Ads and we are setting up the first campaigns now. Book a call and we plan one with you." },
  { q: "How is it different from a TikTok ad?", a: "A TikTok ad runs between videos in the feed. This runs inside a creator's live stream, as an animated overlay viewers see while they watch." },
  { q: "Can we combine it with Twitch, YouTube and Kick?", a: "Yes. TikTok LIVE sits in the same platform, so one campaign can run across all four and come back in one report." },
  { q: "What does it cost?", a: "We quote TikTok LIVE campaigns with you while it is new. Our other platforms are priced per 1,000 completed views, with campaigns from 100,000 NOK." },
];

const TikTokLiveAdvertising: React.FC = () => (
  <>
    <SEO
      title={TITLE}
      description={DESCRIPTION}
      canonical="/tiktok-live-advertising"
      jsonLd={[
        faqLd(faqs),
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://beta-ads.no/" },
            { "@type": "ListItem", position: 2, name: "TikTok LIVE advertising", item: "https://beta-ads.no/tiktok-live-advertising" },
          ],
        },
      ]}
    />

    <div className="min-h-screen bg-background text-foreground">
      {/* ───────── Hero ───────── */}
      <header className={`${W} pt-28 md:pt-36 pb-16 md:pb-24`}>
        <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-muted-foreground">
          <ol className="m-0 p-0 list-none flex items-center gap-2">
            <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">TikTok LIVE</li>
          </ol>
        </nav>
        <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-12 lg:gap-20 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-9 h-9 grid place-items-center rounded-xl bg-foreground text-background [&_svg]:w-5 [&_svg]:h-5"><TikTokMark /></span>
              <span className={kicker}>Platform · TikTok LIVE</span>
              <span className="rounded-full bg-[#e5322d] px-2.5 py-0.5 text-[11px] font-bold text-white">New</span>
            </div>
            <h1 className="text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.2rem] font-bold tracking-[-0.03em] m-0">
              Your brand inside TikTok LIVE.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              Animated overlays inside creators' live streams, now on TikTok LIVE too. The same
              platform and approach as Twitch, YouTube and Kick. We are setting up the first
              campaigns now.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryBtn href={BOOKING_URL} cta="book">Plan a TikTok LIVE campaign</PrimaryBtn>
              <GhostBtn href={SALES_MAIL} cta="email">sales@beta-ads.no</GhostBtn>
            </div>
          </div>

          {/* Vertical live stream, illustration */}
          <figure className="m-0 justify-self-center w-full max-w-[340px]">
            <div className="relative aspect-[9/16] rounded-[36px] overflow-hidden bg-[#0b0a0b] ring-[10px] ring-[#0b0a0b] shadow-[0_40px_80px_-40px_rgba(15,16,18,.55)]">
              <img src="/home/build-stream-bg.webp" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "42% 50%" }} />
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/75 to-transparent" />
              <div className="absolute left-3 top-4 flex items-center gap-2">
                <span className="rounded-md bg-[#fe2c55] px-2 py-0.5 text-[11px] font-bold text-white">LIVE</span>
                <span className="rounded-md bg-black/45 px-2 py-0.5 text-[11px] font-semibold text-white">1.2K</span>
              </div>
              <div className="absolute left-4 right-[38%] bottom-[150px] aspect-[16/10] rounded-xl border-2 border-dashed border-white/80 bg-white/10 backdrop-blur-[2px] grid place-items-center text-center">
                <span className="text-[12px] font-semibold text-white leading-tight px-2">Your animated<br />overlay here</span>
              </div>
              <ul className="absolute left-3 right-14 bottom-5 m-0 p-0 list-none space-y-1.5 text-[11.5px] text-white">
                <li><b className="font-semibold text-white/70 mr-1.5">mia.k</b>wait what is that</li>
                <li><b className="font-semibold text-white/70 mr-1.5">jonas_99</b>link?</li>
                <li><b className="font-semibold text-white/70 mr-1.5">elin.s</b>haha love this stream</li>
              </ul>
            </div>
            <figcaption className="mt-4 text-center text-xs text-muted-foreground">Illustration of an overlay in a vertical live stream.</figcaption>
          </figure>
        </div>
      </header>

      {/* ───────── What carries over ───────── */}
      <section className="border-t border-border py-16 md:py-24">
        <div className={W}>
          <div className="max-w-3xl">
            <div className={`${kicker} mb-4`}>Same platform</div>
            <h2 className={h2}>What you know from Twitch, now on TikTok LIVE.</h2>
          </div>
          <div className="mt-10 md:mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-2">
            {carries.map((c, i) => (
              <div key={c.t} className="border-t border-border py-5">
                <span className="text-sm tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 m-0 text-lg font-semibold tracking-tight">{c.t}</h3>
                <p className="mt-1.5 mb-0 text-[15px] leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Other platforms ───────── */}
      <section className="border-t border-border py-16 md:py-20">
        <div className={`${W} grid sm:grid-cols-3 gap-x-10 gap-y-6`}>
          {[
            ["Twitch", "Ads inside Twitch streams, with a chat command.", "/twitch-advertising"],
            ["YouTube", "Ads inside YouTube live streams and their replays.", "/youtube-advertising"],
            ["Kick", "Ads inside Kick streams, run the same way.", "/kick-advertising"],
          ].map(([t, d, to]) => (
            <Link key={to} to={to} className="group border-t border-border pt-5">
              <span className="text-lg font-semibold tracking-tight">{t} <span aria-hidden="true" className="text-muted-foreground group-hover:text-foreground transition-colors">&rarr;</span></span>
              <p className="mt-1.5 mb-0 text-[15px] leading-relaxed text-muted-foreground">{d}</p>
            </Link>
          ))}
        </div>
      </section>

      <Faq title="Questions about TikTok LIVE" faqs={faqs} />

      {/* ───────── Close ───────── */}
      <section className="border-t border-border py-16 md:py-24">
        <div className={`${W} flex flex-col md:flex-row md:items-end md:justify-between gap-8`}>
          <div className="max-w-2xl">
            <h2 className={h2}>Run one of the first TikTok LIVE campaigns.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">Tell us the market and the product, and we shortlist creators and plan it with you.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <PrimaryBtn href={BOOKING_URL} cta="book">Book a call</PrimaryBtn>
            <GhostBtn href={SALES_MAIL} cta="email">sales@beta-ads.no</GhostBtn>
          </div>
        </div>
      </section>
    </div>
  </>
);

export default TikTokLiveAdvertising;
