"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { site } from "@/content/site";
import { SensorReadouts } from "@/components/SensorReadouts";

function specLines(offering: (typeof site.offerings)[number]) {
  switch (offering.kind) {
    case "copy":
      return offering.body.split(/(?<=\.)\s+/).filter(Boolean);
    case "list":
      return [...offering.items];
    default: {
      const unreachable: never = offering;
      return unreachable;
    }
  }
}

function OfferingSpec({ offering }: { offering: (typeof site.offerings)[number] }) {
  const lines = specLines(offering);

  return (
    <>
      <div className="eos-software-grid grid-usage-frame">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <use href="/eden-grid-usage.svg#gu-04" />
        </svg>
      </div>
      <div className="eos-software-rule" aria-hidden="true" />
      <div className="eos-software-code">
        <div className="eos-code-bar">
          <span className="eos-filename mono">{offering.title}</span>
          <span className="eos-live mono">[SPEC/Y]</span>
        </div>
        <div className="eos-code mono">
          {lines.map((line, index) => (
            <p key={`${offering.id}-${index}`} className="eos-spec-line">
              <span className="ln">{String(index + 1).padStart(2, "0")}</span>
              {line}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}

export function MaterialsSection() {
  const [active, setActive] = useState(0);
  const offering = site.offerings[active];

  return (
    <section className="eden-os-slide" id="materials">
      <SensorReadouts />

      <h2 className="eos-headline mono">
        <span className="pool-mint">materials</span> and growing systems
      </h2>

      <div className="eos-split">
        <div className="eos-demo">
          <p className="eos-land-meta eos-land-meta--tl mono">wooden frame</p>
          <p className="eos-land-meta eos-land-meta--br mono">site light</p>

          <svg className="eos-wires" viewBox="0 0 900 520" preserveAspectRatio="none" aria-hidden="true">
            <line x1="520" y1="420" x2="780" y2="480" />
            <circle cx="520" cy="420" r="2.5" />
          </svg>

          <span className="data-marker eos-node" style={{ "--x": "88%", "--y": "92%" } as CSSProperties} aria-hidden="true" />
          <span className="data-pip mono eos-pip" style={{ "--x": "92%", "--y": "88%" } as CSSProperties}>
            RH <em data-readout="rh">67.2</em>%
          </span>

          <figure className="eos-software grid-usage-cell">
            <header className="eos-software-head mono">
              <span>Specification</span>
              <span className="brand-natural">{site.name}</span>
            </header>
            <div className="eos-software-frame">
              <OfferingSpec offering={offering} />
            </div>
          </figure>
        </div>

        <aside className="eos-sidebar">
          <nav className="eos-sidebar-nav velt-eos-nav" aria-label="Materials and growing systems">
            {site.offerings.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={index === active ? "eos-side-item is-active mono" : "eos-side-item mono"}
                onClick={() => setActive(index)}
              >
                {item.title}
              </button>
            ))}
          </nav>

          <div className="eos-side-icons" aria-hidden="true">
            <div className="data-type-cell">
              <svg viewBox="0 0 100 100">
                <use href="/eden-telemetry-icons.svg#dt-04" />
              </svg>
            </div>
            <div className="data-type-cell">
              <svg viewBox="0 0 100 100">
                <use href="/eden-telemetry-icons.svg#dt-08" />
              </svg>
            </div>
            <div className="data-type-cell">
              <svg viewBox="0 0 100 100">
                <use href="/eden-telemetry-icons.svg#dt-09" />
              </svg>
            </div>
          </div>

          <p className="eos-sidebar-copy mono">{site.materialsIntro}</p>
          <p className="eos-sidebar-meta mono">SPEC [LIVE/Y] · SITE [OPEN/Y]</p>
        </aside>
      </div>
    </section>
  );
}
