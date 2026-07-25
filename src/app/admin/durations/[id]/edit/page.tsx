"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Link from "next/link";
import type { Treatment } from "@/types";

export default function EditDurationPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [treatmentId, setTreatmentId] = useState("");
  const [minutes, setMinutes] = useState(60);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/durations/" + params.id).then((r) => r.json()),
      fetch("/api/admin/treatments").then((r) => r.json()),
    ]).then(([duration, treatmentsData]) => {
      setTreatmentId(duration.treatment_id || "");
      setMinutes(duration.minutes || 60);
      setPrice(duration.price || 0);
      setTreatments(treatmentsData);
      setLoading(false);
    }).catch(() => {
      toast.error("Failed to load duration");
      setLoading(false);
    });
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(`/api/admin/durations/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ treatment_id: treatmentId, minutes, price, sort_order: minutes }),
    });
    setSaving(false);
    if (res.ok) {
      toast.success("Duration updated");
      router.push("/admin/durations");
    } else {
      const data = await res.json();
      toast.error(data.error || "Failed to update");
    }
  }

  if (loading) return <div className="p-6 text-center text-sm text-muted-foreground">Loading...</div>;

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Duration</h1>
        <p className="text-sm text-muted-foreground">Update duration & price</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-card p-6">
        <div className="space-y-2">
          <Label htmlFor="treatment">Treatment</Label>
          <Select value={treatmentId} onValueChange={(v) => setTreatmentId(v ?? "")}>
            <SelectTrigger><SelectValue /></SelectTrigger>
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
          <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
          <Link href="/admin/durations" className={buttonVariants({ variant: "outline" })}>Cancel</Link>
        </div>
      </form>
    </div>
  );
}
