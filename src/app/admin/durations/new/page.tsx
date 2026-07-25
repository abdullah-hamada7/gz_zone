"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Link from "next/link";
import type { Treatment } from "@/types";

export default function NewDurationPage() {
  const router = useRouter();
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [treatmentId, setTreatmentId] = useState("");
  const [minutes, setMinutes] = useState(60);
  const [price, setPrice] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/treatments")
      .then((res) => res.json())
      .then(setTreatments);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!treatmentId) { toast.error("Please select a treatment"); return; }
    setSaving(true);
    const res = await fetch("/api/admin/durations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ treatment_id: treatmentId, minutes, price, sort_order: minutes }),
    });
    setSaving(false);
    if (res.ok) {
      toast.success("Duration created");
      router.push("/admin/durations");
    } else {
      const data = await res.json();
      toast.error(data.error || "Failed to create");
    }
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">New Duration</h1>
        <p className="text-sm text-muted-foreground">Add a duration & price option for a treatment</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-card p-6">
        <div className="space-y-2">
          <Label htmlFor="treatment">Treatment</Label>
          <Select value={treatmentId} onValueChange={(v) => setTreatmentId(v ?? "")}>
            <SelectTrigger><SelectValue placeholder="Select treatment" /></SelectTrigger>
            <SelectContent>
              {treatments.map((t) => (
                <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="minutes">Duration (minutes)</Label>
          <Input id="minutes" type="number" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (€)</Label>
          <Input id="price" type="number" step="0.01" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Create Duration"}</Button>
          <Link href="/admin/durations" className={buttonVariants({ variant: "outline" })}>Cancel</Link>
        </div>
      </form>
    </div>
  );
}
