import { site } from "@/content/site";

export function SensorsIntroHeadline() {
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
