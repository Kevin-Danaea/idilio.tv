import { Category } from '../../domain/entities/Category';
import { Show } from '../../domain/entities/Show';
import { Episode } from '../../domain/entities/Episode';

const SHOWS: Show[] = [
  {
    id: '1',
    title: "The CEO's Secret Wife",
    description: "After a contract marriage, a humble girl discovers her husband is the richest man in the city. Secrets unravel in this high-stakes romance.",
    posterUrl: "https://picsum.photos/400/600?random=1",
    bannerUrl: "https://picsum.photos/800/450?random=1",
    releaseYear: 2023,
    tags: ["Romance", "Drama", "CEO"],
    rating: 4.8,
    totalEpisodes: 45,
    status: 'Completed'
  },
  {
    id: '2',
    title: "Reborn as the Villainess",
    description: "She woke up in the body of the antagonist. Now she must change her fate to survive the royal court's deadly games.",
    posterUrl: "https://picsum.photos/400/600?random=2",
    bannerUrl: "https://picsum.photos/800/450?random=2",
    releaseYear: 2024,
    tags: ["Fantasy", "Revenge", "Historical"],
    rating: 4.9,
    totalEpisodes: 60,
    status: 'Ongoing'
  },
  {
    id: '3',
    title: "Love in the Apocalypse",
    description: "When zombies rise, trust falls. A survival story about finding love when the world is ending.",
    posterUrl: "https://picsum.photos/400/600?random=3",
    bannerUrl: "https://picsum.photos/800/450?random=3",
    releaseYear: 2023,
    tags: ["Action", "Thriller", "Romance"],
    rating: 4.5,
    totalEpisodes: 24,
    status: 'Completed'
  },
  {
    id: '4',
    title: "Double Life Idol",
    description: "By day, a shy student. By night, a masked internet singing sensation. What happens when her crush finds out?",
    posterUrl: "https://picsum.photos/400/600?random=4",
    bannerUrl: "https://picsum.photos/800/450?random=4",
    releaseYear: 2024,
    tags: ["Musical", "Youth", "Comedy"],
    rating: 4.7,
    totalEpisodes: 30,
    status: 'Ongoing'
  },
  {
    id: '5',
    title: "Betrayal at High Noon",
    description: "A western thriller with a twist. Who shot the sheriff? It wasn't the deputy.",
    posterUrl: "https://picsum.photos/400/600?random=5",
    bannerUrl: "https://picsum.photos/800/450?random=5",
    releaseYear: 2022,
    tags: ["Western", "Mystery"],
    rating: 4.2,
    totalEpisodes: 12,
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

export function generateMockEpisodes(showId: string, count: number): Episode[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: `ep_${showId}_${i}`,
    showId: showId,
    title: `Episode ${i + 1}`,
    durationSeconds: 120 + Math.floor(Math.random() * 180), // 2-5 mins
    episodeNumber: i + 1,
    thumbnailUrl: `https://picsum.photos/300/200?random=${showId}${i}`,
    isFree: i < 5 // First 5 eps free
  }));
}

export const APP_NAME = "Idilio.tv";

