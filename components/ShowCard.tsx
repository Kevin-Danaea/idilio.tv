import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Show } from '../types';
import { Play } from 'lucide-react-native';

interface ShowCardProps {
  show: Show;
  onPress: (show: Show) => void;
  variant?: 'standard' | 'featured';
}

export const ShowCard: React.FC<ShowCardProps> = ({ show, onPress, variant = 'standard' }) => {
  const cardWidth = variant === 'featured' ? 160 : 112; // w-40 = 160px, w-28 = 112px

  return (
    <Pressable
      onPress={() => onPress(show)}
      className={`relative flex-shrink-0 ${variant === 'featured' ? 'w-40' : 'w-28'}`}
      style={({ pressed }) => ({
        transform: [{ scale: pressed ? 0.95 : 1 }],
      })}
    >
      <View className="relative rounded-lg overflow-hidden bg-dark-card shadow-lg" style={{ aspectRatio: 2/3 }}>
        <Image
          source={{ uri: show.poster_url }}
          className="w-full h-full"
          style={{ resizeMode: 'cover' }}
        />
        
        {/* Status Badge */}
        <View className="absolute top-1 right-1">
          <View className={`px-1.5 py-0.5 rounded ${show.status === 'Ongoing' ? 'bg-blue-600' : 'bg-green-600'}`}>
            <Text className="text-[10px] font-bold text-white">{show.status}</Text>
          </View>
        </View>
        
        {/* Gradient Overlay */}
        <View className="absolute inset-0 bg-black/50" style={{ opacity: 0.7 }} />
        <View className="absolute bottom-0 left-0 right-0 h-20 bg-black/80" />
        
        {/* Bottom Info */}
        <View className="absolute bottom-0 left-0 right-0 p-2">
          <Text className="text-xs font-semibold text-white leading-tight" numberOfLines={2}>
            {show.title}
          </Text>
          <View className="flex-row items-center justify-between mt-1">
            <Text className="text-[10px] text-gray-300">⭐ {show.rating}</Text>
            <Text className="text-[10px] text-gray-300">{show.total_episodes} eps</Text>
          </View>
        </View>

        {/* Play Icon Overlay */}
        <View className="absolute inset-0 items-center justify-center opacity-0">
          <View className="bg-brand-600 rounded-full p-2 shadow-lg">
            <Play size={16} fill="white" color="white" />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

