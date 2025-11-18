import React from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { Category, Show } from '../types';
import { ShowCard } from './ShowCard';
import { ChevronRight } from 'lucide-react-native';

interface CategoryRowProps {
  category: Category;
  onShowClick: (show: Show) => void;
}

const CARD_WIDTH = 112; // w-28 = 112px
const CARD_SPACING = 12; // space-x-3 = 12px
const HORIZONTAL_PADDING = 16; // px-4 = 16px

export const CategoryRow: React.FC<CategoryRowProps> = ({ category, onShowClick }) => {
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
        <Pressable className="flex-row items-center">
          <Text className="text-xs text-brand-500">View All </Text>
          <ChevronRight size={14} color="#e11d48" />
        </Pressable>
      </View>
      
      {/* Horizontal Scroll Container with FlatList */}
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

