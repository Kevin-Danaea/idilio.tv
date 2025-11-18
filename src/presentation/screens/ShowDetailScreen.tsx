import React from 'react';
import { View, Text, ScrollView, Image, Pressable, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppContext } from '../providers/AppProvider';
import { useShowDetails } from '../hooks/useShowDetails';
import { EpisodeItem } from '../components/molecules/EpisodeItem';
import { Badge } from '../components/atoms/Badge';
import { ArrowLeft, Share2, Heart, PlayCircle } from 'lucide-react-native';

/**
 * Pantalla: ShowDetail
 * Pantalla que muestra los detalles completos de un show
 * 
 * Principio SRP: Responsabilidad única de mostrar detalles de un show
 */
export const ShowDetailScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getShowDetailsUseCase } = useAppContext();
  const { show, episodes, loading, error } = useShowDetails(id, getShowDetailsUseCase);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-dark-bg" />
    );
  }

  if (error || !show) {
    return (
      <SafeAreaView className="flex-1 bg-dark-bg items-center justify-center p-4">
        <Text className="text-white mb-4">
          {error?.message || 'Show not found'}
        </Text>
        <Button onPress={() => router.back()} variant="primary">
          Go Back
        </Button>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-dark-bg">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Sticky Header */}
        <View
          className="absolute top-0 left-0 right-0 z-20 p-4 flex-row justify-between items-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        >
          <Pressable
            onPress={() => router.back()}
            className="p-2 rounded-full bg-black/40"
            style={({ pressed }) => ({
              transform: [{ scale: pressed ? 0.9 : 1 }],
            })}
          >
            <ArrowLeft size={20} color="white" />
          </Pressable>
          <View className="flex-row gap-3">
            <Pressable
              className="p-2 rounded-full bg-black/40"
              style={({ pressed }) => ({
                transform: [{ scale: pressed ? 0.9 : 1 }],
              })}
            >
              <Heart size={20} color="white" />
            </Pressable>
            <Pressable
              className="p-2 rounded-full bg-black/40"
              style={({ pressed }) => ({
                transform: [{ scale: pressed ? 0.9 : 1 }],
              })}
            >
              <Share2 size={20} color="white" />
            </Pressable>
          </View>
        </View>

        {/* Header Image */}
        <View className="relative w-full" style={{ aspectRatio: 16/9 }}>
          <Image
            source={{ uri: show.bannerUrl }}
            className="w-full h-full"
            style={{ resizeMode: 'cover' }}
          />
          <View className="absolute bottom-0 left-0 right-0 h-32 bg-dark-bg" />
        </View>

        <View className="px-4 -mt-12 relative z-10">
          {/* Title & Stats */}
          <Text className="text-2xl font-bold mb-2 leading-tight text-white">
            {show.title}
          </Text>
          <View className="flex-row items-center flex-wrap gap-3 mb-4">
            <Badge variant={show.status === 'Ongoing' ? 'info' : 'success'}>
              {show.status}
            </Badge>
            <Text className="text-xs text-gray-400">{show.releaseYear}</Text>
            <Text className="text-xs text-gray-400">{show.totalEpisodes} Episodes</Text>
            <Text className="text-xs text-gray-400">⭐ {show.rating}</Text>
          </View>

          {/* Tags */}
          <View className="flex-row flex-wrap gap-2 mb-4">
            {show.tags.map(tag => (
              <View key={tag} className="px-2 py-1 bg-dark-surface rounded border border-white/5">
                <Text className="text-xs text-gray-300">{tag}</Text>
              </View>
            ))}
          </View>

          {/* Description */}
          <Text className="text-sm text-gray-300 leading-relaxed mb-6">
            {show.description}
          </Text>

          {/* Action Button */}
          <Pressable className="w-full bg-brand-600 py-3 rounded-lg mb-8 flex-row items-center justify-center gap-2">
            <PlayCircle size={20} fill="white" color="white" />
            <Text className="text-white font-bold">Resume Watching</Text>
          </Pressable>

          {/* Episodes List */}
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="font-bold text-lg text-white">Episodes</Text>
            <Text className="text-xs text-gray-500">1-{episodes.length}</Text>
          </View>

          <View className="gap-3">
            {episodes.map((episode) => (
              <EpisodeItem key={episode.id} episode={episode} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

