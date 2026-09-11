"use client";

import { useCallback } from "react";
import { buildWhatsAppUrl, buildGenericWhatsAppUrl } from "@/lib/whatsapp";
import { DEFAULT_WHATSAPP } from "@/lib/constants";
import { getAttribution, trackWhatsAppConversion } from "@/lib/analytics";

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
      // 1. Google Ads + GA4 + GTM (single dataLayer event + gtag fallback)
      trackWhatsAppConversion({
        treatment: meta?.treatment,
        duration: meta?.duration,
        source_component: meta?.source_component,
        value: 50.0,
      });

      // 2. Log to internal Supabase with UTMs
      try {
        let fullReferrer = "";
        if (typeof document !== "undefined") {
          fullReferrer = document.referrer || "";
        }
        if (typeof window !== "undefined" && window.location.search) {
          fullReferrer = (fullReferrer ? fullReferrer + " | " : "") + "URL Params: " + window.location.search;
        }

        const attribution =
          typeof window !== "undefined" ? getAttribution() : {};
        const payload = JSON.stringify({
          event_name: "whatsapp_click",
          treatment: meta?.treatment || null,
          duration: meta?.duration || null,
          source_component: meta?.source_component || "general_cta",
          path: typeof window !== "undefined" ? window.location.pathname : null,
          referrer: fullReferrer || null,
          gclid: attribution.gclid || null,
          gbraid: attribution.gbraid || null,
          wbraid: attribution.wbraid || null,
          utm_source: attribution.utm_source || null,
          utm_medium: attribution.utm_medium || null,
          utm_campaign: attribution.utm_campaign || null,
          utm_term: attribution.utm_term || null,
          utm_content: attribution.utm_content || null,
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

