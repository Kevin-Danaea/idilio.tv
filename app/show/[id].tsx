import React from 'react';
import { View, Text, ScrollView, Image, Pressable, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useShowDetails } from '../../hooks/useContent';
import { ArrowLeft, Share2, Heart, PlayCircle, Lock } from 'lucide-react-native';

export default function ShowDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { show, episodes, loading } = useShowDetails(id);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-dark-bg" />
    );
  }

  if (!show) {
    return (
      <SafeAreaView className="flex-1 bg-dark-bg items-center justify-center p-4">
        <Text className="text-white mb-4">Show not found</Text>
        <Pressable onPress={() => router.back()}>
          <Text className="text-brand-500">Go Back</Text>
        </Pressable>
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
        {/* Sticky Header with Back Button */}
        <View className="absolute top-0 left-0 right-0 z-20 p-4 flex-row justify-between items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
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
            source={{ uri: show.banner_url }}
            className="w-full h-full"
            style={{ resizeMode: 'cover' }}
          />
          <View className="absolute bottom-0 left-0 right-0 h-32 bg-dark-bg" />
        </View>

        <View className="px-4 -mt-12 relative z-10">
          {/* Title & Stats */}
          <Text className="text-2xl font-bold mb-2 leading-tight text-white">{show.title}</Text>
          <View className="flex-row items-center flex-wrap gap-3 mb-4">
            <Text className="text-xs text-brand-500 font-semibold">{show.status}</Text>
            <Text className="text-xs text-gray-400">{show.release_year}</Text>
            <Text className="text-xs text-gray-400">{show.total_episodes} Episodes</Text>
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
            {episodes.map((ep) => (
              <Pressable
                key={ep.id}
                className="flex-row gap-3 p-2 rounded-lg bg-dark-card"
              >
                <View className="relative w-28 bg-gray-800 rounded overflow-hidden" style={{ aspectRatio: 16/9 }}>
                  <Image
                    source={{ uri: ep.thumbnail_url }}
                    className="w-full h-full"
                    style={{ resizeMode: 'cover', opacity: 0.8 }}
                  />
                  {!ep.is_free && (
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
                    <Text className={`text-sm font-medium flex-1 ${ep.is_free ? 'text-white' : 'text-gray-400'}`} numberOfLines={2}>
                      {ep.title}
                    </Text>
                    {!ep.is_free && (
                      <View className="px-1 rounded border border-brand-900 bg-brand-950/50">
                        <Text className="text-[10px] text-brand-400">VIP</Text>
                      </View>
                    )}
                  </View>
                  <Text className="text-xs text-gray-500 mt-1">
                    {Math.floor(ep.duration_seconds / 60)}m {ep.duration_seconds % 60}s
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

