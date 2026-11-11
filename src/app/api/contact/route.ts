import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation/contact";
import { submitContactForm } from "@/lib/api/contact";

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

  const parsed = contactFormSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Please check the form and try again." },
      { status: 400 }
    );
  }

  // Honeypot — a filled "company" field indicates a bot.
  if (parsed.data.company) {
    return NextResponse.json({ success: true });
  }

  const result = await submitContactForm(parsed.data);
  if (!result.success) {
    return NextResponse.json(result, { status: 503 });
  }

  return NextResponse.json(result, { status: 200 });
}
