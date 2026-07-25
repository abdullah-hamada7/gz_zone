import { WhatsAppButton } from "./cta-button";

export function FinalCTA({ content }: { content?: Record<string, unknown> }) {
  const heading = content?.heading as string | undefined;
  const description = content?.description as string | undefined;
  const buttonText = (content?.buttonText ?? content?.button_text) as string | undefined;

  if (!heading && !description) return null;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        {heading && <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>}
        {description && <p className="mt-4 text-lg text-muted-foreground">{description}</p>}
        {buttonText && (
          <div className="mt-8">
            <WhatsAppButton size="lg" className="px-8 py-6 text-base" text={buttonText} />
          </div>
        )}
      </div>
    </section>
  );
}