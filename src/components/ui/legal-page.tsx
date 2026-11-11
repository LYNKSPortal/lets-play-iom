import { AlertTriangle } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";

export function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={`Last reviewed: ${updated}`} />
      <section className="px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 flex items-start gap-3 rounded-lg border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200">
            <AlertTriangle aria-hidden className="mt-0.5 size-5 shrink-0" />
            <p>
              This page is a structural draft prepared for the Let&apos;s Play
              website rebuild. It has not been approved by a legal
              professional and should be reviewed before the site goes live.
            </p>
          </div>
          <div className="prose-legal space-y-8 text-sm leading-relaxed text-muted [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:uppercase [&_h2]:tracking-wide [&_h2]:text-white [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
