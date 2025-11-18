import { useState, useEffect } from 'react';
import { Category } from '../../domain/entities/Category';
import { GetCatalogUseCase } from '../../domain/use-cases/GetCatalogUseCase';

/**
 * Hook de presentación para obtener el catálogo
 * 
 * Principio SRP: Responsabilidad única de manejar el estado de UI del catálogo
 * Principio DIP: Depende del caso de uso (abstracción)
 */
export const useCatalog = (getCatalogUseCase: GetCatalogUseCase) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await getCatalogUseCase.execute();
        setCategories(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch catalog'));
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, [getCatalogUseCase]);

  return { categories, loading, error };
};

