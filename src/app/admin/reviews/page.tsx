"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import type { Review } from "@/types";

export default function AdminReviewsPage() {
  const [items, setItems] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchItems() {
    const res = await fetch("/api/admin/reviews");
    if (res.ok) setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchItems() }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this review?")) return;
    const res = await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
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
          <h1 className="text-2xl font-bold tracking-tight">Reviews</h1>
          <p className="text-sm text-muted-foreground">Manage client reviews</p>
        </div>
        <Link href="/admin/reviews/new" className={buttonVariants()}>
          <Plus className="mr-2 size-4" /> New Review
        </Link>
      </div>

      <div className="rounded-xl border bg-card">
        {loading ? (
          <div className="p-6 text-center text-sm text-muted-foreground">Loading...</div>
        ) : items.length === 0 ? (
          <div className="p-6 text-center text-sm text-muted-foreground">No reviews yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">Customer</th>
                  <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Content</th>
                  <th className="px-4 py-3 text-center font-medium hidden sm:table-cell">Rating</th>
                  <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Platform</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b last:border-0">
                    <td className="px-4 py-3 font-medium">{item.customer_name}</td>
                    <td className="px-4 py-3 text-muted-foreground max-w-xs truncate hidden md:table-cell">
                      {item.content}
                    </td>
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      <span className="text-amber-500">{'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}</span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{item.platform}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        {item.external_url && (
                          <a href={item.external_url} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "ghost", size: "icon" })}>
                            <ExternalLink className="size-4" />
                          </a>
                        )}
                        <Link href={`/admin/reviews/${item.id}/edit`} className={buttonVariants({ variant: "ghost", size: "icon" })}>
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
