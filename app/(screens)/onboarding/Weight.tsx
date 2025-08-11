import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter, useNavigation } from 'expo-router'; // useNavigation 추가
import { useOnboardingStore } from '@/api/store/useOnboardingStore';

import { OnboardingHeader } from '@/components/OnboardingHeader';
import { OnboardingLayout } from '@/components/OnboardingLayout';

export default function WeightInputScreen() {
  const router = useRouter();
  const navigation = useNavigation(); // navigation 훅 사용
  const weightKg = useOnboardingStore((s) => s.weightKg);
  const setWeight = useOnboardingStore((s) => s.setWeight);
  const [inputWeight, setInputWeight] = useState(weightKg ? String(weightKg) : '');

  // 헤더 설정
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <OnboardingHeader
          title=" "
          progress={4 / 7} // 진행률 업데이트
          mainTitle="몸무게를 알려주세요."
          mainSubtitle="맞춤형 운동 프로그램을 위해 몸무게를 입력해주세요."
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    setInputWeight(weightKg ? String(weightKg) : '');
  }, [weightKg]);

  const handleInputChange = (text: string) => {
    const numericValue = text.replace(/[^0-9.]/g, '');
    setInputWeight(numericValue);
  };

  const handleNextPress = () => {
    const parsedWeight = parseFloat(inputWeight);
    if (!isNaN(parsedWeight) && parsedWeight > 0) {
      setWeight(parsedWeight);
      router.push('/onboarding/Gender');
    }
  };

  const handleSkip = () => {
    router.push('/onboarding/Gender');
  };

  const isButtonDisabled = inputWeight.trim() === '' || parseFloat(inputWeight) <= 0;

  return (
    <OnboardingLayout
      onNext={handleNextPress}
      onSkip={handleSkip}
      nextDisabled={isButtonDisabled}
    >
      <View style={styles.contentContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="몸무게"
            placeholderTextColor="#999"
            value={inputWeight}
            onChangeText={handleInputChange}
            maxLength={5}
            autoFocus={true}
            keyboardType="numeric"
          />
          <Text style={styles.unit}>kg</Text>
        </View>
      </View>
    </OnboardingLayout>
  );
}

// 필요한 스타일만 남기고 정리합니다.
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  input: {
    width: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 24,
    fontWeight: '700',
    paddingVertical: 8,
    color: '#000',
    textAlign: 'center',
  },
  unit: {
    marginLeft: 8,
    color: '#333',
    fontSize: 20,
    fontWeight: '500',
    paddingBottom: 8,
  },
});84