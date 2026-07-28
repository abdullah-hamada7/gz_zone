import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Calendar, User, ArrowLeft, ArrowRight, MessageCircle, Share2, Tag, Eye } from "lucide-react";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";
import { BLOG_POSTS } from "@/data/blog-posts";
import { BlogCard } from "@/components/public/blog-card";
import { getAllSiteContent, getBlogPosts, getBlogPostBySlug } from "@/lib/supabase/queries";
import { DEFAULT_WHATSAPP } from "@/lib/constants";
import { BlogViewTracker } from "@/components/public/blog-view-tracker";
import { MarkdownRenderer } from "@/components/public/markdown-renderer";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | GZ'ZONE Porto",
    };
  }

  return {
    title: `${post.title} | GZ'ZONE Wellness Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.imageUrl,
          alt: post.imageAlt || post.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, allPosts, siteContent] = await Promise.all([
    getBlogPostBySlug(slug),
    getBlogPosts(),
    getAllSiteContent(),
  ]);

  if (!post) {
    notFound();
  }

  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 3);
  const whatsappUrl = `https://wa.me/${DEFAULT_WHATSAPP.replace(
    /\+/g,
    ""
  )}?text=${encodeURIComponent(
    `Hi! I read your article "${post.title}" and would like to inquire about booking a session.`
  )}`;

  return (
    <>
      <BlogViewTracker slug={slug} />
      <Header />
      <main className="flex-1 min-h-screen bg-background">
        {/* Article Top Navigation */}
        <div className="border-b bg-muted/20 py-4">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 flex items-center justify-between text-xs text-muted-foreground">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-medium hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              Back to All Articles
            </Link>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline">Category:</span>
              <span className="font-semibold text-primary">{post.category}</span>
            </div>
          </div>
        </div>

        {/* Article Header */}
        <article className="py-10">
          <header className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-4">
              <span>{post.category}</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl leading-tight">
              {post.title}
            </h1>

            <p className="mt-4 text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author & Meta Row */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-muted-foreground border-y py-3 max-w-xl mx-auto">
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                  GZ
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">{post.author.name}</p>
                  <p className="text-[10px] text-muted-foreground">{post.author.role}</p>
                </div>
              </div>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="size-3.5" />
                {post.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" />
                {post.readTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-primary font-semibold">
                <Eye className="size-3.5" />
                {post.views_count || 0} reads
              </span>
            </div>
          </header>

          {/* Featured Cover Image */}
          <div className="mx-auto max-w-4xl px-4 sm:px-6 mt-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border shadow-sm">
              <Image
                src={post.imageUrl}
                alt={post.imageAlt || post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
          </div>

          {/* Article Body Content */}
          <div className="mx-auto max-w-3xl px-4 sm:px-6 mt-10">
            <MarkdownRenderer content={post.content} />

            {/* Article Tags */}
            <div className="mt-10 pt-6 border-t flex flex-wrap items-center gap-2">
              <Tag className="size-4 text-muted-foreground mr-1" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Embedded WhatsApp Booking Callout Box */}
            <div className="mt-12 rounded-2xl border bg-gradient-to-br from-primary/10 via-background to-background p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span className="inline-block rounded-full bg-primary/20 px-3 py-0.5 text-xs font-bold text-primary mb-2">
                    Ready to Experience Relief?
                  </span>
                  <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
                    Book Your Mobile Massage & Cupping Session
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground max-w-lg">
                    We bring the professional massage table, oils, and cupping set directly to your home or hotel room in Porto.
                  </p>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-transform hover:scale-105 hover:bg-emerald-700 shrink-0"
                >
                  <MessageCircle className="size-5" />
                  Book via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="border-t bg-muted/30 py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Related Articles</h2>
                <Link
                  href="/blog"
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                >
                  View All <ArrowRight className="size-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relPost) => (
                  <BlogCard key={relPost.id} post={relPost} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer content={siteContent.footer} />
    </>
  );
}
