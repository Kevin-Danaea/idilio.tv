import React, { createContext, useContext, ReactNode } from 'react';
import { ICatalogRepository } from '../../domain/repositories/ICatalogRepository';
import { CatalogRepository } from '../../data/repositories/CatalogRepository';
import { SupabaseDataSource } from '../../data/datasources/remote/SupabaseDataSource';
import { GetCatalogUseCase } from '../../domain/use-cases/GetCatalogUseCase';
import { GetShowDetailsUseCase } from '../../domain/use-cases/GetShowDetailsUseCase';

/**
 * Contexto de la aplicación para inyección de dependencias
 * 
 * Principio DIP: Las dependencias se inyectan a través del contexto
 */
interface AppContextValue {
  getCatalogUseCase: GetCatalogUseCase;
  getShowDetailsUseCase: GetShowDetailsUseCase;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

/**
 * Provider de la aplicación que configura las dependencias
 * 
 * Principio DIP: Centraliza la creación de dependencias
 */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Crear las dependencias (en producción, esto podría venir de un contenedor de DI)
  const dataSource = new SupabaseDataSource();
  const catalogRepository: ICatalogRepository = new CatalogRepository(dataSource);
  const getCatalogUseCase = new GetCatalogUseCase(catalogRepository);
  const getShowDetailsUseCase = new GetShowDetailsUseCase(catalogRepository);

  const value: AppContextValue = {
    getCatalogUseCase,
    getShowDetailsUseCase,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * Hook para acceder al contexto de la aplicación
 */
export const useAppContext = (): AppContextValue => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

