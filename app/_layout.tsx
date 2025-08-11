import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StorybookUIRoot from '../.rnstorybook';

export { ErrorBoundary } from 'expo-router';

const SHOW_STORYBOOK = false;

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // 'Pretendard': require('../assets/fonts/Pretendard-Regular.ttf'),
    // 'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.ttf'),
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }

  if (SHOW_STORYBOOK) {
    return <StorybookUIRoot />;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding/index" options={{ headerShown: false }} />
          <Stack.Screen name="auth/Login" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding/AITrainer" options={{ headerShown: true, header: undefined }} />
          <Stack.Screen name="onboarding/Username" options={{ headerShown: true, header: undefined }} />
          <Stack.Screen name="onboarding/Height" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding/Weight" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding/Gender" options={{ headerShown: true, header: undefined }} />
          <Stack.Screen name="onboarding/Goal" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding/FrequencyInputScreen" options={{ headerShown: true, header: undefined }} />
          <Stack.Screen name="onboarding/Level" options={{ headerShown: true, header: undefined }} />
          <Stack.Screen name="onboarding/Referral" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding/Complete" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
