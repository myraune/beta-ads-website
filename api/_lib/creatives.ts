import { createHmac, timingSafeEqual } from "node:crypto";
import { get, put } from "@vercel/blob";
import type { Creative } from "../../src/data/creatives.js";

/* Server side of the creative library.
   Two Blob stores: the public one (BLOB_READ_WRITE_TOKEN) holds the videos and
   posters, the private one (LEADS_READ_WRITE_TOKEN) holds manifest.json and one
   JSON file per lead, plus approvals.json: the emails Andreas has approved for
   the library. Visitors get an HMAC-signed token (CREATIVE_TOKEN_SECRET) when
   they sign up; it opens the sponsorship checker straight away, and the library
   once its email is approved. Admin access is checked in ./admin.ts. */

const PRIVATE = () => ({ access: "private" as const, token: process.env.LEADS_READ_WRITE_TOKEN });
const MANIFEST = "manifest.json";
const APPROVALS = "approvals.json";
const TOKEN_DAYS = 180;

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

let cached: { at: number; items: Creative[] } | null = null;

export async function readManifest(fresh = false): Promise<Creative[]> {
  if (!fresh && cached && Date.now() - cached.at < 60_000) return cached.items;
  const r = await get(MANIFEST, PRIVATE()).catch(() => null);
  const items: Creative[] = r?.statusCode === 200 ? JSON.parse(await new Response(r.stream).text()) : [];
  cached = { at: Date.now(), items };
  return items;
}

export async function writeManifest(items: Creative[]) {
  await put(MANIFEST, JSON.stringify(items, null, 1), { ...PRIVATE(), addRandomSuffix: false, allowOverwrite: true, contentType: "application/json" });
  cached = { at: Date.now(), items };
}

export async function saveLead(lead: Record<string, unknown>) {
  const at = new Date().toISOString();
  await put(`leads/${at.replace(/[:.]/g, "-")}.json`, JSON.stringify({ ...lead, at }), { ...PRIVATE(), addRandomSuffix: true, contentType: "application/json" });
}

export async function readBlobJson<T>(pathname: string): Promise<T | null> {
  const r = await get(pathname, PRIVATE()).catch(() => null);
  return r?.statusCode === 200 ? JSON.parse(await new Response(r.stream).text()) : null;
}

const sign = (payload: string) => createHmac("sha256", process.env.CREATIVE_TOKEN_SECRET!).update(payload).digest("base64url");

export function issueToken(email: string) {
  const payload = Buffer.from(JSON.stringify({ e: email, x: Date.now() + TOKEN_DAYS * 864e5 })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

/** The email a valid, unexpired token was issued to, or null. */
export function tokenEmail(token: string | null): string | null {
  if (!token || !process.env.CREATIVE_TOKEN_SECRET) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const { e, x } = JSON.parse(Buffer.from(payload, "base64url").toString());
    return x > Date.now() && typeof e === "string" ? e : null;
  } catch {
    return null;
  }
}

export const tokenValid = (token: string | null) => tokenEmail(token) !== null;

let approvals: { at: number; emails: string[] } | null = null;

/** Emails approved for the library. Cached for 30 s per instance, so an approval
    reaches every instance within half a minute. */
export async function readApprovals(fresh = false): Promise<string[]> {
  if (!fresh && approvals && Date.now() - approvals.at < 30_000) return approvals.emails;
  const emails = (await readBlobJson<string[]>(APPROVALS)) || [];
  approvals = { at: Date.now(), emails };
  return emails;
}

export async function writeApprovals(emails: string[]) {
  await put(APPROVALS, JSON.stringify(emails), { ...PRIVATE(), addRandomSuffix: false, allowOverwrite: true, contentType: "application/json" });
  approvals = { at: Date.now(), emails };
}
