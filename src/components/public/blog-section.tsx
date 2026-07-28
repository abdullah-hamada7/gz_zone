"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/data/blog-posts";
import { BlogCard } from "@/components/public/blog-card";

export function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredPosts =
    selectedCategory === "all"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.categorySlug === selectedCategory);

  return (
    <section id="blog" className="py-20 bg-muted/30 border-y">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-2">
              <BookOpen className="size-4" />
              <span>Wellness & Recovery Blog</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Massage & Cupping Insights
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl text-sm sm:text-base">
              Expert advice, posture tips, and science-backed benefits of mobile massage & cupping therapy in Porto.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground shrink-0"
          >
            View All Articles
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {BLOG_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-background text-muted-foreground hover:bg-muted border"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.slice(0, 3).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">
            No articles found for this category yet.
          </div>
        )}
      </div>
    </section>
  );
}
