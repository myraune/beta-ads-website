import React, { useState } from "react";
import { Link } from "react-router-dom";
import { track } from "@vercel/analytics";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import "@/components/home-final/home-final.css";

/* /login: where "Login > Brand or agency" lands. Logins are given out by hand,
   so new agencies request access here (delivered like /demo, through
   notify-demo-request). Clients who already have a login go straight on to the
   LIVAD dashboard from the side card. Layout borrows the Opinari waitlist:
   one centred headline, a form card with tile pickers, a short side card. */

const DASHBOARD_URL = "https://beta.business.livad.stream/dashboard";
const STREAMER_URL = "https://beta.streamer.livad.stream/login";

const BUY = [
  { v: "Self-serve", d: "Your own login: find streamers, launch, follow live" },
  { v: "Programmatic", d: "A private deal you target in your own DSP" },
  { v: "Managed", d: "We run the campaign for your client, brief to report" },
];
const DSPS = ["Adform", "DV360", "The Trade Desk", "Amazon DSP", "Other"];
const MARKETS = ["Norway", "Sweden", "Denmark", "Finland", "Other"];

const field = "mt-1.5 w-full h-12 rounded-[10px] bg-[#F2F2F1] px-4 text-[15px] text-[#0F1012] placeholder:text-[#868B94] outline-none focus:ring-2 focus:ring-[#0F1012]/20";

/** Toggle tiles. One pick for `single`, otherwise any number. */
const Tiles: React.FC<{
  items: { v: string; d?: string }[]; value: string[]; onChange: (v: string[]) => void; single?: boolean; cols: string;
}> = ({ items, value, onChange, single, cols }) => (
  <div className={`mt-2 grid gap-2.5 ${cols}`}>
    {items.map(({ v, d }) => {
      const on = value.includes(v);
      return (
        <button
          key={v}
          type="button"
          aria-pressed={on}
          onClick={() => onChange(single ? [v] : on ? value.filter((x) => x !== v) : [...value, v])}
          className={`text-left rounded-[12px] border px-4 ${d ? "py-3.5 flex flex-col justify-start" : "h-12 px-3 flex items-center justify-center text-center whitespace-nowrap"} transition-colors ${
            on ? "border-[#0F1012] bg-[#0F1012] text-white" : "border-[#E2E2E0] bg-white text-[#0F1012] hover:border-[#0F1012]/40"
          }`}
        >
          <span className="block text-[15px] font-semibold">{v}</span>
          {d && <span className={`block mt-1 text-[13px] leading-snug ${on ? "text-white/70" : "text-[#5F646C]"}`}>{d}</span>}
        </button>
      );
    })}
  </div>
);

const RequestAccess: React.FC = () => {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [buy, setBuy] = useState<string[]>(["Self-serve"]);
  const [dsp, setDsp] = useState<string[]>([]);
  const [markets, setMarkets] = useState<string[]>([]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const s = (k: string) => String(f.get(k) || "").trim();
    const company = s("company");
    const lines = [
      "Login request (beta-ads.no/login).",
      `Role: ${s("role") || "Not given"}`,
      `Wants: ${buy.join(", ")}`,
      buy.includes("Programmatic") && `DSP: ${dsp.join(", ") || "Not given"}`,
      `Markets: ${markets.join(", ") || "Not given"}`,
      s("notes") && `Notes: ${s("notes")}`,
    ].filter(Boolean);
    setState("sending");
    try {
      const { error } = await supabase.functions.invoke("notify-demo-request", {
        body: { name: s("name"), email: s("email"), company, message: lines.join("\n"), website: s("website") },
      });
      if (error) throw error;
      const payload = { path: "/login", buy: buy.join(","), role: s("role") };
      track("access_request_submit", payload);
      (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("event", "access_request_submit", payload);
      setState("sent");
    } catch {
      setState("error");
    }
  };

  return (
    <>
      <SEO
        title="Request access | Beta Ads platform login"
        description="Agencies and brands get their own Beta Ads login on request. Tell us who you are and how you buy, and we set up your access."
        canonical="/login"
        noindex
      />

      <div className="min-h-screen bg-background text-foreground pt-20 md:pt-24 pb-16">
        <div className="px-3 sm:px-4">
          <section className="max-w-[1400px] mx-auto rounded-[28px] bg-[#0B0B0C] text-white dark:ring-1 dark:ring-white/10 overflow-hidden px-5 sm:px-10 lg:px-16 py-12 md:py-16">
            <div className="text-center max-w-2xl mx-auto">
              <Link to="/" className="inline-flex items-center gap-2 h-8 px-4 rounded-full border border-white/15 text-[13px] text-white/70 hover:text-white">
                <span aria-hidden>←</span> Back to home
              </Link>
              <h1 className="mt-7 text-[2.5rem] leading-[1.04] sm:text-6xl font-bold tracking-[-0.035em] m-0">
                Get your login.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-white/70">
                The platform is invite only. Tell us who you are and how you buy, and we set up your access.
              </p>
            </div>

            <div className="mt-10 md:mt-12 grid lg:grid-cols-[1.45fr_0.75fr] gap-5 items-start">
              {state === "sent" ? (
                <div className="rounded-[24px] bg-white text-[#0F1012] p-7 md:p-10">
                  <p className="text-2xl font-bold tracking-tight m-0">Thanks. We have your request.</p>
                  <p className="mt-3 mb-0 text-[15px] text-[#4B5059]">Andreas replies within one working day with your login, or a few questions if we need them.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="rounded-[24px] bg-white text-[#0F1012] p-6 sm:p-8 md:p-10">
                  <span className="inline-flex items-center h-7 px-3 rounded-full bg-[#F2F2F1] text-[12px] font-semibold uppercase tracking-[0.14em]">Agency or brand</span>

                  <fieldset className="mt-6 border-0 p-0 m-0">
                    <legend className="text-sm font-medium">How do you want to buy? *</legend>
                    <Tiles items={BUY} value={buy} onChange={setBuy} single cols="sm:grid-cols-3" />
                  </fieldset>

                  {buy.includes("Programmatic") && (
                    <fieldset className="mt-5 border-0 p-0 m-0">
                      <legend className="text-sm font-medium">Which DSP does your team use?</legend>
                      <Tiles items={DSPS.map((v) => ({ v }))} value={dsp} onChange={setDsp} cols="grid-cols-2 sm:grid-cols-3" />
                    </fieldset>
                  )}

                  <div className="mt-6 grid sm:grid-cols-2 gap-4">
                    <label className="block text-sm font-medium">Name *
                      <input name="name" required maxLength={100} autoComplete="name" placeholder="Your name" className={field} />
                    </label>
                    <label className="block text-sm font-medium">Work email *
                      <input name="email" type="email" required maxLength={255} autoComplete="email" placeholder="you@agency.com" className={field} />
                    </label>
                    <label className="block text-sm font-medium">Agency or company *
                      <input name="company" required maxLength={200} autoComplete="organization" placeholder="Company name" className={field} />
                    </label>
                    <label className="block text-sm font-medium">You are
                      <select name="role" defaultValue="" className={field}>
                        <option value="" disabled>Choose</option>
                        <option>Media agency</option><option>Creative agency</option><option>Brand</option><option>Other</option>
                      </select>
                    </label>
                  </div>

                  <fieldset className="mt-5 border-0 p-0 m-0">
                    <legend className="text-sm font-medium">Markets</legend>
                    <Tiles items={MARKETS.map((v) => ({ v }))} value={markets} onChange={setMarkets} cols="grid-cols-3 sm:grid-cols-5" />
                  </fieldset>

                  <label className="block mt-5 text-sm font-medium">Notes
                    <textarea name="notes" rows={3} maxLength={2000} placeholder="Clients, timing, anything we should know" className={`${field} h-auto py-3 resize-y`} />
                  </label>

                  {/* Honeypot: hidden from people, bots fill it and get a silent success. */}
                  <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />

                  <button type="submit" disabled={state === "sending"} className="mt-7 inline-flex items-center h-12 px-7 rounded-full bg-[#0F1012] text-white text-[15px] font-semibold disabled:opacity-60">
                    {state === "sending" ? "Sending..." : "Request access"}
                  </button>
                  {state === "error" && <p className="mt-3 mb-0 text-sm text-[#E23A3C]">Something went wrong. Email sales@beta-ads.no instead.</p>}
                </form>
              )}

              <aside className="grid gap-5">
                <div className="rounded-[24px] border border-white/12 bg-white/[0.04] p-6 md:p-7">
                  <p className="m-0 text-[15px] font-semibold">Already have a login?</p>
                  <p className="mt-2 mb-5 text-sm leading-relaxed text-white/60">Go to your campaign dashboard.</p>
                  <a href={DASHBOARD_URL} target="_blank" rel="noopener noreferrer" data-cta="login" className="inline-flex items-center h-11 px-5 rounded-full bg-white text-[#0F1012] text-sm font-semibold">
                    Open dashboard
                  </a>
                </div>
                <div className="rounded-[24px] border border-white/12 bg-white/[0.04] p-6 md:p-7">
                  <p className="m-0 text-[15px] font-semibold">What you get</p>
                  <ul className="mt-3 mb-0 pl-0 list-none grid gap-2.5 text-sm leading-relaxed text-white/70">
                    <li>Streamer Explorer with 39,000+ streamers</li>
                    <li>Build and launch overlay campaigns</li>
                    <li>A live report while the campaign runs</li>
                  </ul>
                </div>
                <p className="m-0 px-2 text-sm text-white/55">
                  Streamer? <a href={STREAMER_URL} target="_blank" rel="noopener noreferrer" data-cta="login" className="text-white underline underline-offset-4">Log in here</a>
                </p>
              </aside>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default RequestAccess;
