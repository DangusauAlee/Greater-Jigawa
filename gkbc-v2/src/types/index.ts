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

// You can add other shared types here as needed