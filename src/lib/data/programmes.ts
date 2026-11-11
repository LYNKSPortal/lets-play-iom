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
      "Our Football Programmes are open-access after-school sessions for boys and girls, designed to give every young player the chance to enjoy the game, whatever their starting point. Children of all abilities play together, with coaches implementing the Let's Play curriculum throughout every session.",
      "Sessions focus on ball mastery, game understanding and teamwork in a positive, supportive environment, building confident players who love coming back week after week.",
    ],
    benefits: [
      "Structured, age-appropriate coaching sessions",
      "Skill development built around real game situations",
      "A positive environment where every player is included",
      "Confidence on and off the ball, on and off the pitch",
    ],
    whoItsFor:
      "Open to all children in school years 1 to 6, no trial or selection needed.",
    yearGroups: "Years 1–6",
    accessType: "open",
    status: "fully-booked",
    sessionInfo: "After-school sessions during term time",
    location: "Isle of Man",
    price: "£39.50 per month (standing order, term-time only)",
    image: "/Football-Programmes.jpg",
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
      "Full Throttle is for young players who want more from their football, a dedicated development programme for boys and girls, designed to stretch, challenge and support players who are ready to go further. As with all our open-access programmes, coaches implement the Let's Play curriculum throughout every session.",
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
    image: "/Full-Throttle-Programmes.jpg",
    published: true,
  },
  {
    slug: "gold",
    name: "Gold Programmes",
    category: "Invite-Only Programme",
    tagline: "The next step in the pathway.",
    description:
      "Invite-only programmes for players at a more advanced stage of their footballing journey, training alongside other invited players.",
    longDescription: [
      "Our Gold Programmes are invite-only, for players who are at a more advanced stage of their footballing journey and ready to train alongside other invited players.",
      "As with every Let's Play programme, Gold sessions are led by experienced coaches, including UEFA B and C Licence-qualified coaches, who bring their football backgrounds and experience to every session.",
    ],
    benefits: [
      "A higher standard of training alongside other invited players",
      "Coaching from our most experienced, licence-qualified coaches",
      "A clear pathway for players progressing through Let's Play",
      "A girls-only pathway available within the Gold Programme",
    ],
    whoItsFor:
      "Invite only. We offer Gold Programmes for children from Year 1 to Year 6, as well as a girls-only programme for children in Year 5 through Year 9.",
    yearGroups: "Years 1–6, plus girls-only Years 5–9",
    accessType: "invite-only",
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

/**
 * The first open-access, non-fully-booked programme, if any. Used to decide
 * whether site-wide CTAs should point to registration or to a general
 * enquiry instead.
 */
export function getOpenRegistrationProgramme(): Programme | undefined {
  return programmes.find(
    (p) => p.published && p.accessType === "open" && p.status !== "fully-booked"
  );
}
