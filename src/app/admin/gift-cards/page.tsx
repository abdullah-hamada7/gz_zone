import type { Metadata } from "next";
import { GiftCardSettingsEditor } from "@/components/admin/gift-card-settings-editor";
import { getAllDurations, getSiteContent, getTreatments } from "@/lib/supabase/queries";
import {
  buildDefaultGiftCardSettings,
  GIFT_CARD_SETTINGS_KEY,
  resolveGiftCardSettings,
} from "@/lib/gift-cards";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gift Certificates",
  robots: { index: false, follow: false },
};

export default async function AdminGiftCardsPage() {
  const [treatments, durations, savedSettings] = await Promise.all([
    getTreatments(),
    getAllDurations(),
    getSiteContent(GIFT_CARD_SETTINGS_KEY),
  ]);

  const defaults = buildDefaultGiftCardSettings(treatments, durations);
  const settings = resolveGiftCardSettings(savedSettings, defaults);

  return (
    <GiftCardSettingsEditor
      initialSettings={settings}
      treatments={treatments.map((treatment) => ({
        id: treatment.id,
        name: treatment.name,
        slug: treatment.slug,
      }))}
    />
  );
}
