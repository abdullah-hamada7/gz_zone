import { WhatsAppButton } from "./cta-button";

export function FinalCTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to Book Your Massage?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Send a message on WhatsApp and I will help you find the perfect
          treatment.
        </p>
        <div className="mt-8">
          <WhatsAppButton size="lg" className="px-8 py-6 text-base" />
        </div>
      </div>
    </section>
  );
}
