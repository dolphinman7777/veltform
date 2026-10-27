"use client";

import { useEffect } from "react";

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

const CONCURRENCY = 3;

/**
 * Warms the browser cache with every site image once the current page has finished loading
 * and the browser is idle, so later pages (Environments, Lifestyle) render instantly.
 * Skipped when the visitor has Data Saver on or a very slow connection.
 */
export function ImagePrefetcher({ urls }: { urls: string[] }) {
  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? "")) return;

    let cancelled = false;
    const queue = urls.filter((url) => !document.querySelector(`img[src="${CSS.escape(url)}"]`));

    const next = () => {
      const url = queue.shift();
      if (!url || cancelled) return;
      const img = new Image();
      img.decoding = "async";
      img.fetchPriority = "low";
      img.onload = img.onerror = next;
      img.src = url;
    };

    const start = () => {
      for (let i = 0; i < CONCURRENCY; i++) next();
    };

    // Wait for the page (hero included) to finish, then for an idle moment.
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const schedule = () => {
      if ("requestIdleCallback" in window) idleId = window.requestIdleCallback(start, { timeout: 3000 });
      else timeoutId = setTimeout(start, 1500);
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [urls]);

  return null;
}
