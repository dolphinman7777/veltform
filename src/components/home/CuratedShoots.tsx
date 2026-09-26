"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const shoots = [
  { y: "18%", len: "3.4rem", label: "LIGHT", caption: "photosynthesis · dli", alert: false },
  { y: "30%", len: "5.6rem", label: "TEMP", caption: "season · setpoints", alert: false },
  {
    y: "82%",
    len: "2.6rem",
    label: "VPD",
    caption: "humidity · transpiration",
    alert: true,
    stats: ["0.94 kPa", "21.8° · 64% rh", "2.61 − 1.67"],
  },
  { y: "52%", len: "4.4rem", label: "ROOT", caption: "irrigation · oxygen", alert: false },
] as const;

const readouts = [
  { pip: "foxleap", x: "40%", y: "10%", label: "LIGHT", caption: "photosynthesis · dli", dot: "light" },
  { pip: "bramble", x: "41%", y: "42%", label: "TEMP", caption: "season · setpoints", dot: "temp" },
  { pip: "junction", x: "40%", y: "66%", label: "VPD", caption: "humidity · transpiration", dot: "vpd" },
] as const;

function lightReadout(node: HTMLElement) {
  node.classList.add("is-lit");
  const dotName = node.dataset.dot;
  if (!dotName) return;
  document.querySelector(`[data-curated-dot=${dotName}]`)?.classList.add("is-lit");
}

export function CuratedReadouts() {
  return (
    <div className="curated-readouts">
      {readouts.map((readout) => (
        <span
          key={readout.pip}
          className="data-pip data-pip--readout mono"
          data-curated-pip={readout.pip}
          data-dot={readout.dot}
          style={{ "--x": readout.x, "--y": readout.y } as CSSProperties}
        >
          <span className="data-pip-label">{readout.label}</span>
          <span className="data-pip-caption">{readout.caption}</span>
        </span>
      ))}
    </div>
  );
}

export function CuratedShoots() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const nodes = [...root.querySelectorAll<HTMLElement>(".curated-shoot")];
    const readouts = [...document.querySelectorAll<HTMLElement>(".data-pip--readout")];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      nodes.forEach((node) => node.classList.add("is-lit"));
      readouts.forEach(lightReadout);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          if (target.classList.contains("data-pip--readout")) lightReadout(target);
          else target.classList.add("is-lit");
          observer.unobserve(target);
        });
      },
      { threshold: 0.65, rootMargin: "0px 0px -18% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    readouts.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="curated-shoots" ref={rootRef} aria-hidden="true">
      {shoots.map((shoot) => (
        <div
          key={shoot.label}
          className={"stats" in shoot ? "curated-shoot curated-shoot--stack" : "curated-shoot"}
          style={{ "--y": shoot.y, "--len": shoot.len } as CSSProperties}
        >
          <span className={shoot.alert ? "curated-shoot-mark curated-shoot-mark--alert" : "curated-shoot-mark"} />
          <span className="curated-shoot-stem" />
          <span className="curated-shoot-copy">
            <span className="curated-shoot-label mono">{shoot.label}</span>
            <span className="curated-shoot-caption mono">{shoot.caption}</span>
            {"stats" in shoot ? (
              <span className="curated-shoot-stats mono">
                {shoot.stats.map((stat) => (
                  <span key={stat} className="curated-shoot-stat">
                    {stat}
                  </span>
                ))}
              </span>
            ) : null}
          </span>
        </div>
      ))}
    </div>
  );
}
