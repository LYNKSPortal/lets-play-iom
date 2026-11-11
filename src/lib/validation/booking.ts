import { z } from "zod";

export const parentSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().min(6, "Please enter a valid phone number."),
});

export const playerSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter the player's full name."),
  dateOfBirth: z
    .string()
    .trim()
    .min(1, "Please provide a date of birth.")
    .refine((v) => !Number.isNaN(Date.parse(v)), "Please enter a valid date."),
  medicalInfo: z.string().trim().max(1000).optional().or(z.literal("")),
  emergencyContactName: z
    .string()
    .trim()
    .min(2, "Please provide an emergency contact name."),
  emergencyContactPhone: z
    .string()
    .trim()
    .min(6, "Please provide an emergency contact phone number."),
});

export const consentSchema = z.object({
  privacyAccepted: z.literal(true, {
    error: "You must accept the privacy notice to continue.",
  }),
  photoConsent: z.boolean(),
});

export const bookingFormSchema = z.object({
  campSlug: z.string().min(1),
  parent: parentSchema,
  player: playerSchema,
  consent: consentSchema,
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;
