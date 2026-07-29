import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const SITE_CONTENT_SEED = [
  {
    section_key: "blog_page",
    content: {
      badge: "🌿 GZ'ZONE Wellness & Recovery Journal",
      heading: "Massage & Cupping Insights",
      description: "Discover professional tips on myofascial release, posture correction, stress management, and the science behind our mobile wellness treatments in Porto.",
    },
  },
];

async function seedSiteContent() {
  console.log("Seeding blog_page section into site_content...");
  for (const item of SITE_CONTENT_SEED) {
    const { error } = await supabase.from("site_content").upsert(
      {
        section_key: item.section_key,
        content: item.content,
      },
      { onConflict: "section_key" }
    );
    if (error) {
      console.error(`Error seeding ${item.section_key}:`, error.message);
    } else {
      console.log(`Seeded ${item.section_key} successfully!`);
    }
  }
}

seedSiteContent().catch(console.error);
