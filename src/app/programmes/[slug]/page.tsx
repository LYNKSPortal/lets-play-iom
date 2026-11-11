import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Calendar, Tag, Users as UsersIcon } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { getProgramme, programmes } from "@/lib/data/programmes";
import { programmeFaqs } from "@/lib/data/faqs";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return programmes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const programme = getProgramme(slug);
  if (!programme) return {};
  return {
    title: programme.name,
    description: programme.description,
    alternates: { canonical: `/programmes/${programme.slug}` },
  };
}

export default async function ProgrammeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const programme = getProgramme(slug);
  if (!programme) notFound();

  const faqs = programmeFaqs[programme.slug] ?? [];

  return (
    <>
      <PageHero eyebrow={programme.category} title={programme.name}>
        <div className="mt-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Programmes", href: "/programmes" },
              { label: programme.name },
            ]}
          />
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <StatusBadge status={programme.status} />
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border-subtle bg-card px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted">
            {programme.accessType === "invite-only" ? "Invite Only" : "Open Access"}
          </span>
          {programme.yearGroups && (
            <span className="inline-flex items-center gap-1.5 text-sm text-muted">
              <UsersIcon aria-hidden className="size-4 text-gold" />
              {programme.yearGroups}
            </span>
          )}
        </div>
      </PageHero>

      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white">
                Overview
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
                {programme.longDescription.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-12">
              <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white">
                Benefits
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {programme.benefits.map((b) => (
                  <li
                    key={b}
                    className="rounded-lg border border-border-subtle bg-card p-4 text-sm leading-relaxed text-white/85"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>

            {faqs.length > 0 && (
              <Reveal delay={0.2} className="mt-12">
                <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white">
                  Frequently Asked Questions
                </h2>
                <div className="mt-4">
                  <FaqAccordion items={faqs} />
                </div>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.1}>
            <aside className="sticky top-28 rounded-xl border border-border-subtle bg-card p-6">
              <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white">
                Session Details
              </h2>
              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Calendar aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" />
                  <div>
                    <dt className="text-muted">Sessions</dt>
                    <dd className="text-white">
                      {programme.sessionInfo ?? "Details coming soon"}
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" />
                  <div>
                    <dt className="text-muted">Location</dt>
                    <dd className="text-white">
                      {programme.location ?? "Contact us for information"}
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Tag aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" />
                  <div>
                    <dt className="text-muted">Pricing</dt>
                    <dd className="text-white">
                      {programme.price ?? "Contact us for information"}
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-6 space-y-3">
                {programme.accessType === "invite-only" ? (
                  <>
                    <p className="text-xs leading-relaxed text-muted">
                      This programme is by invite only. Get in touch to find
                      out more about the Gold pathway for your child.
                    </p>
                    <Button asChild size="lg" className="w-full">
                      <Link href={`/contact?enquiry=${encodeURIComponent("Football Programmes")}`}>
                        Ask About Gold Programmes
                      </Link>
                    </Button>
                  </>
                ) : programme.status === "fully-booked" ? (
                  <>
                    <p className="text-xs leading-relaxed text-muted">
                      This programme is currently fully booked. Enquire to
                      join the waiting list.
                    </p>
                    <Button asChild size="lg" className="w-full">
                      <Link href={`/contact?enquiry=${encodeURIComponent("Football Programmes")}`}>
                        Join Waiting List
                      </Link>
                    </Button>
                  </>
                ) : (
                  <Button asChild size="lg" className="w-full">
                    <Link href={`/register/${programme.slug}`}>
                      Register Now
                    </Link>
                  </Button>
                )}
                <Button asChild variant="secondary" size="lg" className="w-full">
                  <a href={`mailto:${siteConfig.email}`}>Email Us</a>
                </Button>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
