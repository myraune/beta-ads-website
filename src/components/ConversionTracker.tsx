import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * Conversion tracking for the SEO test.
 *
 * Every real conversion on this site leaves the page (Google Calendar booking,
 * mailto, Discord), so nothing was measurable: we could see traffic but never
 * whether it produced an inquiry. One delegated listener covers all ~139 CTAs
 * site-wide, including links rendered from blog markdown, without touching each
 * call site.
 *
 * `path` is the page the click happened on, which is what lets us join Search
 * Console (query -> landing page) to actual booking intent.
 */
const EVENTS: { match: (href: string) => boolean; event: string }[] = [
  { match: (h) => h.includes("calendar.app.google"), event: "book_demo_click" },
  { match: (h) => h.startsWith("mailto:"), event: "email_click" },
  { match: (h) => h.startsWith("tel:"), event: "phone_click" },
  { match: (h) => h.includes("discord.gg"), event: "discord_click" },
  { match: (h) => h.includes("streamer.livad.stream"), event: "streamer_apply_click" },
];

export const ConversionTracker = () => {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      const anchor = el?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (!href) return;
      const hit = EVENTS.find((x) => x.match(href));
      if (!hit) return;
      track(hit.event, {
        path: window.location.pathname,
        label: (anchor.textContent || "").trim().slice(0, 60),
      });
    };
    // capture phase so it still fires if a handler stops propagation
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
};
