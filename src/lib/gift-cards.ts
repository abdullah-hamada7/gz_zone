import type { Duration, Treatment } from "@/types";

export interface GiftCardOptionConfig {
  id: string;
  title: string;
  description: string;
  minutes: number;
  durationLabel: string;
  /** Lowercase phrase used inside the WhatsApp message. */
  whatsappLabel: string;
  /** Catalog treatments this gift can be redeemed against. */
  treatmentSlugs: string[];
  fallbackPrice: number;
}

export interface GiftCardOption extends GiftCardOptionConfig {
  price: number;
}

export const GIFT_CARD_OPTIONS: GiftCardOptionConfig[] = [
  {
    id: "60-minute-massage",
    title: "60-Minute Massage",
    description: "The classic gift: one full hour of professional massage.",
    minutes: 60,
    durationLabel: "60 minutes",
    whatsappLabel: "60-minute massage session",
    treatmentSlugs: ["deep-tissue-massage", "back-neck-shoulders-head-massage", "sports-massage"],
    fallbackPrice: 55,
  },
  {
    id: "90-minute-massage",
    title: "90-Minute Massage",
    description: "More time to unwind and release deeper tension.",
    minutes: 90,
    durationLabel: "90 minutes",
    whatsappLabel: "90-minute massage session",
    treatmentSlugs: ["deep-tissue-massage", "back-neck-shoulders-head-massage", "sports-massage"],
    fallbackPrice: 80,
  },
  {
    id: "120-minute-massage",
    title: "120-Minute Massage",
    description: "A full, unhurried two-hour session.",
    minutes: 120,
    durationLabel: "120 minutes",
    whatsappLabel: "120-minute massage session",
    treatmentSlugs: ["deep-tissue-massage", "sports-massage"],
    fallbackPrice: 100,
  },
  {
    id: "facial-head-massage",
    title: "Facial / Head Massage",
    description: "Focused face, neck and head relief in 45 minutes.",
    minutes: 45,
    durationLabel: "45 minutes",
    whatsappLabel: "facial / head massage session",
    treatmentSlugs: ["facial-massage"],
    fallbackPrice: 40,
  },
  {
    id: "reflexology-session",
    title: "Reflexology Session",
    description: "Hands, feet and ear reflexology in 45 minutes.",
    minutes: 45,
    durationLabel: "45 minutes",
    whatsappLabel: "reflexology session",
    treatmentSlugs: ["reflexology-massage"],
    fallbackPrice: 40,
  },
];

/**
 * Resolve gift card prices from the live service catalog so the page always
 * matches the current treatment prices. Falls back to the seeded price when a
 * duration is not available in the database.
 */
export function resolveGiftCardOptions(
  treatments: Pick<Treatment, "id" | "slug">[],
  durations: Pick<Duration, "treatment_id" | "minutes" | "price">[]
): GiftCardOption[] {
  return GIFT_CARD_OPTIONS.map((option) => {
    const treatmentIds = new Set(
      treatments
        .filter((treatment) => option.treatmentSlugs.includes(treatment.slug))
        .map((treatment) => treatment.id)
    );

    const matches = durations.filter(
      (duration) =>
        treatmentIds.has(duration.treatment_id) &&
        Number(duration.minutes) === option.minutes
    );

    const price =
      matches.length > 0
        ? Math.min(...matches.map((duration) => Number(duration.price)))
        : option.fallbackPrice;

    return { ...option, price };
  });
}

export interface GiftCardPaymentMethod {
  id: "cash" | "wise" | "bank-transfer";
  label: string;
  description: string;
  href?: string;
  details?: string;
  qrCodeSrc?: string;
  qrCodeCaption?: string;
}

/** Public business payment details, kept in sync with the printable price menu. */
const DEFAULT_WISE_PAYMENT_LINK = "https://wise.com/pay/me/omarmohammede6";
const DEFAULT_WISE_TAG = "@omarmohammede6";
const DEFAULT_WISE_QR = "/images/wise-qr.png";
const DEFAULT_BANK_TRANSFER_DETAILS = [
  "Name: Omar Mohammed Elgazzar",
  "Email: omarelgazzar8@gmail.com",
  "IBAN: BE05905451212075",
  "SWIFT/BIC: TRWIBEB1XXX",
].join("\n");

export function getGiftCardPaymentMethods(): GiftCardPaymentMethod[] {
  const wise = process.env.NEXT_PUBLIC_WISE_PAYMENT_LINK?.trim();
  const bankDetails = process.env.NEXT_PUBLIC_BANK_TRANSFER_DETAILS?.trim();

  return [
    {
      id: "cash",
      label: "Cash",
      description: "Accepted on site.",
    },
    {
      id: "wise",
      label: "Wise Transfer",
      description: "Pay by card or Wise balance from anywhere.",
      details: `Wise tag: ${DEFAULT_WISE_TAG}`,
      href: wise || DEFAULT_WISE_PAYMENT_LINK,
      qrCodeSrc: DEFAULT_WISE_QR,
      qrCodeCaption: "QR code for Wise",
    },
    {
      id: "bank-transfer",
      label: "Bank Transfer",
      description: "Direct SEPA transfer to the GZ'ZONE account.",
      details: bankDetails || DEFAULT_BANK_TRANSFER_DETAILS,
    },
  ];
}

export interface CertificateOption extends GiftCardOption {
  groupName: string;
}

const CERTIFICATE_TREATMENTS = [
  {
    slug: "deep-tissue-massage",
    title: "Deep Tissue Massage",
    description: "Focused treatment for deeper muscular tension.",
    fallbackMinutes: 60,
    fallbackUnit: "min",
    fallbackPrice: 55,
  },
  {
    slug: "facial-massage",
    title: "Facial Massage",
    description: "Face, neck and head massage.",
    fallbackMinutes: 45,
    fallbackUnit: "min",
    fallbackPrice: 40,
  },
  {
    slug: "reflexology-massage",
    title: "Reflexology",
    description: "Hands, feet and ears reflexology.",
    fallbackMinutes: 45,
    fallbackUnit: "min",
    fallbackPrice: 40,
  },
  {
    slug: "back-neck-shoulders-head-massage",
    title: "Back Neck Shoulders and Head Massage",
    description: "Focused relief for the back, neck, shoulders and head.",
    fallbackMinutes: 60,
    fallbackUnit: "min",
    fallbackPrice: 55,
  },
  {
    slug: "sports-massage",
    title: "Sports Massage",
    description: "Deep tissue, trigger points and stretching.",
    fallbackMinutes: 60,
    fallbackUnit: "min",
    fallbackPrice: 55,
  },
  {
    slug: "anti-cellulite-massage",
    title: "Anti-Cellulite Massage",
    description: "Targeted massage for smoother, firmer-looking skin.",
    fallbackMinutes: 60,
    fallbackUnit: "min",
    fallbackPrice: 55,
  },
  {
    slug: "anti-cellulite-cupping",
    title: "Anti-Cellulite Treatment",
    description: "Massage + dry, running cupping.",
    fallbackMinutes: 90,
    fallbackUnit: "min",
    fallbackPrice: 75,
  },
  {
    slug: "dry-cupping",
    title: "Cupping Therapy",
    description: "Dry cupping session.",
    fallbackMinutes: 0,
    fallbackUnit: "per session",
    fallbackPrice: 40,
  },
  {
    slug: "stretching-class",
    title: "Stretching Class",
    description: "Guided stretching class.",
    fallbackMinutes: 0,
    fallbackUnit: "per class",
    fallbackPrice: 60,
  },
] as const;

function formatCertificateDuration(duration: Pick<Duration, "minutes" | "price" | "unit">) {
  const unit = duration.unit || "min";
  if (unit === "min") return `${Number(duration.minutes)} minutes`;
  if (unit === "per session") return "Per session";
  if (unit === "per class") return "Per class";
  return unit;
}

/**
 * Build the certificate session list from every bookable treatment, with each
 * available duration priced from the live catalog.
 */
export function resolveCertificateOptions(
  treatments: Pick<Treatment, "id" | "slug">[],
  durations: Pick<Duration, "treatment_id" | "minutes" | "price" | "unit">[]
): CertificateOption[] {
  const treatmentBySlug = new Map(
    treatments.map((treatment) => [treatment.slug, treatment])
  );

  return CERTIFICATE_TREATMENTS.flatMap((config) => {
    const treatment = treatmentBySlug.get(config.slug);
    const liveDurations = treatment
      ? durations
          .filter((duration) => duration.treatment_id === treatment.id)
          .sort((a, b) => Number(a.minutes) - Number(b.minutes))
      : [];

    const rows =
      liveDurations.length > 0
        ? liveDurations
        : [
            {
              minutes: config.fallbackMinutes,
              price: config.fallbackPrice,
              unit: config.fallbackUnit as string,
            },
          ];

    return rows.map((duration) => {
      const durationLabel = formatCertificateDuration(duration);
      const unit = duration.unit || "min";
      const durationKey =
        unit === "min" ? String(Number(duration.minutes)) : unit.replace(/\s+/g, "-");

      return {
        id: `${config.slug}-${durationKey}`,
        title: config.title,
        description: config.description,
        minutes: Number(duration.minutes) || 0,
        durationLabel,
        whatsappLabel: `${config.title} (${durationLabel.toLowerCase()})`,
        treatmentSlugs: [config.slug],
        fallbackPrice: config.fallbackPrice,
        price: Number(duration.price),
        groupName: config.title,
      } satisfies CertificateOption;
    });
  });
}
