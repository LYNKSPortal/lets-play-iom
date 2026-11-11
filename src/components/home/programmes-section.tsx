import { programmes } from "@/lib/data/programmes";
import { ProgrammeCard } from "@/components/programmes/programme-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function ProgrammesSection() {
  const openProgrammes = programmes.filter((p) => p.accessType === "open");

  return (
    <section className="border-y border-border-subtle bg-surface px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Our Programmes"
          title="Find your game."
          description="Structured after-school football programmes for boys and girls, designed to develop skills, build confidence and keep young players loving the game."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {openProgrammes.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.12}>
              <ProgrammeCard programme={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
