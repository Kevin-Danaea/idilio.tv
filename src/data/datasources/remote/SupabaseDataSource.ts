import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Category } from '../../../domain/entities/Category';
import { Episode } from '../../../domain/entities/Episode';
import { Show } from '../../../domain/entities/Show';
import { mapSupabaseEpisodeToDomain, mapSupabaseShowToDomain } from '../../mappers/SupabaseMappers';
import { ISupabaseDataSource } from './ISupabaseDataSource';

/**
 * Implementación concreta de la fuente de datos de Supabase
 * 
 * Principio SRP: Responsabilidad única de comunicarse con Supabase
 * Principio DIP: Implementa la interfaz ISupabaseDataSource
 */
export class SupabaseDataSource implements ISupabaseDataSource {
  private client: SupabaseClient | null;
  private isConfigured: boolean;

  constructor() {
    const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
    const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

    this.isConfigured = !!(url && key);
    this.client = this.isConfigured ? createClient(url!, key!) : null;

    if (this.isConfigured) {
      console.log('✅ Supabase client configured successfully');
    } else {
      console.warn('⚠️ Supabase client not configured - will use mock data');
      console.warn('   Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in .env');
    }
  }

  async getCategories(): Promise<Category[]> {
    if (!this.client) {
      throw new Error('Supabase client not configured');
    }

    console.log('📡 Fetching categories from Supabase...');

    try {
      // Usar INNER JOIN para solo mostrar categorías que tienen shows asociados
      // Ordenar categorías por created_at DESC y shows por display_order ASC para consistencia
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
        console.error('❌ Error fetching categories from Supabase:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        throw error;
      }

      console.log(`✅ Successfully fetched ${data?.length || 0} categories from Supabase`);

      if (!data || data.length === 0) {
        console.warn('⚠️ No categories with shows found. Make sure:');
        console.warn('   1. Categories exist in the database');
        console.warn('   2. Shows exist in the database');
        console.warn('   3. category_shows table has relationships');
        console.warn('   4. RLS policies allow SELECT');
        return [];
      }

      // Transformar la respuesta de Supabase al formato del dominio
      const categories = (data || []).map((cat: any) => {
        const shows = (cat.category_shows || [])
          .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
          .map((cs: any) => {
            if (!cs.shows) return null;
            try {
              return mapSupabaseShowToDomain(cs.shows);
            } catch (err) {
              console.error('Error mapping show:', err, cs.shows);
              return null;
            }
          })
          .filter((show: Show | null): show is Show => show !== null);

        return {
          id: cat.id,
          title: cat.title,
          shows,
        };
      });

      console.log(`📦 Processed ${categories.length} categories with ${categories.reduce((sum, cat) => sum + cat.shows.length, 0)} total shows`);
      
      return categories;
    } catch (error) {
      console.error('❌ Failed to fetch categories from Supabase:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      throw error;
    }
  }

  async getShowById(id: string): Promise<Show | null> {
    if (!this.client) {
      throw new Error('Supabase client not configured');
    }

    console.log(`📡 Fetching show ${id} from Supabase...`);

    try {
      const { data, error } = await this.client
        .from('shows')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        // PGRST116 es el código cuando no se encuentra ningún registro
        if (error.code === 'PGRST116') {
          console.log(`⚠️ Show ${id} not found in Supabase`);
          return null;
        }
        console.error('❌ Error fetching show from Supabase:', error);
        throw error;
      }

      console.log(`✅ Successfully fetched show ${id} from Supabase`);
      return data ? mapSupabaseShowToDomain(data) : null;
    } catch (error) {
      console.error('❌ Failed to fetch show from Supabase:', error);
      throw error;
    }
  }

  async getEpisodesByShowId(showId: string): Promise<Episode[]> {
    if (!this.client) {
      throw new Error('Supabase client not configured');
    }

    console.log(`📡 Fetching episodes for show ${showId} from Supabase...`);

    try {
      const { data, error } = await this.client
        .from('episodes')
        .select('*')
        .eq('show_id', showId)
        .order('episode_number', { ascending: true });

      if (error) {
        console.error('❌ Error fetching episodes from Supabase:', error);
        throw error;
      }

      console.log(`✅ Successfully fetched ${data?.length || 0} episodes from Supabase`);
      return (data || []).map(mapSupabaseEpisodeToDomain);
    } catch (error) {
      console.error('❌ Failed to fetch episodes from Supabase:', error);
      throw error;
    }
  }
}

