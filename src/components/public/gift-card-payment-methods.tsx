"use client";

import Image from "next/image";
import { CreditCard, ExternalLink, MessageCircle } from "lucide-react";
import { DEFAULT_WHATSAPP } from "@/lib/constants";
import { buildWhatsAppMessageUrl } from "@/lib/whatsapp";
import { useWhatsApp } from "@/hooks/use-whatsapp";
import type { GiftCardPaymentMethod } from "@/lib/gift-cards";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    <div className="grid gap-4 sm:grid-cols-2">
      {methods.map((method) => (
        <div key={method.id} className="flex flex-col rounded-xl border bg-card p-5">
          <div className="flex items-center gap-2">
            <CreditCard className="size-4 text-primary" />
            <h3 className="font-semibold">{method.label}</h3>
          </div>

          <p className="mt-1.5 text-sm text-muted-foreground">{method.description}</p>

          {method.details && (
            <p className="mt-3 whitespace-pre-line break-words rounded-md bg-muted/60 px-3 py-2 font-mono text-xs">
              {method.details}
            </p>
          )}

          {method.qrCodeSrc && (
            <figure className="mt-4 flex items-center gap-3">
              <Image
                src={method.qrCodeSrc}
                alt="QR code for Wise"
                width={112}
                height={112}
                className="size-28 rounded-lg border bg-white object-contain p-1"
              />
              {method.qrCodeCaption && (
                <figcaption className="text-xs font-medium text-muted-foreground">
                  {method.qrCodeCaption}
                </figcaption>
              )}
            </figure>
          )}

          {method.id === "cash" ? (
            <p className="mt-4 rounded-md bg-muted/60 px-3 py-2 text-center text-xs font-semibold text-muted-foreground">
              Pay on site
            </p>
          ) : method.href ? (
            <a
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "mt-4 inline-flex w-full items-center justify-center gap-2"
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
                "mt-4 inline-flex w-full items-center justify-center gap-2"
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
                "mt-4 inline-flex w-full items-center justify-center gap-2"
              )}
            >
              <MessageCircle className="size-4" />
              Request details on WhatsApp
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
