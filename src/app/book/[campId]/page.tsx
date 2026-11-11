import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { BookingForm } from "@/components/booking/booking-form";
import { getCamp, isPastCamp } from "@/lib/data/camps";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ campId: string }>;
}): Promise<Metadata> {
  const { campId } = await params;
  const camp = getCamp(campId);
  return {
    title: camp ? `Book — ${camp.name}` : "Book a Camp",
    robots: { index: false, follow: false },
  };
}

export default async function BookCampPage({
  params,
}: {
  params: Promise<{ campId: string }>;
}) {
  const { campId } = await params;
  const camp = getCamp(campId);

  if (!camp) notFound();

  const past = isPastCamp(camp);
  const bookable = camp.bookingEnabled && !past && camp.status !== "fully-booked";

  return (
    <>
      <PageHero eyebrow="Book a Camp" title="Booking">
        <div className="mt-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Football Camps", href: "/football-camps" },
              { label: camp.name, href: `/football-camps/${camp.slug}` },
              { label: "Book" },
            ]}
          />
        </div>
      </PageHero>

      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-2xl">
          {bookable ? (
            <BookingForm camp={camp} />
          ) : (
            <EmptyState
              title="Booking isn't available for this camp"
              description={
                past
                  ? "This camp has already taken place."
                  : camp.status === "fully-booked"
                    ? "This camp is fully booked. Contact us to join the waiting list."
                    : "Booking for this camp hasn't opened yet. Contact us to register your interest."
              }
              action={
                <Button asChild>
                  <Link href={`/football-camps/${camp.slug}`}>
                    Back to Camp Details
                  </Link>
                </Button>
              }
            />
          )}
        </div>
      </section>
    </>
  );
}
