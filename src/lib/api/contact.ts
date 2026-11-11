import type { ContactFormValues } from "@/lib/validation/contact";

export interface ContactResult {
  success: true;
}

export interface ContactError {
  success: false;
  error: string;
}

/**
 * Server-side contact form submission.
 *
 * In production this should call a configured email provider (e.g. AWS SES,
 * Postmark, Resend) via a securely stored API key. No credentials should
 * ever be exposed to the browser. Set `CONTACT_FORM_PROVIDER` (and the
 * corresponding provider API key) to enable live delivery.
 *
 * Until a provider is configured, submissions are rejected with a clear
 * message rather than silently pretending to have been sent.
 */
export async function submitContactForm(
  values: ContactFormValues
): Promise<ContactResult | ContactError> {
  const provider = process.env.CONTACT_FORM_PROVIDER;

  if (!provider) {
    return {
      success: false,
      error:
        "Our contact form isn't connected to an email service yet. Please email info@letsplay.co.im or call 07624 222766 directly.",
    };
  }

  // Placeholder for a real provider integration (e.g. AWS SES send-email).
  // Intentionally not implemented until a provider and credentials are chosen.
  console.info("Contact enquiry received", {
    enquiryType: values.enquiryType,
    email: values.email,
  });

  return { success: true };
}
