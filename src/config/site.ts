import type { NavItem, Sponsor } from "@/types";

export const siteConfig = {
  name: "Let's Play",
  tagline: "Football Development Centre",
  domain: "https://letsplay.co.im",
  description:
    "The Isle of Man's leading football development centre for boys and girls, offering after-school football programmes and school-holiday football camps, with over 150 children taking part in our weekly programmes.",
  email: "info@letsplay.co.im",
  phone: "07624 222766",
  phoneHref: "tel:+447624222766",
  location: "Isle of Man",
  logo: "/images/lets-play-logo.png",
  facebookUrl: "https://www.facebook.com/LetsPlayIOM",
  instagramUrl: "https://www.instagram.com/ltsplyiom/",
} as const;

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Our Programmes", href: "/programmes" },
  { label: "Football Camps", href: "/football-camps" },
  { label: "Our Coaches", href: "/coaches" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const sponsor: Sponsor = {
  name: "B&B Furniture",
  description:
    "B&B Furniture proudly supports Let's Play and its commitment to helping young footballers develop, grow, and enjoy the game.",
  phone: "01624 627692",
  website: "https://www.bbfurniture.co.uk/",
};

/**
 * Announcement strip shown above the header.
 * Set `enabled: false` or `text: null` to hide.
 */
export const announcement = {
  enabled: false as boolean,
  text: null as string | null,
  href: "/football-camps",
  linkLabel: "Find out more",
};

/**
 * Whether email-based form delivery (via Resend) is configured.
 * Mirrors the server-only `RESEND_API_KEY` presence to the client so forms
 * can show accurate demo-mode messaging. Set
 * `NEXT_PUBLIC_EMAIL_NOTIFICATIONS_ENABLED=true` once `RESEND_API_KEY` is
 * configured (see .env.example).
 */
export const emailNotificationsEnabled =
  process.env.NEXT_PUBLIC_EMAIL_NOTIFICATIONS_ENABLED === "true";

/** Whether the booking flow sends real email notifications (via Resend). */
export const bookingBackendConfigured = emailNotificationsEnabled;

/** Whether the contact form sends real email notifications (via Resend). */
export const contactBackendConfigured = emailNotificationsEnabled;

/** Whether the registration flow sends real email notifications (via Resend). */
export const registrationBackendConfigured = emailNotificationsEnabled;

/** Standing order bank details for programme registration payments. */
export const standingOrderDetails = {
  accountName: "Let's Play Limited",
  bankName: "Revolut Business",
  sortCode: "04-29-09",
  accountNumber: "4769 3789",
  referenceNote: "your child's full name",
};
