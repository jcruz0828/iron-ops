import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { Stack, router } from 'expo-router';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImageBackground = styled(ImageBackground);

export default function AIIntegration() {
  return (
    <StyledView className="flex-1 bg-[#0D0D0D]">
      <Stack.Screen options={{ headerShown: false, title: 'AI Integration' }} />
      <StyledImageBackground
        source={require('../../assets/images/ai-bg.png')}
        resizeMode="cover"
        className="h-[92%] w-full mt-12"
      >
        {/* 🔥 Header Content at the Top */}
        <StyledView className="pt-16 px-6 items-center">
          <StyledText className="text-3xl font-headline text-ghost-white text-center mb-2">
            Unlock AI-Powered Fitness
          </StyledText>
          <StyledText className="text-base text-steel-gray font-body text-center leading-relaxed">
            Get custom workouts, smart tracking, and next-gen results. Your body, upgraded by AI.
          </StyledText>
        </StyledView>

        {/* 🔘 Buttons at the Bottom */}
        <StyledView className="flex-1 p-6 justify-end mb-12">
          <StyledTouchableOpacity
            onPress={() => router.replace('/(tabs)/home')}
            className="bg-bright-orange py-4 rounded-2xl mb-4"
          >
            <StyledText className="text-carbon-black text-center font-headline font-bold text-lg">
              Try It Out
            </StyledText>
          </StyledTouchableOpacity>

          <StyledTouchableOpacity
            onPress={() => router.replace('/(tabs)/home')}
            className="border border-bright-orange py-4 rounded-2xl"
          >
            <StyledText className="text-bright-orange text-center font-headline font-bold text-lg">
              Continue Without
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledImageBackground>
    </StyledView>
  );
}
