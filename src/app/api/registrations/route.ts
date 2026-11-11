import { NextResponse } from "next/server";
import { registrationFormSchema } from "@/lib/validation/registration";
import { submitRegistration } from "@/lib/api/registrations";
import { getProgramme } from "@/lib/data/programmes";

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

  const parsed = registrationFormSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Please check the form and try again." },
      { status: 400 }
    );
  }

  const programme = getProgramme(parsed.data.programmeSlug);
  if (!programme) {
    return NextResponse.json(
      { success: false, error: "This programme could not be found." },
      { status: 404 }
    );
  }
  if (programme.accessType !== "open" || programme.status === "fully-booked") {
    return NextResponse.json(
      {
        success: false,
        error: "This programme is not currently open for registration.",
      },
      { status: 409 }
    );
  }

  // Do not log medical/sensitive child information.
  const { child, ...safeForLogging } = parsed.data;
  void child;
  console.info("Registration submission received", {
    programmeSlug: safeForLogging.programmeSlug,
    parentEmail: safeForLogging.parent.email,
  });

  const result = await submitRegistration(parsed.data);
  if (!result.success) {
    return NextResponse.json(result, { status: 502 });
  }

  return NextResponse.json(result, { status: 200 });
}
