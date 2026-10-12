"use client";

import { useId, useState } from "react";
import {
  detailCopyHasContent,
  renderDetailCopy,
} from "@/components/home/lifestyle-detail-copy";
import type {
  LifestyleScenario,
  LifestyleScenarioDetailCopy,
  LifestyleScenarioDetails,
} from "@/content/site";

const expandableFields: {
  key: keyof LifestyleScenarioDetails;
  label: string;
}[] = [
  { key: "info", label: "info" },
  { key: "specs", label: "specs" },
  { key: "cropType", label: "crop type" },
];

export function LifestyleScenarioVisual({ scenario }: { scenario: LifestyleScenario }) {
  return (
    <article className="veld-scenario" id={scenario.id}>
      <img src={scenario.image} alt="" />
      <div className="veld-scenario-copy">
        <h3 className="brand-natural">{scenario.title}</h3>
        <p className="mono veld-scenario-lead">{scenario.body}</p>
      </div>
    </article>
  );
}

function LifestyleDetailRow({
  label,
  body,
}: {
  label: string;
  body: LifestyleScenarioDetailCopy;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className={open ? "veld-scenario-detail is-open" : "veld-scenario-detail"}>
      <button
        type="button"
        className="veld-scenario-detail-trigger mono"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="veld-scenario-detail-label">
          <span className="veld-scenario-detail-mark" aria-hidden="true">
            {open ? "−" : "+"}
          </span>
          <span className="veld-scenario-detail-title">{label}</span>
        </span>
      </button>
      <div className="veld-scenario-detail-panel" id={panelId} aria-hidden={!open}>
        <div className="veld-scenario-detail-panel-inner">
          {detailCopyHasContent(body) ? renderDetailCopy(body) : null}
        </div>
      </div>
    </div>
  );
}

export function LifestyleScenarioDetails({ scenario }: { scenario: LifestyleScenario }) {
  return (
    <div className="veld-scenario-details" aria-label={`${scenario.title} details`}>
      {expandableFields.map((field) => (
        <LifestyleDetailRow
          key={field.key}
          label={field.label}
          body={scenario.details[field.key]}
        />
      ))}
    </div>
  );
}
