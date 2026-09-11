"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  GA4_ID,
  persistAttributionFromUrl,
  pushToDataLayer,
} from "@/lib/analytics";

function ListenerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Persist gclid/UTMs on landing
  useEffect(() => {
    persistAttributionFromUrl();
  }, []);

  // SPA page_view for GA4 + GTM (App Router doesn't reload <head> scripts)
  useEffect(() => {
    if (!pathname) return;
    const url =
      pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    pushToDataLayer({
      event: "page_view",
      page_path: url,
    });
    try {
      if (typeof window !== "undefined" && typeof window.gtag === "function" && GA4_ID) {
        window.gtag("event", "page_view", {
          page_path: url,
          page_location: window.location.href,
        });
      }
    } catch {
      // ignore
    }
  }, [pathname, searchParams]);

  return null;
}

export function AnalyticsListener() {
  return (
    <Suspense fallback={null}>
      <ListenerInner />
    </Suspense>
  );
}
