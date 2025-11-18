import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { Category } from '../../../domain/entities/Category';
import { Show } from '../../../domain/entities/Show';
import { ShowCard } from '../molecules/ShowCard';
import { ChevronRight } from 'lucide-react-native';

interface CategoryRowProps {
  category: Category;
  onShowClick: (show: Show) => void;
  onViewAllClick?: () => void;
}

const CARD_WIDTH = 112;
const CARD_SPACING = 12;
const HORIZONTAL_PADDING = 16;

/**
 * Organism: CategoryRow
 * Componente complejo que muestra una fila de categoría con carrusel de shows
 * 
 * Principio SRP: Responsabilidad única de mostrar una categoría con sus shows
 * Principio OCP: Extensible mediante props sin modificar código existente
 */
export const CategoryRow: React.FC<CategoryRowProps> = ({
  category,
  onShowClick,
  onViewAllClick,
}) => {
  const snapInterval = CARD_WIDTH + CARD_SPACING;

  const renderShowCard = ({ item }: { item: Show }) => (
    <View style={{ marginRight: CARD_SPACING }}>
      <ShowCard show={item} onPress={onShowClick} />
    </View>
  );

  return (
    <View className="mb-8">
      <View className="flex-row items-center justify-between px-4 mb-3">
        <Text className="text-lg font-bold text-white">{category.title}</Text>
        <Pressable onPress={onViewAllClick} className="flex-row items-center">
          <Text className="text-xs text-brand-500">View All </Text>
          <ChevronRight size={14} color="#e11d48" />
        </Pressable>
      </View>
      
      <FlatList
        data={category.shows}
        renderItem={renderShowCard}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: HORIZONTAL_PADDING,
          paddingBottom: 16,
        }}
        snapToInterval={snapInterval}
        decelerationRate="fast"
        snapToAlignment="start"
        pagingEnabled={false}
        getItemLayout={(data, index) => ({
          length: CARD_WIDTH + CARD_SPACING,
          offset: (CARD_WIDTH + CARD_SPACING) * index,
          index,
        })}
        ListFooterComponent={() => <View style={{ width: CARD_SPACING }} />}
      />
    </View>
  );
};

