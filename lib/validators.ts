import { z } from "zod";

/**
 * Shared by the form (client) and the route handler (server), so both sides
 * agree on limits and wording. `company` is the honeypot: real users never see
 * it, so any value means the submission is automated.
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "That name is longer than 80 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .pipe(z.email("That email address doesn't look right.")),
  subject: z
    .string()
    .trim()
    .max(120, "Keep the subject under 120 characters.")
    .optional()
    .default(""),
  message: z
    .string()
    .trim()
    .min(20, "A little more detail, please — at least 20 characters.")
    .max(5000, "That message is longer than 5000 characters."),
  company: z.string().optional().default(""),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ContactField = "name" | "email" | "subject" | "message";
