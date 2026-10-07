import React, { useCallback, useEffect, useRef, useState } from "react";
import { BookingCalendar, BOOKING_SHORT_LINK } from "@/components/BookingCalendar";
import { FilmModal, FILM_POSTER } from "@/components/FilmModal";
import { LazyVideo } from "./LazyVideo";

/**
 * Section 1, concept 05 "One screen": what it is, what it costs, who used it,
 * and the real booking calendar right under the answers. The film loop and the
 * three steps sit on the right and stay in view while the calendar scrolls.
 */
export const HomeHero: React.FC = () => {
  const [film, setFilm] = useState(false);
  const closeFilm = useCallback(() => setFilm(false), []);

  // The Google appointment page needs room: in a narrow column it stacks the
  // month grid above the slots (about 1,300px tall). So the hero shows a compact
  // card and the real calendar opens full width right under it, sized to the
  // layout Google picks at that width. The iframe only loads when asked for.
  const [bookOpen, setBookOpen] = useState(false);
  const [calHeight, setCalHeight] = useState(1000);
  const calRef = useRef<HTMLDivElement>(null);
  const openBooking = () => {
    const w = window.innerWidth;
    setCalHeight(w < 600 ? 1320 : w < 900 ? 1100 : 1000);
    setBookOpen(true);
    (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("event", "booking_calendar_open", {
      path: window.location.pathname,
    });
  };
  useEffect(() => {
    if (!bookOpen) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    calRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, [bookOpen]);

  return (
    <section className="bh-screen" aria-labelledby="bh-h">
      <div>
        <h1 id="bh-h" className="bh-h1">
          Your brand, animated inside live&nbsp;streams.
        </h1>

        <dl className="bh-spec">
          <div>
            <dt>What</dt>
            <dd>
              <b>A custom animated overlay, built for your brand,</b> running inside Twitch, YouTube and Kick
              streams. It is rendered in OBS, so it cannot be skipped or ad blocked. Viewers type{" "}
              <code className="bh-code">!brand</code> in chat to get your link.
            </dd>
          </div>
          <div>
            <dt>Cost</dt>
            <dd>
              <b className="bh-num">From 100,000 NOK.</b> You pay per 1,000 animation views. The bigger the budget,
              the lower the CPM.
            </dd>
          </div>
          <div>
            <dt>Who</dt>
            <dd>
              <span className="bh-sr">Samsung, Komplett, Logitech, Shure and SteelSeries.</span>
              <span className="bh-logos" aria-hidden="true">
                <img className="samsung" src="/lovable-uploads/logo-samsung.webp" alt="" width={67} height={10} />
                <img className="komplett" src="/lovable-uploads/logo-komplett.webp" alt="" width={60} height={15} />
                <img className="logitech" src="/lovable-uploads/logo-logitech.webp" alt="" width={57} height={18} />
                <img className="shure" src="/lovable-uploads/logo-shure.webp" alt="" width={61} height={13} />
                <img className="steelseries" src="/lovable-uploads/logo-steelseries.webp" alt="" width={74} height={10} />
              </span>
              <span className="bh-agencies">With WPP Media, Publicis and dentsu.</span>
            </dd>
          </div>
        </dl>

        <div className="bh-book" id="book" aria-labelledby="bh-book-h">
          <div className="bh-book-head">
            <h2 id="bh-book-h">Book a 30 min intro call</h2>
            <p>Google Meet, live availability</p>
          </div>
          <div className="bh-book-body">
            <p>Pick a time straight from our calendar. Bring a brief, or just the question.</p>
            <button
              type="button"
              className="bh-btn bh-btn--primary bh-book-btn"
              data-cta="book"
              aria-expanded={bookOpen}
              aria-controls="book-cal"
              onClick={openBooking}
            >
              {bookOpen ? "Open times are below" : "See open times"}
            </button>
          </div>
          <div className="bh-book-foot">
            <a className="bh-open" href={BOOKING_SHORT_LINK} data-cta="book" target="_blank" rel="noopener noreferrer">
              Open in a new tab <span aria-hidden="true">&#8599;</span>
            </a>
            <span>
              or email{" "}
              <a className="bh-link" href="mailto:sales@beta-ads.no" data-cta="email">
                sales@beta-ads.no
              </a>
            </span>
          </div>
        </div>
      </div>

      <figure className="bh-film">
        <button
          type="button"
          className="bh-frame"
          style={{ backgroundImage: `url(${FILM_POSTER})` }}
          onClick={() => setFilm(true)}
          aria-label="Play the full Beta Ads film with sound, 67 seconds"
        >
          <LazyVideo src="/videos/beta-ads-film-loop.mp4" poster={FILM_POSTER} label="Beta Ads product film, muted loop" />
          <span className="bh-play" aria-hidden="true">
            <svg viewBox="0 0 10 12" fill="currentColor"><path d="M0 0l10 6-10 6z" /></svg>
            Play with sound
          </span>
        </button>
        <figcaption>
          <span>The product film, muted loop</span>
          <button type="button" onClick={() => setFilm(true)}>
            Watch the full film, 67 s <span aria-hidden="true">&#8599;</span>
          </button>
        </figcaption>
        <ol className="bh-how" aria-label="How it works">
          <li>
            <b>We build the overlay</b>
            <span>Animated in your brand's own style, sized for a corner of the screen.</span>
          </li>
          <li>
            <b>Streamers run it live</b>
            <span>From a database of 39,000+ streamers on Twitch, YouTube and Kick.</span>
          </li>
          <li>
            <b>Replays keep counting</b>
            <span>The overlay is baked into the VOD, so views keep coming after the stream.</span>
          </li>
        </ol>
      </figure>

      {bookOpen && (
        <div className="bh-book-wide" id="book-cal" ref={calRef}>
          <BookingCalendar className="bh-cal" height={calHeight} hideFallback />
        </div>
      )}

      <a className="bh-next" href="#plan">
        Next: what your budget buys
      </a>

      <FilmModal open={film} onClose={closeFilm} />
    </section>
  );
};

export default HomeHero;
