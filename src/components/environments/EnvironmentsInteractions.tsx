"use client";

import { useEffect } from "react";
import { isConstrainedConnection } from "@/components/ImagePrefetcher";
import { initClimate, initPlants } from "./environments-behaviour";

// Panels first, then every other image straight away, so nothing waits for a scroll or slows the panels.
// Data Saver and very slow connections keep the markup's load-on-scroll behaviour.
function loadRemainingImages(root: HTMLElement, signal: AbortSignal) {
  if (isConstrainedConnection()) return;
  const panels = [...root.querySelectorAll<HTMLImageElement>(".climate-image img")];
  void Promise.allSettled(panels.map((panel) => panel.decode())).then(() => {
    if (signal.aborted) return;
    root.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => {
      img.loading = "eager";
    });
  });
}

export function EnvironmentsInteractions() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".env-page");
    if (!root) return;
    const controller = new AbortController();
    initClimate(root, controller.signal);
    initPlants(root, controller.signal);
    loadRemainingImages(root, controller.signal);
    return () => controller.abort();
  }, []);

  return null;
}
