"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { FAQ } from "@/types";

export default function AdminFaqsPage() {
  const [items, setItems] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchItems() {
    const res = await fetch("/api/admin/faqs");
    if (res.ok) setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchItems() }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this FAQ?")) return;
    const res = await fetch(`/api/admin/faqs/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Deleted");
      fetchItems();
    } else {
      toast.error("Failed to delete");
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
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
