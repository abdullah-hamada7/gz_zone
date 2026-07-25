import { Sparkles, Heart, Target, Home } from "lucide-react";

const defaultItems = [
  { icon: Sparkles, title: "Muscle Relief", description: "Alleviates persistent muscle stiffness and chronic tension." },
  { icon: Heart, title: "Cellular Recovery", description: "Promotes micro-circulation and faster cellular recovery." },
  { icon: Target, title: "Tailored Pressure", description: "Tailored pressure intensity based on your individual comfort level." },
  { icon: Home, title: "At Your Location", description: "Delivered directly to your home, hotel, or apartment in Porto." },
];

const itemIcons = [Sparkles, Heart, Target, Home] as const;

export function KeyBenefits({ content }: { content?: Record<string, unknown> }) {
  const heading = (content?.heading as string) ?? "Key Benefits";
  const itemsRaw = content?.items as Array<{ title: string; description: string }> | undefined;
  const items = (itemsRaw && itemsRaw.length > 0)
    ? itemsRaw.map((b, i) => ({ ...b, icon: itemIcons[i] ?? itemIcons[0] }))
    : defaultItems;

  return (
    <section id="key-benefits" className="bg-muted/30 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-xl border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md">
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/5">
                  <Icon className="size-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
