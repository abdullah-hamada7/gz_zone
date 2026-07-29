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
  const [selectedDuration, setSelectedDuration] = useState(
    durations[0]?.minutes || 60
  );
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const { trackAndOpen } = useWhatsApp();

  const handleBook = () => {
    const selected = durations.find(
      (d) => d.minutes === selectedDuration
    );
    const isCupping = treatmentName.toLowerCase().includes("cupping");
    const isStretching = treatmentName.toLowerCase().includes("stretching");
    const unitLabel = selected?.unit || (isCupping ? "per session" : isStretching ? "per class" : "min");
    const durationStr = selected ? `${selected.minutes} min (${unitLabel}) (€${selected.price})` : undefined;
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
              const label = unitLabel === "min" ? `${d.minutes} min — €${d.price.toFixed(0)}` : `${d.minutes} min (${unitLabel}) — €${d.price.toFixed(0)}`;
              return (
                <button
                  key={d.id}
                  onClick={() => setSelectedDuration(d.minutes)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                    selectedDuration === d.minutes
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
