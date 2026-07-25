import { Clock } from "lucide-react";

export function HoursSection({ content }: { content?: Record<string, unknown> }) {
  const heading = content?.heading as string | undefined;
  const subtitle = content?.subtitle as string | undefined;
  const days = (content?.days as Array<{ day: string; hours: string }> | undefined) ?? [];

  if (days.length === 0 && !heading) return null;

  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;

  return (
    <section className="border-y bg-muted/30 py-16">
      <div className="mx-auto max-w-md px-4 text-center sm:px-6">
        <Clock className="mx-auto mb-4 size-8 text-primary" />
        {heading && <h2 className="mb-6 text-3xl font-bold tracking-tight">{heading}</h2>}

        {days.length > 0 && (
          <div className="divide-y rounded-lg border bg-background text-sm">
            {days.map((h, i) => (
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
        )}

        {subtitle && (
          <p className="mt-4 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </section>
  );
}