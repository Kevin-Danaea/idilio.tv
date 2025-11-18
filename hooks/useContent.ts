import { useState, useEffect, useCallback, useMemo } from 'react';
import { Category, Show, Episode } from '../types';
import { MOCK_CATEGORIES, generateMockEpisodes, MOCK_CATEGORIES as MOCK_ALL_SHOWS_SOURCE } from '../constants';
import { supabase } from '../services/supabase';

// Hook to fetch categories and shows
export const useCatalog = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        setLoading(true);
        
        if (supabase) {
          // Real Supabase queries would go here:
          // const { data, error } = await supabase
          //   .from('categories')
          //   .select('*, shows(*)')
          //   .order('created_at', { ascending: false });
          // 
          // if (error) throw error;
          // setCategories(data);
          
          // For now, fallback to mock data
          throw new Error("Supabase configured but using mock data for development.");
        } else {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 800));
          setCategories(MOCK_CATEGORIES);
        }
      } catch (err) {
        console.log("Using mock data due to:", err);
        setCategories(MOCK_CATEGORIES);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  // Memoize categories to avoid unnecessary re-renders
  const memoizedCategories = useMemo(() => categories, [categories]);

  return { categories: memoizedCategories, loading, error };
};

// Hook to fetch single show details
export const useShowDetails = (showId: string | undefined) => {
  const [show, setShow] = useState<Show | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDetails = useCallback(async () => {
    if (!showId) return;

    setLoading(true);
    
    try {
      if (supabase) {
        // Real Supabase queries would go here:
        // const { data: showData, error: showError } = await supabase
        //   .from('shows')
        //   .select('*')
        //   .eq('id', showId)
        //   .single();
        //
        // const { data: episodesData, error: episodesError } = await supabase
        //   .from('episodes')
        //   .select('*')
        //   .eq('show_id', showId)
        //   .order('episode_number', { ascending: true });
        //
        // if (showError) throw showError;
        // if (episodesError) throw episodesError;
        //
        // setShow(showData);
        // setEpisodes(episodesData);
        
        // For now, fallback to mock data
        throw new Error("Supabase configured but using mock data for development.");
      } else {
        // Simulate fetch
        await new Promise(resolve => setTimeout(resolve, 600));

        // Find in mock data
        let foundShow: Show | undefined;
        for (const cat of MOCK_ALL_SHOWS_SOURCE) {
          const s = cat.shows.find(s => s.id === showId);
          if (s) {
            foundShow = s;
            break;
          }
        }

        if (foundShow) {
          setShow(foundShow);
          setEpisodes(generateMockEpisodes(foundShow.id, foundShow.total_episodes));
        }
      }
    } catch (err) {
      console.log("Using mock data due to:", err);
      
      // Find in mock data as fallback
      let foundShow: Show | undefined;
      for (const cat of MOCK_ALL_SHOWS_SOURCE) {
        const s = cat.shows.find(s => s.id === showId);
        if (s) {
          foundShow = s;
          break;
        }
      }

      if (foundShow) {
        setShow(foundShow);
        setEpisodes(generateMockEpisodes(foundShow.id, foundShow.total_episodes));
      }
    } finally {
      setLoading(false);
    }
  }, [showId]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  // Memoize episodes to avoid unnecessary re-renders
  const memoizedEpisodes = useMemo(() => episodes, [episodes]);

  return { show, episodes: memoizedEpisodes, loading };
};

