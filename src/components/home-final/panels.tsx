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

export const BuildPanel: React.FC<{ reveal?: boolean }> = ({ reveal = true }) => {
  const rv = reveal ? " reveal" : "";
  return (
    <div
      className={`panel panel--build dui${rv}`}
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
