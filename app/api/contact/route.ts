import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";

/**
 * Contact endpoint. Validates the lead, then (best-effort, independently):
 *   - stores it in Supabase when SUPABASE_URL + SUPABASE_ANON_KEY are set, and
 *   - emails it via Resend when RESEND_API_KEY is set.
 * With neither configured the lead is logged, so the form works in dev with
 * zero secrets. Failures are logged with full context (a lead is never lost)
 * and are never leaked to the client. Recipient/sender resolve from env with
 * sensible defaults from siteConfig — nothing is hardcoded.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Lead = {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
};

/** Insert the lead into the Supabase `contact_leads` table via PostgREST. */
async function storeInSupabase(lead: Lead): Promise<boolean> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return false;
  try {
    const res = await fetch(`${url}/rest/v1/contact_leads`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name: lead.name,
        email: lead.email,
        company: lead.company || null,
        interest: lead.interest || null,
        message: lead.message,
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(`Supabase responded ${res.status}: ${detail}`);
    }
    return true;
  } catch (err) {
    console.error("[contact] Supabase insert failed; lead preserved", err, lead);
    return false;
  }
}

/** Email the lead via the Resend HTTP API. */
async function emailViaResend(lead: Lead): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  const to = process.env.CONTACT_INBOX || siteConfig.email;
  const from =
    process.env.CONTACT_FROM || `${siteConfig.name} Website <onboarding@resend.dev>`;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: lead.email,
        subject: `New lead: ${lead.name} (${lead.company || "—"})`,
        text:
          `From: ${lead.name} <${lead.email}>\n` +
          `Company: ${lead.company || "—"}\n` +
          `Interest: ${lead.interest || "—"}\n\n` +
          `${lead.message}`,
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(`Resend responded ${res.status}: ${detail}`);
    }
    return true;
  } catch (err) {
    console.error("[contact] Resend delivery failed; lead preserved", err, lead);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, errors: ["body"] }, { status: 400 });
    }

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const company = String(body.company ?? "").trim();
    const interest = String(body.interest ?? "").trim();
    const message = String(body.message ?? "").trim();

    const errors: string[] = [];
    if (name.length < 2) errors.push("name");
    if (!EMAIL_RE.test(email)) errors.push("email");
    if (message.length < 5) errors.push("message");
    if (errors.length) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    const lead: Lead = { name, email, company, interest, message };

    // Best-effort, independently gated. Store first, then notify.
    const stored = await storeInSupabase(lead);
    const emailed = await emailViaResend(lead);
    if (!stored && !emailed) {
      console.log("[contact] new lead (no delivery configured)", lead);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] unexpected error handling request", err);
    return NextResponse.json({ ok: false, errors: ["server"] }, { status: 500 });
  }
}
