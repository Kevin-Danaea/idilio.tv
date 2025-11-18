import { ICatalogRepository } from '../../domain/repositories/ICatalogRepository';
import { Category } from '../../domain/entities/Category';
import { Show } from '../../domain/entities/Show';
import { Episode } from '../../domain/entities/Episode';
import { ISupabaseDataSource } from '../datasources/remote/ISupabaseDataSource';
import { MockDataSource } from '../datasources/local/MockDataSource';

/**
 * Implementación concreta del repositorio de catálogo
 * 
 * Principio SRP: Responsabilidad única de obtener datos del catálogo
 * Principio DIP: Implementa ICatalogRepository y depende de ISupabaseDataSource
 * Principio OCP: Puede cambiar la fuente de datos sin modificar el código que lo usa
 */
export class CatalogRepository implements ICatalogRepository {
  constructor(private readonly dataSource: ISupabaseDataSource) {}

  async getCategories(): Promise<Category[]> {
    try {
      return await this.dataSource.getCategories();
    } catch (error) {
      // Fallback a mock data si Supabase falla
      const mockDataSource = new MockDataSource();
      return await mockDataSource.getCategories();
    }
  }

  async getShowById(id: string): Promise<Show | null> {
    try {
      return await this.dataSource.getShowById(id);
    } catch (error) {
      // Fallback a mock data si Supabase falla
      const mockDataSource = new MockDataSource();
      return await mockDataSource.getShowById(id);
    }
  }

  async getEpisodesByShowId(showId: string): Promise<Episode[]> {
    try {
      return await this.dataSource.getEpisodesByShowId(showId);
    } catch (error) {
      // Fallback a mock data si Supabase falla
      const mockDataSource = new MockDataSource();
      return await mockDataSource.getEpisodesByShowId(showId);
    }
  }
}

