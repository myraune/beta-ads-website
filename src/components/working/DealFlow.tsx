import React from "react";

/* Coded flow panel for programmatic buying on /self-serve. Dark in both themes,
   like the product panels. Mechanics as confirmed by LIVAD (Arda, 2026-10-15):
   Beta Ads sets up a private deal on its SSP seat (Adform or Magnite, Equativ
   coming), shares the deal ID, and the agency targets that deal ID in its own DSP.
   Do not name DSPs or add reporting claims until they are confirmed. */

const steps: { who: string; t: string; d: string }[] = [
  { who: "Beta Ads", t: "Private deal", d: "We set up a private deal for your campaign on our SSP seat: Adform or Magnite, with Equativ coming." },
  { who: "Beta Ads", t: "Deal ID", d: "You get the deal ID for the campaign." },
  { who: "Your DSP", t: "Target the deal", d: "Your team targets the deal ID in your DSP, next to the rest of the programmatic plan." },
  { who: "Live streams", t: "On air", d: "The overlay runs inside the streamers' live streams." },
];

export const DealFlow: React.FC = () => (
  <div
    className="rounded-[18px] bg-[#0b0a0b] text-white overflow-hidden ring-1 ring-black/5 dark:ring-white/10 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.5)]"
    role="img"
    aria-label="Programmatic buying: Beta Ads sets up a private deal on its Adform or Magnite SSP seat and shares the deal ID, your team targets the deal ID in your DSP, and the overlay runs inside the live streams."
  >
    <div className="flex flex-wrap items-center justify-between gap-3 px-5 md:px-7 py-4 border-b border-white/10">
      <span className="text-sm font-semibold">Private deal</span>
      <span className="flex flex-wrap gap-2 text-xs">
        {["Adform SSP", "Magnite", "Equativ, coming"].map((s, i) => (
          <span key={s} className={`rounded-full px-2.5 py-1 ring-1 ${i < 2 ? "ring-white/25 text-white" : "ring-white/10 text-white/50"}`}>{s}</span>
        ))}
      </span>
    </div>
    <ol className="m-0 p-0 list-none grid md:grid-cols-4 gap-3 md:gap-4 p-5 md:p-7">
      {steps.map((s, i) => (
        <li key={s.t} className="relative rounded-[10px] bg-[#16151a] border border-white/10 p-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">{s.who}</div>
          <div className="mt-2 flex items-baseline gap-3">
            <span className="text-xs tabular-nums text-white/40">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-[15px] font-semibold">{s.t}</span>
          </div>
          <p className="mt-1.5 mb-0 text-[13px] leading-relaxed text-white/65">{s.d}</p>
          {i < steps.length - 1 && (
            <span className="hidden md:block absolute top-1/2 -right-[13px] -translate-y-1/2 text-white/35 text-xs" aria-hidden="true">&rarr;</span>
          )}
        </li>
      ))}
    </ol>
  </div>
);
