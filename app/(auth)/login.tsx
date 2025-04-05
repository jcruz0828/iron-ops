import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { Stack, router } from 'expo-router';
import { styled } from 'nativewind';
import { MotiView } from 'moti';
import { MotiPressable } from 'moti/interactions';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledMotiPressable = styled(MotiPressable);
const StyledMotiView = styled(MotiView);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);
const StyledTouchableOpacity = styled(TouchableOpacity);

// Add these helper functions at the top of the file
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function Login() {
  const dispatch = useDispatch(); // Initialize dispatch
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // Validate email
      if (!formData.email) {
        setError('Email is required');
        return;
      }
      if (!isValidEmail(formData.email)) {
        setError('Please enter a valid email address');
        return;
      }

      // Validate password
      if (!formData.password) {
        setError('Password is required');
        return;
      }
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
      }

      // If validation passes, proceed with API call
      const response = await fetch('http://192.168.0.11:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Dispatch the action to set the user in Redux
      

      // Store the token (you might want to use secure storage in production)
      await SecureStore.setItemAsync('userToken', data.token);

      // Navigate to the main app
      router.replace('/(tabs)/home');
    } catch (err: any) {
      console.log(err);
      console.log(formData);
      setError(err.message || 'An error occurred during login');
    }
  };

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

          {error ? (
            <StyledText className="text-blood-red font-body mb-4">
              {error}
            </StyledText>
          ) : null}

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
                value={formData.email}
                onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
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
                value={formData.password}
                onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
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
            onPress={handleLogin}
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