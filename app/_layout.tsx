import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { useEffect } from 'react';
import { loadFonts } from '../fonts';
import { Provider } from 'react-redux';
import store from '../store/store';

export default function Layout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    const loadFontsAsync = async () => {
      try {
        await loadFonts();
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    };
    loadFontsAsync();
  }, []);



  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
          },
          headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
          headerShown: false,
        }}
      />
    </Provider>
  );
} 