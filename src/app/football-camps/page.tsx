import type { Metadata } from "next";
import { HeartHandshake } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { CampCard } from "@/components/camps/camp-card";
import { EmptyState } from "@/components/ui/empty-state";
import { FacebookIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { upcomingCamps, pastCamps } from "@/lib/data/camps";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Football Camps",
  description:
    "Let's Play is the Isle of Man's leading football development centre for boys and girls, running football camps packed with skills, games, teamwork and fun every school holiday.",
  alternates: { canonical: "/football-camps" },
};

const aboutPoints = [
  {
    title: "Every school holiday",
    body: "We run camps throughout every half-term holiday and during the summer holidays, giving children regular opportunities to stay active, develop their football skills, make new friends and, most importantly, have fun.",
  },
  {
    title: "All abilities welcome",
    body: "Our camps are primarily designed for primary school-aged children, although we also aim to accommodate secondary school-aged children, particularly during our summer holiday camps.",
  },
  {
    title: "Experienced coaching team",
    body: "All our camps are delivered by our experienced coaching team, led by UEFA B and C Licence-qualified coaches. Every coach has a strong football background and shares our passion for creating a positive, engaging and supportive environment for every child.",
  },
];

export default function FootballCampsPage() {
  const upcoming = upcomingCamps();
  const past = pastCamps();

  return (
    <>
      <PageHero
        eyebrow="Football Camps"
        title="School holidays. Sorted."
        description="Let's Play is the Isle of Man's leading football development centre for boys and girls, providing high-quality football camps for children of all abilities."
      />

      <section className="border-b border-border-subtle bg-surface px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Football Camps at Let's Play"
            title="Built for every child."
            className="mb-10"
          />
          <div className="grid gap-6 sm:grid-cols-3">
            {aboutPoints.map((point, i) => (
              <Reveal key={point.title} delay={i * 0.1}>
                <div className="h-full rounded-lg border border-border-subtle bg-card p-5">
                  <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {point.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
              description="For the latest camps, check out our Facebook page for updates, or get in touch through our form."
              action={
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild>
                    <a
                      href={siteConfig.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FacebookIcon aria-hidden className="size-4" />
                      Follow on Facebook
                    </a>
                  </Button>
                  <Button asChild variant="secondary">
                    <Link href="/contact?enquiry=Football%20Camps">Contact Us</Link>
                  </Button>
                </div>
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
              description="Previous camps are shown here for reference only and are not open for booking."
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

      <section className="border-t border-border-subtle bg-pitch px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <HeartHandshake
              aria-hidden
              className="mx-auto size-8 text-gold"
              strokeWidth={1.5}
            />
            <SectionHeading
              eyebrow="Making Football Accessible"
              title="Football for everyone."
              align="center"
              className="mt-5"
            />
            <div className="mx-auto -mt-4 max-w-2xl space-y-4 text-left text-base leading-relaxed text-muted sm:text-center">
              <p>
                At Let&apos;s Play, we believe every child should have the
                opportunity to enjoy football, regardless of their
                family&apos;s financial circumstances.
              </p>
              <p>
                That&apos;s why we have introduced an initiative offering a
                number of funded child places at selected camps. These places
                are available to support families who may be experiencing
                financial difficulties or challenging circumstances, ensuring
                that cost isn&apos;t a barrier to children taking part.
              </p>
              <p>
                We want every child to feel welcome, included and able to
                experience the enjoyment and benefits that football can
                bring.
              </p>
            </div>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/contact?enquiry=Football%20Camps">
                  Enquire About a Funded Place
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
