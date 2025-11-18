/**
 * Entidad de dominio: Episode
 * Representa un episodio de un show
 */
export interface Episode {
  readonly id: string;
  readonly showId: string;
  readonly title: string;
  readonly durationSeconds: number;
  readonly episodeNumber: number;
  readonly thumbnailUrl: string;
  readonly videoUrl?: string;
  readonly isFree: boolean;
}

