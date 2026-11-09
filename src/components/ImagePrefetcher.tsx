"use client";

import { useEffect } from "react";
import type { PrefetchImage } from "@/content/prefetch-images";

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

const CONCURRENCY = 3;

export function isConstrainedConnection() {
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  return connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? "");
}

/**
 * Warms the browser cache with the home and Lifestyle images once the current page has finished
 * loading and the browser is idle, so those pages render instantly.
 * Skipped when the visitor has Data Saver on or a very slow connection.
 */
export function ImagePrefetcher({ images }: { images: PrefetchImage[] }) {
  useEffect(() => {
    if (isConstrainedConnection()) return;

    let cancelled = false;
    const queue = images.filter(({ src }) => !document.querySelector(`img[src="${CSS.escape(src)}"]`));

    const next = () => {
      const image = queue.shift();
      if (!image || cancelled) return;
      const img = new Image();
      img.decoding = "async";
      img.fetchPriority = "low";
      img.onload = img.onerror = next;
      if (image.avif) {
        // Inside a <picture> the browser picks the same file the page's own <picture> will request.
        const picture = document.createElement("picture");
        const source = document.createElement("source");
        source.type = "image/avif";
        source.srcset = image.avif;
        picture.append(source, img);
      }
      img.src = image.src;
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
  }, [images]);

  return null;
}
