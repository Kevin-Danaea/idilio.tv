-- Script de Migración para Actualizar URLs de Imágenes
-- Este script mantiene las URLs de Picsum Photos pero permite personalizarlas
-- cuando tengas tus propias imágenes subidas a Supabase Storage o un CDN.
--
-- NOTA: Las URLs de Picsum Photos funcionan pero son imágenes genéricas.
-- Para producción con imágenes reales, usa Supabase Storage (ver instrucciones abajo).

-- ============================================
-- ACTUALIZACIÓN DE POSTERS Y BANNERS DE SHOWS
-- ============================================
-- Manteniendo URLs de Picsum Photos que funcionan de forma confiable
-- Cada show tiene un número único para obtener imágenes diferentes

UPDATE shows 
SET 
  poster_url = CASE 
    WHEN title = 'The CEO''s Secret Wife' THEN 
      'https://picsum.photos/seed/ceo-wife-poster/400/600'
    WHEN title = 'Reborn as the Villainess' THEN 
      'https://picsum.photos/seed/villainess-poster/400/600'
    WHEN title = 'Love in the Apocalypse' THEN 
      'https://picsum.photos/seed/apocalypse-poster/400/600'
    WHEN title = 'Double Life Idol' THEN 
      'https://picsum.photos/seed/idol-poster/400/600'
    WHEN title = 'Betrayal at High Noon' THEN 
      'https://picsum.photos/seed/betrayal-poster/400/600'
    ELSE poster_url
  END,
  banner_url = CASE 
    WHEN title = 'The CEO''s Secret Wife' THEN 
      'https://picsum.photos/seed/ceo-wife-banner/800/450'
    WHEN title = 'Reborn as the Villainess' THEN 
      'https://picsum.photos/seed/villainess-banner/800/450'
    WHEN title = 'Love in the Apocalypse' THEN 
      'https://picsum.photos/seed/apocalypse-banner/800/450'
    WHEN title = 'Double Life Idol' THEN 
      'https://picsum.photos/seed/idol-banner/800/450'
    WHEN title = 'Betrayal at High Noon' THEN 
      'https://picsum.photos/seed/betrayal-banner/800/450'
    ELSE banner_url
  END
WHERE title IN (
  'The CEO''s Secret Wife',
  'Reborn as the Villainess',
  'Love in the Apocalypse',
  'Double Life Idol',
  'Betrayal at High Noon'
);

-- ============================================
-- ACTUALIZACIÓN DE THUMBNAILS DE EPISODIOS
-- ============================================
-- Actualizar thumbnails usando imágenes relacionadas con cada show

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

  -- Actualizar thumbnails para "The CEO's Secret Wife" (45 episodios)
  -- Usando seeds consistentes para cada episodio
  FOR ep_num IN 1..45 LOOP
    UPDATE episodes
    SET thumbnail_url = 'https://picsum.photos/seed/ceo-ep-' || ep_num || '/300/200'
    WHERE show_id = show_ceo_id AND episode_number = ep_num;
  END LOOP;

  -- Actualizar thumbnails para "Reborn as the Villainess" (60 episodios)
  FOR ep_num IN 1..60 LOOP
    UPDATE episodes
    SET thumbnail_url = 'https://picsum.photos/seed/villainess-ep-' || ep_num || '/300/200'
    WHERE show_id = show_villainess_id AND episode_number = ep_num;
  END LOOP;

  -- Actualizar thumbnails para "Love in the Apocalypse" (24 episodios)
  FOR ep_num IN 1..24 LOOP
    UPDATE episodes
    SET thumbnail_url = 'https://picsum.photos/seed/apocalypse-ep-' || ep_num || '/300/200'
    WHERE show_id = show_apocalypse_id AND episode_number = ep_num;
  END LOOP;

  -- Actualizar thumbnails para "Double Life Idol" (30 episodios)
  FOR ep_num IN 1..30 LOOP
    UPDATE episodes
    SET thumbnail_url = 'https://picsum.photos/seed/idol-ep-' || ep_num || '/300/200'
    WHERE show_id = show_idol_id AND episode_number = ep_num;
  END LOOP;

  -- Actualizar thumbnails para "Betrayal at High Noon" (12 episodios)
  FOR ep_num IN 1..12 LOOP
    UPDATE episodes
    SET thumbnail_url = 'https://picsum.photos/seed/betrayal-ep-' || ep_num || '/300/200'
    WHERE show_id = show_betrayal_id AND episode_number = ep_num;
  END LOOP;

END $$;

-- ============================================
-- VERIFICACIÓN
-- ============================================
-- Verificar que las URLs se actualizaron correctamente

SELECT 
  title,
  LEFT(poster_url, 70) as poster_url_preview,
  LEFT(banner_url, 70) as banner_url_preview,
  CASE 
    WHEN poster_url LIKE '%picsum.photos/seed%' THEN '✅ Actualizado (Picsum - consistente)'
    WHEN poster_url LIKE '%picsum%' THEN '⚠️ Picsum con random'
    WHEN poster_url LIKE '%supabase%' THEN '✅ Supabase Storage'
    ELSE '❓ URL desconocida'
  END as poster_status,
  CASE 
    WHEN banner_url LIKE '%picsum.photos/seed%' THEN '✅ Actualizado (Picsum - consistente)'
    WHEN banner_url LIKE '%picsum%' THEN '⚠️ Picsum con random'
    WHEN banner_url LIKE '%supabase%' THEN '✅ Supabase Storage'
    ELSE '❓ URL desconocida'
  END as banner_status
FROM shows
ORDER BY created_at DESC;

-- Verificar episodios
SELECT 
  s.title as show_title,
  COUNT(e.id) as total_episodes,
  COUNT(CASE WHEN e.thumbnail_url LIKE '%picsum.photos/seed%' THEN 1 END) as updated_thumbnails,
  COUNT(CASE WHEN e.thumbnail_url LIKE '%picsum%' AND e.thumbnail_url NOT LIKE '%seed%' THEN 1 END) as old_thumbnails
FROM shows s
LEFT JOIN episodes e ON s.id = e.show_id
GROUP BY s.id, s.title
ORDER BY s.created_at DESC;

-- ============================================
-- INSTRUCCIONES PARA PRODUCCIÓN
-- ============================================
-- 
-- Este script usa Picsum Photos con seeds para mantener las imágenes consistentes
-- entre recargas. Esto funciona bien para desarrollo y demo.
-- 
-- PARA PRODUCCIÓN: Supabase Storage (RECOMENDADO)
-- ------------------------------------------
-- 1. Ve a Supabase Dashboard > Storage
-- 2. Crea un bucket llamado 'shows' (hazlo público)
-- 3. Organiza tus imágenes:
--    - shows/posters/ceo-secret-wife.jpg (400x600)
--    - shows/banners/ceo-secret-wife.jpg (800x450)
--    - shows/episodes/ceo-secret-wife-ep-1.jpg (300x200)
-- 4. Obtén las URLs públicas:
--    - Ve al archivo en Supabase Storage
--    - Click derecho > Copy URL
--    - Formato: https://[tu-proyecto].supabase.co/storage/v1/object/public/shows/posters/[nombre].jpg
-- 5. Reemplaza las URLs en este script:
--    Ejemplo:
--    WHEN title = 'The CEO''s Secret Wife' THEN 
--      'https://tuproyecto.supabase.co/storage/v1/object/public/shows/posters/ceo-secret-wife.jpg'
-- 6. Ejecuta el script nuevamente
--
-- ALTERNATIVA: TMDB (Requiere API key gratuita)
-- ------------------------------------------
-- 1. Regístrate en https://www.themoviedb.org/
-- 2. Obtén API key: Settings > API > Request API Key
-- 3. Busca IDs de series similares en TMDB
-- 4. Usa las rutas de imágenes:
--    - Posters: https://image.tmdb.org/t/p/w500/[poster_path]
--    - Banners: https://image.tmdb.org/t/p/w1280/[backdrop_path]
--
-- VENTAJAS DE PICSUM PHOTOS CON SEED (actual):
-- - ✅ No requiere configuración adicional
-- - ✅ Funciona inmediatamente
-- - ✅ Las imágenes son consistentes (mismo seed = misma imagen)
-- - ⚠️ Son imágenes genéricas, no relacionadas con el contenido
--
-- VENTAJAS DE SUPABASE STORAGE (recomendado para producción):
-- - ✅ Imágenes personalizadas relacionadas con tu contenido
-- - ✅ Control total sobre las imágenes
-- - ✅ Integrado con tu backend
-- - ✅ CDN incluido para carga rápida
