import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";

/**
 * Contact endpoint. Validates the lead, then delivers it via Resend when
 * RESEND_API_KEY is configured; otherwise it falls back to a server-side
 * console.log so the form works in dev with zero secrets.
 *
 * Recipient / sender are resolved from env (CONTACT_INBOX / CONTACT_FROM)
 * with sensible defaults from siteConfig — no addresses are hardcoded.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Lead = {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
};

async function deliverViaResend(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY!;
  const to = process.env.CONTACT_INBOX || siteConfig.email;
  const from =
    process.env.CONTACT_FROM || `${siteConfig.name} Website <onboarding@resend.dev>`;

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

    // Deliver via Resend when configured; otherwise log so dev works secret-free.
    if (process.env.RESEND_API_KEY) {
      try {
        await deliverViaResend(lead);
      } catch (err) {
        // Delivery failed: never lose the lead — log it with full context.
        // Do not leak the error to the client.
        console.error("[contact] delivery failed; lead preserved", err, lead);
      }
    } else {
      console.log("[contact] new lead (no RESEND_API_KEY; not delivered)", lead);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] unexpected error handling request", err);
    return NextResponse.json({ ok: false, errors: ["server"] }, { status: 500 });
  }
}
