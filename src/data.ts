export const HERO = {
  title: "Professional Massage. Delivered to You.",
  subtitle: "Gz'zone - a zone without boundaries",
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
  unit?: string;
}

export interface FAQ {
  question: string;
  answer: string;
  category: string;
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
  | "key_benefits"
  | "what_to_expect"
  | "about_section"
  | "reputation_section"
  | "faq_section"
  | "footer"
  | "final_cta"
  | "certifications_section"
  | "hours_section"
  | "service_areas_section"
  | "gallery_section"
  | "privacy_policy"
  | "terms";

export const SITE_CONTENT_SEED: Record<SiteContentKey, Record<string, unknown>> = {
  hero: {
    title: "Professional Massage. Delivered to You.",
    subtitle: "Gz'zone - a zone without boundaries",
    description:
      "Enjoy a professional massage in the comfort of your home, hotel, or apartment in Porto. I bring the massage table and everything needed for your treatment directly to you.",
    cta_text: "Book via WhatsApp",
    explore_text: "Explore Treatments",
    location_text: "Serving Porto and surrounding areas",
    dialog_title: "Please Select Your Treatment First",
    dialog_description:
      "Choose your required treatment below to view duration, pricing, and book your personalized session directly via WhatsApp.",
    dialog_link: "Browse All Treatments & Prices \u2192",
  },
  trust_bar: {
    items: [
      { label: "Professional Service" },
      { label: "At Your Location" },
      { label: "Equipment Provided" },
      { label: "Easy Booking" },
    ],
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
      {
        title: "Professional Approach",
        description: "Every treatment is delivered with the highest standards of professionalism and care.",
      },
      {
        title: "Respectful Environment",
        description: "Your comfort, privacy, and personal boundaries are respected throughout the entire experience.",
      },
      {
        title: "Personalized Treatment",
        description: "Each session is tailored to your specific needs and preferences.",
      },
      {
        title: "Privacy and Comfort",
        description: "Your treatment takes place in the privacy of your chosen location.",
      },
    ],
    certLabel: "Certified & Professional",
    certHeading: "Your Wellbeing Is in Safe Hands",
    certText:
      "Omar Elgazzar is a professionally trained massage therapist with certified qualifications in massage therapy, cupping, and specialized bodywork. Every treatment is delivered with professionalism, care, and attention to your wellbeing.",
    imageAlt: "Omar Elgazzar \u2014 Mobile Massage Therapist Porto",
    image_url: null,
    cert_image_url: null,
  },
  reputation_section: {
    heading: "Trusted by Our Clients",
    subheading: "What Our Clients Say",
    reviewLabel: "Read Reviews on",
  },
  faq_section: {
    heading: "Frequently Asked Questions",
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
    phone: "+351 913 675 810",
    phoneHref: "https://wa.me/351913675810",
    location: "Porto, Portugal",
    instagramHandle: "@gz.zone",
    instagramUrl: "https://www.instagram.com/gz.zone/",
    copyright: "GZ'ZONE. All rights reserved.",
  },
  final_cta: {
    heading: "Ready to Book Your Massage?",
    description: "Send a message on WhatsApp and I will help you find the perfect treatment.",
    button_text: "Book via WhatsApp",
  },
  certifications_section: {
    badge: "Verified Professional Credentials",
    heading: "Qualifications & Certifications",
    description:
      "Fully certified practitioner with recognized qualifications in massage therapy, bodywork, and holistic wellness.",
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
    button_text: "Send Location on WhatsApp",
  },
  gallery_section: {
    heading: "Experience Gallery",
  },
  key_benefits: {
    heading: "Key Benefits",
    items: [
      {
        title: "Muscle Relief",
        description: "Alleviates persistent muscle stiffness and chronic tension.",
      },
      {
        title: "Cellular Recovery",
        description: "Promotes micro-circulation and faster cellular recovery.",
      },
      {
        title: "Tailored Pressure",
        description: "Tailored pressure intensity based on your individual comfort level.",
      },
      {
        title: "At Your Location",
        description: "Delivered directly to your home, hotel, or apartment in Porto.",
      },
    ],
  },
  what_to_expect: {
    heading: "What to Expect",
    items: [
      {
        title: "Full Setup",
        description: "Complete equipment set-up (portable table, linens, and oils).",
      },
      {
        title: "Pre-Session Consultation",
        description: "Brief pre-session consultation to identify target pain areas.",
      },
      {
        title: "Professional Session",
        description: "Professional, hygienic, and respectful bodywork session.",
      },
      {
        title: "Aftercare Advice",
        description: "Post-treatment posture and hydration advice.",
      },
    ],
  },
  privacy_policy: {
    body_html: `      <p>Your privacy is important. This policy outlines how your personal data is collected and used.</p>
            <h2>Information We Collect</h2>
            <p>We collect information you provide when booking a massage through WhatsApp, including your name, contact details, and location.</p>
            <h2>How We Use Your Information</h2>
            <p>Your information is used solely to provide and schedule your massage treatment. We do not share your data with third parties.</p>
            <h2>Data Storage</h2>
            <p>Your information is stored securely. You may request deletion of your data at any time by contacting us via WhatsApp.</p>
            <h2>Contact</h2>
            <p>For privacy-related inquiries, contact us on WhatsApp.</p>`,
  },
  terms: {
    body_html: `      <h2>Booking</h2>
            <p>By booking a massage treatment, you agree to these terms. All bookings are confirmed via WhatsApp.</p>
            <h2>Cancellation</h2>
            <p>Please provide at least 24 hours notice for cancellations. Late cancellations may be subject to a fee.</p>
            <h2>Health</h2>
            <p>It is your responsibility to inform the therapist of any medical conditions, injuries, or allergies prior to treatment.</p>
            <h2>Liability</h2>
            <p>The therapist reserves the right to refuse or modify treatment if there are health concerns that make massage inadvisable.</p>
            <h2>Contact</h2>
            <p>For questions about these terms, contact us via WhatsApp.</p>`,
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
  {
    id: "stretching-class-1",
    name: "Stretching Class \u2014 1-on-1 Assisted Mobility & Flexibility",
    slug: "stretching-class",
    category: "holistic-health",
    short_description: "Guided 1-on-1 stretching session to improve mobility, flexibility, and muscle recovery.",
    full_description: "A targeted 1-on-1 assisted stretching session focusing on full-body mobility, joint flexibility, and tension release. Ideal for athletes, desk workers, or anyone looking to improve range of motion.",
    ideal_for: "Athletes, runners, desk workers, and anyone with tight hips, shoulders, or hamstrings.",
    sort_order: 12,
  },
];

export const DURATIONS: Duration[] = [
  { id: "d-massage-1", treatment_id: "massage-therapy-1", minutes: 60, price: 55, unit: "min" },
  { id: "d-deep-1", treatment_id: "deep-tissue-1", minutes: 60, price: 40, unit: "min" },
  { id: "d-facial-1", treatment_id: "facial-massage-1", minutes: 45, price: 40, unit: "min" },
  { id: "d-reflex-massage-1", treatment_id: "reflexology-massage-1", minutes: 60, price: 55, unit: "min" },
  { id: "d-back-1", treatment_id: "back-neck-1", minutes: 60, price: 55, unit: "min" },
  { id: "d-sports-1", treatment_id: "sports-massage-1", minutes: 60, price: 55, unit: "min" },
  { id: "d-cellulite-1", treatment_id: "cellulite-treatment-1", minutes: 60, price: 75, unit: "min" },
  { id: "d-anticell-cupping-1", treatment_id: "anti-cellulite-cupping-1", minutes: 60, price: 55, unit: "min" },
  { id: "d-anticell-massage-1", treatment_id: "anti-cellulite-massage-1", minutes: 60, price: 55, unit: "min" },
  { id: "d-cupping-1", treatment_id: "dry-cupping-1", minutes: 45, price: 40, unit: "per session" },
  { id: "d-reflex-1", treatment_id: "reflexology-1", minutes: 60, price: 40, unit: "min" },
  { id: "d-stretching-1", treatment_id: "stretching-class-1", minutes: 60, price: 55, unit: "per class" },
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
      "stretching-class-1": "stretching-class",
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



export interface Testimonial {
  customer_name: string;
  customer_photo_url: string | null;
  content: string;
  location: string | null;
}

export const TESTIMONIALS: Testimonial[] = [
  { customer_name: "Gabriel Pillcurima", customer_photo_url: null, content: "I had a great massage experience with Omar, he is very knowledgeable and detailed in his practice. This certainly spoke to his professionalism and experience. For example, as is usual before massages, we started off by talking about what I was hoping to get out of the session and I had a good feeling that he understood. This was very evident during the session where he performed various modalities of trigger point therapy and range of motion movements. His ability to perform a massage therapy session very customized to what we spoke about further speaks to Omar's ability!", location: "Google Maps" },
  { customer_name: "Andrew Shute", customer_photo_url: null, content: "Came to Omar because of his great reviews, and he did not disappoint. He is a wealth of knowledge and takes a holistic approach rooted in sports medicine and physical therapy. Highly recommend!!", location: "Google Maps" },
  { customer_name: "Amine Drissi Slimani", customer_photo_url: null, content: "I definitely recommend Omar for the wet cupping session therapy. What I appreciate about him is his great patience in performing his work and his willingness to share information about the therapy and good tips to follow after treatment. Compared to my previous cupping therapies, I found the one performed by Omar is one of the Best.", location: "Google Maps" },
  { customer_name: "Sergey Smirnov", customer_photo_url: null, content: "I woke up with a severe muscle pain in the neck and the back and couldn't even move properly, but Omar did a tremendous job, relaxed the sore muscles and removed the trigger points. Felt far better the next day already. Totally recommend!", location: "Google Maps" },
  { customer_name: "muzammil Hussain Khan malik", customer_photo_url: null, content: "Omar is excellent in his craft. I had a mix of deep tissue, reflexology and trigger point massage. I highly recommend him for anyone in Istanbul looking for a massage.", location: "Google Maps" },
  { customer_name: "Meax Niezgodski", customer_photo_url: null, content: "Omar was able to come set up his table in our Airbnb and do back-to-back massages for my partner and I. Walking the hills of Istanbul all week combined with our usual body woes had us in need of help and relaxation. Omar delivered on short notice. He is a very skilled body therapist, we were both so pleased with the experience, felt very safe having him in our home-away-from-home, and can only recommend him to others!", location: "Google Maps" },
  { customer_name: "Maxim Zotov", customer_photo_url: null, content: "Omar is a crazy professional! He has many techniques and helped cope with terrible tension in the cervical spine. He kneaded my whole body and found the pain points. Huge gratitude! Perfectly combines a chiropractor and a massage therapist. The best master in Istanbul", location: "Google Maps" },
  { customer_name: "Pipipi F", customer_photo_url: null, content: "I can make it short and say it was an hour of life, this guy is gifted with great hands. Thank you buddy and I really appreciate it.", location: "Google Maps" },
  { customer_name: "\u0418\u043b\u044c\u044f \u0424\u0435\u0439\u0433\u0435\u043d\u043e\u0432", customer_photo_url: null, content: "Came to Omar with a request for neck pain. And received a quality full body massage. The pain is gone. Thank you for your work.", location: "Google Maps" },
  { customer_name: "Khalid DRISSI SLIMANI", customer_photo_url: null, content: "I recently had a massage with Omar and I couldn't be happier with the experience. From the moment I arrived, I was greeted warmly and felt immediately at ease. Omar took the time to listen to my concerns and used a variety of techniques to help alleviate my muscle tension and pain.", location: "Google Maps" },
  { customer_name: "Nar N", customer_photo_url: null, content: "Best massage I have ever had for my chronic back pain. I had a hip pain that was bothering me for months and didn't let me walk properly, and after massage session with Omar it went away. I appreciated the personalized approach, respectful attitude and comfortable environment.", location: "Google Maps" },
  { customer_name: "A C", customer_photo_url: null, content: "Thank you a lot. In my experience it was the best massage in my life. After the first session, I keep my posture straight and receive compliments.", location: "Google Maps" },
  { customer_name: "Moheb Tieima", customer_photo_url: null, content: "Great service, vibes and very going with the flow. Peaceful session and great hospitality. Thank you for participating in the difference.", location: "Google Maps" },
  { customer_name: "Mitali Poovayya", customer_photo_url: null, content: "Best sports massage in a long time.", location: "Google Maps" },
  { customer_name: "Gordon Phillips", customer_photo_url: null, content: "Omar is an amazing healer. He has an incredible technique, finding every sore spot in my back, neck and head - and using really unique rhythms and movements to work out tensions and aches. A great find here in Istanbul - will definitely be using him often when we're here!", location: "Google Maps" },
  { customer_name: "jingwen zhang", customer_photo_url: null, content: "I was worried a bit before going to Omar's studio as I've never had a massage by a man, but the moment I entered his studio all the worries were gone. He offered me very clear instructions of how to find his place, and was very polite and gentle during the massage.", location: "Google Maps" },
  { customer_name: "Dan Lins", customer_photo_url: null, content: "Great first time cupping experience. He worked with the time that was best for me and informed me of each and every step along the way, checking in on my comfort level the whole time.", location: "Google Maps" },
  { customer_name: "Fatemeh Ajallooeian", customer_photo_url: null, content: "A Superb Massage Experience! I recently had the pleasure of visiting Omar's studio and it left me utterly rejuvenated and amazed. He is a true haven of healing, boasting exceptional skills and an in-depth understanding of various ailments. Omar exuded a sense of calm and professionalism.", location: "Google Maps" },
  { customer_name: "Rubens", customer_photo_url: null, content: "All perfect! Omar is super, precise and explains all the steps step by step. Clean environment and sterile procedure. Immediate benefit.", location: "WhatClinic" },
  { customer_name: "Jamie", customer_photo_url: null, content: "I was worried a bit before going to Omar's studio as I've never had a massage by a man, but the moment I entered his studio all the worries were gone. He offered me very clear instructions and was very polite and gentle during the massage.", location: "WhatClinic" },
  { customer_name: "Bayram G\u00fcl", customer_photo_url: null, content: "Omar does this job very professionally and meticulously, I recommend him wholeheartedly.", location: "Google Maps" },
  { customer_name: "\u5973\u6027\u5409\u5ca1 \u30b9\u30b7\u30ed\u30ef\u30c6\u30a3", customer_photo_url: null, content: "Omar really helped me with recovery from my one week post-surgery lipo with lymphatic massage. Very professional, came to my Airbnb on time. I feel so good and so much better, will have him again! He is really good.", location: "Google Maps" },
  { customer_name: "Veng Mei Leong", customer_photo_url: null, content: "Omar is very knowledgeable and provided an excellent service. I feel relaxed, my shoulder pain has shifted and the healing process continues after the treatment. Thank you Omar.", location: "Google Maps" },
  { customer_name: "Meta Advanced", customer_photo_url: null, content: "I had my deep tissue massage today and honestly I've never felt better before. It was amazing, polite, respectful, caring and knowing exactly how to take the muscle pain away. Couldn't recommend more. Thanks!", location: "Google Maps" },
  { customer_name: "mahdi wahedi", customer_photo_url: null, content: "Polite and professional, appreciate his work.", location: "Google Maps" },
  { customer_name: "Abdullah Alzelaki", customer_photo_url: null, content: "I had an amazing experience with my friend's Massage & Cupping Therapy! He is well professional and had excellent knowledge of the techniques used. He was also incredibly kind and made me feel at ease throughout the entire session.", location: "Google Maps" },
  { customer_name: "Jonny", customer_photo_url: null, content: "Omar is a great massage therapist. I had a 2 hour session at his place while I was travelling Istanbul and I did enjoy it a lot. A must have when you are there, especially after walking through a busy crowded street at Taksim.", location: "WhatClinic" },
  { customer_name: "Abdullah", customer_photo_url: null, content: "I had an amazing experience with Massage & Cupping Therapy! He is well professional and had excellent knowledge of the techniques used. He was also incredibly kind and made me feel at ease throughout the entire session.", location: "WhatClinic" },
  { customer_name: "Amine Drissi-Slimani", customer_photo_url: null, content: "I definitely recommend Omar for the wet cupping session therapy. What I appreciate about him is his great patience in performing his work and his willingness to share information about the therapy and good tips to follow after treatment.", location: "WhatClinic" },
  { customer_name: "Malik K", customer_photo_url: null, content: "Omar is excellent in his craft. I had a mix of deep tissue, reflexology, and trigger point massage. I highly recommend him to anyone in Istanbul looking for a massage.", location: "WhatClinic" },
  { customer_name: "Awas Ahmed", customer_photo_url: null, content: "Highly recommended! If you want a professional and skilled massage therapist, Omar is the man you should contact. Communication and agreement go smoothly. A very nice and genuine man who only wants the best for his customers.", location: "Google Maps" },
  { customer_name: "Kaiyun Luo", customer_photo_url: null, content: "Excellent and unforgettable experience. The therapist is friendly, helpful and professional. Will take the massage again next time I come here.", location: "Google Maps" },
  { customer_name: "Gurdeep Grewal", customer_photo_url: null, content: "I am so grateful to have received a wonderful massage during my time in Istanbul. I have a deep appreciation for Omar's holistic approach. He is amazingly skilled and intuitive at what he does. He found all the tension spots, and knew what my body needed.", location: "Google Maps" },
  { customer_name: "Barbara Manon", customer_photo_url: null, content: "Best massage in Turkey. I got a massage & dry cupping. Totally recommended; Omar really takes the time for you so you leave his studio relaxed and recovered.", location: "Google Maps" },
  { customer_name: "Shash Singh", customer_photo_url: null, content: "Excellent sports massage! I feel great after. Deep understanding of sports injuries which really helped a lot, and he also gave me physio exercises!", location: "Google Maps" },
  { customer_name: "Yusuf Malik", customer_photo_url: null, content: "I can't speak highly enough of Omar's skill, professionalism, knowledge and kindness. He was on time, explained everything when I asked, worked with my complaints to tailor the service to my needs. Someone who takes pride in his work and cares about the customer.", location: "Google Maps" },
  { customer_name: "sol Baek", customer_photo_url: null, content: "Friendly and skilled masseuse. I recommend this place if you are looking for a massage.", location: "Google Maps" },
  { customer_name: "Ahmed Mostafa", customer_photo_url: null, content: "Best coach ever!", location: "Google Maps" },
  { customer_name: "Joe Jennings", customer_photo_url: null, content: "GZ saved me from some terrible pain. My sciatic nerve in my hip was pinched and he gave me 2.5 hours of treatment \\u2014 the best massage I've ever had and a great dry and wet cupping session. He paid close attention to specific points of concern.", location: "Google Maps" },
  { customer_name: "Konstantin Sukhin", customer_photo_url: null, content: "I guess now I know what a quality massage has to feel like. Happy I found you!", location: "Google Maps" },
  { customer_name: "Nesreen Talat", customer_photo_url: null, content: "I really appreciate every single step taken and great effort you did to create your own lovely work. You are on your first steps to work what you love, enjoy and passionate about.", location: "Google Maps" },
  { customer_name: "Matthew J. Martinez", customer_photo_url: null, content: "I had a great massage with Omar. He has good massage technique and strong hands. I highly recommend a treatment with him.", location: "Google Maps" },
  { customer_name: "Moha Elsayed", customer_photo_url: null, content: "Best treatment ever! Highly recommended! Omar is very professional, polite and excellent. I was so relaxed after our treatment. It's totally different, how knowledgeable he is, makes you feel satisfied.", location: "Google Maps" },
  { customer_name: "Mohamed Gamal", customer_photo_url: null, content: "Great and professional service! Omar is not only a master of his work offering a variety of massage types, cupping therapy and stretching classes, but he was also a civil engineer and fitness trainer. So all is on a solid background of information and studying. Highly recommend!", location: "Google Maps" },
  { customer_name: "Mohamed Ahmed", customer_photo_url: null, content: "I had a problem in my left shoulder causing pain while moving it and my neck, but after the GZ package \\u2014 a mix of medical massage and cupping \\u2014 I felt better and this problem was addressed by this unique approach of healing mixed with relaxation.", location: "Google Maps" },
  { customer_name: "Ezra2002 Ezra", customer_photo_url: null, content: "A good massage is a combination of trust between the therapist and the client as well as high competence by the therapist. Omar meets both criteria. He is highly professional, competent and effective. He listens carefully and takes the client's needs into account.", location: "Google Maps" },
  { customer_name: "Ala' Abubaker", customer_photo_url: null, content: "Great deep tissue massage... Omar is the only person I know who can get rid of my tension headaches. Very grateful for having him!", location: "Google Maps" },
  { customer_name: "AK S", customer_photo_url: null, content: "Great experience! Omar was professional and explained the cupping procedure very thoroughly over the course of the treatment. Highly recommend him!", location: "Google Maps" },
  { customer_name: "Anthony Matsis", customer_photo_url: null, content: "I needed an urgent massage after my lower back flared up and called Omar. Had an extremely productive massage and cupping therapy at home. My girlfriend also tried his services and it was amazing.", location: "Google Maps" },
  { customer_name: "Ivan Utkin", customer_photo_url: null, content: "Great massage, Omar is friendly and very professional. If I had more time in Istanbul I wouldn't hesitate to come back a few times.", location: "Google Maps" },
  { customer_name: "Jordy Jahmal", customer_photo_url: null, content: "If you are looking for someone who is very well educated and knows what he's exactly doing then you should visit Omar! He takes his time to provide you the best service. 100% Recommended!", location: "Google Maps" },
  { customer_name: "Daniel Navarro", customer_photo_url: null, content: "Incredible massage during my trip to Istanbul. Extremely strong, very intuitive, and super friendly. I have severe shoulder pain and have had lots of massages, Omar is way up at the top. Would highly recommend!", location: "Google Maps" },
  { customer_name: "Dream Team Fitness TN", customer_photo_url: null, content: "Great service, thank you!", location: "Google Maps" },
  { customer_name: "Turner Palm", customer_photo_url: null, content: "Incredible! Omar is definitely a professional, he knows how to pinpoint your points of tension and release them.", location: "Google Maps" },
  { customer_name: "M I", customer_photo_url: null, content: "Best massage I've had in a long time. Knew what I needed and helped relieve my issues. Would recommend.", location: "Google Maps" },
  { customer_name: "modi abdul", customer_photo_url: null, content: "Omar is a professional massage therapist who is trained and loves his work. I get massages way more than the average person and I can tell you that I had one of my top massages from him. Highly recommend.", location: "Google Maps" },
  { customer_name: "Leysan Khakimova", customer_photo_url: null, content: "Omar is an extremely talented massage therapist, what a discovery! This without a doubt is by far the best massage I have ever had in my entire life. He helped me relax every single muscle in my body. You can tell he loves what he does.", location: "Google Maps" },
  { customer_name: "Shahin Gol", customer_photo_url: null, content: "Did my first cupping session. I was informed of all the benefits before and during the process. Omar is excellent and I highly recommend him!", location: "Google Maps" },
  { customer_name: "Christy Walshe", customer_photo_url: null, content: "Intuitive touch and kind soul! Great experience.", location: "Google Maps" },
  { customer_name: "Charbel Meaiky", customer_photo_url: null, content: "It was my first experience with cupping and it was wonderful. It also relieved my back pain. I advise everyone to experience this.", location: "Google Maps" },
  { customer_name: "Valentyna B.", customer_photo_url: null, content: "It was the best massage I ever had! Very professional and attentive. Will definitely do it again when I am back to Istanbul.", location: "Google Maps" },
  { customer_name: "Mahmoud Metwaly", customer_photo_url: null, content: "He is the best one in Istanbul to do massage and cupping. Definitely will contact him every time I am in Istanbul.", location: "Google Maps" },
  { customer_name: "Jo Tara", customer_photo_url: null, content: "It's not the usual hard massage. You can call it body work. It's very deep and healing. He knows exactly where your pain points are and where your body is blocked. He treats the body as a holistic system and understands Traditional Chinese medicine.", location: "Google Maps" },
  { customer_name: "ilkhom narboev", customer_photo_url: null, content: "I repeated my experience with him. There's no limit for his upgrades. A God-gifted person. Professional and sensitive master. He knows what to do and how to do it. A professional in its purest form.", location: "Google Maps" },
  { customer_name: "Zoryana German", customer_photo_url: null, content: "During my visit to Istanbul, I was very lucky to get an appointment with Omar. I was looking for Hijama for years. I am a massage therapist and heard about Hijama's benefits a lot. To my surprise it didn't hurt. Amazing experience!", location: "Google Maps" },
  { customer_name: "waheed masadeh", customer_photo_url: null, content: "Omar, your magic touch has made me feel a few inches taller after sorting out my knotty back. Thank you!", location: "Google Maps" },
  { customer_name: "Christian Parpard", customer_photo_url: null, content: "He was putting in so much effort. My girlfriend is diagnosed with MS and he made it possible for us to have a great second week in Istanbul! I can fully recommend his work! Reflexology, trigger point and lymphatic massage was on point!", location: "Google Maps" },
  { customer_name: "Maria Motkina", customer_photo_url: null, content: "Me and my husband had a massage and it was very good, highly recommended!", location: "Google Maps" },
  { customer_name: "Nikita Gerasimov", customer_photo_url: null, content: "Mix of different techniques, energized hands, attentiveness to every moment of the procedure, positive atmosphere and professionalism \\u2014 that's the key to an amazing massage provided here! Total relaxation, relief and surge of strength is guaranteed!", location: "Google Maps" },
  { customer_name: "\u015eEREF \u015eENT\u00dcRK", customer_photo_url: null, content: "He's an expert in this field.", location: "Google Maps" },
  { customer_name: "Yasemin Ozmert", customer_photo_url: null, content: "Very professional, really knows what he's doing. It was a great experience and I felt amazing after. Thank you very much, I appreciated your work.", location: "Google Maps" },
  { customer_name: "Jiaman Lian", customer_photo_url: null, content: "We had a wonderful massage and cupping with Omar. He is professional, patient and very kind. It was our best massage in a long time! Would highly recommend it to everyone!", location: "Google Maps" },
  { customer_name: "Vladim Vladimovich", customer_photo_url: null, content: "Very good massage. Sometimes you even fall asleep, it's so relaxing. But at the same time it is strong and relieves all tension in the muscles after sports. I recommend!", location: "Google Maps" },
  { customer_name: "Farah ONEISSI", customer_photo_url: null, content: "Very professional and respectful. Will definitely do another massage when I come back to Istanbul.", location: "Google Maps" },
  { customer_name: "Andrey Glushko", customer_photo_url: null, content: "Was lucky to meet this professional in Istanbul! Very strong hands and amazing treatment!", location: "Google Maps" },
  { customer_name: "Mehmona Ahmad", customer_photo_url: null, content: "My father and husband received treatment at Omar's which included cupping and massage. We have only good things to say. He is professional in his work and passionate about giving the best possible performance.", location: "Google Maps" },
  { customer_name: "Jasmine Li", customer_photo_url: null, content: "Best massage here! Highly recommended! Omar is very patient, professional and excellent. The massage effectively helped relieve my back pain and muscle pains, and I relaxed a lot. Impressed with your knowledge and experience.", location: "Google Maps" },
  { customer_name: "Maria Grigoreva", customer_photo_url: null, content: "Everything went great! Felt really relaxed after the massage. Thank you!", location: "Google Maps" },
  { customer_name: "Dream Doula", customer_photo_url: null, content: "He's super professional and detailed. I felt great with him. He has such hands, it's almost a spiritual experience.", location: "Google Maps" },
  { customer_name: "Jessica P", customer_photo_url: null, content: "Without a doubt the best and most attentive massage I've ever had \\u2014 and I've had a lot! Omar is clearly extremely knowledgeable and is able to quickly figure out what your specific body needs, treating every person individually rather than doing the same massage for everyone.", location: "Google Maps" },
  { customer_name: "Narelle Gorman", customer_photo_url: null, content: "Wow wow wow! From the moment we began communication Omar was more than 5 stars. Professional, courteous, exemplary service. Combined with what I would describe as bodywork vs massage. Omar is intuitive, feels your body and you can tell he is dedicated to your experience.", location: "Google Maps" },
  { customer_name: "Reham Ali", customer_photo_url: null, content: "Wow! Absolutely fantastic! You've made a client for life. I feel completely different, healed and satisfied. You are a professional therapist with a solid background of information. I highly recommend Omar.", location: "Google Maps" },
  { customer_name: "Lance Jubel", customer_photo_url: null, content: "Wow, wow, wow! I am practically speechless. Omar is one of the more knowledgeable masseuses I've had and the price was reasonable. I had an hour pressure point massage with 30 minute cupping. He could tell where I was experiencing pain and tightness.", location: "Google Maps" },
  { customer_name: "Roy Levy", customer_photo_url: null, content: "Omar was unbelievable in every way as a therapist. So skilled, professional and kind soul. Asking the right questions and making sure the atmosphere is comfortable. He was able to find all of my back and shoulders weak spots and treat them so well.", location: "Google Maps" },
  { customer_name: "\u0421\u0442\u0435\u043f\u0430\u043d \u041a\u043e\u0437\u043b\u043e\u0432", customer_photo_url: null, content: "You've found a pretty comfortable place and a professional guy who is able to relax your body gently! Can recommend Omar to help you with your massage requests!", location: "Google Maps" },
  { customer_name: "Olessja Bessmeltseva", customer_photo_url: null, content: "Excellent master and the best experience ever. Would advise to everyone who wants to leave beyond the routine for a while and feel returned to a better life.", location: "Google Maps" },
  { customer_name: "qi xiong", customer_photo_url: null, content: "Great massage, very relaxed and refreshed.", location: "Google Maps" },
  { customer_name: "llDHOMll", customer_photo_url: null, content: "Professional massage, I recommend it. Thank you!", location: "Google Maps" },
  { customer_name: "Jason Madore", customer_photo_url: null, content: "Professional, caring, and technically excellent massage therapist. The best.", location: "Google Maps" },
  { customer_name: "Zhou jeffery", customer_photo_url: null, content: "Really professional and helpful treatment. The massage made me feel relaxed and reduced my shoulder pain. Many thanks for this experience that Gz'Zone provided.", location: "Google Maps" },
  { customer_name: "Ines Brendel", customer_photo_url: null, content: "Recommended for anyone looking for relaxation and a good massage! One of the best massages I have ever had. Omar is sensitive, loving and caring, he responds exactly to your needs and knows what he is doing! I felt very comfortable and will definitely come back. Thank you!", location: "Google Maps" },
  { customer_name: "Ching N", customer_photo_url: null, content: "What impressed me most was not only his knowledge and technique but also the genuine care he shows. After reading so many outstanding reviews, I had high expectations, and Omar exceeded every one of them. By the end of the session I felt like my entire body had been reset.", location: "WhatClinic" },
  { customer_name: "Leysan", customer_photo_url: null, content: "Without a doubt this was one of the best massages I have ever experienced. Omar is an incredibly talented massage therapist and a true professional. His knowledge, skill, and attention to detail are exceptional. On top of that, he is kind, respectful, and makes you feel completely comfortable.", location: "WhatClinic" },
  { customer_name: "Mido", customer_photo_url: null, content: "Omar was an excellent and attentive therapist. The session was carried out in a very clean, organised, and professional manner. Omar was respectful, skilled, and attentive to our needs. We were very happy with the service.", location: "WhatClinic" },
  { customer_name: "Nikita", customer_photo_url: null, content: "A perfect combination of different techniques, attentive care, and a professional approach made this experience truly outstanding. An incredible atmosphere, deep relaxation, relief for the body, and a renewed feeling of strength \\u2014 Highly recommended!", location: "WhatClinic" },
  { customer_name: "Qasi H", customer_photo_url: null, content: "I had an absolutely amazing massage and cupping session. The combination of the massage and dry cupping therapy was honestly magical. I came in with serious back pain and tension, and by the end I felt a huge difference. My back pain was almost completely gone, my body felt lighter, and I left feeling deeply relaxed and refreshed.", location: "WhatClinic" },
  { customer_name: "Ali R", customer_photo_url: null, content: "Omar is one of the best professionals I've had the pleasure to work with. He's incredibly knowledgeable! His work is methodical and effective. He has my best recommendation, and I look forward to each session.", location: "WhatClinic" },
  { customer_name: "Iaroslav V", customer_photo_url: null, content: "This was one of those rare cases where the quality is evident through the results rather than words. Even after just one session, a large part of the tension was relieved, my back felt noticeably lighter, and my overall condition improved considerably.", location: "WhatClinic" },
  { customer_name: "Anastasiia V", customer_photo_url: null, content: "The perfect massage in Porto! He truly listened and focused specifically on the areas I mentioned. As soon as I got off the massage table, I immediately felt lightness in my neck and could move my head freely without discomfort. I finally found someone who genuinely helps.", location: "WhatClinic" },
  { customer_name: "Elena Andrade P", customer_photo_url: null, content: "Super professional with a huge amount of experience. His background in fitness means he not only uses massage techniques but also knows exactly how each muscle functions. And the bonus is that he goes to your house! My body feels so relaxed, and my legs are light as if they got rid of a huge load.", location: "WhatClinic" },
  { customer_name: "Renan P", customer_photo_url: null, content: "I had a really great massage experience. Omar was extremely calm and professional, which immediately made me feel at ease. His technique was precise and relaxing, striking the perfect balance between pressure and comfort. He also took the time to give me useful advice on training and posture.", location: "WhatClinic" },
  { customer_name: "Olessya", customer_photo_url: null, content: "I had an exceptional and pleasant experience of cupping therapy with Omar. Totally recommend his services. I felt a surge of strength and energy after the first session instantly. Definitely want to repeat it!", location: "WhatClinic" },
  { customer_name: "Mohamed Rabeh", customer_photo_url: null, content: "I had a wonderful experience with Omar. He is an extremely professional massage therapist, and you can immediately feel that everything he does is based on real scientific knowledge, experience, and a deep understanding of the body.", location: "Google Maps" },
  { customer_name: "Eric Spade", customer_photo_url: null, content: "Omar is an excellent massage therapist. He travels to you with his massage table. He listens to you and provides a massage tailored to your needs. I had difficulty finding a massage therapist in Porto who does deep tissue massage. But Omar correctly does it and knows acupressure points which relieve tension for the whole body.", location: "Google Maps" },
  { customer_name: "Abbie Molenaar", customer_photo_url: null, content: "Omar was extremely knowledgeable and professional throughout the session. He took the time to assess my condition carefully and explained everything clearly. He also recommended specific stretches and exercises that I can do to improve my mobility and strengthen weaker muscle groups.", location: "Google Maps" },
  { customer_name: "Cara Frank", customer_photo_url: null, content: "Omar is an amazing massage therapist. He comes to the house. He's totally professional: prepared with disposable sheets and masked. He is very respectful and made me feel completely comfortable. Highly recommend!", location: "Google Maps" },
  { customer_name: "Moustafa ME", customer_photo_url: null, content: "Omar is friendly, knowledgeable and teaches you the benefits of each treatment and service available. Place is very clean with positive vibes. If you're looking for massage, cupping, or wet cupping he is the man!", location: "Google Maps" },
  { customer_name: "Caroline Pady", customer_photo_url: null, content: "Omar is a really fantastic masseur! If you're in need of a firm massage don't hesitate to book. I had a few massages and some cupping with him when I was on holiday, as I was experiencing tension headaches and a lot of discomfort in my neck.", location: "Google Maps" },
  { customer_name: "Kendall Williams", customer_photo_url: null, content: "Top tier deep tissue massage. This guy really is skilled at the craft of a deep tissue massage! Also he is kind and professional! Definitely recommend if you're looking for a really good deep tissue massage!", location: "Google Maps" },
  { customer_name: "Kate Akaa", customer_photo_url: null, content: "I've now had 2 massage sessions with Omar and highly recommend his services!", location: "Google Maps" },
  { customer_name: "Anton Lebodkin", customer_photo_url: null, content: "One of the best medical massage experiences. Professional therapist. Highly recommended.", location: "Google Maps" },
  { customer_name: "Jia-Yang Chen", customer_photo_url: null, content: "As an Asian, I've experienced many different types of massage in various countries. Although Omar's services aren't presented as a medical approach, the healing effect was very similar to the tuina and cupping treatments I've received from professionals.", location: "Google Maps" },
  { customer_name: "Hind Lemfaddel", customer_photo_url: null, content: "Magic hands and a true professional!! Highly recommended.", location: "Google Maps" },
  { customer_name: "Irina Pavlenko", customer_photo_url: null, content: "This was truly an extraordinary experience \\u2014 a complete reset for both body and mind. Omar is an exceptional massage therapist and a true professional. He is skilled, attentive, and clearly passionate about his work.", location: "Google Maps" },
  { customer_name: "Ossama", customer_photo_url: null, content: "Omar is highly skilled and incredibly knowledgeable. His deep tissue work and cupping finally relieved my stubborn cervical pain. I highly recommend him.", location: "Google Maps" },
  { customer_name: "JW", customer_photo_url: null, content: "I know Omar from the time he was in Istanbul, and I have always appreciated his polite and professional treatment, which was very effective in relieving my chronic backache and stiff shoulders.", location: "Google Maps" },
  { customer_name: "Lena Erikhova", customer_photo_url: null, content: "I was very pleased with the massage! Omar is a true professional. Very attentive, polite, and punctual. From the very first moment, you can tell he's an expert in his field and genuinely cares about his clients' comfort.", location: "Google Maps" },
  { customer_name: "\u041a\u0440\u0438\u0441\u0442\u0438\u043d\u0430 \u042e\u0434\u0438\u043d\u0430", customer_photo_url: null, content: "I had a vacuum massage and was very pleased. The procedure was comfortable, and the effects were noticeable after just one session: relaxation, lightness, and a pleasant sensation throughout my body.", location: "Google Maps" },
  { customer_name: "\u0412\u0438\u043a\u0442\u043e\u0440\u0438\u044f \u041d-\u041a", customer_photo_url: null, content: "I saw Omar in June 2025. After three sessions, my back and lower back pain was gone. He's a very professional and polite young man. I highly recommend him.", location: "Google Maps" },
  { customer_name: "\u0418\u0440\u0438\u043d\u0430 \u0417\u0430\u0439\u0446\u0435\u0432\u0430", customer_photo_url: null, content: "I really liked everything. He is a professional in his field. Thank you, I recommend him!", location: "Google Maps" },
];

export const CATEGORY_LABELS: Record<string, string> = {
  "massage-therapy": "Massage Therapy",
  "medical-aesthetics": "Medical Aesthetics",
  "holistic-health": "Holistic Health",
};