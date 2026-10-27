import React, { useCallback, useEffect, useState } from "react";
import { upload } from "@vercel/blob/client";
import { SEO } from "@/components/SEO";
import { W } from "@/components/working/shared";
import { INDUSTRIES, type Creative, type CreativeKind } from "@/data/creatives";

/* /creative-library/admin: not linked anywhere, noindex, behind the admin
   password (CREATIVE_ADMIN_PASSWORD). Upload a video, the poster is grabbed from
   the video in the browser, both go straight to the public Blob store, then the
   item is added to the manifest. Also lists the emails left on the library. */

const PW_KEY = "creative-admin-pw";
const field = "h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-foreground/40";
const label = "block text-[13px] font-medium text-muted-foreground mb-1.5";
const slug = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").slice(0, 50) || "creative";

type Lead = { name?: string; email: string; company?: string; country?: string; at: string; referrer?: string };

/** First frame worth showing: 1.5 s in (or the middle of a short clip), as WebP. */
function grabPoster(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const v = document.createElement("video");
    v.muted = true;
    v.playsInline = true;
    v.preload = "auto";
    v.src = URL.createObjectURL(file);
    v.onloadedmetadata = () => { v.currentTime = Math.min(1.5, v.duration / 2); };
    v.onseeked = () => {
      const c = document.createElement("canvas");
      c.width = Math.min(1280, v.videoWidth);
      c.height = Math.round((c.width / v.videoWidth) * v.videoHeight);
      c.getContext("2d")!.drawImage(v, 0, 0, c.width, c.height);
      c.toBlob((b) => { URL.revokeObjectURL(v.src); b ? resolve(b) : reject(new Error("Could not read a frame.")); }, "image/webp", 0.82);
    };
    v.onerror = () => reject(new Error("The browser cannot read this video."));
  });
}

const CreativeLibraryAdmin: React.FC = () => {
  const [pw, setPw] = useState(() => { try { return sessionStorage.getItem(PW_KEY) || ""; } catch { return ""; } });
  const [data, setData] = useState<{ items: Creative[]; leads: Lead[] } | null>(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ brand: "", title: "", industry: "", kind: "client" as CreativeKind, format: "", description: "" });
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<string>("");

  const load = useCallback(async (password: string) => {
    const r = await fetch("/api/creatives-admin", { headers: { "x-admin-password": password } }).then((res) => res.json()).catch(() => ({ error: "Network error." }));
    if (r.error) { setData(null); setError(r.error); return; }
    setError("");
    setData(r);
    try { sessionStorage.setItem(PW_KEY, password); } catch { /* fine */ }
  }, []);

  useEffect(() => { if (pw) load(pw); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return setError("Choose a video.");
    setError("");
    try {
      const base = `library/${slug(`${form.brand}-${form.title}`)}`;
      setProgress("Reading a poster frame…");
      const poster = await grabPoster(file);
      setProgress("Uploading video… 0%");
      const ext = file.type === "video/webm" ? "webm" : "mp4";
      const video = await upload(`${base}.${ext}`, file, {
        access: "public", handleUploadUrl: "/api/creatives-upload", clientPayload: pw, multipart: file.size > 50 * 1024 * 1024,
        onUploadProgress: (p) => setProgress(`Uploading video… ${Math.round(p.percentage)}%`),
      });
      setProgress("Uploading poster…");
      const img = await upload(`${base}.webp`, poster, { access: "public", handleUploadUrl: "/api/creatives-upload", clientPayload: pw });
      setProgress("Saving…");
      const r = await fetch("/api/creatives-admin", {
        method: "POST",
        headers: { "content-type": "application/json", "x-admin-password": pw },
        body: JSON.stringify({ ...form, video: video.url, poster: img.url }),
      }).then((res) => res.json());
      if (r.error) throw new Error(r.error);
      setProgress(`Added "${r.item.title}".`);
      setForm({ ...form, title: "", format: "", description: "" });
      setFile(null);
      load(pw);
    } catch (err) {
      setProgress("");
      setError(err instanceof Error ? err.message : "Upload failed.");
    }
  };

  const remove = async (c: Creative) => {
    if (!window.confirm(`Remove "${c.brand} · ${c.title}" from the library? The files are deleted too.`)) return;
    const r = await fetch(`/api/creatives-admin?id=${encodeURIComponent(c.id)}`, { method: "DELETE", headers: { "x-admin-password": pw } }).then((res) => res.json());
    if (r.error) setError(r.error); else load(pw);
  };

  const csv = () => {
    const rows = [["at", "name", "email", "company", "country", "referrer"], ...(data?.leads || []).map((l) => [l.at, l.name || "", l.email, l.company || "", l.country || "", l.referrer || ""])];
    const text = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type: "text/csv" }));
    a.download = `creative-library-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <>
      <SEO title="Creative library admin | Beta Ads" description="Admin" noindex />
      <div className={`${W} pt-28 md:pt-32 pb-24 min-h-screen`}>
        <h1 className="text-3xl font-bold tracking-tight m-0">Creative library admin</h1>

        {!data ? (
          <form onSubmit={(e) => { e.preventDefault(); load(pw); }} className="mt-8 flex gap-3 max-w-md">
            <label className="sr-only" htmlFor="adm-pw">Password</label>
            <input id="adm-pw" type="password" autoComplete="current-password" placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} className={field} />
            <button type="submit" className="h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">Open</button>
          </form>
        ) : (
          <div className="mt-8 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10">
            <form onSubmit={submit} className="rounded-[14px] border border-border bg-card p-6 grid gap-4 self-start">
              <h2 className="m-0 text-lg font-semibold">Add a creative</h2>
              <div>
                <label className={label} htmlFor="adm-file">Video (MP4 or WebM, a preview on a stream works best)</label>
                <input id="adm-file" type="file" accept="video/mp4,video/webm" onChange={(e) => setFile(e.target.files?.[0] || null)} className="text-sm" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className={label} htmlFor="adm-brand">Brand</label><input id="adm-brand" required value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className={field} /></div>
                <div><label className={label} htmlFor="adm-title">Title</label><input id="adm-title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={field} /></div>
                <div>
                  <label className={label} htmlFor="adm-ind">Industry</label>
                  <select id="adm-ind" required value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} className={field}>
                    <option value="">Choose…</option>
                    {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <span className={label}>Type</span>
                  <div className="flex gap-4 h-10 items-center text-sm">
                    {([["client", "Campaign that ran"], ["concept", "Concept"]] as [CreativeKind, string][]).map(([v, l]) => (
                      <label key={v} className="inline-flex items-center gap-2"><input type="radio" name="kind" checked={form.kind === v} onChange={() => setForm({ ...form, kind: v })} />{l}</label>
                    ))}
                  </div>
                </div>
              </div>
              <div><label className={label} htmlFor="adm-format">Format (optional)</label><input id="adm-format" placeholder="Corner overlay, 12 s" value={form.format} onChange={(e) => setForm({ ...form, format: e.target.value })} className={field} /></div>
              <div><label className={label} htmlFor="adm-desc">The idea in one or two lines (optional)</label><textarea id="adm-desc" rows={3} maxLength={280} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${field} h-auto py-2`} /></div>
              <button type="submit" disabled={Boolean(progress) && !progress.startsWith("Added")} className="h-10 rounded-lg bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-50">Upload and add</button>
              {progress && <p className="m-0 text-sm text-muted-foreground">{progress}</p>}
              {error && <p role="alert" className="m-0 text-sm text-red-600">{error}</p>}
            </form>

            <div className="grid gap-10 self-start">
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="m-0 text-lg font-semibold">Emails ({data.leads.length})</h2>
                  <button type="button" onClick={csv} disabled={!data.leads.length} className="h-9 px-4 rounded-lg border border-border text-sm font-semibold disabled:opacity-40">Export CSV</button>
                </div>
                <ul className="mt-3 m-0 p-0 list-none divide-y divide-border border-y border-border max-h-[340px] overflow-auto text-sm">
                  {data.leads.map((l) => (
                    <li key={l.at + l.email} className="py-2.5 flex justify-between gap-4">
                      <span className="min-w-0 truncate">{l.name ? <>{l.name} · </> : null}<b className="font-medium">{l.email}</b>{l.company ? <span className="text-muted-foreground"> · {l.company}</span> : null}</span>
                      <span className="shrink-0 text-muted-foreground tabular-nums">{l.country ? `${l.country} · ` : ""}{l.at.slice(0, 10)}</span>
                    </li>
                  ))}
                  {!data.leads.length && <li className="py-3 text-muted-foreground">No emails yet.</li>}
                </ul>
              </div>
              <div>
                <h2 className="m-0 text-lg font-semibold">In the library ({data.items.length})</h2>
                <ul className="mt-3 m-0 p-0 list-none grid gap-3">
                  {data.items.map((c) => (
                    <li key={c.id} className="flex items-center gap-3">
                      <img src={c.poster} alt="" className="h-12 w-[86px] rounded-md object-cover bg-muted" />
                      <span className="min-w-0 flex-1 text-sm"><b className="font-medium">{c.brand} · {c.title}</b><br /><span className="text-muted-foreground">{c.industry} · {c.kind === "concept" ? "Concept" : "Campaign"}</span></span>
                      <button type="button" onClick={() => remove(c)} className="h-8 px-3 rounded-lg border border-border text-xs font-semibold">Remove</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        {!data && error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}
      </div>
    </>
  );
};

export default CreativeLibraryAdmin;
