"use client";

import { useState } from "react";
import { WhatsAppButton } from "@/components/public/cta-button";
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
    const url = buildWhatsAppUrl({
      phone: DEFAULT_WHATSAPP,
      treatment: treatmentName,
      duration: selected ? `${selected.minutes} min (€${selected.price})` : undefined,
      date: date || undefined,
      time: time || undefined,
      location: location || undefined,
      notes: notes || undefined,
    });
    trackAndOpen(url, "treatment_booking");
  };

  const handleGAEvent = (action: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", action, {
        treatment: treatmentName,
      });
    }
  };

  return (
    <div className="mt-10 rounded-lg border bg-muted/20 p-6">
      <h2 className="mb-6 text-xl font-semibold">Book This Treatment</h2>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label>Duration</Label>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {durations.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDuration(d.minutes)}
                onFocus={() => handleGAEvent("treatment_duration_select")}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  selectedDuration === d.minutes
                    ? "border-primary bg-primary text-primary-foreground"
                    : "hover:border-primary/50"
                }`}
              >
                {d.minutes} min — €{d.price.toFixed(0)}
              </button>
            ))}
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
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#20BD5A] sm:w-auto"
      >
        Book via WhatsApp
      </button>
    </div>
  );
}
