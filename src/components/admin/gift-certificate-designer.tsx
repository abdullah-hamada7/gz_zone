"use client";

import { useState } from "react";
import { Gift, Printer, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GiftCertificate } from "@/components/admin/gift-certificate";
import type { CertificateOption } from "@/lib/gift-certificates";

function generateGiftCode() {
  const raw = crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase();
  return `GZ-${raw.slice(0, 4)}-${raw.slice(4)}`;
}

export function GiftCertificateDesigner({
  options,
  initialCode,
}: {
  options: CertificateOption[];
  initialCode: string;
}) {
  const [code, setCode] = useState(initialCode);
  const [giver, setGiver] = useState("");
  const [recipient, setRecipient] = useState("");
  const [note, setNote] = useState("");
  const [optionId, setOptionId] = useState(options[0]?.id ?? "");

  const option = options.find((item) => item.id === optionId) ?? options[0];
  const ready = Boolean(code.trim() && giver.trim() && recipient.trim() && option);

  if (!option) return null;

  function openPrintView() {
    if (!ready) return;

    const params = new URLSearchParams({
      code: code.trim(),
      giver: giver.trim(),
      recipient: recipient.trim(),
      gift: option.id,
    });
    if (note.trim()) params.set("note", note.trim());

    window.open(
      `/admin/gift-certificates/print?${params.toString()}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
      <div className="h-fit rounded-xl border bg-card p-5">
        <div className="flex items-center gap-2">
          <Gift className="size-5 text-primary" />
          <h2 className="text-lg font-semibold">Certificate details</h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill this in after the payment is confirmed, then print or save as PDF.
        </p>

        <div className="mt-5 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gift-code">Gift code</Label>
            <div className="flex gap-2">
              <Input
                id="gift-code"
                value={code}
                onChange={(event) => setCode(event.target.value.toUpperCase())}
                placeholder="GZ-XXXX-XXXX"
                maxLength={24}
                className="font-mono tracking-wide"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                title="Generate a new code"
                aria-label="Generate a new gift code"
                onClick={() => setCode(generateGiftCode())}
              >
                <RefreshCw className="size-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gift-option">Session</Label>
            <select
              id="gift-option"
              value={optionId}
              onChange={(event) => setOptionId(event.target.value)}
              className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {options.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title} — {item.durationLabel}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground">
              {option.title} · {option.durationLabel}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gift-giver">Giver name</Label>
            <Input
              id="gift-giver"
              value={giver}
              onChange={(event) => setGiver(event.target.value)}
              placeholder="Who is giving the gift"
              maxLength={80}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gift-recipient">Recipient name</Label>
            <Input
              id="gift-recipient"
              value={recipient}
              onChange={(event) => setRecipient(event.target.value)}
              placeholder="Who is receiving the gift"
              maxLength={80}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gift-note">Personal note (optional)</Label>
            <textarea
              id="gift-note"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="A short message for the recipient"
              maxLength={140}
              rows={3}
              className="w-full resize-none rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
            <p className="text-right text-xs text-muted-foreground">
              {note.length}/140
            </p>
          </div>
        </div>

        <Button
          type="button"
          className="mt-2 w-full"
          disabled={!ready}
          onClick={openPrintView}
        >
          <Printer className="size-4" />
          Open print / PDF
        </Button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          A5 portrait. In the print dialog choose &ldquo;Save as PDF&rdquo; and
          enable background graphics.
        </p>
      </div>

      <div className="min-w-0 rounded-xl border bg-muted/30 p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-medium">Live preview</p>
          <p className="text-xs text-muted-foreground">A5 · 148 × 210 mm</p>
        </div>

        <div className="overflow-x-auto">
          <div
            className="mx-auto"
            style={{
              width: "calc(148mm * 0.82)",
              height: "calc(210mm * 0.82)",
            }}
          >
            <div
              style={{
                transform: "scale(0.82)",
                transformOrigin: "top left",
              }}
            >
              <GiftCertificate
                code={code.trim() || "GZ-XXXX-XXXX"}
                giver={giver.trim() || "Giver name"}
                recipient={recipient.trim() || "Recipient name"}
                option={option}
                note={note.trim()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
