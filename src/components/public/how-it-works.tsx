import { Search, MapPin, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Choose Your Treatment",
    description:
      "Select the treatment and duration that best match your needs.",
  },
  {
    icon: MapPin,
    title: "Choose Your Location",
    description:
      "Tell us where you would like to receive your treatment.",
  },
  {
    icon: Sparkles,
    title: "Relax",
    description:
      "The professional equipment comes to you. You simply relax and enjoy your treatment.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-muted/30 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          How It Works
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative text-center">
                <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="size-8 text-primary" />
                </div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                  0{i + 1}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
