import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Heart, PlayCircle, Share2 } from 'lucide-react-native';
import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge } from '../components/atoms/Badge';
import { Button } from '../components/atoms/Button';
import { EpisodeItem } from '../components/molecules/EpisodeItem';
import { useShowDetails } from '../hooks/useShowDetails';
import { useAppContext } from '../providers/AppProvider';

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
        <View className="relative w-full mb-6" style={{ height: 400 }}>
          <Image
            source={{ uri: show.bannerUrl }}
            style={{ 
              width: '100%', 
              height: '100%',
              resizeMode: 'cover',
            }}
          />
          {/* Title & Stats sobre la imagen */}
          <View className="absolute bottom-0 left-0 right-0 px-4 pb-4">
            <Text 
              className="text-2xl font-bold mb-2 leading-tight text-white"
              style={{
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: { width: 0, height: 2 },
                textShadowRadius: 4,
              }}
            >
              {show.title}
            </Text>
            <View className="flex-row items-center flex-wrap gap-3">
              <Badge variant={show.status === 'Ongoing' ? 'info' : 'success'}>
                {show.status}
              </Badge>
              <Text 
                className="text-xs text-white"
                style={{
                  textShadowColor: 'rgba(0, 0, 0, 0.75)',
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 3,
                }}
              >
                {show.releaseYear}
              </Text>
              <Text 
                className="text-xs text-white"
                style={{
                  textShadowColor: 'rgba(0, 0, 0, 0.75)',
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 3,
                }}
              >
                {show.totalEpisodes} Episodes
              </Text>
              <Text 
                className="text-xs text-white"
                style={{
                  textShadowColor: 'rgba(0, 0, 0, 0.75)',
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 3,
                }}
              >
                ⭐ {show.rating}
              </Text>
            </View>
          </View>
        </View>

        <View className="px-4 -mt-4 relative z-10">

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

