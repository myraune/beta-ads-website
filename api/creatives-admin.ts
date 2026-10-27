import { del, list } from "@vercel/blob";
import { INDUSTRIES, isIndustry, isKind, type Creative } from "../src/data/creatives.js";
import { json, readManifest, writeManifest, readBlobJson, isAdmin } from "./_lib/creatives.js";

/* Admin side of the creative library (/creative-library/admin), behind
   CREATIVE_ADMIN_PASSWORD in the x-admin-password header.
   GET                         -> creatives (with video URLs) and every lead.
   POST {brand, title, ...}    -> adds a creative whose files were already uploaded
                                  through /api/creatives-upload.
   DELETE ?id=                 -> removes a creative and its two files. */

export const maxDuration = 30;

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const slug = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").slice(0, 60);

export async function GET(request: Request) {
  if (!isAdmin(request.headers.get("x-admin-password"))) return json({ error: "Wrong password." }, 401);
  const files = await list({ prefix: "leads/", token: process.env.LEADS_READ_WRITE_TOKEN, limit: 1000 });
  const leads = (await Promise.all(files.blobs.map((b) => readBlobJson<Record<string, string>>(b.pathname))))
    .filter(Boolean)
    .sort((a, b) => String(b!.at).localeCompare(String(a!.at)));
  return json({ items: await readManifest(true), leads, industries: INDUSTRIES });
}

export async function POST(request: Request) {
  if (!isAdmin(request.headers.get("x-admin-password"))) return json({ error: "Wrong password." }, 401);
  const b = await request.json().catch(() => ({}));
  const brand = str(b.brand, 60);
  const title = str(b.title, 80);
  const poster = str(b.poster, 500);
  const video = str(b.video, 500);
  if (!brand || !title) return json({ error: "Brand and title are required." }, 400);
  if (!isIndustry(b.industry)) return json({ error: "Pick an industry." }, 400);
  if (!isKind(b.kind)) return json({ error: "Pick a type." }, 400);
  if (!/^https:\/\/[\w.-]+\.public\.blob\.vercel-storage\.com\//.test(poster) || !/^https:\/\/[\w.-]+\.public\.blob\.vercel-storage\.com\//.test(video))
    return json({ error: "Upload the video first." }, 400);

  const items = await readManifest(true);
  let id = slug(`${brand}-${title}`) || `creative-${Date.now()}`;
  while (items.some((i) => i.id === id)) id = `${id}-2`;
  const item: Creative = {
    id, brand, title, industry: b.industry, kind: b.kind, poster, video,
    description: str(b.description, 280) || undefined,
    format: str(b.format, 60) || undefined,
    createdAt: new Date().toISOString(),
  };
  await writeManifest([item, ...items]);
  return json({ item });
}

export async function DELETE(request: Request) {
  if (!isAdmin(request.headers.get("x-admin-password"))) return json({ error: "Wrong password." }, 401);
  const id = new URL(request.url).searchParams.get("id");
  const items = await readManifest(true);
  const item = items.find((i) => i.id === id);
  if (!item) return json({ error: "Not found." }, 404);
  await writeManifest(items.filter((i) => i.id !== id));
  await del([item.poster, item.video].filter(Boolean) as string[]).catch(() => undefined);
  return json({ ok: true });
}
