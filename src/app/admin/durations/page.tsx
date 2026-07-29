"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Duration, Treatment } from "@/types";

export default function AdminDurationsPage() {
  const [items, setItems] = useState<Duration[]>([]);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchItems() {
    const [durRes, treatRes] = await Promise.all([
      fetch("/api/admin/durations"),
      fetch("/api/admin/treatments"),
    ]);
    if (durRes.ok) setItems(await durRes.json());
    if (treatRes.ok) setTreatments(await treatRes.json());
    setLoading(false);
  }

  useEffect(() => { fetchItems() }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this duration?")) return;
    const res = await fetch(`/api/admin/durations/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Deleted");
      fetchItems();
    } else {
      toast.error("Failed to delete");
    }
  }

  const treatmentMap = Object.fromEntries(
    treatments.map((t) => [t.id, t.name])
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Durations</h1>
          <p className="text-sm text-muted-foreground">Manage treatment duration & pricing options</p>
        </div>
        <Link href="/admin/durations/new" className={buttonVariants()}>
          <Plus className="mr-2 size-4" /> New Duration
        </Link>
      </div>

      <div className="rounded-xl border bg-card">
        {loading ? (
          <div className="p-6 text-center text-sm text-muted-foreground">Loading...</div>
        ) : items.length === 0 ? (
          <div className="p-6 text-center text-sm text-muted-foreground">No durations yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">Treatment</th>
                  <th className="px-4 py-3 text-left font-medium">Minutes</th>
                  <th className="px-4 py-3 text-left font-medium">Pricing Unit</th>
                  <th className="px-4 py-3 text-left font-medium">Price (€)</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b last:border-0">
                    <td className="px-4 py-3 font-medium text-foreground">
                      {treatmentMap[item.treatment_id] || "Unknown"}
                    </td>
                    <td className="px-4 py-3">{item.minutes ?? 0} min</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                        {item.unit || "min"}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold">€{Number(item.price).toFixed(0)}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <Link href={`/admin/durations/${item.id}/edit`} className={buttonVariants({ variant: "ghost", size: "icon" })}>
                          <Pencil className="size-4" />
                        </Link>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
