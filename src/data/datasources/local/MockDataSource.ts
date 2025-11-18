import { Category } from '../../../domain/entities/Category';
import { Episode } from '../../../domain/entities/Episode';
import { Show } from '../../../domain/entities/Show';
import { MOCK_CATEGORIES, generateMockEpisodes } from '../../../shared/constants/mockData';
import { ISupabaseDataSource } from '../remote/ISupabaseDataSource';

/**
 * Implementación mock de la fuente de datos
 * Usada para desarrollo y testing
 * 
 * Principio OCP: Puede extenderse sin modificar código existente
 * Principio LSP: Puede sustituir a SupabaseDataSource
 */
export class MockDataSource implements ISupabaseDataSource {
  async getCategories(): Promise<Category[]> {
    console.log('📦 Using MOCK data for categories');
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 800));
    return MOCK_CATEGORIES;
  }

  async getShowById(id: string): Promise<Show | null> {
    console.log(`📦 Using MOCK data for show ${id}`);
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
    console.log(`📦 Using MOCK data for episodes of show ${showId}`);
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const show = await this.getShowById(showId);
    if (!show) {
      return [];
    }
    
    return generateMockEpisodes(showId, show.totalEpisodes);
  }
}

