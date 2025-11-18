import { Category } from '../entities/Category';
import { ICatalogRepository } from '../repositories/ICatalogRepository';

/**
 * Caso de uso: Obtener catálogo completo
 * 
 * Principio SRP: Responsabilidad única de obtener el catálogo
 * Principio DIP: Depende de la abstracción ICatalogRepository
 */
export class GetCatalogUseCase {
  constructor(private readonly catalogRepository: ICatalogRepository) {}

  /**
   * Ejecuta el caso de uso para obtener el catálogo
   */
  async execute(): Promise<Category[]> {
    try {
      return await this.catalogRepository.getCategories();
    } catch (error) {
      // En una aplicación real, aquí se manejarían errores específicos del dominio
      throw new Error('Failed to fetch catalog');
    }
  }
}

