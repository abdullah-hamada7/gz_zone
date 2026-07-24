import { Clock } from "lucide-react";

const HOURS = [
  { day: "Monday", hours: "08:00 – 22:00" },
  { day: "Tuesday", hours: "08:00 – 22:00" },
  { day: "Wednesday", hours: "08:00 – 22:00" },
  { day: "Thursday", hours: "08:00 – 22:00" },
  { day: "Friday", hours: "08:00 – 22:00" },
  { day: "Saturday", hours: "08:00 – 22:00" },
  { day: "Sunday", hours: "08:00 – 22:00" },
];

export function HoursSection() {
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;

  return (
    <section className="border-y bg-muted/30 py-16">
      <div className="mx-auto max-w-md px-4 text-center sm:px-6">
        <Clock className="mx-auto mb-4 size-8 text-primary" />
        <h2 className="mb-6 text-3xl font-bold tracking-tight">
          Opening Hours
        </h2>

        <div className="divide-y rounded-lg border bg-background text-sm">
          {HOURS.map((h, i) => (
            <div
              key={h.day}
              className={`flex items-center justify-between px-5 py-3 ${
                i === todayIndex ? "font-semibold text-primary" : "text-muted-foreground"
              }`}
            >
              <span>{h.day}</span>
              <span>{h.hours}</span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          Open daily — book your preferred time via WhatsApp
        </p>
      </div>
    </section>
  );
}