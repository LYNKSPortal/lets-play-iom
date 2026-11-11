import Link from "next/link";
import { coaches } from "@/lib/data/coaches";
import { CoachCard } from "@/components/ui/coach-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export function CoachesPreview() {
  const previewCoaches = coaches
    .filter((c) => c.role !== "Owner & Coach")
    .slice(0, 4);

  return (
    <section className="px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Meet the Coaches"
          title="The people behind the play."
          description="Experienced, dedicated coaches who create a positive environment for every young player."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {previewCoaches.map((coach, i) => (
            <Reveal key={coach.slug} delay={i * 0.08}>
              <CoachCard coach={coach} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2} className="mt-10">
          <Button asChild variant="secondary" size="lg">
            <Link href="/coaches">Meet Our Coaches</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
