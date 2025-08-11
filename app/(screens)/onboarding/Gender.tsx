import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';

import { OnboardingLayout } from '@/components/OnboardingLayout';
import { OnboardingHeader } from '@/components/OnboardingHeader';

// 성별 선택 옵션 데이터
const genderOptions = [
  { id: 'male', label: '남성', icon: '👨' },
  { id: 'female', label: '여성', icon: '👩' },
];

export default function GenderInputScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  
  // ✅ Zustand 스토어 대신 useState를 사용합니다.
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  // 헤더 설정
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <OnboardingHeader
          title=" "
          progress={5 / 7}
          mainTitle="성별을 선택해주세요."
          mainSubtitle="맞춤형 운동 프로그램을 위해 성별을 선택해주세요."
        />
      ),
    });
  }, [navigation]);

  // '다음' 버튼 클릭 시 다음 화면으로 이동
  const handleNextPress = () => {
    if (selectedGender) {
      // TODO: 나중에 이 부분에서 Zustand 스토어에 selectedGender 값을 저장합니다.
      // 예: useOnboardingStore.getState().setGender(selectedGender);
      router.push('/onboarding/Goal'); // 다음 화면 경로
    }
  };

  return (
    <OnboardingLayout
      onNext={handleNextPress}
      nextDisabled={!selectedGender}
      // '건너뛰기'가 없으므로 onSkip prop은 전달하지 않습니다.
    >
      <View style={styles.contentContainer}>
        <View style={styles.cardContainer}>
          {genderOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.card,
                selectedGender === option.id && styles.selectedCard,
              ]}
              onPress={() => setSelectedGender(option.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.cardIcon}>{option.icon}</Text>
              <Text style={styles.cardLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </OnboardingLayout>
  );
}

// 스타일은 이전과 동일합니다.
const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 40
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  selectedCard: {
    borderColor: '#8A8DF3',
    backgroundColor: '#F7F7FF',
  },
  cardIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});