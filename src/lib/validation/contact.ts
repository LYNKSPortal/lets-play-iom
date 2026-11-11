import { z } from "zod";

export const enquiryTypes = [
  "Football Programmes",
  "Football Camps",
  "Booking Enquiry",
  "General Enquiry",
] as const;

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || v.length >= 6, "Please enter a valid phone number."),
  enquiryType: z.enum(enquiryTypes, {
    message: "Please select an enquiry type.",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Please add a little more detail (at least 10 characters)."),
  // Honeypot field — must stay empty. Bots that fill every field will trip this.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
