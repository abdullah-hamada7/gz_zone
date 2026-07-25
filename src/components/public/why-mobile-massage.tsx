import { Home, Heart, Briefcase, Clock } from "lucide-react";

const benefits = [
  {
    icon: Home,
    title: "No Travel",
    description:
      "Enjoy your treatment without leaving your home, hotel, or apartment.",
  },
  {
    icon: Heart,
    title: "Complete Comfort",
    description:
      "Relax in a familiar and private environment.",
  },
  {
    icon: Briefcase,
    title: "Professional Setup",
    description:
      "The portable massage table and necessary equipment are brought directly to you.",
  },
  {
    icon: Clock,
    title: "More Time to Relax",
    description:
      "Your treatment ends where you are. No traffic and no journey home.",
  },
];

export function WhyMobileMassage() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your Massage. Your Space. Your Comfort.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No travel. No waiting rooms. No need to rush home after your
            treatment. Enjoy a professional massage in a comfortable and private
            environment while everything you need for the session is brought
            directly to you.
          </p>
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
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
