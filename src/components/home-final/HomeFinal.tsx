import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { A, Arrow, BookDemo, FinalFooter, FinalNav, LOGO_DARK, LOGO_LIGHT } from "./FinalChrome";
import { HERO_POSTER, HERO_VIDEO, startHeroPlayer } from "./heroPlayer";
import "./home-final.css";
import "./home-fix.css";
import { BuildPanel, Corners, LivePanel, ReportPanel } from "./panels";

/* Homepage "31 Final / Platform" (approved static design in
   ~/dev/beta-ads-home-v3/31-final-platform), ported 1:1. Styles are scoped
   under .bf; behaviour from main.js lives in the effects below.

   Illustrative UI content inside the product mockups (streamer names, chat
   rows, poll question, verification rows) is carried from the design. */

/** Visible FAQ and the FAQPage JSON-LD on "/" both read this array. */
export const finalFaqs = [
  { q: "How is it priced?", a: "Per 1,000 animation views, with campaigns from 100,000 NOK. Undelivered views are refunded pro rata." },
  { q: "What counts as a view?", a: "A viewer watching while the animation fully played on Twitch, YouTube or Kick. That is what you pay for, and undelivered views are refunded pro rata. The banner and the !brand title stay on screen for the whole stream on top, not billed." },
  { q: "Can we choose the streamers?", a: "Search 39,000+ streamers in Streamer Explorer, and approve the streamer list on request before launch. You also get your own login to the live dashboard." },
  { q: "How is delivery checked?", a: "Each stream is checked on air for the overlay, and each ad play is recorded as a clip you can open in the report. Views that did not play are refunded." },
  { q: "What is in the report?", a: "Completed views, clicks, chat mentions of the brand translated and scored, and the verification clips. You get it as a live dashboard and a PDF you can forward." },
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

/* n/k = the headline result and its unit, each taken from that case page. */
const CASES: { to: string; img: string; b: string; n: string; t: string }[] = [
  { to: "/case-study/samsung", img: "/lovable-uploads/home-case-samsung.webp", b: "Samsung", n: "800K+", t: "Galaxy S25 and Z Fold7, two flights in Norway." },
  { to: "/case-study/kristiania", img: "/lovable-uploads/home-case-kristiania.webp", b: "Høyskolen Kristiania", n: "599K+", t: "Two parallel Twitch campaigns, 31 streamers." },
  { to: "/case-study/shure", img: "/lovable-uploads/home-case-shure.webp", b: "Shure", n: "182K+", t: "A custom overlay for the MV6 creator launch." },
  { to: "/case-study/komplett", img: "/lovable-uploads/home-case-komplett.webp", b: "Komplett", n: "151K+", t: "Månedens Gaming Deal across 34 streamers." },
  { to: "/case-study/glorious", img: "/lovable-uploads/case-glorious-poster.webp", b: "Glorious", n: "137K+", t: "The V3 mouse with 25 creators in three markets." },
  { to: "/case-study/saily", img: "/lovable-uploads/home-case-saily.webp", b: "Saily", n: "102K+", t: "A travel intent eSIM campaign, 22 streamers." },
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
    <div className="bf bf--home" ref={rootRef}>
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
                  </div>
                  <aside className="hp-chat">
                    <div className="hp-chat-h">Stream chat</div>
                    <ol className="hp-msgs">
                      <li><b>flash</b>hei</li>
                      <li><b>erraa</b>yoooo</li>
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
                <img src={`/lovable-uploads/logo-${f}.png`} alt={alt} style={{ height: h }} loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
          <p className="logos__ag">
            We also work with the agencies WPP Media, Publicis and dentsu.{" "}
            <A className="qlink" href="/case-studies">See all case studies <Arrow /></A>
          </p>
        </section>

        {/* 3 TOUR: three chapters, one layout each: heading left, copy right, one surface */}
        <div className="tour" id="tour">
          <section className="ch" id="build">
            <header className="ch__h reveal">
              <h2><b>Build the campaign</b> <span>in one flow.</span></h2>
              <div>
                <p>Your creative becomes an animated overlay with its own chat command, so viewers type !yourbrand and get the link. Add a poll if you want one.</p>
                <A className="qlink" href="/campaign-builder">Campaign builder <Arrow /></A>
              </div>
            </header>
            <BuildPanel />
          </section>

          <section className="ch" id="live">
            <header className="ch__h reveal">
              <h2><b>Every stream</b> <span>checked on air.</span></h2>
              <div>
                <p>The overlay runs on all your streamers at once. Each stream is checked while it is live, and a play that did not happen is not billed.</p>
                <A className="qlink" href="/campaign-compliance">Setup verification <Arrow /></A>
              </div>
            </header>
            <LivePanel />
          </section>

          <section className="ch" id="report">
            <header className="ch__h reveal">
              <h2><b>A report</b> <span>you can forward.</span></h2>
              <div>
                <p>Live in your own dashboard while the campaign runs, and one PDF when it ends: views per streamer, clicks and every brand mention in chat.</p>
                <div className="qlinks">
                  <A className="qlink" href="/livestream-chat-engagement">Chat tracking <Arrow /></A>
                  <A className="qlink" href="/reporting">Reporting <Arrow /></A>
                </div>
              </div>
            </header>
            <ReportPanel />
          </section>
        </div>

        {/* 4 CUSTOMERS */}
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
                <span className="case__n">{c.n}<small>views</small></span>
                <span>{c.t}</span>
                <em>Read case <i aria-hidden="true">&rarr;</i></em>
              </A>
            ))}
          </div>
        </section>

        {/* 4b FREE TOOL: sponsor checker launch film */}
        <section className="sec" id="sponsor-checker" aria-label="Free sponsorship checker">
          <div className="sec__h reveal">
            <h2><b>See every sponsor</b> <span>before you book.</span></h2>
            <A className="qlink" href="/twitch-sponsorship-checker">Try the free checker <Arrow /></A>
          </div>
          <div className="scfilm reveal">
            <video controls playsInline preload="none" poster="/videos/sponsor-checker-poster.webp" width={1920} height={1080}>
              <source src="/videos/sponsor-checker.mp4" type="video/mp4" />
            </video>
            <p>Type a Twitch channel and get every brand that streamer has worked with, with the stream title or chat command that proves it and when it ran. Free, no login.</p>
          </div>
        </section>

        {/* 5 BILLING */}
        <section className="sec" id="billing" aria-label="Billing and price">
          <div className="sec__h reveal">
            <h2><b>Pay for views</b> <span>that played.</span></h2>
          </div>
          <div className="tcards tcards--2 reveal">
            <div className="tcard tcard--static">
              <b>What you pay for</b>
              <span>A view is a viewer watching while the animation fully played. Anything undelivered is refunded pro rata.</span>
              <A className="qlink" href="/working-with-us">How billing works <Arrow /></A>
            </div>
            <div className="tcard tcard--static">
              <b>What it costs</b>
              <span>Campaigns start at 100,000 NOK, priced per 1,000 views that played. You get a quote for your market and budget before anything is booked.</span>
              <A className="qlink" href="/pricing">See pricing <Arrow /></A>
            </div>
          </div>
        </section>

        {/* 6 FAQ */}
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

        {/* 7 CLOSE */}
        <section className="close">
          <div className="close__in reveal">
            <h2><b>Plan your first</b> <span>livestream campaign.</span></h2>
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
