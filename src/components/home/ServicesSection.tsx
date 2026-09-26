"use client";

import { useState } from "react";
import { site } from "@/content/site";

export function ServicesSection() {
  const [active, setActive] = useState(0);
  const service = site.services[active];

  function select(index: number) {
    const count = site.services.length;
    const next = (index + count) % count;
    setActive(next);
    document.getElementById(`service-tab-${site.services[next].id}`)?.focus();
  }

  return (
    <section className="velt-section velt-services" id="services">
      <div className="velt-section-head velt-section-head--display velt-services-intro">
        <div className="velt-services-intro-copy">
          <h2 className="mono">
            <span className="signal-mint">services</span>
            <br />
            a complete greenhouse solution
          </h2>
          <p>{site.servicesIntro}</p>
        </div>
      </div>
      <div className="velt-section-body">
        <div className="velt-services-stage">
          <div className="velt-services-tabs" role="tablist" aria-orientation="vertical" aria-label="Services">
            {site.services.map((item, index) => {
              const selected = index === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`service-tab-${item.id}`}
                  className={selected ? "velt-services-tab is-active" : "velt-services-tab"}
                  aria-selected={selected}
                  aria-controls="service-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                      event.preventDefault();
                      select(active + 1);
                    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                      event.preventDefault();
                      select(active - 1);
                    } else if (event.key === "Home") {
                      event.preventDefault();
                      select(0);
                    } else if (event.key === "End") {
                      event.preventDefault();
                      select(site.services.length - 1);
                    }
                  }}
                >
                  <span className="velt-services-tab-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="velt-services-tab-title">{item.title}</span>
                </button>
              );
            })}
          </div>

          <div
            className="velt-services-panel"
            role="tabpanel"
            id="service-panel"
            aria-labelledby={`service-tab-${service.id}`}
          >
            <p>{service.body}</p>
            <div className="velt-services-dots">
              {site.services.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={index === active ? "velt-services-dot is-active" : "velt-services-dot"}
                  aria-label={item.title}
                  aria-current={index === active ? "true" : undefined}
                  onClick={() => setActive(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
