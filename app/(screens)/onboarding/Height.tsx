import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter, useNavigation } from 'expo-router'; // useNavigation 추가
import { useOnboardingStore } from '@/api/store/useOnboardingStore';

import { OnboardingHeader } from '@/components/OnboardingHeader';
import { OnboardingLayout } from '@/components/OnboardingLayout';

export default function HeightInputScreen() {
  const router = useRouter();
  const navigation = useNavigation(); // navigation 훅 사용
  const heightCm = useOnboardingStore((s) => s.heightCm);
  const setHeight = useOnboardingStore((s) => s.setHeight);
  const [inputHeight, setInputHeight] = useState(heightCm ? String(heightCm) : '');
  
  // 헤더 설정
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <OnboardingHeader
          title=" "
          progress={3 / 7} // 진행률 업데이트
          mainTitle="키를 알려주세요."
          mainSubtitle="맞춤형 운동 프로그램을 위해 키를 입력해주세요."
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    setInputHeight(heightCm ? String(heightCm) : '');
  }, [heightCm]);

  const handleInputChange = (text: string) => {
    const numericValue = text.replace(/[^0-9.]/g, ''); // 소수점도 허용하도록 수정
    setInputHeight(numericValue);
  };

  const handleNextPress = () => {
    const parsedHeight = parseFloat(inputHeight);
    if (!isNaN(parsedHeight) && parsedHeight > 0) {
      setHeight(parsedHeight);
      router.push('/onboarding/Weight');
    }
  };

  const handleSkip = () => {
    router.push('/onboarding/Weight');
  };

  const isButtonDisabled = inputHeight.trim() === '' || parseFloat(inputHeight) <= 0;

  return (
    <OnboardingLayout
      onNext={handleNextPress}
      onSkip={handleSkip}
      nextDisabled={isButtonDisabled}
    >
      {/* 이제 컨텐츠는 입력창 부분에만 집중합니다. */}
      <View style={styles.contentContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholderTextColor="#999"
            value={inputHeight}
            onChangeText={handleInputChange}
            maxLength={5}
            autoFocus={true}
            keyboardType="numeric" // 숫자 키보드를 사용하도록 설정
          />
          <Text style={styles.unit}>cm</Text>
        </View>
      </View>
    </OnboardingLayout>
  );
}

// ✅ 필요한 스타일만 남기고 정리합니다.
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end', // 'cm' 텍스트와 밑줄 정렬을 위해 'flex-end'로 변경
    justifyContent: 'center',
  },
  input: {
    width: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 24, // 폰트 크기 조절
    fontWeight: '700', // 폰트 두께 조절
    paddingVertical: 8,
    color: '#000',
    textAlign: 'center',
  },
  unit: {
    marginLeft: 8,
    color: '#333',
    fontSize: 20,
    fontWeight: '500',
    paddingBottom: 8, // input과 세로 정렬을 맞추기 위한 패딩
  },
});