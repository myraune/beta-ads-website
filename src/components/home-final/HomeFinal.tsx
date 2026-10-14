import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { A, Arrow, BookDemo, FinalFooter, FinalNav, LOGO_DARK, LOGO_LIGHT } from "./FinalChrome";
import { HERO_POSTER, HERO_VIDEO, startHeroPlayer } from "./heroPlayer";
import "./home-final.css";
import { BuildPanel, Corners, ReportPanel } from "./panels";

/* Homepage "31 Final / Platform" (approved static design in
   ~/dev/beta-ads-home-v3/31-final-platform), ported 1:1. Styles are scoped
   under .bf; behaviour from main.js lives in the effects below.

   Illustrative UI content inside the product mockups (streamer names, chat
   rows, poll question, verification rows) is carried from the design. */

/** Visible FAQ and the FAQPage JSON-LD on "/" both read this array. */
export const finalFaqs = [
  { q: "How is it priced?", a: "Per 1,000 animation views, with campaigns from 100,000 NOK. Undelivered views are refunded pro rata." },
  { q: "What counts as a view?", a: "One fully played run of the animation on a live stream on Twitch, YouTube or Kick. The overlay stays in the VOD, so replays keep counting." },
  { q: "Can we choose the streamers?", a: "Search 39,000+ streamers in Streamer Explorer, and approve the streamer list on request before launch. You also get your own login to the live dashboard." },
  { q: "How is delivery checked?", a: "Each stream is checked on air for the overlay, and each ad play is recorded as a clip you can open in the report. On the Surfshark Finland campaign, 98.7% of 759 ad plays were verified with a clip. Views that did not play are refunded." },
  { q: "What is in the report?", a: "Completed live views, replay and clip views, clicks, chat mentions of the brand translated and scored, and the verification clips. You get it as a live dashboard and a PDF you can forward." },
  { q: "Are clicks guaranteed?", a: "No. You buy completed views, and clicks and CTR are reported, not guaranteed." },
];

const LOGOS: [string, string, number][] = [
  ["samsung", "Samsung", 16],
  ["logitech", "Logitech", 28],
  ["komplett", "Komplett", 22],
  ["steelseries", "SteelSeries", 18],
  ["shure", "Shure", 20],
  ["glorious", "Glorious", 19],
  ["foodora", "foodora", 21],
  ["saily", "Saily", 26],
];

const yt = (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
/* n/k = the headline result and its unit, each taken from that case page. */
const CASES: { to: string; img: string; b: string; n: string; k: string; t: string }[] = [
  { to: "/case-study/samsung", img: yt("Uw7IIecicB4"), b: "Samsung", n: "800,185", k: "completed live views", t: "Galaxy S25 and Z Fold7, two flights in Norway." },
  { to: "/case-study/shure", img: yt("IZOx_VMdJJg"), b: "Shure", n: "182,554", k: "completed views from two creators", t: "A custom overlay for the MV6 creator launch." },
  { to: "/case-study/komplett", img: yt("ufNq-A4d7iA"), b: "Komplett", n: "151,278", k: "views across 34 streamers", t: "Månedens Gaming Deal, linked straight from chat." },
  { to: "/case-study/glorious", img: "/lovable-uploads/case-glorious-poster.webp", b: "Glorious", n: "137K+", k: "views, 25 creators, three markets", t: "The V3 mouse across the Nordics." },
  { to: "/case-study/kristiania", img: yt("GwE4dagRm_k"), b: "Høyskolen Kristiania", n: "599,252", k: "views across 31 streamers", t: "Two parallel Twitch campaigns." },
  { to: "/case-study/saily", img: yt("DMz-NV1W_Is"), b: "Saily", n: "102,794", k: "completed views across 22 streamers", t: "A travel intent eSIM campaign." },
];

const POSTS: [string, string, string][] = [
  ["/blog/gta-vi-nordic-brand-playbook", "Sep 2, 2026", "GTA VI Explained: What Launches on 19 November, and Why Nordic Brands Care"],
  ["/blog/streamer-university-2026-brand-breakdown", "Jul 29, 2026", "Streamer University 2026: What 1.2 Million Concurrent Viewers Taught Brands About Creator Marketing"],
  ["/blog/clip-analytics-ad-verification-nordic-streaming", "May 12, 2026", "Inside Clip Analytics: How Beta Ads Verifies Every Ad Impression"],
];


/** Motion is off under prefers-reduced-motion and for the build-time prerender
    (headless Chrome reports navigator.webdriver), so the static HTML is complete. */
const motionAllowed = () =>
  typeof window !== "undefined" &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
  !navigator.webdriver;

export const HomeFinal: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const drawRef = useRef<() => void>(() => {});
  const { resolvedTheme } = useTheme();

  // Hero window rise, scroll reveals, hero player and the in-view videos.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const motion = motionAllowed();
    const cleanups: (() => void)[] = [];

    if (motion) {
      root.classList.add("js");
      const w = stageRef.current;
      if (w) {
        w.classList.add("rise");
        requestAnimationFrame(() => requestAnimationFrame(() => w.classList.add("in")));
      }
      const rv = new IntersectionObserver(
        (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); rv.unobserve(e.target); } }),
        { rootMargin: "0px 0px -8% 0px" },
      );
      root.querySelectorAll(".reveal").forEach((el) => rv.observe(el));
      cleanups.push(() => rv.disconnect());
    }

    const canvas = canvasRef.current, spot = spotRef.current, hv = heroVideoRef.current;
    if (canvas && spot && hv) {
      if (motion) hv.preload = "auto";
      const player = startHeroPlayer(canvas, spot, hv, motion);
      drawRef.current = player.draw;
      cleanups.push(player.destroy);
    }

    // Trim clips to their clean part (the wall ends on a logo card).
    root.querySelectorAll<HTMLVideoElement>("video[data-end]").forEach((v) => {
      const e = Number(v.dataset.end);
      const guard = () => { if (v.currentTime >= e) v.currentTime = 0; };
      v.addEventListener("timeupdate", guard);
      const t = window.setInterval(() => { if (!v.paused) guard(); }, 80);
      cleanups.push(() => { v.removeEventListener("timeupdate", guard); window.clearInterval(t); });
    });

    // Reduced motion: every video keeps its poster frame. Otherwise play only while on screen.
    root.querySelectorAll<HTMLVideoElement>("video:not(.hp-src)").forEach((v) => {
      if (!motion) { v.pause(); return; }
      const io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) { if (v.preload === "none") v.preload = "auto"; v.muted = true; v.play().catch(() => {}); }
          else v.pause();
        },
        { rootMargin: "120px" },
      );
      io.observe(v);
      cleanups.push(() => io.disconnect());
    });

    return () => cleanups.forEach((f) => f());
  }, []);

  // The canvas redraws on theme switch (as in the design).
  useEffect(() => { drawRef.current(); }, [resolvedTheme]);

  return (
    <div className="bf" ref={rootRef}>
      <FinalNav />

      <main id="main-content">
        {/* 1 HERO */}
        <section className="hero">
          <div className="hero__wash" aria-hidden="true" />
          <div className="hero__copy">
            <h1>Animated ads inside Twitch, YouTube and Kick streams.</h1>
            <p className="hero__sub">Pick the streamers, launch your overlay on all of them at once, and get a report you can forward. Priced per view that fully played.</p>
            <ul className="hero__facts">
              <li>Can't be skipped or ad blocked</li>
              <li>Every ad play checked on air</li>
              <li>Undelivered views refunded</li>
            </ul>
            <div className="hero__cta">
              <BookDemo />
              <A className="tlink" href="/case-study/surfshark-finland">
                See a real campaign report <Arrow />
              </A>
            </div>
          </div>

          <div className="hp-stage" id="product" ref={stageRef}>
            <div className="hp-light" aria-hidden="true" />
            <div
              className="hp dui"
              role="img"
              aria-label="The Beta Ads platform: a live Samsung Galaxy S25 campaign. The animated overlay runs inside a Twitch stream, verified on stream, and a viewer's !samsung command is answered in chat."
            >
              <aside className="hp-side">
                <div className="hp-brand">
                  <img className="for-light" src={LOGO_LIGHT} alt="" width={74} height={18} />
                  <img className="for-dark" src={LOGO_DARK} alt="" width={74} height={18} />
                </div>
                <div className="hp-ws">
                  <span className="ws__tile">S</span>Samsung<span className="hp-ws-caret" />
                </div>
                <ul className="hp-nav">
                  <li><i />Dashboard</li>
                  <li><i />Streamer Explorer</li>
                  <li className="on"><i />Campaigns</li>
                  <li className="sub"><span className="live-dot" />Galaxy S25</li>
                  <li className="sub dim">Z Fold7</li>
                  <li><i />Streamer lists</li>
                  <li><i />Reports</li>
                </ul>
                <div className="hp-foot">Client login</div>
              </aside>
              <div className="hp-main">
                <div className="hp-bar">
                  <span className="hp-crumb">Campaigns</span>
                  <span className="hp-sep">/</span>
                  <span className="hp-title">Galaxy S25</span>
                  <span className="hp-live"><span className="live-dot" />LIVE</span>
                  <span className="hp-right">Rendered in OBS</span>
                </div>
                <div className="hp-body">
                  <div className="hp-player">
                    <video
                      id="hp-src"
                      className="hp-src"
                      ref={heroVideoRef}
                      muted
                      playsInline
                      loop
                      preload="none"
                      poster={HERO_POSTER}
                      aria-hidden="true"
                      tabIndex={-1}
                    >
                      <source src={HERO_VIDEO} type="video/mp4" />
                    </video>
                    <canvas id="hp-stream" ref={canvasRef} aria-hidden="true" />
                    <div className="hp-spot" id="hp-spot" ref={spotRef} aria-hidden="true">
                      <Corners />
                      <span className="hp-spot-l"><span className="live-dot" />Overlay verified on stream</span>
                    </div>
                    <div className="hp-info">
                      <b>Animated overlay</b>
                      <span>Cannot be skipped or ad blocked. Stays in the VOD.</span>
                    </div>
                  </div>
                  <aside className="hp-chat">
                    <div className="hp-chat-h">Stream chat</div>
                    <ol className="hp-msgs">
                      <li><b>errqa</b>yoooo</li>
                      <li><b>nathalie06</b>kult</li>
                      <li><b>effects25</b>hey</li>
                      <li><b>yaklama</b>gud å stilig</li>
                      <li><b>lafter</b>rått!</li>
                      <li><b>kva3w</b>hva er det for en telefon?</li>
                      <li><b>matlaksen</b>deilig</li>
                      <li className="cmd ask"><b>queendr82</b><code>!samsung</code></li>
                      <li className="cmd answer"><b className="bot">beta ads</b>Sjekk ut nye Galaxy S25 Ultra <span className="url">samsung.com/no</span></li>
                      <li className="late"><b>spacegamer98</b>trenger faktisk en ny tlf</li>
                    </ol>
                    <div className="hp-input">Send a message</div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2 LOGOS */}
        <section className="logos" id="customers" aria-label="Brands and agencies">
          <p className="logos__k">Brands that have run campaigns with us</p>
          <ul className="lg">
            {LOGOS.map(([f, alt, h]) => (
              <li key={f}>
                <img src={`/lovable-uploads/logo-${f}.png`} alt={alt} style={{ height: h }} />
              </li>
            ))}
          </ul>
          <p className="logos__ag">
            We also work with the agencies WPP Media, Publicis and dentsu.{" "}
            <A className="qlink" href="/case-studies">See all case studies <Arrow /></A>
          </p>
        </section>

        {/* 3 TOTALS: one quiet line under the logos, not a big-number block */}
        <section className="proofstrip" aria-label="Totals" id="tour">
          <p>
            <span><b className="num">3M+</b> completed views delivered</span>
            <span><b className="num">19,000+</b> hours of sponsored airtime</span>
            <span><b className="num">29</b> campaigns, each with a full report</span>
          </p>
        </section>

        {/* 4 CHAPTERS */}
        <div className="tour">
          <section className="ch" id="build">
            <header className="ch__h reveal">
              <h2>Build the campaign in one flow.</h2>
              <div>
                <p>Your creative becomes an animated overlay with its own chat command, so viewers can type !yourbrand and get the link. Add a poll if you want one.</p>
                <A className="qlink" href="/twitch-advertising">How it works <Arrow /></A>
              </div>
            </header>
            <BuildPanel />
          </section>

          <section className="ch" id="live">
            <header className="ch__h reveal">
              <h2>Every stream checked on air.</h2>
              <div>
                <p>The overlay runs on all your streamers at once. Each stream is checked for it while live, each ad play is saved as a clip, and plays that did not happen are not billed.</p>
              </div>
            </header>
            <div className="clipproof reveal">
              <figure className="clipproof__frame">
                <img src="/lovable-uploads/case-surfshark-finland/just-chatting.webp" alt="A frame from a recorded verification clip: a Finnish streamer live on Twitch with the Surfshark overlay in the corner." loading="lazy" width={1600} height={900} />
                <span className="clipproof__tag"><span className="live-dot" />Recorded clip of one ad play</span>
                <figcaption>Surfshark Finland, August 2026. Every play leaves a clip like this in the report.</figcaption>
              </figure>
              <div className="clipproof__side">
                <div className="clipproof__big"><b className="num">98.7%</b><span>of 759 ad plays verified with a recorded clip</span></div>
                <ol className="clipproof__checks">
                  <li><b>Overlay placed</b><span>The overlay is set up in the streamer's broadcast.</span></li>
                  <li><b>Visible on stream</b><span>It shows in the live picture viewers see.</span></li>
                  <li><b>Animation played</b><span>The full run played, so it counts as a view.</span></li>
                </ol>
                <p className="clipproof__note">A play that did not happen is not billed.</p>
              </div>
            </div>
            <div className="deep reveal">
              <span className="deep__k">More detail</span>
              <A className="tcard" href="/campaign-compliance"><b>Setup verification <Arrow /></b><span>Every channel checked on air.</span></A>
            </div>
          </section>

          <section className="ch" id="report">
            <div className="split reveal">
              <div className="split__copy">
                <h2>A report you can forward to the client.</h2>
                <p>Live in your own dashboard while the campaign runs, and as one PDF when it ends.</p>
                <ul className="split__list">
                  <li>Completed live views, per streamer and per stream</li>
                  <li>Replay and clip views on top</li>
                  <li>Clicks from the chat command</li>
                  <li>Every brand mention in chat, translated and scored</li>
                  <li>The verification clips</li>
                </ul>
              </div>
              <ReportPanel compact reveal={false} />
            </div>
            <div className="deep reveal">
              <span className="deep__k">More detail</span>
              <A className="tcard" href="/livestream-chat-engagement"><b>Chat tracking <Arrow /></b><span>Every brand mention, translated and scored.</span></A>
              <A className="tcard" href="/replay-reach"><b>Replay reach <Arrow /></b><span>Views keep counting after the stream.</span></A>
            </div>
          </section>
        </div>

        {/* WHERE IT RUNS */}
        <section className="where" aria-label="Where it runs">
          <div className="where__in reveal">
            <h2 className="where__h">Where it runs</h2>
            <A href="/twitch-advertising"><b>Twitch <Arrow /></b><span>Ads inside Twitch streams, with a chat command.</span></A>
            <A href="/youtube-advertising"><b>YouTube <Arrow /></b><span>Ads inside YouTube live streams and their replays.</span></A>
            <A href="/kick-advertising"><b>Kick <Arrow /></b><span>Ads inside Kick streams, run the same way.</span></A>
            <A href="/nordic-livestream-advertising"><b>Nordics <Arrow /></b><span>Local streamers for Nordic brands and markets.</span></A>
          </div>
        </section>

        {/* 6 CUSTOMERS */}
        <section className="sec" id="samsung" aria-label="Case studies">
          <div className="sec__h reveal">
            <h2>Campaigns that ran.</h2>
            <A className="qlink" href="/case-studies">All case studies <Arrow /></A>
          </div>
          <div className="cases reveal">
            {CASES.map((c) => (
              <A className="case" href={c.to} key={c.to}>
                <span className="case__img"><img src={c.img} alt="" loading="lazy" width={1280} height={720} /></span>
                <b>{c.b}</b>
                <span className="case__n">{c.n}<small>{c.k}</small></span>
                <span>{c.t}</span>
                <em>Read case <i aria-hidden="true">&rarr;</i></em>
              </A>
            ))}
          </div>
        </section>

        {/* 7 GUARANTEE + COST */}
        <section className="sec" id="billing" aria-label="Billing and price">
          <div className="sec__h reveal">
            <h2>Pay only for views that played.</h2>
          </div>
          <div className="tcards tcards--3b reveal">
            <div className="tcard tcard--static">
              <b>What you pay for</b>
              <span>A view is one full run of the animation on a live stream. Anything undelivered is refunded pro rata.</span>
              <A className="qlink" href="/working-with-us">How billing works <Arrow /></A>
            </div>
            <div className="tcard tcard--static">
              <b>What it costs</b>
              <span>Campaigns start at 100,000 NOK, priced per 1,000 views that played. Replay and clip views come on top at no cost, so the effective CPM usually lands around 200 to 300 NOK.</span>
              <A className="qlink" href="/twitch-advertising-cost">See the full price guide <Arrow /></A>
            </div>
            <div className="tcard tcard--static">
              <b>Worked example</b>
              <div className="calc" aria-label="Example: views bought, delivered and billed">
                <div><span>Views you buy</span><b>100,000</b></div>
                <div><span>Views that fully played</span><b>96,000</b></div>
                <div><span>You are billed for</span><b>96,000</b></div>
                <div><span>Refunded</span><b>4,000</b></div>
              </div>
              <span>Illustrative numbers. Replay views are reported on top and not billed.</span>
            </div>
          </div>
        </section>

        {/* 8 FAQ */}
        <section className="faq" id="faq" aria-label="Questions">
          <h2>Questions buyers ask</h2>
          <div className="faq__list">
            {finalFaqs.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* BLOG */}
        <section className="sec sec--blog" aria-label="From the blog">
          <div className="sec__h reveal">
            <h2>From the blog</h2>
            <A className="qlink" href="/blog">All articles <Arrow /></A>
          </div>
          <div className="tcards tcards--3 reveal">
            {POSTS.map(([to, date, title]) => (
              <A className="tcard" href={to} key={to}>
                <i>{date}</i>
                <b>{title}</b>
                <em>Read <Arrow /></em>
              </A>
            ))}
          </div>
        </section>

        {/* AUDIENCES */}
        <section className="aud" aria-label="Agencies and streamers">
          <div className="aud__in reveal">
            <A href="/managed-campaigns"><b>For brands <Arrow /></b><span>We run the campaign for you, from brief to report.</span></A>
            <A href="/self-serve"><b>For media agencies <Arrow /></b><span>Your own login to launch and resell campaigns.</span></A>
          </div>
        </section>

        {/* 9 CLOSE */}
        <section className="close">
          <div className="close__in reveal">
            <h2>Plan your first livestream campaign.</h2>
            <p>In 30 minutes we shortlist streamers for your market, show the overlay with your creative, and estimate delivery for your budget.</p>
            <div className="hero__cta">
              <BookDemo />
              <a className="tlink" href="mailto:sales@beta-ads.no" data-cta="email">sales@beta-ads.no</a>
            </div>
          </div>
        </section>
      </main>

      <FinalFooter />
    </div>
  );
};
