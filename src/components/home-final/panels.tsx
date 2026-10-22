import React from "react";
import { FlagNO, FlagSE, FlagFI, FlagDK, TwitchMark, KickMark } from "./marks";

/* The dark product surfaces from the homepage tour (design 31 / 11-night-platform),
   shared so other pages can show the real UI instead of photos. They need a `.bf`
   ancestor for their scoped styles (home-final.css). Pass reveal={false} outside
   the homepage, where no scroll-reveal observer runs. Illustrative UI content. */

export const Corners = () => (
  <>
    <span className="c tl" />
    <span className="c tr" />
    <span className="c bl" />
    <span className="c br" />
  </>
);

const STEP_NAMES = ["Objective", "Target audience", "Format", "Asset", "Review"];
const STEP_SUB = ["Name, objective and dates", "Who should see the ad", "Animated overlay, 1920 × 1080, transparent", "Upload the creative", "Check everything before you submit"];
const STEP_LABEL = [
  "on the objective step: awareness picked over traffic, campaign dates set across November.",
  "on the audience step: Norway, Sweden and Finland on Twitch and Kick, with a shortlist of real Nordic streamers to approve.",
  "on the format step: an animated Glorious overlay previewed on a stream, the !glorious chat command and an optional poll.",
  "on the asset step: the transparent Glorious overlay checked against the 1920 by 1080 frame and corner placement.",
  "on the review step: the stream preview, approved streamers and what happens after the campaign is submitted.",
];

/* Real Nordic streamers from src/data (norskeStreamere, svenskaStreamare):
   followers and last game as published on their profile pages. */
const SHORTLIST: { h: string; n: string; c: "NO" | "SE"; g: string; f: string; ok: boolean }[] = [
  { h: "mrsavage", n: "MrSavage", c: "NO", g: "Fortnite", f: "4.6M", ok: true },
  { h: "anomaly", n: "Anomaly", c: "SE", g: "Counter-Strike", f: "2.8M", ok: true },
  { h: "loeya", n: "Loeya", c: "SE", g: "Fortnite", f: "1.7M", ok: true },
  { h: "knut", n: "Knut", c: "NO", g: "Just Chatting", f: "419K", ok: true },
  { h: "emiliahult", n: "EmiliaHult", c: "SE", g: "Counter-Strike", f: "205K", ok: true },
  { h: "perra", n: "perra", c: "SE", g: "Just Chatting", f: "185K", ok: false },
  { h: "cyrustwo", n: "CyrusTWO", c: "SE", g: "GTA V", f: "134K", ok: true },
  { h: "detoo", n: "detoo", c: "NO", g: "IRL", f: "86K", ok: true },
];
const FLAG = { NO: FlagNO, SE: FlagSE, FI: FlagFI, DK: FlagDK };
const av = (h: string) => `/home/builder/av-${h}.webp`;

const GloriousOnStream: React.FC<{ tag?: string }> = ({ tag }) => (
  <div className="b-stream">
    <img className="b-stream-bg" src="/home/build-stream-bg.webp" alt="" />
    <img className="b-stream-ov" src="/home/glorious-poster.webp" alt="" />
    {tag && <span className="pv-tag">{tag}</span>}
  </div>
);

/** The campaign builder, one panel per step (1 Objective ... 5 Review). Step 3 is
    the homepage graphic. Glorious ran in Finland, Norway and Sweden (case page). */
export const BuildPanel: React.FC<{ reveal?: boolean; step?: number }> = ({ reveal = true, step = 3 }) => {
  const rv = reveal ? " reveal" : "";
  return (
    <div className={`panel panel--build dui${rv}`} role="img" aria-label={`Campaign builder ${STEP_LABEL[step - 1]}`}>
      <div className="steps">
        <div className="steps-h">New campaign</div>
        <ol>
          {STEP_NAMES.map((n, i) => (
            <li key={n} className={i + 1 < step ? "done" : i + 1 === step ? "on" : ""}><span>{i + 1}</span>{n}</li>
          ))}
        </ol>
      </div>
      <div className="b-main">
        <div className="b-head">
          <div>
            <div className="b-title">Glorious V3</div>
            <div className="b-k">{STEP_SUB[step - 1]}</div>
          </div>
          <span className={`r-btn${step === 5 ? " r-btn--go" : ""}`}>{step === 5 ? "Submit campaign" : "Next step"}</span>
        </div>

        {step === 1 && (
          <div className="b-body">
            <div className="b-obj">
              <div className="b-objc on">
                <GloriousOnStream />
                <div className="b-objt"><b>Awareness</b><span>Verified views of the overlay, billed only when it played</span><i className="b-radio" /></div>
              </div>
              <div className="b-objc">
                <div className="b-chat">
                  <div><b style={{ color: "#ff8f6b" }}>kaffekopp</b> that mouse looks clean</div>
                  <div><b style={{ color: "#6bc7ff" }}>fragmaster_99</b> is it wireless?</div>
                  <div><b style={{ color: "#9b8cff" }}>nordicfrag</b> !glorious</div>
                  <div className="bot"><b>beta ads</b> Meet the new Glorious V3 <u>gloriousgaming.com</u></div>
                  <div><b style={{ color: "#4fd39a" }}>sjokolade_k</b> wireless finally</div>
                </div>
                <div className="b-objt"><b>Traffic</b><span>Viewers type the chat command and get your link</span><i className="b-radio" /></div>
              </div>
            </div>
            <div className="b-lbl">November</div>
            <div className="b-cal">
              {Array.from({ length: 30 }, (_, d) => (
                <span key={d} className={d + 1 >= 3 && d + 1 <= 30 ? (d + 1 === 3 || d + 1 === 30 ? "edge" : "in") : ""}>{d + 1}</span>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="b-body">
            <div className="b-filters">
              <span className="on"><FlagNO />Norway</span><span className="on"><FlagSE />Sweden</span><span className="on"><FlagFI />Finland</span>
              <span className="on"><TwitchMark />Twitch</span><span className="on"><KickMark />Kick</span><span>FPS, Fortnite, Just Chatting</span>
            </div>
            <div className="b-lbl b-lbl--row">Shortlist <em>{SHORTLIST.filter(x => x.ok).length} of {SHORTLIST.length} approved</em></div>
            <div className="b-roster">
              {SHORTLIST.map(x => {
                const F = FLAG[x.c];
                return (
                  <div key={x.h} className={`b-st${x.ok ? "" : " off"}`}>
                    <img src={av(x.h)} alt="" />
                    <div><b>{x.n}<F /></b><span>{x.g} · {x.f}</span></div>
                    <i className={`b-tick${x.ok ? " on" : ""}`} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <>
            <div className="preview">
              <div className="pv-bg" aria-hidden="true" />
              <video className="pv-ov" muted playsInline loop preload="none" poster="/home/glorious-poster.webp" aria-hidden="true" tabIndex={-1}>
                <source src="/home/glorious-v3.webm" type="video/webm" />
              </video>
              <span className="pv-tag">Preview on stream</span>
            </div>
          </>
        )}

        {step === 4 && (
          <div className="b-body">
            <div className="b-canvas">
              <div className="b-safe"><span>1920 × 1080</span></div>
              <div className="b-corner"><span>Corner placement</span></div>
              <img src="/home/glorious-poster.webp" alt="" />
            </div>
            <div className="b-file">
              <div className="b-fico">WEBM</div>
              <div className="b-fmeta"><b>glorious-v3.webm</b><span className="b-bar"><i /></span></div>
              <span className="b-ok">Checked</span>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="b-body b-rev">
            <GloriousOnStream tag="Preview on stream" />
            <dl className="b-sum">
              <div><dt>Objective</dt><dd>Awareness</dd></div>
              <div><dt>Dates</dt><dd>3 to 30 Nov</dd></div>
              <div><dt>Markets</dt><dd className="b-flags"><FlagNO /><FlagSE /><FlagFI /></dd></div>
              <div><dt>Platforms</dt><dd className="b-flags"><TwitchMark /><KickMark /></dd></div>
              <div><dt>Streamers</dt><dd><span className="b-stack">{SHORTLIST.filter(x => x.ok).slice(0, 5).map(x => <img key={x.h} src={av(x.h)} alt="" />)}</span>+2</dd></div>
              <div><dt>Format</dt><dd>Overlay, !glorious, poll</dd></div>
            </dl>
            <div className="b-revs">
              {SHORTLIST.filter(x => x.ok).map(x => {
                const F = FLAG[x.c];
                return <div key={x.h}><img src={av(x.h)} alt="" /><b>{x.n}</b><F /></div>;
              })}
            </div>
          </div>
        )}
      </div>

      <div className="b-side">
        {step === 1 && (
          <div className="bcard">
            <div className="bcard-h">How you pay</div>
            <div className="b-bill">
              <div><span>Views that played</span><b>Billed</b></div>
              <i className="b-bill-bar"><em style={{ width: "100%" }} /></i>
              <div><span>Views that did not play</span><b className="mu">Not billed</b></div>
              <i className="b-bill-bar"><em className="mu" style={{ width: "100%" }} /></i>
            </div>
            <div className="b-note" style={{ marginTop: 12 }}>Priced per 1,000 views that played.</div>
          </div>
        )}
        {step === 2 && (
          <div className="bcard">
            <div className="bcard-h">Your approval</div>
            <div className="b-note"><b>You approve every name</b>We shortlist from Streamer Explorer. Remove anyone before launch.</div>
            <div className="b-app">
              {SHORTLIST.slice(0, 4).map(x => (
                <div key={x.h}><img src={av(x.h)} alt="" /><span>{x.n}</span><em className={x.ok ? "ok" : ""}>{x.ok ? "Approved" : "Removed"}</em></div>
              ))}
            </div>
          </div>
        )}
        {step === 3 && (
          <>
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
          </>
        )}
        {step === 4 && (
          <div className="bcard">
            <div className="bcard-h">Checks</div>
            <ul className="b-checks b-checks--tight">
              <li>Transparent background</li>
              <li>1920 × 1080 canvas</li>
              <li>Stays in one corner</li>
              <li>Link: gloriousgaming.com</li>
            </ul>
          </div>
        )}
        {step === 5 && (
          <div className="bcard">
            <div className="bcard-h">After you submit</div>
            <ol className="b-tl">
              <li><b>Streamer approval</b><span>Each streamer accepts the campaign</span></li>
              <li><b>Setup verification</b><span>Every stream checked on air</span></li>
              <li><b>Live report</b><span>Views, clicks and chat in your login</span></li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export const LivePanel: React.FC<{ reveal?: boolean }> = ({ reveal = true }) => {
  const rv = reveal ? " reveal" : "";
  return (
    <div className={`panel panel--live dui${rv}`} role="img" aria-label="Live view: one overlay running across 25 streams at once, with a setup verification list beside it.">
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
  );
};

export const ReportPanel: React.FC<{ reveal?: boolean; compact?: boolean }> = ({ reveal = true, compact = false }) => {
  const rv = reveal ? " reveal" : "";
  return (
    <div className={`panel panel--report dui${compact ? " panel--compact" : ""}${rv}`}>
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
  );
};
