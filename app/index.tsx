import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import * as SplashScreen from 'expo-splash-screen';
import { ONBOARDING_STATUS_KEY } from '@/constants/Onboarding';

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const status = await AsyncStorage.getItem(ONBOARDING_STATUS_KEY);

        const hasCompleted = status === 'true';

        const destination = hasCompleted ? '/(tabs)/Home' : '/(screens)/auth/Login';
        
        router.replace(destination);

      } catch (e) {
        console.error("Failed to fetch onboarding status from AsyncStorage", e);
        router.replace('/(screens)/auth/Login');
      } finally {
        SplashScreen.hideAsync();
      }
    };

    checkOnboardingStatus();
  }, [router]);

  return null;
}