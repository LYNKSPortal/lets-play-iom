"use client";

import { usePathname } from "next/navigation";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

/**
 * Routes that are fully standalone: no header, nav, footer, or any other
 * link back into the rest of the site. Used for private, unlisted forms
 * that are handed out directly and must not connect to anything else.
 */
const standaloneRoutes = ["/signup"];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandalone = standaloneRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isStandalone) {
    return (
      <main id="main-content" className="flex-1">
        {children}
      </main>
    );
  }

  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
