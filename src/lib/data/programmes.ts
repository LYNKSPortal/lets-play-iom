import type { Programme } from "@/types";

/**
 * Programme content sourced from letsplay.co.im.
 * Fields set to `null` are unverified — update here as details are confirmed.
 */
export const programmes: Programme[] = [
  {
    slug: "football",
    name: "Football Programmes",
    category: "After-School Programme",
    tagline: "Learn. Play. Grow.",
    description:
      "Fun, structured after-school football sessions helping young players develop their skills and confidence.",
    longDescription: [
      "Our Football Programmes are open-access after-school sessions designed to give every young player the chance to enjoy the game, whatever their starting point.",
      "Sessions focus on ball mastery, game understanding and teamwork in a positive, supportive environment — building confident players who love coming back week after week.",
    ],
    benefits: [
      "Structured, age-appropriate coaching sessions",
      "Skill development built around real game situations",
      "A positive environment where every player is included",
      "Confidence on and off the ball, on and off the pitch",
    ],
    whoItsFor:
      "Open to all children in school years 1 to 6 — no trial or selection needed.",
    yearGroups: "Years 1–6",
    accessType: "open",
    status: "fully-booked",
    sessionInfo: "After-school sessions during term time",
    location: "Isle of Man",
    price: null,
    published: true,
  },
  {
    slug: "full-throttle",
    name: "Full Throttle Programmes",
    category: "Development Programme",
    tagline: "Push your game further.",
    description:
      "Dedicated football development sessions designed to challenge and support young players.",
    longDescription: [
      "Full Throttle is for young players who want more from their football — a dedicated development programme designed to stretch, challenge and support players who are ready to go further.",
      "With a sharper focus on technical detail and game intensity, Full Throttle helps committed players take the next step in their development.",
    ],
    benefits: [
      "Higher-intensity, development-focused sessions",
      "Technical detail and game understanding",
      "Coaching that challenges and supports in equal measure",
      "A clear next step for committed young players",
    ],
    whoItsFor:
      "Open to children in school years 3 to 9 who are ready for a more challenging training environment.",
    yearGroups: "Years 3–9",
    accessType: "open",
    status: "fully-booked",
    sessionInfo: "After-school sessions during term time",
    location: "Isle of Man",
    price: null,
    published: true,
  },
];

export function getProgramme(slug: string): Programme | undefined {
  return programmes.find((p) => p.slug === slug && p.published);
}
