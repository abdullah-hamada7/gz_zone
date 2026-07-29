"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { FAQ } from "@/types";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export default function AdminFaqsPage() {
  const [items, setItems] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<FAQ | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function fetchItems() {
    const res = await fetch("/api/admin/faqs");
    if (res.ok) setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchItems() }, []);

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/faqs/${deleteTarget.id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("FAQ deleted");
        fetchItems();
      } else {
        toast.error("Failed to delete FAQ");
      }
    } catch {
      toast.error("Failed to delete FAQ");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">FAQs</h1>
          <p className="text-sm text-muted-foreground">Manage frequently asked questions</p>
        </div>
        <Link href="/admin/faqs/new" className={buttonVariants()}>
          <Plus className="mr-2 size-4" /> New FAQ
        </Link>
      </div>

      <div className="rounded-xl border bg-card">
        {loading ? (
          <div className="p-6 text-center text-sm text-muted-foreground">Loading...</div>
        ) : items.length === 0 ? (
          <div className="p-6 text-center text-sm text-muted-foreground">No FAQs yet.</div>
        ) : (
          <div className="divide-y">
            {items.map((item) => (
              <div key={item.id} className="flex items-start gap-4 px-4 py-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.question}</p>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{item.answer}</p>
                  <span className="mt-1 inline-block text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>
                <div className="flex shrink-0 gap-1">
                  <Link href={`/admin/faqs/${item.id}/edit`} className={buttonVariants({ variant: "ghost", size: "icon" })}>
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
        title="Delete FAQ?"
        description={`Are you sure you want to delete "${deleteTarget?.question}"?`}
        confirmText="Delete FAQ"
        loading={deleting}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
