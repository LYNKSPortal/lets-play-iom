import type { Metadata, Viewport } from "next";
import { Manrope, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/json-ld";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: "Let's Play | Football Development Centre, Isle of Man",
    template: "%s | Let's Play, Isle of Man Football Development",
  },
  description:
    "After-school football programmes and school-holiday football camps for young players on the Isle of Man. Kids' football coaching focused on skills, confidence and fun.",
  applicationName: "Let's Play",
  category: "Sports",
  keywords: [
    "Isle of Man football coaching",
    "kids football Isle of Man",
    "children's football programmes",
    "Isle of Man football camps",
    "after-school football Isle of Man",
    "youth football development",
    "football camps Isle of Man",
    "Let's Play IOM",
  ],
  authors: [{ name: "Let's Play" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteConfig.domain,
    siteName: "Let's Play Football Development Centre",
    title: "Let's Play | Football Development Centre, Isle of Man",
    description: siteConfig.description,
    images: [
      {
        url: "/images/lets-play-logo.png",
        width: 1200,
        height: 1027,
        alt: "Let's Play Football Development Centre logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Let's Play | Football Development Centre, Isle of Man",
    description: siteConfig.description,
    images: ["/images/lets-play-logo.png"],
  },
  manifest: "/site.webmanifest",
  robots: {
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
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      className={`${manrope.variable} ${barlowCondensed.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-black"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
