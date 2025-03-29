import React from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { styled } from 'nativewind';
import { MotiView } from 'moti';
import { MotiPressable } from 'moti/interactions';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledMotiPressable = styled(MotiPressable);
const StyledMotiView = styled(MotiView);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function Login() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <StyledKeyboardAvoidingView 
        className="flex-1 bg-carbon-black"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <StyledMotiView 
          className="flex-1 px-6 pt-12"
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 350 }}
        >
          <StyledTouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center rounded-full bg-carbon-black mb-6"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </StyledTouchableOpacity>

          <StyledText className="text-4xl font-bold text-white mb-2 font-montserrat">
            Welcome back
          </StyledText>
          <StyledText className="text-gray-400 text-lg mb-12">
            Sign in to continue
          </StyledText>

          <StyledView className="space-y-6 mb-8 mt-12">
            <StyledView>
              <StyledText className="text-ghost-white font-subheading mb-2 text-sm">
                EMAIL
              </StyledText>
              <StyledTextInput
                placeholder="your@email.com"
                placeholderTextColor="#707070"
                className="bg-charcoal-gray text-ghost-white px-4 py-4 rounded-xl font-body"
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </StyledView>
            
            <StyledView>
              <StyledText className="text-ghost-white font-subheading mb-2 text-sm">
                PASSWORD
              </StyledText>
              <StyledTextInput
                placeholder="Enter your password"
                placeholderTextColor="#707070"
                className="bg-charcoal-gray text-ghost-white px-4 py-4 rounded-xl font-body"
                secureTextEntry
              />
            </StyledView>

            <StyledMotiPressable
              className="items-end"
              onPress={() => {}}
            >
              <StyledText className="text-bright-orange font-subheading text-sm">
                Forgot Password?
              </StyledText>
            </StyledMotiPressable>
          </StyledView>

          <StyledMotiPressable 
            className="bg-bright-orange py-4 rounded-xl mb-6"
            onPress={() => {}}
            animate={({ pressed }) => {
              'worklet';
              return {
                scale: pressed ? 0.98 : 1,
                opacity: pressed ? 0.9 : 1,
              };
            }}
            transition={{ type: 'timing', duration: 150 }}
          >
            <StyledText className="text-carbon-black text-center font-headline font-bold text-lg">
              Login
            </StyledText>
          </StyledMotiPressable>

          <StyledMotiPressable 
            onPress={() => router.push('/(auth)/signup')}
            className="items-center"
            animate={({ pressed }) => {
              'worklet';
              return {
                scale: pressed ? 0.98 : 1,
              };
            }}
          >
            <StyledText className="text-steel-gray font-subheading">
              Don't have an account? <StyledText className="text-bright-orange font-bold">Sign Up</StyledText>
            </StyledText>
          </StyledMotiPressable>
        </StyledMotiView>
      </StyledKeyboardAvoidingView>
    </>
  );
} 