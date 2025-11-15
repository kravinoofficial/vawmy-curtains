export interface Collection {
  id: string;
  name: string;
  description: string;
  cover_image: string;
  images: string[];
  video_url?: string;
  display_order?: number;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  collection_id: string;
  name: string;
  images: string[];
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface ContactInfo {
  id: number;
  email: string;
  phone: string;
  address: string;
  hours: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: string;
  published_date: string;
  created_at: string;
  updated_at: string;
}

export interface SocialMedia {
  id: number;
  platform: string;
  url: string;
  icon_name: string;
  is_visible: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}
