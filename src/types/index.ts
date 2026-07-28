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

export interface Certification {
  id: string;
  title: string;
  issuer: string | null;
  issue_year: string | null;
  public_url: string;
  description: string | null;
  sort_order?: number;
  created_at?: string;
}

export interface SiteContent {
  id: string;
  section_key: string;
  content: Record<string, unknown>;
  updated_at?: string;
}

export interface HeroContent {
  title?: string;
  subtitle?: string;
  description?: string;
  cta_text?: string;
  explore_text?: string;
  location_text?: string;
  dialog_title?: string;
  dialog_description?: string;
  dialog_link?: string;
}

export interface TrustBarContent {
  items?: { label: string }[];
}

export interface BenefitItem {
  title: string;
  description: string;
}

export interface WhyMobileMassageContent {
  heading?: string;
  description?: string;
  benefits?: BenefitItem[];
}

export interface HowItWorksContent {
  heading?: string;
  steps?: BenefitItem[];
}

export interface KeyBenefitsContent {
  heading?: string;
  items?: { title: string; description: string }[];
}

export interface WhatToExpectContent {
  heading?: string;
  items?: { title: string; description: string }[];
}

export interface AboutSectionContent {
  heading?: string;
  subheading?: string;
  paragraphs?: string[];
  trustHeading?: string;
  trustPoints?: { title: string; description: string }[];
  certLabel?: string;
  certHeading?: string;
  certText?: string;
  imageAlt?: string;
}

export interface ReputationSectionContent {
  heading?: string;
  subheading?: string;
  reviewLabel?: string;
}

export interface FAQSectionContent {
  heading?: string;
}

export interface FooterContent {
  description?: string;
  quickLinksHeading?: string;
  quickLinks?: { label: string; href: string }[];
  contactHeading?: string;
  phone?: string;
  phoneHref?: string;
  location?: string;
  instagramHandle?: string;
  instagramUrl?: string;
  copyright?: string;
}

export interface FinalCTAContent {
  heading?: string;
  description?: string;
  button_text?: string;
}

export interface CertificationsSectionContent {
  label?: string;
  heading?: string;
  subheading?: string;
  description?: string;
  image_alt?: string;
}

export interface HoursSectionContent {
  heading?: string;
  subtitle?: string;
  days?: { day: string; hours: string }[];
}

export interface ServiceAreasSectionContent {
  heading?: string;
  description?: string;
  button_text?: string;
}

export interface GallerySectionContent {
  heading?: string;
}

export interface LegalPageContent {
  body_html?: string;
}

export interface ConversionEvent {
  id: string;
  event_name: string;
  treatment: string | null;
  duration: string | null;
  source_component: string | null;
  path: string | null;
  user_agent: string | null;
  referrer: string | null;
  created_at?: string;
}

