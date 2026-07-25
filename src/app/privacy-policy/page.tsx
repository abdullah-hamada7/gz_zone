import type { Metadata } from "next";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";
import { getSiteContent } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and data protection guidelines for GZ'ZONE Mobile Massage in Porto.",
  alternates: {
    canonical: "https://gzzone.vercel.app/privacy-policy",
  },
};

export default async function PrivacyPolicyPage() {
  const content = await getSiteContent("privacy_policy");
  const bodyHtml = (content?.body_html as string) ?? null;

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <h1 className="mb-8 text-4xl font-bold tracking-tight">
            Privacy Policy
          </h1>
          {bodyHtml ? (
            <div
              className="prose prose-sm max-w-none text-muted-foreground [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_p]:mb-4 [&_p]:leading-relaxed [&_a]:text-primary [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          ) : (
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p>Your privacy is important. This policy outlines how your personal data is collected and used.</p>
              <h2>Information We Collect</h2>
              <p>We collect information you provide when booking a massage through WhatsApp, including your name, contact details, and location.</p>
              <h2>How We Use Your Information</h2>
              <p>Your information is used solely to provide and schedule your massage treatment. We do not share your data with third parties.</p>
              <h2>Data Storage</h2>
              <p>Your information is stored securely. You may request deletion of your data at any time by contacting us via WhatsApp.</p>
              <h2>Contact</h2>
              <p>For privacy-related inquiries, contact us at{" "}
                <a href="https://wa.me/351913675810" className="text-primary underline">
                  +351 913 675 810
                </a>.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
