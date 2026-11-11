import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { programmes } from "@/lib/data/programmes";
import { camps } from "@/lib/data/camps";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.domain;
  const staticRoutes = [
    "",
    "/programmes",
    "/register",
    "/football-camps",
    "/coaches",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/safeguarding",
  ];

  const programmeRoutes = programmes
    .filter((p) => p.published)
    .map((p) => `/programmes/${p.slug}`);

  const campRoutes = camps
    .filter((c) => c.published)
    .map((c) => `/football-camps/${c.slug}`);

  const all = [...staticRoutes, ...programmeRoutes, ...campRoutes];

  return all.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
