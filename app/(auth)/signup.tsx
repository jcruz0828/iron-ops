import { View, Text, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router';
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

export default function SignUp() {
  return (
    <StyledKeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-carbon-black"
    >
      <Stack.Screen options={{ headerShown: false }} />

      <StyledMotiView 
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500 }}
        className="flex-1 px-6 pt-16"
      >
        <StyledTouchableOpacity 
          onPress={() => router.back()}
          className="mb-8"
        >
          <Ionicons name="arrow-back" size={24} color="#F5F5F5" />
        </StyledTouchableOpacity>

        <StyledText className="text-ghost-white text-4xl font-headline font-bold mb-2">
          Join Iron Ops
        </StyledText>
        
        <StyledText className="text-steel-gray font-subheading text-base mb-12">
          Create your account to start your fitness journey
        </StyledText>

        <StyledView className="space-y-6 mb-8">
          <StyledView>
            <StyledText className="text-ghost-white font-subheading mb-2 text-sm">
              FULL NAME
            </StyledText>
            <StyledTextInput
              placeholder="Enter your full name"
              placeholderTextColor="#707070"
              className="bg-charcoal-gray text-ghost-white px-4 py-4 rounded-xl font-body"
              autoCapitalize="words"
            />
          </StyledView>

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
              placeholder="Create a strong password"
              placeholderTextColor="#707070"
              className="bg-charcoal-gray text-ghost-white px-4 py-4 rounded-xl font-body"
              secureTextEntry
            />
          </StyledView>

          <StyledView>
            <StyledText className="text-ghost-white font-subheading mb-2 text-sm">
              CONFIRM PASSWORD
            </StyledText>
            <StyledTextInput
              placeholder="Confirm your password"
              placeholderTextColor="#707070"
              className="bg-charcoal-gray text-ghost-white px-4 py-4 rounded-xl font-body"
              secureTextEntry
            />
          </StyledView>
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
            Create Account
          </StyledText>
        </StyledMotiPressable>

        <StyledMotiPressable 
          onPress={() => router.push('/(auth)/login')}
          className="items-center"
          animate={({ pressed }) => {
            'worklet';
            return {
              scale: pressed ? 0.98 : 1,
            };
          }}
        >
          <StyledText className="text-steel-gray font-subheading">
            Already have an account? <StyledText className="text-bright-orange font-bold">Login</StyledText>
          </StyledText>
        </StyledMotiPressable>
      </StyledMotiView>
    </StyledKeyboardAvoidingView>
  );
} 