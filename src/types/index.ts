export interface Treatment {
  id: string;
  name: string;
  slug: string;
  category: "massage-therapy" | "medical-aesthetics" | "holistic-health";
  short_description: string;
  full_description: string;
  ideal_for: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Duration {
  id: string;
  treatment_id: string;
  minutes: number;
  price: number;
  sort_order?: number;
  created_at?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Review {
  id: string;
  customer_name: string;
  content: string;
  rating: number;
  platform: string;
  external_url: string | null;
  sort_order?: number;
  created_at?: string;
}

export interface PlatformRating {
  id: string;
  platform: string;
  rating: number;
  review_count: number;
  profile_url: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  customer_photo_url: string | null;
  content: string;
  location: string | null;
  sort_order?: number;
  created_at?: string;
}

export interface GalleryImage {
  id: string;
  public_url: string;
  alt_text: string | null;
  title: string | null;
  sort_order?: number;
  created_at?: string;
}

export interface SiteContent {
  id: string;
  section_key: string;
  content: Record<string, unknown>;
  updated_at?: string;
}
