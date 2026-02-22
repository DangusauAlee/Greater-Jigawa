export interface Member {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
  email?: string;
  business_name?: string;
  business_type?: string;
  market_area?: string;
  location?: string;
  bio?: string;
  role?: string;
  user_status?: 'verified' | 'member';
  created_at?: string;
  updated_at?: string;
  // optional optimistic flag
  _optimisticStatus?: string;
}

export interface Post {
  id: string;
  author_id: string;
  author_name: string;
  author_avatar: string;
  author_first_name?: string;
  author_last_name?: string;
  author_verified: boolean;
  content: string;
  media_urls: string[];
  media_type: 'text' | 'image' | 'video' | 'gallery';
  location: string | null;
  tags: string[];
  likes_count: number;
  comments_count: number;
  shares_count: number;
  created_at: string;
  updated_at: string;
  has_liked: boolean;
  has_shared: boolean;
}

export interface Comment {
  id: string;
  author_id: string;
  author_name: string;
  author_avatar: string;
  author_verified: boolean;
  content: string;
  likes_count: number;
  created_at: string;
  updated_at: string;
  has_liked: boolean;
}

export interface MarketplaceListing {
  id: string;
  seller_id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: 'new' | 'used' | 'refurbished';
  location: string;
  images: string[];
  views_count: number;
  is_sold: boolean;
  created_at: string;
  seller_name: string;
  seller_avatar: string;
  seller_verified: boolean;
  is_favorited: boolean;
  favorite_count: number;
}

export interface MarketplaceFavorite {
  id: string;
  user_id: string;
  listing_id: string;
  created_at: string;
}

export interface MarketplaceReview {
  id: string;
  listing_id: string;
  reviewer_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  reviewer_name?: string;
  reviewer_avatar?: string;
}

export interface Job {
  id: string;
  company_id: string;
  title: string;
  description: string;
  salary: string;
  job_type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'remote';
  location: string;
  contact_info: Record<string, any>;
  experience_level?: string;
  category?: string;
  is_verified?: boolean;
  views_count: number;
  created_at: string;
  company_name: string;
  company_avatar: string;
  company_verified?: boolean;
  contact_email?: string;
  contact_phone?: string;
}

export interface Event {
  id: string;
  organizer_id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  image_url: string;
  rsvp_count: number;
  created_at: string;
  organizer_name: string;
  organizer_avatar: string;
  organizer_verified?: boolean;
  user_rsvp_status: string | null;
}

export interface RSVPResult {
  action: string;
  rsvp_status: string | null;
  rsvp_count: number;
}

export interface JobFilters {
  jobType?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface EventFilters {
  upcomingOnly?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
}


export interface Business {
  id: string;
  owner_id: string;
  name: string;
  description: string;
  business_type: 'products' | 'services';
  category: string;
  location_axis: string;
  address: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  logo_url: string | null;
  banner_url: string | null;
  is_registered: boolean;
  verification_status: 'pending' | 'approved' | 'rejected';
  average_rating: number;
  review_count: number;
  reviews?: Review[];
  created_at: string;
  updated_at: string;
  owner_name?: string;
  owner_avatar?: string;
  owner_verified?: boolean;
}

export interface Review {
  id: string;
  user_id: string;
  user_name: string;
  user_avatar: string | null;
  user_verified?: boolean;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface BusinessFilters {
  business_type?: 'products' | 'services';
  category?: string;
  location_axis?: string;
  search?: string;
  min_rating?: number;
  limit?: number;
  offset?: number;
}

export interface UserVerificationStatus {
  user_status: 'verified' | 'member';
  email: string;
  can_create_business: boolean;
}

export const LOCATION_AXIS = [
  'Central / Old City',
  'Sabon Gari / Kantin Kwari',
  'Farm Center / Beirut',
  'France Road',
  'Zoo Road',
  'Zaria Road',
  'Dawanau',
  'Sharada / Challawa',
  'Hotoro',
  'Gyadi-Gyadi / Tarauni',
  'Jigawa Road',
  'Mariri / Sheka',
  'Bompai',
  'Transport (Kano Line / Sabon Gari Park)',
  'Others'
] as const;

// Profile related
export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  avatar_url?: string;
  header_image_url?: string;
  business_name?: string;
  business_type?: string;
  market_area?: string;
  location?: string;
  bio?: string;
  phone?: string;
  address?: string;
  website?: string;
  user_status: 'member' | 'verified';
  role?: string;
  created_at: string;
  updated_at?: string;
  last_seen?: string;
}

export interface ProfileStats {
  posts_count: number;
  connections_count: number;
}

export interface ProfileRelationship {
  is_owner: boolean;
  is_connected: boolean;
  connection_status?: 'pending' | 'connected' | null;
  is_sender?: boolean;
}

export interface ProfileData {
  profile: Profile;
  stats: ProfileStats;
  relationship: ProfileRelationship;
}

// You can add other shared types here as needed