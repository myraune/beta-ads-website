import React from "react";
import { fmt } from "./data";

/**
 * Coded charts for the Surfshark Finland case. Plain CSS, no chart library.
 * Colour comes from one case accent (`--ss`, Surfshark teal) at different
 * strengths, defined in SurfsharkFinlandCaseStudy for light and dark.
 */

export const accent = "hsl(var(--ss))";
export const accentSoft = (a: number) => `hsl(var(--ss) / ${a})`;

type Row = { label: string; pct: number; n?: number; sub?: string };

/** Ranked horizontal bars. Bars scale to the largest row so small values stay readable. */
export const RankedBars: React.FC<{
  rows: Row[];
  title?: string;
  scaleTo?: number;
  labelWidth?: string;
  dimAfter?: number;
}> = ({ rows, title, scaleTo, labelWidth = "7.5rem", dimAfter = 1 }) => {
  const max = scaleTo ?? Math.max(...rows.map((r) => r.pct));
  return (
    <div>
      {title && <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-4">{title}</h4>}
      <ol className="space-y-2.5">
        {rows.map((r, i) => (
          <li
            key={r.label}
            className="grid items-center gap-x-3 gap-y-1 text-sm"
            style={{ gridTemplateColumns: `minmax(0, ${labelWidth}) minmax(0, 1fr) auto` }}
          >
            <span className="truncate text-foreground">{r.label}</span>
            <span className="relative h-2.5 rounded-full bg-muted overflow-hidden" aria-hidden>
              <span
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: `${Math.max((r.pct / max) * 100, 0.8)}%`,
                  background: i < dimAfter ? accent : accentSoft(0.45),
                }}
              />
            </span>
            <span className="tabular-nums text-right whitespace-nowrap">
              <span className="font-semibold text-foreground">{r.pct}%</span>
              {r.n !== undefined && <span className="text-muted-foreground ml-1.5 text-xs">{fmt(r.n)}</span>}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

/** A single 100% split bar with an inline legend underneath. */
export const SplitBar: React.FC<{
  parts: { label: string; value: number; display: string; note?: string }[];
  height?: string;
  ariaLabel: string;
}> = ({ parts, height = "h-12", ariaLabel }) => {
  const total = parts.reduce((s, p) => s + p.value, 0);
  const strengths = [1, 0.62, 0.4, 0.24];
  return (
    <figure aria-label={ariaLabel}>
      <div className={`flex w-full ${height} rounded-[10px] overflow-hidden gap-[3px]`}>
        {parts.map((p, i) => (
          <div
            key={p.label}
            className="h-full first:rounded-l-[10px] last:rounded-r-[10px]"
            style={{ width: `${(p.value / total) * 100}%`, background: accentSoft(strengths[i] ?? 0.15), minWidth: 4 }}
            title={`${p.label}: ${p.display}`}
          />
        ))}
      </div>
      <figcaption className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4">
        {parts.map((p, i) => (
          <div key={p.label} className="flex gap-2.5">
            <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-[3px]" style={{ background: accentSoft(strengths[i] ?? 0.15) }} aria-hidden />
            <div>
              <div className="text-sm text-foreground leading-snug">{p.label}</div>
              <div className="text-lg font-semibold tabular-nums text-foreground">{p.display}</div>
              {p.note && <div className="text-xs text-muted-foreground leading-snug mt-0.5">{p.note}</div>}
            </div>
          </div>
        ))}
      </figcaption>
    </figure>
  );
};

/** Percentage meter on a 0 to 100 track, used for the verification ledger. */
export const Meter: React.FC<{ pct: number; label: string; detail: string }> = ({ pct, label, detail }) => (
  <div className="grid grid-cols-[4.75rem_minmax(0,1fr)] sm:grid-cols-[6.5rem_minmax(0,1fr)] gap-x-4 items-baseline py-5 border-t border-border first:border-t-0">
    <div className="text-2xl sm:text-3xl font-semibold tabular-nums tracking-tight text-foreground">{pct}%</div>
    <div>
      <div className="text-[15px] text-foreground leading-snug">{label}</div>
      <div className="relative mt-3 h-1.5 rounded-full bg-muted overflow-hidden" aria-hidden>
        <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${pct}%`, background: accent }} />
      </div>
      <div className="text-xs text-muted-foreground mt-2 leading-relaxed">{detail}</div>
    </div>
  </div>
);
