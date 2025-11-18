import { ISupabaseDataSource } from '../remote/ISupabaseDataSource';
import { Category } from '../../../domain/entities/Category';
import { Show } from '../../../domain/entities/Show';
import { Episode } from '../../../domain/entities/Episode';
import { MOCK_CATEGORIES, generateMockEpisodes } from '../../../shared/constants/mockData';

/**
 * Implementación mock de la fuente de datos
 * Usada para desarrollo y testing
 * 
 * Principio OCP: Puede extenderse sin modificar código existente
 * Principio LSP: Puede sustituir a SupabaseDataSource
 */
export class MockDataSource implements ISupabaseDataSource {
  async getCategories(): Promise<Category[]> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 800));
    return MOCK_CATEGORIES;
  }

  async getShowById(id: string): Promise<Show | null> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    for (const category of MOCK_CATEGORIES) {
      const show = category.shows.find(s => s.id === id);
      if (show) {
        return show;
      }
    }
    
    return null;
  }

  async getEpisodesByShowId(showId: string): Promise<Episode[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const show = await this.getShowById(showId);
    if (!show) {
      return [];
    }
    
    return generateMockEpisodes(showId, show.totalEpisodes);
  }
}

