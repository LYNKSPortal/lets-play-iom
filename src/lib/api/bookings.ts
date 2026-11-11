import type { BookingPayload } from "@/types";
import { sendNotificationEmail, emailConfigured, escapeHtml } from "@/lib/email";

export interface BookingResult {
  success: true;
  demo: boolean;
  reference: string;
  message: string;
}

export interface BookingError {
  success: false;
  error: string;
}

function generateReference(): string {
  return `LP-${Date.now().toString(36).toUpperCase()}`;
}

/**
 * Server-side booking submission.
 *
 * Sends a notification email (via Resend) to the Let's Play inbox with the
 * full booking request. There is no automated capacity-checking backend
 * (AWS API Gateway + Lambda + DynamoDB/PostgreSQL) yet, so this does not
 * claim the place is guaranteed — staff confirm manually by email/phone.
 *
 * Until `RESEND_API_KEY` is configured, this runs in a clearly labelled
 * demo mode and never claims a real request was sent.
 */
export async function submitBooking(
  payload: BookingPayload
): Promise<BookingResult | BookingError> {
  if (!emailConfigured) {
    return {
      success: true,
      demo: true,
      reference: `DEMO-${Date.now().toString(36).toUpperCase()}`,
      message:
        "This is a demo submission. No real booking has been made, our secure booking backend is not yet connected.",
    };
  }

  const reference = generateReference();
  const { parent, player, campSlug } = payload;

  const html = `
    <h2>New camp booking request</h2>
    <p><strong>Reference:</strong> ${reference}</p>
    <p><strong>Camp:</strong> ${escapeHtml(campSlug)}</p>
    <h3>Parent / Guardian</h3>
    <p><strong>Name:</strong> ${escapeHtml(parent.fullName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(parent.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(parent.phone)}</p>
    <h3>Player</h3>
    <p><strong>Name:</strong> ${escapeHtml(player.fullName)}</p>
    <p><strong>Date of birth:</strong> ${escapeHtml(player.dateOfBirth)}</p>
    <p><strong>Emergency contact:</strong> ${escapeHtml(player.emergencyContactName)} (${escapeHtml(player.emergencyContactPhone)})</p>
    ${player.medicalInfo ? `<p><strong>Medical/accessibility info:</strong> ${escapeHtml(player.medicalInfo).replace(/\n/g, "<br />")}</p>` : ""}
    <p><strong>Photo consent:</strong> ${payload.consent.photoConsent ? "Yes" : "No"}</p>
  `;

  const result = await sendNotificationEmail({
    subject: `New camp booking request: ${campSlug} (${reference})`,
    html,
    replyTo: parent.email,
  });

  if (!result.success) {
    console.error("Failed to send booking email", result.error);
    return {
      success: false,
      error:
        "We couldn't confirm your booking. Please try again or contact us directly.",
    };
  }

  return {
    success: true,
    demo: false,
    reference,
    message:
      "Your booking request has been sent to our team. We'll be in touch to confirm your place.",
  };
}
