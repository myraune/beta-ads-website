import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";

/**
 * A small fixed "Book a demo" that appears once the visitor has scrolled
 * half-way down a page. Long pages (the Kick pages run to ten sections) put
 * the next booking button far below the fold; this keeps one within reach
 * without a banner or a modal.
 *
 * Not shown on /demo itself, on the streamer side of the site, or on pages
 * too short to scroll. Dismissing it hides it for the session. Fires
 * sticky_cta_view once when it first appears and sticky_cta_click on click,
 * both with the page path, so it can be judged against book_demo_click.
 */

const HIDE_ON = [/^\/demo/, /^\/streamers?/, /^\/streamere/, /^\/surfsharklive/, /^\/privacy/, /^\/terms/];

const LABEL: Record<string, string> = {
  nb: "Book en demo",
  no: "Book en demo",
  sv: "Boka en demo",
  da: "Book en demo",
  fi: "Varaa demo",
};

const gtag = (event: string, params: Record<string, unknown>) =>
  (window as any).gtag?.("event", event, params);

export const StickyDemoCta: React.FC = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [label, setLabel] = useState("Book a demo");

  useEffect(() => {
    setVisible(false);
    if (HIDE_ON.some((r) => r.test(pathname))) return;
    try {
      if (sessionStorage.getItem("ba-sticky-cta") === "off") {
        setDismissed(true);
        return;
      }
    } catch {
      /* private mode */
    }
    let sent = false;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max < 1200) return;
      const past = window.scrollY / max >= 0.5;
      setVisible(past);
      if (past && !sent) {
        sent = true;
        // <html lang> is set by the page's SEO component after mount, so read
        // it here, at first show, not when the route changes.
        const lang = (document.documentElement.lang || "en").slice(0, 2);
        setLabel(LABEL[lang] || "Book a demo");
        gtag("sticky_cta_view", { path: pathname });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[55] flex items-center gap-1 rounded-full bg-foreground text-background shadow-xl pl-5 pr-1.5 py-1.5">
      <Link
        to="/demo"
        onClick={() => gtag("sticky_cta_click", { path: pathname })}
        className="inline-flex items-center gap-2 text-sm font-medium py-1.5"
      >
        {label} <ArrowRight className="w-4 h-4" />
      </Link>
      <button
        type="button"
        aria-label="Hide"
        onClick={() => {
          setDismissed(true);
          try {
            sessionStorage.setItem("ba-sticky-cta", "off");
          } catch {
            /* private mode */
          }
        }}
        className="w-8 h-8 rounded-full inline-flex items-center justify-center text-background/60 hover:text-background hover:bg-background/10"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default StickyDemoCta;
