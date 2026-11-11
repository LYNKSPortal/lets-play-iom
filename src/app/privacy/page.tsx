import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/legal-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false, follow: true },
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" updated="Draft, pending review">
      <section>
        <h2>Who we are</h2>
        <p>
          Let&apos;s Play is a football development centre based on the Isle
          of Man. This policy explains how we handle personal information
          collected through this website, including enquiries and camp
          bookings.
        </p>
      </section>

      <section>
        <h2>Information we collect</h2>
        <p>
          When you contact us or book a camp, we may collect: your name,
          email address and phone number; your child&apos;s name, date of
          birth, and emergency contact details; and, only where you choose to
          provide it, relevant medical or accessibility information needed to
          keep your child safe during sessions.
        </p>
      </section>

      <section>
        <h2>How we use it</h2>
        <ul>
          <li>To respond to enquiries and process camp bookings.</li>
          <li>To run sessions safely, including emergency contact and welfare needs.</li>
          <li>To send booking confirmations and essential session updates.</li>
        </ul>
      </section>

      <section>
        <h2>Children&apos;s data</h2>
        <p>
          Because our services are for children, we collect the minimum
          information necessary and restrict access to sensitive details such
          as medical information. We do not log or store medical information
          in our analytics or marketing systems.
        </p>
      </section>

      <section>
        <h2>Data retention and deletion</h2>
        <p>
          We intend to retain booking information only for as long as
          necessary to deliver our services and meet legal obligations, and
          to delete it securely afterwards. Specific retention periods will
          be confirmed here before launch.
        </p>
      </section>

      <section>
        <h2>Third parties</h2>
        <p>
          We do not sell personal information. Where we use third-party
          services (for example, to process bookings or send emails), those
          providers will be listed here once finalised.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          For any privacy questions or to request access to or deletion of
          your data, contact us at{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-gold hover:underline">
            {siteConfig.email}
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
