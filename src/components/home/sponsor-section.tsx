import { ExternalLink, Phone } from "lucide-react";
import { sponsor } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export function SponsorSection() {
  return (
    <section className="border-t border-border-subtle bg-surface px-5 py-20 sm:px-8 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <SectionHeading
            eyebrow="Our Sponsor"
            title={`Proudly supported by ${sponsor.name}.`}
            align="center"
          />
          <p className="mx-auto -mt-4 max-w-2xl text-base leading-relaxed text-muted">
            {sponsor.description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="secondary">
              <a href={sponsor.website} target="_blank" rel="noopener noreferrer">
                Visit Website
                <ExternalLink aria-hidden className="size-4" />
              </a>
            </Button>
            <Button asChild variant="ghost">
              <a href="tel:+441624627692">
                <Phone aria-hidden className="size-4 text-gold" />
                {sponsor.phone}
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
