"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowDown,
  ArrowUp,
  ExternalLink,
  Plus,
  Save,
  Trash2,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  GIFT_CARD_SETTINGS_KEY,
  type GiftCardOptionConfig,
  type GiftCardPaymentMethod,
  type GiftCardSettings,
} from "@/lib/gift-cards";
import { cn } from "@/lib/utils";

type TreatmentChoice = {
  id: string;
  name: string;
  slug: string;
};

function newOption(): GiftCardOptionConfig {
  const suffix = Date.now().toString(36);
  return {
    id: `gift-${suffix}`,
    title: "New gift",
    description: "",
    minutes: 60,
    durationLabel: "60 minutes",
    whatsappLabel: "60-minute massage session",
    treatmentSlugs: [],
    fallbackPrice: 0,
    price: 0,
  };
}

export function GiftCardSettingsEditor({
  initialSettings,
  treatments,
}: {
  initialSettings: GiftCardSettings;
  treatments: TreatmentChoice[];
}) {
  const router = useRouter();
  const [settings, setSettings] = useState<GiftCardSettings>(initialSettings);
  const [saving, setSaving] = useState(false);

  function updateOption(index: number, patch: Partial<GiftCardOptionConfig>) {
    setSettings((prev) => ({
      ...prev,
      options: prev.options.map((option, optionIndex) =>
        optionIndex === index ? { ...option, ...patch } : option
      ),
    }));
  }

  function moveOption(index: number, direction: -1 | 1) {
    setSettings((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.options.length) return prev;
      const options = [...prev.options];
      [options[index], options[target]] = [options[target], options[index]];
      return { ...prev, options };
    });
  }

  function toggleTreatment(index: number, slug: string) {
    const option = settings.options[index];
    const treatmentSlugs = option.treatmentSlugs.includes(slug)
      ? option.treatmentSlugs.filter((item) => item !== slug)
      : [...option.treatmentSlugs, slug];
    updateOption(index, { treatmentSlugs });
  }

  function updatePaymentMethod(
    index: number,
    patch: Partial<GiftCardPaymentMethod>
  ) {
    setSettings((prev) => ({
      ...prev,
      payment_methods: prev.payment_methods.map((method, methodIndex) =>
        methodIndex === index ? { ...method, ...patch } : method
      ),
    }));
  }

  async function handleSave() {
    if (settings.options.length === 0) {
      toast.error("Add at least one gift option.");
      return;
    }

    const incompleteOption = settings.options.find(
      (option) =>
        !option.title.trim() ||
        !option.durationLabel.trim() ||
        !Number.isFinite(Number(option.price)) ||
        Number(option.price) < 0
    );
    if (incompleteOption) {
      toast.error("Every gift needs a title, duration label and valid price.");
      return;
    }

    const incompleteMethod = settings.payment_methods.find(
      (method) => !method.label.trim()
    );
    if (incompleteMethod) {
      toast.error("Every payment method needs a title.");
      return;
    }

    setSaving(true);
    try {
      const payload: GiftCardSettings = {
        options: settings.options.map((option) => ({
          ...option,
          title: option.title.trim(),
          description: option.description.trim(),
          durationLabel: option.durationLabel.trim(),
          whatsappLabel: option.whatsappLabel.trim() || option.title.trim(),
          minutes: Math.max(0, Number(option.minutes) || 0),
          price: Math.max(0, Number(option.price) || 0),
        })),
        payment_methods: settings.payment_methods.map((method) => ({
          ...method,
          label: method.label.trim(),
          description: method.description.trim(),
        })),
      };

      const response = await fetch(
        `/api/admin/site-content/${GIFT_CARD_SETTINGS_KEY}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: payload }),
        }
      );

      if (!response.ok) {
        const error = await response.json().catch(() => null);
        toast.error(error?.error || "Failed to save gift card settings");
        return;
      }

      toast.success("Gift cards updated");
      router.refresh();
    } catch {
      toast.error("Failed to save gift card settings");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gift Cards</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage the gifts shown on the public page, their prices, included
            treatments and the payment cards.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/gift-cards"
            target="_blank"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            View gift page
            <ExternalLink className="ml-2 size-4" />
          </Link>
          <Button size="sm" onClick={handleSave} disabled={saving}>
            <Save className="mr-2 size-4" />
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Gift options</h2>
            <p className="text-sm text-muted-foreground">
              These cards appear on the gift page. Prices are set by you and stay
              fixed until you change them.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setSettings((prev) => ({
                ...prev,
                options: [...prev.options, newOption()],
              }))
            }
          >
            <Plus className="mr-2 size-4" />
            Add gift
          </Button>
        </div>

        <div className="space-y-4">
          {settings.options.map((option, index) => (
            <div key={option.id} className="rounded-xl border bg-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Wallet className="size-4" />
                  </span>
                  <p className="font-semibold">{option.title || "Untitled gift"}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    title="Move up"
                    aria-label={`Move ${option.title} up`}
                    disabled={index === 0}
                    onClick={() => moveOption(index, -1)}
                  >
                    <ArrowUp className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    title="Move down"
                    aria-label={`Move ${option.title} down`}
                    disabled={index === settings.options.length - 1}
                    onClick={() => moveOption(index, 1)}
                  >
                    <ArrowDown className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    title="Remove gift"
                    aria-label={`Remove ${option.title}`}
                    onClick={() =>
                      setSettings((prev) => ({
                        ...prev,
                        options: prev.options.filter((_, i) => i !== index),
                      }))
                    }
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Gift title</Label>
                  <Input
                    value={option.title}
                    onChange={(event) =>
                      updateOption(index, { title: event.target.value })
                    }
                    placeholder="60-Minute Massage"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Price (€)</Label>
                    <Input
                      type="number"
                      min={0}
                      step={1}
                      value={option.price ?? 0}
                      onChange={(event) =>
                        updateOption(index, { price: Number(event.target.value) })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Minutes</Label>
                    <Input
                      type="number"
                      min={0}
                      step={1}
                      value={option.minutes}
                      onChange={(event) =>
                        updateOption(index, { minutes: Number(event.target.value) })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={option.description}
                    onChange={(event) =>
                      updateOption(index, { description: event.target.value })
                    }
                    placeholder="What the recipient gets"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Duration label</Label>
                  <Input
                    value={option.durationLabel}
                    onChange={(event) =>
                      updateOption(index, { durationLabel: event.target.value })
                    }
                    placeholder="60 minutes"
                  />
                </div>

                <div className="space-y-2">
                  <Label>WhatsApp description</Label>
                  <Input
                    value={option.whatsappLabel}
                    onChange={(event) =>
                      updateOption(index, { whatsappLabel: event.target.value })
                    }
                    placeholder="60-minute massage session"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Included treatments</Label>
                  <p className="text-xs text-muted-foreground">
                    Used to describe and price what the recipient can book.
                  </p>
                  <div className="grid gap-2 rounded-lg border p-3 sm:grid-cols-2 lg:grid-cols-3">
                    {treatments.map((treatment) => {
                      const checked = option.treatmentSlugs.includes(
                        treatment.slug
                      );
                      return (
                        <label
                          key={treatment.slug}
                          className={cn(
                            "flex cursor-pointer items-start gap-2 rounded-md border px-2.5 py-2 text-sm",
                            checked
                              ? "border-primary/40 bg-primary/5"
                              : "border-transparent"
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleTreatment(index, treatment.slug)}
                            className="mt-0.5 size-4 accent-primary"
                          />
                          <span>{treatment.name}</span>
                        </label>
                      );
                    })}
                  </div>
                  {treatments.length === 0 && (
                    <p className="text-xs text-muted-foreground">
                      No treatments found in the catalog yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {settings.options.length === 0 && (
            <p className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
              No gift options yet. Add one so the public page has something to
              show.
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Payment method cards</h2>
          <p className="text-sm text-muted-foreground">
            These are the three accepted methods. Edit the text, transfer details
            and Wise QR code shown on the gift page.
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {settings.payment_methods.map((method, index) => (
            <div key={method.id} className="rounded-xl border bg-card p-5">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold">{method.label}</h3>
                <span className="rounded bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                  {method.id}
                </span>
              </div>

              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label>Card title</Label>
                  <Input
                    value={method.label}
                    onChange={(event) =>
                      updatePaymentMethod(index, { label: event.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Short description</Label>
                  <Textarea
                    value={method.description}
                    onChange={(event) =>
                      updatePaymentMethod(index, {
                        description: event.target.value,
                      })
                    }
                  />
                </div>

                {method.id === "cash" && (
                  <div className="space-y-2">
                    <Label>Footer badge</Label>
                    <Input
                      value={method.badge ?? ""}
                      onChange={(event) =>
                        updatePaymentMethod(index, { badge: event.target.value })
                      }
                      placeholder="Pay on site"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Payment details</Label>
                  <Textarea
                    value={method.details ?? ""}
                    onChange={(event) =>
                      updatePaymentMethod(index, {
                        details: event.target.value,
                      })
                    }
                    placeholder={
                      method.id === "bank-transfer"
                        ? "Name: ...\nEmail: ...\nIBAN: ...\nSWIFT/BIC: ..."
                        : "Shown inside the card"
                    }
                    className="min-h-24 font-mono text-xs"
                  />
                </div>

                {method.id === "wise" && (
                  <>
                    <div className="space-y-2">
                      <Label>Payment link</Label>
                      <Input
                        value={method.href ?? ""}
                        onChange={(event) =>
                          updatePaymentMethod(index, { href: event.target.value })
                        }
                        placeholder="https://wise.com/pay/me/..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>QR image path or URL</Label>
                      <Input
                        value={method.qrCodeSrc ?? ""}
                        onChange={(event) =>
                          updatePaymentMethod(index, {
                            qrCodeSrc: event.target.value,
                          })
                        }
                        placeholder="/images/wise-qr.png"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>QR caption</Label>
                      <Input
                        value={method.qrCodeCaption ?? ""}
                        onChange={(event) =>
                          updatePaymentMethod(index, {
                            qrCodeCaption: event.target.value,
                          })
                        }
                        placeholder="QR code for Wise"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border bg-muted/30 p-4">
        <Button onClick={handleSave} disabled={saving}>
          <Save className="mr-2 size-4" />
          {saving ? "Saving..." : "Save changes"}
        </Button>
        <p className="text-xs text-muted-foreground">
          Changes appear on the public gift page immediately after saving.
        </p>
      </div>
    </div>
  );
}
