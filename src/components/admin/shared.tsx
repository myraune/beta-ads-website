import React from "react";

/* Shared bits of /admin. Every admin API call rides on the httpOnly session
   cookie set by /api/admin-session; a 401 means the session ran out. */

export const field = "h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-foreground/40";
export const label = "block text-[13px] font-medium text-muted-foreground mb-1.5";

export const SIGNED_OUT = "admin-signed-out";

export async function adminFetch<T = unknown>(path: string, init: { method?: string; body?: unknown } = {}): Promise<T> {
  const res = await fetch(path, {
    method: init.method || "GET",
    headers: init.body === undefined ? undefined : { "content-type": "application/json" },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
  }).catch(() => null);
  if (!res) throw new Error("Network error.");
  if (res.status === 401) window.dispatchEvent(new Event(SIGNED_OUT));
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.error) throw new Error(data.error || `HTTP ${res.status}`);
  return data as T;
}

/** One key number. With onClick it becomes a button that jumps to the detail. */
export const Kpi: React.FC<{ label: string; value: string; note?: string; onClick?: () => void }> = ({ label, value, note, onClick }) => {
  const body = (
    <>
      <div className="text-[13px] text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold tabular-nums">{value}</div>
      {note && <div className="mt-0.5 text-xs text-muted-foreground tabular-nums">{note}</div>}
    </>
  );
  const box = "rounded-[14px] border border-border bg-card px-5 py-4 text-left";
  return onClick ? <button type="button" onClick={onClick} className={`${box} flex flex-col justify-start hover:border-foreground/40`}>{body}</button> : <div className={box}>{body}</div>;
};
