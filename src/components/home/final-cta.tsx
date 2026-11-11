import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function FinalCta() {
  return (
    <section className="bg-pitch relative overflow-hidden border-t border-border-subtle px-5 py-24 sm:px-8 md:py-32">
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/50 to-transparent"
      />
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="font-display text-5xl font-bold uppercase leading-[0.9] tracking-wide text-white sm:text-6xl md:text-7xl">
            Ready to get <span className="text-gold">started?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Join the Let&apos;s Play community and help your young footballer
            take their next step.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/programmes">View Programmes</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
