import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

export default function Profile() {
  return (
    <SafeAreaView className="flex-1 bg-dark-bg items-center justify-center">
      <View className="items-center">
        <Text className="text-2xl font-bold text-white mb-2">My Profile</Text>
        <Text className="text-gray-500">Coming Soon</Text>
      </View>
    </SafeAreaView>
  );
}

