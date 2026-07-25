"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQ {
  question: string;
  answer: string;
  category: string | null;
}

export function FAQSection({ faqs, hideHeading, content }: { faqs: FAQ[]; hideHeading?: boolean; content?: Record<string, unknown> }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const heading = content?.heading as string | undefined;

  if (faqs.length === 0) return null;

  const categories = [...new Set(faqs.map((f) => f.category).filter(Boolean))];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {!hideHeading && heading && (
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">{heading}</h2>
        )}

        {categories.length > 1 && (
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <span
                key={cat}
                className="rounded-full bg-muted px-4 py-1.5 text-xs font-medium"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-lg border bg-background">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left font-medium"
              >
                {faq.question}
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-muted-foreground transition-transform",
                    openIndex === i && "rotate-180"
                  )}
                />
              </button>
              {openIndex === i && (
                <div className="border-t px-5 py-4 text-sm text-muted-foreground">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}