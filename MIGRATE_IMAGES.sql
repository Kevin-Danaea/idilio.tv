-- Script de Migración para Actualizar URLs de Imágenes
-- Este script actualiza las URLs usando imágenes de Supabase Storage
-- Se usan 10 imágenes: 5 posters + 5 banners (una por show)
-- Los episodios reutilizan los posters de sus shows respectivos

-- ============================================
-- ACTUALIZACIÓN DE POSTERS Y BANNERS DE SHOWS
-- ============================================
-- Asignación de imágenes de Supabase Storage:
-- 1-2: The CEO's Secret Wife
-- 3-4: Reborn as the Villainess
-- 5-6: Love in the Apocalypse
-- 7-8: Double Life Idol
-- 9-10: Betrayal at High Noon

UPDATE shows 
SET 
  poster_url = CASE 
    WHEN title = 'The CEO''s Secret Wife' THEN 
      'https://esiebrjepzsjyhxrwncp.supabase.co/storage/v1/object/sign/images/pexels-adrien-olichon-1257089-3767170.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xOTY3NzQwZC03NDk4LTQ5MzgtODIzMy00YjBjYjJjMDY3MTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvcGV4ZWxzLWFkcmllbi1vbGljaG9uLTEyNTcwODktMzc2NzE3MC5qcGciLCJpYXQiOjE3NjM1MDg0MjAsImV4cCI6MTc5NTA0NDQyMH0.9Sfq2FHFd2PLcv6W3HX5wyN5q6LC788TyMlwmWFo9WA'
    WHEN title = 'Reborn as the Villainess' THEN 
      'https://esiebrjepzsjyhxrwncp.supabase.co/storage/v1/object/sign/images/pexels-amaria-14213112.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xOTY3NzQwZC03NDk4LTQ5MzgtODIzMy00YjBjYjJjMDY3MTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvcGV4ZWxzLWFtYXJpYS0xNDIxMzExMi5qcGciLCJpYXQiOjE3NjM1MDg0NDUsImV4cCI6MTc5NTA0NDQ0NX0.zU3Rva4Y268T4Xn2wAAPUz6UAWBoA7mQZCiGd2sox28'
    WHEN title = 'Love in the Apocalypse' THEN 
      'https://esiebrjepzsjyhxrwncp.supabase.co/storage/v1/object/sign/images/pexels-bigshowlamar-29820157.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xOTY3NzQwZC03NDk4LTQ5MzgtODIzMy00YjBjYjJjMDY3MTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvcGV4ZWxzLWJpZ3Nob3dsYW1hci0yOTgyMDE1Ny5qcGciLCJpYXQiOjE3NjM1MDg0NTMsImV4cCI6MTc5NTA0NDQ1M30.LVXGhJvRu5SLKN3q6Jczx8IRgTa0-19YQduu8u8Vn4k'
    WHEN title = 'Double Life Idol' THEN 
      'https://esiebrjepzsjyhxrwncp.supabase.co/storage/v1/object/sign/images/pexels-bigshowlamar-29820159.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xOTY3NzQwZC03NDk4LTQ5MzgtODIzMy00YjBjYjJjMDY3MTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvcGV4ZWxzLWJpZ3Nob3dsYW1hci0yOTgyMDE1OS5qcGciLCJpYXQiOjE3NjM1MDg0NTgsImV4cCI6MTc5NTA0NDQ1OH0.NY8W20rPt16HptVt9hGPkoFRlY3wciYNG2FiGCBBUUU'
    WHEN title = 'Betrayal at High Noon' THEN 
      'https://esiebrjepzsjyhxrwncp.supabase.co/storage/v1/object/sign/images/pexels-bolarinwa-olasunkanmi-114406689-13738931.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xOTY3NzQwZC03NDk4LTQ5MzgtODIzMy00YjBjYjJjMDY3MTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvcGV4ZWxzLWJvbGFyaW53YS1vbGFzdW5rYW5taS0xMTQ0MDY2ODktMTM3Mzg5MzEuanBnIiwiaWF0IjoxNzYzNTA4NDc0LCJleHAiOjE3OTUwNDQ0NzR9.1VvcZqWsqLtjkkijGAyHzg4dCtBetMlFsRt8kZkxag4'
    ELSE poster_url
  END,
  banner_url = CASE 
    WHEN title = 'The CEO''s Secret Wife' THEN 
      'https://esiebrjepzsjyhxrwncp.supabase.co/storage/v1/object/sign/images/pexels-clement-proust-363898785-15700348.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xOTY3NzQwZC03NDk4LTQ5MzgtODIzMy00YjBjYjJjMDY3MTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvcGV4ZWxzLWNsZW1lbnQtcHJvdXN0LTM2Mzg5ODc4NS0xNTcwMDM0OC5qcGciLCJpYXQiOjE3NjM1MDg0ODMsImV4cCI6MTc5NTA0NDQ4M30.Se_-Fr9j1sQdVF7RXtyG-OgbhVpIcUzDxMfKVJvwlqM'
    WHEN title = 'Reborn as the Villainess' THEN 
      'https://esiebrjepzsjyhxrwncp.supabase.co/storage/v1/object/sign/images/pexels-cottonbro-10464451.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xOTY3NzQwZC03NDk4LTQ5MzgtODIzMy00YjBjYjJjMDY3MTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvcGV4ZWxzLWNvdHRvbmJyby0xMDQ2NDQ1MS5qcGciLCJpYXQiOjE3NjM1MDg0OTAsImV4cCI6MTc5NTA0NDQ5MH0.YLHbKbOb3eGX_OqF_UGlHvw38PeRvXf8V8YqkMlTcsg'
    WHEN title = 'Love in the Apocalypse' THEN 
      'https://esiebrjepzsjyhxrwncp.supabase.co/storage/v1/object/sign/images/pexels-cottonbro-10576731.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xOTY3NzQwZC03NDk4LTQ5MzgtODIzMy00YjBjYjJjMDY3MTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvcGV4ZWxzLWNvdHRvbmJyby0xMDU3NjczMS5qcGciLCJpYXQiOjE3NjM1MDg0OTgsImV4cCI6MTc5NTA0NDQ5OH0.zuop3EGxnaDxLddZF07uhaWuIqgegK1PAtB_QzaiqLc'
    WHEN title = 'Double Life Idol' THEN 
      'https://esiebrjepzsjyhxrwncp.supabase.co/storage/v1/object/sign/images/pexels-cottonbro-3831849.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xOTY3NzQwZC03NDk4LTQ5MzgtODIzMy00YjBjYjJjMDY3MTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvcGV4ZWxzLWNvdHRvbmJyby0zODMxODQ5LmpwZyIsImlhdCI6MTc2MzUwODUwNywiZXhwIjoxNzk1MDQ0NTA3fQ.uMLUdobn9UNkOhV7IlLm0mrFJrp4Qse1tyrcmR43myo'
    WHEN title = 'Betrayal at High Noon' THEN 
      'https://esiebrjepzsjyhxrwncp.supabase.co/storage/v1/object/sign/images/pexels-cottonbro-4009397.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xOTY3NzQwZC03NDk4LTQ5MzgtODIzMy00YjBjYjJjMDY3MTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvcGV4ZWxzLWNvdHRvbmJyby00MDA5Mzk3LmpwZyIsImlhdCI6MTc2MzUwODUxNiwiZXhwIjoxNzk1MDQ0NTE2fQ.xb5xtnWD07hYn_FHKuXjLhMb3jOnitY8DEsfn23XhPk'
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
-- Reutilizar los posters de los shows para los thumbnails de episodios
-- Esto permite usar solo las 10 imágenes disponibles

UPDATE episodes e
SET thumbnail_url = (
  SELECT poster_url 
  FROM shows s 
  WHERE s.id = e.show_id
)
WHERE EXISTS (
  SELECT 1 
  FROM shows s 
  WHERE s.id = e.show_id 
  AND s.title IN (
    'The CEO''s Secret Wife',
    'Reborn as the Villainess',
    'Love in the Apocalypse',
    'Double Life Idol',
    'Betrayal at High Noon'
  )
);

-- ============================================
-- VERIFICACIÓN
-- ============================================
-- Verificar que las URLs se actualizaron correctamente

SELECT 
  title,
  LEFT(poster_url, 70) as poster_url_preview,
  LEFT(banner_url, 70) as banner_url_preview,
  CASE 
    WHEN poster_url LIKE '%supabase.co/storage%' THEN '✅ Supabase Storage'
    WHEN poster_url LIKE '%picsum%' THEN '⚠️ Picsum placeholder'
    ELSE '❓ URL desconocida'
  END as poster_status,
  CASE 
    WHEN banner_url LIKE '%supabase.co/storage%' THEN '✅ Supabase Storage'
    WHEN banner_url LIKE '%picsum%' THEN '⚠️ Picsum placeholder'
    ELSE '❓ URL desconocida'
  END as banner_status
FROM shows
ORDER BY created_at DESC;

-- Verificar episodios
SELECT 
  s.title as show_title,
  COUNT(e.id) as total_episodes,
  COUNT(CASE WHEN e.thumbnail_url LIKE '%supabase.co/storage%' THEN 1 END) as updated_thumbnails,
  COUNT(CASE WHEN e.thumbnail_url LIKE '%picsum%' THEN 1 END) as placeholder_thumbnails
FROM shows s
LEFT JOIN episodes e ON s.id = e.show_id
GROUP BY s.id, s.title
ORDER BY s.created_at DESC;

-- ============================================
-- DISTRIBUCIÓN DE IMÁGENES
-- ============================================
-- 
-- Este script usa 10 imágenes de Supabase Storage distribuidas así:
-- 
-- POSTERS (5 imágenes):
--   1. The CEO's Secret Wife
--   2. Reborn as the Villainess
--   3. Love in the Apocalypse
--   4. Double Life Idol
--   5. Betrayal at High Noon
--
-- BANNERS (5 imágenes):
--   6. The CEO's Secret Wife
--   7. Reborn as the Villainess
--   8. Love in the Apocalypse
--   9. Double Life Idol
--   10. Betrayal at High Noon
--
-- EPISODIOS:
--   Todos los episodios reutilizan el poster de su show respectivo
--   (esto permite usar solo 10 imágenes para todos los 171 episodios)
--
-- NOTA: Las URLs incluyen tokens de firma que expiran después de un tiempo.
--       Para producción, considera usar URLs públicas del bucket o renovar los tokens.
