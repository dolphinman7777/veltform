import type { Metadata } from "next";
import { site } from "@/content/site";

type SeoKey = keyof typeof site.seo;

export const shareImage = {
  url: "/og/veldform-share.jpg",
  width: 1200,
  height: 630,
  alt: "A timber and glass Veldform botanical pavilion on a coastal terrace at sunset.",
};

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
      locale: "en_GB",
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
