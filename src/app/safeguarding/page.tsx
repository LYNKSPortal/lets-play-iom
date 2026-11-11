import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/ui/legal-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Safeguarding",
  robots: { index: false, follow: true },
  alternates: { canonical: "/safeguarding" },
};

export default function SafeguardingPage() {
  return (
    <LegalPage eyebrow="Legal" title="Safeguarding" updated="Draft, pending review">
      <section>
        <h2>Our commitment</h2>
        <p>
          Let&apos;s Play is committed to providing a safe, positive
          environment for every child who takes part in our programmes and
          camps on the Isle of Man.
        </p>
      </section>

      <section>
        <h2>Coaching standards</h2>
        <p>
          As stated on letsplay.co.im, our lead coaches are accredited and
          qualified by the Football Association (FA). Coaches undergo
          enhanced DBS (Disclosure and Barring Service) checks and complete
          comprehensive safeguarding training. Junior coaches are supported
          through their own FA coaching qualifications.
        </p>
      </section>

      <section>
        <h2>Reporting a concern</h2>
        <p>
          If you have a safeguarding concern about a Let&apos;s Play session,
          please contact us immediately at{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-gold hover:underline">
            {siteConfig.email}
          </a>{" "}
          or call{" "}
          <a href={siteConfig.phoneHref} className="text-gold hover:underline">
            {siteConfig.phone}
          </a>
          . A full, named safeguarding contact and escalation procedure will
          be confirmed here before launch.
        </p>
      </section>

      <section>
        <h2>Photography and media</h2>
        <p>
          Where photography or video of sessions is used for promotional
          purposes, we seek parent or guardian consent in advance as part of
          registration or booking. Full consent terms are set out in our{" "}
          <Link href="/terms" className="text-gold hover:underline">
            Terms &amp; Conditions
          </Link>
          . You can withdraw consent at any time by contacting us.
        </p>
      </section>

      <section>
        <h2>Communication</h2>
        <p>
          Let&apos;s Play uses WhatsApp as its primary communication
          platform for sharing information about events, programmes and
          updates with parents and guardians.
        </p>
      </section>
    </LegalPage>
  );
}
