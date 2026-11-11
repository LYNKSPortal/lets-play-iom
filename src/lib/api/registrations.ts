import type { RegistrationPayload } from "@/types";

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

/**
 * Server-side programme registration submission.
 *
 * In production this should call a secure AWS-hosted API (API Gateway +
 * Lambda, or similar) that persists the registration against DynamoDB/
 * PostgreSQL and sends a confirmation email, keeping medical information
 * access-restricted. That integration is intentionally not implemented
 * here — wire `REGISTRATION_API_URL` and `REGISTRATION_API_KEY` to enable
 * it.
 *
 * Until a real backend is configured, this function runs in demo mode and
 * never claims that a registration has actually been processed.
 */
export async function submitRegistration(
  payload: RegistrationPayload
): Promise<RegistrationResult | RegistrationError> {
  const apiUrl = process.env.REGISTRATION_API_URL;

  if (!apiUrl) {
    // Demo mode, no backend configured. Do not persist or claim a real registration.
    return {
      success: true,
      demo: true,
      reference: `DEMO-${Date.now().toString(36).toUpperCase()}`,
      message:
        "This is a demo submission. No real registration has been made, our secure registration backend is not yet connected.",
    };
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.REGISTRATION_API_KEY
          ? { Authorization: `Bearer ${process.env.REGISTRATION_API_KEY}` }
          : {}),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return {
        success: false,
        error:
          "We couldn't confirm your registration. Please try again or contact us directly.",
      };
    }

    const data = (await response.json()) as { reference: string };
    return {
      success: true,
      demo: false,
      reference: data.reference,
      message: "Your registration has been received.",
    };
  } catch {
    return {
      success: false,
      error:
        "We couldn't reach the registration service. Please try again or contact us directly.",
    };
  }
}
