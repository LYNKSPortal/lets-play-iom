import { siteConfig } from "@/config/site";
import type { FaqItem } from "@/types";

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Organization / SportsActivityLocation structured data using only verified
 * facts (name, url, logo, contact details, social profiles). No address,
 * ratings, or reviews are included since they have not been verified.
 */
export function OrganizationJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "SportsActivityLocation",
        "@id": `${siteConfig.domain}/#organization`,
        name: "Let's Play Football Development Centre",
        alternateName: "Let's Play",
        url: siteConfig.domain,
        logo: `${siteConfig.domain}${siteConfig.logo}`,
        image: `${siteConfig.domain}${siteConfig.logo}`,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Isle of Man",
        },
        description: siteConfig.description,
        sameAs: [siteConfig.facebookUrl, siteConfig.instagramUrl],
      }}
    />
  );
}

/** Site-level WebSite entity, linked to the Organization above. */
export function WebsiteJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteConfig.domain}/#website`,
        url: siteConfig.domain,
        name: "Let's Play Football Development Centre",
        publisher: { "@id": `${siteConfig.domain}/#organization` },
        inLanguage: "en-GB",
      }}
    />
  );
}

/** Breadcrumb structured data for sub-pages, improving how Google renders search result paths. */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { label: string; path: string }[];
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.label,
          item: `${siteConfig.domain}${item.path}`,
        })),
      }}
    />
  );
}

/** FAQPage structured data, enabling FAQ rich results in Google for pages that answer common questions. */
export function FaqJsonLd({ faqs }: { faqs: FaqItem[] }) {
  if (faqs.length === 0) return null;
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }}
    />
  );
}
