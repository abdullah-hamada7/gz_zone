"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { DEFAULT_WHATSAPP } from "@/lib/constants";
import { useWhatsApp } from "@/hooks/use-whatsapp";
import { LocationPicker } from "@/components/public/location-picker";

interface DurationOption {
  id: string;
  minutes: number;
  price: number;
  unit?: string;
}

export function TreatmentBooking({
  treatmentName,
  durations,
}: {
  treatmentName: string;
  durations: DurationOption[];
}) {
  const [selectedId, setSelectedId] = useState(durations[0]?.id || "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const { trackAndOpen } = useWhatsApp();

  const activeId = selectedId || durations[0]?.id || "";
  const selected = durations.find((d) => d.id === activeId) || durations[0];

  const handleBook = () => {
    const isCupping = treatmentName.toLowerCase().includes("cupping");
    const isStretching = treatmentName.toLowerCase().includes("stretching");
    const unitLabel = selected?.unit || (isCupping ? "per session" : isStretching ? "per class" : "min");
    
    let durationStr: string | undefined = undefined;
    if (selected) {
      if (unitLabel === "min") {
        durationStr = `${selected.minutes} min (€${selected.price})`;
      } else if (unitLabel === "per session") {
        durationStr = `Per Session (€${selected.price})`;
      } else if (unitLabel === "per class") {
        durationStr = `Per Class (€${selected.price})`;
      } else {
        durationStr = `${unitLabel} (€${selected.price})`;
      }
    }

    const url = buildWhatsAppUrl({
      phone: DEFAULT_WHATSAPP,
      treatment: treatmentName,
      duration: durationStr,
      date: date || undefined,
      time: time || undefined,
      location: location || undefined,
      notes: notes || undefined,
    });
    trackAndOpen(url, {
      treatment: treatmentName,
      duration: durationStr,
      source_component: "treatment_booking_form",
    });
  };

  return (
    <div className="mt-10 rounded-lg border bg-muted/20 p-6">
      <h2 className="mb-6 text-xl font-semibold">Book This Treatment</h2>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label>Option & Pricing</Label>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {durations.map((d) => {
              const isCupping = treatmentName.toLowerCase().includes("cupping");
              const isStretching = treatmentName.toLowerCase().includes("stretching");
              const unitLabel = d.unit || (isCupping ? "per session" : isStretching ? "per class" : "min");
              
              let label = "";
              if (unitLabel === "min") {
                label = `${d.minutes} min — €${d.price.toFixed(0)}`;
              } else if (unitLabel === "per session") {
                label = `Per Session — €${d.price.toFixed(0)}`;
              } else if (unitLabel === "per class") {
                label = `Per Class — €${d.price.toFixed(0)}`;
              } else {
                label = `${unitLabel} — €${d.price.toFixed(0)}`;
              }

              const isSelected = activeId === d.id;

              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedId(d.id)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "hover:border-primary/50"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <Label htmlFor="date">Preferred Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="time">Preferred Time</Label>
          <Input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1.5"
          />
        </div>

        <div className="sm:col-span-2">
          <LocationPicker value={location} onChange={setLocation} />
        </div>
      </div>

      <div className="mt-4">
        <Label htmlFor="notes">Additional Notes</Label>
        <textarea
          id="notes"
          rows={3}
          placeholder="Any specific requests or questions..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-1.5 w-full rounded-lg border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <button
        onClick={handleBook}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#157347] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#13633B] sm:w-auto"
      >
        Book via WhatsApp
      </button>
    </div>
  );
}
