import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { A, Arrow, BookDemo, FinalFooter, FinalNav, LOGO_DARK, LOGO_LIGHT } from "./FinalChrome";
import { HERO_POSTER, HERO_VIDEO, startHeroPlayer } from "./heroPlayer";
import "./home-final.css";

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
  { q: "Are clicks guaranteed?", a: "No. You buy completed views, and clicks and CTR are reported, not guaranteed. For reference, the Samsung Galaxy S25 Ultra campaign averaged a 2.93% CTR." },
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
const CASES: { to: string; img: string; b: string; t: string }[] = [
  { to: "/case-study/samsung", img: yt("Uw7IIecicB4"), b: "Samsung", t: "Galaxy S25 and Z Fold7: 800,185 completed views, 2.93% average CTR on the S25 Ultra." },
  { to: "/case-study/shure", img: yt("IZOx_VMdJJg"), b: "Shure", t: "A custom overlay for the MV6 creator launch." },
  { to: "/case-study/komplett", img: yt("ufNq-A4d7iA"), b: "Komplett", t: "Månedens Gaming Deal, linked straight from chat." },
  { to: "/case-study/glorious", img: "/lovable-uploads/case-glorious-poster.webp", b: "Glorious", t: "Reaching the Nordic gaming community." },
  { to: "/case-study/kristiania", img: yt("GwE4dagRm_k"), b: "Høyskolen Kristiania", t: "Two parallel Twitch campaigns." },
  { to: "/case-study/saily", img: yt("DMz-NV1W_Is"), b: "Saily", t: "A travel intent eSIM campaign." },
];

const POSTS: [string, string, string][] = [
  ["/blog/gta-vi-nordic-brand-playbook", "Sep 2, 2026", "GTA VI Explained: What Launches on 19 November, and Why Nordic Brands Care"],
  ["/blog/streamer-university-2026-brand-breakdown", "Jul 29, 2026", "Streamer University 2026: What 1.2 Million Concurrent Viewers Taught Brands About Creator Marketing"],
  ["/blog/clip-analytics-ad-verification-nordic-streaming", "May 12, 2026", "Inside Clip Analytics: How Beta Ads Verifies Every Ad Impression"],
];

const Corners = () => (
  <>
    <span className="c tl" />
    <span className="c tr" />
    <span className="c bl" />
    <span className="c br" />
  </>
);

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
            <h1>
              <b>The platform</b> <span>for livestream ads.</span>
            </h1>
            <p className="hero__sub">Find the streamers, launch the overlay and read the report. One login for Twitch, YouTube and Kick.</p>
            <div className="hero__cta">
              <BookDemo />
              <a className="tlink" href="#build">
                Take the tour <Arrow />
              </a>
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

        {/* 3 STATEMENT */}
        <section className="statement reveal" id="tour">
          <h2><b>One login,</b> <span>from shortlist to report.</span></h2>
        </section>

        {/* 4 CHAPTERS */}
        <div className="tour">
          <section className="ch" id="build">
            <header className="ch__h reveal">
              <h2><b>Build the campaign</b> <span>in one flow.</span></h2>
              <div>
                <p>Your creative becomes an animated overlay with its own chat command. Add a poll if you want one.</p>
                <A className="qlink" href="/twitch-advertising">How it works <Arrow /></A>
              </div>
            </header>
            <div
              className="panel panel--build dui reveal"
              role="img"
              aria-label="Campaign builder on the format step: an animated Glorious overlay previewed on a stream, the !glorious chat command and an optional poll."
            >
              <div className="steps">
                <div className="steps-h">New campaign</div>
                <ol>
                  <li className="done"><span>1</span>Objective</li>
                  <li className="done"><span>2</span>Target audience</li>
                  <li className="on"><span>3</span>Format</li>
                  <li><span>4</span>Asset</li>
                  <li><span>5</span>Review</li>
                </ol>
              </div>
              <div className="b-main">
                <div className="b-head">
                  <div>
                    <div className="b-title">Glorious V3</div>
                    <div className="b-k">Animated overlay, 1920 &times; 1080, transparent</div>
                  </div>
                  <span className="r-btn">Next step</span>
                </div>
                <div className="preview">
                  <div className="pv-bg" aria-hidden="true" />
                  <video className="pv-ov" muted playsInline loop preload="none" poster="/home/glorious-poster.webp" aria-hidden="true" tabIndex={-1}>
                    <source src="/home/glorious-v3.webm" type="video/webm" />
                  </video>
                  <span className="pv-tag">Preview on stream</span>
                </div>
              </div>
              <div className="b-side">
                <div className="bcard">
                  <div className="bcard-h">Chat command</div>
                  <div className="field"><code>!glorious</code></div>
                  <div className="reply"><b>beta ads</b>Meet the new Glorious V3 <span className="url">gloriousgaming.com</span></div>
                </div>
                <div className="bcard">
                  <div className="bcard-h">Poll <span className="toggle on" aria-hidden="true"><i /></span></div>
                  <div className="field q">Wireless or wired?</div>
                  <div className="opt">Wireless</div>
                  <div className="opt">Wired</div>
                </div>
              </div>
            </div>
          </section>

          <section className="ch" id="live">
            <header className="ch__h reveal">
              <h2><b>Verified on</b> <span>every channel.</span></h2>
              <div>
                <p>One overlay, 25 streams at once. Every channel is checked on air, and every check lands in your report.</p>
              </div>
            </header>
            <div className="panel panel--live dui reveal" role="img" aria-label="Live view: one overlay running across 25 streams at once, with a setup verification list beside it.">
              <div className="wall">
                <div className="wall-crop">
                  <video data-end="4.7" muted playsInline loop preload="none" poster="/home/samsung-s25-wall.jpg" aria-hidden="true" tabIndex={-1}>
                    <source src="/home/samsung-s25-wall.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="wall-grid" aria-hidden="true" />
                <div className="wall-pick" aria-hidden="true"><Corners /></div>
              </div>
              <div className="verify">
                <div className="v-head">
                  <span>Setup verification</span>
                  <span className="v-all"><i className="live-dot" />25 of 25</span>
                </div>
                <ol className="v-list">
                  <li><span className="t">01</span>Overlay placed<span className="ok">Verified</span></li>
                  <li className="pick"><span className="t">08</span>Visible on stream<span className="ok">Verified</span></li>
                  <li><span className="t">11</span>Animation running<span className="ok">Verified</span></li>
                  <li><span className="t">14</span>Overlay placed<span className="ok">Verified</span></li>
                  <li><span className="t">21</span>Animation running<span className="ok">Verified</span></li>
                  <li><span className="t">25</span>Overlay placed<span className="ok">Verified</span></li>
                </ol>
              </div>
            </div>
            <div className="deep reveal">
              <span className="deep__k">Deep dive</span>
              <A className="tcard" href="/campaign-compliance"><b>Setup verification <Arrow /></b><span>Every channel checked on air.</span></A>
            </div>
          </section>

          <section className="ch" id="report">
            <header className="ch__h reveal">
              <h2><b>Reporting</b> <span>you can forward.</span></h2>
              <div>
                <p>Every brand mention in chat, translated and scored. Replays keep counting, and it all lands in one PDF.</p>
              </div>
            </header>
            <div className="panel panel--report dui reveal">
              <div className="r-side">
                <div className="r-brand">Samsung</div>
                <div className="r-camp">Galaxy S25 and Z Fold7</div>
                <ul className="r-nav">
                  <li><i />Setup verification</li>
                  <li className="on"><i />Chat tracking</li>
                  <li><i />Replay reach</li>
                  <li><i />PDF report</li>
                </ul>
              </div>
              <div className="r-main">
                <div className="r-top">
                  <div>
                    <div className="r-k">Completed views</div>
                    <div className="r-num num">800,185</div>
                  </div>
                  <div className="r-states">
                    <span className="seg"><b className="on">Live + replays</b><b>Live</b><b>Replays</b></span>
                    <span className="tbtn tbtn--dark">Export PDF</span>
                  </div>
                </div>
                <div className="r-table">
                  <div className="r-row r-th"><span>Time</span><span>Message</span><span>Translation</span><span>Score</span></div>
                  <div className="r-row"><span className="t">00:41:12</span><span>den nye S25 ser rå ut</span><span className="g">the new S25 looks sick</span><span><i className="sc">Positive</i></span></div>
                  <div className="r-row"><span className="t">00:58:30</span><span><code>!s25</code></span><span className="g">link requested, answered</span><span><i className="sc sc--hot">Intent</i></span></div>
                  <div className="r-row"><span className="t">01:15:03</span><span>hvor mye koster den?</span><span className="g">how much does it cost?</span><span><i className="sc sc--hot">Intent</i></span></div>
                  <div className="r-row"><span className="t">01:33:20</span><span>kameraet er helt sinnssykt</span><span className="g">the camera is insane</span><span><i className="sc">Positive</i></span></div>
                  <div className="r-row"><span className="t">02:19:36</span><span>trenger faktisk en ny tlf</span><span className="g">actually need a new phone</span><span><i className="sc sc--hot">Intent</i></span></div>
                </div>
              </div>
            </div>
            <div className="deep reveal">
              <span className="deep__k">Deep dive</span>
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

        {/* 5 NUMBERS */}
        <section className="totals" aria-label="Totals">
          <div className="totals__in reveal">
            <div><b className="num">3M+</b><span>completed views</span></div>
            <div><b className="num">19,000+</b><span>hours of sponsored airtime</span></div>
            <div><b className="num">29</b><span>campaigns, each with a report</span></div>
          </div>
        </section>

        {/* 6 CUSTOMERS */}
        <section className="sec" id="samsung" aria-label="Case studies">
          <div className="sec__h reveal">
            <h2><b>Campaigns</b> <span>that ran.</span></h2>
            <A className="qlink" href="/case-studies">All case studies <Arrow /></A>
          </div>
          <div className="cases reveal">
            {CASES.map((c) => (
              <A className="case" href={c.to} key={c.to}>
                <span className="case__img"><img src={c.img} alt="" loading="lazy" width={1280} height={720} /></span>
                <b>{c.b}</b>
                <span>{c.t}</span>
                <em>Read case <i aria-hidden="true">&rarr;</i></em>
              </A>
            ))}
          </div>
        </section>

        {/* 7 GUARANTEE + COST */}
        <section className="sec" id="billing" aria-label="Billing and price">
          <div className="sec__h reveal">
            <h2><b>Pay for views</b> <span>that played.</span></h2>
          </div>
          <div className="tcards tcards--2 reveal">
            <div className="tcard tcard--static">
              <b>What you pay for</b>
              <span>A view is one full run of the animation on a live stream. Anything undelivered is refunded pro rata.</span>
              <A className="qlink" href="/working-with-us">How billing works <Arrow /></A>
            </div>
            <div className="tcard tcard--static">
              <b>What it costs</b>
              <span>From 100,000 NOK. Priced per 1,000 views that played. Once clips and replay views are counted, effective CPM usually lands around 200 to 300 NOK.</span>
              <A className="qlink" href="/twitch-advertising-cost">See the full price guide <Arrow /></A>
            </div>
          </div>
        </section>

        {/* 8 FAQ */}
        <section className="faq" id="faq" aria-label="Questions">
          <h2><b>Questions</b> <span>buyers ask</span></h2>
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
        <section className="sec" aria-label="From the blog">
          <div className="sec__h reveal">
            <h2><b>From</b> <span>the blog.</span></h2>
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
            <A href="/working-with-us"><b>For media agencies <Arrow /></b><span>The buying spec for your plan.</span></A>
            <A href="/streamers"><b>For streamers <Arrow /></b><span>Get paid for brand overlays.</span></A>
          </div>
        </section>

        {/* 9 CLOSE */}
        <section className="close">
          <div className="close__in reveal">
            <h2><b>Be campaign</b> <span>number 30.</span></h2>
            <p>We walk you through the platform with your market and your creative.</p>
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
