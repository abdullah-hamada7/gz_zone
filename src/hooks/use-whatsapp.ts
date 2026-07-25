"use client";

import { useCallback } from "react";
import { buildWhatsAppUrl, buildGenericWhatsAppUrl } from "@/lib/whatsapp";
import { DEFAULT_WHATSAPP } from "@/lib/constants";

interface TrackEvent {
  (action: string, data?: Record<string, string>): void;
}

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
    (url: string, _source?: string) => {
      window.open(url, "_blank", "noopener,noreferrer");
    },
    []
  );

  return { getUrl, trackAndOpen };
}
