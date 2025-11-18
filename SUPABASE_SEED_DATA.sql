-- Script SQL Completo para Generar Datos de Prueba en Supabase
-- Ejecuta este script completo en el SQL Editor de Supabase

-- ============================================
-- PASO 1: Limpiar datos existentes (opcional)
-- ============================================
-- Descomenta estas líneas si quieres empezar desde cero
-- DELETE FROM episodes;
-- DELETE FROM category_shows;
-- DELETE FROM shows;
-- DELETE FROM categories;

-- ============================================
-- PASO 2: Insertar Categorías
-- ============================================
INSERT INTO categories (title) VALUES
  ('Trending Now 🔥'),
  ('New Releases 🆕'),
  ('Romantic Getaways ❤️'),
  ('Binge-Worthy Dramas 🍿')
ON CONFLICT (title) DO NOTHING
RETURNING id, title;

-- ============================================
-- PASO 3: Insertar Shows
-- ============================================
INSERT INTO shows (title, description, poster_url, banner_url, release_year, tags, rating, status) VALUES
  (
    'The CEO''s Secret Wife',
    'After a contract marriage, a humble girl discovers her husband is the richest man in the city. Secrets unravel in this high-stakes romance.',
    'https://picsum.photos/400/600?random=1',
    'https://picsum.photos/800/450?random=1',
    2023,
    ARRAY['Romance', 'Drama', 'CEO'],
    4.8,
    'Completed'
  ),
  (
    'Reborn as the Villainess',
    'She woke up in the body of the antagonist. Now she must change her fate to survive the royal court''s deadly games.',
    'https://picsum.photos/400/600?random=2',
    'https://picsum.photos/800/450?random=2',
    2024,
    ARRAY['Fantasy', 'Revenge', 'Historical'],
    4.9,
    'Ongoing'
  ),
  (
    'Love in the Apocalypse',
    'When zombies rise, trust falls. A survival story about finding love when the world is ending.',
    'https://picsum.photos/400/600?random=3',
    'https://picsum.photos/800/450?random=3',
    2023,
    ARRAY['Action', 'Thriller', 'Romance'],
    4.5,
    'Completed'
  ),
  (
    'Double Life Idol',
    'By day, a shy student. By night, a masked internet singing sensation. What happens when her crush finds out?',
    'https://picsum.photos/400/600?random=4',
    'https://picsum.photos/800/450?random=4',
    2024,
    ARRAY['Musical', 'Youth', 'Comedy'],
    4.7,
    'Ongoing'
  ),
  (
    'Betrayal at High Noon',
    'A western thriller with a twist. Who shot the sheriff? It wasn''t the deputy.',
    'https://picsum.photos/400/600?random=5',
    'https://picsum.photos/800/450?random=5',
    2022,
    ARRAY['Western', 'Mystery'],
    4.2,
    'Completed'
  )
RETURNING id, title;

-- ============================================
-- PASO 4: Asociar Shows con Categorías
-- ============================================
-- Primero obtenemos los IDs de las categorías y shows
-- Luego insertamos las relaciones

DO $$
DECLARE
  cat_trending_id UUID;
  cat_new_id UUID;
  cat_romance_id UUID;
  cat_binge_id UUID;
  show_ceo_id UUID;
  show_villainess_id UUID;
  show_apocalypse_id UUID;
  show_idol_id UUID;
  show_betrayal_id UUID;
BEGIN
  -- Obtener IDs de categorías
  SELECT id INTO cat_trending_id FROM categories WHERE title = 'Trending Now 🔥';
  SELECT id INTO cat_new_id FROM categories WHERE title = 'New Releases 🆕';
  SELECT id INTO cat_romance_id FROM categories WHERE title = 'Romantic Getaways ❤️';
  SELECT id INTO cat_binge_id FROM categories WHERE title = 'Binge-Worthy Dramas 🍿';

  -- Obtener IDs de shows
  SELECT id INTO show_ceo_id FROM shows WHERE title = 'The CEO''s Secret Wife';
  SELECT id INTO show_villainess_id FROM shows WHERE title = 'Reborn as the Villainess';
  SELECT id INTO show_apocalypse_id FROM shows WHERE title = 'Love in the Apocalypse';
  SELECT id INTO show_idol_id FROM shows WHERE title = 'Double Life Idol';
  SELECT id INTO show_betrayal_id FROM shows WHERE title = 'Betrayal at High Noon';

  -- Insertar relaciones: Trending Now 🔥
  INSERT INTO category_shows (category_id, show_id, display_order) VALUES
    (cat_trending_id, show_ceo_id, 0),
    (cat_trending_id, show_villainess_id, 1),
    (cat_trending_id, show_idol_id, 2)
  ON CONFLICT (category_id, show_id) DO NOTHING;

  -- Insertar relaciones: New Releases 🆕
  INSERT INTO category_shows (category_id, show_id, display_order) VALUES
    (cat_new_id, show_villainess_id, 0),
    (cat_new_id, show_idol_id, 1),
    (cat_new_id, show_apocalypse_id, 2)
  ON CONFLICT (category_id, show_id) DO NOTHING;

  -- Insertar relaciones: Romantic Getaways ❤️
  INSERT INTO category_shows (category_id, show_id, display_order) VALUES
    (cat_romance_id, show_ceo_id, 0),
    (cat_romance_id, show_apocalypse_id, 1),
    (cat_romance_id, show_idol_id, 2),
    (cat_romance_id, show_villainess_id, 3)
  ON CONFLICT (category_id, show_id) DO NOTHING;

  -- Insertar relaciones: Binge-Worthy Dramas 🍿
  INSERT INTO category_shows (category_id, show_id, display_order) VALUES
    (cat_binge_id, show_betrayal_id, 0),
    (cat_binge_id, show_apocalypse_id, 1),
    (cat_binge_id, show_ceo_id, 2)
  ON CONFLICT (category_id, show_id) DO NOTHING;

END $$;

-- ============================================
-- PASO 5: Insertar Episodios para cada Show
-- ============================================

DO $$
DECLARE
  show_ceo_id UUID;
  show_villainess_id UUID;
  show_apocalypse_id UUID;
  show_idol_id UUID;
  show_betrayal_id UUID;
  ep_num INTEGER;
BEGIN
  -- Obtener IDs de shows
  SELECT id INTO show_ceo_id FROM shows WHERE title = 'The CEO''s Secret Wife';
  SELECT id INTO show_villainess_id FROM shows WHERE title = 'Reborn as the Villainess';
  SELECT id INTO show_apocalypse_id FROM shows WHERE title = 'Love in the Apocalypse';
  SELECT id INTO show_idol_id FROM shows WHERE title = 'Double Life Idol';
  SELECT id INTO show_betrayal_id FROM shows WHERE title = 'Betrayal at High Noon';

  -- Episodios para "The CEO's Secret Wife" (45 episodios)
  FOR ep_num IN 1..45 LOOP
    INSERT INTO episodes (show_id, title, duration_seconds, episode_number, thumbnail_url, is_free)
    VALUES (
      show_ceo_id,
      'Episode ' || ep_num,
      120 + (ep_num * 3), -- Duración variable
      ep_num,
      'https://picsum.photos/300/200?random=' || ep_num,
      ep_num <= 5 -- Primeros 5 gratis
    )
    ON CONFLICT (show_id, episode_number) DO NOTHING;
  END LOOP;

  -- Episodios para "Reborn as the Villainess" (60 episodios)
  FOR ep_num IN 1..60 LOOP
    INSERT INTO episodes (show_id, title, duration_seconds, episode_number, thumbnail_url, is_free)
    VALUES (
      show_villainess_id,
      'Episode ' || ep_num,
      130 + (ep_num * 2),
      ep_num,
      'https://picsum.photos/300/200?random=' || (100 + ep_num),
      ep_num <= 5
    )
    ON CONFLICT (show_id, episode_number) DO NOTHING;
  END LOOP;

  -- Episodios para "Love in the Apocalypse" (24 episodios)
  FOR ep_num IN 1..24 LOOP
    INSERT INTO episodes (show_id, title, duration_seconds, episode_number, thumbnail_url, is_free)
    VALUES (
      show_apocalypse_id,
      'Episode ' || ep_num,
      150 + (ep_num * 4),
      ep_num,
      'https://picsum.photos/300/200?random=' || (200 + ep_num),
      ep_num <= 5
    )
    ON CONFLICT (show_id, episode_number) DO NOTHING;
  END LOOP;

  -- Episodios para "Double Life Idol" (30 episodios)
  FOR ep_num IN 1..30 LOOP
    INSERT INTO episodes (show_id, title, duration_seconds, episode_number, thumbnail_url, is_free)
    VALUES (
      show_idol_id,
      'Episode ' || ep_num,
      140 + (ep_num * 3),
      ep_num,
      'https://picsum.photos/300/200?random=' || (300 + ep_num),
      ep_num <= 5
    )
    ON CONFLICT (show_id, episode_number) DO NOTHING;
  END LOOP;

  -- Episodios para "Betrayal at High Noon" (12 episodios)
  FOR ep_num IN 1..12 LOOP
    INSERT INTO episodes (show_id, title, duration_seconds, episode_number, thumbnail_url, is_free)
    VALUES (
      show_betrayal_id,
      'Episode ' || ep_num,
      180 + (ep_num * 5),
      ep_num,
      'https://picsum.photos/300/200?random=' || (400 + ep_num),
      ep_num <= 5
    )
    ON CONFLICT (show_id, episode_number) DO NOTHING;
  END LOOP;

END $$;

-- ============================================
-- PASO 6: Verificar Datos Insertados
-- ============================================

-- Verificar categorías
SELECT 'Categories' as table_name, COUNT(*) as count FROM categories;

-- Verificar shows
SELECT 'Shows' as table_name, COUNT(*) as count FROM shows;

-- Verificar relaciones
SELECT 'Category-Shows Relations' as table_name, COUNT(*) as count FROM category_shows;

-- Verificar episodios
SELECT 'Episodes' as table_name, COUNT(*) as count FROM episodes;

-- Verificar estructura completa
SELECT 
  c.title as category,
  COUNT(DISTINCT cs.show_id) as shows_count,
  COUNT(DISTINCT e.id) as total_episodes
FROM categories c
LEFT JOIN category_shows cs ON c.id = cs.category_id
LEFT JOIN shows s ON cs.show_id = s.id
LEFT JOIN episodes e ON s.id = e.show_id
GROUP BY c.id, c.title
ORDER BY c.title;

-- ============================================
-- RESULTADO ESPERADO
-- ============================================
-- 4 categorías
-- 5 shows
-- Múltiples relaciones en category_shows
-- ~171 episodios en total (45+60+24+30+12)
-- ============================================

