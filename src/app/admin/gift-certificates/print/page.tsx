import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { GiftCertificate } from "@/components/admin/gift-certificate";
import { PrintCertificateButton } from "@/components/admin/print-certificate-button";
import { getAllDurations, getTreatments } from "@/lib/supabase/queries";
import { resolveCertificateOptions } from "@/lib/gift-cards";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Print Gift Certificate",
  robots: { index: false, follow: false },
};

type PrintPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstValue(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

export default async function GiftCertificatePrintPage({
  searchParams,
}: PrintPageProps) {
  const params = await searchParams;
  const [treatments, durations] = await Promise.all([
    getTreatments(),
    getAllDurations(),
  ]);
  const options = resolveCertificateOptions(treatments, durations);

  if (options.length === 0) notFound();

  const option =
    options.find((item) => item.id === firstValue(params.gift)) ?? options[0];

  if (!option) notFound();

  const code = firstValue(params.code).slice(0, 24) || "GZ-XXXX-XXXX";
  const giver = firstValue(params.giver).slice(0, 80) || "Giver name";
  const recipient =
    firstValue(params.recipient).slice(0, 80) || "Recipient name";
  const note = firstValue(params.note).slice(0, 140);

  return (
    <main className="min-h-dvh bg-neutral-200 print:bg-white">
      <style>{`
        @page { size: 148mm 210mm; margin: 0; }
        @media print {
          html, body { background: #ffffff !important; }
          .certificate-shell { padding: 0 !important; }
        }
      `}</style>

      <div className="certificate-shell mx-auto flex w-fit flex-col items-center gap-5 px-4 py-8 print:gap-0 print:p-0">
        <div className="flex w-full flex-wrap items-center justify-between gap-3 print:hidden">
          <Link
            href="/admin/gift-cards"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            <ArrowLeft className="size-4" />
            Back to designer
          </Link>
          <PrintCertificateButton />
        </div>

        <GiftCertificate
          code={code}
          giver={giver}
          recipient={recipient}
          option={option}
          note={note || undefined}
        />
      </div>
    </main>
  );
}
