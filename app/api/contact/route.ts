import { NextRequest, NextResponse } from "next/server";

/**
 * Contact endpoint. Validates the lead and (currently) logs it server-side.
 * Wire up real delivery where indicated — e.g. Resend email, a Slack webhook,
 * or a CRM insert. No secret keys are required for the form to work today.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    // --- Wire real delivery here ---------------------------------------------
    // Example with Resend (set RESEND_API_KEY + a verified sender):
    //
    //   await fetch("https://api.resend.com/emails", {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       from: "Najd AI Solutions <leads@najdaisolutions.com>",
    //       to: ["hello@najdaisolutions.com"],
    //       subject: `New lead: ${name} (${company || "—"})`,
    //       text: `From: ${name} <${email}>\nInterest: ${interest}\n\n${message}`,
    //     }),
    //   });
    // -------------------------------------------------------------------------

    console.log("[contact] new lead", { name, email, company, interest, message });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, errors: ["server"] }, { status: 500 });
  }
}
