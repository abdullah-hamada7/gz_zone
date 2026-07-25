import { WhatsAppButton } from "./cta-button";

export function MobileStickyCTA({ content }: { content?: Record<string, unknown> }) {
  const buttonText = (content?.buttonText as string) ?? "";
  const defaultTreatment = (content?.defaultTreatment as string) ?? "";

  if (!buttonText) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background p-3 md:hidden">
      <WhatsAppButton size="lg" className="w-full" text={buttonText} treatment={defaultTreatment} />
    </div>
  );
}