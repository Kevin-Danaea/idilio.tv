import { Show } from './Show';

/**
 * Entidad de dominio: Category
 * Representa una categoría de contenido con sus shows asociados
 */
export interface Category {
  readonly id: string;
  readonly title: string;
  readonly shows: readonly Show[];
}

