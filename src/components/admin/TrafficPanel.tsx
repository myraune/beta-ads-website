import React, { useEffect, useState } from "react";
import { adminFetch } from "./shared";
import type { Lead } from "./LeadsPanel";

/* Traffic tab of /admin: beta-ads.no visitors from the HQ tracker, set against
   the leads the site collected in the same days. */

type Row = { key: string | null; visitors: number; views: number };
type Stats = {
  days: number; live: number; visitors: number; views: number; prevVisitors: number; engagedMs: number | null;
  byDay: { day: string; value: number }[]; pages: Row[]; referrers: Row[]; countries: Row[]; sources: Row[];
};
const RANGES = [7, 28, 90, 365] as const;
const nf = new Intl.NumberFormat("en-GB");

const Kpi: React.FC<{ label: string; value: string; note?: string }> = ({ label, value, note }) => (
  <div className="rounded-[14px] border border-border bg-card px-5 py-4">
    <div className="text-[13px] text-muted-foreground">{label}</div>
    <div className="mt-1 text-2xl font-semibold tabular-nums">{value}</div>
    {note && <div className="mt-0.5 text-xs text-muted-foreground tabular-nums">{note}</div>}
  </div>
);

const Table: React.FC<{ title: string; rows: Row[]; empty: string; fmt?: (k: string | null) => string }> = ({ title, rows, empty, fmt = (k) => k || "—" }) => {
  const max = Math.max(1, ...rows.map((r) => r.visitors));
  return (
    <div>
      <h3 className="m-0 text-sm font-semibold">{title}</h3>
      <ul className="mt-2 m-0 p-0 list-none text-sm">
        {rows.map((r) => (
          <li key={String(r.key)} className="relative flex justify-between gap-3 py-1.5 px-2">
            <span className="absolute inset-y-0.5 left-0 rounded bg-foreground/[0.06]" style={{ width: `${(r.visitors / max) * 100}%` }} aria-hidden="true" />
            <span className="relative truncate">{fmt(r.key)}</span>
            <span className="relative tabular-nums text-muted-foreground">{nf.format(r.visitors)}</span>
          </li>
        ))}
        {!rows.length && <li className="py-1.5 px-2 text-muted-foreground">{empty}</li>}
      </ul>
    </div>
  );
};

const TrafficPanel: React.FC<{ leads: Lead[] }> = ({ leads }) => {
  const [days, setDays] = useState<(typeof RANGES)[number]>(28);
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let live = true;
    setStats(null);
    adminFetch<Stats>(`/api/admin-traffic?days=${days}`)
      .then((s) => { if (live) { setStats(s); setError(""); } })
      .catch((err) => { if (live) setError(err instanceof Error ? err.message : "Could not load traffic."); });
    return () => { live = false; };
  }, [days]);

  const leadsByDay = new Map<string, number>();
  for (const l of leads) leadsByDay.set(l.at.slice(0, 10), (leadsByDay.get(l.at.slice(0, 10)) || 0) + 1);
  const leadsInRange = stats ? stats.byDay.reduce((n, d) => n + (leadsByDay.get(d.day) || 0), 0) : 0;
  const change = stats && stats.prevVisitors ? Math.round(((stats.visitors - stats.prevVisitors) / stats.prevVisitors) * 100) : null;
  const peak = stats ? Math.max(1, ...stats.byDay.map((d) => d.value)) : 1;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 rounded-full border border-border p-1" role="group" aria-label="Range">
          {RANGES.map((r) => (
            <button key={r} type="button" aria-pressed={days === r} onClick={() => setDays(r)}
              className={`h-8 px-3.5 rounded-full text-sm font-semibold ${days === r ? "bg-foreground text-background" : "text-muted-foreground"}`}>
              {r === 365 ? "1Y" : `${r}D`}
            </button>
          ))}
        </div>
        {stats && <span className="text-sm text-muted-foreground tabular-nums">{stats.live} on the site now</span>}
      </div>

      {error && <p role="alert" className="mt-4 text-sm text-red-600">{error}</p>}
      {!stats ? (!error && <p className="mt-6 text-sm text-muted-foreground">Loading…</p>) : (
        <>
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Kpi label="Visitors" value={nf.format(stats.visitors)} note={change === null ? undefined : `${change >= 0 ? "+" : ""}${change}% vs the ${days} days before`} />
            <Kpi label="Page views" value={nf.format(stats.views)} note={stats.engagedMs ? `${Math.floor(stats.engagedMs / 60000)} min ${Math.round((stats.engagedMs % 60000) / 1000)} s average time on page` : undefined} />
            <Kpi label="Leads" value={nf.format(leadsInRange)} note="Library, checker and demo" />
            <Kpi label="Visitor to lead" value={stats.visitors ? `${((leadsInRange / stats.visitors) * 100).toFixed(2)}%` : "—"} />
          </div>

          <figure className="mt-8 m-0">
            <figcaption className="text-sm font-semibold">Visitors per day <span className="font-normal text-muted-foreground">· red dot = a day with leads</span></figcaption>
            <div className="mt-3 h-44 flex items-end gap-[2px]" role="img" aria-label={`Visitors per day over the last ${days} days, peak ${peak}`}>
              {stats.byDay.map((d) => {
                const n = leadsByDay.get(d.day) || 0;
                return (
                  <div key={d.day} className="group relative flex-1 h-full flex flex-col justify-end items-center min-w-0">
                    {n > 0 && <span className="mb-1 h-1.5 w-1.5 rounded-full bg-signal shrink-0" aria-hidden="true" />}
                    <span className="w-full rounded-t-[2px] bg-foreground/60 group-hover:bg-foreground" style={{ height: `${Math.max(1, (d.value / peak) * 100)}%` }} />
                    <span className="pointer-events-none absolute bottom-full mb-1 hidden group-hover:block whitespace-nowrap rounded-md bg-foreground text-background text-xs px-2 py-1 tabular-nums z-10">
                      {d.day}: {d.value} visitors{n ? `, ${n} lead${n > 1 ? "s" : ""}` : ""}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-1.5 flex justify-between text-xs text-muted-foreground tabular-nums">
              <span>{stats.byDay[0]?.day}</span><span>{stats.byDay[stats.byDay.length - 1]?.day}</span>
            </div>
          </figure>

          <div className="mt-10 grid md:grid-cols-2 gap-x-10 gap-y-8">
            <Table title="Top pages" rows={stats.pages} empty="No page views yet." />
            <Table title="Where visitors come from" rows={stats.referrers} empty="No referrers yet." fmt={(k) => k || "Direct or unknown"} />
            <Table title="Countries" rows={stats.countries} empty="No countries yet." fmt={(k) => k || "Unknown"} />
            <Table title="Campaigns (utm_source)" rows={stats.sources.filter((r) => r.key)} empty="No tagged links in this range." />
          </div>
          <p className="mt-8 mb-0 text-xs text-muted-foreground">From the HQ tracker on beta-ads.no (no cookies), with older days imported from Vercel Analytics.</p>
        </>
      )}
    </div>
  );
};

export default TrafficPanel;
