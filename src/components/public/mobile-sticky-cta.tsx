import { WhatsAppButton } from "./cta-button";

export function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background p-3 md:hidden">
      <WhatsAppButton size="lg" className="w-full" source="mobile_sticky_bar" />
    </div>
  );
}

