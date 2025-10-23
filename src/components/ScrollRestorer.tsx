"use client";

import { useEffect } from "react";

export function ScrollRestorer() {
  useEffect(() => {
    // Only restore if we used our special marker hash
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (!hash) return;

    // formats supported: #y-<number> or #scroll=<number>
    let y: number | null = null;
    if (hash.startsWith("#y-")) {
      const n = Number(hash.slice(3));
      if (!Number.isNaN(n)) y = Math.max(0, n);
    } else if (hash.startsWith("#scroll=")) {
      const n = Number(hash.slice(8));
      if (!Number.isNaN(n)) y = Math.max(0, n);
    }

    if (y != null) {
      // wait a tick to ensure layout is ready
      const id = window.requestAnimationFrame(() => {
        window.scrollTo({ top: y!, behavior: "smooth" });
      });
      return () => cancelAnimationFrame(id);
    }
  }, []);

  return null;
}
