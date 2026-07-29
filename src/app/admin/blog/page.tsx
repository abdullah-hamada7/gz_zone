"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2, BookOpen, Star, Eye, Tag, FolderPlus, X, Check } from "lucide-react";
import { toast } from "sonner";
import type { BlogPost } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface BlogCategory {
  name: string;
  slug: string;
}

export default function AdminBlogPage() {
  const [items, setItems] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);

  // Category management state
  const [newCatName, setNewCatName] = useState("");
  const [newCatSlug, setNewCatSlug] = useState("");
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editCatName, setEditCatName] = useState("");
  const [editCatSlug, setEditCatSlug] = useState("");
  const [savingCategory, setSavingCategory] = useState(false);

  async function fetchItems() {
    try {
      const [resBlog, resCat] = await Promise.all([
        fetch("/api/admin/blog"),
        fetch("/api/admin/blog/categories"),
      ]);
      if (resBlog.ok) {
        setItems(await resBlog.json());
      }
      if (resCat.ok) {
        setCategories(await resCat.json());
      }
    } catch {
      toast.error("Failed to load blog data");
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

  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!newCatName.trim()) return;
    setSavingCategory(true);
    try {
      const res = await fetch("/api/admin/blog/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCatName.trim(), slug: newCatSlug.trim() || undefined }),
      });
      if (res.ok) {
        toast.success("Category created!");
        setNewCatName("");
        setNewCatSlug("");
        const updated = await res.json();
        setCategories(updated);
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to add category");
      }
    } catch {
      toast.error("Failed to add category");
    } finally {
      setSavingCategory(false);
    }
  }

  async function handleSaveEditCategory(oldSlug: string) {
    if (!editCatName.trim()) return;
    setSavingCategory(true);
    try {
      const res = await fetch("/api/admin/blog/categories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldSlug, name: editCatName.trim(), slug: editCatSlug.trim() || undefined }),
      });
      if (res.ok) {
        toast.success("Category updated!");
        setEditingSlug(null);
        const updated = await res.json();
        setCategories(updated);
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to update category");
      }
    } catch {
      toast.error("Failed to update category");
    } finally {
      setSavingCategory(false);
    }
  }

  async function handleDeleteCategory(slug: string, name: string) {
    if (!confirm(`Are you sure you want to delete category "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/blog/categories?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Category deleted");
        const updated = await res.json();
        setCategories(updated);
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to delete category");
      }
    } catch {
      toast.error("Failed to delete category");
    }
  }

  const totalReads = items.reduce((acc, item) => acc + (item.views_count || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog Articles & Categories</h1>
          <p className="text-sm text-muted-foreground">
            Manage articles, view read stats, and customize blog categories
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowCategoryDialog(true)}>
            <FolderPlus className="mr-2 size-4 text-primary" /> Manage Categories ({categories.length})
          </Button>
          <Link href="/admin/blog/new" className={buttonVariants()}>
            <Plus className="mr-2 size-4" /> New Article
          </Link>
        </div>
      </div>

      {/* Summary Analytics Bar */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-card p-5 shadow-xs flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BookOpen className="size-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Articles</p>
            <p className="text-2xl font-bold">{items.length}</p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-xs flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
            <Eye className="size-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Article Reads</p>
            <p className="text-2xl font-bold">{totalReads}</p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-xs flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
            <Tag className="size-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Active Categories</p>
            <p className="text-2xl font-bold">{categories.length}</p>
          </div>
        </div>
      </div>

      {/* Blog Articles Table */}
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
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-600">
                        <Eye className="size-3.5" />
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

      {/* Category Manager Modal */}
      <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <FolderPlus className="size-5 text-primary" /> Manage Article Categories
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Create, edit, or delete categories for your blog posts.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 my-2">
            {/* Create New Category Form */}
            <form onSubmit={handleAddCategory} className="space-y-3 rounded-lg border p-4 bg-muted/20">
              <p className="text-xs font-bold uppercase tracking-wider text-foreground">Add New Category</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Input
                  placeholder="Category Name (e.g. Cupping)"
                  value={newCatName}
                  onChange={(e) => {
                    setNewCatName(e.target.value);
                    if (!newCatSlug) {
                      setNewCatSlug(e.target.value.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-"));
                    }
                  }}
                  required
                />
                <Input
                  placeholder="Slug (optional)"
                  value={newCatSlug}
                  onChange={(e) => setNewCatSlug(e.target.value)}
                  className="font-mono text-xs"
                />
              </div>
              <Button type="submit" size="sm" disabled={savingCategory} className="w-full">
                <Plus className="mr-2 size-4" /> Add Category
              </Button>
            </form>

            {/* List of Existing Categories */}
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Existing Categories</p>
              <div className="divide-y rounded-lg border bg-card max-h-60 overflow-y-auto">
                {categories.map((cat) => (
                  <div key={cat.slug} className="flex items-center justify-between p-3 gap-2 text-sm">
                    {editingSlug === cat.slug ? (
                      <div className="flex items-center gap-2 flex-1">
                        <Input
                          size={1}
                          value={editCatName}
                          onChange={(e) => setEditCatName(e.target.value)}
                          className="h-8 text-xs flex-1"
                        />
                        <Input
                          size={1}
                          value={editCatSlug}
                          onChange={(e) => setEditCatSlug(e.target.value)}
                          className="h-8 text-xs font-mono flex-1"
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-emerald-600"
                          onClick={() => handleSaveEditCategory(cat.slug)}
                        >
                          <Check className="size-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => setEditingSlug(null)}
                        >
                          <X className="size-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div>
                          <p className="font-semibold text-foreground">{cat.name}</p>
                          <p className="text-[11px] text-muted-foreground font-mono">slug: {cat.slug}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => {
                              setEditingSlug(cat.slug);
                              setEditCatName(cat.name);
                              setEditCatSlug(cat.slug);
                            }}
                          >
                            <Pencil className="size-3.5 text-muted-foreground" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => handleDeleteCategory(cat.slug, cat.name)}
                          >
                            <Trash2 className="size-3.5 text-destructive" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
