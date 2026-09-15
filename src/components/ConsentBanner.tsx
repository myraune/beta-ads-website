import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * The consent banner behind GA4 Consent Mode v2.
 *
 * index.html sets every consent signal to "denied" before gtag('config'), and
 * applies a stored "granted" synchronously so returning visitors are measured
 * from the first hit. This component is only the UI for the choice, and it
 * only exists until a choice has been made.
 *
 * Deliberately small. It asks one question, offers two answers of equal
 * weight, and gets out of the way. No cookie-category accordion, no
 * pre-ticked boxes, no dark pattern making "decline" harder to find than
 * "accept": both are the same size and the decline is the first in tab order.
 *
 * Analytics only. We run no Google Ads, so ad_storage, ad_user_data and
 * ad_personalization stay denied whatever the visitor picks. Granting them
 * would be asking for permission we have no use for.
 *
 * Language follows the browser, not the page: a Norwegian reader on an English
 * page still gets the question in Norwegian, and vice versa.
 */

const KEY = "ba-consent";
type Choice = "granted" | "denied";

const isNorwegian = () =>
  typeof navigator !== "undefined" && /^(nb|nn|no)/i.test(navigator.language || "");

const copy = {
  en: {
    text: "We use Google Analytics to see which pages people read. No ads, no selling of data.",
    more: "Privacy",
    accept: "Allow analytics",
    decline: "Decline",
  },
  no: {
    text: "Vi bruker Google Analytics for å se hvilke sider folk leser. Ingen annonser, ingen salg av data.",
    more: "Personvern",
    accept: "Tillat analyse",
    decline: "Avslå",
  },
};

const readChoice = (): Choice | null => {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
};

export const ConsentBanner: React.FC = () => {
  const [open, setOpen] = useState(false);
  const t = isNorwegian() ? copy.no : copy.en;

  useEffect(() => {
    // Decided in an effect so the prerenderer, which has no localStorage
    // choice, does not bake an open banner into the static HTML.
    setOpen(readChoice() === null);
  }, []);

  const choose = (c: Choice) => {
    try {
      localStorage.setItem(KEY, c);
    } catch {
      /* private mode: the choice simply does not persist */
    }
    (window as any).gtag?.("consent", "update", {
      analytics_storage: c,
    });
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t.text}
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-sm z-[60] rounded-2xl bg-[hsl(240_11%_7%)] text-white shadow-2xl ring-1 ring-white/10 p-5"
    >
      <p className="text-sm leading-relaxed text-white/85 m-0">
        {t.text}{" "}
        <Link to="/privacy" className="underline underline-offset-2 text-white/70 hover:text-white">
          {t.more}
        </Link>
      </p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="flex-1 h-10 rounded-full border border-white/20 text-sm font-medium text-white hover:bg-white/10 transition-colors"
        >
          {t.decline}
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="flex-1 h-10 rounded-full bg-primary hover:bg-primary/90 text-sm font-medium text-white transition-colors"
        >
          {t.accept}
        </button>
      </div>
    </div>
  );
};

export default ConsentBanner;
