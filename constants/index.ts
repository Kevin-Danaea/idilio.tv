import { Category, Show, Episode } from '../types';

// Placeholders for UI
export const APP_NAME = "Idilio.tv";

// High-quality mock data to simulate Supabase response
// In a real app, this would come from the database

const SHOWS: Show[] = [
  {
    id: '1',
    title: "The CEO's Secret Wife",
    description: "After a contract marriage, a humble girl discovers her husband is the richest man in the city. Secrets unravel in this high-stakes romance.",
    poster_url: "https://picsum.photos/400/600?random=1",
    banner_url: "https://picsum.photos/800/450?random=1",
    release_year: 2023,
    tags: ["Romance", "Drama", "CEO"],
    rating: 4.8,
    total_episodes: 45,
    status: 'Completed'
  },
  {
    id: '2',
    title: "Reborn as the Villainess",
    description: "She woke up in the body of the antagonist. Now she must change her fate to survive the royal court's deadly games.",
    poster_url: "https://picsum.photos/400/600?random=2",
    banner_url: "https://picsum.photos/800/450?random=2",
    release_year: 2024,
    tags: ["Fantasy", "Revenge", "Historical"],
    rating: 4.9,
    total_episodes: 60,
    status: 'Ongoing'
  },
  {
    id: '3',
    title: "Love in the Apocalypse",
    description: "When zombies rise, trust falls. A survival story about finding love when the world is ending.",
    poster_url: "https://picsum.photos/400/600?random=3",
    banner_url: "https://picsum.photos/800/450?random=3",
    release_year: 2023,
    tags: ["Action", "Thriller", "Romance"],
    rating: 4.5,
    total_episodes: 24,
    status: 'Completed'
  },
  {
    id: '4',
    title: "Double Life Idol",
    description: "By day, a shy student. By night, a masked internet singing sensation. What happens when her crush finds out?",
    poster_url: "https://picsum.photos/400/600?random=4",
    banner_url: "https://picsum.photos/800/450?random=4",
    release_year: 2024,
    tags: ["Musical", "Youth", "Comedy"],
    rating: 4.7,
    total_episodes: 30,
    status: 'Ongoing'
  },
  {
    id: '5',
    title: "Betrayal at High Noon",
    description: "A western thriller with a twist. Who shot the sheriff? It wasn't the deputy.",
    poster_url: "https://picsum.photos/400/600?random=5",
    banner_url: "https://picsum.photos/800/450?random=5",
    release_year: 2022,
    tags: ["Western", "Mystery"],
    rating: 4.2,
    total_episodes: 12,
    status: 'Completed'
  }
];

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'cat_trending',
    title: "Trending Now 🔥",
    shows: [SHOWS[0], SHOWS[1], SHOWS[3]]
  },
  {
    id: 'cat_new',
    title: "New Releases 🆕",
    shows: [SHOWS[1], SHOWS[3], SHOWS[2]]
  },
  {
    id: 'cat_romance',
    title: "Romantic Getaways ❤️",
    shows: [SHOWS[0], SHOWS[2], SHOWS[3], SHOWS[1]]
  },
  {
    id: 'cat_binge',
    title: "Binge-Worthy Dramas 🍿",
    shows: [SHOWS[4], SHOWS[2], SHOWS[0]]
  }
];

export const generateMockEpisodes = (showId: string, count: number): Episode[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `ep_${showId}_${i}`,
    show_id: showId,
    title: `Episode ${i + 1}`,
    duration_seconds: 120 + Math.floor(Math.random() * 180), // 2-5 mins
    episode_number: i + 1,
    thumbnail_url: `https://picsum.photos/300/200?random=${showId}${i}`,
    is_free: i < 5 // First 5 eps free
  }));
};

