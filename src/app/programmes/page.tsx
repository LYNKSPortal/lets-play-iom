import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { ProgrammeCard } from "@/components/programmes/programme-card";
import { Reveal } from "@/components/ui/reveal";
import { programmes } from "@/lib/data/programmes";

export const metadata: Metadata = {
  title: "Our Football Programmes",
  description:
    "Structured after-school football programmes for young players on the Isle of Man — Football Programmes and Full Throttle Programmes.",
  alternates: { canonical: "/programmes" },
};

export default function ProgrammesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Football Programmes"
        title="Our Football Programmes."
        description="As the Isle of Man's football development centre for boys and girls, Let's Play helps young footballers develop their skills through structured, enjoyable sessions — whatever their starting point."
      />
      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
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
