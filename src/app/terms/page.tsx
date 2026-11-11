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
          allow enquiries, registrations and camp bookings. By using this
          site, you agree to use it only for lawful purposes.
        </p>
      </section>

      <section>
        <h2>Programme registration</h2>
        <p>
          Registering for a Let&apos;s Play programme involves choosing a
          programme and providing parent/guardian and child details,
          including an emergency contact and any medical or accessibility
          information we need to keep your child safe. A place is only
          confirmed once Let&apos;s Play has processed your registration and
          confirmed it with you.
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
        <h2>Payment terms (Football Programmes)</h2>
        <ul>
          <li>Amount: £39.50 per payment.</li>
          <li>Frequency: Monthly.</li>
          <li>Payment date: 1st of each month.</li>
          <li>
            Payment duration: payments commence on the 1st of each month and
            continue until further notice.
          </li>
          <li>
            Term time only: payments cover programmes operating during
            school term time only.
          </li>
          <li>
            August: no programmes take place during August. Parents/carers
            may pause their standing order for August themselves if they
            wish to, arranged directly with their bank.
          </li>
          <li>
            Mid-month joining: if a child joins partway through a month, a
            one-off payment covers the remainder of that month. The regular
            monthly fee of £39.50 is then due on the 1st of the following
            month. This can be discussed and agreed with the Owner.
          </li>
          <li>
            A late payment fee of £5.00 may apply if payments are not made
            on time.
          </li>
        </ul>
      </section>

      <section>
        <h2>Standing order payment details</h2>
        <p>
          Standing orders should be set up using the following details, with
          your child&apos;s name as the payment reference:
        </p>
        <ul>
          <li>Account name: Let&apos;s Play Limited</li>
          <li>Bank: Revolut Business</li>
          <li>Sort code: 04-29-09</li>
          <li>Account number: 4769 3789</li>
          <li>Reference: your child&apos;s full name</li>
        </ul>
        <p>
          Let&apos;s Play will give at least 30 days&apos; written notice of
          any change to the payment amount, frequency or bank details.
        </p>
      </section>

      <section>
        <h2>Cancellations, refunds and termination</h2>
        <p>
          You may cancel your standing order at any time by giving
          Let&apos;s Play Limited 30 days&apos; written notice. Cancelling
          the standing order ends your child&apos;s membership of the
          programme. Let&apos;s Play Limited may also terminate a
          child&apos;s membership if payments are not made in accordance
          with these terms.
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
        <h2>Liability and negligence</h2>
        <p>
          <strong>Acknowledgment of risk.</strong> Participation in football
          activities involves inherent risks, including but not limited to
          physical injury, illness, or death. These risks may result from
          the actions, inactions, or negligence of a child, other
          participants, Let&apos;s Play, its staff, volunteers, or others
          involved in the activities.
        </p>
        <p>
          <strong>Assumption of risk.</strong> By registering a child for
          Let&apos;s Play activities, a parent or guardian voluntarily
          agrees to allow their child to participate, and accepts and
          assumes all risks, known and unknown, related to that
          participation, including risks arising from the negligence of
          Let&apos;s Play, its staff, or other participants.
        </p>
        <p>
          <strong>Release of liability.</strong> In consideration of a
          child&apos;s participation, the parent or guardian, on behalf of
          themselves, their child, and their heirs, assigns, personal
          representatives and next of kin, releases, waives, and discharges
          Let&apos;s Play, its directors, officers, employees, volunteers
          and agents (the &quot;Released Parties&quot;) from any and all
          liability, claims, demands, actions, or causes of action arising
          out of or related to any injury, illness, damage, or loss
          occurring as a result of participation, whether caused by the
          negligence of the Released Parties or otherwise, to the fullest
          extent permitted by law.
        </p>
        <p>
          <strong>Indemnification.</strong> Parents and guardians agree to
          indemnify and hold harmless the Released Parties from and against
          any and all claims, liabilities, damages, costs, and expenses
          (including legal fees) arising out of or related to their
          child&apos;s participation, including claims arising from the
          negligence of the Released Parties.
        </p>
        <p>
          <strong>Medical treatment.</strong> In the event of an injury or
          illness, parents and guardians authorise Let&apos;s Play and its
          representatives to seek and obtain medical treatment for their
          child, and understand they are responsible for any costs
          associated with that treatment.
        </p>
        <p>
          <strong>Governing law.</strong> This section is governed by and
          interpreted in accordance with the laws of the Isle of Man.
        </p>
      </section>

      <section>
        <h2>Consent for photography and videography</h2>
        <p>
          Registering a child for Let&apos;s Play activities may include
          granting permission for Let&apos;s Play to photograph and/or
          record the child during football-related activities and events.
          These images or videos may be used for promotional purposes,
          including social media, websites, newsletters, and other
          marketing materials, used in a respectful and appropriate manner.
          Parents and guardians waive any right to compensation or ownership
          of these images. Consent can be withdrawn at any time by notifying
          Let&apos;s Play in writing.
        </p>
      </section>

      <section>
        <h2>Communication</h2>
        <p>
          Let&apos;s Play uses WhatsApp as its primary communication
          platform for sharing information about football events,
          programmes and updates. Parents and guardians are encouraged to
          join the relevant WhatsApp group to stay up to date with news and
          schedules.
        </p>
      </section>

      <section>
        <h2>Limitation of liability</h2>
        <p>
          Nothing in these terms limits our liability for matters that
          cannot be limited under Isle of Man law. The liability and
          negligence wording above reflects Let&apos;s Play&apos;s existing
          registration terms and is subject to legal review before launch.
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
