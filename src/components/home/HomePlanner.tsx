import React, { useEffect, useMemo, useRef, useState } from "react";
import { BOOKING_SHORT_LINK } from "@/components/BookingCalendar";
import { LazyVideo, useReducedMotion } from "./LazyVideo";

// Andreas must approve showing the ladder publicly before this goes live.
// Billed CPM ladder from the brief. Views are the rounded figures we quote.
const LADDER = {
  "100": { budget: 100_000, cpm: 500, views: 200_000 },
  "200": { budget: 200_000, cpm: 460, views: 435_000 },
  "300": { budget: 300_000, cpm: 420, views: 714_000 },
  "400": { budget: 400_000, cpm: 400, views: 1_000_000 },
} as const;
type BudgetKey = keyof typeof LADDER;
const BUDGETS = Object.keys(LADDER) as BudgetKey[];
const MAX_VIEWS = LADDER["400"].views;

const MARKETS = {
  norway: "Norway",
  sweden: "Sweden",
  denmark: "Denmark",
  finland: "Finland",
  nordics: "all Nordic markets",
} as const;
const MARKET_LABEL: Record<MarketKey, string> = {
  norway: "Norway",
  sweden: "Sweden",
  denmark: "Denmark",
  finland: "Finland",
  nordics: "All Nordics",
};
type MarketKey = keyof typeof MARKETS;

const GOALS = {
  awareness: { line: "awareness", short: "Awareness", hint: "Be seen and remembered" },
  clicks: { line: "clicks", short: "Clicks", hint: "Send viewers to a page" },
  launch: { line: "a product launch", short: "Product launch", hint: "Show something new" },
} as const;
type GoalKey = keyof typeof GOALS;

/* Real material only: recordings of real campaigns, and a real overlay file. */
const EXAMPLES: Record<
  GoalKey,
  { video: string; poster?: string; crop?: string; file?: boolean; alt: string; kind: string; title: string; text: string }
> = {
  awareness: {
    video: "/home/samsung-s25-stream-a.mp4",
    poster: "/home/samsung-s25-stream-a.jpg",
    crop: "crop",
    alt: "Samsung Galaxy S25 overlay running on a live Norwegian stream",
    kind: "Real campaign, live stream",
    title: "Samsung Galaxy S25",
    text: "Product and name on screen every time it plays. Built to be recognised.",
  },
  clicks: {
    video: "/home/komplett-stream.mp4",
    poster: "/home/komplett-stream.jpg",
    crop: "crop crop--k",
    alt: "Komplett product offer overlay on a live stream, with the chat command in chat",
    kind: "Real campaign, live stream",
    title: "Komplett: rotating product offers",
    text: "Price and saving on screen, and a chat command that drops the link in chat.",
  },
  launch: {
    video: "/lovable-uploads/overlay-shure-gca.webm",
    file: true,
    alt: "Shure MV6 launch overlay animation",
    kind: "Real overlay file, as it runs in OBS",
    title: "Shure MV6 launch",
    text: "The product, the box and one line. Transparent, so it sits on top of the streamer's own layout.",
  },
};

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

const planText = (b: BudgetKey, m: MarketKey, g: GoalKey) => {
  const L = LADDER[b];
  return (
    `Budget: ${fmt(L.budget)} NOK\n` +
    `Market: ${MARKET_LABEL[m]}\n` +
    `Goal: ${GOALS[g].short}\n` +
    `Estimated animation views: ${fmt(L.views)} (billed CPM ${L.cpm} NOK)\n` +
    `Included: custom animated overlay, !brand chat command, optional poll, replay reach, automated report`
  );
};

/** The overlay file has no poster and its first frames are empty, so under
 * reduced motion it is loaded paused on a frame that shows the product. */
const StillOverlay: React.FC<{ src: string; label: string }> = ({ src, label }) => {
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <video
      ref={ref}
      src={src}
      muted
      playsInline
      preload="metadata"
      aria-label={label}
      onLoadedMetadata={() => {
        const v = ref.current;
        if (v) v.currentTime = Math.min(3, (v.duration || 6) / 2);
      }}
      onClick={() => {
        const v = ref.current;
        if (!v) return;
        v.loop = true;
        if (v.paused) v.play().catch(() => {});
        else v.pause();
      }}
      style={{ cursor: "pointer" }}
    />
  );
};

export const HomePlanner: React.FC = () => {
  const [budget, setBudget] = useState<BudgetKey>("200");
  const [market, setMarket] = useState<MarketKey>("norway");
  const [goal, setGoal] = useState<GoalKey>("awareness");
  const [touched, setTouched] = useState(false);
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);

  const L = LADDER[budget];
  const slug = `${budget}k-${market}-${goal}`;

  // A shared plan link (/#plan=300k-sweden-clicks) restores the plan and lands on the planner.
  useEffect(() => {
    const m = /plan=(\d00)k-([a-z]+)-([a-z]+)/.exec(window.location.hash || "");
    if (!m) return;
    if (m[1] in LADDER) setBudget(m[1] as BudgetKey);
    if (m[2] in MARKETS) setMarket(m[2] as MarketKey);
    if (m[3] in GOALS) setGoal(m[3] as GoalKey);
    const t = window.setTimeout(() => section.current?.scrollIntoView({ block: "start" }), 120);
    return () => window.clearTimeout(t);
  }, []);

  // Write the plan to the URL only after the visitor changes something, so a
  // plain visit to / keeps a clean URL.
  useEffect(() => {
    if (!touched) return;
    try {
      history.replaceState(history.state, "", `#plan=${slug}`);
    } catch {
      /* ignore */
    }
  }, [slug, touched]);

  // The big number counts to its new value; under reduced motion it just changes.
  const [shown, setShown] = useState<number>(L.views);
  const shownRef = useRef<number>(L.views);
  useEffect(() => {
    const to = L.views;
    if (reduce) {
      shownRef.current = to;
      setShown(to);
      return;
    }
    const from = shownRef.current;
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / 420);
      const v = from + (to - from) * (1 - Math.pow(1 - k, 3));
      shownRef.current = v;
      setShown(v);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [L.views, reduce]);

  const { mailto, bookHref } = useMemo(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://beta-ads.no";
    const subject = `Livestream plan: ${fmt(L.budget)} NOK, ${MARKET_LABEL[market]}, ${GOALS[goal].short.toLowerCase()}`;
    const body =
      `Hi Beta Ads,\n\nPlease send me this plan and what it would look like for us.\n\n` +
      planText(budget, market, goal) +
      `\n\nPlan link: ${origin}/#plan=${slug}\n\nCompany:\nName:\n`;
    return {
      mailto: `mailto:sales@beta-ads.no?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      bookHref: `${BOOKING_SHORT_LINK}#plan=${slug}`,
    };
  }, [L.budget, budget, market, goal, slug]);

  const onBook = () => {
    // Google's booking page ignores the hash, so the plan also goes to the
    // clipboard to paste into the booking note.
    const txt = planText(budget, market, goal);
    navigator.clipboard?.writeText(txt).then(() => setCopied(true), () => {});
  };

  const pick = <T,>(set: (v: T) => void) => (v: T) => {
    set(v);
    setTouched(true);
    setCopied(false);
  };
  const pickBudget = pick(setBudget);
  const pickMarket = pick(setMarket);
  const pickGoal = pick(setGoal);

  const ex = EXAMPLES[goal];

  return (
    <section className="bh-plan-sec" id="plan" ref={section} aria-label="Campaign planner">
      <div className="bh-wrap">
        <div className="bh-plan-head">
          <h2 className="bh-h2">See what your budget buys inside live streams.</h2>
          <p className="bh-plan-sub">
            Pick a budget, a market and a goal. Billed per 1,000 animation views, from 100,000&nbsp;NOK.
          </p>
        </div>

        <form className="bh-planner" aria-label="Budget, market and goal" onSubmit={(e) => e.preventDefault()}>
          <div className="bh-p-inputs">
            <fieldset className="bh-field">
              <legend>Budget</legend>
              <div className="bh-seg bh-seg--budget">
                {BUDGETS.map((b) => (
                  <label key={b}>
                    <input
                      type="radio"
                      name="bh-budget"
                      value={b}
                      checked={budget === b}
                      onChange={() => pickBudget(b)}
                    />
                    <span>
                      <b className="bh-num">{b}k</b>
                      <small>NOK</small>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="bh-field">
              <legend>Market</legend>
              <div className="bh-seg bh-seg--market">
                {(Object.keys(MARKETS) as MarketKey[]).map((m) => (
                  <label key={m}>
                    <input
                      type="radio"
                      name="bh-market"
                      value={m}
                      checked={market === m}
                      onChange={() => pickMarket(m)}
                    />
                    <span>{MARKET_LABEL[m]}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="bh-field">
              <legend>Goal</legend>
              <div className="bh-seg bh-seg--goal">
                {(Object.keys(GOALS) as GoalKey[]).map((g) => (
                  <label key={g}>
                    <input type="radio" name="bh-goal" value={g} checked={goal === g} onChange={() => pickGoal(g)} />
                    <span>
                      <b>{GOALS[g].short}</b>
                      <small>{GOALS[g].hint}</small>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="bh-p-result" aria-live="polite">
            <p className="bh-result-label">
              Estimated animation views <span className="bh-tag">estimate</span>
            </p>
            <p className="bh-views bh-num" data-views={L.views}>
              {fmt(shown)}
            </p>
            <p className="bh-math bh-num">
              {fmt(L.budget)} NOK at <strong>{L.cpm} NOK CPM</strong>, the price per 1,000 views.
            </p>
            <div className="bh-actions">
              <a
                className="bh-btn bh-btn--primary"
                href={bookHref}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="book"
                data-plan={slug}
                onClick={onBook}
              >
                Book a call about this plan
              </a>
              <a className="bh-btn bh-btn--quiet" href={mailto} data-cta="email" data-plan={slug}>
                Email me this plan
              </a>
            </div>
            <p className="bh-copied" role="status">
              {copied ? "Plan copied. Paste it into the booking note." : ""}
            </p>
          </div>

          <div className="bh-p-example">
            <figure className="bh-example">
              <div className={`bh-ex-media${ex.file ? " is-file" : ""}`}>
                {ex.file && reduce ? (
                  <StillOverlay key={goal} src={ex.video} label={ex.alt} />
                ) : (
                  <LazyVideo key={goal} src={ex.video} poster={ex.poster} className={ex.crop} label={ex.alt} />
                )}
              </div>
              <figcaption>
                <span className="bh-ex-kind">{ex.kind}</span>
                <strong>{ex.title}</strong>
                <span>{ex.text}</span>
              </figcaption>
            </figure>
          </div>

          <div className="bh-p-ladder">
            <p className="bh-ladder-rule">The bigger the budget, the lower the CPM.</p>
            <table className="bh-ladder">
              <thead>
                <tr>
                  <th scope="col">Budget, NOK</th>
                  <th scope="col">CPM</th>
                  <th scope="col">Views</th>
                </tr>
              </thead>
              <tbody>
                {BUDGETS.map((b) => {
                  const r = LADDER[b];
                  return (
                    <tr key={b} className={b === budget ? "is-on" : undefined} onClick={() => pickBudget(b)}>
                      <td className="bh-num">{fmt(r.budget)}</td>
                      <td className="bh-num">{r.cpm}</td>
                      <td>
                        <div className="bh-v">
                          <span className="bh-bar">
                            <i style={{ width: `${(r.views / MAX_VIEWS) * 100}%` }} />
                          </span>
                          <span className="bh-num">{fmt(r.views)}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="bh-p-included">
            <p className="bh-inc-head">Always included</p>
            <ul>
              <li>
                <b>Custom animated overlay</b> built for your brand
              </li>
              <li>
                <b>Chat command</b> <code className="bh-code">!brand</code> gives viewers your link
              </li>
              <li>
                <b>In-stream poll</b> if you want one
              </li>
              <li>
                <b>Replay reach</b>: the overlay stays in the VOD
              </li>
              <li>
                <b>Automated report</b> when the campaign ends
              </li>
            </ul>
          </div>

          <div className="bh-p-foot">
            <p className="bh-summary">
              Your plan: <b>{fmt(L.budget)} NOK</b> in <b>{MARKETS[market]}</b> for <b>{GOALS[goal].line}</b>. About{" "}
              <b className="bh-num">{fmt(L.views)}</b> animation views at {L.cpm} NOK CPM.
            </p>
            <p className="bh-fine">
              Estimate from the billed CPM. Once clips and replay views are counted, effective CPM usually lands around
              200 to 300 NOK.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default HomePlanner;
