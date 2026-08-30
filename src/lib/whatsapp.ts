interface WhatsAppParams {
  phone: string;
  treatment?: string;
  duration?: string;
  date?: string;
  time?: string;
  location?: string;
  notes?: string;
}

export function buildWhatsAppUrl(params: WhatsAppParams): string {
  const { phone, treatment, duration, date, time, location, notes } = params;

  if (!treatment && !duration && !date && !time && !location && !notes) {
    return buildGenericWhatsAppUrl(phone);
  }

  const lines = ["Hello! I would like to book a treatment session.", ""];

  if (treatment) {
    lines.push(`Treatment: ${treatment}`);
  }

  if (duration) {
    const isPerUnit = duration.startsWith("Per ") || duration.startsWith("per ");
    lines.push(`${isPerUnit ? "Option" : "Duration"}: ${duration}`);
  }

  if (date && date.trim()) {
    lines.push(`Preferred date: ${date.trim()}`);
  }

  if (time && time.trim()) {
    lines.push(`Preferred time: ${time.trim()}`);
  }

  if (location && location.trim()) {
    lines.push(`Location: ${location.trim()}`);
  }

  if (notes && notes.trim()) {
    lines.push("", `Additional notes: ${notes.trim()}`);
  }

  const template = lines.join("\n");
  const encoded = encodeURIComponent(template.trim());
  const cleanPhone = phone.replace(/[^0-9]/g, "");

  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}

export function buildGenericWhatsAppUrl(phone: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const message = encodeURIComponent(
    "Hello! I would like to book a treatment session.\nCould you give me more details about treatments and prices?"
  );
  return `https://wa.me/${cleanPhone}?text=${message}`;
}
