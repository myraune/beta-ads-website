import React, { useEffect, useState } from "react";
import type { Creative } from "@/data/creatives";
import { adminFetch, Kpi } from "./shared";
import { SOURCES, sourceOf, type Lead, type Source } from "./LeadsPanel";
import type { Stats } from "./TrafficPanel";

/* Overview tab of /admin, the first thing Andreas sees: the key numbers of the
   last 7 days set against the 7 before, what needs him now, and the newest
   leads. Traffic comes from the HQ tracker; if HQ is down the lead numbers
   still show. */

const DAY = 86_400_000;
const nf = new Intl.NumberFormat("en-GB");
const delta = (now: number, before: number) => (before ? `${now >= before ? "+" : ""}${Math.round(((now - before) / before) * 100)}% vs the 7 days before` : `${nf.format(before)} the 7 days before`);

const OverviewPanel: React.FC<{ leads: Lead[]; approved: string[]; items: Creative[]; go: (tab: "leads" | "traffic" | "creatives") => void }> = ({ leads, approved, items, go }) => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [trafficError, setTrafficError] = useState("");

  useEffect(() => {
    let live = true;
    adminFetch<Stats>("/api/admin-traffic?days=7")
      .then((s) => { if (live) setStats(s); })
      .catch((err) => { if (live) setTrafficError(err instanceof Error ? err.message : "Could not load traffic."); });
    return () => { live = false; };
  }, []);

  const now = Date.now();
  const age = (l: Lead) => now - new Date(l.at).getTime();
  const week = leads.filter((l) => age(l) < 7 * DAY);
  const prevWeek = leads.filter((l) => age(l) >= 7 * DAY && age(l) < 14 * DAY).length;
  const month = leads.filter((l) => age(l) < 30 * DAY);
  const ok = new Set(approved.map((e) => e.toLowerCase()));
  const waiting = new Set(leads.filter((l) => sourceOf(l) === "creative-library" && !ok.has(l.email.toLowerCase())).map((l) => l.email.toLowerCase())).size;
  const newest = [...leads].sort((a, b) => b.at.localeCompare(a.at)).slice(0, 6);
  const t = stats ? "" : trafficError ? "—" : "…";

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Kpi label="Visitors, 7 days" value={t || nf.format(stats!.visitors)} note={stats ? delta(stats.visitors, stats.prevVisitors) : trafficError ? "Traffic is unavailable" : undefined} onClick={() => go("traffic")} />
        <Kpi label="Leads, 7 days" value={nf.format(week.length)} note={delta(week.length, prevWeek)} onClick={() => go("leads")} />
        <Kpi label="Visitor to lead, 7 days" value={t || (stats!.visitors ? `${((week.length / stats!.visitors) * 100).toFixed(2)}%` : "—")} />
        <Kpi label="Waiting for library access" value={nf.format(waiting)} note={waiting ? "Approve in Leads" : "Nobody waiting"} onClick={() => go("leads")} />
      </div>

      <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Kpi label="On the site now" value={t || nf.format(stats!.live)} />
        <Kpi label="Page views, 7 days" value={t || nf.format(stats!.views)} />
        <Kpi label="Leads, 30 days" value={nf.format(month.length)} note={`${nf.format(leads.length)} in total`} />
        <Kpi label="Creatives in the library" value={nf.format(items.length)} onClick={() => go("creatives")} />
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-x-10 gap-y-8">
        <section>
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="m-0 text-sm font-semibold">Newest leads</h2>
            <button type="button" onClick={() => go("leads")} className="text-sm text-muted-foreground hover:text-foreground">All leads</button>
          </div>
          <ul className="mt-2 m-0 p-0 list-none divide-y divide-border border-y border-border text-sm">
            {newest.map((l) => (
              <li key={l.at + l.email} className="py-2.5 flex justify-between gap-3">
                <span className="min-w-0 truncate">{l.name || l.email}{l.company ? <span className="text-muted-foreground"> · {l.company}</span> : null}</span>
                <span className="shrink-0 text-muted-foreground text-xs tabular-nums">{SOURCES[sourceOf(l)]} · {new Date(l.at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
              </li>
            ))}
            {!newest.length && <li className="py-2.5 text-muted-foreground">No leads yet.</li>}
          </ul>
        </section>

        <section>
          <h2 className="m-0 text-sm font-semibold">Leads by form, 30 days</h2>
          <ul className="mt-2 m-0 p-0 list-none divide-y divide-border border-y border-border text-sm">
            {(Object.keys(SOURCES) as Source[]).map((s) => (
              <li key={s} className="py-2.5 flex justify-between gap-3">
                <span>{SOURCES[s]}</span>
                <span className="tabular-nums">{nf.format(month.filter((l) => sourceOf(l) === s).length)}</span>
              </li>
            ))}
          </ul>
          <h2 className="mt-8 m-0 text-sm font-semibold">Top pages, 7 days</h2>
          <ul className="mt-2 m-0 p-0 list-none divide-y divide-border border-y border-border text-sm">
            {(stats?.pages || []).slice(0, 5).map((r) => (
              <li key={String(r.key)} className="py-2.5 flex justify-between gap-3">
                <span className="min-w-0 truncate">{r.key || "—"}</span>
                <span className="shrink-0 tabular-nums text-muted-foreground">{nf.format(r.visitors)}</span>
              </li>
            ))}
            {!stats?.pages.length && <li className="py-2.5 text-muted-foreground">{trafficError ? "Traffic is unavailable." : stats ? "No page views yet." : "Loading…"}</li>}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default OverviewPanel;
