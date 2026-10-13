import { LifestyleSlide } from "@/components/home/LifestyleSlide";
import { site } from "@/content/site";

export function LifestyleSection() {
  return (
    <div className="veld-lifestyle" id="lifestyle">
      {site.scenarios.map((scenario) => (
        <LifestyleSlide key={scenario.id} scenario={scenario} />
      ))}
    </div>
  );
}
