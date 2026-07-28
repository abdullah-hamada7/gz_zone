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

const BLOG_POSTS = [
  {
    title: "The Complete Guide to Cupping Therapy: Benefits, Marks, & What to Expect",
    slug: "complete-guide-to-cupping-therapy",
    excerpt:
      "Curious about cupping therapy? Learn how suction cups stimulate blood circulation, relieve chronic muscle knots, and why circular marks appear during treatment.",
    category: "Cupping Therapy",
    categorySlug: "cupping-therapy",
    readTime: "5 min read",
    publishedAt: "July 24, 2026",
    authorName: "GZ Zone Specialist",
    authorRole: "Certified Massage & Cupping Therapist",
    imageUrl: "https://cjfkxwgijyznrxvlgfsy.supabase.co/storage/v1/object/public/gallery/blog/blog_cupping_guide.jpg",
    imageAlt: "Cupping therapy session on client's back",
    tags: ["Cupping", "Pain Relief", "Fascia Release", "Recovery"],
    featured: true,
    relatedTreatmentSlug: "cupping-therapy",
    content: `
## What Is Cupping Therapy?

Cupping therapy is an ancient form of alternative medicine in which a certified therapist places specialized cups on your skin for a few minutes to create suction. This technique has gained immense popularity among professional athletes, wellness enthusiasts, and individuals suffering from chronic muscle tightness.

Unlike traditional massage therapy, which applies inward pressure to muscles, cupping creates **negative pressure**—gently pulling skin, tissue, and underlying fascia upward.

---

## Key Science-Backed Benefits of Cupping

### 1. Increases Blood Circulation & Cellular Oxygenation
The suction effect draws fresh, oxygen-rich blood directly to stagnant or inflamed muscle tissues. This accelerated micro-circulation brings essential nutrients to tight zones, aiding cellular repair and removing metabolic waste products like lactic acid.

### 2. Deep Myofascial Release
Fascia is the connective tissue matrix wrapping around every muscle in your body. When fascia becomes rigid due to poor posture, repetitive strain, or stress, it restricts movement. Cupping lifts and separates fused fascial layers, restoring flexibility and range of motion.

### 3. Relief for Chronic Back, Neck & Shoulder Tension
For individuals spending long hours at a desk or engaging in intense physical training, tension accumulates around the upper trapezius and lumbar region. Cupping target spots that standard surface pressure struggles to release.

### 4. Nervous System Relaxation
Sensory nerves in the skin respond to the lifting sensation by signaling the parasympathetic nervous system to calm down, slowing your heart rate and easing overall anxiety.

---

## Demystifying Cupping Marks: What Are They?

One of the most common questions clients ask is: *"Do cupping marks hurt, and how long do they last?"*

* **They Are Not Bruises**: Traditional bruises are caused by blunt trauma that breaks capillaries. Cupping marks are caused by suction drawing stagnant fluids, cellular debris, and old blood to the skin's surface.
* **Duration**: Marks typically fade within **3 to 7 days**, depending on your body's lymphatic drainage speed and hydration levels.
* **Sensation**: The application feels like a warm, firm tugging sensation. Most clients describe it as deeply therapeutic and relaxing.

---

## How Cupping Pairs with Mobile Massage Therapy

When combined with standard manual massage therapy, cupping acts as a powerful multiplier. The therapist first warms up the muscle tissue with Swedish or Deep Tissue strokes, applies targeted cupping to stubborn knots, and finishes with soothing gliding strokes.

Receiving this treatment in the comfort of your home or hotel in Porto means you can immediately rest afterward without navigating city traffic.

Ready to experience authentic cupping therapy? You can book your personalized session directly with **GZ Zone**.
`,
  },
  {
    title: "Deep Tissue vs. Swedish Massage: Which Is Right for Your Body?",
    slug: "deep-tissue-vs-swedish-massage",
    excerpt:
      "Struggling to choose between Deep Tissue and Swedish Massage? Discover the key differences in pressure, techniques, and health benefits to find your ideal treatment.",
    category: "Massage Therapy",
    categorySlug: "massage-therapy",
    readTime: "4 min read",
    publishedAt: "July 18, 2026",
    authorName: "GZ Zone Specialist",
    authorRole: "Certified Massage & Cupping Therapist",
    imageUrl: "https://cjfkxwgijyznrxvlgfsy.supabase.co/storage/v1/object/public/gallery/blog/blog_deep_tissue.jpg",
    imageAlt: "Therapist applying deep tissue massage on back muscles",
    tags: ["Deep Tissue", "Swedish Massage", "Relaxation", "Muscle Knots"],
    featured: true,
    relatedTreatmentSlug: "deep-tissue-massage",
    content: `
Selecting the right massage treatment depends on your body's current physical state, stress levels, and specific wellness goals. Two of the most sought-after modalities are **Swedish Massage** and **Deep Tissue Massage**.

While both promote healing and relaxation, their focus and techniques differ significantly.

---

## Swedish Massage: The Classic Stress Reliever

Swedish massage focuses on gentle-to-medium pressure, long gliding strokes, kneading, and rhythmic tapping. It is designed to soothe the nervous system and enhance overall circulation.

### Best Suited For:
* First-time massage clients seeking gentle relaxation.
* Reducing general daily stress and mental fatigue.
* Improving full-body lymphatic drainage and blood flow.
* Easing mild muscle stiffness without intense soreness.

---

## Deep Tissue Massage: Target Chronic Tension & Knots

Deep tissue massage reaches the deeper layers of muscle fibers and fascia. The therapist uses slower strokes and focused, firm pressure using fingers, thumbs, elbows, or forearms to release chronic tightness (often called "knots" or adhesions).

### Best Suited For:
* Chronic lower back, neck, or shoulder pain.
* Athletes recovering from strenuous workouts or sports activities.
* Desk workers suffering from postural tightness in the upper back.
* People recovering from repetitive motion strains.

---

## Comparison at a Glance

| Feature | Swedish Massage | Deep Tissue Massage |
| :--- | :--- | :--- |
| **Primary Goal** | Full-body relaxation & stress relief | Targeted pain relief & knot breakdown |
| **Pressure Level** | Light to medium | Medium to deep/firm |
| **Technique** | Gliding strokes, light friction | Slow, deliberate pressure across muscle fibers |
| **Post-Session Feel** | Energized, peaceful, light | Deeply relieved, mild temporary tenderness |

---

## Can You Combine Both?

Yes! A customized mobile massage treatment with **GZ Zone** can blend Swedish techniques for full-body warming and relaxation with concentrated Deep Tissue work on trouble areas like your shoulders or lumbar region.
`,
  },
  {
    title: "5 Science-Backed Ways Mobile Massage Speeds Up Muscle Recovery",
    slug: "science-backed-ways-mobile-massage-recovery",
    excerpt:
      "Discover why having a certified massage therapist come directly to your home or hotel room leads to superior muscle recovery and deeper relaxation.",
    category: "Pain Relief & Recovery",
    categorySlug: "pain-relief-recovery",
    readTime: "6 min read",
    publishedAt: "July 12, 2026",
    authorName: "GZ Zone Specialist",
    authorRole: "Certified Massage & Cupping Therapist",
    imageUrl: "https://cjfkxwgijyznrxvlgfsy.supabase.co/storage/v1/object/public/gallery/blog/blog_mobile_recovery.jpg",
    imageAlt: "In-home relaxing massage setup with oils and towels",
    tags: ["Mobile Massage", "Recovery", "Home Wellness", "Porto"],
    featured: false,
    relatedTreatmentSlug: "sports-massage",
    content: `
In recent years, mobile massage therapy—where a professional therapist brings a massage table and premium supplies directly to your doorstep—has evolved from a luxury perk into an essential recovery tool.

Here are 5 science-backed reasons why receiving treatment at home enhances physical and mental recovery:

---

## 1. Eliminates Post-Massage Stress & Cortisol Spikes
After an effective deep tissue or relaxation massage, your body enters a parasympathetic state: blood pressure drops, heart rate slows, and stress hormones like cortisol decrease.

When you attend a clinic or spa, you must immediately get up, get dressed, step out into noisy traffic, drive, or take public transit. This abrupt shift raises cortisol levels again. With a mobile massage in Porto, you stay in your calm environment, prolonging the physiological benefits.

## 2. Facilitates Immediate Sleep & Rest Phase
Sleep is when your body produces growth hormone and repairs micro-tears in muscle fibers. Because mobile massage leaves you in your own living room or hotel bed, many clients fall asleep naturally right after the session ends.

## 3. Custom Climate & Familiar Comfort
Your nervous system responds to familiar scents, lighting, and ambient room temperature. Being in your own private space enables deeper psychological surrender, allowing your muscles to relax faster under the therapist's hands.

## 4. Uninterrupted Hydration & Nutrition
Following a therapeutic session, flushing metabolic toxins requires immediate hydration. Being at home gives you instant access to fresh water, herbal tea, or post-workout nutrition without delay.

## 5. Tailored Equipment Setup
A mobile therapist brings portable professional massage tables, clean linens, high-grade oils, and specialized tools (like cupping sets) tuned specifically to your space.

Book your private in-home or hotel session in Porto with **GZ Zone** today and experience zero-hassle recovery.
`,
  },
  {
    title: "How to Relieve Desk Stretches & Tech Neck at Home",
    slug: "relieve-desk-stretches-tech-neck-at-home",
    excerpt:
      "Spending hours at your laptop or phone? Simple daily stretches and targeted muscle care can eliminate posture strain and chronic neck pain.",
    category: "Wellness Tips",
    categorySlug: "wellness-tips",
    readTime: "4 min read",
    publishedAt: "July 05, 2026",
    authorName: "GZ Zone Specialist",
    authorRole: "Certified Massage & Cupping Therapist",
    imageUrl: "https://cjfkxwgijyznrxvlgfsy.supabase.co/storage/v1/object/public/gallery/blog/blog_tech_neck.jpg",
    imageAlt: "Person stretching neck and shoulders at home workspace",
    tags: ["Posture", "Tech Neck", "Stretching", "Office Ergonomics"],
    featured: false,
    relatedTreatmentSlug: "neck-shoulder-relief",
    content: `
"Tech Neck" is a modern condition caused by tilting your head forward and downward to look at screens for extended periods. Did you know that tilting your head forward by just 45 degrees places up to **49 lbs (22 kg)** of additional force on your cervical spine?

Over time, this posture causes chronic muscle strain, headaches, and rounded shoulders.

---

## 3 Quick Self-Stretches You Can Do Right Now

### 1. The Upper Trapezius Stretch
* Sit up straight in your chair.
* Gently lower your right ear toward your right shoulder.
* Place your right hand gently over the left side of your head for a light assist (do not pull hard).
* Hold for 20-30 seconds, breathe deeply, and repeat on the left side.

### 2. Doorway Chest Opener
* Stand inside a doorway with your elbows bent at 90 degrees and forearms resting against the doorframe.
* Step one foot forward until you feel a gentle stretch across your chest and front shoulders.
* Hold for 30 seconds to reverse rounded shoulder posture.

### 3. Chin Tucks (Cervical Retraction)
* Look straight ahead and gently pull your chin straight back, creating a "double chin" look.
* Hold for 5 seconds and release. Repeat 10 times to strengthen deep neck flexors.

---

## Professional Relief for Deep Tightness

Self-stretching is fantastic for daily maintenance. However, once muscle fibers develop hardened trigger points, professional manual manipulation or **Cupping Therapy** is required to break down chronic adhesions.

If you work remotely or spend long hours at a desk in Porto, schedule a targeted back, neck & shoulder massage with **GZ Zone**.
`,
  },
  {
    title: "Cupping & Massage Combination: The Ultimate Pain Relief Synergy",
    slug: "cupping-massage-combination-ultimate-pain-relief",
    excerpt:
      "Learn why combining manual deep tissue massage with targeted cupping therapy provides 2x faster myofascial release and pain reduction.",
    category: "Cupping Therapy",
    categorySlug: "cupping-therapy",
    readTime: "5 min read",
    publishedAt: "June 28, 2026",
    authorName: "GZ Zone Specialist",
    authorRole: "Certified Massage & Cupping Therapist",
    imageUrl: "https://cjfkxwgijyznrxvlgfsy.supabase.co/storage/v1/object/public/gallery/blog/blog_cupping_synergy.jpg",
    imageAlt: "Combined cupping and massage therapy session",
    tags: ["Cupping", "Synergy", "Myofascial Release", "Back Pain"],
    featured: false,
    relatedTreatmentSlug: "cupping-massage-combo",
    content: `
Manual massage therapy works primarily through **compression** (pushing into muscle tissues). Cupping therapy works through **decompression** (pulling tissues outward).

When these two opposing mechanical forces are combined in a single session, the therapeutic results are remarkably enhanced.

---

## Why the Combination Works Better Than a Single Technique

### 1. Dual-Action Tissue Mobilization
Standard massage decompresses muscle fibers horizontally and downwards. Adding cupping lifts the skin and superficial fascia vertically away from the bone and deep muscles. This multi-directional tissue movement breaks up stubborn scar tissue faster.

### 2. Pre-Softening Rigid Knots
By applying stationary cups over dense muscle knots for 5-7 minutes, blood flow surges to the area and rigid fibers soften. When the therapist removes the cups and performs deep tissue strokes, the tissue responds much faster with significantly less discomfort.

### 3. Dynamic Moving Cupping
Dynamic cupping involves applying suction cups with a light coat of massage oil and sliding them along muscle pathways (such as down the erector spinae along the spine). This provides an unbeatable lymphatic flush and deep myofascial release.

---

## Experience the Synergy at Home in Porto

Whether you are recovering from intense training or managing daily stress, experiencing a combined **Cupping + Massage** treatment in your own space delivers immediate relief.

Book your treatment via WhatsApp with **GZ Zone** today!
`,
  },
];

async function seedBlogPosts() {
  console.log("Seeding blog posts directly into Supabase database table `blog_posts`...");

  let seededCount = 0;

  for (let i = 0; i < BLOG_POSTS.length; i++) {
    const post = BLOG_POSTS[i];
    const { data, error } = await supabase
      .from("blog_posts")
      .upsert(
        {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          category: post.category,
          category_slug: post.categorySlug,
          read_time: post.readTime,
          published_at: post.publishedAt,
          author_name: post.authorName,
          author_role: post.authorRole,
          image_url: post.imageUrl,
          image_alt: post.imageAlt,
          tags: post.tags,
          featured: post.featured,
          related_treatment_slug: post.relatedTreatmentSlug,
          views_count: 0,
          sort_order: i,
        },
        { onConflict: "slug" }
      )
      .select();

    if (error) {
      console.error(`Error seeding post "${post.slug}":`, error.message);
    } else {
      seededCount++;
      console.log(`Successfully seeded post "${post.slug}" into Supabase database!`);
    }
  }

  console.log(`Finished! Total ${seededCount}/${BLOG_POSTS.length} blog posts seeded to Supabase database table.`);
}

seedBlogPosts().catch(console.error);
