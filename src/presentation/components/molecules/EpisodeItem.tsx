import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Episode } from '../../../domain/entities/Episode';
import { Lock, PlayCircle } from 'lucide-react-native';
import { Badge } from '../atoms/Badge';

interface EpisodeItemProps {
  episode: Episode;
  onPress?: (episode: Episode) => void;
}

/**
 * Molecule: EpisodeItem
 * Componente compuesto que muestra información de un episodio
 * 
 * Principio SRP: Responsabilidad única de mostrar información de un episodio
 */
export const EpisodeItem: React.FC<EpisodeItemProps> = ({ episode, onPress }) => {
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <Pressable
      onPress={() => onPress?.(episode)}
      className="flex-row gap-3 p-2 rounded-lg bg-dark-card"
    >
      <View className="relative w-28 bg-gray-800 rounded overflow-hidden" style={{ aspectRatio: 16/9 }}>
        <Image
          source={{ uri: episode.thumbnailUrl }}
          style={{ 
            width: '100%', 
            height: '100%',
            resizeMode: 'cover', 
            opacity: 0.8,
          }}
        />
        {!episode.isFree && (
          <View className="absolute top-1 right-1 bg-black/60 rounded p-0.5">
            <Lock size={10} color="white" />
          </View>
        )}
        <View className="absolute inset-0 items-center justify-center">
          <PlayCircle size={20} color="rgba(255, 255, 255, 0.8)" />
        </View>
      </View>
      <View className="flex-1 justify-center">
        <View className="flex-row justify-between items-start">
          <Text
            className={`text-sm font-medium flex-1 ${episode.isFree ? 'text-white' : 'text-gray-400'}`}
            numberOfLines={2}
          >
            {episode.title}
          </Text>
          {!episode.isFree && (
            <Badge variant="warning" size="sm">VIP</Badge>
          )}
        </View>
        <Text className="text-xs text-gray-500 mt-1">
          {formatDuration(episode.durationSeconds)}
        </Text>
      </View>
    </Pressable>
  );
};

