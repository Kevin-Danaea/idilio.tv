/**
 * Entidad de dominio: Show
 * Representa un show de streaming en el dominio de la aplicación
 */
export interface Show {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly posterUrl: string;
  readonly bannerUrl: string;
  readonly releaseYear: number;
  readonly tags: readonly string[];
  readonly rating: number;
  readonly totalEpisodes: number;
  readonly status: 'Completed' | 'Ongoing';
}

/**
 * Value Object: ShowStatus
 * Representa el estado de un show
 */
export type ShowStatus = 'Completed' | 'Ongoing';

