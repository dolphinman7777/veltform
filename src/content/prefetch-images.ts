import { environmentsMarkup } from "@/components/environments/environments-markup";
import { site } from "@/content/site";

/**
 * Every image used across the site, in the order a visitor is likely to need them.
 * Built on the server (the Environments markup is never shipped to the browser for this);
 * only the resulting URL list is passed to <ImagePrefetcher />.
 * Environments URLs keep their `?v=` hash so the prefetched copy is the one the page requests.
 */
export function prefetchImageUrls(): string[] {
  const home = [
    site.heroBackground,
    site.architecturalInfluencesImage,
    site.climateSystemsImage,
    ...site.scenarios.map((s) => s.homeImage),
    "/images/shared/strawberry.webp",
  ];
  const lifestyle = site.scenarios.map((s) => s.image);
  const environments = [...environmentsMarkup.matchAll(/src="(\/images\/[^"]+)"/g)].map((m) => m[1]);

  return [...new Set([...home, ...lifestyle, ...environments])];
}
