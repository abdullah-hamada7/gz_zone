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

  const lines = [
    "Hello! I would like to book a massage.",
    "",
    `Treatment: ${treatment || "Not specified"}`,
    `Duration: ${duration || "Not specified"}`,
    `Preferred date: ${date || "Not specified"}`,
    `Preferred time: ${time || "Not specified"}`,
    `Location: ${location || "Not specified"}`,
  ];
  if (notes) {
    lines.push("", `Additional notes: ${notes}`);
  }
  const template = lines.join("\n");

  const encoded = encodeURIComponent(template.trim());
  const cleanPhone = phone.replace(/[^0-9]/g, "");

  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}

export function buildGenericWhatsAppUrl(phone: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const message = encodeURIComponent(
    "Hello! I would like to know more about your mobile massage services."
  );
  return `https://wa.me/${cleanPhone}?text=${message}`;
}
