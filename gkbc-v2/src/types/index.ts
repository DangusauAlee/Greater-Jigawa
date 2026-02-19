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

// You can add other shared types here as needed