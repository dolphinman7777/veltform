import { avifSrc } from "@/components/AvifImage";
import { site } from "@/content/site";

export type PrefetchImage = { src: string; avif?: string };

/**
 * Home and Lifestyle images, in the order a visitor is likely to need them.
 * Environments is left out: it loads its own images as it opens, and warming them here
 * cost every first-time visitor about 8 MB whether or not they went there.
 * Built on the server; only the resulting list is passed to <ImagePrefetcher />.
 */
export function prefetchImages(): PrefetchImage[] {
  const pictures = [
    site.heroBackground,
    site.architecturalInfluencesImage,
    site.climateSystemsImage,
    ...site.scenarios.map((s) => s.homeImage),
    ...site.scenarios.map((s) => s.image),
  ];

  return [{ src: site.logo }, ...pictures.map((src) => ({ src, avif: avifSrc(src) }))];
}
