"use client";

import { useEffect, useRef } from "react";

export function SlideBridgeStrawberry() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      root.classList.add("is-inview");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        root.classList.toggle("is-inview", entry.isIntersecting);
      },
      { threshold: 0.2, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="velt-slide-bridge" ref={rootRef}>
      <p className="velt-slide-bridge-label velt-slide-bridge-label--left">Bespoke Greenhouses</p>
      <img
        className="velt-slide-bridge-figure"
        src="/images/hero/strawberry.png"
        alt=""
        width={1024}
        height={1024}
        decoding="async"
      />
      <p className="velt-slide-bridge-label velt-slide-bridge-label--right">Climate Systems</p>
    </div>
  );
}
