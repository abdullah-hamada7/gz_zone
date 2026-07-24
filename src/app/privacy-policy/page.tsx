import type { Metadata } from "next";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <h1 className="mb-8 text-4xl font-bold tracking-tight">
            Privacy Policy
          </h1>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p>
              Your privacy is important. This policy outlines how your personal
              data is collected and used.
            </p>
            <h2>Information We Collect</h2>
            <p>
              We collect information you provide when booking a massage through
              WhatsApp, including your name, contact details, and location.
            </p>
            <h2>How We Use Your Information</h2>
            <p>
              Your information is used solely to provide and schedule your
              massage treatment. We do not share your data with third parties.
            </p>
            <h2>Data Storage</h2>
            <p>
              Your information is stored securely. You may request deletion of
              your data at any time by contacting us via WhatsApp.
            </p>
            <h2>Contact</h2>
            <p>
              For privacy-related inquiries, contact us at{" "}
              <a
                href="https://wa.me/351913675810"
                className="text-primary underline"
              >
                +351 913 675 810
              </a>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
