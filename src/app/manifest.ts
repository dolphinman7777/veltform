import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.displayName} — ${site.tagline}`,
    short_name: site.displayName,
    description: site.seo.home.description,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#DED7C8",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
