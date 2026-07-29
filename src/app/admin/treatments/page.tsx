"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Treatment } from "@/types";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export default function AdminTreatmentsPage() {
  const [items, setItems] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Treatment | null>(null);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  async function fetchItems() {
    const res = await fetch("/api/admin/treatments");
    if (res.ok) setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchItems() }, []);

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/treatments/${deleteTarget.id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Treatment deleted");
        fetchItems();
      } else {
        toast.error("Failed to delete treatment");
      }
    } catch {
      toast.error("Failed to delete treatment");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }

  const categoryLabels: Record<string, string> = {
    "massage-therapy": "Massage Therapy",
    "medical-aesthetics": "Medical Aesthetics",
    "holistic-health": "Holistic Health",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Treatments</h1>
          <p className="text-sm text-muted-foreground">Manage massage treatments and prices</p>
        </div>
        <Link href="/admin/treatments/new" className={buttonVariants()}>
          <Plus className="mr-2 size-4" /> New Treatment
        </Link>
      </div>

      <div className="rounded-xl border bg-card">
        {loading ? (
          <div className="p-6 text-center text-sm text-muted-foreground">Loading...</div>
        ) : items.length === 0 ? (
          <div className="p-6 text-center text-sm text-muted-foreground">No treatments yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Slug</th>
                  <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">Category</th>
                  <th className="px-4 py-3 text-center font-medium">Order</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b last:border-0">
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{item.slug}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                      {categoryLabels[item.category] || item.category}
                    </td>
                    <td className="px-4 py-3 text-center text-muted-foreground">{item.sort_order}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <Link href={`/admin/treatments/${item.id}/edit`} className={buttonVariants({ variant: "ghost", size: "icon" })}>
                          <Pencil className="size-4" />
                        </Link>
                        <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(item)}>
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

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title={`Delete Treatment "${deleteTarget?.name}"?`}
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This action will permanently remove the treatment and associated duration options.`}
        confirmText="Delete Treatment"
        loading={deleting}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
