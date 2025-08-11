import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function Index() {
  // 사용자가 온보딩을 완료했는지 여부를 저장할 상태
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const status = await AsyncStorage.getItem('onboardingComplete');
        if (status === 'true') {
          setHasCompletedOnboarding(true);
        } else {
          // 값이 없거나 'false'이면 아직 온보딩을 완료하지 않은 것입니다.
          setHasCompletedOnboarding(false);
        }
      } catch (e) {
        // 에러가 발생하면 일단 온보딩을 완료하지 않은 것으로 처리합니다.
        console.error("Failed to fetch onboarding status", e);
        setHasCompletedOnboarding(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  // 아직 온보딩 상태를 확인하는 중이라면, 로딩 화면을 보여주거나 아무것도 보여주지 않습니다.
  if (hasCompletedOnboarding === null) {
    return <View><Text>Loading...</Text></View>; // 혹은 Splash Screen
  }

  // 온보딩을 완료했다면 -> (tabs) 그룹의 홈 화면으로 이동시킵니다.
  // 오류 메시지가 제안한 대로 경로를 수정합니다.
  if (hasCompletedOnboarding) {
    return <Redirect href="/(tabs)/Home" />;
  } 
  
  // 온보딩을 아직 완료하지 않았다면 -> 온보딩 첫 화면으로 이동시킵니다.
  else {
    // return <Redirect href="/(screens)/auth/Login" />;
    return <Redirect href="/(screens)/onboarding/AITrainer" />;
  }
}
