import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { RegistrationForm } from "@/components/registration/registration-form";
import { getProgramme } from "@/lib/data/programmes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ programmeId: string }>;
}): Promise<Metadata> {
  const { programmeId } = await params;
  const programme = getProgramme(programmeId);
  return {
    title: programme ? `Register, ${programme.name}` : "Register for a Programme",
    robots: { index: false, follow: false },
  };
}

export default async function RegisterProgrammePage({
  params,
}: {
  params: Promise<{ programmeId: string }>;
}) {
  const { programmeId } = await params;
  const programme = getProgramme(programmeId);

  if (!programme) notFound();

  const registrable =
    programme.accessType === "open" && programme.status !== "fully-booked";

  return (
    <>
      <PageHero eyebrow="Register" title="Programme Registration">
        <div className="mt-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Programmes", href: "/programmes" },
              { label: programme.name, href: `/programmes/${programme.slug}` },
              { label: "Register" },
            ]}
          />
        </div>
      </PageHero>

      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-2xl">
          {registrable ? (
            <RegistrationForm programme={programme} />
          ) : (
            <EmptyState
              title="Registration isn't available for this programme"
              description={
                programme.accessType === "invite-only"
                  ? "This programme is by invite only. Contact us to find out more about the pathway."
                  : programme.status === "fully-booked"
                    ? "This programme is fully booked. Contact us to join the waiting list."
                    : "Registration for this programme hasn't opened yet. Contact us to register your interest."
              }
              action={
                <Button asChild>
                  <Link href={`/programmes/${programme.slug}`}>
                    Back to Programme Details
                  </Link>
                </Button>
              }
            />
          )}
        </div>
      </section>
    </>
  );
}
