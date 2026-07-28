"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, Pencil, Trash2, BookOpen, Star, Eye } from "lucide-react";
import { toast } from "sonner";
import type { BlogPost } from "@/types";

export default function AdminBlogPage() {
  const [items, setItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchItems() {
    try {
      const res = await fetch("/api/admin/blog");
      if (res.ok) {
        setItems(await res.json());
      }
    } catch {
      toast.error("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this blog article?")) return;
    const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Article deleted");
      fetchItems();
    } else {
      toast.error("Failed to delete article");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog Articles</h1>
          <p className="text-sm text-muted-foreground">
            Manage your massage, cupping, and wellness articles
          </p>
        </div>
        <Link href="/admin/blog/new" className={buttonVariants()}>
          <Plus className="mr-2 size-4" /> New Article
        </Link>
      </div>

      <div className="rounded-xl border bg-card shadow-xs">
        {loading ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            Loading blog posts...
          </div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center space-y-3">
            <BookOpen className="mx-auto size-8 text-muted-foreground/60" />
            <p className="text-sm text-muted-foreground">No articles found.</p>
            <Link href="/admin/blog/new" className={buttonVariants({ variant: "outline", size: "sm" })}>
              Create Your First Article
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">Title</th>
                  <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">Category</th>
                  <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Read Time</th>
                  <th className="px-4 py-3 text-center font-medium">Total Reads</th>
                  <th className="px-4 py-3 text-center font-medium">Featured</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b last:border-0 hover:bg-muted/20">
                    <td className="px-4 py-3 font-medium">
                      <div>
                        <Link
                          href={`/blog/${item.slug}`}
                          target="_blank"
                          className="hover:underline font-semibold text-foreground"
                        >
                          {item.title}
                        </Link>
                        <p className="text-xs text-muted-foreground line-clamp-1">{item.excerpt}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                      <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                      {item.readTime}
                    </td>
                    <td className="px-4 py-3 text-center font-semibold text-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Eye className="size-3.5 text-primary" />
                        {item.views_count || 0}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {item.featured ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-600">
                          <Star className="size-3 fill-amber-500" /> Yes
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">No</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <Link
                          href={`/admin/blog/${item.id}/edit`}
                          className={buttonVariants({ variant: "ghost", size: "icon" })}
                        >
                          <Pencil className="size-4" />
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(item.id)}
                        >
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
