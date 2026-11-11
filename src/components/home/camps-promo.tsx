import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays } from "lucide-react";
import { upcomingCamps } from "@/lib/data/camps";
import { formatDateRange, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function CampsPromo() {
  const nextCamp = upcomingCamps()[0];

  return (
    <section className="px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <div className="relative aspect-4/3 overflow-hidden rounded-xl border border-border-subtle">
            <Image
              src="/Football-Friends-Fun.jpg"
              alt="Let's Play team celebrating together at a football camp on the Isle of Man"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Football Camps"
            title="Football. Friends. Fun."
            className="mb-0"
          />
          <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
            Make the most of the school holidays with exciting football camps
            designed to keep young players active, engaged, and developing
            their skills.
          </p>
          {nextCamp ? (
            <div className="mt-8 rounded-xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                  Next Camp
                </p>
                <StatusBadge status={nextCamp.status} />
              </div>
              <p className="mt-3 font-display text-xl font-bold uppercase tracking-wide text-white">
                {nextCamp.name}
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                <CalendarDays aria-hidden className="size-4 text-gold" />
                {formatDateRange(nextCamp.sessionDates)} &middot;{" "}
                {formatPrice(nextCamp.pricePence)}
              </p>
              <Link
                href={`/football-camps/${nextCamp.slug}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-hover"
              >
                View camp details
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          ) : (
            <p className="mt-8 rounded-xl border border-dashed border-border px-5 py-4 text-sm text-muted">
              New camp dates are announced soon, check back or contact us to
              join the waiting list.
            </p>
          )}
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/football-camps">Explore Football Camps</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
