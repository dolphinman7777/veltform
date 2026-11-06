import { consultationTopics } from "@/app/enquire/topics";
import { llmsCopy } from "@/content/llms-copy";
import { indexablePages, pageUrl, sentenceCase } from "@/content/seo";
import { site, type LifestyleScenarioDetailCopy } from "@/content/site";

export const dynamic = "force-static";

function detailText(copy: LifestyleScenarioDetailCopy) {
  if (typeof copy === "string") return copy;
  if ("items" in copy) {
    return copy.items
      .map((item) =>
        typeof item === "string"
          ? item
          : item.segments.map((segment) => (typeof segment === "string" ? segment : segment.text)).join(""),
      )
      .join("; ");
  }
  return copy.paragraphs.join(" ");
}

function bullets(items: readonly string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

/** Plain-language summary for AI tools (llmstxt.org): site copy plus the extra detail in llms-copy.ts. */
export function GET() {
  const { city, country } = site.location;

  const body = [
    `# ${site.displayName}`,
    `> ${site.seo.home.description}`,
    `${llmsCopy.brandLine} Based in ${city}, ${country}.`,
    "## Pages",
    indexablePages
      .map(({ key, path }) => `- [${site.seo[key].title}](${pageUrl(path)}): ${site.seo[key].description}`)
      .join("\n"),
    "## Greenhouse systems",
    site.scenarios
      .map(({ id, title, body: summary, slide, details }) =>
        [
          `### ${sentenceCase(title)}`,
          `${slide.tagline} ${summary}`,
          ...slide.paragraphs,
          ...(llmsCopy.scenarioExtras[id] ?? []),
          bullets([
            `Focus: ${detailText(details.focus)}`,
            `Climates: ${detailText(details.climateTypes)}`,
            `Plants: ${detailText(details.cropTypes)}`,
          ]),
        ].join("\n\n"),
      )
      .join("\n\n"),
    "## Services",
    site.servicesIntro,
    bullets(
      site.services
        .flatMap((service) => (service.id === "irrigation" ? [service, llmsCopy.pestManagement] : [service]))
        .map(({ title, body: detail }) => `${title}: ${detail}`),
    ),
    "## Materials and growing systems",
    site.materialsIntro,
    bullets(
      site.offerings.map((offering) =>
        offering.kind === "list"
          ? `${offering.title}: ${offering.items.join("; ")}`
          : `${offering.title}: ${offering.body}`,
      ),
    ),
    "## Essential plant growth concepts",
    bullets(llmsCopy.growthConcepts.map(({ title, body: detail }) => `${title}: ${detail}`)),
    "## Climate steering",
    llmsCopy.climateSteering.intro,
    bullets(llmsCopy.climateSteering.levers),
    "## How a project works",
    llmsCopy.process.map(({ title, body: detail }, index) => `${index + 1}. ${title}: ${detail}`).join("\n"),
    "## Pricing",
    llmsCopy.pricing,
    "## Warranty",
    bullets(llmsCopy.warranty),
    "## What makes a greenhouse",
    ...llmsCopy.whatMakesAGreenhouse,
    "## A climate of your own",
    ...llmsCopy.aClimateOfYourOwn,
    "## Community projects",
    llmsCopy.community,
    "## Contact",
    bullets([
      `Location: ${city}, ${country}`,
      `Email: ${site.contactEmail}`,
      `Enquiry form: ${pageUrl("/enquire")} (name, email, area, consultation topic and a note)`,
      `Consultation topics: ${consultationTopics.join(", ")}`,
    ]),
    llmsCopy.enquiryDetails,
  ].join("\n\n");

  return new Response(`${body}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
