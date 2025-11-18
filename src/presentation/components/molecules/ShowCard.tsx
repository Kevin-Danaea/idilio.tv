import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Show } from '../../../domain/entities/Show';
import { Badge } from '../atoms/Badge';

interface ShowCardProps {
  show: Show;
  onPress: (show: Show) => void;
  variant?: 'standard' | 'featured';
}

/**
 * Molecule: ShowCard
 * Componente compuesto que muestra información de un show
 * 
 * Principio SRP: Responsabilidad única de mostrar información de un show
 * Principio OCP: Extensible mediante variant sin modificar código existente
 */
export const ShowCard: React.FC<ShowCardProps> = ({ show, onPress, variant = 'standard' }) => {
  const statusVariant = show.status === 'Ongoing' ? 'info' : 'success';

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
          source={{ uri: show.posterUrl}}
          className="w-full h-full"
          style={{ resizeMode: 'cover' }}
        />
        
        {/* Status Badge */}
        <View className="absolute top-1 right-1">
          <Badge variant={statusVariant}>{show.status}</Badge>
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
            <Text className="text-[10px] text-gray-300">{show.totalEpisodes} eps</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

