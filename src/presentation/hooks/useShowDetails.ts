import { useState, useEffect } from 'react';
import { Show } from '../../domain/entities/Show';
import { Episode } from '../../domain/entities/Episode';
import { GetShowDetailsUseCase } from '../../domain/use-cases/GetShowDetailsUseCase';

/**
 * Hook de presentación para obtener detalles de un show
 * 
 * Principio SRP: Responsabilidad única de manejar el estado de UI de detalles del show
 * Principio DIP: Depende del caso de uso (abstracción)
 */
export const useShowDetails = (
  showId: string | undefined,
  getShowDetailsUseCase: GetShowDetailsUseCase
) => {
  const [show, setShow] = useState<Show | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!showId) {
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await getShowDetailsUseCase.execute(showId);
        setShow(result.show);
        setEpisodes(result.episodes);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch show details'));
        setShow(null);
        setEpisodes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [showId, getShowDetailsUseCase]);

  return { show, episodes, loading, error };
};

