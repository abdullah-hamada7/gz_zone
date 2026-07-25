import Image from "next/image";

export function CertificationsSection({ content }: { content?: Record<string, unknown> }) {
  const label = content?.label as string | undefined;
  const heading = content?.heading as string | undefined;
  const subheading = content?.subheading as string | undefined;
  const description = content?.description as string | undefined;
  const imageAlt = (content?.imageAlt as string) ?? "Professional massage certifications";

  if (!heading && !description) return null;

  return (
    <section className="border-y bg-muted/30 py-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        {label && <p className="mb-2 text-sm font-semibold tracking-wider text-muted-foreground uppercase">{label}</p>}
        {heading && <h2 className="mb-8 text-3xl font-bold tracking-tight">{heading}</h2>}

        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center">
          <div className="relative w-64 overflow-hidden rounded-xl border bg-background p-4 shadow-sm">
            <Image
              src="/images/certs.jpg"
              alt={imageAlt}
              width={240}
              height={340}
              className="mx-auto h-auto w-full object-contain"
            />
          </div>
          <div className="max-w-sm text-left">
            {subheading && <h3 className="mb-2 text-lg font-semibold">{subheading}</h3>}
            {description && <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}