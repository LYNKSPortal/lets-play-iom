import type { BookingPayload } from "@/types";

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

/**
 * Server-side booking submission.
 *
 * In production this should call a secure AWS-hosted API (API Gateway +
 * Lambda, or similar) that performs a transactional capacity check against
 * DynamoDB/PostgreSQL before persisting the booking and sending a
 * confirmation email. That integration is intentionally not implemented
 * here — wire `BOOKING_API_URL` and `BOOKING_API_KEY` to enable it.
 *
 * Until a real backend is configured, this function runs in demo mode and
 * never claims that a reservation has actually been made.
 */
export async function submitBooking(
  payload: BookingPayload
): Promise<BookingResult | BookingError> {
  const apiUrl = process.env.BOOKING_API_URL;

  if (!apiUrl) {
    // Demo mode — no backend configured. Do not persist or claim a real booking.
    return {
      success: true,
      demo: true,
      reference: `DEMO-${Date.now().toString(36).toUpperCase()}`,
      message:
        "This is a demo submission. No real booking has been made, our secure booking backend is not yet connected.",
    };
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.BOOKING_API_KEY
          ? { Authorization: `Bearer ${process.env.BOOKING_API_KEY}` }
          : {}),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return {
        success: false,
        error:
          "We couldn't confirm your booking. Please try again or contact us directly.",
      };
    }

    const data = (await response.json()) as { reference: string };
    return {
      success: true,
      demo: false,
      reference: data.reference,
      message: "Your booking has been confirmed.",
    };
  } catch {
    return {
      success: false,
      error:
        "We couldn't reach the booking service. Please try again or contact us directly.",
    };
  }
}
