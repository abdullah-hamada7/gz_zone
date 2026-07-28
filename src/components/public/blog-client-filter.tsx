"use client";

import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import type { BlogPost } from "@/types";
import { BLOG_CATEGORIES } from "@/data/blog-posts";
import { BlogCard } from "@/components/public/blog-card";

interface BlogClientFilterProps {
  posts: BlogPost[];
  featuredPost: BlogPost;
}

export function BlogClientFilter({ posts, featuredPost }: BlogClientFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.categorySlug === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const showFeaturedHero =
    selectedCategory === "all" && searchQuery.trim() === "" && featuredPost;
  const gridPosts = showFeaturedHero
    ? filteredPosts.filter((p) => p.id !== featuredPost.id)
    : filteredPosts;

  return (
    <div className="space-y-10">
      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b pb-6">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {BLOG_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics, cupping, deep tissue..."
            className="w-full rounded-full border bg-background pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-xs"
          />
        </div>
      </div>

      {/* Featured Spotlight Article (only when no filters applied) */}
      {showFeaturedHero && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
            <Sparkles className="size-4" />
            <span>Spotlight Article</span>
          </div>
          <BlogCard post={featuredPost} featured={true} />
        </div>
      )}

      {/* Grid of Articles */}
      <div className="space-y-6">
        {showFeaturedHero && (
          <h2 className="text-xl font-bold tracking-tight">Recent Articles</h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16 border rounded-xl bg-card">
            <p className="text-base font-semibold text-foreground">No articles match your search.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try searching for different keywords like "cupping", "recovery", or "stretching".
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 text-xs font-semibold text-primary hover:underline"
            >
              Clear filters & view all articles
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
