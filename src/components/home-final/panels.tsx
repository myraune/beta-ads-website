import React from "react";

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
const STEP_LABEL: Record<number, string> = {
  1: "on the objective step: awareness picked, campaign dates set.",
  2: "on the audience step: Norway, Sweden and Finland, Twitch and Kick, gaming categories.",
  3: "on the format step: an animated Glorious overlay previewed on a stream, the !glorious chat command and an optional poll.",
  4: "on the asset step: the transparent overlay file checked against the spec, with the click-through link.",
  5: "on the review step: every choice in one summary before the campaign is submitted.",
};

/** The campaign builder, one panel per step (1 Objective ... 5 Review). Step 3 is
    the homepage graphic. Glorious ran in Finland, Norway and Sweden (case page). */
export const BuildPanel: React.FC<{ reveal?: boolean; step?: number }> = ({ reveal = true, step = 3 }) => {
  const rv = reveal ? " reveal" : "";
  return (
    <div className={`panel panel--build dui${rv}`} role="img" aria-label={`Campaign builder ${STEP_LABEL[step]}`}>
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
            <div className="b-k">{["Name, objective and dates", "Who should see the ad", "Animated overlay, 1920 \u00d7 1080, transparent", "Upload the creative", "Check everything before you submit"][step - 1]}</div>
          </div>
          <span className={`r-btn${step === 5 ? " r-btn--go" : ""}`}>{step === 5 ? "Submit campaign" : "Next step"}</span>
        </div>

        {step === 1 && (
          <div className="b-body">
            <div className="b-opts">
              <div className="b-opt on"><b>Awareness</b><span>As many verified views as the budget buys</span><i className="b-radio" /></div>
              <div className="b-opt"><b>Traffic</b><span>Optimised for clicks to your site</span><i className="b-radio" /></div>
            </div>
            <div className="b-grid2">
              <div><div className="b-lbl">Campaign name</div><div className="field">Glorious V3 launch</div></div>
              <div><div className="b-lbl">Dates</div><div className="field">3 Nov to 30 Nov</div></div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="b-body">
            <div className="b-lbl">Markets</div>
            <div className="b-chips"><span className="on">Norway</span><span className="on">Sweden</span><span className="on">Finland</span><span>Denmark</span></div>
            <div className="b-lbl">Platforms</div>
            <div className="b-chips"><span className="on">Twitch</span><span className="on">Kick</span><span>YouTube</span></div>
            <div className="b-lbl">Categories</div>
            <div className="b-chips"><span className="on">FPS</span><span className="on">Battle royale</span><span className="on">Just Chatting</span><span>Sports</span><span>Strategy</span></div>
            <div className="b-lbl">Language</div>
            <div className="b-chips"><span className="on">Local language</span><span>English</span></div>
          </div>
        )}

        {step === 3 && (
          <div className="preview">
            <div className="pv-bg" aria-hidden="true" />
            <video className="pv-ov" muted playsInline loop preload="none" poster="/home/glorious-poster.webp" aria-hidden="true" tabIndex={-1}>
              <source src="/home/glorious-v3.webm" type="video/webm" />
            </video>
            <span className="pv-tag">Preview on stream</span>
          </div>
        )}

        {step === 4 && (
          <div className="b-body">
            <div className="b-file">
              <img src="/home/glorious-poster.webp" alt="" />
              <div><b>glorious-v3.webm</b><span>Uploaded</span></div>
              <span className="b-ok">Ready</span>
            </div>
            <ul className="b-checks">
              <li>Transparent background</li>
              <li>1920 &times; 1080</li>
              <li>Sits in one corner, the stream stays visible</li>
              <li>Brand checked against the streamer list</li>
            </ul>
          </div>
        )}

        {step === 5 && (
          <div className="b-body">
            <dl className="b-sum">
              <div><dt>Objective</dt><dd>Awareness</dd></div>
              <div><dt>Dates</dt><dd>3 Nov to 30 Nov</dd></div>
              <div><dt>Markets</dt><dd>Norway, Sweden, Finland</dd></div>
              <div><dt>Platforms</dt><dd>Twitch, Kick</dd></div>
              <div><dt>Format</dt><dd>Animated overlay, !glorious, poll</dd></div>
              <div><dt>Asset</dt><dd>glorious-v3.webm</dd></div>
            </dl>
          </div>
        )}
      </div>
      <div className="b-side">
        {step === 1 && (
          <div className="bcard">
            <div className="bcard-h">How you pay</div>
            <div className="b-note"><b>Per 1,000 views that played</b>Views that did not play are not billed.</div>
          </div>
        )}
        {step === 2 && (
          <div className="bcard">
            <div className="bcard-h">Streamer list</div>
            <div className="b-note"><b>You approve every name</b>We shortlist from Streamer Explorer. Remove anyone before launch.</div>
          </div>
        )}
        {(step === 3 || step === 4) && (
          <div className="bcard">
            <div className="bcard-h">Chat command</div>
            <div className="field"><code>!glorious</code></div>
            <div className="reply"><b>beta ads</b>Meet the new Glorious V3 <span className="url">gloriousgaming.com</span></div>
          </div>
        )}
        {step === 3 && (
          <div className="bcard">
            <div className="bcard-h">Poll <span className="toggle on" aria-hidden="true"><i /></span></div>
            <div className="field q">Wireless or wired?</div>
            <div className="opt">Wireless</div>
            <div className="opt">Wired</div>
          </div>
        )}
        {step === 4 && (
          <div className="bcard">
            <div className="bcard-h">Click-through link</div>
            <div className="field">gloriousgaming.com</div>
          </div>
        )}
        {step === 5 && (
          <div className="bcard">
            <div className="bcard-h">After you submit</div>
            <ul className="b-checks b-checks--tight">
              <li>Streamer list sent for approval</li>
              <li>Every stream checked on air</li>
              <li>Live numbers in your login</li>
            </ul>
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
