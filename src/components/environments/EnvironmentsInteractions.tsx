"use client";

import { useEffect } from "react";
import { isConstrainedConnection } from "@/components/ImagePrefetcher";
import { initClimate, initPlants } from "./environments-behaviour";

// Once the panels are in, or as soon as someone starts scrolling, load everything else in the background
// (including plants off to the right), so it is ready in the browser cache when they reach it.
// Data Saver and very slow connections keep the markup's load-on-scroll behaviour.
function loadRemainingImages(root: HTMLElement, signal: AbortSignal) {
  if (isConstrainedConnection()) return;
  const loadRest = () => {
    root.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => {
      img.loading = "eager";
    });
  };
  window.addEventListener("scroll", loadRest, { once: true, passive: true, signal });
  const panels = [...root.querySelectorAll<HTMLImageElement>(".climate-image img")];
  void Promise.allSettled(panels.map((panel) => panel.decode())).then(() => {
    if (!signal.aborted) loadRest();
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
