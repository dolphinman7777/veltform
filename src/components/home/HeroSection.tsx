"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";

const STEPS = [
  { label: "frame" },
  { label: "planting" },
  { label: "climate zones" },
] as const;

function fade(progress: number, start: number, end: number) {
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  const t = (progress - start) / (end - start);
  return t * t * (3 - 2 * t);
}

export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);
  const gardenRef = useRef<HTMLImageElement>(null);
  const panelsRef = useRef<HTMLImageElement>(null);
  const zonesRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const apply = (progress: number) => {
      const plants = fade(progress, 0, 0.42);
      const climate = fade(progress, 0.4, 0.88);
      if (gardenRef.current) gardenRef.current.style.opacity = String(plants);
      if (panelsRef.current) panelsRef.current.style.opacity = String(plants);
      if (zonesRef.current) {
        zonesRef.current.style.opacity = String(climate);
        zonesRef.current.setAttribute("aria-hidden", climate < 0.2 ? "true" : "false");
      }
      const step = progress < 0.22 ? 0 : progress < 0.55 ? 1 : 2;
      const label = `${String(step + 1).padStart(2, "0")} ${STEPS[step].label}`;
      if (stepRef.current && stepRef.current.textContent !== label) {
        stepRef.current.textContent = label;
      }
    };

    if (reduced) {
      apply(1);
      return;
    }

    const measureHeader = () => {
      const header = document.querySelector(".velt-site-header");
      const height = header?.getBoundingClientRect().height ?? 0;
      if (height > 0) {
        document.documentElement.style.setProperty("--site-header", `${height}px`);
      }
    };

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const root = rootRef.current;
        if (!root) return;
        const range = root.offsetHeight - window.innerHeight;
        if (range <= 0) {
          apply(1);
          return;
        }
        const start = window.scrollY + root.getBoundingClientRect().top;
        const next = (window.scrollY - start) / range;
        apply(Math.min(1, Math.max(0, next)));
      });
    };

    measureHeader();
    onScroll();
    const onResize = () => {
      measureHeader();
      onScroll();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="hero-evolve" id="top" ref={rootRef}>
      <div className="hero-evolve-sticky">
        <div className="hero-cards hero-cards--clean">
          <div className="hero-cards-stage">
            <div className="hero-wordmark hero-wordmark--clean">
              <div className="hero-brand-box">
                <h1 className="hero-wordmark-eden brand-main brand-natural">{site.name}</h1>
                <p className="hero-subline mono">{site.subtagline}</p>
              </div>
              <div className="hero-wordmark-lines mono">
                <p className="hero-line hero-line--1">{site.heroLines[0]}</p>
                <p className="hero-line hero-line--2">{site.heroLines[1]}</p>
                <p className="hero-line hero-line--3">{site.heroLines[2]}</p>
              </div>
              <p className="hero-evolve-step mono" aria-live="polite" ref={stepRef}>
                01 frame
              </p>
            </div>

            <div className="hero-scene">
              <img
                className="hero-garden"
                ref={gardenRef}
                src="/images/hero/garden-edges.png?v=21"
                alt=""
              />

              <div className="hero-build">
                <img
                  className="hero-frame"
                  src="/images/hero/greenhouse-frame.png?v=1"
                  alt="Timber greenhouse frame"
                />
                <img
                  className="hero-panels"
                  ref={panelsRef}
                  src="/images/hero/solar-panels.png?v=1"
                  alt=""
                />
                <div className="hero-zones" ref={zonesRef} aria-hidden="true">
                  <p className="hero-zone mono">cool · leafy</p>
                  <p className="hero-zone hero-zone--warm mono">warm · sun</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
