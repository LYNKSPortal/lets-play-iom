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
 * Whether the booking backend (AWS API) is configured.
 * Controlled via env var; when false the booking flow runs in a clearly
 * labelled demo mode and never claims a real reservation was made.
 */
export const bookingBackendConfigured =
  process.env.NEXT_PUBLIC_BOOKING_API_URL !== undefined &&
  process.env.NEXT_PUBLIC_BOOKING_API_URL.length > 0;

/**
 * Whether the contact form backend (email delivery) is configured.
 */
export const contactBackendConfigured =
  process.env.CONTACT_FORM_PROVIDER !== undefined &&
  process.env.CONTACT_FORM_PROVIDER.length > 0;
