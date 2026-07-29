"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Testimonial } from "@/types";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function fetchItems() {
    const res = await fetch("/api/admin/testimonials");
    if (res.ok) setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchItems() }, []);

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/testimonials/${deleteTarget.id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Testimonial deleted");
        fetchItems();
      } else {
        toast.error("Failed to delete testimonial");
      }
    } catch {
      toast.error("Failed to delete testimonial");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Testimonials</h1>
          <p className="text-sm text-muted-foreground">Manage featured testimonials for homepage</p>
        </div>
        <Link href="/admin/testimonials/new" className={buttonVariants()}>
          <Plus className="mr-2 size-4" /> New Testimonial
        </Link>
      </div>

      <div className="rounded-xl border bg-card">
        {loading ? (
          <div className="p-6 text-center text-sm text-muted-foreground">Loading...</div>
        ) : items.length === 0 ? (
          <div className="p-6 text-center text-sm text-muted-foreground">No testimonials yet.</div>
        ) : (
          <div className="divide-y">
            {items.map((item) => (
              <div key={item.id} className="flex items-start gap-4 px-4 py-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{item.customer_name}</p>
                  {item.location && (
                    <p className="text-xs text-muted-foreground">{item.location}</p>
                  )}
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.content}</p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <Link href={`/admin/testimonials/${item.id}/edit`} className={buttonVariants({ variant: "ghost", size: "icon" })}>
                    <Pencil className="size-4" />
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(item)}>
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Testimonial?"
        description={`Are you sure you want to delete testimonial by "${deleteTarget?.customer_name}"?`}
        confirmText="Delete Testimonial"
        loading={deleting}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
