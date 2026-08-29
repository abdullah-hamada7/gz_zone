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
      // 1. Dispatch Google Ads & Analytics Conversion Events
      try {
        if (typeof window !== "undefined") {
          const win = window as any;
          if (win.gtag) {
            // Google Ads Conversion Event (WhatsApp Booking Lead)
            win.gtag("event", "conversion", {
              send_to: "AW-18331543340/F1pnCOTo7ekcEKzOlKVE",
              event_category: "Booking",
              event_label: meta?.treatment || "WhatsApp Inquiry",
              value: 50.0,
              currency: "EUR",
            });
            // GA4 Lead Generation Event
            win.gtag("event", "generate_lead", {
              currency: "EUR",
              value: 50.0,
              treatment_name: meta?.treatment || "General",
              source_component: meta?.source_component || "whatsapp_button",
            });
          }

          // Meta Pixel Event (if active)
          if (win.fbq) {
            win.fbq("track", "Contact", {
              content_name: meta?.treatment || "WhatsApp Inquiry",
              currency: "EUR",
              value: 50.0,
            });
          }
        }
      } catch (gtagErr) {
        console.warn("[Tracking Warning] Conversion dispatch error:", gtagErr);
      }

      // 2. Log to internal Supabase with UTMs
      try {
        let fullReferrer = "";
        if (typeof document !== "undefined") {
          fullReferrer = document.referrer || "";
        }
        if (typeof window !== "undefined" && window.location.search) {
          fullReferrer = (fullReferrer ? fullReferrer + " | " : "") + "URL Params: " + window.location.search;
        }

        const payload = JSON.stringify({
          event_name: "whatsapp_click",
          treatment: meta?.treatment || null,
          duration: meta?.duration || null,
          source_component: meta?.source_component || "general_cta",
          path: typeof window !== "undefined" ? window.location.pathname : null,
          referrer: fullReferrer || null,
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

