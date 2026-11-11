import type { Camp } from "@/types";

/**
 * Camp data model — add future Easter, summer and holiday camps here.
 * `status` drives the UI badge; `bookingEnabled` controls the Book Now flow.
 * Dates are ISO session days. Past camps render in the archive, never as upcoming.
 */
export const camps: Camp[] = [
  {
    slug: "easter-2025-week-1",
    name: "Easter Football Camp — Week 1",
    sessionDates: [
      "2025-04-07",
      "2025-04-08",
      "2025-04-09",
      "2025-04-10",
      "2025-04-11",
    ],
    days: 5,
    pricePence: 15000,
    status: "completed",
    description:
      "Five days of skills, games and teamwork during the Easter school holidays.",
    location: "Isle of Man",
    yearGroups: "Years 1–6",
    whatToBring: null,
    capacity: null,
    spacesRemaining: null,
    bookingEnabled: false,
    published: true,
  },
  {
    slug: "easter-2025-week-2",
    name: "Easter Football Camp — Week 2",
    sessionDates: ["2025-04-14", "2025-04-15", "2025-04-16"],
    days: 3,
    pricePence: 9000,
    status: "completed",
    description: "Three days of football fun to round off the Easter holidays.",
    location: "Isle of Man",
    yearGroups: "Years 1–6",
    whatToBring: null,
    capacity: null,
    spacesRemaining: null,
    bookingEnabled: false,
    published: true,
  },
];

export function isPastCamp(camp: Camp, now = new Date()): boolean {
  const last = [...camp.sessionDates].sort().at(-1);
  if (!last) return false;
  return new Date(last + "T23:59:59") < now || camp.status === "completed";
}

export function upcomingCamps(now = new Date()): Camp[] {
  return camps
    .filter((c) => c.published && !isPastCamp(c, now))
    .sort((a, b) => a.sessionDates[0].localeCompare(b.sessionDates[0]));
}

export function pastCamps(now = new Date()): Camp[] {
  return camps
    .filter((c) => c.published && isPastCamp(c, now))
    .sort((a, b) => b.sessionDates[0].localeCompare(a.sessionDates[0]));
}

export function getCamp(slug: string): Camp | undefined {
  return camps.find((c) => c.slug === slug && c.published);
}
