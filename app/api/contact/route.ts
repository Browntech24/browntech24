import { NextResponse } from "next/server";
import { z } from "zod";

import { sendContactEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";
import { site } from "@/lib/site";
import { contactFormSchema } from "@/lib/validators";

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(payload);

  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    return NextResponse.json(
      {
        ok: false,
        message: "Please check the highlighted fields.",
        errors: fieldErrors,
      },
      { status: 400 },
    );
  }

  const values = parsed.data;

  // Honeypot: accept without sending so automated submissions learn nothing.
  if (values.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const limit = await checkRateLimit(`contact:${clientIp(request)}`);

  if (!limit.ok) {
    const retryAfterSeconds = Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000));
    const minutes = Math.max(1, Math.ceil(retryAfterSeconds / 60));

    return NextResponse.json(
      {
        ok: false,
        message: `Too many messages from this connection. Try again in about ${minutes} minutes.`,
        fallbackEmail: site.email,
      },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
    );
  }

  const result = await sendContactEmail(values);

  if (!result.ok) {
    const message =
      result.reason === "not-configured"
        ? "Email delivery isn't configured yet, so this message wasn't sent."
        : "The message couldn't be sent just now.";

    return NextResponse.json(
      {
        ok: false,
        code: result.reason,
        message,
        fallbackEmail: site.email,
      },
      { status: result.reason === "not-configured" ? 503 : 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
