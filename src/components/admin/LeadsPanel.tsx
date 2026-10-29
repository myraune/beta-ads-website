import React, { useState } from "react";
import { adminFetch } from "./shared";

/* Leads tab of /admin: everyone who left their details on the site, newest
   first. Library requests need Andreas' approval before the library opens.
   Any other lead can be given access too: every form issues the same
   email-bound token, so the library opens in the browser they used. */

export type Lead = { name?: string; email: string; company?: string; country?: string; at: string; referrer?: string; source?: string; message?: string };

const SOURCES = { "creative-library": "Library", "sponsorship-checker": "Checker", demo: "Demo" } as const;
type Source = keyof typeof SOURCES;
const sourceOf = (l: Lead): Source => (l.source && l.source in SOURCES ? (l.source as Source) : "creative-library");

/** A ready email Andreas sends himself (mailto opens his own mail app), never sent by the site. */
const accessMail = (l: Lead) => {
  const first = (l.name || "").split(" ")[0];
  const body = `Hi${first ? ` ${first}` : ""},\n\nYou now have access to the Beta Ads creative library: https://beta-ads.no/creative-library\n\nIt opens in the browser you signed up in. On another device, just fill in the form again with the same email.\n\nAndreas`;
  return `mailto:${l.email}?subject=${encodeURIComponent("Your access to the Beta Ads creative library")}&body=${encodeURIComponent(body)}`;
};

const LeadsPanel: React.FC<{ leads: Lead[]; approved: string[]; setApproved: (a: string[]) => void }> = ({ leads, approved, setApproved }) => {
  const [filter, setFilter] = useState<Source | "all">("all");
  const [error, setError] = useState("");
  const ok = new Set(approved.map((e) => e.toLowerCase()));
  const isOk = (l: Lead) => ok.has(l.email.toLowerCase());
  const shown = leads.filter((l) => filter === "all" || sourceOf(l) === filter);
  const waiting = new Set(leads.filter((l) => sourceOf(l) === "creative-library" && !isOk(l)).map((l) => l.email.toLowerCase())).size;

  const approve = async (email: string, yes: boolean) => {
    try {
      const r = await adminFetch<{ approved: string[] }>("/api/creatives-admin", { method: "PATCH", body: { email, approved: yes } });
      setError("");
      setApproved(r.approved);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    }
  };

  const csv = () => {
    const rows = [["at", "source", "name", "email", "company", "country", "approved", "message", "referrer"], ...shown.map((l) => [l.at, sourceOf(l), l.name || "", l.email, l.company || "", l.country || "", isOk(l) ? "yes" : "no", l.message || "", l.referrer || ""])];
    const text = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type: "text/csv" }));
    a.download = `beta-ads-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const count = (s: Source) => leads.filter((l) => sourceOf(l) === s).length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by source">
          {([["all", `All ${leads.length}`], ...(Object.keys(SOURCES) as Source[]).map((s) => [s, `${SOURCES[s]} ${count(s)}`])] as [Source | "all", string][]).map(([v, l]) => (
            <button key={v} type="button" aria-pressed={filter === v} onClick={() => setFilter(v)}
              className={`h-9 px-3.5 rounded-full text-sm font-semibold whitespace-nowrap border ${filter === v ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground"}`}>
              {l}
            </button>
          ))}
        </div>
        <button type="button" onClick={csv} disabled={!shown.length} className="h-9 px-4 rounded-lg border border-border text-sm font-semibold disabled:opacity-40">Export CSV</button>
      </div>
      {waiting > 0 && <p className="mt-4 mb-0 text-sm"><b>{waiting} waiting</b> <span className="text-muted-foreground">for access to the library. Approve, then send the access email from your own inbox.</span></p>}
      {error && <p role="alert" className="mt-3 mb-0 text-sm text-red-600">{error}</p>}

      <ul className="mt-4 m-0 p-0 list-none divide-y divide-border border-y border-border text-sm">
        {shown.map((l) => {
          const s = sourceOf(l);
          return (
            <li key={l.at + l.email} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
              <span className="min-w-0">
                <span className="block truncate">{l.name ? <>{l.name} · </> : null}<b className="font-medium">{l.email}</b>{l.company ? <span className="text-muted-foreground"> · {l.company}</span> : null}</span>
                <span className="block text-muted-foreground tabular-nums text-xs mt-0.5">{SOURCES[s]} · {l.country ? `${l.country} · ` : ""}{new Date(l.at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}</span>
                {l.message && <span className="block mt-1.5 text-[13px] whitespace-pre-line">{l.message}</span>}
              </span>
              <span className="shrink-0 flex items-center gap-2">
                {s === "demo" && <a href={`mailto:${l.email}?subject=${encodeURIComponent("Re: your demo request")}`} className="h-8 px-3 inline-flex items-center rounded-lg border border-border text-xs font-semibold">Reply</a>}
                {isOk(l) ? (
                  <>
                    <a href={accessMail(l)} className="h-8 px-3 inline-flex items-center rounded-lg border border-border text-xs font-semibold">Email them</a>
                    <button type="button" onClick={() => approve(l.email, false)} className="h-8 px-3 rounded-lg text-xs font-semibold text-muted-foreground">Revoke</button>
                  </>
                ) : (
                  <button type="button" onClick={() => approve(l.email, true)}
                    className={`h-8 px-3 rounded-lg text-xs font-semibold ${s === "creative-library" ? "bg-primary text-primary-foreground" : "border border-border"}`}>
                    {s === "creative-library" ? "Approve" : "Give library access"}
                  </button>
                )}
              </span>
            </li>
          );
        })}
        {!shown.length && <li className="py-3 text-muted-foreground">No leads yet.</li>}
      </ul>
    </div>
  );
};

export default LeadsPanel;
