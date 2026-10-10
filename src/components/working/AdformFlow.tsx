import React from "react";

/* Coded flow panel for the Adform connection on /self-serve. Dark in both themes,
   like the product panels. Keep the wording at the level Andreas confirmed:
   campaigns can be connected to Adform, set up from there and monitored there.
   No technical specifics (tags, APIs, data fields) until he confirms them. */

const lanes = ["Adform", "Beta Ads", "Live streams"] as const;

const steps: { lane: 0 | 1 | 2; t: string; d: string }[] = [
  { lane: 0, t: "Set up", d: "Your team sets the campaign up from Adform, next to the rest of the media plan." },
  { lane: 1, t: "Connected", d: "The campaign is connected to Beta Ads, with the streamers you picked in the platform." },
  { lane: 2, t: "On air", d: "The overlay runs inside the streamers' live streams, and every ad play leaves a recorded clip." },
  { lane: 0, t: "Monitor", d: "Follow delivery in Adform, the tool your team already uses." },
  { lane: 1, t: "Full detail", d: "Views, clicks and CTR per streamer and per stream in the Beta Ads dashboard, and the end report." },
];

export const AdformFlow: React.FC = () => (
  <div
    className="rounded-[18px] bg-[#0b0a0b] text-white overflow-hidden ring-1 ring-black/5 dark:ring-white/10 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.5)]"
    role="img"
    aria-label="How the Adform connection fits in: set up in Adform, connected to Beta Ads, runs on live streams, delivery monitored in Adform with full detail in the Beta Ads dashboard."
  >
    <div className="flex items-center justify-between gap-4 px-5 md:px-7 py-4 border-b border-white/10">
      <span className="text-sm font-semibold">Adform connection</span>
      <span className="inline-flex items-center gap-2 text-xs text-white/60">
        <i className="block w-1.5 h-1.5 rounded-full bg-[#E8394A]" aria-hidden="true" />
        Campaign connected
      </span>
    </div>

    {/* Desktop: swimlanes */}
    <div className="hidden md:block px-7 pb-7">
      <div className="grid grid-cols-3 gap-4 pt-5">
        {lanes.map((l) => (
          <div key={l} className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">{l}</div>
        ))}
      </div>
      <ol className="mt-3 m-0 p-0 list-none grid grid-cols-3 gap-4">
        {steps.map((s, i) => (
          <li key={s.t} style={{ gridColumnStart: s.lane + 1, gridRowStart: i < 3 ? 1 : 2 }} className="relative">
            <div className="h-full rounded-[10px] bg-[#16151a] border border-white/10 p-4">
              <div className="flex items-baseline gap-3">
                <span className="text-xs tabular-nums text-white/40">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[15px] font-semibold">{s.t}</span>
              </div>
              <p className="mt-1.5 mb-0 text-[13px] leading-relaxed text-white/65">{s.d}</p>
            </div>
            {i < 2 || i === 3 ? (
              <span className="absolute top-1/2 -right-[13px] -translate-y-1/2 text-white/35 text-xs" aria-hidden="true">&rarr;</span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>

    {/* Mobile: one list with the lane as a label */}
    <ol className="md:hidden m-0 p-0 list-none px-5 pb-3">
      {steps.map((s, i) => (
        <li key={s.t} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 py-4 border-t border-white/10 first:border-t-0">
          <span className="text-xs tabular-nums text-white/40 pt-0.5">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">{lanes[s.lane]}</div>
            <div className="mt-1 text-[15px] font-semibold">{s.t}</div>
            <p className="mt-1 mb-0 text-[13px] leading-relaxed text-white/65">{s.d}</p>
          </div>
        </li>
      ))}
    </ol>
  </div>
);
