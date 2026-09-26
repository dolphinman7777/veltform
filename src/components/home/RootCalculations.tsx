"use client";

import { useId, useState } from "react";

const rows = [
  { term: "oxygen", expr: "porosity − moisture" },
  { term: "deficit", expr: "capacity − moisture" },
  { term: "volume", expr: "area × depth × deficit" },
  { term: "runtime", expr: "volume ÷ flow" },
] as const;

export function RootCalculations() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className={open ? "signal-math is-open" : "signal-math"}>
      <button
        type="button"
        className="signal-math-trigger mono"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        irrigation · oxygen
      </button>
      <div className="signal-math-panel" id={panelId} aria-hidden={!open}>
        <div className="signal-math-panel-inner">
          <span className="signal-math-stem" aria-hidden="true" />
          {rows.map((row) => (
            <p key={row.term} className="signal-math-row mono">
              <span className="signal-math-term">{row.term}</span>
              <span className="signal-math-eq" aria-hidden="true">
                =
              </span>
              <span className="signal-math-expr">{row.expr}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
