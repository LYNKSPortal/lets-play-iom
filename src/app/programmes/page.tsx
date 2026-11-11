import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { ProgrammeCard } from "@/components/programmes/programme-card";
import { Reveal } from "@/components/ui/reveal";
import { programmes } from "@/lib/data/programmes";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our Football Programmes",
  description:
    "Structured after-school football programmes for boys and girls on the Isle of Man, open-access Football and Full Throttle Programmes, plus our invite-only Gold Programmes.",
  path: "/programmes",
});

export default function ProgrammesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Home", path: "/" },
          { label: "Programmes", path: "/programmes" },
        ]}
      />
      <PageHero
        eyebrow="Our Football Programmes"
        title="Our Football Programmes."
        description="As the Isle of Man's leading football development centre for boys and girls, Let's Play helps young footballers develop their skills through structured, enjoyable sessions, whatever their starting point."
      />

      <section className="border-b border-border-subtle bg-surface px-5 py-14 sm:px-8 md:py-16">
        <div className="mx-auto max-w-4xl space-y-5 text-base leading-relaxed text-muted md:text-lg">
          <p>
            Our programmes are designed for both boys and girls. We offer
            open-access programmes where children of all abilities play
            together, with coaches implementing the Let&apos;s Play
            curriculum throughout their sessions.
          </p>
          <p>
            We also offer invite-only programmes, known as our GOLD
            Programmes, where players who are at a more advanced stage of
            their footballing journey train alongside other invited players.
          </p>
          <p>
            All our programmes are unique and are led by experienced
            coaches, including UEFA B and C Licence-qualified coaches, who
            bring their football backgrounds and experience to every
            session.
          </p>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programmes.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}>
              <ProgrammeCard programme={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
