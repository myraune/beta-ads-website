import { list, put } from "@vercel/blob";
import { readBlobJson } from "./creatives.js";

/* Shared state for the sponsorship checker, in the private Blob store.
   checker/cache/<login>.json         last result per channel, shared by every function instance
   checker/usage/<YYYY-MM-DD>/<...>   one file per Claude call: tokens and dollar cost
   The usage files are also the global daily budget: counting today's files gives
   the number of Claude calls made today across all instances. */

const PRIVATE = () => ({ access: "private" as const, token: process.env.LEADS_READ_WRITE_TOKEN });
const today = () => new Date().toISOString().slice(0, 10);

export async function readCached<T>(login: string, maxAgeMs: number): Promise<T | null> {
  const hit = await readBlobJson<{ at: number; data: T }>(`checker/cache/${login}.json`).catch(() => null);
  return hit && Date.now() - hit.at < maxAgeMs ? hit.data : null;
}

export async function writeCached(login: string, data: unknown) {
  await put(`checker/cache/${login}.json`, JSON.stringify({ at: Date.now(), data }), { ...PRIVATE(), addRandomSuffix: false, allowOverwrite: true, contentType: "application/json" });
}

export async function logUsage(entry: { login: string; model: string; lines: number; input: number; output: number; usd: number }) {
  const at = new Date().toISOString();
  await put(`checker/usage/${today()}/${at.replace(/[:.]/g, "-")}-${entry.login}.json`, JSON.stringify({ ...entry, at }), { ...PRIVATE(), addRandomSuffix: true, contentType: "application/json" });
}

export async function callsToday(): Promise<number> {
  const r = await list({ prefix: `checker/usage/${today()}/`, token: process.env.LEADS_READ_WRITE_TOKEN, limit: 1000 });
  return r.blobs.length;
}
