"use client";

import Image from "next/image";
import {
  ExternalLink,
  Landmark,
  MessageCircle,
  Send,
  Smartphone,
  Wallet,
} from "lucide-react";
import { DEFAULT_WHATSAPP } from "@/lib/constants";
import { buildWhatsAppMessageUrl } from "@/lib/whatsapp";
import { useWhatsApp } from "@/hooks/use-whatsapp";
import type { GiftCardPaymentMethod } from "@/lib/gift-certificates";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const methodIcons = {
  revolut: Wallet,
  "mb-way": Smartphone,
  wise: Send,
  "bank-transfer": Landmark,
};

const methodLogos: Record<string, string> = {
  "mb-way": "/images/mb_way_forWebsite.png",
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
    <div className="grid gap-4 md:grid-cols-2">
      {methods.map((method) => {
        const Icon = methodIcons[method.id];

        return (
          <div
            key={method.id}
            className="flex h-full flex-col rounded-2xl border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center gap-3">
              {methodLogos[method.id] ? (
                <span className="flex h-10 shrink-0 items-center justify-center rounded-xl bg-white px-2 ring-1 ring-border">
                  <Image
                    src={methodLogos[method.id]}
                    alt={`${method.label} logo`}
                    width={160}
                    height={80}
                    className="h-6 w-auto object-contain"
                  />
                </span>
              ) : (
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
              )}
              {methodLogos[method.id] ? (
                <span className="sr-only">{method.label}</span>
              ) : (
                <h3 className="text-lg font-semibold">{method.label}</h3>
              )}
            </div>

            {method.description && (
              <p className="mt-3 text-sm text-muted-foreground">
                {method.description}
              </p>
            )}

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
              {method.href ? (
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
