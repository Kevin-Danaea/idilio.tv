import React, { useCallback } from 'react';
import { View, Text, ScrollView, Image, Pressable, ActivityIndicator, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useCatalog } from '../../hooks/useContent';
import { CategoryRow } from '../../components/CategoryRow';
import { Show } from '../../types';
import { Play, Plus } from 'lucide-react-native';

export default function Home() {
  const { categories, loading } = useCatalog();
  const router = useRouter();

  const handleShowClick = useCallback((show: Show) => {
    router.push(`/show/${show.id}`);
  }, [router]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-dark-bg">
        <ActivityIndicator size="large" color="#e11d48" />
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
        {/* Hero Section */}
        {featuredShow && (
          <View className="relative w-full mb-6" style={{ height: 400 }}>
            <Image
              source={{ uri: featuredShow.poster_url }}
              className="w-full h-full"
              style={{ resizeMode: 'cover' }}
            />
            <View className="absolute inset-0 bg-black/30" />
            <View className="absolute bottom-0 left-0 right-0 h-32 bg-dark-bg" />
            <View className="absolute bottom-0 left-0 right-0 p-6 items-center">
              <View className="flex-row flex-wrap gap-2 mb-2 justify-center">
                {featuredShow.tags.slice(0, 3).map(tag => (
                  <View key={tag} className="bg-white/20 px-2 py-1 rounded">
                    <Text className="text-xs text-white">{tag}</Text>
                  </View>
                ))}
              </View>
              <Text className="text-3xl font-extrabold text-white mb-2 text-center">
                {featuredShow.title}
              </Text>
              <Text className="text-sm text-gray-200 mb-4 text-center max-w-md" numberOfLines={2}>
                {featuredShow.description}
              </Text>
              
              <View className="flex-row gap-4 w-full max-w-sm justify-center">
                <Pressable
                  onPress={() => handleShowClick(featuredShow)}
                  className="flex-1 bg-brand-600 py-3 rounded-lg flex-row items-center justify-center gap-2"
                  style={({ pressed }) => ({
                    transform: [{ scale: pressed ? 0.95 : 1 }],
                  })}
                >
                  <Play size={18} fill="white" color="white" />
                  <Text className="text-white font-bold">Play</Text>
                </Pressable>
                <Pressable
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
        )}

        {/* Categories */}
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
}

