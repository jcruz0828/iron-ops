import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { useEffect } from 'react';
import { loadFonts } from './fonts';

export default function Layout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
        },
        headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
      }}
    />
  );
} 