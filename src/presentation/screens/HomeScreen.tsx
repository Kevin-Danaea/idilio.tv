import React, { useCallback } from 'react';
import { View, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '../providers/AppProvider';
import { useCatalog } from '../hooks/useCatalog';
import { CategoryRow } from '../components/organisms/CategoryRow';
import { HeroSection } from '../components/organisms/HeroSection';
import { Show } from '../../domain/entities/Show';

/**
 * Pantalla: Home
 * Pantalla principal que muestra el catálogo de contenido
 * 
 * Principio SRP: Responsabilidad única de mostrar la pantalla principal
 */
export const HomeScreen: React.FC = () => {
  const router = useRouter();
  const { getCatalogUseCase } = useAppContext();
  const { categories, loading, error } = useCatalog(getCatalogUseCase);

  const handleShowClick = useCallback((show: Show) => {
    router.push(`/show/${show.id}`);
  }, [router]);

  const handleAddToList = useCallback((show: Show) => {
    // TODO: Implementar lógica de agregar a lista
    console.log('Add to list:', show.id);
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-dark-bg">
        <ActivityIndicator size="large" color="#e11d48" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-dark-bg">
        {/* TODO: Crear componente de error */}
        <View>
          {/* Error component */}
        </View>
      </SafeAreaView>
    );
  }

  const featuredShow = categories[0]?.shows[0];

  return (
    <SafeAreaView className="flex-1 bg-dark-bg">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {featuredShow && (
          <HeroSection
            show={featuredShow}
            onPlayPress={handleShowClick}
            onAddToListPress={handleAddToList}
          />
        )}

        <View className="space-y-2">
          {categories.map((category) => (
            <CategoryRow
              key={category.id}
              category={category}
              onShowClick={handleShowClick}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

