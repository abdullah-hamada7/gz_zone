export function TrustBar({ content }: { content?: Record<string, unknown> }) {
  const items = (content?.items as Array<{ label: string }> | undefined) ?? [];

  if (items.length === 0) return null;

  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground">
          {items.map((item, i) => (
            <span key={item.label} className="flex items-center gap-2">
              {i > 0 && (
                <span className="hidden text-muted-foreground/40 sm:inline">&#8226;</span>
              )}
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}