import React, { useCallback, useEffect, useRef, useState } from "react";
import { SEO } from "@/components/SEO";
import { W } from "@/components/working/shared";
import type { Creative } from "@/data/creatives";
import { adminFetch, SIGNED_OUT } from "@/components/admin/shared";
import LeadsPanel, { type Lead } from "@/components/admin/LeadsPanel";
import CreativesPanel from "@/components/admin/CreativesPanel";

/* /admin: the back office of beta-ads.no. Not linked anywhere, noindex.
   Sign in with Google; only ADMIN_EMAIL gets in (checked on the server in
   api/_lib/admin.ts). */

type Data = { items: Creative[]; leads: Lead[]; approved: string[] };
const TABS = [["leads", "Leads"], ["creatives", "Creatives"]] as const;
type Tab = (typeof TABS)[number][0];

declare global {
  interface Window { google?: any }
}

function loadGoogle(): Promise<void> {
  if (window.google?.accounts?.id) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Could not load Google sign-in."));
    document.head.appendChild(s);
  });
}

const SignIn: React.FC<{ clientId: string | null; onIn: (email: string) => void }> = ({ clientId, onIn }) => {
  const button = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!clientId) return;
    loadGoogle().then(() => {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async ({ credential }: { credential: string }) => {
          try {
            const r = await adminFetch<{ email: string }>("/api/admin-session", { method: "POST", body: { credential } });
            onIn(r.email);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Sign-in failed.");
          }
        },
      });
      if (button.current) window.google.accounts.id.renderButton(button.current, { theme: "outline", size: "large", text: "signin_with" });
    }).catch((err) => setError(err.message));
  }, [clientId, onIn]);

  return (
    <div className="mt-8">
      {clientId ? <div ref={button} /> : <p className="m-0 text-sm text-muted-foreground">Google sign-in is not set up yet (GOOGLE_CLIENT_ID is missing on the server).</p>}
      {error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  );
};

const Admin: React.FC = () => {
  const [session, setSession] = useState<{ email: string } | { clientId: string | null } | null>(null);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>(() => {
    const h = window.location.hash.slice(1);
    return TABS.some(([t]) => t === h) ? (h as Tab) : "leads";
  });

  const checkSession = useCallback(async () => {
    const res = await fetch("/api/admin-session").catch(() => null);
    const body = res ? await res.json().catch(() => ({})) : {};
    setSession(res?.ok ? { email: body.email } : { clientId: body.clientId ?? null });
  }, []);

  const load = useCallback(async () => {
    try {
      setData(await adminFetch<Data>("/api/creatives-admin"));
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load.");
    }
  }, []);

  useEffect(() => { checkSession(); }, [checkSession]);
  useEffect(() => { if (session && "email" in session) load(); }, [session, load]);
  useEffect(() => {
    const out = () => { setData(null); checkSession(); };
    window.addEventListener(SIGNED_OUT, out);
    return () => window.removeEventListener(SIGNED_OUT, out);
  }, [checkSession]);

  const signOut = async () => {
    await fetch("/api/admin-session", { method: "DELETE" }).catch(() => null);
    window.google?.accounts?.id?.disableAutoSelect?.();
    setData(null);
    checkSession();
  };

  const pick = (t: Tab) => {
    setTab(t);
    history.replaceState(null, "", `#${t}`);
  };

  const signedIn = session && "email" in session;
  const waiting = data ? new Set(data.leads.filter((l) => (l.source || "creative-library") === "creative-library" && !data.approved.map((e) => e.toLowerCase()).includes(l.email.toLowerCase())).map((l) => l.email.toLowerCase())).size : 0;

  return (
    <>
      <SEO title="Admin | Beta Ads" description="Admin" noindex />
      <div className={`${W} pt-28 md:pt-32 pb-24 min-h-screen`}>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h1 className="text-3xl font-bold tracking-tight m-0">Admin</h1>
          {signedIn && (
            <span className="flex items-center gap-3 text-sm text-muted-foreground">
              {session.email}
              <button type="button" onClick={signOut} className="h-8 px-3 rounded-lg border border-border text-xs font-semibold text-foreground">Sign out</button>
            </span>
          )}
        </div>

        {!session ? null : !signedIn ? (
          <SignIn clientId={(session as { clientId: string | null }).clientId} onIn={(email) => setSession({ email })} />
        ) : (
          <>
            <nav className="mt-8 flex gap-1 border-b border-border" aria-label="Admin sections">
              {TABS.map(([t, l]) => (
                <button key={t} type="button" onClick={() => pick(t)} aria-current={tab === t ? "page" : undefined}
                  className={`h-11 px-4 -mb-px text-sm font-semibold border-b-2 ${tab === t ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
                  {l}
                  {t === "leads" && waiting > 0 && <span className="ml-2 h-5 px-2 inline-flex items-center rounded-full bg-primary text-primary-foreground text-[11px]">{waiting}</span>}
                </button>
              ))}
            </nav>
            <div className="mt-8">
              {error && <p role="alert" className="mt-0 text-sm text-red-600">{error}</p>}
              {!data ? (!error && <p className="m-0 text-sm text-muted-foreground">Loading…</p>) : tab === "leads" ? (
                <LeadsPanel leads={data.leads} approved={data.approved} setApproved={(approved) => setData({ ...data, approved })} />
              ) : (
                <CreativesPanel items={data.items} reload={load} />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Admin;
