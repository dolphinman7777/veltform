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
    <section className="veld-section veld-services" id="services">
      <div className="veld-section-head veld-section-head--display veld-slide-intro">
        <div className="veld-slide-intro-copy">
          <h2 className="mono">
            <span className="signal-mint">services</span>
            <br />
            a complete greenhouse solution
          </h2>
          <p>{site.servicesIntro}</p>
        </div>
      </div>
      <div className="veld-section-body">
        <div className="veld-services-stage">
          <div className="veld-services-tabs" role="tablist" aria-orientation="vertical" aria-label="Services">
            {site.services.map((item, index) => {
              const selected = index === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`service-tab-${item.id}`}
                  className={selected ? "veld-services-tab is-active" : "veld-services-tab"}
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
                  <span className="veld-services-tab-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="veld-services-tab-title">{item.title}</span>
                </button>
              );
            })}
          </div>

          <div
            className="veld-services-panel"
            role="tabpanel"
            id="service-panel"
            aria-labelledby={`service-tab-${service.id}`}
          >
            <p>{service.body}</p>
            <div className="veld-services-dots">
              {site.services.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={index === active ? "veld-services-dot is-active" : "veld-services-dot"}
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
