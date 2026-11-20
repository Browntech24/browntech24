import type { ContactFormValues } from "@/lib/validators";
import { site } from "@/lib/site";

export type SendResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" }
  | { ok: false; reason: "provider-error"; detail: string };

/**
 * Resend's HTTP API directly, so the app does not depend on a provider SDK.
 * Without RESEND_API_KEY the route reports a configuration problem instead of
 * pretending the message was sent.
 */
export async function sendContactEmail(values: ContactFormValues): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, reason: "not-configured" };

  const to = process.env.CONTACT_TO_EMAIL?.trim() || site.email;
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || "onboarding@resend.dev";

  const subjectLine = values.subject
    ? `Portfolio: ${values.subject}`.replace(/[\r\n]+/g, " ")
    : `Portfolio message from ${values.name}`.replace(/[\r\n]+/g, " ");

  const text = [
    `From: ${values.name} <${values.email}>`,
    values.subject ? `Subject: ${values.subject}` : null,
    "",
    values.message,
    "",
    "—",
    "Sent from the contact form at " + site.url,
  ]
    .filter((line) => line !== null)
    .join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: subjectLine,
        text,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Resend rejected the message", response.status, detail);
      return { ok: false, reason: "provider-error", detail };
    }

    return { ok: true };
  } catch (error) {
    console.error("Resend request failed", error);
    return {
      ok: false,
      reason: "provider-error",
      detail: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
