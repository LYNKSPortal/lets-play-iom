import { GraduationCap, TrendingUp, HeartHandshake, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const features = [
  {
    icon: GraduationCap,
    title: "Qualified Coaching",
    text: "Sessions led by experienced coaches focused on developing young players the right way.",
  },
  {
    icon: TrendingUp,
    title: "Player Development",
    text: "Every session is built around real improvement — technically, tactically and personally.",
  },
  {
    icon: HeartHandshake,
    title: "Positive Environment",
    text: "A safe, supportive setting where every child is encouraged and included.",
  },
  {
    icon: Users,
    title: "Teamwork & Confidence",
    text: "Football that builds friendships, communication and self-belief.",
  },
];

export function WhyUs() {
  return (
    <section className="border-y border-border-subtle bg-surface px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Why Let's Play" title="Built around the player." />
        <div className="grid gap-px overflow-hidden rounded-xl border border-border-subtle bg-border-subtle sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08} className="bg-card">
              <div className="flex h-full flex-col p-7">
                <f.icon aria-hidden className="size-6 text-gold" strokeWidth={1.75} />
                <h3 className="mt-5 font-display text-xl font-bold uppercase tracking-wide text-white">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
