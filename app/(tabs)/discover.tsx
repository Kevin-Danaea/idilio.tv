import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Discover() {
  return (
    <SafeAreaView className="flex-1 bg-dark-bg items-center justify-center">
      <View className="items-center">
        <Text className="text-2xl font-bold text-white mb-2">Discover</Text>
        <Text className="text-gray-500">Coming Soon</Text>
      </View>
    </SafeAreaView>
  );
}

