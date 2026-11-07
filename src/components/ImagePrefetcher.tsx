"use client";

import { useEffect } from "react";
import type { PrefetchImage } from "@/content/prefetch-images";

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

const CONCURRENCY = 3;

export function isConstrainedConnection() {
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  return connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? "");
}

function fetchImage({ src, avif }: PrefetchImage, fetchPriority: "low" | "high", onDone?: () => void) {
  const img = new Image();
  img.decoding = "async";
  img.fetchPriority = fetchPriority;
  if (onDone) img.onload = img.onerror = onDone;
  if (avif) {
    // Inside a <picture> the browser picks the same file the page's own <picture> will request.
    const picture = document.createElement("picture");
    const source = document.createElement("source");
    source.type = "image/avif";
    source.srcset = avif;
    picture.append(source, img);
  }
  img.src = src;
}

/**
 * Warms the browser cache with the home and Lifestyle images once the current page has finished
 * loading and the browser is idle, so those pages render instantly. The Environments panels wait
 * until someone reaches for a link to that page, which gives them a head start on the click.
 * Skipped when the visitor has Data Saver on or a very slow connection.
 */
export function ImagePrefetcher({
  images,
  environmentPanels,
}: {
  images: PrefetchImage[];
  environmentPanels: string[];
}) {
  useEffect(() => {
    if (isConstrainedConnection()) return;

    let cancelled = false;
    const queue = images.filter(({ src }) => !document.querySelector(`img[src="${CSS.escape(src)}"]`));

    const next = () => {
      const image = queue.shift();
      if (!image || cancelled) return;
      fetchImage(image, "low", next);
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

  useEffect(() => {
    if (isConstrainedConnection()) return;

    const controller = new AbortController();
    const warmPanels = (event: Event) => {
      if (!(event.target instanceof Element) || !event.target.closest('a[href="/environments"]')) return;
      controller.abort();
      for (const src of environmentPanels) fetchImage({ src }, "high");
    };

    // pointerover also fires when a finger lands on the link; focusin covers the keyboard.
    document.addEventListener("pointerover", warmPanels, { passive: true, signal: controller.signal });
    document.addEventListener("focusin", warmPanels, { signal: controller.signal });
    return () => controller.abort();
  }, [environmentPanels]);

  return null;
}
