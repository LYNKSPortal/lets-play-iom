import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { Skeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Let's Play — football programmes and camps on the Isle of Man. Email, call, or send us a message.",
  alternates: { canonical: "/contact" },
};

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phone,
    href: siteConfig.phoneHref,
  },
  {
    icon: MapPin,
    label: "Location",
    value: siteConfig.location,
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk football."
        description="Questions about our programmes, camps, or a booking? Reach out — we're happy to help."
      />

      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
              Get in touch
            </h2>
            <ul className="mt-6 space-y-5">
              {contactDetails.map((item) => (
                <li key={item.label} className="flex items-start gap-3.5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border-subtle bg-card">
                    <item.icon aria-hidden className="size-4.5 text-gold" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-base text-white transition-colors hover:text-gold"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-base text-white">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <Suspense fallback={<Skeleton className="h-96 w-full rounded-xl" />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
