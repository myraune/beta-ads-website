import React, { useState } from "react";
import { W, kicker, h2, BOOKING_URL } from "@/components/working/shared";

/* Platform plans for Streamer & Category Explorer, as listed on the platform's own
   pricing page (beta.business.livad.stream/pricing, read 21 October 2026). Prices in
   USD excluding tax. Creating and running campaigns is free on every plan. */

export const PLATFORM_URL = "https://beta.business.livad.stream/pricing";

const PLANS = [
  {
    name: "Growth",
    for: "For brands running influencer campaigns in-house.",
    monthly: 299, yearly: 249, yearlyTotal: "2,988",
    credits: "150 Beta Credits a month",
    points: ["5 seats plus 5 viewer seats", "Full Streamer & Category Explorer, every filter", "500 vetted streamers a month", "10 lists, 2,500 streamers each", "CSV export up to 1,000 rows"],
  },
  {
    name: "Scale",
    for: "For agencies and brand teams working across many clients.",
    monthly: 899, yearly: 749, yearlyTotal: "8,988",
    credits: "400 Beta Credits a month",
    popular: true,
    points: ["20 seats plus unlimited viewer seats", "Unlimited lists and saved presets", "2,000 vetted streamers a month", "CSV export up to 25,000 rows", "Unlimited explorer depth"],
  },
  {
    name: "Enterprise",
    for: "A plan shaped around your team, billed by invoice.",
    credits: "Custom credit allowance",
    points: ["Unlimited seats", "Unlimited CSV export", "Raw data API access", "Onboarding, named CSM and SLA"],
  },
] as const;

const CREDIT_COSTS = [
  ["AI streamer or category search", "5 credits"],
  ["Streamer summary", "1 credit"],
  ["AI campaign session", "25 credits"],
  ["Filtering, lists, exports, campaigns", "Free"],
];

export const ExplorerPlans: React.FC<{ centered?: boolean }> = ({ centered }) => {
  const [yearly, setYearly] = useState(false);
  return (
    <section id="plans" className="border-t border-border py-16 md:py-24 scroll-mt-20">
      <div className={W}>
        <div className={centered ? "flex flex-col items-center text-center gap-6" : "flex flex-col md:flex-row md:items-end md:justify-between gap-6"}>
          <div className="max-w-2xl">
            <div className={`${kicker} mb-4`}>Plans</div>
            <h2 className={h2}>Pick the plan your research runs on. <span className="text-muted-foreground font-light">Campaigns stay free.</span></h2>
            <p className="mt-5 mb-0 text-muted-foreground leading-relaxed">
              Every plan opens both explorers, lists and Beta Credits for the AI features. Start with a 7-day free trial, no card needed.
            </p>
          </div>
          <div role="radiogroup" aria-label="Billing interval" className="inline-flex self-start md:self-auto p-1 rounded-full border border-border bg-card text-sm font-semibold">
            {[["Monthly", false], ["Yearly", true]].map(([label, val]) => (
              <button key={label as string} type="button" role="radio" aria-checked={yearly === val} onClick={() => setYearly(val as boolean)}
                className={`h-9 px-4 rounded-full transition-colors ${yearly === val ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {label as string}{val ? <span className="ml-1.5 font-normal opacity-70">save up to 17%</span> : null}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 md:mt-12 grid md:grid-cols-3 gap-4 md:gap-5">
          {PLANS.map(p => {
            const dark = "popular" in p && p.popular;
            const price = "monthly" in p ? (yearly ? p.yearly : p.monthly) : null;
            return (
              <div key={p.name} className={`rounded-[18px] p-7 flex flex-col border ${dark ? "border-transparent bg-[#0E0F12] text-white" : "border-border bg-card"}`}>
                <div className="flex items-center gap-3 h-6">
                  <span className={`text-sm font-semibold ${dark ? "text-white/60" : "text-muted-foreground"}`}>{p.name}</span>
                  {dark && <span className="text-[11px] font-semibold px-2 h-6 inline-flex items-center rounded-full bg-white/10">Most popular</span>}
                </div>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-4xl font-bold tracking-tight">{price != null ? `$${price}` : "Custom"}</span>
                  {price != null && <span className={dark ? "text-white/60" : "text-muted-foreground"}>/mo.</span>}
                </div>
                <p className={`mt-1 mb-0 text-xs ${dark ? "text-white/50" : "text-muted-foreground"}`}>
                  {"monthly" in p ? (yearly ? `Billed yearly at $${p.yearlyTotal}.` : "Billed monthly. Cancel any time.") : "Priced around your team."}
                </p>
                <p className={`mt-5 mb-0 text-[15px] ${dark ? "text-white/70" : "text-muted-foreground"}`}>{p.for}</p>
                <div className={`mt-5 text-[15px] font-semibold border-t pt-4 ${dark ? "border-white/10" : "border-border"}`}>{p.credits}</div>
                <ul className="mt-3 mb-8 p-0 list-none space-y-2 text-[15px]">
                  {p.points.map(pt => <li key={pt} className={dark ? "text-white/70" : "text-muted-foreground"}>{pt}</li>)}
                </ul>
                <a href={"monthly" in p ? PLATFORM_URL : BOOKING_URL} target="_blank" rel="noopener noreferrer" data-cta={"monthly" in p ? "platform" : "book"}
                  className={`mt-auto inline-flex items-center justify-center h-11 rounded-full text-sm font-semibold transition-opacity hover:opacity-90 ${dark ? "bg-white text-[#0F1012]" : "monthly" in p ? "bg-primary text-primary-foreground" : "border border-border"}`}>
                  {"monthly" in p ? "Start free trial" : "Talk to us"}
                </a>
              </div>
            );
          })}
        </div>

        <div className="mt-12 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-8 lg:gap-16">
          <div>
            <h3 className="text-xl font-bold tracking-tight m-0">What a Beta Credit pays for</h3>
            <p className="mt-3 mb-0 text-muted-foreground leading-relaxed max-w-md">
              Credits pay for the AI features. When they run out, only those stop: explorers, lists, exports and campaign creation keep working.
              Top up with packs of 250, 600 or 1,500 credits. Bought credits never expire; plan credits reset each billing period.
            </p>
          </div>
          <dl className="m-0">
            {CREDIT_COSTS.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-6 border-t border-border py-3.5 text-[15px]">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="m-0 font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-8 mb-0 text-xs text-muted-foreground">Prices in USD, excluding local tax. Creating and running campaigns is free on every plan; campaign media is priced per 1,000 views that played.</p>
      </div>
    </section>
  );
};
