# Arquitectura de Idilio.tv

## Estructura del Proyecto

Este proyecto sigue los principios de **Clean Architecture**, **Atomic Design** y **SOLID**.

```
src/
├── domain/                    # Capa de Dominio (Lógica de Negocio Pura)
│   ├── entities/             # Entidades del dominio
│   ├── repositories/         # Interfaces/Contratos de repositorios
│   ├── use-cases/            # Casos de uso (lógica de negocio)
│   └── types/                # Tipos del dominio
│
├── data/                      # Capa de Datos (Infraestructura)
│   ├── datasources/          # Fuentes de datos (API, Local Storage)
│   │   ├── remote/           # APIs remotas (Supabase)
│   │   └── local/            # Almacenamiento local
│   ├── repositories/         # Implementaciones concretas de repositorios
│   └── mappers/              # Mappers entre modelos de datos y entidades
│
├── presentation/              # Capa de Presentación (UI)
│   ├── components/           # Componentes UI (Atomic Design)
│   │   ├── atoms/           # Componentes básicos (Button, Text, Image)
│   │   ├── molecules/       # Componentes compuestos (ShowCard, EpisodeItem)
│   │   ├── organisms/        # Componentes complejos (CategoryRow, HeroSection)
│   │   └── templates/        # Plantillas de layout
│   ├── screens/              # Pantallas completas
│   ├── hooks/                # Hooks de presentación
│   ├── providers/            # Context providers
│   └── navigation/           # Configuración de navegación
│
├── shared/                    # Código compartido
│   ├── utils/                # Utilidades
│   ├── constants/            # Constantes
│   └── types/                # Tipos compartidos
│
└── app/                       # Expo Router (punto de entrada)
```

## Principios Aplicados

### SOLID

1. **Single Responsibility Principle (SRP)**
   - Cada componente/clase tiene una única responsabilidad
   - Los hooks solo manejan estado de UI
   - Los casos de uso solo orquestan lógica de negocio

2. **Open/Closed Principle (OCP)**
   - Los componentes son extensibles mediante composición
   - Los repositorios pueden extenderse sin modificar código existente

3. **Liskov Substitution Principle (LSP)**
   - Las implementaciones de repositorios son intercambiables
   - Los componentes pueden sustituirse por variantes

4. **Interface Segregation Principle (ISP)**
   - Interfaces específicas y pequeñas
   - Cada repositorio tiene su propia interfaz

5. **Dependency Inversion Principle (DIP)**
   - Las capas superiores dependen de abstracciones (interfaces)
   - La inyección de dependencias se hace mediante providers

### Clean Architecture

- **Domain Layer**: Independiente de frameworks y librerías externas
- **Data Layer**: Implementa las interfaces del dominio
- **Presentation Layer**: Depende del dominio, no de la implementación de datos

### Atomic Design

- **Atoms**: Componentes básicos e indivisibles
- **Molecules**: Combinaciones de átomos
- **Organisms**: Componentes complejos que forman secciones
- **Templates**: Estructuras de página
- **Pages**: Instancias específicas de templates

## Flujo de Datos

```
User Action → Screen → Hook → Use Case → Repository Interface
                                                      ↓
                                            Repository Implementation
                                                      ↓
                                            DataSource (API/Local)
                                                      ↓
                                            Response → Use Case → Hook → Screen → UI Update
```

## Convenciones de Código

- **Nombres de archivos**: kebab-case para archivos, PascalCase para componentes
- **Exports**: Named exports para componentes, default exports para screens
- **Types**: Interfaces para objetos, types para unions/intersections
- **Hooks**: Prefijo `use` para hooks personalizados
- **Casos de uso**: Nombres descriptivos que indican acción (GetCatalog, GetShowDetails)

