export const HERO = {
  title: "Professional Massage. Delivered to You.",
  subtitle: "GZ'ZONE — A ZONE WITHOUT BOUNDARIES",
  description:
    "Enjoy a professional massage in the comfort of your home, hotel, or apartment in Porto. I bring the massage table and everything needed for your treatment directly to you.",
};

export interface Treatment {
  id: string;
  name: string;
  slug: string;
  category: "massage-therapy" | "medical-aesthetics" | "holistic-health";
  short_description: string;
  full_description: string;
  ideal_for: string;
  sort_order: number;
}

export interface Duration {
  id: string;
  treatment_id: string;
  minutes: number;
  price: number;
}

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export interface Review {
  customer_name: string;
  content: string;
  rating: number;
  platform: string;
  external_url: string | null;
}

export interface PlatformRating {
  platform: string;
  rating: number;
  review_count: number;
  profile_url: string | null;
}

export type SiteContentKey =
  | "hero"
  | "trust_bar"
  | "why_mobile_massage"
  | "how_it_works"
  | "about_section"
  | "reputation_section"
  | "faq_section"
  | "footer"
  | "final_cta"
  | "certifications_section"
  | "hours_section"
  | "service_areas_section"
  | "gallery_section"
  | "header"
  | "treatments_section"
  | "treatment_slider"
  | "treatment_card"
  | "mobile_sticky_cta";

export const SITE_CONTENT_SEED: Record<SiteContentKey, Record<string, unknown>> = {
  header: {
    siteName: "GZ'ZONE",
    tagline: "A Zone Without Boundaries",
    logoAriaLabel: "GZ'ZONE",
    menuToggleLabel: "Toggle menu",
    navLinks: [
      { label: "Treatments", href: "/#treatments" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "About", href: "/#about" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  hero: {
    title: "Professional Massage. Delivered to You.",
    subtitle: "GZ'ZONE \u2014 A ZONE WITHOUT BOUNDARIES",
    description:
      "Enjoy a professional massage in the comfort of your home, hotel, or apartment in Porto. I bring the massage table and everything needed for your treatment directly to you.",
    ctaText: "Book via WhatsApp",
    exploreText: "Explore Treatments",
    locationText: "Serving Porto and surrounding areas",
    dialogTitle: "Please Select Your Treatment First",
    dialogDescription:
      "Choose your required treatment below to view duration, pricing, and book your personalized session directly via WhatsApp.",
    dialogLink: "Browse All Treatments & Prices \u2192",
    dialogLinkHref: "/treatments",
    ctaButtonText: "Book via WhatsApp",
    prevLabel: "Previous image",
    nextLabel: "Next image",
    slideshowImages: [
      { src: "/images/hero-lcp.jpg", alt: "GZ'ZONE mobile massage setup delivered to your location in Porto" },
      { src: "/images/aromatherapy-massage.jpg", alt: "Aromatherapy massage treatment" },
      { src: "/images/caption.jpg", alt: "Gz Zone massage session" },
      { src: "/images/cupping-therapy-hijama.jpg", alt: "Cupping therapy session" },
      { src: "/images/cupping-therapy-hijama (1).jpg", alt: "Cupping therapy treatment" },
      { src: "/images/cupping-therapy-hijama (2).jpg", alt: "Cupping therapy application" },
      { src: "/images/cupping-therapy-hijama (3).jpg", alt: "Dry cupping therapy" },
      { src: "/images/deep-tissue-massage.jpg", alt: "Deep tissue massage therapy" },
      { src: "/images/essential-oils.jpg", alt: "Essential oils for massage" },
      { src: "/images/essential-oils (1).jpg", alt: "Aromatherapy essential oils" },
      { src: "/images/essential-oils (2).jpg", alt: "Therapeutic essential oils" },
      { src: "/images/gz-zone-massage-cupping.jpg", alt: "Massage and cupping combination therapy" },
      { src: "/images/gz-zone-massage-cupping (1).jpg", alt: "Massage cupping therapy session" },
      { src: "/images/gz-zone-massage-cupping (2).jpg", alt: "Therapeutic cupping massage" },
      { src: "/images/gz-zone-massage-cupping (3).jpg", alt: "Cupping massage treatment" },
      { src: "/images/gz-zone-massage-cupping (4).jpg", alt: "Massage therapy with cupping" },
      { src: "/images/gz-zone-massage-cupping (5).jpg", alt: "Professional cupping massage" },
      { src: "/images/gz-zone-massage-cupping (6).jpg", alt: "Deep tissue cupping therapy" },
      { src: "/images/gz-zone-massage-cupping (7).jpg", alt: "Full body cupping massage" },
      { src: "/images/k6qFHE9onOx2dEvKWmPALwN3vZmI2Vu0.jpeg", alt: "Massage treatment session" },
      { src: "/images/KT90eNJhhFbuPBwtpTdqxM52GeKdkWP7.jpeg", alt: "Professional massage therapy" },
      { src: "/images/MBPcXB9oIEHuzl78FFmD0JxeEzOeVj5W.jpeg", alt: "Relaxing massage session" },
      { src: "/images/omar-elgazzar.jpg", alt: "Omar Elgazzar massage therapist" },
      { src: "/images/swedish-massage.jpg", alt: "Relaxing Swedish massage" },
      { src: "/images/trigger-points-massage.jpg", alt: "Trigger points massage therapy" },
      { src: "/images/trigger-points-massage (1).jpg", alt: "Trigger point release therapy" },
      { src: "/images/certs.jpg", alt: "Professional certifications and credentials" },
      { src: "/images/chatgpt_image_may_22_2026_at_08_16_19_pm.jpg", alt: "Massage therapy session" },
      { src: "/images/img_0344.jpg", alt: "Relaxing massage treatment" },
      { src: "/images/img_8888.jpg", alt: "Massage therapy setup" },
      { src: "/images/photo20260427212031.jpg", alt: "Professional massage session in Porto" },
      { src: "/images/untitled_design.jpg", alt: "Gz Zone massage experience" },
      { src: "/images/what_is_gzzone_1.jpg", alt: "Professional mobile massage setup in Porto" },
    ],
  },
  trust_bar: {
    items: [
      { label: "Professional Service" },
      { label: "At Your Location" },
      { label: "Equipment Provided" },
      { label: "Easy Booking" },
    ],
    separator: "\u2022",
  },
  why_mobile_massage: {
    heading: "Your Massage. Your Space. Your Comfort.",
    description:
      "No travel. No waiting rooms. No need to rush home after your treatment. Enjoy a professional massage in a comfortable and private environment while everything you need for the session is brought directly to you.",
    benefits: [
      {
        title: "No Travel",
        description: "Enjoy your treatment without leaving your home, hotel, or apartment.",
      },
      {
        title: "Complete Comfort",
        description: "Relax in a familiar and private environment.",
      },
      {
        title: "Professional Setup",
        description: "The portable massage table and necessary equipment are brought directly to you.",
      },
      {
        title: "More Time to Relax",
        description: "Your treatment ends where you are. No traffic and no journey home.",
      },
    ],
  },
  how_it_works: {
    heading: "How It Works",
    steps: [
      {
        title: "Choose Your Treatment",
        description: "Select the treatment and duration that best match your needs.",
      },
      {
        title: "Choose Your Location",
        description: "Tell us where you would like to receive your treatment.",
      },
      {
        title: "Relax",
        description: "The professional equipment comes to you. You simply relax and enjoy your treatment.",
      },
    ],
    stepNumberPrefix: "0",
  },
  about_section: {
    heading: "About",
    subheading: "Omar Elgazzar",
    paragraphs: [
      "As an ISSA-CFT certified massage specialist, I bring years of hands-on experience across Egypt, T\u00fcrkiye, Russia, and now Porto. Every treatment I deliver is rooted in anatomical science and tailored to what your body actually needs.",
      "Whether it is deep tissue work to release chronic tension, sports recovery after intense training, or a full-body relaxation session \u2014 I take the time to listen, assess, and adapt each technique to you. My approach is not a fixed routine; it is a conversation between my hands and your body.",
      "I bring everything to your location: professional table, premium oils, and strict hygiene standards. Your comfort, privacy, and convenience come first \u2014 because healing should happen on your terms.",
      "\u201cI followed my passion and became an ISSA-CFT & MASSAGE SPECIALIST. I created GZ'ZONE \u2014 a zone without boundaries \u2014 to change wrong concepts, traditions, and habits by bringing science back into the track.\u201d",
    ],
    trustHeading: "Your Comfort Comes First",
    trustPoints: [
      { title: "Professional Approach", description: "Every treatment is delivered with the highest standards of professionalism and care." },
      { title: "Respectful Environment", description: "Your comfort, privacy, and personal boundaries are respected throughout the entire experience." },
      { title: "Personalized Treatment", description: "Each session is tailored to your specific needs and preferences." },
      { title: "Privacy and Comfort", description: "Your treatment takes place in the privacy of your chosen location." },
    ],
    certLabel: "Certified & Professional",
    certHeading: "Your Wellbeing Is in Safe Hands",
    certText:
      "Omar Elgazzar is a professionally trained massage therapist with certified qualifications in massage therapy, cupping, and specialized bodywork. Every treatment is delivered with professionalism, care, and attention to your wellbeing.",
    imageAlt: "Omar Elgazzar \u2014 Mobile Massage Therapist Porto",
    certImageAlt: "Professional massage certifications",
  },
  reputation_section: {
    heading: "Trusted by Our Clients",
    subheading: "What Our Clients Say",
    reviewLabel: "Read Reviews on",
    basedOnLabel: "Based on",
    reviewsSuffix: "+ reviews",
    featuredClientLabel: "Featured Client",
  },
  faq_section: {
    heading: "Frequently Asked Questions",
  },
  treatments_section: {
    sectionLabel: "Our Services",
    heading: "Treatments & Prices",
  },
  treatment_slider: {
    prevLabel: "Previous treatments",
    nextLabel: "Next treatments",
  },
  treatment_card: {
    categoryLabels: [
      { key: "massage-therapy", label: "Massage Therapy" },
      { key: "medical-aesthetics", label: "Medical Aesthetics" },
      { key: "holistic-health", label: "Holistic Health" },
    ],
    fromText: "From",
    currency: "\u20ac",
    viewDetailsText: "View Details",
    viewDetailsAriaLabel: "View details for",
  },
  footer: {
    description: "Professional mobile massage services in Porto and surrounding areas.",
    quickLinksHeading: "Quick Links",
    quickLinks: [
      { label: "Treatments & Prices", href: "/treatments" },
      { label: "About", href: "/#about" },
      { label: "FAQ", href: "/#faq" },
    ],
    contactHeading: "Contact",
    contactAriaLabel: "Contact GZ ZONE via WhatsApp at",
    phone: "+351 913 675 810",
    phoneHref: "https://wa.me/351913675810",
    location: "Porto, Portugal",
    instagramHandle: "@gz.zone",
    instagramUrl: "https://www.instagram.com/gz.zone/",
    instagramAriaLabel: "Follow GZ ZONE on Instagram",
    copyright: "GZ'ZONE. All rights reserved.",
    privacyLabel: "Privacy Policy",
    privacyHref: "/privacy-policy",
    privacyAriaLabel: "Read Privacy Policy",
    termsLabel: "Terms",
    termsHref: "/terms",
    termsAriaLabel: "Read Terms of Service",
  },
  final_cta: {
    heading: "Ready to Book Your Massage?",
    description: "Send a message on WhatsApp and I will help you find the perfect treatment.",
    buttonText: "Book via WhatsApp",
  },
  mobile_sticky_cta: {
    buttonText: "Book via WhatsApp",
    defaultTreatment: "General inquiry",
  },
  certifications_section: {
    label: "Certified & Professional",
    heading: "Your Wellbeing Is in Safe Hands",
    subheading: "Trained & Certified Therapist",
    description:
      "Omar Elgazzar is a professionally trained massage therapist with certified qualifications in massage therapy, cupping, and specialized bodywork. Every treatment is delivered with professionalism, care, and attention to your wellbeing.",
    imageAlt: "Professional massage certifications",
  },
  hours_section: {
    heading: "Opening Hours",
    subtitle: "Open daily \u2014 book your preferred time via WhatsApp",
    days: [
      { day: "Monday", hours: "08:00 \u2013 22:00" },
      { day: "Tuesday", hours: "08:00 \u2013 22:00" },
      { day: "Wednesday", hours: "08:00 \u2013 22:00" },
      { day: "Thursday", hours: "08:00 \u2013 22:00" },
      { day: "Friday", hours: "08:00 \u2013 22:00" },
      { day: "Saturday", hours: "08:00 \u2013 22:00" },
      { day: "Sunday", hours: "08:00 \u2013 22:00" },
    ],
  },
  service_areas_section: {
    heading: "Mobile Massage Across Porto",
    description:
      "Not sure if your location is covered? Send your location on WhatsApp and I will confirm availability.",
    buttonText: "Send Location on WhatsApp",
  },
  gallery_section: {
    heading: "Experience Gallery",
  },
};

export const TREATMENTS: Treatment[] = [
  {
    id: "massage-therapy-1",
    name: "Massage Therapy",
    slug: "massage-therapy",
    category: "massage-therapy",
    short_description: "Full-body relaxation massage to ease tension and promote wellbeing.",
    full_description: "A classic full-body massage designed to relax muscles, improve circulation, and reduce stress. Using smooth, flowing techniques, this treatment helps you unwind and restore balance.",
    ideal_for: "Anyone looking to relax and relieve everyday tension.",
    sort_order: 1,
  },
  {
    id: "deep-tissue-1",
    name: "Deep Tissue Massage",
    slug: "deep-tissue-massage",
    category: "massage-therapy",
    short_description: "Focused treatment for deeper muscular tension and chronic tightness.",
    full_description: "Targets the deeper layers of muscle tissue using slow, firm pressure and stretching techniques. Ideal for releasing chronic tension, knots, and muscle adhesions.",
    ideal_for: "Those with chronic muscle tension, tightness, or specific problem areas.",
    sort_order: 2,
  },
  {
    id: "facial-massage-1",
    name: "Facial Massage \u2014 Face, Neck, Head",
    slug: "facial-massage",
    category: "massage-therapy",
    short_description: "Soothing facial massage to release tension and rejuvenate.",
    full_description: "A gentle yet effective massage focusing on the face, neck, and head. Helps relieve tension headaches, jaw clenching, and facial muscle fatigue while promoting relaxation.",
    ideal_for: "Anyone experiencing facial tension, headaches, or simply wanting deep relaxation.",
    sort_order: 3,
  },
  {
    id: "reflexology-massage-1",
    name: "Hands, Feet, Ears Massage \u2014 Reflexology",
    slug: "reflexology-massage",
    category: "massage-therapy",
    short_description: "Stimulating massage of hands, feet, and ears based on reflexology principles.",
    full_description: "Applies pressure to specific reflex points on the hands, feet, and ears to promote relaxation and stimulate the body's natural healing processes.",
    ideal_for: "Those seeking deep relaxation through reflexology techniques.",
    sort_order: 4,
  },
  {
    id: "back-neck-1",
    name: "Back, Neck, Shoulders & Head Massage",
    slug: "back-neck-shoulders-head-massage",
    category: "massage-therapy",
    short_description: "Targeted upper body massage for tension relief.",
    full_description: "Focuses on the areas where most people carry their stress \u2014 the back, neck, shoulders, and head. Combines kneading, stretching, and pressure techniques to release tightness.",
    ideal_for: "Anyone with upper body tension, desk workers, or those with neck and shoulder discomfort.",
    sort_order: 5,
  },
  {
    id: "sports-massage-1",
    name: "Sports Massage \u2014 Deep Tissue, Trigger Points, Stretching",
    slug: "sports-massage",
    category: "massage-therapy",
    short_description: "Performance-focused massage combining deep tissue, trigger point therapy, and stretching.",
    full_description: "Designed for active individuals and athletes. Combines deep tissue techniques, trigger point release, and assisted stretching to improve recovery, flexibility, and performance.",
    ideal_for: "Athletes, active individuals, and those recovering from physical activity.",
    sort_order: 6,
  },
  {
    id: "cellulite-treatment-1",
    name: "Cellulite Treatment",
    slug: "cellulite-treatment",
    category: "medical-aesthetics",
    short_description: "Professional treatment to reduce the appearance of cellulite.",
    full_description: "A targeted treatment designed to improve skin texture and reduce the appearance of cellulite using specialized techniques.",
    ideal_for: "Those looking to improve skin texture and reduce cellulite visibility.",
    sort_order: 7,
  },
  {
    id: "anti-cellulite-cupping-1",
    name: "Anti-Cellulite Treatment \u2014 Massage + Dry & Running Cupping",
    slug: "anti-cellulite-cupping",
    category: "medical-aesthetics",
    short_description: "Combined massage and cupping treatment for cellulite reduction.",
    full_description: "A comprehensive approach combining anti-cellulite massage techniques with dry and running cupping to stimulate circulation and break down fatty deposits.",
    ideal_for: "Those seeking an intensive combined treatment for cellulite reduction.",
    sort_order: 8,
  },
  {
    id: "anti-cellulite-massage-1",
    name: "Anti-Cellulite Massage",
    slug: "anti-cellulite-massage",
    category: "medical-aesthetics",
    short_description: "Focused massage technique targeting cellulite-prone areas.",
    full_description: "Specialized massage techniques designed to stimulate circulation, improve lymphatic drainage, and reduce the appearance of cellulite.",
    ideal_for: "Those looking for a massage-based approach to cellulite reduction.",
    sort_order: 9,
  },
  {
    id: "dry-cupping-1",
    name: "Dry Cupping",
    slug: "dry-cupping",
    category: "holistic-health",
    short_description: "Traditional cupping therapy to release tension and improve circulation.",
    full_description: "Using suction cups on specific areas of the body to increase blood flow, release fascia, and promote healing.",
    ideal_for: "Athletes, active individuals, and those with muscle tension looking for alternative recovery methods.",
    sort_order: 10,
  },
  {
    id: "reflexology-1",
    name: "Reflexology \u2014 Hands, Feet, Ears",
    slug: "reflexology",
    category: "holistic-health",
    short_description: "Holistic reflexology treatment stimulating pressure points.",
    full_description: "A holistic treatment applying pressure to reflex points on the hands, feet, and ears. Each point corresponds to different organs and systems in the body, promoting natural healing and balance.",
    ideal_for: "Those seeking holistic relaxation and natural healing through reflexology.",
    sort_order: 11,
  },
];

export const DURATIONS: Duration[] = [
  { id: "d-massage-1", treatment_id: "massage-therapy-1", minutes: 60, price: 55 },
  { id: "d-deep-1", treatment_id: "deep-tissue-1", minutes: 60, price: 40 },
  { id: "d-facial-1", treatment_id: "facial-massage-1", minutes: 45, price: 40 },
  { id: "d-reflex-massage-1", treatment_id: "reflexology-massage-1", minutes: 60, price: 55 },
  { id: "d-back-1", treatment_id: "back-neck-1", minutes: 60, price: 55 },
  { id: "d-sports-1", treatment_id: "sports-massage-1", minutes: 60, price: 55 },
  { id: "d-cellulite-1", treatment_id: "cellulite-treatment-1", minutes: 60, price: 75 },
  { id: "d-anticell-cupping-1", treatment_id: "anti-cellulite-cupping-1", minutes: 60, price: 55 },
  { id: "d-anticell-massage-1", treatment_id: "anti-cellulite-massage-1", minutes: 60, price: 55 },
  { id: "d-cupping-1", treatment_id: "dry-cupping-1", minutes: 45, price: 40 },
  { id: "d-reflex-1", treatment_id: "reflexology-1", minutes: 60, price: 40 },
];

export function getTreatmentPrices() {
  const map: Record<string, number> = {};
  for (const d of DURATIONS) {
    const slugMap: Record<string, string> = {
      "massage-therapy-1": "massage-therapy",
      "deep-tissue-1": "deep-tissue-massage",
      "facial-massage-1": "facial-massage",
      "reflexology-massage-1": "reflexology-massage",
      "back-neck-1": "back-neck-shoulders-head-massage",
      "sports-massage-1": "sports-massage",
      "cellulite-treatment-1": "cellulite-treatment",
      "anti-cellulite-cupping-1": "anti-cellulite-cupping",
      "anti-cellulite-massage-1": "anti-cellulite-massage",
      "dry-cupping-1": "dry-cupping",
      "reflexology-1": "reflexology",
    };
    const slug = slugMap[d.treatment_id];
    if (slug && (!map[slug] || d.price < map[slug])) {
      map[slug] = d.price;
    }
  }
  return map;
}

export function getDurationsForTreatment(treatmentId: string): Duration[] {
  return DURATIONS.filter((d) => d.treatment_id === treatmentId);
}

export const FAQS: FAQ[] = [
  {
    question: "How does mobile massage work?",
    answer: "I come to your location \u2014 home, hotel, or apartment \u2014 with all the professional equipment needed. You simply relax and enjoy your treatment in the comfort of your own space.",
    category: "General",
  },
  {
    question: "Where can I receive my treatment?",
    answer: "I can provide treatment at your home, hotel room, apartment, or any suitable private location in Porto and surrounding areas. The space should be large enough for a portable massage table.",
    category: "General",
  },
  {
    question: "Do I need to provide anything?",
    answer: "No. I bring everything needed: a professional portable massage table, linens, oils, and all necessary equipment. You just need to provide a space large enough for the table.",
    category: "General",
  },
  {
    question: "How much space is needed?",
    answer: "A space approximately 2.5m x 1.5m is sufficient for the massage table. A quiet, private room with a power outlet is ideal.",
    category: "General",
  },
  {
    question: "How do I book?",
    answer: "Simply send a message on WhatsApp with your preferred treatment, date, time, and location. I will confirm availability and respond promptly.",
    category: "Booking",
  },
  {
    question: "Can I book a hotel massage?",
    answer: "Yes. Hotel guests are welcome. I can set up in your hotel room or apartment. Just confirm with your hotel that it is permitted.",
    category: "Booking",
  },
  {
    question: "Do you serve areas outside Porto?",
    answer: "I primarily serve Porto and surrounding areas. Send your location on WhatsApp and I will confirm if I can reach you.",
    category: "Service Areas",
  },
  {
    question: "What is the cancellation policy?",
    answer: "Please provide at least 24 hours notice for cancellations. Late cancellations may be subject to a fee. Contact me via WhatsApp for any changes.",
    category: "Policies",
  },
  {
    question: "How should I prepare for my massage?",
    answer: "Stay hydrated, avoid heavy meals before your treatment, and communicate any preferences or medical conditions. Wear comfortable clothing and I will handle the rest.",
    category: "Preparation",
  },
  {
    question: "What payment methods do you accept?",
    answer: "Payment is accepted via cash, bank transfer, or MB Way. Details will be confirmed when booking.",
    category: "Booking",
  },
];

export const PLATFORM_RATINGS: PlatformRating[] = [
  { platform: "Google", rating: 5.0, review_count: 41, profile_url: "https://g.page/r/CeTmnPuZR9q3EBM/review" },
  { platform: "Tripadvisor", rating: 5.0, review_count: 50, profile_url: "https://www.tripadvisor.com/UserReviewEdit-g189180-d34355172-Gz_zone_Massage_Cupping_Therpay_Porto-Porto_Porto_District_Northern_Portugal.html" },
  { platform: "Wanderlog", rating: 5.0, review_count: 129, profile_url: "https://wanderlog.com/place/details/12672638/gzzone-massage--cupping-therapy-istanbul" },
  { platform: "WhatClinic", rating: 5.0, review_count: 15, profile_url: "https://www.whatclinic.com/consumer/reviewslead.aspx?clinicid=302529" },
];

export const CLIENT_REVIEWS: Review[] = [
  { customer_name: "Gabriel Pillcurima", platform: "Google Maps", rating: 5, content: "I had a great massage experience with Omar, he is very knowledgeable and detailed in his practice. This certainly spoke to his professionalism and experience. For example, as is usual before massages, we started off by talking about what I was hoping to get out of the session and I had a good feeling that he understood. This was very evident during the session where he performed various modalities of trigger point therapy and range of motion movements. His ability to perform a massage therapy session very customized to what we spoke about further speaks to Omar's ability!", external_url: null },
  { customer_name: "Andrew Shute", platform: "Google Maps", rating: 5, content: "Came to Omar because of his great reviews, and he did not disappoint. He is a wealth of knowledge and takes a holistic approach rooted in sports medicine and physical therapy. Highly recommend!!", external_url: null },
  { customer_name: "Amine Drissi Slimani", platform: "Google Maps", rating: 5, content: "I definitely recommend Omar for the wet cupping session therapy. What I appreciate about him is his great patience in performing his work and his willingness to share information about the therapy and good tips to follow after treatment. Compared to my previous cupping therapies, I found the one performed by Omar is one of the Best.", external_url: null },
  { customer_name: "Sergey Smirnov", platform: "Google Maps", rating: 5, content: "I woke up with a severe muscle pain in the neck and the back and couldn't even move properly, but Omar did a tremendous job, relaxed the sore muscles and removed the trigger points. Felt far better the next day already. Totally recommend!", external_url: null },
  { customer_name: "muzammil Hussain Khan malik", platform: "Google Maps", rating: 5, content: "Omar is excellent in his craft. I had a mix of deep tissue, reflexology and trigger point massage. I highly recommend him for anyone in Istanbul looking for a massage.", external_url: null },
  { customer_name: "Meax Niezgodski", platform: "Google Maps", rating: 5, content: "Omar was able to come set up his table in our Airbnb and do back-to-back massages for my partner and I. Walking the hills of Istanbul all week combined with our usual body woes had us in need of help and relaxation. Omar delivered on short notice. He is a very skilled body therapist, we were both so pleased with the experience, felt very safe having him in our home-away-from-home, and can only recommend him to others!", external_url: null },
  { customer_name: "Maxim Zotov", platform: "Google Maps", rating: 5, content: "Omar is a crazy professional! He has many techniques and helped cope with terrible tension in the cervical spine. He kneaded my whole body and found the pain points. Huge gratitude! Perfectly combines a chiropractor and a massage therapist. The best master in Istanbul", external_url: null },
  { customer_name: "Pipipi F", platform: "Google Maps", rating: 5, content: "I can make it short and say it was an hour of life, this guy is gifted with great hands. Thank you buddy and I really appreciate it.", external_url: null },
  { customer_name: "\u0418\u043b\u044c\u044f \u0424\u0435\u0439\u0433\u0435\u043d\u043e\u0432", platform: "Google Maps", rating: 5, content: "Came to Omar with a request for neck pain. And received a quality full body massage. The pain is gone. Thank you for your work.", external_url: null },
  { customer_name: "Khalid DRISSI SLIMANI", platform: "Google Maps", rating: 5, content: "I recently had a massage with Omar and I couldn't be happier with the experience. From the moment I arrived, I was greeted warmly and felt immediately at ease. Omar took the time to listen to my concerns and used a variety of techniques to help alleviate my muscle tension and pain.", external_url: null },
  { customer_name: "Nar N", platform: "Google Maps", rating: 5, content: "Best massage I have ever had for my chronic back pain. I had a hip pain that was bothering me for months and didn't let me walk properly, and after massage session with Omar it went away. I appreciated the personalized approach, respectful attitude and comfortable environment.", external_url: null },
  { customer_name: "A C", platform: "Google Maps", rating: 5, content: "Thank you a lot. In my experience it was the best massage in my life. After the first session, I keep my posture straight and receive compliments.", external_url: null },
  { customer_name: "Moheb Tieima", platform: "Google Maps", rating: 5, content: "Great service, vibes and very going with the flow. Peaceful session and great hospitality. Thank you for participating in the difference.", external_url: null },
  { customer_name: "Mitali Poovayya", platform: "Google Maps", rating: 5, content: "Best sports massage in a long time.", external_url: null },
  { customer_name: "Gordon Phillips", platform: "Google Maps", rating: 5, content: "Omar is an amazing healer. He has an incredible technique, finding every sore spot in my back, neck and head - and using really unique rhythms and movements to work out tensions and aches. A great find here in Istanbul - will definitely be using him often when we're here!", external_url: null },
  { customer_name: "jingwen zhang", platform: "Google Maps", rating: 5, content: "I was worried a bit before going to Omar's studio as I've never had a massage by a man, but the moment I entered his studio all the worries were gone. He offered me very clear instructions of how to find his place, and was very polite and gentle during the massage.", external_url: null },
  { customer_name: "Dan Lins", platform: "Google Maps", rating: 5, content: "Great first time cupping experience. He worked with the time that was best for me and informed me of each and every step along the way, checking in on my comfort level the whole time.", external_url: null },
  { customer_name: "Fatemeh Ajallooeian", platform: "Google Maps", rating: 5, content: "A Superb Massage Experience! I recently had the pleasure of visiting Omar's studio and it left me utterly rejuvenated and amazed. He is a true haven of healing, boasting exceptional skills and an in-depth understanding of various ailments. Omar exuded a sense of calm and professionalism.", external_url: null },
  { customer_name: "Rubens", platform: "WhatClinic", rating: 5, content: "All perfect! Omar is super, precise and explains all the steps step by step. Clean environment and sterile procedure. Immediate benefit.", external_url: null },
  { customer_name: "Jamie", platform: "WhatClinic", rating: 5, content: "I was worried a bit before going to Omar's studio as I've never had a massage by a man, but the moment I entered his studio all the worries were gone. He offered me very clear instructions and was very polite and gentle during the massage.", external_url: null },
  { customer_name: "Bayram G\u00fcl", platform: "Google Maps", rating: 5, content: "Omar does this job very professionally and meticulously, I recommend him wholeheartedly.", external_url: null },
  { customer_name: "\u5973\u6027\u5409\u5ca1 \u30b9\u30b7\u30ed\u30ef\u30c6\u30a3", platform: "Google Maps", rating: 5, content: "Omar really helped me with recovery from my one week post-surgery lipo with lymphatic massage. Very professional, came to my Airbnb on time. I feel so good and so much better, will have him again! He is really good.", external_url: null },
  { customer_name: "Veng Mei Leong", platform: "Google Maps", rating: 5, content: "Omar is very knowledgeable and provided an excellent service. I feel relaxed, my shoulder pain has shifted and the healing process continues after the treatment. Thank you Omar.", external_url: null },
  { customer_name: "Meta Advanced", platform: "Google Maps", rating: 5, content: "I had my deep tissue massage today and honestly I've never felt better before. It was amazing, polite, respectful, caring and knowing exactly how to take the muscle pain away. Couldn't recommend more. Thanks!", external_url: null },
  { customer_name: "mahdi wahedi", platform: "Google Maps", rating: 5, content: "Polite and professional, appreciate his work.", external_url: null },
  { customer_name: "Abdullah Alzelaki", platform: "Google Maps", rating: 5, content: "I had an amazing experience with my friend's Massage & Cupping Therapy! He is well professional and had excellent knowledge of the techniques used. He was also incredibly kind and made me feel at ease throughout the entire session.", external_url: null },
  { customer_name: "Jonny", platform: "WhatClinic", rating: 5, content: "Omar is a great massage therapist. I had a 2 hour session at his place while I was travelling Istanbul and I did enjoy it a lot. A must have when you are there, especially after walking through a busy crowded street at Taksim.", external_url: null },
  { customer_name: "Abdullah", platform: "WhatClinic", rating: 5, content: "I had an amazing experience with Massage & Cupping Therapy! He is well professional and had excellent knowledge of the techniques used. He was also incredibly kind and made me feel at ease throughout the entire session.", external_url: null },
  { customer_name: "Amine Drissi-Slimani", platform: "WhatClinic", rating: 5, content: "I definitely recommend Omar for the wet cupping session therapy. What I appreciate about him is his great patience in performing his work and his willingness to share information about the therapy and good tips to follow after treatment.", external_url: null },
  { customer_name: "Malik K", platform: "WhatClinic", rating: 5, content: "Omar is excellent in his craft. I had a mix of deep tissue, reflexology, and trigger point massage. I highly recommend him to anyone in Istanbul looking for a massage.", external_url: null },
  { customer_name: "Awas Ahmed", platform: "Google Maps", rating: 5, content: "Highly recommended! If you want a professional and skilled massage therapist, Omar is the man you should contact. Communication and agreement go smoothly. A very nice and genuine man who only wants the best for his customers.", external_url: null },
  { customer_name: "Kaiyun Luo", platform: "Google Maps", rating: 5, content: "Excellent and unforgettable experience. The therapist is friendly, helpful and professional. Will take the massage again next time I come here.", external_url: null },
  { customer_name: "Gurdeep Grewal", platform: "Google Maps", rating: 5, content: "I am so grateful to have received a wonderful massage during my time in Istanbul. I have a deep appreciation for Omar's holistic approach. He is amazingly skilled and intuitive at what he does. He found all the tension spots, and knew what my body needed.", external_url: null },
  { customer_name: "Barbara Manon", platform: "Google Maps", rating: 5, content: "Best massage in Turkey. I got a massage & dry cupping. Totally recommended; Omar really takes the time for you so you leave his studio relaxed and recovered.", external_url: null },
  { customer_name: "Shash Singh", platform: "Google Maps", rating: 5, content: "Excellent sports massage! I feel great after. Deep understanding of sports injuries which really helped a lot, and he also gave me physio exercises!", external_url: null },
  { customer_name: "Yusuf Malik", platform: "Google Maps", rating: 5, content: "I can't speak highly enough of Omar's skill, professionalism, knowledge and kindness. He was on time, explained everything when I asked, worked with my complaints to tailor the service to my needs. Someone who takes pride in his work and cares about the customer.", external_url: null },
  { customer_name: "sol Baek", platform: "Google Maps", rating: 5, content: "Friendly and skilled masseuse. I recommend this place if you are looking for a massage.", external_url: null },
  { customer_name: "Ahmed Mostafa", platform: "Google Maps", rating: 5, content: "Best coach ever!", external_url: null },
  { customer_name: "Joe Jennings", platform: "Google Maps", rating: 5, content: "GZ saved me from some terrible pain. My sciatic nerve in my hip was pinched and he gave me 2.5 hours of treatment \u2014 the best massage I've ever had and a great dry and wet cupping session. He paid close attention to specific points of concern.", external_url: null },
  { customer_name: "Konstantin Sukhin", platform: "Google Maps", rating: 5, content: "I guess now I know what a quality massage has to feel like. Happy I found you!", external_url: null },
  { customer_name: "Nesreen Talat", platform: "Google Maps", rating: 5, content: "I really appreciate every single step taken and great effort you did to create your own lovely work. You are on your first steps to work what you love, enjoy and passionate about.", external_url: null },
  { customer_name: "Matthew J. Martinez", platform: "Google Maps", rating: 5, content: "I had a great massage with Omar. He has good massage technique and strong hands. I highly recommend a treatment with him.", external_url: null },
  { customer_name: "Moha Elsayed", platform: "Google Maps", rating: 5, content: "Best treatment ever! Highly recommended! Omar is very professional, polite and excellent. I was so relaxed after our treatment. It's totally different, how knowledgeable he is, makes you feel satisfied.", external_url: null },
  { customer_name: "Mohamed Gamal", platform: "Google Maps", rating: 5, content: "Great and professional service! Omar is not only a master of his work offering a variety of massage types, cupping therapy and stretching classes, but he was also a civil engineer and fitness trainer. So all is on a solid background of information and studying. Highly recommend!", external_url: null },
  { customer_name: "Mohamed Ahmed", platform: "Google Maps", rating: 5, content: "I had a problem in my left shoulder causing pain while moving it and my neck, but after the GZ package \u2014 a mix of medical massage and cupping \u2014 I felt better and this problem was addressed by this unique approach of healing mixed with relaxation.", external_url: null },
  { customer_name: "Ezra2002 Ezra", platform: "Google Maps", rating: 5, content: "A good massage is a combination of trust between the therapist and the client as well as high competence by the therapist. Omar meets both criteria. He is highly professional, competent and effective. He listens carefully and takes the client's needs into account.", external_url: null },
  { customer_name: "Ala' Abubaker", platform: "Google Maps", rating: 5, content: "Great deep tissue massage... Omar is the only person I know who can get rid of my tension headaches. Very grateful for having him!", external_url: null },
  { customer_name: "AK S", platform: "Google Maps", rating: 5, content: "Great experience! Omar was professional and explained the cupping procedure very thoroughly over the course of the treatment. Highly recommend him!", external_url: null },
  { customer_name: "Anthony Matsis", platform: "Google Maps", rating: 5, content: "I needed an urgent massage after my lower back flared up and called Omar. Had an extremely productive massage and cupping therapy at home. My girlfriend also tried his services and it was amazing.", external_url: null },
  { customer_name: "Ivan Utkin", platform: "Google Maps", rating: 5, content: "Great massage, Omar is friendly and very professional. If I had more time in Istanbul I wouldn't hesitate to come back a few times.", external_url: null },
  { customer_name: "Jordy Jahmal", platform: "Google Maps", rating: 5, content: "If you are looking for someone who is very well educated and knows what he's exactly doing then you should visit Omar! He takes his time to provide you the best service. 100% Recommended!", external_url: null },
  { customer_name: "Daniel Navarro", platform: "Google Maps", rating: 5, content: "Incredible massage during my trip to Istanbul. Extremely strong, very intuitive, and super friendly. I have severe shoulder pain and have had lots of massages, Omar is way up at the top. Would highly recommend!", external_url: null },
  { customer_name: "Dream Team Fitness TN", platform: "Google Maps", rating: 5, content: "Great service, thank you!", external_url: null },
  { customer_name: "Turner Palm", platform: "Google Maps", rating: 5, content: "Incredible! Omar is definitely a professional, he knows how to pinpoint your points of tension and release them.", external_url: null },
  { customer_name: "M I", platform: "Google Maps", rating: 5, content: "Best massage I've had in a long time. Knew what I needed and helped relieve my issues. Would recommend.", external_url: null },
  { customer_name: "modi abdul", platform: "Google Maps", rating: 5, content: "Omar is a professional massage therapist who is trained and loves his work. I get massages way more than the average person and I can tell you that I had one of my top massages from him. Highly recommend.", external_url: null },
  { customer_name: "Leysan Khakimova", platform: "Google Maps", rating: 5, content: "Omar is an extremely talented massage therapist, what a discovery! This without a doubt is by far the best massage I have ever had in my entire life. He helped me relax every single muscle in my body. You can tell he loves what he does.", external_url: null },
  { customer_name: "Shahin Gol", platform: "Google Maps", rating: 5, content: "Did my first cupping session. I was informed of all the benefits before and during the process. Omar is excellent and I highly recommend him!", external_url: null },
  { customer_name: "Christy Walshe", platform: "Google Maps", rating: 5, content: "Intuitive touch and kind soul! Great experience.", external_url: null },
  { customer_name: "Charbel Meaiky", platform: "Google Maps", rating: 5, content: "It was my first experience with cupping and it was wonderful. It also relieved my back pain. I advise everyone to experience this.", external_url: null },
  { customer_name: "Valentyna B.", platform: "Google Maps", rating: 5, content: "It was the best massage I ever had! Very professional and attentive. Will definitely do it again when I am back to Istanbul.", external_url: null },
  { customer_name: "Mahmoud Metwaly", platform: "Google Maps", rating: 5, content: "He is the best one in Istanbul to do massage and cupping. Definitely will contact him every time I am in Istanbul.", external_url: null },
  { customer_name: "Jo Tara", platform: "Google Maps", rating: 5, content: "It's not the usual hard massage. You can call it body work. It's very deep and healing. He knows exactly where your pain points are and where your body is blocked. He treats the body as a holistic system and understands Traditional Chinese medicine.", external_url: null },
  { customer_name: "ilkhom narboev", platform: "Google Maps", rating: 5, content: "I repeated my experience with him. There's no limit for his upgrades. A God-gifted person. Professional and sensitive master. He knows what to do and how to do it. A professional in its purest form.", external_url: null },
  { customer_name: "Zoryana German", platform: "Google Maps", rating: 5, content: "During my visit to Istanbul, I was very lucky to get an appointment with Omar. I was looking for Hijama for years. I am a massage therapist and heard about Hijama's benefits a lot. To my surprise it didn't hurt. Amazing experience!", external_url: null },
  { customer_name: "waheed masadeh", platform: "Google Maps", rating: 5, content: "Omar, your magic touch has made me feel a few inches taller after sorting out my knotty back. Thank you!", external_url: null },
  { customer_name: "Christian Parpard", platform: "Google Maps", rating: 5, content: "He was putting in so much effort. My girlfriend is diagnosed with MS and he made it possible for us to have a great second week in Istanbul! I can fully recommend his work! Reflexology, trigger point and lymphatic massage was on point!", external_url: null },
  { customer_name: "Maria Motkina", platform: "Google Maps", rating: 5, content: "Me and my husband had a massage and it was very good, highly recommended!", external_url: null },
  { customer_name: "Nikita Gerasimov", platform: "Google Maps", rating: 5, content: "Mix of different techniques, energized hands, attentiveness to every moment of the procedure, positive atmosphere and professionalism \u2014 that's the key to an amazing massage provided here! Total relaxation, relief and surge of strength is guaranteed!", external_url: null },
  { customer_name: "\u015eEREF \u015eENT\u00dcRK", platform: "Google Maps", rating: 5, content: "He's an expert in this field.", external_url: null },
  { customer_name: "Yasemin Ozmert", platform: "Google Maps", rating: 5, content: "Very professional, really knows what he's doing. It was a great experience and I felt amazing after. Thank you very much, I appreciated your work.", external_url: null },
  { customer_name: "Jiaman Lian", platform: "Google Maps", rating: 5, content: "We had a wonderful massage and cupping with Omar. He is professional, patient and very kind. It was our best massage in a long time! Would highly recommend it to everyone!", external_url: null },
  { customer_name: "Vladim Vladimovich", platform: "Google Maps", rating: 5, content: "Very good massage. Sometimes you even fall asleep, it's so relaxing. But at the same time it is strong and relieves all tension in the muscles after sports. I recommend!", external_url: null },
  { customer_name: "Farah ONEISSI", platform: "Google Maps", rating: 5, content: "Very professional and respectful. Will definitely do another massage when I come back to Istanbul.", external_url: null },
  { customer_name: "Andrey Glushko", platform: "Google Maps", rating: 5, content: "Was lucky to meet this professional in Istanbul! Very strong hands and amazing treatment!", external_url: null },
  { customer_name: "Mehmona Ahmad", platform: "Google Maps", rating: 5, content: "My father and husband received treatment at Omar's which included cupping and massage. We have only good things to say. He is professional in his work and passionate about giving the best possible performance.", external_url: null },
  { customer_name: "Jasmine Li", platform: "Google Maps", rating: 5, content: "Best massage here! Highly recommended! Omar is very patient, professional and excellent. The massage effectively helped relieve my back pain and muscle pains, and I relaxed a lot. Impressed with your knowledge and experience.", external_url: null },
  { customer_name: "Maria Grigoreva", platform: "Google Maps", rating: 5, content: "Everything went great! Felt really relaxed after the massage. Thank you!", external_url: null },
  { customer_name: "Dream Doula", platform: "Google Maps", rating: 5, content: "He's super professional and detailed. I felt great with him. He has such hands, it's almost a spiritual experience.", external_url: null },
  { customer_name: "Jessica P", platform: "Google Maps", rating: 5, content: "Without a doubt the best and most attentive massage I've ever had \u2014 and I've had a lot! Omar is clearly extremely knowledgeable and is able to quickly figure out what your specific body needs, treating every person individually rather than doing the same massage for everyone.", external_url: null },
  { customer_name: "Narelle Gorman", platform: "Google Maps", rating: 5, content: "Wow wow wow! From the moment we began communication Omar was more than 5 stars. Professional, courteous, exemplary service. Combined with what I would describe as bodywork vs massage. Omar is intuitive, feels your body and you can tell he is dedicated to your experience.", external_url: null },
  { customer_name: "Reham Ali", platform: "Google Maps", rating: 5, content: "Wow! Absolutely fantastic! You've made a client for life. I feel completely different, healed and satisfied. You are a professional therapist with a solid background of information. I highly recommend Omar.", external_url: null },
  { customer_name: "Lance Jubel", platform: "Google Maps", rating: 5, content: "Wow, wow, wow! I am practically speechless. Omar is one of the more knowledgeable masseuses I've had and the price was reasonable. I had an hour pressure point massage with 30 minute cupping. He could tell where I was experiencing pain and tightness.", external_url: null },
  { customer_name: "Roy Levy", platform: "Google Maps", rating: 5, content: "Omar was unbelievable in every way as a therapist. So skilled, professional and kind soul. Asking the right questions and making sure the atmosphere is comfortable. He was able to find all of my back and shoulders weak spots and treat them so well.", external_url: null },
  { customer_name: "\u0421\u0442\u0435\u043f\u0430\u043d \u041a\u043e\u0437\u043b\u043e\u0432", platform: "Google Maps", rating: 5, content: "You've found a pretty comfortable place and a professional guy who is able to relax your body gently! Can recommend Omar to help you with your massage requests!", external_url: null },
  { customer_name: "Olessja Bessmeltseva", platform: "Google Maps", rating: 5, content: "Excellent master and the best experience ever. Would advise to everyone who wants to leave beyond the routine for a while and feel returned to a better life.", external_url: null },
  { customer_name: "qi xiong", platform: "Google Maps", rating: 5, content: "Great massage, very relaxed and refreshed.", external_url: null },
  { customer_name: "llDHOMll", platform: "Google Maps", rating: 5, content: "Professional massage, I recommend it. Thank you!", external_url: null },
  { customer_name: "Jason Madore", platform: "Google Maps", rating: 5, content: "Professional, caring, and technically excellent massage therapist. The best.", external_url: null },
  { customer_name: "Zhou jeffery", platform: "Google Maps", rating: 5, content: "Really professional and helpful treatment. The massage made me feel relaxed and reduced my shoulder pain. Many thanks for this experience that Gz'Zone provided.", external_url: null },
  { customer_name: "Ines Brendel", platform: "Google Maps", rating: 5, content: "Recommended for anyone looking for relaxation and a good massage! One of the best massages I have ever had. Omar is sensitive, loving and caring, he responds exactly to your needs and knows what he is doing! I felt very comfortable and will definitely come back. Thank you!", external_url: null },
  { customer_name: "Ching N", platform: "WhatClinic", rating: 5, content: "What impressed me most was not only his knowledge and technique but also the genuine care he shows. After reading so many outstanding reviews, I had high expectations, and Omar exceeded every one of them. By the end of the session I felt like my entire body had been reset.", external_url: null },
  { customer_name: "Leysan", platform: "WhatClinic", rating: 5, content: "Without a doubt this was one of the best massages I have ever experienced. Omar is an incredibly talented massage therapist and a true professional. His knowledge, skill, and attention to detail are exceptional. On top of that, he is kind, respectful, and makes you feel completely comfortable.", external_url: null },
  { customer_name: "Mido", platform: "WhatClinic", rating: 5, content: "Omar was an excellent and attentive therapist. The session was carried out in a very clean, organised, and professional manner. Omar was respectful, skilled, and attentive to our needs. We were very happy with the service.", external_url: null },
  { customer_name: "Nikita", platform: "WhatClinic", rating: 5, content: "A perfect combination of different techniques, attentive care, and a professional approach made this experience truly outstanding. An incredible atmosphere, deep relaxation, relief for the body, and a renewed feeling of strength \u2014 Highly recommended!", external_url: null },
  { customer_name: "Qasi H", platform: "WhatClinic", rating: 5, content: "I had an absolutely amazing massage and cupping session. The combination of the massage and dry cupping therapy was honestly magical. I came in with serious back pain and tension, and by the end I felt a huge difference. My back pain was almost completely gone, my body felt lighter, and I left feeling deeply relaxed and refreshed.", external_url: null },
  { customer_name: "Ali R", platform: "WhatClinic", rating: 5, content: "Omar is one of the best professionals I've had the pleasure to work with. He's incredibly knowledgeable! His work is methodical and effective. He has my best recommendation, and I look forward to each session.", external_url: null },
  { customer_name: "Iaroslav V", platform: "WhatClinic", rating: 5, content: "This was one of those rare cases where the quality is evident through the results rather than words. Even after just one session, a large part of the tension was relieved, my back felt noticeably lighter, and my overall condition improved considerably.", external_url: null },
  { customer_name: "Anastasiia V", platform: "WhatClinic", rating: 5, content: "The perfect massage in Porto! He truly listened and focused specifically on the areas I mentioned. As soon as I got off the massage table, I immediately felt lightness in my neck and could move my head freely without discomfort. I finally found someone who genuinely helps.", external_url: null },
  { customer_name: "Elena Andrade P", platform: "WhatClinic", rating: 5, content: "Super professional with a huge amount of experience. His background in fitness means he not only uses massage techniques but also knows exactly how each muscle functions. And the bonus is that he goes to your house! My body feels so relaxed, and my legs are light as if they got rid of a huge load.", external_url: null },
  { customer_name: "Renan P", platform: "WhatClinic", rating: 5, content: "I had a really great massage experience. Omar was extremely calm and professional, which immediately made me feel at ease. His technique was precise and relaxing, striking the perfect balance between pressure and comfort. He also took the time to give me useful advice on training and posture.", external_url: null },
  { customer_name: "Olessya", platform: "WhatClinic", rating: 5, content: "I had an exceptional and pleasant experience of cupping therapy with Omar. Totally recommend his services. I felt a surge of strength and energy after the first session instantly. Definitely want to repeat it!", external_url: null },
  { customer_name: "Mohamed Rabeh", platform: "Google Maps", rating: 5, content: "I had a wonderful experience with Omar. He is an extremely professional massage therapist, and you can immediately feel that everything he does is based on real scientific knowledge, experience, and a deep understanding of the body.", external_url: null },
  { customer_name: "Eric Spade", platform: "Google Maps", rating: 5, content: "Omar is an excellent massage therapist. He travels to you with his massage table. He listens to you and provides a massage tailored to your needs. I had difficulty finding a massage therapist in Porto who does deep tissue massage. But Omar correctly does it and knows acupressure points which relieve tension for the whole body.", external_url: null },
  { customer_name: "Abbie Molenaar", platform: "Google Maps", rating: 5, content: "Omar was extremely knowledgeable and professional throughout the session. He took the time to assess my condition carefully and explained everything clearly. He also recommended specific stretches and exercises that I can do to improve my mobility and strengthen weaker muscle groups.", external_url: null },
  { customer_name: "Cara Frank", platform: "Google Maps", rating: 5, content: "Omar is an amazing massage therapist. He comes to the house. He's totally professional: prepared with disposable sheets and masked. He is very respectful and made me feel completely comfortable. Highly recommend!", external_url: null },
  { customer_name: "Moustafa ME", platform: "Google Maps", rating: 5, content: "Omar is friendly, knowledgeable and teaches you the benefits of each treatment and service available. Place is very clean with positive vibes. If you're looking for massage, cupping, or wet cupping he is the man!", external_url: null },
  { customer_name: "Caroline Pady", platform: "Google Maps", rating: 5, content: "Omar is a really fantastic masseur! If you're in need of a firm massage don't hesitate to book. I had a few massages and some cupping with him when I was on holiday, as I was experiencing tension headaches and a lot of discomfort in my neck.", external_url: null },
  { customer_name: "Kendall Williams", platform: "Google Maps", rating: 5, content: "Top tier deep tissue massage. This guy really is skilled at the craft of a deep tissue massage! Also he is kind and professional! Definitely recommend if you're looking for a really good deep tissue massage!", external_url: null },
  { customer_name: "Kate Akaa", platform: "Google Maps", rating: 5, content: "I've now had 2 massage sessions with Omar and highly recommend his services!", external_url: null },
  { customer_name: "Anton Lebodkin", platform: "Google Maps", rating: 5, content: "One of the best medical massage experiences. Professional therapist. Highly recommended.", external_url: null },
  { customer_name: "Jia-Yang Chen", platform: "Google Maps", rating: 5, content: "As an Asian, I've experienced many different types of massage in various countries. Although Omar's services aren't presented as a medical approach, the healing effect was very similar to the tuina and cupping treatments I've received from professionals.", external_url: null },
  { customer_name: "Hind Lemfaddel", platform: "Google Maps", rating: 5, content: "Magic hands and a true professional!! Highly recommended.", external_url: null },
  { customer_name: "Irina Pavlenko", platform: "Google Maps", rating: 5, content: "This was truly an extraordinary experience \u2014 a complete reset for both body and mind. Omar is an exceptional massage therapist and a true professional. He is skilled, attentive, and clearly passionate about his work.", external_url: null },
  { customer_name: "Ossama", platform: "Google Maps", rating: 5, content: "Omar is highly skilled and incredibly knowledgeable. His deep tissue work and cupping finally relieved my stubborn cervical pain. I highly recommend him.", external_url: null },
  { customer_name: "JW", platform: "Google Maps", rating: 5, content: "I know Omar from the time he was in Istanbul, and I have always appreciated his polite and professional treatment, which was very effective in relieving my chronic backache and stiff shoulders.", external_url: null },
  { customer_name: "Lena Erikhova", platform: "Google Maps", rating: 5, content: "I was very pleased with the massage! Omar is a true professional. Very attentive, polite, and punctual. From the very first moment, you can tell he's an expert in his field and genuinely cares about his clients' comfort.", external_url: null },
  { customer_name: "\u041a\u0440\u0438\u0441\u0442\u0438\u043d\u0430 \u042e\u0434\u0438\u043d\u0430", platform: "Google Maps", rating: 5, content: "I had a vacuum massage and was very pleased. The procedure was comfortable, and the effects were noticeable after just one session: relaxation, lightness, and a pleasant sensation throughout my body.", external_url: null },
  { customer_name: "\u0412\u0438\u043a\u0442\u043e\u0440\u0438\u044f \u041d-\u041a", platform: "Google Maps", rating: 5, content: "I saw Omar in June 2025. After three sessions, my back and lower back pain was gone. He's a very professional and polite young man. I highly recommend him.", external_url: null },
  { customer_name: "\u0418\u0440\u0438\u043d\u0430 \u0417\u0430\u0439\u0446\u0435\u0432\u0430", platform: "Google Maps", rating: 5, content: "I really liked everything. He is a professional in his field. Thank you, I recommend him!", external_url: null },
];

export interface Testimonial {
  customer_name: string;
  customer_photo_url: string | null;
  content: string;
  location: string | null;
}

export const TESTIMONIALS: Testimonial[] = [
  { customer_name: "Anastasiia V", customer_photo_url: null, content: "The perfect massage in Porto! He truly listened and focused specifically on the areas I mentioned. As soon as I got off the massage table, I immediately felt lightness in my neck and could move my head freely without discomfort. I finally found someone who genuinely helps instead of just giving a standard massage.", location: "Porto, Portugal" },
  { customer_name: "Qasi H", customer_photo_url: null, content: "I had an absolutely amazing massage and cupping session. The combination of the massage and dry cupping therapy was honestly magical. I came in with serious back pain and tension, and by the end I felt a huge difference. My back pain was almost completely gone.", location: "Netherlands" },
  { customer_name: "Irina Pavlenko", customer_photo_url: null, content: "This was truly an extraordinary experience \u2014 a complete reset for both body and mind. Omar is an exceptional massage therapist and a true professional. He is skilled, attentive, and clearly passionate about his work.", location: "Porto, Portugal" },
  { customer_name: "Ching N", customer_photo_url: null, content: "After reading so many outstanding reviews, I had high expectations, and Omar exceeded every one of them. By the end I felt like my entire body had been reset. What impressed me most was not only his knowledge but also the genuine care he shows.", location: "United States" },
  { customer_name: "Elena Andrade P", customer_photo_url: null, content: "Super professional with a huge amount of experience. His background in fitness means he not only uses massage techniques but also knows exactly how each muscle functions. And the bonus is that he goes to your house!", location: "Porto, Portugal" },
  { customer_name: "Jessica P", customer_photo_url: null, content: "Without a doubt the best and most attentive massage I've ever had \u2014 and I've had a lot! Omar is clearly extremely knowledgeable and is able to quickly figure out what your specific body needs, treating every person individually.", location: "Porto, Portugal" },
];

export const CATEGORY_LABELS: Record<string, string> = {
  "massage-therapy": "Massage Therapy",
  "medical-aesthetics": "Medical Aesthetics",
  "holistic-health": "Holistic Health",
};