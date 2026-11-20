import * as z from "zod/mini";

/**
 * Shared by the form (client) and the route handler (server), so both sides
 * agree on limits and wording. `company` is the honeypot: real users never see
 * it, so any value means the submission is automated.
 *
 * Zod Mini is used on purpose: the classic API is ~90 KB gzipped, and this
 * schema ships to the browser with the contact form. Mini keeps the same
 * `safeParse` / `flattenError` surface at a fraction of the size.
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .check(
      z.trim(),
      z.minLength(2, "Please enter your name."),
      z.maxLength(80, "That name is longer than 80 characters."),
    ),
  email: z
    .string()
    .check(
      z.trim(),
      z.minLength(1, "Please enter your email."),
      z.email("That email address doesn't look right."),
    ),
  subject: z.optional(
    z.string().check(z.trim(), z.maxLength(120, "Keep the subject under 120 characters.")),
  ),
  message: z
    .string()
    .check(
      z.trim(),
      z.minLength(20, "A little more detail, please — at least 20 characters."),
      z.maxLength(5000, "That message is longer than 5000 characters."),
    ),
  company: z.optional(z.string().check(z.trim())),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ContactField = "name" | "email" | "subject" | "message";
