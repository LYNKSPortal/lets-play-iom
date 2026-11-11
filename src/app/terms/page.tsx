import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/legal-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  robots: { index: false, follow: true },
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms & Conditions" updated="Draft, pending review">
      <section>
        <h2>Use of this website</h2>
        <p>
          This website is provided by Let&apos;s Play to share information
          about our football programmes and camps on the Isle of Man, and to
          allow enquiries and camp bookings. By using this site, you agree to
          use it only for lawful purposes.
        </p>
      </section>

      <section>
        <h2>Bookings</h2>
        <p>
          A camp booking is only confirmed once you receive confirmation from
          Let&apos;s Play following successful processing by our booking
          system. Submitting a booking form does not guarantee a place until
          this confirmation is received.
        </p>
      </section>

      <section>
        <h2>Cancellations and refunds</h2>
        <p>
          Our cancellation and refund policy for camps and programmes will be
          confirmed here before bookings go live. Please contact us directly
          with any cancellation requests in the meantime.
        </p>
      </section>

      <section>
        <h2>Programme and camp changes</h2>
        <p>
          Occasionally we may need to change session times, locations or
          coaching staff. We will do our best to communicate any changes as
          early as possible.
        </p>
      </section>

      <section>
        <h2>Limitation of liability</h2>
        <p>
          Nothing in these terms limits our liability for matters that cannot
          be limited under Isle of Man law. Final liability wording is
          subject to legal review before launch.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-gold hover:underline">
            {siteConfig.email}
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
