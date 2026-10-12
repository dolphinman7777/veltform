import {
  LifestyleScenarioDetails,
  LifestyleScenarioVisual,
} from "@/components/home/LifestyleScenarioCard";
import { site } from "@/content/site";

export function LifestyleSection() {
  return (
    <section className="veld-section veld-lifestyle" id="lifestyle">
      <div className="veld-section-head veld-section-head--display veld-slide-intro">
        <div className="veld-slide-intro-copy">
          <h2 className="mono">
            <span className="signal-mint">lifestyle</span>
          </h2>
          <p>{site.lifestyleIntro}</p>
        </div>
      </div>
      <div className="veld-lifestyle-stage">
        <div className="veld-lifestyle-cards">
          {site.scenarios.map((scenario) => (
            <LifestyleScenarioVisual key={scenario.id} scenario={scenario} />
          ))}
        </div>
        <div className="veld-lifestyle-details-row">
          {site.scenarios.map((scenario) => (
            <LifestyleScenarioDetails key={scenario.id} scenario={scenario} />
          ))}
        </div>
      </div>
    </section>
  );
}
