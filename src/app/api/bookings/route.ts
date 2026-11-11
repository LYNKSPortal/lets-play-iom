import { NextResponse } from "next/server";
import { bookingFormSchema } from "@/lib/validation/booking";
import { submitBooking } from "@/lib/api/bookings";
import { getCamp, isPastCamp } from "@/lib/data/camps";

// Minimal in-memory rate limiter. In production, replace with a durable
// store (e.g. DynamoDB, Redis) shared across instances.
const rateLimitWindowMs = 60_000;
const maxRequestsPerWindow = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(key) ?? []).filter(
    (t) => now - t < rateLimitWindowMs
  );
  timestamps.push(now);
  requestLog.set(key, timestamps);
  return timestamps.length > maxRequestsPerWindow;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = bookingFormSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Please check the form and try again." },
      { status: 400 }
    );
  }

  const camp = getCamp(parsed.data.campSlug);
  if (!camp) {
    return NextResponse.json(
      { success: false, error: "This camp could not be found." },
      { status: 404 }
    );
  }
  if (isPastCamp(camp) || !camp.bookingEnabled || camp.status === "fully-booked") {
    return NextResponse.json(
      { success: false, error: "This camp is not currently available for booking." },
      { status: 409 }
    );
  }

  // Do not log medical/sensitive player information.
  const { player, ...safeForLogging } = parsed.data;
  void player;
  console.info("Booking submission received", {
    campSlug: safeForLogging.campSlug,
    parentEmail: safeForLogging.parent.email,
  });

  const result = await submitBooking(parsed.data);
  if (!result.success) {
    return NextResponse.json(result, { status: 502 });
  }

  return NextResponse.json(result, { status: 200 });
}
