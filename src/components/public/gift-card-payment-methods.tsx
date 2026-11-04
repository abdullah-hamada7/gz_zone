"use client";

import Image from "next/image";
import {
  Banknote,
  ExternalLink,
  Landmark,
  MessageCircle,
  Send,
} from "lucide-react";
import { DEFAULT_WHATSAPP } from "@/lib/constants";
import { buildWhatsAppMessageUrl } from "@/lib/whatsapp";
import { useWhatsApp } from "@/hooks/use-whatsapp";
import type { GiftCardPaymentMethod } from "@/lib/gift-cards";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const methodIcons = {
  cash: Banknote,
  wise: Send,
  "bank-transfer": Landmark,
};

export function GiftCardPaymentMethods({
  methods,
}: {
  methods: GiftCardPaymentMethod[];
}) {
  const { trackAndOpen } = useWhatsApp();

  const requestDetails = (method: GiftCardPaymentMethod) => {
    const url = buildWhatsAppMessageUrl(
      DEFAULT_WHATSAPP,
      `Hello, I would like to pay for a gift card by ${method.label}. Please send me the payment details.`
    );
    trackAndOpen(url, {
      treatment: "Gift card payment",
      source_component: "gift_card_payment_details",
    });
  };

  const sendReceipt = (method: GiftCardPaymentMethod) => {
    const url = buildWhatsAppMessageUrl(
      DEFAULT_WHATSAPP,
      `Hello, I have paid for a gift card by ${method.label}. I am sending the payment receipt now.`
    );
    trackAndOpen(url, {
      treatment: "Gift card payment",
      source_component: "gift_card_payment_receipt",
    });
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {methods.map((method) => {
        const Icon = methodIcons[method.id];

        return (
          <div
            key={method.id}
            className="flex h-full flex-col rounded-2xl border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <h3 className="text-lg font-semibold">{method.label}</h3>
            </div>

            <p className="mt-3 text-sm text-muted-foreground">
              {method.description}
            </p>

            {method.qrCodeSrc ? (
              <div className="mt-4 flex items-start gap-4">
                <Image
                  src={method.qrCodeSrc}
                  alt={method.qrCodeCaption ?? `${method.label} QR code`}
                  width={112}
                  height={112}
                  className="size-24 shrink-0 rounded-lg border bg-white object-contain p-1"
                />
                <div className="min-w-0 space-y-2">
                  {method.details && (
                    <p className="whitespace-pre-line break-words rounded-md bg-muted/60 px-3 py-2 font-mono text-xs">
                      {method.details}
                    </p>
                  )}
                  {method.qrCodeCaption && (
                    <p className="text-xs font-medium text-muted-foreground">
                      {method.qrCodeCaption}
                    </p>
                  )}
                </div>
              </div>
            ) : method.details ? (
              <p className="mt-4 whitespace-pre-line break-words rounded-lg bg-muted/60 px-3 py-2.5 font-mono text-xs leading-relaxed">
                {method.details}
              </p>
            ) : null}

            <div className="mt-auto pt-5">
              {method.id === "cash" ? (
                <p className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-muted/60 px-3 py-2 text-center text-sm font-semibold text-muted-foreground">
                  <Banknote className="size-4" />
                  {method.badge || "Pay on site"}
                </p>
              ) : method.href ? (
                <a
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "inline-flex w-full items-center justify-center gap-2"
                  )}
                >
                  Pay with {method.label}
                  <ExternalLink className="size-4" />
                </a>
              ) : method.details ? (
                <button
                  type="button"
                  onClick={() => sendReceipt(method)}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "inline-flex w-full items-center justify-center gap-2"
                  )}
                >
                  <MessageCircle className="size-4" />
                  Send receipt on WhatsApp
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => requestDetails(method)}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "inline-flex w-full items-center justify-center gap-2"
                  )}
                >
                  <MessageCircle className="size-4" />
                  Request details on WhatsApp
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
