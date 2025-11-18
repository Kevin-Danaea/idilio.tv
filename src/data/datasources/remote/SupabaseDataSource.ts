import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ISupabaseDataSource } from './ISupabaseDataSource';
import { Category } from '../../../domain/entities/Category';
import { Show } from '../../../domain/entities/Show';
import { Episode } from '../../../domain/entities/Episode';
import { mapSupabaseShowToDomain, mapSupabaseEpisodeToDomain } from '../../mappers/SupabaseMappers';

/**
 * Implementación concreta de la fuente de datos de Supabase
 * 
 * Principio SRP: Responsabilidad única de comunicarse con Supabase
 * Principio DIP: Implementa la interfaz ISupabaseDataSource
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

    // En producción, aquí irían las consultas reales a Supabase
    // const { data, error } = await this.client
    //   .from('categories')
    //   .select('*, shows(*)');
    
    throw new Error('Supabase queries not implemented - using mock data');
  }

  async getShowById(id: string): Promise<Show | null> {
    if (!this.client) {
      throw new Error('Supabase client not configured');
    }

    // En producción, aquí iría la consulta real
    // const { data, error } = await this.client
    //   .from('shows')
    //   .select('*')
    //   .eq('id', id)
    //   .single();
    
    throw new Error('Supabase queries not implemented - using mock data');
  }

  async getEpisodesByShowId(showId: string): Promise<Episode[]> {
    if (!this.client) {
      throw new Error('Supabase client not configured');
    }

    // En producción, aquí iría la consulta real
    // const { data, error } = await this.client
    //   .from('episodes')
    //   .select('*')
    //   .eq('show_id', showId)
    //   .order('episode_number', { ascending: true });
    
    throw new Error('Supabase queries not implemented - using mock data');
  }
}

