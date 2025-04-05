import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { styled } from 'nativewind';
import { useDispatch } from 'react-redux';
import { MotiView } from 'moti';
import ProgressBar from '../../components/ProgressBar';
import { setBirthDate, setSex, setWeight, setFitnessGoals } from '../../store/user/UserSlice';
import * as SecureStore from 'expo-secure-store';
import { TouchableOpacity } from 'react-native';
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledProgressBar = styled(ProgressBar);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledMotiView = styled(MotiView);

const goals = [
  { id: 1, label: 'Weight Loss', emoji: '🏋️‍♂️' },
  { id: 2, label: 'Muscle Gain', emoji: '💪' },
  { id: 3, label: 'Endurance', emoji: '🏃‍♀️' },
  { id: 4, label: 'Flexibility', emoji: '🧘‍♂️' },
  { id: 5, label: 'Cardio Fitness', emoji: '🏃' },
  { id: 6, label: 'Posture Improvement', emoji: '🧍‍♂️' },
  { id: 7, label: 'Rehabilitation', emoji: '🦿' },
  { id: 8, label: 'Sports Performance', emoji: '🏈' },
  { id: 9, label: 'Mental Wellness', emoji: '🧠' },
  { id: 10, label: 'Nutrition', emoji: '🥗' },
  { id: 11, label: 'Overall Health', emoji: '❤️' },
  { id: 12, label: 'Stress Relief', emoji: '😌' },
  { id: 13, label: 'Sleep Quality', emoji: '😴' },
  { id: 14, label: 'Daily Energy', emoji: '⚡️' },
  { id: 15, label: 'Balance & Coordination', emoji: '🩰' },
  { id: 16, label: 'Core Strength', emoji: '🔋' },
];

export default function FitnessGoals() {
  const [selectedGoals, setSelectedGoals] = useState<number[]>([]);
  const { weight, birthday, sex } = useLocalSearchParams();
  const dispatch = useDispatch();

  const toggleGoal = (id: number) => {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((goalId) => goalId !== id) : [...prev, id]
    );
  };

  const handleNext = async () => {
    const token = await SecureStore.getItemAsync('userToken');
    const fitnessData = {
      birthDate: birthday as string,
      weight: [{ value: parseFloat(weight as string), date: new Date().toISOString() }],
      sex: sex as 'M' | 'F',
      fitnessGoals: selectedGoals
        .map((goalId) => goals.find((goal) => goal.id === goalId)?.label)
        .filter((goal) => goal) // Filter out any undefined values
        .map((goal) => goal as string), // Ensure it's treated as a string
    };

    try {
      const response = await fetch('http://192.168.0.11:3000/api/auth/fitness-data', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fitnessData }),
      });
      if (!response.ok) throw new Error('Failed to update profile');
      
      // Dispatch the fitness goals as an array
      dispatch(setSex(fitnessData.sex));
      dispatch(setBirthDate(fitnessData.birthDate));
      dispatch(setWeight(fitnessData.weight));
      dispatch(setFitnessGoals(fitnessData.fitnessGoals)); // Keep this as an array

      router.push('/(auth)/AIIntegration');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <StyledScrollView className="flex-1 bg-carbon-black px-4 pt-6">
      <Stack.Screen options={{ headerShown: false, title: 'Fitness Goals' }} />
      <StyledView className="flex-1 bg-carbon-black px-4 pt-6">
        <ProgressBar  currentStep={2} style="mt-12 mb-6" />
        <StyledText className="text-2xl text-ghost-white font-headline mb-4">
          Select Your Fitness Goals
        </StyledText>

        <ScrollView
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
          showsVerticalScrollIndicator={false}
        >
          {goals.map((goal, index) => {
            const selected = selectedGoals.includes(goal.id);

            return (
              <StyledMotiView
                key={goal.id}
                from={{ opacity: 0, scale: 0.85, translateY: 10 }}
                animate={{ opacity: 1, scale: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  damping: 12,
                  delay: index * 50,
                }}
                className="w-[48%] mb-3"
              >
                <StyledTouchableOpacity
                  onPress={() => toggleGoal(goal.id)}
                  activeOpacity={0.85}
                >
                  <StyledView
                    className={`p-4 rounded-2xl shadow-md transition-all ${
                      selected ? 'bg-bright-orange scale-105' : 'bg-charcoal-gray'
                    }`}
                  >
                    <StyledText className="text-white text-xl mb-1">
                      {goal.emoji}
                    </StyledText>
                    <StyledText className="text-ghost-white font-body text-base">
                      {goal.label}
                    </StyledText>
                  </StyledView>
                </StyledTouchableOpacity>
              </StyledMotiView>
            );
          })}
        </ScrollView>

        <StyledMotiView
          from={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{
            loop: true,
            type: 'timing',
            duration: 1000,
          }}
        >
          <StyledTouchableOpacity
            onPress={handleNext}
            className="bg-bright-orange py-4 rounded-2xl mt-6 mb-12"
          >
            <StyledText className="text-carbon-black text-center font-headline font-bold text-lg">
              Next
            </StyledText>
          </StyledTouchableOpacity>
        </StyledMotiView>
      </StyledView>
    </StyledScrollView>
  );
}
