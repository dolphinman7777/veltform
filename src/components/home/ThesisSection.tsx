import type { CSSProperties } from "react";
import { RootCalculations } from "@/components/home/RootCalculations";
import { site } from "@/content/site";

export function ThesisSection() {
  return (
    <section className="signal-slide" id="approach">
      <img
        className="signal-botanical"
        src="/images/hero/king-protea.png"
        alt=""
        width={1024}
        height={1024}
        decoding="async"
      />
      <div className="signal-content">
        <h2 className="signal-headline mono">
          <span className="signal-headline-line">
            grow <span className="signal-mint">more of the year</span>,
          </span>
          <span className="signal-headline-line">
            in a greenhouse built for <span className="signal-mint">your site and your crops</span>.
          </span>
        </h2>
        <p className="mono" style={{ marginTop: "1.25rem", fontSize: "0.72rem", color: "var(--sage)", maxWidth: "36rem", lineHeight: 1.65 }}>
          {site.thesisSupport}
        </p>
      </div>

      <div className="signal-stage">
        <div className="signal-trace-wrap">
          <svg className="signal-trace" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path
              className="signal-path"
              d="M 5 86 L 5 58 Q 5 54 9 54 L 52 54 Q 56 54 56 50 L 56 36 Q 56 32 60 32 L 93 32"
            />
            <line className="signal-drop" x1="17" y1="54" x2="17" y2="36" />
            <line className="signal-drop" x1="31" y1="54" x2="31" y2="18" />
            <line className="signal-drop" x1="45" y1="54" x2="45" y2="42" />
            <line className="signal-drop" x1="84" y1="32" x2="84" y2="46" />
            <line className="signal-branch signal-branch--light" pathLength="1" x1="17" y1="54" x2="17" y2="36" />
            <line className="signal-branch signal-branch--temp" pathLength="1" x1="31" y1="54" x2="31" y2="18" />
            <line className="signal-branch signal-branch--vpd" pathLength="1" x1="45" y1="54" x2="45" y2="42" />
            <line className="signal-branch signal-branch--root" pathLength="1" x1="84" y1="32" x2="84" y2="46" />
          </svg>

          <span className="signal-traveler" aria-hidden="true" />

          <div className="signal-nodes">
            <div className="signal-node signal-node--light" style={{ "--x": "17%", "--y": "54%", "--ry": "36%" } as CSSProperties}>
              <span className="signal-readout mono">LIGHT</span>
              <span className="signal-sensor" aria-hidden="true" />
              <span className="signal-node-caption mono">photosynthesis · DLI</span>
            </div>
            <div className="signal-node signal-node--temp" style={{ "--x": "31%", "--y": "54%", "--ry": "18%" } as CSSProperties}>
              <span className="signal-readout mono">TEMP</span>
              <span className="signal-sensor" aria-hidden="true" />
              <span className="signal-node-caption mono">season · setpoints</span>
            </div>
            <div className="signal-node signal-node--vpd" style={{ "--x": "45%", "--y": "54%", "--ry": "42%" } as CSSProperties}>
              <span className="signal-readout mono">VPD</span>
              <span className="signal-sensor" aria-hidden="true" />
              <span className="signal-node-caption mono">humidity · transpiration</span>
            </div>
            <div
              className="signal-node signal-node--root signal-node--readout-below"
              style={{ "--x": "84%", "--y": "32%", "--ry": "47%", "--cy": "53%" } as CSSProperties}
            >
              <span className="signal-sensor" aria-hidden="true" />
              <span className="signal-readout mono">ROOT</span>
              <RootCalculations />
            </div>
          </div>
        </div>
      </div>

      <div className="signal-footer">
        <p className="signal-url mono">
          <span className="brand-natural">{site.name}</span>
        </p>
      </div>
    </section>
  );
}
