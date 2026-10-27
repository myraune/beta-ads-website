import { createHmac, timingSafeEqual } from "node:crypto";
import { get, put } from "@vercel/blob";
import type { Creative } from "../../src/data/creatives";

/* Server side of the creative library.
   Two Blob stores: the public one (BLOB_READ_WRITE_TOKEN) holds the videos and
   posters, the private one (LEADS_READ_WRITE_TOKEN) holds manifest.json and one
   JSON file per lead. Visitors unlock the videos with an HMAC-signed token
   (CREATIVE_TOKEN_SECRET); the admin page sends CREATIVE_ADMIN_PASSWORD. */

const PRIVATE = () => ({ access: "private" as const, token: process.env.LEADS_READ_WRITE_TOKEN });
const MANIFEST = "manifest.json";
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

export function tokenValid(token: string | null): boolean {
  if (!token || !process.env.CREATIVE_TOKEN_SECRET) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return false;
  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString()).x > Date.now();
  } catch {
    return false;
  }
}

export function isAdmin(password: string | null | undefined): boolean {
  const real = process.env.CREATIVE_ADMIN_PASSWORD;
  if (!real || !password) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(real);
  return a.length === b.length && timingSafeEqual(a, b);
}
