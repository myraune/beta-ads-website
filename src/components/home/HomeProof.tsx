import React from "react";
import { BOOKING_SHORT_LINK } from "@/components/BookingCalendar";
import { LazyVideo } from "./LazyVideo";

/**
 * Section 3, concept 05's "appendix for skeptics": real stream recordings with
 * the overlays running, the sourced numbers, and what the report shows.
 */
export const HomeProof: React.FC = () => (
  <div className="bh-wrap">
    <section className="bh-sec" id="clips" aria-label="On real streams" style={{ borderTop: 0 }}>
      <div className="bh-sec-h">
        A.1
        <h2>On real streams</h2>
        <p>Two campaigns as viewers saw them. The overlay sits in a corner while the stream carries on.</p>
      </div>
      <div className="bh-clips">
        <figure className="bh-clip">
          <div className="bh-crop">
            <LazyVideo
              src="/home/samsung-s25-stream-a.mp4"
              poster="/home/samsung-s25-stream-a.webp"
              label="Samsung Galaxy S25 Ultra overlay on a Norwegian Twitch stream"
            />
          </div>
          <figcaption>
            <b>Samsung Galaxy S25 Ultra.</b> Overlay in the corner, product link posted in chat.
          </figcaption>
        </figure>
        <figure className="bh-clip">
          <div className="bh-crop">
            <LazyVideo
              src="/home/komplett-stream.mp4"
              poster="/home/komplett-stream.webp"
              label="Komplett gaming deals overlay on a Norwegian Twitch stream"
            />
          </div>
          <figcaption>
            <b>Komplett gaming deals.</b> Viewers type <code className="bh-code">!komplett</code> for the link.
          </figcaption>
        </figure>
      </div>
    </section>

    <section className="bh-sec" id="numbers" aria-label="Numbers so far">
      <div className="bh-sec-h">
        A.2
        <h2>Numbers so far</h2>
      </div>
      <div>
        <p className="bh-numbers">
          <strong className="bh-num">3M+</strong> completed views, <strong className="bh-num">19,000+</strong> hours of
          sponsored airtime and <strong className="bh-num">29</strong> campaigns. Samsung alone:{" "}
          <strong className="bh-num">800,185</strong> views.
        </p>
        <p className="bh-src">
          From our campaign report PDFs. Samsung figure covers the Galaxy S25 and Z Fold7 campaigns.
        </p>
        <figure className="bh-wall">
          <div className="bh-wall-media">
            <LazyVideo
              src="/home/samsung-s25-wall.mp4"
              poster="/home/samsung-s25-wall.jpg"
              label="Grid of live streams, each showing the Samsung Galaxy S25 overlay"
            />
          </div>
          <figcaption>Samsung Galaxy S25: the same overlay across many streams at once.</figcaption>
        </figure>
      </div>
    </section>

    <section className="bh-sec" id="report" aria-label="What the report shows">
      <div className="bh-sec-h">
        A.3
        <h2>What the report shows</h2>
        <p>What you can check while the campaign runs, and after.</p>
      </div>
      <ol className="bh-report">
        <li>
          <b>Setup verification</b>
          <span>Is the overlay running on every channel.</span>
        </li>
        <li>
          <b>Chat tracking</b>
          <span>Every mention of your brand, translated and scored.</span>
        </li>
        <li>
          <b>Replay reach</b>
          <span>Views from VODs after the stream ends.</span>
        </li>
        <li>
          <b>PDF report</b>
          <span>Generated automatically when the campaign closes.</span>
        </li>
      </ol>
    </section>

    <div className="bh-close">
      <p>
        Seen enough? <span>Thirty minutes is usually plenty.</span>
      </p>
      <div>
        <a className="bh-btn bh-btn--primary" href={BOOKING_SHORT_LINK} data-cta="book" target="_blank" rel="noopener noreferrer">
          Book an intro call <span aria-hidden="true">&#8599;</span>
        </a>
        <a className="bh-alt bh-link" href="mailto:sales@beta-ads.no" data-cta="email">
          sales@beta-ads.no
        </a>
      </div>
    </div>
  </div>
);

export default HomeProof;
