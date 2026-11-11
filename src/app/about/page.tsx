import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Let's Play is a football development centre rooted in the Isle of Man, helping young players grow in skill, confidence and enjoyment of the game.",
  alternates: { canonical: "/about" },
};

const sections = [
  {
    eyebrow: "Our Roots",
    title: "Built on the Isle of Man.",
    body: [
      "Let's Play started with a simple idea: give young footballers on the Isle of Man a place to learn, play and grow — properly coached, genuinely supportive, and fun from the first session.",
      "Since then, we've grown into a football development centre offering after-school programmes and school-holiday camps across the Island.",
    ],
  },
  {
    eyebrow: "Our Approach",
    title: "Development, not just drills.",
    body: [
      "We believe young players develop best when sessions are structured but enjoyable — building real technical ability through games, challenges and plenty of touches on the ball.",
      "Every session is built around the player in front of us, not a one-size-fits-all script.",
    ],
  },
  {
    eyebrow: "Confidence & Teamwork",
    title: "Football builds more than footballers.",
    body: [
      "Alongside skill development, we focus on confidence, communication and teamwork — the things that help young players thrive on the pitch and off it.",
      "Friendships made at Let's Play often last long after the final whistle.",
    ],
  },
  {
    eyebrow: "Safe & Supportive",
    title: "Coaching you can trust.",
    body: [
      "Every session takes place in a positive, safe environment, with coaches who care about getting it right for every child — not just the most talented ones.",
      "See our Coaches and Safeguarding pages for more on how we keep sessions safe.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Let's Play"
        title="Football with purpose."
        description="A football development centre on the Isle of Man, built around young players — their skills, their confidence, and their enjoyment of the game."
      />

      {sections.map((section, i) => (
        <section
          key={section.title}
          className={
            i % 2 === 0
              ? "px-5 py-16 sm:px-8 md:py-20"
              : "border-y border-border-subtle bg-surface px-5 py-16 sm:px-8 md:py-20"
          }
        >
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-gold">
                {section.eyebrow}
              </p>
              <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-wide text-white sm:text-5xl">
                {section.title}
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
                {section.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1} className={i % 2 === 1 ? "lg:order-1" : ""}>
              <div className="bg-pitch flex aspect-4/3 items-center justify-center overflow-hidden rounded-xl border border-border-subtle">
                <Image
                  src="/images/easter-camp.png"
                  alt="Let's Play gold football mark"
                  width={420}
                  height={320}
                  className="h-auto w-1/2 opacity-80"
                />
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="bg-pitch border-t border-border-subtle px-5 py-20 text-center sm:px-8 md:py-28">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-4xl font-bold uppercase tracking-wide text-white sm:text-5xl">
            Want to find out more?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            Explore our programmes or get in touch — we&apos;d love to hear
            from you.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/programmes">View Programmes</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
