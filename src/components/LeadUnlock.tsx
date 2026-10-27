import React, { useState } from "react";

/* Sign-up that unlocks the gated tools (creative library videos, sponsorship checker searches).
   POST /api/creatives stores name, work email and company in the private Blob store, tagged
   with source, and returns a signed token. The token is kept in localStorage and sent back as
   x-creative-token, so one sign-up unlocks every gated tool. */

const TOKEN_KEY = "creative-token";

export const readToken = () => { try { return localStorage.getItem(TOKEN_KEY) || ""; } catch { return ""; } };
export const writeToken = (t: string) => { try { localStorage.setItem(TOKEN_KEY, t); } catch { /* private mode: unlock lasts this visit */ } };
export const clearToken = () => { try { localStorage.removeItem(TOKEN_KEY); } catch { /* nothing stored */ } };

type Props = {
  onUnlocked: (token: string) => void;
  /** Prefix for the input ids, unique per form on the page. */
  id: string;
  /** Where the lead came from, saved with it. */
  source: string;
  cta: string;
  /** stack: one field per row (dialogs); grid: three fields side by side. */
  layout?: "grid" | "stack";
};

export const UnlockForm: React.FC<Props> = ({ onUnlocked, id, source, cta, layout = "grid" }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<{ busy: boolean; error: string }>({ busy: false, error: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState({ busy: true, error: "" });
    const r = await fetch("/api/creatives", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, email, company, website, source, referrer: document.referrer }),
    }).then((res) => res.json()).catch(() => ({ error: "Something went wrong. Try again." }));
    if (r.error || !r.token) return setState({ busy: false, error: r.error || "Something went wrong. Try again." });
    writeToken(r.token);
    onUnlocked(r.token);
  };

  const field = "h-11 rounded-full border border-border bg-background px-5 text-sm outline-none focus:border-foreground/40";
  const span = layout === "grid" ? "sm:col-span-3" : "";
  return (
    <form onSubmit={submit} className={`grid gap-3 ${layout === "grid" ? "sm:grid-cols-3" : ""}`}>
      <label className="sr-only" htmlFor={`${id}-name`}>Name</label>
      <input id={`${id}-name`} type="text" required autoComplete="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className={field} />
      <label className="sr-only" htmlFor={`${id}-email`}>Work email</label>
      <input id={`${id}-email`} type="email" required autoComplete="email" placeholder="Work email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
      <label className="sr-only" htmlFor={`${id}-company`}>Company</label>
      <input id={`${id}-company`} type="text" required autoComplete="organization" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} className={field} />
      {/* Honeypot, hidden from people and screen readers. */}
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={(e) => setWebsite(e.target.value)} className="hidden" />
      <button type="submit" disabled={state.busy}
        className={`h-11 px-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 ${span}`}>
        {state.busy ? "Unlocking…" : cta}
      </button>
      {state.error && <p role="alert" className={`m-0 text-sm text-red-600 ${span}`}>{state.error}</p>}
    </form>
  );
};
