import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Stack } from 'expo-router';
import { styled } from 'nativewind';
import { MotiView } from 'moti';
import { MotiPressable } from 'moti/interactions';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImageBackground = styled(ImageBackground);
const StyledMotiPressable = styled(MotiPressable);

export default function Home() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await SecureStore.getItemAsync('userToken');
      SecureStore.deleteItemAsync('userToken');
      if (token) {
       router.replace('/(tabs)/home');
      } else {
        setCheckingAuth(false); // done checking, show landing page
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <StyledImageBackground
      source={require('../assets/images/landing-bg.png')}
      className="flex-1 bg-black"
      resizeMode="contain"
      imageStyle={{ opacity: 0.9 }}
    >
      <Stack.Screen options={{ headerShown: false }} />
      
      <StyledView className="flex-1 px-6 pt-24">
        {/* Title Section */}
        <StyledView className="flex-row items-baseline">
          <StyledText className="text-ghost-white text-5xl font-headline font-bold">
            IRON
          </StyledText>
          <StyledText className="text-bright-orange text-5xl font-headline font-bold ml-3">
            OPS
          </StyledText>
        </StyledView>

        {/* Fitness Text */}
        <StyledText className="text-tactical-yellow text-4xl font-headline font-bold mt-auto mb-4">
          FITNESS
        </StyledText>

        {/* Subtitle */}
        <StyledText className="text-ghost-white text-lg font-subheading font-medium mb-8">
          Achieve your fitness goals with{'\n'}personalized workouts and tracking
        </StyledText>

        {/* Buttons Container */}
        <StyledView className="space-y-4 mb-8">
          <StyledMotiPressable 
            className="border-2 border-bright-orange rounded-lg py-3"
            onPress={() => router.push('/(auth)/login')}
            animate={({ pressed }) => {
              'worklet';
              return {
                scale: pressed ? 0.95 : 1,
                opacity: pressed ? 0.9 : 1,
              };
            }}
            transition={{ type: 'timing', duration: 150 }}
          >
            <StyledText className="text-bright-orange text-center font-headline font-bold text-lg">
              Log In
            </StyledText>
          </StyledMotiPressable>

          <StyledMotiPressable 
            className="bg-bright-orange rounded-lg py-3"
            onPress={() => router.push('/(auth)/signup')}
            animate={({ pressed }) => {
              'worklet';
              return {
                scale: pressed ? 0.95 : 1,
                opacity: pressed ? 0.9 : 1,
              };
            }}
            transition={{ type: 'timing', duration: 150 }}
          >
            <StyledText className="text-carbon-black text-center font-headline font-bold text-lg">
              Sign Up
            </StyledText>
          </StyledMotiPressable>
        </StyledView>
      </StyledView>
    </StyledImageBackground>
  );
} 