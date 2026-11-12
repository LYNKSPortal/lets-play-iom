import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { CampSignupForm } from "@/components/registration/camp-signup-form";

/**
 * Let's Play Football Camp Form.
 *
 * A single, standalone, unlisted link. Not linked from any site navigation,
 * the sitemap, or search results (robots.txt disallows this path and this
 * page sets noindex). Nothing on this page links back to the rest of the
 * website. Intended to be handed out directly for football camp
 * registrations, independent of the main programme registration form.
 */
export const metadata: Metadata = {
  title: "Let's Play Football Camp Form",
  robots: { index: false, follow: false },
};

export default function FootballCampFormPage() {
  return (
    <div className="min-h-screen bg-black">
      <PageHero eyebrow="Let's Play" title="Let's Play Football Camp Form" />
      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-2xl">
          <CampSignupForm />
        </div>
      </section>
    </div>
  );
}
