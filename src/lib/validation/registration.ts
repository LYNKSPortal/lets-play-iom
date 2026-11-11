import { z } from "zod";
import { parentSchema } from "@/lib/validation/booking";

export const schoolYears = [
  "Reception",
  "Year 1",
  "Year 2",
  "Year 3",
  "Year 4",
  "Year 5",
  "Year 6",
  "Year 7",
  "Year 8",
  "Year 9",
] as const;

export const genderOptions = ["Male", "Female", "Prefer not to say"] as const;

export const childSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your child's full name."),
  dateOfBirth: z
    .string()
    .trim()
    .min(1, "Please provide a date of birth.")
    .refine((v) => !Number.isNaN(Date.parse(v)), "Please enter a valid date."),
  gender: z.enum(genderOptions, { error: "Please select an option." }),
  schoolYear: z.enum(schoolYears, { error: "Please select a school year." }),
  medicalInfo: z.string().trim().max(1000).optional().or(z.literal("")),
  additionalInfo: z.string().trim().max(1000).optional().or(z.literal("")),
  emergencyContactName: z
    .string()
    .trim()
    .min(2, "Please provide an emergency contact name."),
  emergencyContactPhone: z
    .string()
    .trim()
    .min(6, "Please provide an emergency contact phone number."),
});

export const registrationConsentSchema = z.object({
  termsAccepted: z.literal(true, {
    error: "You must agree to the terms to continue.",
  }),
  paymentAgreementAccepted: z.literal(true, {
    error: "You must agree to the payment terms to continue.",
  }),
});

export const registrationFormSchema = z.object({
  programmeSlug: z.string().min(1),
  /**
   * "public" submissions (from /register) are blocked server-side if the
   * programme is fully booked or invite-only. "direct" submissions (from
   * the unlisted /join links shared directly with a family) bypass that
   * check, since staff are handling that sign-up individually.
   */
  source: z.enum(["public", "direct"]).optional(),
  parent: parentSchema,
  child: childSchema,
  consent: registrationConsentSchema,
});

export type RegistrationFormValues = z.infer<typeof registrationFormSchema>;
