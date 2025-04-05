import * as Font from 'expo-font';

export const loadFonts = async () => {
  const fonts = {
    'Montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
    'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Inter': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-Light': require('./assets/fonts/Inter-Light.ttf'),
    'SpaceMono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    'SpaceMono-Bold': require('./assets/fonts/SpaceMono-Bold.ttf'),
  };

  try {
    // Load fonts one at a time
    for (const [fontName, fontFile] of Object.entries(fonts)) {
      try {
        await Font.loadAsync({
          [fontName]: fontFile
        });
        //console.log(`Successfully loaded font: ${fontName}`);
      } catch (error) {
        console.error(`Failed to load font ${fontName}:`, error);
        // Continue loading other fonts even if one fails
      }
    }
  } catch (error) {
    console.error('Error in loadFonts:', error);
    throw error;
  }
}; 