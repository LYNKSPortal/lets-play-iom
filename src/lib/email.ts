import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Let's Play <onboarding@resend.dev>";
const TO_EMAIL = process.env.RESEND_TO_EMAIL || "info@letsplay.co.im";

/** Whether Resend is configured and emails can actually be sent. */
export const emailConfigured = !!resend;

/** Minimal HTML-escaping for values interpolated into email bodies. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export interface SendEmailResult {
  success: boolean;
  error?: string;
}

/**
 * Sends a notification email to the Let's Play inbox via Resend.
 * Returns { success: false } with a message when Resend isn't configured
 * or the send fails, never throwing, so callers can degrade gracefully.
 */
export async function sendNotificationEmail({
  subject,
  html,
  replyTo,
}: {
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<SendEmailResult> {
  if (!resend) {
    return {
      success: false,
      error: "Email delivery is not configured (RESEND_API_KEY missing).",
    };
  }

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });

    if (result.error) {
      return { success: false, error: result.error.message };
    }
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown email error.",
    };
  }
}
