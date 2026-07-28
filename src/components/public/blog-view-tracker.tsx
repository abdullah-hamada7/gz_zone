"use client";

import { useEffect } from "react";

interface BlogViewTrackerProps {
  slug: string;
}

export function BlogViewTracker({ slug }: BlogViewTrackerProps) {
  useEffect(() => {
    if (!slug) return;
    // Track read/view count once per page load
    fetch("/api/blog/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    }).catch(() => {});
  }, [slug]);

  return null;
}
