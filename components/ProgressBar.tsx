import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const StyledView = styled(View);
const StyledText = styled(Text);
const AnimatedView = styled(Animated.View);

const ProgressBar = ({
  currentStep,
  style,
}: {
  currentStep: number;
  style?: string;
}) => {
  const steps = ['Signup', 'Fitness Data', 'Fitness Goals'];
  const progress = useSharedValue(currentStep);

  useEffect(() => {
    progress.value = withTiming(currentStep, { duration: 500 });
  }, [currentStep]);

  return (
    <StyledView className={`flex-row items-center px-2 mb-8 ${style}`}>
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        // Dot scale + background
        const scale = useSharedValue(1);
        useEffect(() => {
          scale.value = withTiming(isActive ? 1.25 : 1, { duration: 300 });
        }, [isActive]);

        const dotStyle = useAnimatedStyle(() => ({
          backgroundColor: isActive || isCompleted ? '#FF6F00' : '#4B5563',
          transform: [{ scale: scale.value }],
        }));

        // Left connector bar
        const leftBarStyle = useAnimatedStyle(() => ({
          width: '100%',
          backgroundColor: index > 0 && index <= progress.value ? '#FF6F00' : '#4B5563',
        }));

        // Right connector bar
        const rightBarStyle = useAnimatedStyle(() => ({
          width: '100%',
          backgroundColor: index < progress.value ? '#FF6F00' : '#4B5563',
        }));

        // Step label color
        const labelClass =
          isActive
            ? 'text-bright-orange font-bold'
            : isCompleted
            ? 'text-ghost-white'
            : 'text-gray-500';

        return (
          <StyledView key={index} className="flex-1 items-center">
            {/* Step Label */}
            <StyledText className={`text-xs font-body mb-2 ${labelClass}`}>
              {step}
            </StyledText>

            {/* Connector Row */}
            <StyledView className="flex-row items-center w-full">
              {/* Left Bar */}
              {index !== 0 && (
                <StyledView className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden mr-1">
                  <AnimatedView className="h-full rounded-full" style={leftBarStyle} />
                </StyledView>
              )}

              {/* Always-rendered Ball */}
              <AnimatedView className="w-5 h-5 rounded-full" style={dotStyle} />

              {/* Right Bar */}
              {index !== steps.length - 1 && (
                <StyledView className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden ml-1">
                  <AnimatedView className="h-full rounded-full" style={rightBarStyle} />
                </StyledView>
              )}
            </StyledView>
          </StyledView>
        );
      })}
    </StyledView>
  );
};

export default ProgressBar;
