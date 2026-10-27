"use client";

import { useEffect } from "react";
import { initClimate, initPlants } from "./environments-behaviour";

export function EnvironmentsInteractions() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".env-page");
    if (!root) return;
    const controller = new AbortController();
    initClimate(root, controller.signal);
    initPlants(root, controller.signal);
    return () => controller.abort();
  }, []);

  return null;
}
