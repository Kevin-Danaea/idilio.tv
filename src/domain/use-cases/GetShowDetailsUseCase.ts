import { Show } from '../entities/Show';
import { Episode } from '../entities/Episode';
import { ICatalogRepository } from '../repositories/ICatalogRepository';

/**
 * Resultado del caso de uso GetShowDetails
 */
export interface ShowDetailsResult {
  show: Show;
  episodes: Episode[];
}

/**
 * Caso de uso: Obtener detalles de un show
 * 
 * Principio SRP: Responsabilidad única de obtener detalles de un show
 * Principio DIP: Depende de la abstracción ICatalogRepository
 */
export class GetShowDetailsUseCase {
  constructor(private readonly catalogRepository: ICatalogRepository) {}

  /**
   * Ejecuta el caso de uso para obtener los detalles de un show
   */
  async execute(showId: string): Promise<ShowDetailsResult> {
    if (!showId) {
      throw new Error('Show ID is required');
    }

    try {
      const [show, episodes] = await Promise.all([
        this.catalogRepository.getShowById(showId),
        this.catalogRepository.getEpisodesByShowId(showId),
      ]);

      if (!show) {
        throw new Error('Show not found');
      }

      return { show, episodes };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to fetch show details');
    }
  }
}

