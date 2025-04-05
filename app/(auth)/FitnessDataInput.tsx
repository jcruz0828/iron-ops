import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { styled } from 'nativewind';
import ProgressBar from '../../components/ProgressBar';
import DateTimePicker from '@react-native-community/datetimepicker';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);
export default function FitnessDataInput() {
  const [weight, setWeight] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [sex, setSex] = useState('');

  const weightNum = parseFloat(weight);
  const isWeightValid =
    /^\d+(\.\d+)?$/.test(weight) && weightNum > 30 && weightNum < 800;
  const isFormValid = isWeightValid && sex && birthday;

  const handleNext = () => {
    if (!isFormValid) {
      Alert.alert('Invalid Input', 'Please check your entries before continuing.');
      return;
    }
    router.push({
      pathname: '/(auth)/FitnessGoals',
      params: {
        weight,
        birthday: birthday.toISOString().split('T')[0],
        sex,
      },
    });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false, title: 'Fitness Data' }} />
      <StyledKeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <StyledView className="flex-1 bg-carbon-black px-6 pt-10 pb-10">
            <ProgressBar currentStep={1} style="mt-12 mb-12" />

            <StyledText className="text-3xl text-ghost-white font-headline font-bold mt-6 mb-3">
              Let’s Personalize Your Plan
            </StyledText>
            <StyledText className="text-steel-gray font-body text-base mb-8">
              Enter a few details so we can tailor your fitness journey.
            </StyledText>

            {/* Weight Input */}
            <StyledView className="mb-6">
              <StyledText className="text-ghost-white mb-2 font-body font-medium text-base">
                Weight (lbs)
              </StyledText>
              <StyledTextInput
                placeholder="e.g. 165"
                placeholderTextColor="#707070"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
                className="bg-charcoal-gray text-ghost-white px-4 py-3 rounded-2xl font-body"
              />
              {!isWeightValid && weight !== '' && (
                <StyledText className="text-blood-red mt-1 text-sm font-body">
                  Please enter a valid weight between 30 and 800 lbs.
                </StyledText>
              )}
            </StyledView>

            {/* Birthday Picker */}
            <StyledView className="mb-6">
              <StyledText className="text-ghost-white mb-2 font-body font-medium text-base">
                Birthday
              </StyledText>
              <StyledTouchableOpacity
                onPress={() => setShowDatePicker(true)}
                className="bg-charcoal-gray rounded-2xl px-4 py-3"
              >
                <StyledText className="text-ghost-white font-body">
                  {birthday.toDateString()}
                </StyledText>
              </StyledTouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={birthday}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) setBirthday(selectedDate);
                  }}
                  textColor="#fff"
                  themeVariant="dark"
                />
              )}
            </StyledView>

            {/* Modern Custom Sex Picker */}
            <StyledView className="mb-10">
              <StyledText className="text-ghost-white mb-3 font-body font-medium text-base">
                Sex
              </StyledText>
              <StyledView className="flex-row gap-3">
                {[
                  { label: 'Male', value: 'M' },
                  { label: 'Female', value: 'F' },
                ].map(({ label, value }) => (
                  <StyledTouchableOpacity
                    key={value}
                    onPress={() => setSex(value)}
                    className={`flex-1 py-3 rounded-full items-center ${
                      sex === value ? 'bg-bright-orange' : 'bg-charcoal-gray'
                    }`}
                    style={styles.shadow}
                  >
                    <StyledText
                      className={`font-body font-medium text-base ${
                        sex === value ? 'text-carbon-black' : 'text-ghost-white'
                      }`}
                    >
                      {label}
                    </StyledText>
                  </StyledTouchableOpacity>
                ))}
              </StyledView>
            </StyledView>

            {/* Submit Button */}
            <StyledTouchableOpacity
              onPress={handleNext}
              disabled={!isFormValid}
              className={`py-4 rounded-full ${
                isFormValid ? 'bg-bright-orange' : 'bg-gray-600'
              }`}
              style={isFormValid ? styles.shadow : {}}
            >
              <StyledText className="text-carbon-black text-center font-headline font-bold text-lg">
                Continue
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </ScrollView>
      </StyledKeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#FF6F00',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
