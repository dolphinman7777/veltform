import { site } from "@/content/site";

export function ThesisIntro() {
  return (
    <div className="signal-content thesis-intro">
      <h2 className="signal-headline mono">
        <span className="signal-headline-line">
          grow <span className="signal-mint">more of the year</span>,
        </span>
        <span className="signal-headline-line">
          in a greenhouse built for <span className="signal-mint">your site and your crops</span>.
        </span>
      </h2>
      <p className="signal-support mono">{site.thesisSupport}</p>
    </div>
  );
}
