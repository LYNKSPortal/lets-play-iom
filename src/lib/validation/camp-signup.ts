import { z } from "zod";

export const schoolYears = [
  "Nursery",
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
  "Year 10",
  "Year 11",
] as const;

export const campSignupFormSchema = z.object({
  parentFullName: z.string().trim().min(2, "Please enter the parent/guardian's full name."),
  childFullName: z.string().trim().min(2, "Please enter the child's full name."),
  childDateOfBirth: z
    .string()
    .trim()
    .min(1, "Please provide a date of birth.")
    .refine((v) => !Number.isNaN(Date.parse(v)), "Please enter a valid date."),
  schoolYear: z.enum(schoolYears, { error: "Please select a school year." }),
  medicalNotes: z.string().trim().max(1000).optional().or(z.literal("")),
  emergencyContactName: z.string().trim().min(2, "Please provide an emergency contact name."),
  contactTelephoneNumber: z.string().trim().min(6, "Please provide a valid phone number."),
  emailAddress: z.string().trim().email("Please enter a valid email address."),
  agreed: z.literal(true, {
    error: "You must agree to the Parental Consent and Waiver Agreement to continue.",
  }),
});

export type CampSignupFormValues = z.infer<typeof campSignupFormSchema>;
