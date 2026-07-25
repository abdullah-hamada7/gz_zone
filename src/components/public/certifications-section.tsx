import Image from "next/image";

export function CertificationsSection() {
  return (
    <section className="border-y bg-muted/30 py-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <p className="mb-2 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
          Certified & Professional
        </p>
        <h2 className="mb-8 text-3xl font-bold tracking-tight">
          Your Wellbeing Is in Safe Hands
        </h2>

        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center">
          <div className="relative w-64 overflow-hidden rounded-xl border bg-background p-4 shadow-sm">
            <Image
              src="/images/certs.jpg"
              alt="Professional massage certifications"
              width={240}
              height={340}
              className="mx-auto h-auto w-full object-contain"
            />
          </div>
          <div className="max-w-sm text-left">
            <h3 className="mb-2 text-lg font-semibold">
              Trained & Certified Therapist
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Omar Elgazzar is a professionally trained massage therapist with
              certified qualifications in massage therapy, cupping, and
              specialized bodywork. Every treatment is delivered with
              professionalism, care, and attention to your wellbeing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}