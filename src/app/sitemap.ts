import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Indexable pages only; /portal is a placeholder and /climate redirects.
const pages: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/environments", priority: 0.9, changeFrequency: "monthly" },
  { path: "/lifestyle", priority: 0.9, changeFrequency: "monthly" },
  // Hidden for now — restore with the nav link in PrimaryNav.
  // { path: "/systems", priority: 0.8, changeFrequency: "monthly" },
  { path: "/process", priority: 0.7, changeFrequency: "yearly" },
  { path: "/enquire", priority: 0.8, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
