import { site } from "@/content/site";

type SensorsIntroHeadlineProps = {
  variant?: "band" | "hero";
};

export function SensorsIntroHeadline({ variant = "band" }: SensorsIntroHeadlineProps) {
  if (variant === "hero") {
    return (
      <div className="veld-sensors-intro-hero-copy">
        <h2 className="mono">
          <span className="signal-mint">{site.sensorsHighlight}</span>
          <br />
          {site.sensorsHeadline}
        </h2>
      </div>
    );
  }

  return (
    <div className="veld-sensors-intro-rhythm">
      <div className="veld-sensors-intro-head">
        <h2 className="mono">
          <span className="signal-mint">{site.sensorsHighlight}</span>
        </h2>
      </div>
      <div className="veld-sensors-intro-rhythm__spacer" aria-hidden="true" />
      <p className="veld-sensors-intro-subline mono data-headline-line">{site.sensorsHeadline}</p>
    </div>
  );
}
