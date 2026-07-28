import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const blogImages = [
  { file: "blog_cupping_guide.jpg", slug: "complete-guide-to-cupping-therapy" },
  { file: "blog_deep_tissue.jpg", slug: "deep-tissue-vs-swedish-massage" },
  { file: "blog_mobile_recovery.jpg", slug: "science-backed-ways-mobile-massage-recovery" },
  { file: "blog_tech_neck.jpg", slug: "relieve-desk-stretches-tech-neck-at-home" },
  { file: "blog_cupping_synergy.jpg", slug: "cupping-massage-combination-ultimate-pain-relief" },
];

async function main() {
  console.log("Starting upload of blog post images to Supabase Storage...");

  const urlMap = {};

  for (const item of blogImages) {
    const filePath = path.join(process.cwd(), "public/images/blog", item.file);
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      continue;
    }

    const fileBuffer = fs.readFileSync(filePath);
    const storagePath = `blog/${item.file}`;

    const { data, error } = await supabase.storage
      .from("gallery")
      .upload(storagePath, fileBuffer, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (error) {
      console.error(`Error uploading ${item.file}:`, error.message);
      continue;
    }

    const { data: publicUrlData } = supabase.storage.from("gallery").getPublicUrl(storagePath);
    const publicUrl = publicUrlData.publicUrl;
    urlMap[item.file] = publicUrl;

    console.log(`Successfully uploaded ${item.file} -> ${publicUrl}`);
  }

  // Update src/data/blog-posts.ts
  const dataFilePath = path.join(process.cwd(), "src/data/blog-posts.ts");
  let dataContent = fs.readFileSync(dataFilePath, "utf8");

  if (urlMap["blog_cupping_guide.jpg"]) {
    dataContent = dataContent.replace(
      '/images/blog/blog_cupping_guide.jpg',
      urlMap["blog_cupping_guide.jpg"]
    );
  }
  if (urlMap["blog_deep_tissue.jpg"]) {
    dataContent = dataContent.replace(
      '/images/blog/blog_deep_tissue.jpg',
      urlMap["blog_deep_tissue.jpg"]
    );
  }
  if (urlMap["blog_mobile_recovery.jpg"]) {
    dataContent = dataContent.replace(
      '/images/blog/blog_mobile_recovery.jpg',
      urlMap["blog_mobile_recovery.jpg"]
    );
  }
  if (urlMap["blog_tech_neck.jpg"]) {
    dataContent = dataContent.replace(
      '/images/blog/blog_tech_neck.jpg',
      urlMap["blog_tech_neck.jpg"]
    );
  }
  if (urlMap["blog_cupping_synergy.jpg"]) {
    dataContent = dataContent.replace(
      '/images/blog/blog_cupping_synergy.jpg',
      urlMap["blog_cupping_synergy.jpg"]
    );
  }

  fs.writeFileSync(dataFilePath, dataContent);
  console.log("Updated src/data/blog-posts.ts with Supabase Storage URLs!");

  // Also update existing blog_posts in Supabase table if it exists
  try {
    for (const item of blogImages) {
      const supaUrl = urlMap[item.file];
      if (supaUrl) {
        await supabase
          .from("blog_posts")
          .update({ image_url: supaUrl })
          .eq("slug", item.slug);
      }
    }
    console.log("Updated blog_posts in Supabase database table!");
  } catch (err) {
    console.log("Table update skipped or completed:", err.message);
  }

  console.log("Done!");
}

main().catch(console.error);
