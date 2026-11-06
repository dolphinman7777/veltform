import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // /portal stays crawlable so Google can read its noindex tag; it is simply left out of the sitemap.
    // Every AI crawler is welcome on purpose, because being cited needs search and user-triggered access.
    // To opt out of model training only, add a disallow group for GPTBot, ClaudeBot and Google-Extended.
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
