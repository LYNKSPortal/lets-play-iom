import type { CampSignupFormValues } from "@/lib/validation/camp-signup";
import { sendNotificationEmail, emailConfigured, escapeHtml } from "@/lib/email";

export interface CampSignupResult {
  success: true;
  demo: boolean;
  reference: string;
  message: string;
}

export interface CampSignupError {
  success: false;
  error: string;
}

function generateReference(): string {
  return `LPC-${Date.now().toString(36).toUpperCase()}`;
}

/**
 * Let's Play Football Camp Form submission.
 *
 * Sends a notification email (via Resend) to the Let's Play inbox with the
 * full camp registration request, including the Parental Consent and
 * Waiver Agreement acceptance. There is no automated backend persisting
 * submissions, so staff follow up manually.
 *
 * Until `RESEND_API_KEY` is configured, this runs in a clearly labelled
 * demo mode and never claims a real submission was sent.
 */
export async function submitCampSignup(
  payload: CampSignupFormValues
): Promise<CampSignupResult | CampSignupError> {
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

  const html = `
    <h2>New Let's Play Football Camp Form submission</h2>
    <p><strong>Reference:</strong> ${reference}</p>
    <h3>Parent / Guardian</h3>
    <p><strong>Full name:</strong> ${escapeHtml(payload.parentFullName)}</p>
    <p><strong>Email address:</strong> ${escapeHtml(payload.emailAddress)}</p>
    <p><strong>Contact telephone number:</strong> ${escapeHtml(payload.contactTelephoneNumber)}</p>
    <h3>Child</h3>
    <p><strong>Full name:</strong> ${escapeHtml(payload.childFullName)}</p>
    <p><strong>Date of birth:</strong> ${escapeHtml(payload.childDateOfBirth)}</p>
    <p><strong>School year:</strong> ${escapeHtml(payload.schoolYear)}</p>
    ${payload.medicalNotes ? `<p><strong>Medical notes / allergies:</strong> ${escapeHtml(payload.medicalNotes).replace(/\n/g, "<br />")}</p>` : ""}
    <h3>Emergency Contact</h3>
    <p><strong>Name:</strong> ${escapeHtml(payload.emergencyContactName)}</p>
    <h3>Agreement</h3>
    <p><strong>Parental Consent and Waiver Agreement accepted:</strong> ${payload.agreed ? "Yes" : "No"}</p>
  `;

  const result = await sendNotificationEmail({
    subject: `New Football Camp Form submission (${reference})`,
    html,
    replyTo: payload.emailAddress,
  });

  if (!result.success) {
    console.error("Failed to send camp signup email", result.error);
    return {
      success: false,
      error: "We couldn't submit your registration. Please try again or contact us directly.",
    };
  }

  return {
    success: true,
    demo: false,
    reference,
    message: "Your registration has been sent to our team.",
  };
}
