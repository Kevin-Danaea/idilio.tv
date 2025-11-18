# Idilio.tv - Aplicación de Streaming React Native

Aplicación móvil de streaming de contenido estilo Netflix, construida con React Native, Expo Router y NativeWind.

## 🚀 Cómo correr el proyecto

### Requisitos previos

- Node.js 18+ instalado
- npm o yarn
- Expo CLI instalado globalmente: `npm install -g expo-cli`

### Instalación

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd idilio.tv
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno (opcional):
```bash
cp .env.example .env
# Editar .env y agregar tus credenciales de Supabase
```

4. Iniciar el proyecto:
```bash
npm start
# o
expo start
```

5. Ejecutar en plataforma específica:
```bash
npm run android  # Para Android
npm run ios      # Para iOS
npm run web      # Para Web
```

## 📱 Funcionalidades

- **Home (Catálogo)**: Muestra categorías de contenido en carruseles horizontales
- **Detalle de Show**: Pantalla con información completa del show y lista de episodios
- **Navegación por Tabs**: Home, Discover y Profile
- **Carruseles horizontales**: Implementados con FlatList y snapToInterval para mejor UX

## 🗄️ Funciones de SQL implementadas

La aplicación está preparada para integrarse con Supabase. Las consultas SQL que se implementarían son:

### Tabla `shows`
```sql
CREATE TABLE shows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  poster_url TEXT,
  banner_url TEXT,
  release_year INTEGER,
  tags TEXT[],
  rating DECIMAL(3,1),
  total_episodes INTEGER,
  status TEXT CHECK (status IN ('Completed', 'Ongoing')),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Tabla `episodes`
```sql
CREATE TABLE episodes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  show_id UUID REFERENCES shows(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  duration_seconds INTEGER,
  episode_number INTEGER,
  thumbnail_url TEXT,
  video_url TEXT,
  is_free BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Tabla `categories`
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Tabla de relación `category_shows`
```sql
CREATE TABLE category_shows (
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  show_id UUID REFERENCES shows(id) ON DELETE CASCADE,
  PRIMARY KEY (category_id, show_id)
);
```

### Consultas principales

1. **Obtener categorías con shows**:
```sql
SELECT 
  c.*,
  json_agg(s.*) as shows
FROM categories c
LEFT JOIN category_shows cs ON c.id = cs.category_id
LEFT JOIN shows s ON cs.show_id = s.id
GROUP BY c.id
ORDER BY c.created_at DESC;
```

2. **Obtener detalles de un show con episodios**:
```sql
SELECT 
  s.*,
  json_agg(e.* ORDER BY e.episode_number) as episodes
FROM shows s
LEFT JOIN episodes e ON s.id = e.show_id
WHERE s.id = $1
GROUP BY s.id;
```

**Nota**: Actualmente la aplicación usa datos mock para desarrollo. Para usar Supabase, configura las variables de entorno `EXPO_PUBLIC_SUPABASE_URL` y `EXPO_PUBLIC_SUPABASE_ANON_KEY`.

## 🛠️ Decisiones técnicas

### Expo Router vs React Navigation
Se eligió Expo Router por su integración nativa con Expo, navegación basada en archivos (similar a Next.js), y soporte TypeScript con rutas tipadas. Esto simplifica la configuración y el mantenimiento del código.

### NativeWind v4
Se implementó NativeWind para mantener consistencia con el código web original que usaba Tailwind CSS. Esto permite reutilizar las clases de utilidad existentes y mantener un diseño consistente entre plataformas.

### FlatList para carruseles
Se utilizó FlatList horizontal con `snapToInterval` y `pagingEnabled` para crear carruseles suaves y performantes. FlatList es optimizado por React Native para listas grandes y proporciona mejor rendimiento que ScrollView para múltiples elementos.

### Hooks optimizados
Se implementaron `useMemo` y `useCallback` en los hooks personalizados para evitar re-renders innecesarios y optimizar el rendimiento de la aplicación.

## 🤖 Prompts usados en IA

Los principales prompts utilizados durante el desarrollo fueron:

1. "Migrar componente React web a React Native, reemplazando elementos DOM por componentes nativos"
2. "Implementar carrusel horizontal con FlatList y snapToInterval en React Native"
3. "Configurar NativeWind v4 con Expo Router y TypeScript"
4. "Convertir gradientes CSS a Views con opacidad en React Native"
5. "Implementar navegación con Expo Router usando Tabs Layout"

## 🔮 Qué harías a continuación

Si tuviera más tiempo, implementaría:

1. **Autenticación de usuarios**: Integración con Supabase Auth para login/registro
2. **Sistema de favoritos**: Guardar shows favoritos del usuario
3. **Búsqueda**: Implementar búsqueda de contenido por título, género, etc.
4. **Reproductor de video**: Integración con expo-av o react-native-video para reproducir episodios
5. **Historial de visualización**: Rastrear qué episodios ha visto el usuario
6. **Notificaciones push**: Alertas de nuevos episodios de shows favoritos
7. **Modo offline**: Cachear contenido para visualización sin conexión
8. **Perfil de usuario**: Personalización de preferencias y configuración
9. **Sistema de recomendaciones**: Algoritmo basado en historial de visualización
10. **Optimizaciones de performance**: Lazy loading de imágenes, virtualización de listas largas

## 📦 Dependencias principales

- `expo`: ~54.0.25
- `expo-router`: ~6.0.15
- `react-native`: 0.81.5
- `nativewind`: ^4.2.1
- `tailwindcss`: ^3.4.18
- `lucide-react-native`: ^0.554.0
- `@supabase/supabase-js`: ^2.83.0
- `react-native-reanimated`: ~4.1.1
- `react-native-safe-area-context`: ~5.6.0

## 📄 Licencia

Este proyecto es privado.

