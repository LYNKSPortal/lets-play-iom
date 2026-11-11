export type AvailabilityStatus =
  | "available"
  | "limited"
  | "fully-booked"
  | "coming-soon"
  | "completed";

export interface NavItem {
  label: string;
  href: string;
}

export interface Programme {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  longDescription: string[];
  benefits: string[];
  whoItsFor: string;
  yearGroups?: string;
  accessType: "open" | "invite-only";
  status: AvailabilityStatus;
  /** null when unverified — UI shows "Details coming soon" */
  sessionInfo: string | null;
  location: string | null;
  price: string | null;
  image?: string;
  published: boolean;
}

export interface Camp {
  slug: string;
  name: string;
  /** ISO dates for each session day */
  sessionDates: string[];
  days: number;
  /** Price in pence */
  pricePence: number;
  status: AvailabilityStatus;
  description: string;
  location: string | null;
  yearGroups: string | null;
  whatToBring: string[] | null;
  /** Total spaces; null when not published */
  capacity: number | null;
  /** Remaining spaces; null when unknown */
  spacesRemaining: number | null;
  bookingEnabled: boolean;
  published: boolean;
}

export interface Coach {
  slug: string;
  name: string;
  role: string;
  /** Only facts verified from the Let's Play website */
  bio?: string;
  image?: string;
}

export interface Sponsor {
  name: string;
  description: string;
  phone: string;
  website: string;
  logo?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BookingPayload {
  campSlug: string;
  parent: {
    fullName: string;
    email: string;
    phone: string;
  };
  player: {
    fullName: string;
    dateOfBirth: string;
    medicalInfo?: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
  };
  consent: {
    privacyAccepted: boolean;
    photoConsent: boolean;
  };
}

export interface RegistrationPayload {
  programmeSlug: string;
  parent: {
    fullName: string;
    email: string;
    phone: string;
  };
  child: {
    fullName: string;
    dateOfBirth: string;
    gender: string;
    schoolYear: string;
    medicalInfo?: string;
    additionalInfo?: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
  };
  consent: {
    /** Covers the liability/risk waiver, photography consent and WhatsApp communication notice. */
    termsAccepted: boolean;
    /** Acknowledges the standing order payment terms and bank details. */
    paymentAgreementAccepted: boolean;
  };
}
