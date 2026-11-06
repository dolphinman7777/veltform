import type { MetadataRoute } from "next";
import { indexablePages, pageUrl } from "@/content/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // No lastModified: a build timestamp would claim every page changed on each deploy.
  return indexablePages.map(({ path, priority, changeFrequency }) => ({
    url: pageUrl(path),
    changeFrequency,
    priority,
  }));
}
