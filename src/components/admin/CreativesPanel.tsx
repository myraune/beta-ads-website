import React, { useState } from "react";
import { upload } from "@vercel/blob/client";
import { INDUSTRIES, KIND_LABEL, type Creative, type CreativeKind } from "@/data/creatives";
import { adminFetch, field, label } from "./shared";

/* Creatives tab of /admin. Upload a video, the poster is grabbed from the video
   in the browser, both go straight to the public Blob store (the upload token
   is only handed to the signed-in admin), then the item is added to the manifest. */

const slug = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").slice(0, 50) || "creative";

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

const CreativesPanel: React.FC<{ items: Creative[]; reload: () => void }> = ({ items, reload }) => {
  const [error, setError] = useState("");
  const [form, setForm] = useState({ brand: "", title: "", industry: "", kind: "client" as CreativeKind, format: "", description: "" });
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<string>("");

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
        access: "public", handleUploadUrl: "/api/creatives-upload", multipart: file.size > 50 * 1024 * 1024,
        onUploadProgress: (p) => setProgress(`Uploading video… ${Math.round(p.percentage)}%`),
      });
      setProgress("Uploading poster…");
      const img = await upload(`${base}.webp`, poster, { access: "public", handleUploadUrl: "/api/creatives-upload" });
      setProgress("Saving…");
      const r = await adminFetch<{ item: Creative }>("/api/creatives-admin", { method: "POST", body: { ...form, video: video.url, poster: img.url } });
      setProgress(`Added "${r.item.title}".`);
      setForm({ ...form, title: "", format: "", description: "" });
      setFile(null);
      reload();
    } catch (err) {
      setProgress("");
      setError(err instanceof Error ? err.message : "Upload failed.");
    }
  };

  const remove = async (c: Creative) => {
    if (!window.confirm(`Remove "${c.brand} · ${c.title}" from the library? The files are deleted too.`)) return;
    try {
      await adminFetch(`/api/creatives-admin?id=${encodeURIComponent(c.id)}`, { method: "DELETE" });
      reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not remove it.");
    }
  };

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10">
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
            <div className="flex flex-wrap gap-x-4 gap-y-1 min-h-10 items-center text-sm">
              {([["client", "Campaign that ran"], ["concept", "Concept"], ["network", "Partner network"]] as [CreativeKind, string][]).map(([v, l]) => (
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

      <div className="self-start">
        <h2 className="m-0 text-lg font-semibold">In the library ({items.length})</h2>
        <ul className="mt-3 m-0 p-0 list-none grid gap-3">
          {items.map((c) => (
            <li key={c.id} className="flex items-center gap-3">
              <img src={c.poster} alt="" className="h-12 w-[86px] rounded-md object-cover bg-muted" />
              <span className="min-w-0 flex-1 text-sm"><b className="font-medium">{c.brand} · {c.title}</b><br /><span className="text-muted-foreground">{c.industry} · {KIND_LABEL[c.kind]}</span></span>
              <button type="button" onClick={() => remove(c)} className="h-8 px-3 rounded-lg border border-border text-xs font-semibold">Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreativesPanel;
