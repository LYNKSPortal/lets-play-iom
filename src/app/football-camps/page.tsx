import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { CampCard } from "@/components/camps/camp-card";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { upcomingCamps, pastCamps } from "@/lib/data/camps";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Football Camps",
  description:
    "Football camps packed with skills, games, teamwork and fun during the school holidays on the Isle of Man.",
  alternates: { canonical: "/football-camps" },
};

export default function FootballCampsPage() {
  const upcoming = upcomingCamps();
  const past = pastCamps();

  return (
    <>
      <PageHero
        eyebrow="Football Camps"
        title="School holidays. Sorted."
        description="Football camps packed with skills, games, teamwork, and fun."
      />

      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Upcoming" title="Next camps." className="mb-10" />
          {upcoming.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((camp, i) => (
                <Reveal key={camp.slug} delay={i * 0.08}>
                  <CampCard camp={camp} />
                </Reveal>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No upcoming camps right now"
              description="New camp dates are announced ahead of each school holiday. Get in touch to be notified when bookings open."
              action={
                <Button asChild>
                  <Link href="/contact?enquiry=Football%20Camps">Contact Us</Link>
                </Button>
              }
            />
          )}
        </div>
      </section>

      {past.length > 0 && (
        <section className="border-t border-border-subtle bg-surface px-5 py-16 sm:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Past Camps"
              title="Camp archive."
              description="Previous camps are shown here for reference only — they are not open for booking."
              className="mb-10"
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((camp, i) => (
                <Reveal key={camp.slug} delay={i * 0.08}>
                  <CampCard camp={camp} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
