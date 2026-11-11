import Image from "next/image";
import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const highlights = [
  "Skill development through structured, enjoyable sessions",
  "Confidence that grows on and off the pitch",
  "Teamwork and friendships built through the game",
  "Fun-first football in a supportive environment",
];

export function Welcome() {
  return (
    <section id="welcome" className="px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Welcome to Let's Play"
            title="More than just football."
            className="mb-0"
          />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted md:text-lg">
            <p>
              We are the Isle of Man&apos;s leading football development
              centre for boys and girls, providing after-school football
              programmes and exciting school-holiday camps for young
              players.
            </p>
            <p>
              Our sessions are designed to nurture talent, improve skills and
              foster a real love for the beautiful game — in a fun, supportive
              environment where every young footballer can shine. Over 150
              children currently take part in our weekly programmes.
            </p>
          </div>
          <ul className="mt-8 space-y-3.5">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-white/85">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
                  <Check aria-hidden className="size-3 text-gold" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="bg-pitch relative overflow-hidden rounded-xl border border-border-subtle">
            <Image
              src="/images/easter-camp.png"
              alt="Let's Play gold football mark"
              width={900}
              height={684}
              className="mx-auto h-auto w-full max-w-md p-14 opacity-90 md:p-20"
            />
            <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-gold/30 bg-black/70 px-5 py-4 backdrop-blur-sm sm:left-auto sm:right-5 sm:w-56">
              <p className="font-display text-4xl font-bold text-gold">150+</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/80">
                Children taking part in our weekly programmes
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
