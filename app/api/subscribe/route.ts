import { NextResponse } from "next/server";

/**
 * Email / SMS capture. With KLAVIYO_PRIVATE_KEY + KLAVIYO_LIST_ID set, subscribes
 * the profile to the list. Without them: 202 in local dev, 503 in production.
 */
export async function POST(req: Request) {
  let body: { email?: unknown; source?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const source = body.source === "friday" || body.source === "waitlist" ? body.source : "newsletter";
  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 254) {
    return NextResponse.json({ error: "invalid_email" }, { status: 422 });
  }

  const key = process.env.KLAVIYO_PRIVATE_KEY;
  const list = process.env.KLAVIYO_LIST_ID;
  if (!key || !list) {
    // Never pretend to save an email in production: without Klaviyo there is nowhere to put it.
    if (process.env.NODE_ENV === "production") return NextResponse.json({ error: "not_configured" }, { status: 503 });
    return NextResponse.json({ ok: true, mode: "dev" }, { status: 202 });
  }

  const res = await fetch("https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/", {
    method: "POST",
    headers: { Authorization: `Klaviyo-API-Key ${key}`, revision: "2024-10-15", "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        type: "profile-subscription-bulk-create-job",
        attributes: {
          custom_source: `haq-${source}`,
          profiles: { data: [{ type: "profile", attributes: { email, subscriptions: { email: { marketing: { consent: "SUBSCRIBED" } } } } }] }
        },
        relationships: { list: { data: { type: "list", id: list } } }
      }
    })
  });
  if (!res.ok) return NextResponse.json({ error: "upstream" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
