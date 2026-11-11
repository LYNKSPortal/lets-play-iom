import type { ContactFormValues } from "@/lib/validation/contact";
import { sendNotificationEmail, emailConfigured, escapeHtml } from "@/lib/email";

export interface ContactResult {
  success: true;
}

export interface ContactError {
  success: false;
  error: string;
}

/**
 * Server-side contact form submission, delivered by email via Resend.
 *
 * Until `RESEND_API_KEY` is configured, submissions are rejected with a
 * clear message rather than silently pretending to have been sent.
 */
export async function submitContactForm(
  values: ContactFormValues
): Promise<ContactResult | ContactError> {
  if (!emailConfigured) {
    return {
      success: false,
      error:
        "Our contact form isn't connected to an email service yet. Please email info@letsplay.co.im or call 07624 222766 directly.",
    };
  }

  const html = `
    <h2>New enquiry from letsplay.co.im</h2>
    <p><strong>Enquiry type:</strong> ${escapeHtml(values.enquiryType)}</p>
    <p><strong>Name:</strong> ${escapeHtml(values.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(values.email)}</p>
    ${values.phone ? `<p><strong>Phone:</strong> ${escapeHtml(values.phone)}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(values.message).replace(/\n/g, "<br />")}</p>
  `;

  const result = await sendNotificationEmail({
    subject: `New enquiry: ${values.enquiryType}`,
    html,
    replyTo: values.email,
  });

  if (!result.success) {
    console.error("Failed to send contact form email", result.error);
    return {
      success: false,
      error:
        "We couldn't send your message right now. Please email info@letsplay.co.im or call 07624 222766 directly.",
    };
  }

  return { success: true };
}
