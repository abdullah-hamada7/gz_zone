// Central config for Google Ads / GA4 / GTM.
// Fill values via env vars. Code no-ops safely if IDs are missing.

export const ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18331543340";

export const ADS_CONVERSION_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL ||
  "F1pnCOTo7ekcEKzOlKVE";

export const GA4_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "";

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";

export const ADS_CONVERSION_SEND_TO = `${ADS_ID}/${ADS_CONVERSION_LABEL}`;

type DataLayerEvent = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function pushToDataLayer(event: DataLayerEvent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
] as const;

export type Attribution = Record<string, string>;

function readCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(
    new RegExp("(^|; )" + name.replace(/[.$?*|{}()[\]\\/+^]/g, "\\$&") + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[2]) : "";
}

function writeCookie(name: string, value: string, days = 90) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/; SameSite=Lax`;
}

/**
 * Persist gclid + UTMs on first landing so the later WhatsApp click
 * can still attribute to the Ads campaign (WhatsApp opens a new tab).
 */
export function persistAttributionFromUrl(): Attribution {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const attribution: Attribution = {};
  let hasNewParams = false;

  for (const key of UTM_KEYS) {
    const val = params.get(key);
    if (val) {
      attribution[key] = val;
      hasNewParams = true;
    }
  }

  try {
    if (hasNewParams) {
      localStorage.setItem("gz_attribution", JSON.stringify(attribution));
      for (const [k, v] of Object.entries(attribution)) {
        writeCookie(`gz_${k}`, v);
      }
    }
  } catch {
    // storage unavailable — ignore
  }

  return attribution;
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out: Attribution = {};

  // 1. Current URL params win
  for (const key of UTM_KEYS) {
    const val = params.get(key);
    if (val) out[key] = val;
  }
  if (Object.keys(out).length > 0) return out;

  // 2. localStorage fallback
  try {
    const stored = localStorage.getItem("gz_attribution");
    if (stored) return JSON.parse(stored) as Attribution;
  } catch {
    // ignore
  }

  // 3. Cookie fallback
  for (const key of UTM_KEYS) {
    const val = readCookie(`gz_${key}`);
    if (val) out[key] = val;
  }
  return out;
}

export function trackWhatsAppConversion(meta?: {
  treatment?: string;
  duration?: string;
  source_component?: string;
  value?: number;
}) {
  if (typeof window === "undefined") return;
  const value = meta?.value ?? 50.0;
  const treatment = meta?.treatment || "General";
  const sourceComponent = meta?.source_component || "whatsapp_button";
  const attribution = getAttribution();
  const transactionId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;

  // GTM dataLayer event — use this as the single trigger in GTM
  // (GA4 generate_lead tag + Ads conversion tag both listen to it).
  pushToDataLayer({
    event: "whatsapp_lead",
    treatment_name: treatment,
    duration: meta?.duration,
    source_component: sourceComponent,
    currency: "EUR",
    value,
    transaction_id: transactionId,
    ...attribution,
    page_path: window.location.pathname,
  });

  // Direct gtag fallback (works even before GTM container is configured).
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: ADS_CONVERSION_SEND_TO,
        event_category: "Booking",
        event_label: treatment,
        value,
        currency: "EUR",
        transaction_id: transactionId,
      });
      if (GA4_ID) {
        window.gtag("event", "generate_lead", {
          currency: "EUR",
          value,
          treatment_name: treatment,
          source_component: sourceComponent,
          transaction_id: transactionId,
        });
      }
    }
    const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
    if (typeof fbq === "function") {
      fbq("track", "Contact", {
        content_name: treatment,
        currency: "EUR",
        value,
      });
    }
  } catch (err) {
    console.warn("[Tracking Warning] Conversion dispatch error:", err);
  }
}
