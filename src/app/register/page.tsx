import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { programmes } from "@/lib/data/programmes";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Register your child for a Let's Play football programme on the Isle of Man.",
  alternates: { canonical: "/register" },
};

export default function RegisterLandingPage() {
  return (
    <>
      <PageHero
        eyebrow="Register"
        title="Choose a programme."
        description="Select a programme below to start your child's registration, or get in touch if you have questions first."
      />

      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Our Programmes"
            title="Ready to register?"
            className="mb-10"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programmes.map((programme, i) => {
              const registrable =
                programme.accessType === "open" &&
                programme.status !== "fully-booked";

              return (
                <Reveal key={programme.slug} delay={i * 0.1}>
                  <div className="flex h-full flex-col rounded-xl border border-border-subtle bg-card p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
                        {programme.name}
                      </h3>
                      <StatusBadge status={programme.status} className="shrink-0" />
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                      {programme.description}
                    </p>
                    {programme.price && (
                      <p className="mt-4 font-display text-lg font-bold text-gold">
                        {programme.price}
                      </p>
                    )}
                    <div className="mt-5 space-y-2">
                      {programme.accessType === "invite-only" ? (
                        <Button asChild size="lg" className="w-full">
                          <Link href={`/contact?enquiry=${encodeURIComponent("Football Programmes")}`}>
                            Ask About Gold Programmes
                          </Link>
                        </Button>
                      ) : registrable ? (
                        <Button asChild size="lg" className="w-full">
                          <Link href={`/register/${programme.slug}`}>
                            Register Now
                          </Link>
                        </Button>
                      ) : (
                        <Button asChild size="lg" className="w-full">
                          <Link href={`/contact?enquiry=${encodeURIComponent("Football Programmes")}`}>
                            Join Waiting List
                          </Link>
                        </Button>
                      )}
                      <Button asChild variant="secondary" size="lg" className="w-full">
                        <Link href={`/programmes/${programme.slug}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
