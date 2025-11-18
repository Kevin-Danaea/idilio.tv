import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Show } from '../../../domain/entities/Show';
import { Play, Plus } from 'lucide-react-native';

interface HeroSectionProps {
  show: Show;
  onPlayPress: (show: Show) => void;
  onAddToListPress?: (show: Show) => void;
}

/**
 * Organism: HeroSection
 * Componente complejo que muestra el show destacado en la parte superior
 * 
 * Principio SRP: Responsabilidad única de mostrar el hero section
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  show,
  onPlayPress,
  onAddToListPress,
}) => {
  return (
    <View className="relative w-full mb-6" style={{ height: 400 }}>
      <Image
        source={{ uri: show.bannerUrl }}
        style={{ 
          width: '100%', 
          height: '100%',
          resizeMode: 'cover',
        }}
      />
      <View className="absolute inset-0 bg-black/30" />
      <View className="absolute bottom-0 left-0 right-0 h-32 bg-dark-bg" />
      <View className="absolute bottom-0 left-0 right-0 p-6 items-center">
        <View className="flex-row flex-wrap gap-2 mb-2 justify-center">
          {show.tags.slice(0, 3).map(tag => (
            <View key={tag} className="bg-white/20 px-2 py-1 rounded">
              <Text className="text-xs text-white">{tag}</Text>
            </View>
          ))}
        </View>
        <Text className="text-3xl font-extrabold text-white mb-2 text-center">
          {show.title}
        </Text>
        <Text className="text-sm text-gray-200 mb-4 text-center max-w-md" numberOfLines={2}>
          {show.description}
        </Text>
        
        <View className="flex-row gap-4 w-full max-w-sm justify-center">
          <Pressable
            onPress={() => onPlayPress(show)}
            className="flex-1 bg-brand-600 py-3 rounded-lg flex-row items-center justify-center gap-2"
            style={({ pressed }) => ({
              transform: [{ scale: pressed ? 0.95 : 1 }],
            })}
          >
            <Play size={18} fill="white" color="white" />
            <Text className="text-white font-bold">Play</Text>
          </Pressable>
          <Pressable
            onPress={() => onAddToListPress?.(show)}
            className="flex-1 bg-white/10 border border-white/20 py-3 rounded-lg flex-row items-center justify-center gap-2"
            style={({ pressed }) => ({
              transform: [{ scale: pressed ? 0.95 : 1 }],
            })}
          >
            <Plus size={18} color="white" />
            <Text className="text-white font-bold">My List</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

