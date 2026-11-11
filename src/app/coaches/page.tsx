import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { CoachCard } from "@/components/ui/coach-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { coaches } from "@/lib/data/coaches";

export const metadata: Metadata = {
  title: "Our Coaches",
  description:
    "Meet the Let's Play coaching team on the Isle of Man — experienced coaches focused on safe, positive youth football development.",
  alternates: { canonical: "/coaches" },
};

const safeguardingPoints = [
  "Lead coaches are accredited and qualified by the Football Association (FA).",
  "Coaches undergo enhanced DBS (Disclosure and Barring Service) checks.",
  "All coaches complete comprehensive safeguarding training.",
  "Junior coaches are supported through their own FA coaching qualifications with mentorship and development opportunities.",
];

export default function CoachesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Coaches"
        title="Great coaches. Great experiences."
        description="Meet the team behind Let's Play — coaches dedicated to helping every young player grow, learn and enjoy the game."
      />

      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coaches.map((coach, i) => (
              <Reveal key={coach.slug} delay={i * 0.08}>
                <CoachCard coach={coach} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border-subtle bg-surface px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="Safeguarding"
            title="Safe hands. Strong foundations."
            align="center"
          />
          <Reveal>
            <p className="mx-auto -mt-4 max-w-2xl text-center text-base leading-relaxed text-muted">
              At Let&apos;s Play, we are committed to providing high-quality
              coaching in a safe and secure environment for every participant.
            </p>
            <ul className="mx-auto mt-10 grid max-w-2xl gap-4">
              {safeguardingPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 rounded-lg border border-border-subtle bg-card p-4 text-sm leading-relaxed text-white/85"
                >
                  <ShieldCheck
                    aria-hidden
                    className="mt-0.5 size-5 shrink-0 text-gold"
                  />
                  {point}
                </li>
              ))}
            </ul>
            <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-muted">
              These statements reflect Let&apos;s Play&apos;s organisational
              policy as published on letsplay.co.im and are subject to
              confirmation before launch. Individual coach qualifications and
              certifications are not listed here unless independently
              verified.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
