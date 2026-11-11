import type { RegistrationPayload } from "@/types";
import { sendNotificationEmail, emailConfigured, escapeHtml } from "@/lib/email";

export interface RegistrationResult {
  success: true;
  demo: boolean;
  reference: string;
  message: string;
}

export interface RegistrationError {
  success: false;
  error: string;
}

function generateReference(): string {
  return `LP-${Date.now().toString(36).toUpperCase()}`;
}

/**
 * Server-side programme registration submission.
 *
 * Sends a notification email (via Resend) to the Let's Play inbox with the
 * full registration request, including the liability/payment agreement
 * acceptances. There is no automated backend persisting registrations yet,
 * so staff follow up manually to confirm the place and set up the standing
 * order.
 *
 * Until `RESEND_API_KEY` is configured, this runs in a clearly labelled
 * demo mode and never claims a real registration was made.
 */
export async function submitRegistration(
  payload: RegistrationPayload
): Promise<RegistrationResult | RegistrationError> {
  if (!emailConfigured) {
    return {
      success: true,
      demo: true,
      reference: `DEMO-${Date.now().toString(36).toUpperCase()}`,
      message:
        "This is a demo submission. No real registration has been made, our secure registration backend is not yet connected.",
    };
  }

  const reference = generateReference();
  const { parent, child, programmeSlug, source } = payload;

  const html = `
    <h2>New programme registration</h2>
    <p><strong>Reference:</strong> ${reference}</p>
    <p><strong>Programme:</strong> ${escapeHtml(programmeSlug)}</p>
    <p><strong>Source:</strong> ${escapeHtml(source ?? "public")}</p>
    <h3>Parent / Guardian</h3>
    <p><strong>Name:</strong> ${escapeHtml(parent.fullName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(parent.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(parent.phone)}</p>
    <h3>Child</h3>
    <p><strong>Name:</strong> ${escapeHtml(child.fullName)}</p>
    <p><strong>Date of birth:</strong> ${escapeHtml(child.dateOfBirth)}</p>
    <p><strong>Gender:</strong> ${escapeHtml(child.gender)}</p>
    <p><strong>School year:</strong> ${escapeHtml(child.schoolYear)}</p>
    <p><strong>Emergency contact:</strong> ${escapeHtml(child.emergencyContactName)} (${escapeHtml(child.emergencyContactPhone)})</p>
    ${child.medicalInfo ? `<p><strong>Medical conditions/information:</strong> ${escapeHtml(child.medicalInfo).replace(/\n/g, "<br />")}</p>` : ""}
    ${child.additionalInfo ? `<p><strong>Additional information:</strong> ${escapeHtml(child.additionalInfo).replace(/\n/g, "<br />")}</p>` : ""}
    <h3>Agreements</h3>
    <p><strong>Liability, photography &amp; WhatsApp terms accepted:</strong> ${payload.consent.termsAccepted ? "Yes" : "No"}</p>
    <p><strong>Standing order payment agreement accepted:</strong> ${payload.consent.paymentAgreementAccepted ? "Yes" : "No"}</p>
  `;

  const result = await sendNotificationEmail({
    subject: `New registration: ${programmeSlug} (${reference})`,
    html,
    replyTo: parent.email,
  });

  if (!result.success) {
    console.error("Failed to send registration email", result.error);
    return {
      success: false,
      error:
        "We couldn't confirm your registration. Please try again or contact us directly.",
    };
  }

  return {
    success: true,
    demo: false,
    reference,
    message:
      "Your registration has been sent to our team. We'll be in touch to confirm and set up your standing order.",
  };
}
