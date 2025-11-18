/**
 * IMPLEMENTACIÓN COMPLETA DE SUPABASE DATASOURCE
 * 
 * Copia este código a SupabaseDataSource.ts una vez que hayas configurado
 * las tablas en Supabase según SUPABASE_SETUP.md
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ISupabaseDataSource } from './ISupabaseDataSource';
import { Category } from '../../../domain/entities/Category';
import { Show } from '../../../domain/entities/Show';
import { Episode } from '../../../domain/entities/Episode';
import { mapSupabaseShowToDomain, mapSupabaseEpisodeToDomain } from '../../mappers/SupabaseMappers';

/**
 * Implementación completa de la fuente de datos de Supabase
 * 
 * IMPORTANTE: Reemplaza el contenido de SupabaseDataSource.ts con este código
 * después de configurar las tablas en Supabase.
 */
export class SupabaseDataSource implements ISupabaseDataSource {
  private client: SupabaseClient | null;

  constructor() {
    const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
    const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

    this.client = (url && key) ? createClient(url, key) : null;
  }

  async getCategories(): Promise<Category[]> {
    if (!this.client) {
      throw new Error('Supabase client not configured');
    }

    // Opción 1: Usando joins de Supabase (recomendado)
    const { data, error } = await this.client
      .from('categories')
      .select(`
        id,
        title,
        category_shows!inner(
          display_order,
          shows (
            id,
            title,
            description,
            poster_url,
            banner_url,
            release_year,
            tags,
            rating,
            total_episodes,
            status
          )
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }

    // Transformar la respuesta de Supabase al formato del dominio
    return (data || []).map((cat: any) => ({
      id: cat.id,
      title: cat.title,
      shows: (cat.category_shows || [])
        .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
        .map((cs: any) => {
          if (!cs.shows) return null;
          return mapSupabaseShowToDomain(cs.shows);
        })
        .filter((show: Show | null): show is Show => show !== null),
    }));
  }

  async getShowById(id: string): Promise<Show | null> {
    if (!this.client) {
      throw new Error('Supabase client not configured');
    }

    const { data, error } = await this.client
      .from('shows')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      // PGRST116 es el código cuando no se encuentra ningún registro
      if (error.code === 'PGRST116') {
        return null;
      }
      console.error('Error fetching show:', error);
      throw error;
    }

    return data ? mapSupabaseShowToDomain(data) : null;
  }

  async getEpisodesByShowId(showId: string): Promise<Episode[]> {
    if (!this.client) {
      throw new Error('Supabase client not configured');
    }

    const { data, error } = await this.client
      .from('episodes')
      .select('*')
      .eq('show_id', showId)
      .order('episode_number', { ascending: true });

    if (error) {
      console.error('Error fetching episodes:', error);
      throw error;
    }

    return (data || []).map(mapSupabaseEpisodeToDomain);
  }
}

