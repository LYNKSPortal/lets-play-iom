import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/**
 * Builds full page metadata (title, description, canonical, Open Graph,
 * Twitter Card) from a single source per page. Next.js does not merge a
 * page's `title`/`description` into the root layout's `openGraph`/`twitter`
 * objects automatically, so without this every page would show the
 * homepage's preview when shared on social media or messaging apps.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = "/meta-og-image.jpg",
  imageWidth = 1000,
  imageHeight = 1000,
  imageAlt = "Let's Play Football Development Centre",
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.domain}${path}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title,
      description,
      url,
      siteName: "Let's Play Football Development Centre",
      type: "website",
      locale: "en_GB",
      images: [{ url: image, width: imageWidth, height: imageHeight, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
