import { Category } from '../../../domain/entities/Category';
import { Show } from '../../../domain/entities/Show';
import { Episode } from '../../../domain/entities/Episode';

/**
 * Interfaz para la fuente de datos remota (Supabase)
 * 
 * Principio ISP: Interfaz específica para operaciones remotas
 */
export interface ISupabaseDataSource {
  getCategories(): Promise<Category[]>;
  getShowById(id: string): Promise<Show | null>;
  getEpisodesByShowId(showId: string): Promise<Episode[]>;
}

