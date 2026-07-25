import { Home, Heart, Briefcase, Clock } from "lucide-react";

const defaultBenefits = [
  { icon: Home, title: "No Travel", description: "Enjoy your treatment without leaving your home, hotel, or apartment." },
  { icon: Heart, title: "Complete Comfort", description: "Relax in a familiar and private environment." },
  { icon: Briefcase, title: "Professional Setup", description: "The portable massage table and necessary equipment are brought directly to you." },
  { icon: Clock, title: "More Time to Relax", description: "Your treatment ends where you are. No traffic and no journey home." },
];

const benefitIcons = [Home, Heart, Briefcase, Clock] as const;

export function WhyMobileMassage({ content }: { content?: Record<string, unknown> }) {
  const heading = (content?.heading as string) ?? "Your Massage. Your Space. Your Comfort.";
  const description = (content?.description as string) ??
    "No travel. No waiting rooms. No need to rush home after your treatment. Enjoy a professional massage in a comfortable and private environment while everything you need for the session is brought directly to you.";
  const benefitsRaw = content?.benefits as Array<{ title: string; description: string }> | undefined;
  const benefits = (benefitsRaw && benefitsRaw.length > 0)
    ? benefitsRaw.map((b, i) => ({ ...b, icon: benefitIcons[i] ?? benefitIcons[0] }))
    : defaultBenefits;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
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
      </div>
    </section>
  );
}