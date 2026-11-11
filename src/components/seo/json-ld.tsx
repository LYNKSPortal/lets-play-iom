import { siteConfig } from "@/config/site";

/**
 * Organization structured data using only verified facts (name, url, logo,
 * contact details). No address, ratings, or reviews are included since they
 * have not been verified.
 */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "Let's Play Football Development Centre",
    url: siteConfig.domain,
    logo: `${siteConfig.domain}${siteConfig.logo}`,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    areaServed: "Isle of Man",
    description: siteConfig.description,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
