import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Let's Play is the Isle of Man's leading football development centre for boys and girls, with over 150 children taking part in our weekly programmes.",
  path: "/about",
});

const stats = [
  { value: "150+", label: "Children taking part in our weekly programmes" },
  { value: "Boys & Girls", label: "Every programme accommodates boys and girls" },
  { value: "Isle of Man", label: "Proudly based and coaching across the Island" },
];

const sections = [
  {
    eyebrow: "Our Roots",
    title: "Built on the Isle of Man.",
    body: [
      "We are the Isle of Man's leading football development centre for boys and girls. Let's Play was founded in 2024 with a simple idea: to give young footballers a place to learn, play and grow.",
      "Since then, we've grown into the Island's leading football development centre, setting high standards through experienced coaches with a proven track record of working with children. We offer after-school programmes and school-holiday camps across the Island, with over 150 children now taking part in our weekly programmes.",
    ],
  },
  {
    eyebrow: "Our Approach",
    title: "Development, not just drills.",
    body: [
      "We believe young players develop best when sessions are structured but enjoyable, building real technical ability through games, challenges and plenty of touches on the ball.",
      "Every session is built around the player in front of us, not a one-size-fits-all script.",
    ],
  },
  {
    eyebrow: "Confidence & Teamwork",
    title: "Football builds more than footballers.",
    body: [
      "Alongside skill development, we focus on confidence, communication and teamwork, the things that help young players thrive on the pitch and off it.",
      "Friendships made at Let's Play often last long after the final whistle.",
    ],
  },
  {
    eyebrow: "Safe & Supportive",
    title: "Coaching you can trust.",
    body: [
      "Every session takes place in a positive, safe environment, with coaches who care about getting it right for every child, not just the most talented ones.",
      "See our Coaches and Safeguarding pages for more on how we keep sessions safe.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Home", path: "/" },
          { label: "About Us", path: "/about" },
        ]}
      />
      <PageHero
        eyebrow="About Let's Play"
        title="Football with purpose."
        description="We are the Isle of Man's leading football development centre for boys and girls, built around young players, their skills, their confidence, and their enjoyment of the game."
      />

      <section className="border-b border-border-subtle bg-surface px-5 py-10 sm:px-8">
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="font-display text-4xl font-bold text-gold">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

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

      <section className="relative overflow-hidden px-5 py-20 sm:px-8 md:py-28">
        <Image
          src="/More-than-football.jpg"
          alt="Let's Play players presenting a cheque in support of Rebecca House, the Isle of Man's children's hospice"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative mx-auto max-w-4xl">
          <Reveal>
            <HeartHandshake
              aria-hidden
              className="mx-auto size-8 text-gold"
              strokeWidth={1.5}
            />
            <SectionHeading
              eyebrow="Giving Back"
              title="More than football."
              align="center"
              className="mt-5"
            />
            <div className="mx-auto -mt-4 max-w-2xl space-y-4 text-base leading-relaxed text-muted sm:text-center">
              <p>
                At Let&apos;s Play, we believe football is about more than
                what happens on the pitch. We are passionate about making a
                positive difference in our local community and giving every
                child the opportunity to enjoy the game.
              </p>
            </div>

            <div className="mx-auto mt-8 grid max-w-2xl gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-gold/30 bg-card p-5 text-center sm:text-left">
                <p className="font-display text-3xl font-bold text-gold">
                  £15,000+
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  Raised for local Isle of Man charities since 2024, with the
                  majority supporting Rebecca House, the Island&apos;s
                  children&apos;s hospice.
                </p>
              </div>
              <div className="rounded-lg border border-gold/30 bg-card p-5 text-center sm:text-left">
                <p className="font-display text-3xl font-bold text-gold">
                  Free Child Initiative
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  Launched in 2025 to break down financial barriers, giving
                  selected children from families facing financial
                  difficulties free access to our programmes and camps.
                </p>
              </div>
            </div>

            <div className="mx-auto mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-muted sm:text-center">
              <p>
                Our mission goes beyond developing better footballers. We
                want to build confidence, create opportunities, support local
                families and make a lasting difference to the lives of young
                people across the Isle of Man.
              </p>
              <p className="font-display text-xl font-bold uppercase tracking-wide text-white">
                Because at Let&apos;s Play, every child deserves the chance
                to learn, play and grow.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-pitch border-t border-border-subtle px-5 py-20 text-center sm:px-8 md:py-28">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-4xl font-bold uppercase tracking-wide text-white sm:text-5xl">
            Want to find out more?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            Explore our programmes or get in touch, we&apos;d love to hear
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
