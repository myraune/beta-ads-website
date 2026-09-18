import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * How people move through a page, sent to GA4.
 *
 * GA4's enhanced measurement already gives us page views on route change,
 * outbound clicks and a single "scrolled to 90%" event. That tells us where
 * people land and whether they reached the bottom, but nothing about the
 * middle: which sections they actually read, how far they got before leaving,
 * and whether they ever saw a booking button.
 *
 * Three events, all keyed on `path` so they join the conversion events in
 * ConversionTracker and the landing pages from Search Console:
 *
 *   scroll_depth   { path, percent }         25 / 50 / 75 / 100, once each
 *   section_view   { path, section, index }  an <h2> entered the viewport
 *   cta_view       { path, label }           a booking/demo CTA became visible
 *
 * cta_view against book_demo_click is the number that matters: it separates
 * "nobody scrolled far enough to see the button" from "they saw it and did not
 * click", which need different fixes.
 *
 * Everything resets on route change. Nothing is sent before the visitor has
 * allowed analytics; gtag queues the calls and Consent Mode drops what it
 * must, so this file does not need to know about consent.
 */

const gtag = (event: string, params: Record<string, unknown>) => {
  if (import.meta.env.DEV) console.debug("[engagement]", event, params);
  (window as any).gtag?.("event", event, params);
};

const isCta = (a: HTMLAnchorElement) => {
  const href = a.getAttribute("href") || "";
  return href.includes("calendar.app.google") || href === "/demo" || href.startsWith("/demo?");
};

/**
 * Sent-once memory per path, held at module level so React remounts (theme
 * provider, route transition, StrictMode) do not double-send.
 */
let sentPath = "";
const sent = new Set<string>();
const once = (path: string, key: string) => {
  if (sentPath !== path) {
    sentPath = path;
    sent.clear();
  }
  if (sent.has(key)) return false;
  sent.add(key);
  return true;
};

export const EngagementTracker = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) console.debug("[engagement] armed for", pathname);
    const path = pathname;

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = Math.round((window.scrollY / max) * 100);
      for (const mark of [25, 50, 75, 100]) {
        if (pct >= mark && once(path, `depth:${mark}`)) gtag("scroll_depth", { path, percent: mark });
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (!en.isIntersecting) continue;
          const el = en.target;
          const label = (el.textContent || "").trim().slice(0, 80);
          if (el.tagName === "H2") {
            const all = Array.from(document.querySelectorAll("main h2"));
            if (once(path, `section:${label}`)) gtag("section_view", { path, section: label, index: all.indexOf(el) + 1 });
          } else if (once(path, `cta:${label}`)) {
            gtag("cta_view", { path, label: label.slice(0, 60) });
          }
          io.unobserve(el);
        }
      },
      { threshold: 0.5 },
    );

    // Pages render lazily and in pieces; watch the DOM and observe whatever
    // shows up instead of guessing a delay.
    const observed = new WeakSet<Element>();
    const arm = () => {
      document.querySelectorAll("main h2").forEach((h) => {
        if (!observed.has(h)) {
          observed.add(h);
          io.observe(h);
        }
      });
      document.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((a) => {
        if (isCta(a) && !observed.has(a)) {
          observed.add(a);
          io.observe(a);
        }
      });
    };
    let timer = 0;
    const mo = new MutationObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(arm, 250);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    arm();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [pathname]);

  return null;
};

export default EngagementTracker;
