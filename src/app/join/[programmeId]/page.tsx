import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/page-hero";
import { RegistrationForm } from "@/components/registration/registration-form";
import { getProgramme } from "@/lib/data/programmes";

/**
 * Private, unlisted registration link.
 *
 * Not linked from any site navigation, the sitemap, or search results
 * (robots.txt disallows /join/ and this page sets noindex). Intended to be
 * shared directly by Let's Play with a specific family, so unlike
 * /register/[programmeId], it is not gated by a programme's public
 * availability status, letting staff sign someone up directly even if the
 * programme shows as fully booked on the public site.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ programmeId: string }>;
}): Promise<Metadata> {
  const { programmeId } = await params;
  const programme = getProgramme(programmeId);
  return {
    title: programme ? `Join, ${programme.name}` : "Register for a Programme",
    robots: { index: false, follow: false },
  };
}

export default async function JoinProgrammePage({
  params,
}: {
  params: Promise<{ programmeId: string }>;
}) {
  const { programmeId } = await params;
  const programme = getProgramme(programmeId);

  if (!programme) notFound();

  return (
    <>
      <PageHero eyebrow="Registration" title={`Register, ${programme.name}`} />

      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-2xl">
          <RegistrationForm programme={programme} source="direct" />
        </div>
      </section>
    </>
  );
}
