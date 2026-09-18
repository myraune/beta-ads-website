import React, { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

/**
 * Google Calendar appointment schedule, embedded.
 *
 * Every "Book a demo" on the site used to open calendar.app.google in a new
 * tab, which meant the last thing we could measure was the click. Embedding
 * keeps the visitor on /demo and lets us see two more steps:
 *
 *   booking_calendar_view     the calendar rendered on the page
 *   booking_calendar_engaged  the visitor clicked into it (first focus)
 *
 * Google's booking iframe does not tell the parent page when a slot is
 * confirmed, so the final step is still counted where it lands: as a
 * calendar invite in Andreas's calendar. The fallback link stays for people
 * whose browsers block third-party iframes.
 */

const SCHEDULE =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3QA5Y4l09ggpmbKmMymK_F-8UjiTC3N1MsmQnDrgmP7Bt-5h8XRAXphwT5DsKro2Kh_E81Qlen";
export const BOOKING_SHORT_LINK = "https://calendar.app.google/coW5NLQJtLxfRer19";

const gtag = (event: string, params: Record<string, unknown>) =>
  (window as any).gtag?.("event", event, params);

export const BookingCalendar: React.FC<{ fallbackLabel?: string }> = ({ fallbackLabel = "Open the calendar in a new tab" }) => {
  const frame = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    gtag("booking_calendar_view", { path: window.location.pathname });
    let engaged = false;
    // A click inside a cross-origin iframe blurs the parent window and makes
    // the iframe the active element. That is the only signal we get.
    const onBlur = () => {
      if (engaged || document.activeElement !== frame.current) return;
      engaged = true;
      gtag("booking_calendar_engaged", { path: window.location.pathname });
    };
    window.addEventListener("blur", onBlur);
    return () => window.removeEventListener("blur", onBlur);
  }, []);

  return (
    <div>
      <div className="relative rounded-2xl overflow-hidden ring-1 ring-border bg-background">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground" aria-hidden>
            Loading calendar
          </div>
        )}
        <iframe
          ref={frame}
          title="Book a demo with Beta Ads"
          src={`${SCHEDULE}?gv=true`}
          className="w-full border-0 bg-transparent"
          style={{ height: 720 }}
          loading="eager"
          onLoad={() => setLoaded(true)}
        />
      </div>
      <a
        href={BOOKING_SHORT_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mt-3"
      >
        {fallbackLabel} <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
};

export default BookingCalendar;
