import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { HeroVideo } from "@/components/home/hero-video";

export function Hero() {
  return (
    <section className="bg-pitch relative flex min-h-[125svh] items-center overflow-hidden bg-black sm:min-h-[100svh]">
      {/* Cinematic hero video of young footballers training */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <HeroVideo />
        <div className="absolute inset-0 bg-black/30 sm:bg-black/45" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent sm:h-40" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-36 sm:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold sm:text-sm">
            Isle of Man Football Development
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-6xl font-bold uppercase leading-[0.85] tracking-wide text-white sm:text-7xl md:text-8xl lg:text-9xl">
            Where young players <span className="text-gold">grow.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Helping young footballers build confidence, develop their skills,
            make friends, and enjoy the beautiful game.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg">
              <Link href="/programmes">Explore Our Programmes</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/football-camps">View Football Camps</Link>
            </Button>
          </div>
        </Reveal>
      </div>

      <a
        href="#welcome"
        aria-label="Scroll to next section"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-muted transition-colors hover:text-gold md:flex"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">
          Scroll
        </span>
        <ChevronDown aria-hidden className="size-4 animate-bounce" />
      </a>
    </section>
  );
}
