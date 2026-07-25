import { Search, MapPin, Sparkles } from "lucide-react";

const stepIcons = [Search, MapPin, Sparkles] as const;

export function HowItWorks({ content }: { content?: Record<string, unknown> }) {
  const heading = content?.heading as string | undefined;
  const steps = (content?.steps as Array<{ title: string; description: string }> | undefined) ?? [];
  const stepNumberPrefix = (content?.stepNumberPrefix as string) ?? "0";

  if (!heading && steps.length === 0) return null;

  const items = steps.length > 0
    ? steps.map((s, i) => ({ ...s, icon: stepIcons[i] ?? stepIcons[0] }))
    : [];

  return (
    <section id="how-it-works" className="bg-muted/30 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {heading && <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>}
        {items.length > 0 && (
          <div className="grid gap-8 md:grid-cols-3">
            {items.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative text-center">
                  <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="size-8 text-primary" />
                  </div>
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                    {stepNumberPrefix}{i + 1}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}