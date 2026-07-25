import { Home, Heart, Briefcase, Clock } from "lucide-react";

const benefitIcons = [Home, Heart, Briefcase, Clock] as const;

export function WhyMobileMassage({ content }: { content?: Record<string, unknown> }) {
  const heading = content?.heading as string | undefined;
  const description = content?.description as string | undefined;
  const benefits = (content?.benefits as Array<{ title: string; description: string }> | undefined) ?? [];

  if (!heading && benefits.length === 0) return null;

  const items = benefits.length > 0
    ? benefits.map((b, i) => ({ ...b, icon: benefitIcons[i] ?? benefitIcons[0] }))
    : [];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {(heading || description) && (
          <div className="mx-auto max-w-2xl text-center">
            {heading && <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>}
            {description && <p className="mt-4 text-lg text-muted-foreground">{description}</p>}
          </div>
        )}
        {items.length > 0 && (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="text-center">
                  <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/5">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}