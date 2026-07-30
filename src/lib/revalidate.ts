import { revalidatePath } from "next/cache";

export function revalidatePublicPages(slug?: string) {
  try {
    revalidatePath("/");
    revalidatePath("/treatments");
    revalidatePath("/treatments/[slug]", "page");
    if (slug) {
      revalidatePath(`/treatments/${slug}`);
    }
  } catch {
    // Ignore revalidation errors during non-request context
  }
}
