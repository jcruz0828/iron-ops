import { View, Text, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router';
import { styled } from 'nativewind';
import { MotiView } from 'moti';
import { MotiPressable } from 'moti/interactions';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

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

const isValidPassword = (password: string) => {
  // At least 8 characters long
  // Contains at least one uppercase letter
  // Contains at least one lowercase letter
  // Contains at least one number
  // Contains at least one special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      // Validate full name
      if (!formData.fullName.trim()) {
        setError('Full name is required');
        return;
      }

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
      if (!isValidPassword(formData.password)) {
        setError(
          'Password must be at least 8 characters long and contain:\n' +
          '- One uppercase letter\n' +
          '- One lowercase letter\n' +
          '- One number\n' +
          '- One special character (@$!%*?&)'
        );
        return;
      }

      // Validate password confirmation
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      const response = await fetch('http://192.168.0.11:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store the token (you might want to use secure storage in production)
      // await SecureStore.setItemAsync('userToken', data.token);

      // Navigate to the main app
      //router.replace('/(tabs)');
    } catch (err: any) {
      console.log(err);
      setError(err.message || 'An error occurred during registration');
    }
  };

  // Add helper text for password requirements
  const renderPasswordHelp = () => (
    <StyledText className="text-steel-gray font-body text-xs mt-1">
      Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character.
    </StyledText>
  );

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

        {error ? (
          <StyledText className="text-blood-red font-body mb-4">
            {error}
          </StyledText>
        ) : null}

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
              value={formData.fullName}
              onChangeText={(text) => setFormData(prev => ({ ...prev, fullName: text }))}
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
              value={formData.email}
              onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
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
              value={formData.password}
              onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
            />
            {renderPasswordHelp()}
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
              value={formData.confirmPassword}
              onChangeText={(text) => setFormData(prev => ({ ...prev, confirmPassword: text }))}
            />
          </StyledView>
        </StyledView>

        <StyledMotiPressable 
          className="bg-bright-orange py-4 rounded-xl mb-6"
          onPress={handleSignUp}
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