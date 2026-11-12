import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/ui/legal-page";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Safeguarding",
  description:
    "Let's Play's safeguarding commitment: coach vetting, DBS checks, safeguarding training, and how to report a concern.",
  path: "/safeguarding",
  noIndex: true,
});

export default function SafeguardingPage() {
  return (
    <LegalPage eyebrow="Legal" title="Safeguarding" updated="November 2026">
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
          . We will listen, take appropriate action, and keep you informed
          throughout.
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
          Let&apos;s Play Limited (Isle of Man) uses WhatsApp as its primary
          communication platform for sharing information about events, programmes and
          updates with parents and guardians.
        </p>
      </section>
    </LegalPage>
  );
}
