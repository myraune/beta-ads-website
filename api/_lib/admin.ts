import { createHmac, timingSafeEqual } from "node:crypto";

/* Who may use /admin. Andreas signs in with Google; only ADMIN_EMAIL gets a
   session, a signed httpOnly cookie. Server-to-server callers (the CRM's
   morning cron) send CREATIVE_ADMIN_PASSWORD in x-admin-password instead;
   no browser ever holds that password. */

export const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "andreas@beta-ads.no").toLowerCase();
const COOKIE = "beta_admin";
const SESSION_DAYS = 14;

const same = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};
const sign = (payload: string) =>
  createHmac("sha256", process.env.CREATIVE_TOKEN_SECRET!).update(`admin-session|${payload}`).digest("base64url");

export function sessionCookie(email: string): string {
  const payload = `${email}|${Date.now() + SESSION_DAYS * 86_400_000}`;
  const value = `${Buffer.from(payload).toString("base64url")}.${sign(payload)}`;
  return `${COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_DAYS * 86_400}`;
}
export const clearCookie = `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;

/** The signed-in admin's email, or null. */
export function sessionEmail(request: Request): string | null {
  if (!process.env.CREATIVE_TOKEN_SECRET) return null;
  const raw = (request.headers.get("cookie") || "").split(/;\s*/).find((c) => c.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1);
  const [data, sig] = (raw || "").split(".");
  if (!data || !sig) return null;
  const payload = Buffer.from(data, "base64url").toString();
  if (!same(sig, sign(payload))) return null;
  const [email, exp] = payload.split("|");
  return email === ADMIN_EMAIL && Number(exp) > Date.now() ? email : null;
}

export function passwordOk(password: string | null | undefined): boolean {
  const real = process.env.CREATIVE_ADMIN_PASSWORD;
  return Boolean(real && password && same(password, real));
}

/** Signed-in admin in a browser, or a server holding the admin password. */
export const isAdminRequest = (request: Request) =>
  sessionEmail(request) !== null || passwordOk(request.headers.get("x-admin-password"));

/** Checks a Google Identity Services ID token and returns its verified email. */
export async function googleEmail(credential: string): Promise<string | null> {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId || !credential) return null;
  const r = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`).catch(() => null);
  if (!r?.ok) return null;
  const t = (await r.json()) as Record<string, string>;
  const ok = t.aud === clientId
    && (t.iss === "accounts.google.com" || t.iss === "https://accounts.google.com")
    && t.email_verified === "true"
    && Number(t.exp) * 1000 > Date.now();
  return ok ? t.email.toLowerCase() : null;
}
