"use client";

import { useState } from "react";
import { site } from "@/content/site";

export function ProcessSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="veld-process" id="process" aria-labelledby="process-heading">
      <div className="veld-section-head veld-section-head--display veld-slide-intro">
        <div className="veld-slide-intro-copy">
          <h2 className="mono" id="process-heading">
            <span className="signal-mint">{site.processHighlight}</span>
          </h2>
        </div>
      </div>
      <div className="veld-process__body" onMouseLeave={() => setOpenId(null)}>
        <ol className="veld-process__steps">
          {site.processSteps.map((step) => {
            const isOpen = openId === step.id;
            return (
              <li
                key={step.id}
                className={isOpen ? "veld-process__item is-open" : "veld-process__item"}
                onMouseEnter={() => setOpenId(step.id)}
              >
                <button
                  type="button"
                  className="veld-process__trigger mono"
                  aria-expanded={isOpen}
                  aria-controls={`process-panel-${step.id}`}
                  id={`process-trigger-${step.id}`}
                  onClick={() => setOpenId(isOpen ? null : step.id)}
                >
                  <span className="veld-process__index">{step.label}</span>
                  <span className="veld-process__name">{step.title}</span>
                </button>
                <div
                  className="veld-process__detail"
                  id={`process-panel-${step.id}`}
                  role="region"
                  aria-labelledby={`process-trigger-${step.id}`}
                  hidden={!isOpen}
                >
                  <p className="veld-process__description mono">{step.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
