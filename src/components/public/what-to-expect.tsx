import { Package, MessageSquare, Shield, ThumbsUp } from "lucide-react";

const defaultItems = [
  { icon: Package, title: "Full Setup", description: "Complete equipment set-up (portable table, linens, and oils)." },
  { icon: MessageSquare, title: "Pre-Session Consultation", description: "Brief pre-session consultation to identify target pain areas." },
  { icon: Shield, title: "Professional Session", description: "Professional, hygienic, and respectful bodywork session." },
  { icon: ThumbsUp, title: "Aftercare Advice", description: "Post-treatment posture and hydration advice." },
];

const itemIcons = [Package, MessageSquare, Shield, ThumbsUp] as const;

export function WhatToExpect({ content }: { content?: Record<string, unknown> }) {
  const heading = (content?.heading as string) ?? "What to Expect";
  const itemsRaw = content?.items as Array<{ title: string; description: string }> | undefined;
  const items = (itemsRaw && itemsRaw.length > 0)
    ? itemsRaw.map((b, i) => ({ ...b, icon: itemIcons[i] ?? itemIcons[0] }))
    : defaultItems;

  return (
    <section id="what-to-expect" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="text-center">
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
