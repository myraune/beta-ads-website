import { json } from "./_lib/creatives.js";
import { ADMIN_EMAIL, clearCookie, googleEmail, sessionCookie, sessionEmail } from "./_lib/admin.js";

/* Sign-in for /admin with Google, only for ADMIN_EMAIL.
   GET               -> {email} when signed in, else 401 with the Google client id
                        the page needs to draw the sign-in button.
   POST {credential} -> checks the Google ID token, sets the session cookie.
   DELETE            -> signs out. */

export async function GET(request: Request) {
  const email = sessionEmail(request);
  if (email) return json({ email });
  return json({ error: "Not signed in.", clientId: process.env.GOOGLE_CLIENT_ID || null }, 401);
}

export async function POST(request: Request) {
  const b = await request.json().catch(() => ({}));
  const email = await googleEmail(typeof b.credential === "string" ? b.credential : "");
  if (!email) return json({ error: "Google sign-in failed." }, 401);
  if (email !== ADMIN_EMAIL) return json({ error: `${email} has no access.` }, 403);
  return new Response(JSON.stringify({ email }), {
    headers: { "content-type": "application/json", "cache-control": "no-store", "set-cookie": sessionCookie(email) },
  });
}

export async function DELETE() {
  return new Response(JSON.stringify({ ok: true }), {
    headers: { "content-type": "application/json", "cache-control": "no-store", "set-cookie": clearCookie },
  });
}
