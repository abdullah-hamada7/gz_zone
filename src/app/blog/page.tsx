import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";
import { BLOG_POSTS } from "@/data/blog-posts";
import { BlogCard } from "@/components/public/blog-card";
import { getAllSiteContent, getBlogPosts } from "@/lib/supabase/queries";
import { BlogClientFilter } from "@/components/public/blog-client-filter";
import { NewsletterSection } from "@/components/public/newsletter-section";

export const metadata: Metadata = {
  title: "Massage & Cupping Wellness Blog | GZ'ZONE Porto",
  description:
    "Explore expert articles, cupping therapy guides, posture stretching tips, and science-backed benefits of mobile massage therapy in Porto.",
  openGraph: {
    title: "Massage & Cupping Wellness Blog | GZ'ZONE Porto",
    description:
      "Expert tips on cupping therapy, deep tissue massage, muscle recovery, and pain relief delivered to your home or hotel in Porto.",
    type: "website",
  },
};

export default async function BlogPage() {
  const [siteContent, posts] = await Promise.all([
    getAllSiteContent(),
    getBlogPosts(),
  ]);
  const featuredPost = posts.find((p) => p.featured) || posts[0];

  const blogHeader = siteContent.blog_page || {};
  const badgeText = (blogHeader.badge as string) ?? "🌿 GZ'ZONE Wellness & Recovery Journal";
  const headingText = (blogHeader.heading as string) ?? "Massage & Cupping Insights";
  const descriptionText = (blogHeader.description as string) ?? "Discover professional tips on myofascial release, posture correction, stress management, and the science behind our mobile wellness treatments in Porto.";

  return (
    <>
      <Header />
      <main className="flex-1 min-h-screen bg-background">
        {/* Blog Header */}
        <section className="relative border-b bg-gradient-to-b from-muted/50 via-background to-background py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur-md mb-4 shadow-xs">
              <span>{badgeText}</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {headingText}
            </h1>
            <p className="mt-4 mx-auto max-w-2xl text-muted-foreground text-base sm:text-lg leading-relaxed">
              {descriptionText}
            </p>
          </div>
        </section>

        {/* Blog Content & Interactive Client Filter */}
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <BlogClientFilter posts={posts} featuredPost={featuredPost} />
          </div>
        </section>

        {/* Newsletter Callout Banner */}
        <NewsletterSection content={siteContent.newsletter} />
      </main>
      <Footer content={siteContent.footer} />
    </>
  );
}
