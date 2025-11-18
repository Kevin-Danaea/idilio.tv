export interface Episode {
  id: string;
  show_id: string;
  title: string;
  duration_seconds: number;
  episode_number: number;
  thumbnail_url: string;
  video_url?: string;
  is_free: boolean;
}

export interface Show {
  id: string;
  title: string;
  description: string;
  poster_url: string;
  banner_url: string;
  release_year: number;
  tags: string[];
  rating: number;
  total_episodes: number;
  status: 'Completed' | 'Ongoing';
}

export interface Category {
  id: string;
  title: string;
  shows: Show[];
}

export type NavigationTab = 'home' | 'discover' | 'profile';

