import { Show } from '../../domain/entities/Show';
import { Episode } from '../../domain/entities/Episode';

/**
 * Mappers para convertir datos de Supabase al dominio
 * 
 * Principio SRP: Responsabilidad única de mapear datos
 */

export function mapSupabaseShowToDomain(data: any): Show {
  if (!data) {
    throw new Error('Invalid show data');
  }

  return {
    id: data.id,
    title: data.title,
    description: data.description || '',
    posterUrl: data.poster_url || data.posterUrl,
    bannerUrl: data.banner_url || data.bannerUrl,
    releaseYear: data.release_year || data.releaseYear,
    tags: Array.isArray(data.tags) ? data.tags : [],
    rating: Number(data.rating) || 0,
    totalEpisodes: data.total_episodes || data.totalEpisodes || 0,
    status: data.status === 'Completed' || data.status === 'Ongoing' ? data.status : 'Ongoing',
  };
}

export function mapSupabaseEpisodeToDomain(data: any): Episode {
  if (!data) {
    throw new Error('Invalid episode data');
  }

  return {
    id: data.id,
    showId: data.show_id || data.showId,
    title: data.title,
    durationSeconds: data.duration_seconds || data.durationSeconds || 0,
    episodeNumber: data.episode_number || data.episodeNumber || 0,
    thumbnailUrl: data.thumbnail_url || data.thumbnailUrl,
    videoUrl: data.video_url || data.videoUrl,
    isFree: data.is_free !== undefined ? Boolean(data.is_free) : (data.isFree !== undefined ? Boolean(data.isFree) : false),
  };
}

