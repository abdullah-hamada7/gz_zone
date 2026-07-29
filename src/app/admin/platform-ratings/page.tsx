"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import type { PlatformRating } from "@/types";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export default function AdminPlatformRatingsPage() {
  const [items, setItems] = useState<PlatformRating[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<PlatformRating | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function fetchItems() {
    const res = await fetch("/api/admin/platform-ratings");
    if (res.ok) setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchItems() }, []);

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/platform-ratings/${deleteTarget.id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Platform rating deleted");
        fetchItems();
      } else {
        toast.error("Failed to delete platform rating");
      }
    } catch {
      toast.error("Failed to delete platform rating");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Platform Ratings</h1>
          <p className="text-sm text-muted-foreground">Manage aggregate ratings per platform</p>
        </div>
        <Link href="/admin/platform-ratings/new" className={buttonVariants()}>
          <Plus className="mr-2 size-4" /> New Rating
        </Link>
      </div>

      <div className="rounded-xl border bg-card">
        {loading ? (
          <div className="p-6 text-center text-sm text-muted-foreground">Loading...</div>
        ) : items.length === 0 ? (
          <div className="p-6 text-center text-sm text-muted-foreground">No platform ratings yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">Platform</th>
                  <th className="px-4 py-3 text-center font-medium hidden sm:table-cell">Rating</th>
                  <th className="px-4 py-3 text-center font-medium">Reviews</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b last:border-0">
                    <td className="px-4 py-3 font-medium">{item.platform}</td>
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      <span className="font-medium">{Number(item.rating).toFixed(1)}</span>
                      <span className="text-amber-500 ml-1">★</span>
                    </td>
                    <td className="px-4 py-3 text-center text-muted-foreground">{item.review_count}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        {item.profile_url && (
                          <a href={item.profile_url} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "ghost", size: "icon" })}>
                            <ExternalLink className="size-4" />
                          </a>
                        )}
                        <Link href={`/admin/platform-ratings/${item.id}/edit`} className={buttonVariants({ variant: "ghost", size: "icon" })}>
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
        title="Delete Platform Rating?"
        description={`Are you sure you want to delete rating for "${deleteTarget?.platform}"?`}
        confirmText="Delete Rating"
        loading={deleting}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
