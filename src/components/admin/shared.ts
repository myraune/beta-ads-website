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
