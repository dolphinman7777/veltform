import { LifestyleScenarioDetails } from "@/components/home/LifestyleScenarioCard";
import type { LifestyleScenario } from "@/content/site";
import { site } from "@/content/site";

const LIFESTYLE_ART_WIDTH = 2617;
const LIFESTYLE_ART_HEIGHT = 1397;

export function LifestyleSlide({ scenario }: { scenario: LifestyleScenario }) {
  return (
    <section
      className="veld-lifestyle-slide"
      id={scenario.id}
      aria-labelledby={`${scenario.id}-title`}
    >
      <figure className="veld-lifestyle-slide__frame">
        <img
          className="veld-lifestyle-slide__image"
          src={scenario.image}
          alt=""
          width={LIFESTYLE_ART_WIDTH}
          height={LIFESTYLE_ART_HEIGHT}
          decoding="async"
        />
        <div className="veld-lifestyle-slide__copy">
          <p className="veld-lifestyle-slide__eyebrow mono">{site.lifestyleSlideEyebrow}</p>
          <h2 className="veld-lifestyle-slide__title brand-natural" id={`${scenario.id}-title`}>
            {scenario.title}
          </h2>
          <p className="veld-lifestyle-slide__tagline">{scenario.slide.tagline}</p>
          <div className="veld-lifestyle-slide__body">
            {scenario.slide.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="veld-lifestyle-slide__details">
            <LifestyleScenarioDetails scenario={scenario} includeFocus={false} />
          </div>
        </div>
      </figure>
    </section>
  );
}
