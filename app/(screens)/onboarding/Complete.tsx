// (screens)/onboarding/OnboardingCompleteScreen.tsx

import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { OnboardingLayout } from '@/components/OnboardingLayout';
import { useRouter, useNavigation } from 'expo-router';

export default function OnboardingCompleteScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  // 이 화면에서는 헤더를 숨깁니다.
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleStart = () => {
    // replace를 사용하면 뒤로가기로 온보딩 화면으로 돌아올 수 없습니다.
    router.replace('/(tabs)/Home');
  };

  return (
    <OnboardingLayout
      onNext={handleStart}
      nextDisabled={false} // 항상 활성화
      // 버튼 텍스트를 바꾸고 싶다면 label prop을 사용하면 됩니다 (예: label="시작하기")
    >
      <View style={styles.contentContainer}>
        <Text style={styles.emoji}>😌</Text>
        <Text style={styles.title}>수고하셨어요!</Text>
        <Text style={styles.subtitle}>
          저와 함께 앞으로 즐겁게 운동을 해봐요. {'\n'}
          제가 OO님의 운동을 케어해드릴 수 있도록, {'\n'}
          알림 허용과 카메라 접근 권한을 허용해주세요.
        </Text>
      </View>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});