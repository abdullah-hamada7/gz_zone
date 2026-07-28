"use client";

import { useCallback } from "react";
import { buildWhatsAppUrl, buildGenericWhatsAppUrl } from "@/lib/whatsapp";
import { DEFAULT_WHATSAPP } from "@/lib/constants";

export function useWhatsApp() {
  const getUrl = useCallback(
    (params?: Partial<{
      treatment: string;
      duration: string;
      date: string;
      time: string;
      location: string;
      notes: string;
    }>) => {
      if (!params) return buildGenericWhatsAppUrl(DEFAULT_WHATSAPP);

      return buildWhatsAppUrl({
        phone: DEFAULT_WHATSAPP,
        treatment: params.treatment,
        duration: params.duration,
        date: params.date,
        time: params.time,
        location: params.location,
        notes: params.notes,
      });
    },
    []
  );

  const trackAndOpen = useCallback(
    (
      url: string,
      meta?: {
        treatment?: string;
        duration?: string;
        source_component?: string;
      }
    ) => {
      try {
        const payload = JSON.stringify({
          event_name: "whatsapp_click",
          treatment: meta?.treatment || null,
          duration: meta?.duration || null,
          source_component: meta?.source_component || "general_cta",
          path: typeof window !== "undefined" ? window.location.pathname : null,
          referrer: typeof document !== "undefined" ? document.referrer : null,
        });

        if (typeof navigator !== "undefined" && navigator.sendBeacon) {
          const blob = new Blob([payload], { type: "application/json" });
          navigator.sendBeacon("/api/track-event", blob);
        } else {
          fetch("/api/track-event", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: payload,
            keepalive: true,
          }).catch(() => {});
        }
      } catch (err) {
        console.error("Tracking error:", err);
      }

      window.open(url, "_blank", "noopener,noreferrer");
    },
    []
  );

  return { getUrl, trackAndOpen };
}

