import type { Metadata } from "next";
import { site } from "@/content/site";

type SeoKey = keyof typeof site.seo;

export const shareImage = {
  url: "/og/veldform-share.jpg",
  width: 1200,
  height: 630,
  alt: "A timber and glass Veldform botanical pavilion on a coastal terrace at sunset.",
};

export const ogLocale = "en_ZA";

/** Indexable pages, shared by sitemap.xml and llms.txt. /portal is a placeholder and /climate redirects. */
export const indexablePages: {
  key: SeoKey;
  path: string;
  priority: number;
  changeFrequency: "monthly" | "yearly";
}[] = [
  { key: "home", path: "/", priority: 1, changeFrequency: "monthly" },
  { key: "environments", path: "/environments", priority: 0.9, changeFrequency: "monthly" },
  { key: "lifestyle", path: "/lifestyle", priority: 0.9, changeFrequency: "monthly" },
  // Hidden for now — restore with the nav link in PrimaryNav.
  // { key: "systems", path: "/systems", priority: 0.8, changeFrequency: "monthly" },
  { key: "process", path: "/process", priority: 0.7, changeFrequency: "yearly" },
  { key: "faq", path: "/faq", priority: 0.7, changeFrequency: "yearly" },
  { key: "enquire", path: "/enquire", priority: 0.8, changeFrequency: "yearly" },
];

export function pageUrl(path: string) {
  return `${site.url}${path === "/" ? "" : path}`;
}

/** Site copy is often lowercase by design; structured data and llms.txt read better with a capital. */
export function sentenceCase(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Title, description, canonical URL and share tags for one indexable page.
 * Child `openGraph`/`twitter` objects replace the layout's rather than merging, so every field is set here.
 */
export function pageMetadata(key: SeoKey, path: string): Metadata {
  const { title, description } = site.seo[key];
  return {
    // Brand-led titles bypass the layout's "%s | Veldform" template.
    title: { absolute: key === "home" ? title : `${title} | ${site.displayName}` },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.displayName,
      locale: ogLocale,
      title,
      description,
      url: path,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage.url],
    },
  };
}
