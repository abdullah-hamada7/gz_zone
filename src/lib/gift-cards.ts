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
  /** Explicit admin price. When omitted, the live catalog price is used. */
  price?: number;
}

export interface GiftCardOption extends GiftCardOptionConfig {
  price: number;
  treatmentNames?: string[];
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
 * matches the current treatment prices. An explicit admin price wins; otherwise
 * the lowest matching catalog duration is used, then the seeded fallback.
 */
export function resolveGiftCardOptions(
  treatments: (Pick<Treatment, "id" | "slug"> & { name?: string })[],
  durations: Pick<Duration, "treatment_id" | "minutes" | "price">[],
  options: GiftCardOptionConfig[] = GIFT_CARD_OPTIONS
): GiftCardOption[] {
  return options.map((option) => {
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

    const explicitPrice = Number(option.price);
    const price =
      Number.isFinite(explicitPrice) && explicitPrice >= 0
        ? explicitPrice
        : matches.length > 0
          ? Math.min(...matches.map((duration) => Number(duration.price)))
          : option.fallbackPrice;

    const treatmentNames = option.treatmentSlugs
      .map((slug) => treatments.find((treatment) => treatment.slug === slug)?.name)
      .filter((name): name is string => Boolean(name));

    return { ...option, price, treatmentNames };
  });
}

export interface GiftCardStep {
  title: string;
  description: string;
}

export interface GiftCardPageContent {
  eyebrow: string;
  heading: string;
  intro: string;
  picker_heading: string;
  picker_description: string;
  picker_personalise_heading: string;
  picker_giver_label: string;
  picker_giver_placeholder: string;
  picker_recipient_label: string;
  picker_recipient_placeholder: string;
  picker_selected_label: string;
  picker_button_text: string;
  picker_note: string;
  picker_error_giver: string;
  steps_heading: string;
  steps: GiftCardStep[];
  payment_heading: string;
  payment_description: string;
  payment_note: string;
  travel_heading: string;
  travel_primary: string;
  travel_secondary: string;
  usage_title: string;
  usage_text: string;
  certificate_note: string;
}

export const GIFT_CARD_PAGE_DEFAULTS: GiftCardPageContent = {
  eyebrow: "Gift Cards",
  heading: "Gift Someone a Massage Session",
  intro:
    "Choose a session, send your gift in a few taps, and we will issue a personalised gift certificate. The recipient can book at the studio or at home.",
  picker_heading: "Choose a gift",
  picker_description:
    "All options include professional equipment and everything needed for the session.",
  picker_personalise_heading: "Personalise your gift",
  picker_giver_label: "Your name",
  picker_giver_placeholder: "Who is giving the gift",
  picker_recipient_label: "Recipient's name (optional)",
  picker_recipient_placeholder: "Who is receiving the gift",
  picker_selected_label: "Selected:",
  picker_button_text: "Gift Now on WhatsApp",
  picker_note:
    "Your gift details will be pre-filled in WhatsApp. We confirm payment, then send a personalised PDF gift certificate with a unique code.",
  picker_error_giver: "Please enter your name so we know who is sending the gift.",
  steps_heading: "How Gift Cards Work",
  steps: [
    {
      title: "Choose your gift",
      description:
        "Pick the massage, facial or reflexology session you would like to gift.",
    },
    {
      title: "Send on WhatsApp",
      description: "Your gift details are pre-filled — just add your name and send.",
    },
    {
      title: "Pay securely",
      description: "Complete payment by cash, Wise transfer or bank transfer.",
    },
    {
      title: "Receive the certificate",
      description:
        "We send a personalised PDF certificate with a unique gift card code, the giver's name, the recipient's name and the session.",
    },
  ],
  payment_heading: "How to Pay",
  payment_description:
    "After you send your gift request on WhatsApp, complete the payment using any method below. Send us the confirmation and we will issue the certificate.",
  payment_note: "A gift card code is generated only after payment is confirmed.",
  travel_heading: "Home Visits & Travel",
  travel_primary: "Free home visits within a 10-kilometer radius of Porto.",
  travel_secondary:
    "For distances beyond 10 km, additional transportation fees apply. Send the recipient's address on WhatsApp and we will confirm the fee before the appointment is booked.",
  usage_title: "Studio or at home",
  usage_text:
    "The recipient can schedule their session at the studio or at their home. They simply contact us with their gift card code and preferred date and time.",
  certificate_note:
    "Gift certificates are valid for the session shown on the certificate and cannot be exchanged for cash.",
};

function text(value: unknown, fallback: string): string {
  return typeof value === "string" ? value : fallback;
}

/** Merge a saved `gift_cards` Site Content section with the safe defaults. */
export function resolveGiftCardPageContent(
  content?: Record<string, unknown> | null
): GiftCardPageContent {
  const raw = content ?? {};
  const savedUsageText = text(
    raw.usage_text,
    GIFT_CARD_PAGE_DEFAULTS.usage_text
  );
  const usageText = savedUsageText
    .replace(GIFT_CARD_PAGE_DEFAULTS.certificate_note, "")
    .trim();
  const steps = Array.isArray(raw.steps)
    ? raw.steps
        .filter(
          (step): step is { title?: unknown; description?: unknown } =>
            Boolean(step) && typeof step === "object"
        )
        .map((step) => ({
          title: text(step.title, ""),
          description: text(step.description, ""),
        }))
    : GIFT_CARD_PAGE_DEFAULTS.steps;

  return {
    eyebrow: text(raw.eyebrow, GIFT_CARD_PAGE_DEFAULTS.eyebrow),
    heading: text(raw.heading, GIFT_CARD_PAGE_DEFAULTS.heading),
    intro: text(raw.intro, GIFT_CARD_PAGE_DEFAULTS.intro),
    picker_heading: text(raw.picker_heading, GIFT_CARD_PAGE_DEFAULTS.picker_heading),
    picker_description: text(
      raw.picker_description,
      GIFT_CARD_PAGE_DEFAULTS.picker_description
    ),
    picker_personalise_heading: text(
      raw.picker_personalise_heading,
      GIFT_CARD_PAGE_DEFAULTS.picker_personalise_heading
    ),
    picker_giver_label: text(
      raw.picker_giver_label,
      GIFT_CARD_PAGE_DEFAULTS.picker_giver_label
    ),
    picker_giver_placeholder: text(
      raw.picker_giver_placeholder,
      GIFT_CARD_PAGE_DEFAULTS.picker_giver_placeholder
    ),
    picker_recipient_label: text(
      raw.picker_recipient_label,
      GIFT_CARD_PAGE_DEFAULTS.picker_recipient_label
    ),
    picker_recipient_placeholder: text(
      raw.picker_recipient_placeholder,
      GIFT_CARD_PAGE_DEFAULTS.picker_recipient_placeholder
    ),
    picker_selected_label: text(
      raw.picker_selected_label,
      GIFT_CARD_PAGE_DEFAULTS.picker_selected_label
    ),
    picker_button_text: text(
      raw.picker_button_text,
      GIFT_CARD_PAGE_DEFAULTS.picker_button_text
    ),
    picker_note: text(raw.picker_note, GIFT_CARD_PAGE_DEFAULTS.picker_note),
    picker_error_giver: text(
      raw.picker_error_giver,
      GIFT_CARD_PAGE_DEFAULTS.picker_error_giver
    ),
    steps_heading: text(raw.steps_heading, GIFT_CARD_PAGE_DEFAULTS.steps_heading),
    steps,
    payment_heading: text(raw.payment_heading, GIFT_CARD_PAGE_DEFAULTS.payment_heading),
    payment_description: text(
      raw.payment_description,
      GIFT_CARD_PAGE_DEFAULTS.payment_description
    ),
    payment_note: text(raw.payment_note, GIFT_CARD_PAGE_DEFAULTS.payment_note),
    travel_heading: text(raw.travel_heading, GIFT_CARD_PAGE_DEFAULTS.travel_heading),
    travel_primary: text(raw.travel_primary, GIFT_CARD_PAGE_DEFAULTS.travel_primary),
    travel_secondary: text(
      raw.travel_secondary,
      GIFT_CARD_PAGE_DEFAULTS.travel_secondary
    ),
    usage_title: text(raw.usage_title, GIFT_CARD_PAGE_DEFAULTS.usage_title),
    usage_text: usageText || GIFT_CARD_PAGE_DEFAULTS.usage_text,
    certificate_note: text(
      raw.certificate_note,
      GIFT_CARD_PAGE_DEFAULTS.certificate_note
    ),
  };
}

export interface GiftCardPaymentMethod {
  id: "cash" | "wise" | "bank-transfer";
  label: string;
  description: string;
  badge?: string;
  details?: string;
  href?: string;
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
      badge: "Pay on site",
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

export interface GiftCardSettings {
  options: GiftCardOptionConfig[];
  payment_methods: GiftCardPaymentMethod[];
}

export const GIFT_CARD_SETTINGS_KEY = "gift_cards_settings";

/** Initial admin settings, using the live catalog for current gift prices. */
export function buildDefaultGiftCardSettings(
  treatments: (Pick<Treatment, "id" | "slug"> & { name?: string })[],
  durations: Pick<Duration, "treatment_id" | "minutes" | "price">[]
): GiftCardSettings {
  return {
    options: resolveGiftCardOptions(treatments, durations).map((option) => ({
      id: option.id,
      title: option.title,
      description: option.description,
      minutes: option.minutes,
      durationLabel: option.durationLabel,
      whatsappLabel: option.whatsappLabel,
      treatmentSlugs: [...option.treatmentSlugs],
      fallbackPrice: option.fallbackPrice,
      price: option.price,
    })),
    payment_methods: getGiftCardPaymentMethods(),
  };
}

function finiteNumber(value: unknown, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function optionalString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function readOptions(value: unknown): GiftCardOptionConfig[] | null {
  if (!Array.isArray(value) || value.length === 0) return null;

  const seen = new Set<string>();
  const options: GiftCardOptionConfig[] = [];

  value.forEach((item, index) => {
    if (!item || typeof item !== "object") return;
    const raw = item as Record<string, unknown>;
    const title = text(raw.title, "").trim();
    if (!title) return;

    let id = text(raw.id, "").trim() || `gift-${index + 1}`;
    while (seen.has(id)) id = `${id}-${index + 1}`;
    seen.add(id);

    const treatmentSlugs = Array.isArray(raw.treatmentSlugs)
      ? raw.treatmentSlugs.filter((slug): slug is string => typeof slug === "string")
      : [];

    const fallbackPrice = Math.max(0, finiteNumber(raw.fallbackPrice, 0));
    const explicitPrice = Number(raw.price);

    options.push({
      id,
      title,
      description: text(raw.description, ""),
      minutes: Math.max(0, finiteNumber(raw.minutes, 0)),
      durationLabel: text(raw.durationLabel, ""),
      whatsappLabel: text(raw.whatsappLabel, title.toLowerCase()),
      treatmentSlugs,
      fallbackPrice,
      ...(Number.isFinite(explicitPrice) && explicitPrice >= 0
        ? { price: explicitPrice }
        : {}),
    });
  });

  return options.length > 0 ? options : null;
}

function readPaymentMethods(
  value: unknown,
  defaults: GiftCardPaymentMethod[]
): GiftCardPaymentMethod[] {
  const rows = Array.isArray(value) ? value : [];

  return defaults.map((fallback) => {
    const stored = rows.find(
      (row): row is Record<string, unknown> =>
        Boolean(row) &&
        typeof row === "object" &&
        (row as Record<string, unknown>).id === fallback.id
    );
    if (!stored) return fallback;

    return {
      id: fallback.id,
      label: text(stored.label, fallback.label),
      description: text(stored.description, fallback.description),
      badge: optionalString(stored.badge) ?? fallback.badge,
      details: optionalString(stored.details) ?? fallback.details,
      href: optionalString(stored.href) ?? fallback.href,
      qrCodeSrc: optionalString(stored.qrCodeSrc) ?? fallback.qrCodeSrc,
      qrCodeCaption:
        optionalString(stored.qrCodeCaption) ?? fallback.qrCodeCaption,
    };
  });
}

/** Merge saved gift card settings with defaults so malformed data cannot break the page. */
export function resolveGiftCardSettings(
  content: Record<string, unknown> | null | undefined,
  defaults: GiftCardSettings
): GiftCardSettings {
  const raw = content ?? {};
  return {
    options: readOptions(raw.options) ?? defaults.options,
    payment_methods: readPaymentMethods(raw.payment_methods, defaults.payment_methods),
  };
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
