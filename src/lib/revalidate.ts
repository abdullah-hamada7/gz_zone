import { revalidatePath } from "next/cache";

export function revalidatePublicPages(slug?: string) {
  try {
    revalidatePath("/");
    revalidatePath("/treatments");
    revalidatePath("/treatments/[slug]", "page");
    revalidatePath("/blog");
    revalidatePath("/blog/[slug]", "page");
    if (slug) {
      revalidatePath(`/treatments/${slug}`);
      revalidatePath(`/blog/${slug}`);
    }
  } catch {
    // Ignore revalidation errors during non-request context
  }
}
