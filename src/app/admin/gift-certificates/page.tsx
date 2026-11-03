import type { Metadata } from "next";
import { randomUUID } from "node:crypto";
import { GiftCertificateDesigner } from "@/components/admin/gift-certificate-designer";
import { getAllDurations, getTreatments } from "@/lib/supabase/queries";
import { resolveCertificateOptions } from "@/lib/gift-cards";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gift Certificates",
  robots: { index: false, follow: false },
};

export default async function AdminGiftCertificatesPage() {
  const [treatments, durations] = await Promise.all([
    getTreatments(),
    getAllDurations(),
  ]);
  const options = resolveCertificateOptions(treatments, durations);

  const raw = randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase();
  const initialCode = `GZ-${raw.slice(0, 4)}-${raw.slice(4)}`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gift Certificates</h1>
        <p className="text-sm text-muted-foreground">
          Create the personalised A5 certificate after a gift card payment is
          confirmed. Prices follow the live treatment catalog.
        </p>
      </div>

      <GiftCertificateDesigner options={options} initialCode={initialCode} />
    </div>
  );
}
