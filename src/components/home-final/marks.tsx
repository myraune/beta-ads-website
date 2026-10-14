import React from "react";

/* Platform marks and small data graphics for the "Where it runs" and "More detail"
   rows on the homepage. Twitch and YouTube are the official glyphs (simple-icons
   paths); the Kick K is drawn on the same 24 grid. Brand colours only on the marks. */

export const TwitchMark = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="mark mark--twitch">
    <path fill="#9146FF" d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
  </svg>
);

export const YouTubeMark = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="mark mark--yt">
    <path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
    <path fill="#fff" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export const KickMark = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="mark mark--kick">
    <rect width="24" height="24" rx="5" fill="#0B0E0F" />
    <path fill="#53FC18" d="M5 4h4.5v5h1.5V7.5h1.5V6H14V4h4.5v4.5H17V10h-1.5v1.5H14v1h1.5V14H17v1.5h1.5V20H14v-2h-1.5v-1.5H11V15H9.5v5H5z" />
  </svg>
);

const Flag: React.FC<{ bg: string; cross: string; inner?: string; label: string }> = ({ bg, cross, inner, label }) => (
  <svg viewBox="0 0 22 16" className="flag" role="img" aria-label={label}>
    <rect width="22" height="16" rx="2.5" fill={bg} />
    <rect x="6" width="4" height="16" fill={cross} />
    <rect y="6" width="22" height="4" fill={cross} />
    {inner && <rect x="7" width="2" height="16" fill={inner} />}
    {inner && <rect y="7" width="22" height="2" fill={inner} />}
  </svg>
);

export const NordicFlags = () => (
  <span className="flags">
    <Flag label="Norway" bg="#BA0C2F" cross="#FFFFFF" inner="#00205B" />
    <Flag label="Sweden" bg="#006AA7" cross="#FECC00" />
    <Flag label="Denmark" bg="#C8102E" cross="#FFFFFF" />
    <Flag label="Finland" bg="#FFFFFF" cross="#002F6C" />
  </span>
);

/* ── "More detail" graphics, all built from real campaign data ───────────── */

/** A real frame from the Samsung S25 verification wall, with the check count. */
export const VerifyThumb = () => (
  <span className="dthumb dthumb--img" aria-hidden="true">
    <img src="/home/samsung-s25-wall.jpg" alt="" loading="lazy" />
    <span className="dthumb__chip"><span className="live-dot" />25 of 25 checked</span>
  </span>
);

/** Two chat lines as they appear in the report, translated and scored. */
export const ChatThumb = () => (
  <span className="dthumb dthumb--chat" aria-hidden="true">
    <span className="dchat"><span>den nye S25 ser rå ut</span><i>Positive</i></span>
    <span className="dchat dchat--g"><span>the new S25 looks sick</span></span>
    <span className="dchat"><span>hvor mye koster den?</span><i className="hot">Intent</i></span>
  </span>
);

/** Surfshark Finland: live ad views next to views on the replays (VODs). */
export const ReplayThumb = () => (
  <span className="dthumb dthumb--bars" aria-hidden="true">
    <span className="dbar"><em>Live</em><span style={{ width: "15%" }} /><b>119,041</b></span>
    <span className="dbar dbar--r"><em>Replays</em><span style={{ width: "100%" }} /><b>798,323</b></span>
    <small>Surfshark Finland, August 2026</small>
  </span>
);
