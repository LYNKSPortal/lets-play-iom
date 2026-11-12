import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { RegistrationFormLong } from "@/components/registration/registration-form-long";
import { getProgramme } from "@/lib/data/programmes";

/**
 * Let's Play Football Camp Signup Form.
 *
 * A single, standalone, unlisted link. Not linked from any site navigation,
 * the sitemap, or search results (robots.txt disallows this path and this
 * page sets noindex). Nothing on this page links back to the rest of the
 * website. Intended to be handed out directly before the site officially
 * goes live, or any time staff want to sign someone up regardless of a
 * programme's public availability status.
 */
export const metadata: Metadata = {
  title: "Let's Play Football Camp Signup Form",
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  const programme = getProgramme("football");
  if (!programme) return null;

  return (
    <div className="min-h-screen bg-black">
      <PageHero
        eyebrow="Let's Play"
        title="Let's Play Football Camp Signup Form"
      />
      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-2xl">
          <RegistrationFormLong programme={programme} source="direct" />
        </div>
      </section>
    </div>
  );
}
