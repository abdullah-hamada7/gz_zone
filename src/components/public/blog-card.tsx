import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight, User, Eye } from "lucide-react";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-center">
          <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full lg:col-span-7 overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={post.imageAlt || post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 58vw"
              priority
            />
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center rounded-full bg-primary/90 px-3.5 py-1 text-xs font-semibold text-primary-foreground backdrop-blur-md shadow-sm">
                Featured Article
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between p-6 lg:p-8 lg:col-span-5">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="font-semibold uppercase tracking-wider text-primary">
                  {post.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" />
                  {post.readTime}
                </span>
                {typeof post.views_count === "number" && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye className="size-3.5" />
                      {post.views_count} reads
                    </span>
                  </>
                )}
              </div>

              <h3 className="text-2xl font-bold tracking-tight sm:text-3xl transition-colors group-hover:text-primary">
                <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {post.title}
                </Link>
              </h3>

              <p className="mt-4 text-muted-foreground text-sm sm:text-base line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="size-3.5 text-primary" />
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform">
                Read Full Article <ArrowRight className="size-4 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={post.imageUrl}
          alt={post.imageAlt || post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center rounded-full bg-background/90 px-3 py-0.5 text-xs font-semibold text-foreground backdrop-blur-md border shadow-xs">
            {post.category}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-2">
            <span>{post.publishedAt}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {post.readTime}
            </span>
            {typeof post.views_count === "number" && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Eye className="size-3" />
                  {post.views_count}
                </span>
              </>
            )}
          </div>

          <h3 className="text-lg font-bold tracking-tight transition-colors group-hover:text-primary line-clamp-2">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>

          <p className="mt-2.5 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between border-t pt-3 text-xs">
          <span className="text-muted-foreground">{post.author.name}</span>
          <span className="flex items-center text-primary font-medium group-hover:translate-x-0.5 transition-transform">
            Read <ArrowRight className="size-3.5 ml-1" />
          </span>
        </div>
      </div>
    </article>
  );
}
