import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const disallow = [
  "/api/",
  "/book/",
  "/register/",
  "/join/",
  "/lets-play-registration-form",
  "/lets-play-football-camp-form",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      // Explicit allowances for AI assistant and answer-engine crawlers, so
      // Let's Play's own content (not a stale cache) is what they read.
      { userAgent: "GPTBot", allow: "/", disallow },
      { userAgent: "ChatGPT-User", allow: "/", disallow },
      { userAgent: "OAI-SearchBot", allow: "/", disallow },
      { userAgent: "ClaudeBot", allow: "/", disallow },
      { userAgent: "Claude-Web", allow: "/", disallow },
      { userAgent: "anthropic-ai", allow: "/", disallow },
      { userAgent: "PerplexityBot", allow: "/", disallow },
      { userAgent: "Google-Extended", allow: "/", disallow },
      { userAgent: "Applebot-Extended", allow: "/", disallow },
      { userAgent: "Bingbot", allow: "/", disallow },
    ],
    sitemap: `${siteConfig.domain}/sitemap.xml`,
  };
}
