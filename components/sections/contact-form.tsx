"use client";

import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { ContactField } from "@/lib/validators";

type Status = "idle" | "submitting" | "success" | "error";

type FieldErrors = Partial<Record<ContactField, string[]>>;

const fieldIds: Record<ContactField, string> = {
  name: "contact-name",
  email: "contact-email",
  subject: "contact-subject",
  message: "contact-message",
};

const inputClass =
  "mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-accent focus:outline-none aria-[invalid=true]:border-red-500";

function errorId(field: ContactField) {
  return `${fieldIds[field]}-error`;
}

function FieldError({ field, errors }: { field: ContactField; errors: FieldErrors }) {
  const messages = errors[field];

  if (!messages || messages.length === 0) return null;

  return (
    <p id={errorId(field)} className="mt-1.5 text-sm text-red-600 dark:text-red-400">
      {messages[0]}
    </p>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "error") summaryRef.current?.focus();
  }, [status, errors]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const values = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
      company: String(data.get("company") ?? ""),
    };

    // The schema is loaded on demand: validation only matters once someone
    // actually submits, and it keeps the page's JavaScript budget small.
    const { contactFormSchema } = await import("@/lib/validators");
    const parsed = contactFormSchema.safeParse(values);

    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (typeof field !== "string") continue;
        if (!(field in fieldIds)) continue;
        const key = field as ContactField;
        fieldErrors[key] = [...(fieldErrors[key] ?? []), issue.message];
      }

      setErrors(fieldErrors);
      setStatus("error");
      setFormMessage("Please check the highlighted fields.");
      return;
    }

    setStatus("submitting");
    setErrors({});
    setFormMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const body = (await response.json().catch(() => null)) as {
        ok?: boolean;
        message?: string;
        errors?: Record<string, string[]>;
      } | null;

      if (!response.ok || !body?.ok) {
        const serverErrors: FieldErrors = {};
        for (const field of Object.keys(fieldIds) as ContactField[]) {
          const messages = body?.errors?.[field];
          if (messages?.length) serverErrors[field] = messages;
        }

        setErrors(serverErrors);
        setFormMessage(body?.message ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setFormMessage(
        `Network error — the message didn't send. Please try again, or email me at ${site.email}.`,
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-card border border-accent/40 bg-accent-subtle/60 p-6 sm:p-8"
      >
        <CheckCircle2 aria-hidden="true" className="size-8 text-accent" />
        <h2 className="mt-4 text-xl font-semibold tracking-tight">Message sent</h2>
        <p className="mt-2 text-pretty text-muted-foreground">
          Thanks for writing. I usually reply within two working days — if it&apos;s urgent, email
          me at{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            {site.email}
          </a>
          .
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Send a message</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Tell me what you&apos;re building, what&apos;s not working, or what you&apos;d like to
          make.
        </p>
      </div>

      <div
        ref={summaryRef}
        tabIndex={-1}
        role={status === "error" ? "alert" : undefined}
        aria-live="polite"
        className={cn(
          "rounded-lg border px-4 py-3 text-sm",
          status === "error"
            ? "border-red-500/40 bg-red-500/5 text-red-700 dark:text-red-300"
            : "hidden",
        )}
      >
        {formMessage ? (
          <span className="flex items-start gap-2">
            <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <span>
              {formMessage}
              {status === "error" ? (
                <>
                  {" "}
                  Or email{" "}
                  <a className="underline underline-offset-2" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                  .
                </>
              ) : null}
            </span>
          </span>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldIds.name} className="text-sm font-medium">
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id={fieldIds.name}
            name="name"
            type="text"
            required
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? errorId("name") : undefined}
            className={inputClass}
          />
          <FieldError field="name" errors={errors} />
        </div>

        <div>
          <label htmlFor={fieldIds.email} className="text-sm font-medium">
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id={fieldIds.email}
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? errorId("email") : undefined}
            className={inputClass}
          />
          <FieldError field="email" errors={errors} />
        </div>
      </div>

      <div>
        <label htmlFor={fieldIds.subject} className="text-sm font-medium">
          Subject <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <input
          id={fieldIds.subject}
          name="subject"
          type="text"
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? errorId("subject") : undefined}
          className={inputClass}
        />
        <FieldError field="subject" errors={errors} />
      </div>

      <div>
        <label htmlFor={fieldIds.message} className="text-sm font-medium">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id={fieldIds.message}
          name="message"
          required
          rows={7}
          maxLength={5000}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? errorId("message") : undefined}
          className={cn(inputClass, "resize-y")}
        />
        <FieldError field="message" errors={errors} />
      </div>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <p className="text-xs text-muted-foreground">
        Your details are only used to reply to this message. No newsletter, no data sold.
      </p>

      <Button type="submit" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send aria-hidden="true" className="size-4" />
            Send message
          </>
        )}
      </Button>
    </form>
  );
}
