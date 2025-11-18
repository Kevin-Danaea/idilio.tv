# Idilio.tv - Aplicación de Streaming React Native

Aplicación móvil de streaming de contenido estilo Netflix, construida con React Native, Expo Router, NativeWind v4 y Supabase.

## Cómo correr el proyecto (Expo o React Native CLI)

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

**Nota**: Si no configuras Supabase, la aplicación usará datos mock automáticamente.

## Funciones de SQL implementadas

La aplicación está preparada para integrarse con Supabase. Las consultas SQL que se implementarían son:

### Tabla `shows`
```sql
CREATE TABLE shows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  poster_url TEXT NOT NULL,
  banner_url TEXT NOT NULL,
  release_year INTEGER NOT NULL,
  tags TEXT[] DEFAULT '{}',
  rating DECIMAL(3,1) NOT NULL CHECK (rating >= 0 AND rating <= 5),
  total_episodes INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('Completed', 'Ongoing')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Tabla `episodes`
```sql
CREATE TABLE episodes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  show_id UUID NOT NULL REFERENCES shows(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  duration_seconds INTEGER NOT NULL CHECK (duration_seconds > 0),
  episode_number INTEGER NOT NULL CHECK (episode_number > 0),
  thumbnail_url TEXT NOT NULL,
  video_url TEXT,
  is_free BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(show_id, episode_number)
);
```

### Tabla `categories`
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Tabla de relación `category_shows`
```sql
CREATE TABLE category_shows (
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  show_id UUID NOT NULL REFERENCES shows(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (category_id, show_id)
);
```

### Consultas principales

1. **Obtener categorías con shows**:
```sql
SELECT 
  c.id,
  c.title,
  category_shows!inner(
    display_order,
    shows (
      id, title, description, poster_url, banner_url,
      release_year, tags, rating, total_episodes, status
    )
  )
FROM categories c
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

Ver `SUPABASE_SEED_DATA.sql` para scripts completos de setup y datos de ejemplo.

## Decisiones técnicas

Se eligió **Expo Router** por su integración nativa con Expo, navegación basada en archivos (similar a Next.js), y soporte TypeScript con rutas tipadas. Esto simplifica la configuración y el mantenimiento del código. Se implementó **NativeWind v4** para mantener consistencia con el código web original que usaba Tailwind CSS, permitiendo reutilizar las clases de utilidad existentes y mantener un diseño consistente entre plataformas.

Se utilizó **FlatList horizontal** con `snapToInterval` y `pagingEnabled` para crear carruseles suaves y performantes. La aplicación sigue **Clean Architecture** con separación de capas (Domain, Data, Presentation), **Atomic Design** para organización de componentes, y **principios SOLID** para mantener el código mantenible y escalable. Ver [ARCHITECTURE.md](./ARCHITECTURE.md) para más detalles.

## Prompts usados en IA

**Migración de componentes web a React Native** (Contexto: hice un mockup de como queria que se viera en react native y una vez tenia el aspecto que queria lo traslade a react native.)
```
Actúa como un Arquitecto Senior de React Native y Expo. Necesito migrar la lógica y la UI de una aplicación web React a una nueva arquitectura React Native con Expo y Expo Router.

Además junto con esto, deberemos usar esta documentación técnica para construir todo el sistema completo y recordando que todo debería ir como la estructura de la carpeta raíz y debería ir dentro de app toda la lógica y los componentes en components, etc. Usemos la estructura que ya está declarada en la carpeta de idilio.tv.

Requisitos específicos:
- Estilos: Implementar NativeWind v4 para reutilizar clases Tailwind CSS
- Navegación: Reemplazar react-router-dom con Expo Router (Tabs Layout: Home, Discover, Profile + ruta dinámica /show/[id])
- Iconos: Migrar de lucide-react a lucide-react-native
- Componentes: Reemplazar elementos DOM (div, img, button, span) con componentes nativos (View, Image, Pressable, Text, ScrollView, FlatList)
- Lógica: Migrar Hooks y Services como TypeScript puro
```

**Implementación de carruseles horizontales**
```
Necesito implementar un carrusel horizontal para mostrar las tarjetas de shows. Revisa cómo se hace en otras apps de streaming y qué es lo mejor para React Native.

Quiero que el scroll se detenga en cada card de forma suave, que sea performante con muchas tarjetas, y que maneje bien el caso cuando hay pocos items. Usa FlatList con las optimizaciones necesarias y el componente ShowCard que ya tenemos.
```

**Configuración de NativeWind v4**
```
Estoy teniendo problemas configurando NativeWind v4 en este proyecto Expo. Revisa la documentación oficial y la mejor forma de configurarlo con TypeScript y Expo Router.

Necesito que funcione correctamente con babel, metro y que los estilos se apliquen en todos los componentes. Si hay errores comunes o mejores prácticas, aplícalas.
```

**Refactorización a Clean Architecture**
```
Como desarrollador SR experto en arquitecturas. 
Quiero que revises profundamente el codigo y revises tambien en web o demas, cual es la mejor arquitectura para react native y en todo caso veamos que podemos mejorar y transformar de lo que ya tenemos que funciona a una aplicacion utilizando arquitecturas limpias, atomicas y princpios SOLID.
```

**Creación de componentes con Atomic Design**
```
Necesito crear un componente nuevo siguiendo Atomic Design. Revisa qué tipo debería ser (atom, molecule u organism) según su complejidad y reutilización.

Quiero que sea bien tipado con TypeScript, que use NativeWind para los estilos, y que siga los principios SOLID especialmente SRP. Si hay componentes similares en el proyecto, reutiliza lo que puedas y documenta bien con JSDoc.
```

**Integración con Supabase**
```
Necesito conectar esta app con Supabase como backend. Revisa la mejor forma de hacerlo en React Native con Expo.

Quiero que tenga fallback automático a datos mock si no hay conexión, que los datos se transformen correctamente del formato de Supabase al dominio, y que tenga buen manejo de errores con logs para poder debuggear fácilmente.
```

**Debugging de estilos**
```
Los estilos de NativeWind no se están aplicando, todo aparece junto y mezclado. Revisa la configuración completa de NativeWind, babel y metro.

Verifica los content paths, que esté en presets y no en plugins, y si hace falta limpiar cache. Dame una solución completa paso a paso.
```

**Manejo de Safe Areas**
```
Hay warnings sobre SafeAreaView deprecado. Revisa cómo se debe implementar correctamente en React Native con Expo.

Quiero que todas las pantallas respeten las safe areas correctamente, especialmente en dispositivos con notch o barras de navegación.
```

## Qué harías a continuación si tuvieras más tiempo

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
