import { Category } from '../entities/Category';
import { Show } from '../entities/Show';
import { Episode } from '../entities/Episode';

/**
 * Interfaz del repositorio de catálogo
 * Define el contrato para obtener datos de catálogo
 * 
 * Principio ISP: Interfaz específica para operaciones de catálogo
 * Principio DIP: La capa de dominio depende de esta abstracción
 */
export interface ICatalogRepository {
  /**
   * Obtiene todas las categorías con sus shows
   */
  getCategories(): Promise<Category[]>;

  /**
   * Obtiene los detalles de un show por su ID
   */
  getShowById(id: string): Promise<Show | null>;

  /**
   * Obtiene los episodios de un show
   */
  getEpisodesByShowId(showId: string): Promise<Episode[]>;
}

