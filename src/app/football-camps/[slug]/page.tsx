import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, Tag, Users as UsersIcon } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { camps, getCamp, isPastCamp } from "@/lib/data/camps";
import { campFaqs } from "@/lib/data/faqs";
import { formatPrice, formatSessionDate } from "@/lib/utils";

export function generateStaticParams() {
  return camps.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const camp = getCamp(slug);
  if (!camp) return {};
  return {
    title: camp.name,
    description: camp.description,
    alternates: { canonical: `/football-camps/${camp.slug}` },
  };
}

export default async function CampDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const camp = getCamp(slug);
  if (!camp) notFound();

  const past = isPastCamp(camp);
  const canBook = camp.bookingEnabled && !past && camp.status !== "fully-booked";

  return (
    <>
      <PageHero eyebrow="Football Camp" title={camp.name}>
        <div className="mt-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Football Camps", href: "/football-camps" },
              { label: camp.name },
            ]}
          />
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <StatusBadge status={camp.status} />
          {past && (
            <span className="text-xs font-semibold uppercase tracking-widest text-muted">
              Archived, this camp has taken place
            </span>
          )}
        </div>
      </PageHero>

      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white">
                About This Camp
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted">
                {camp.description}
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-12">
              <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white">
                Session Dates
              </h2>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {camp.sessionDates.map((date) => (
                  <li
                    key={date}
                    className="flex items-center gap-2.5 rounded-lg border border-border-subtle bg-card px-4 py-3 text-sm text-white/85"
                  >
                    <CalendarDays aria-hidden className="size-4 shrink-0 text-gold" />
                    {formatSessionDate(date)}
                  </li>
                ))}
              </ul>
            </Reveal>

            {camp.whatToBring && camp.whatToBring.length > 0 && (
              <Reveal delay={0.15} className="mt-12">
                <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white">
                  What to Bring
                </h2>
                <ul className="mt-5 space-y-2 text-sm text-muted">
                  {camp.whatToBring.map((item) => (
                    <li key={item}>&bull; {item}</li>
                  ))}
                </ul>
              </Reveal>
            )}

            <Reveal delay={0.2} className="mt-12">
              <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white">
                Frequently Asked Questions
              </h2>
              <div className="mt-4">
                <FaqAccordion items={campFaqs} />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <aside className="sticky top-28 rounded-xl border border-border-subtle bg-card p-6">
              <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white">
                Camp Details
              </h2>
              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <CalendarDays aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" />
                  <div>
                    <dt className="text-muted">Duration</dt>
                    <dd className="text-white">{camp.days}-day camp</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Tag aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" />
                  <div>
                    <dt className="text-muted">Price</dt>
                    <dd className="text-white">{formatPrice(camp.pricePence)}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" />
                  <div>
                    <dt className="text-muted">Location</dt>
                    <dd className="text-white">
                      {camp.location ?? "Contact us for information"}
                    </dd>
                  </div>
                </div>
                {camp.yearGroups && (
                  <div className="flex items-start gap-3">
                    <UsersIcon aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" />
                    <div>
                      <dt className="text-muted">Age Eligibility</dt>
                      <dd className="text-white">{camp.yearGroups}</dd>
                    </div>
                  </div>
                )}
              </dl>

              <div className="mt-6 space-y-3">
                {past ? (
                  <p className="text-xs leading-relaxed text-muted">
                    This camp has already taken place and is shown for
                    reference only.
                  </p>
                ) : canBook ? (
                  <Button asChild size="lg" className="w-full">
                    <Link href={`/book/${camp.slug}`}>Book Now</Link>
                  </Button>
                ) : (
                  <>
                    <p className="text-xs leading-relaxed text-muted">
                      {camp.status === "fully-booked"
                        ? "This camp is fully booked. Join the waiting list and we'll contact you if a space opens up."
                        : "Booking for this camp isn't open yet. Get in touch to register your interest."}
                    </p>
                    <Button asChild size="lg" className="w-full">
                      <Link href="/contact?enquiry=Football%20Camps">
                        {camp.status === "fully-booked"
                          ? "Join Waiting List"
                          : "Enquire Now"}
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
