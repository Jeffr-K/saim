// (screens)/onboarding/MethodInputScreen.tsx (새 파일)

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { OnboardingLayout } from '@/components/OnboardingLayout';
import { OnboardingHeader } from '@/components/OnboardingHeader';

const METHOD_OPTIONS = [
  { key: 'gym', iconName: 'barbell-outline', label: '헬스장에 다님', description: '헬스장에서 운동을 하고 있어요' },
  { key: 'home', iconName: 'home-outline', label: '홈트레이닝', description: '집에서 운동을 하고 있어요' },
  { key: 'gym_plan', iconName: 'trophy-outline', label: '헬스장에 다닐 계획', description: '헬스장에서 운동할 계획이에요' },
  { key: 'home_plan', iconName: 'star-outline', label: '홈트레이닝 계획', description: '집에서 운동할 계획이에요' },
] as const;

type MethodKey = typeof METHOD_OPTIONS[number]['key'];

export default function MethodInputScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [selectedMethods, setSelectedMethods] = useState<MethodKey[]>([]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <OnboardingHeader
          title=" "
          progress={9 / 12}
          mainTitle="운동 방식을 선택해주세요."
          mainSubtitle="어떤 방식으로 운동하고 계신가요? 중복 선택이 가능해요."
        />
      ),
    });
  }, [navigation]);

  const handleToggleMethod = (key: MethodKey) => {
    setSelectedMethods((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleNextPress = () => {
    if (selectedMethods.length > 0) {
      // TODO: 스토어에 selectedMethods 배열 저장
      router.push('/onboarding/Job');
    }
  };

  return (
    <OnboardingLayout
      onNext={handleNextPress}
      nextDisabled={selectedMethods.length === 0}
    >
      <View style={styles.contentContainer}>
        {METHOD_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.optionButton,
              selectedMethods.includes(option.key) && styles.selectedOptionButton,
            ]}
            onPress={() => handleToggleMethod(option.key)}
          >
            <Ionicons
              name={option.iconName as any}
              size={24}
              color={selectedMethods.includes(option.key) ? '#8A8DF3' : '#555'}
              style={styles.icon}
            />
            <View style={styles.textContainer}>
              <Text style={[styles.optionLabel, selectedMethods.includes(option.key) && styles.selectedOptionText]}>{option.label}</Text>
              <Text style={[styles.optionDescription, selectedMethods.includes(option.key) && styles.selectedOptionText]}>{option.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  contentContainer: { paddingTop: 40, gap: 12 },
  optionButton: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20 },
  selectedOptionButton: { borderColor: '#8A8DF3', backgroundColor: '#F7F7FF' },
  icon: { marginRight: 16 },
  textContainer: { flex: 1 },
  optionLabel: { color: '#333', fontSize: 16, fontWeight: '700', marginBottom: 4 },
  optionDescription: { color: '#666', fontSize: 13, fontWeight: '400' },
  selectedOptionText: { color: '#8A8DF3' },
});