"use client";

import { useState } from "react";
import { Check, Gift, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buildGiftCardWhatsAppUrl } from "@/lib/whatsapp";
import { DEFAULT_WHATSAPP } from "@/lib/constants";
import { useWhatsApp } from "@/hooks/use-whatsapp";
import type { GiftCardOption, GiftCardPageContent } from "@/lib/gift-certificates";
import { cn } from "@/lib/utils";

export function GiftCardPicker({
  options,
  content,
}: {
  options: GiftCardOption[];
  content: GiftCardPageContent;
}) {
  const [selectedId, setSelectedId] = useState(options[0]?.id ?? "");
  const [giverName, setGiverName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [error, setError] = useState("");
  const { trackAndOpen } = useWhatsApp();

  const selected = options.find((option) => option.id === selectedId) ?? options[0];

  const handleGiftNow = () => {
    if (!selected) return;

    if (!giverName.trim()) {
      setError(content.picker_error_giver);
      return;
    }

    setError("");

    const url = buildGiftCardWhatsAppUrl({
      phone: DEFAULT_WHATSAPP,
      optionTitle: selected.title,
      whatsappLabel: selected.whatsappLabel,
      price: selected.price,
      giverName,
      recipientName,
    });

    trackAndOpen(url, {
      treatment: selected.title,
      duration: selected.durationLabel,
      source_component: "gift_card_page",
    });
  };

  return (
    <div>
      <div
        role="radiogroup"
        aria-label="Choose a gift card"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {options.map((option) => {
          const isSelected = option.id === selected?.id;
          const treatmentNames = option.treatmentNames ?? [];
          const treatmentSummary =
            treatmentNames.length > 2
              ? `${treatmentNames.slice(0, 2).join(", ")} +${treatmentNames.length - 2} more`
              : treatmentNames.join(", ");

          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setSelectedId(option.id)}
              className={cn(
                "relative flex min-h-[150px] flex-col rounded-xl border bg-card p-5 text-left transition-all hover:border-primary/50 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isSelected && "border-primary ring-2 ring-primary/20"
              )}
            >
              <span
                className={cn(
                  "absolute right-4 top-4 flex size-6 items-center justify-center rounded-full border",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-transparent"
                )}
                aria-hidden="true"
              >
                <Check className="size-4" />
              </span>

              <span className="pr-8 text-lg font-semibold">{option.title}</span>
              <span className="mt-2 text-sm text-muted-foreground">
                {option.description}
              </span>
              {(option.durationLabel || treatmentSummary) && (
                <span className="mt-2 flex flex-wrap gap-1.5 text-xs">
                  {option.durationLabel && (
                    <span className="rounded-full bg-muted px-2 py-0.5 font-medium">
                      {option.durationLabel}
                    </span>
                  )}
                  {treatmentSummary && (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                      {treatmentSummary}
                    </span>
                  )}
                </span>
              )}
              <span className="mt-auto pt-4 text-2xl font-bold">€{option.price}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 rounded-xl border bg-muted/20 p-6">
        <div className="flex items-center gap-2">
          <Gift className="size-5 text-primary" />
          <h2 className="text-lg font-semibold">
            {content.picker_personalise_heading}
          </h2>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="giver-name">{content.picker_giver_label}</Label>
            <Input
              id="giver-name"
              value={giverName}
              onChange={(event) => {
                setGiverName(event.target.value);
                if (error) setError("");
              }}
              placeholder={content.picker_giver_placeholder}
              className="mt-1.5"
              aria-invalid={Boolean(error)}
            />
          </div>

          <div>
            <Label htmlFor="recipient-name">{content.picker_recipient_label}</Label>
            <Input
              id="recipient-name"
              value={recipientName}
              onChange={(event) => setRecipientName(event.target.value)}
              placeholder={content.picker_recipient_placeholder}
              className="mt-1.5"
            />
          </div>
        </div>

        {selected && (
          <p className="mt-5 text-sm text-muted-foreground">
            {content.picker_selected_label}{" "}
            <span className="font-medium text-foreground">{selected.title}</span>{" "}
            — €{selected.price}
          </p>
        )}

        {error && (
          <p role="alert" className="mt-3 text-sm font-medium text-destructive">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleGiftNow}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#157347] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#13633B] sm:w-auto"
        >
          <MessageCircle className="size-5" />
          {content.picker_button_text}
        </button>

        <p className="mt-3 text-xs text-muted-foreground">
          {content.picker_note}
        </p>
      </div>
    </div>
  );
}
