import { site } from "@/content/site";

export function ThesisIntro() {
  return (
    <div className="signal-content thesis-intro">
      <h2 className="signal-headline mono">
        <span className="signal-headline-line">
          <span className="signal-mint">smart</span> systems manage the{" "}
          <span className="signal-mint">science</span>
        </span>
        <span className="signal-headline-line">so you don&apos;t have to</span>
      </h2>
      <p className="signal-support mono">{site.thesisSupport}</p>
    </div>
  );
}
