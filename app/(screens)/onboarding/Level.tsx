import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { OnboardingLayout } from '@/components/OnboardingLayout';
import { OnboardingHeader } from '@/components/OnboardingHeader';

// 운동 수준 선택 옵션 데이터
const LEVEL_OPTIONS = [
  { 
    key: 'beginner', 
    iconName: 'barbell-outline', 
    label: '입문자', 
    description: '운동을 처음 시작해요' 
  },
  { 
    key: 'novice', 
    iconName: 'ribbon-outline', 
    label: '초급자', 
    description: '운동을 하다가 포기하고 반복해요' 
  },
  { 
    key: 'intermediate', 
    iconName: 'trophy-outline', 
    label: '중급자', 
    description: '운동 자세를 어느정도 알아서, 혼자서도 운동을 꾸준히 해요' 
  },
  { 
    key: 'advanced', 
    iconName: 'star-outline', 
    label: '고급자', 
    description: '나만의 운동 지식이 있어 남에게 운동을 가르쳐 줄 수 있어요' 
  },
] as const;

type LevelKey = typeof LEVEL_OPTIONS[number]['key'];

export default function LevelInputScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  
  const [selectedLevel, setSelectedLevel] = useState<LevelKey | null>(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <OnboardingHeader
          title=" "
          progress={8 / 12} // 전체 온보딩 단계에 맞춰 조절해주세요
          mainTitle="운동 수준을 선택해주세요."
          mainSubtitle="현재 자신의 운동 수준은 어느 정도인가요?"
        />
      ),
    });
  }, [navigation]);

  const handleNextPress = () => {
    if (selectedLevel) {
      // TODO: 스토어에 selectedLevel 값 저장
      router.push('/onboarding/Method');
    }
  };

  return (
    <OnboardingLayout
      onNext={handleNextPress}
      nextDisabled={!selectedLevel}
    >
      <View style={styles.contentContainer}>
        {LEVEL_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.optionButton,
              selectedLevel === option.key && styles.selectedOptionButton,
            ]}
            onPress={() => setSelectedLevel(option.key)}
          >
            <Ionicons 
              name={option.iconName as any} 
              size={24} 
              color={selectedLevel === option.key ? '#8A8DF3' : '#555'}
              style={styles.icon}
            />
            <View style={styles.textContainer}>
              <Text style={[
                styles.optionLabel,
                selectedLevel === option.key && styles.selectedOptionText,
              ]}>
                {option.label}
              </Text>
              <Text style={[
                styles.optionDescription,
                selectedLevel === option.key && styles.selectedOptionText,
              ]}>
                {option.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 40,
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  selectedOptionButton: {
    borderColor: '#8A8DF3',
    backgroundColor: '#F7F7FF',
  },
  icon: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1, // 텍스트가 길어질 경우를 대비
  },
  optionLabel: {
    color: '#333',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  optionDescription: {
    color: '#666',
    fontSize: 13,
    fontWeight: '400',
  },
  selectedOptionText: {
    color: '#8A8DF3',
  },
});