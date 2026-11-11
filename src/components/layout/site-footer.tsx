import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { mainNav, siteConfig } from "@/config/site";
import { CurrentYear } from "@/components/layout/current-year";

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Safeguarding", href: "/safeguarding" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border-subtle bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Image
              src={siteConfig.logo}
              alt="Let's Play Football Development Centre"
              width={56}
              height={48}
              className="h-14 w-auto"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Supporting the next generation of footballers on the Isle of Man.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-2.5">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Contact
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <Mail aria-hidden className="size-4 text-gold" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <Phone aria-hidden className="size-4 text-gold" />
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin aria-hidden className="size-4 text-gold" />
                {siteConfig.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-border-subtle pt-7 md:flex-row md:items-center">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs text-muted transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted">
            &copy; <CurrentYear /> Let&apos;s Play. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
