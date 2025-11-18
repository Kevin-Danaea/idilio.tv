import { Show } from '../../domain/entities/Show';
import { Episode } from '../../domain/entities/Episode';

/**
 * Mappers para convertir datos de Supabase al dominio
 * 
 * Principio SRP: Responsabilidad única de mapear datos
 */

export function mapSupabaseShowToDomain(data: any): Show {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    posterUrl: data.poster_url || data.posterUrl,
    bannerUrl: data.banner_url || data.bannerUrl,
    releaseYear: data.release_year || data.releaseYear,
    tags: data.tags || [],
    rating: data.rating,
    totalEpisodes: data.total_episodes || data.totalEpisodes,
    status: data.status,
  };
}

export function mapSupabaseEpisodeToDomain(data: any): Episode {
  return {
    id: data.id,
    showId: data.show_id || data.showId,
    title: data.title,
    durationSeconds: data.duration_seconds || data.durationSeconds,
    episodeNumber: data.episode_number || data.episodeNumber,
    thumbnailUrl: data.thumbnail_url || data.thumbnailUrl,
    videoUrl: data.video_url || data.videoUrl,
    isFree: data.is_free !== undefined ? data.is_free : data.isFree,
  };
}

