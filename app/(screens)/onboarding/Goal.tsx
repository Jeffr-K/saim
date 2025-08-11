import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { OnboardingLayout } from '@/components/OnboardingLayout';
import { OnboardingHeader } from '@/components/OnboardingHeader';
import { AntDesign } from '@expo/vector-icons';

const OPTIONS = [
  { key: 'lose_weight', label: '체중 감량' },
  { key: 'gain_muscle', label: '근육 증가' },
  { key: 'stay_fit', label: '건강 관리' },
  { key: 'bulk_up', label: '벌크업' },
] as const;

type GoalKey = typeof OPTIONS[number]['key'];

export default function GoalSelectScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  
  const [selectedGoals, setSelectedGoals] = useState<GoalKey[]>([]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <OnboardingHeader
          title=" "
          progress={6 / 7}
          mainTitle="운동 목표를 선택해주세요."
          mainSubtitle="어떤 목표로 운동을 시작하시나요? 여러 목표를 선택할 수 있어요."
        />
      ),
    });
  }, [navigation]);

  const handleToggleGoal = (key: GoalKey) => {
    setSelectedGoals((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleSelectAll = () => {
    if (selectedGoals.length === OPTIONS.length) {
      setSelectedGoals([]);
    } else {
      setSelectedGoals(OPTIONS.map(opt => opt.key));
    }
  };

  const handleNextPress = () => {
    if (selectedGoals.length > 0) {
      // TODO: 스토어에 selectedGoals 배열 저장
      router.push('/onboarding/FrequencyInputScreen');
    }
  };

  return (
    <OnboardingLayout
      onNext={handleNextPress}
      nextDisabled={selectedGoals.length === 0}
    >
      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.selectAllButton} onPress={handleSelectAll}>
          <AntDesign name="checkcircleo" size={16} color="#666" />
          <Text style={styles.selectAllText}>전체선택</Text>
        </TouchableOpacity>

        <View style={styles.optionsContainer}>
          {OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.optionButton,
                selectedGoals.includes(option.key) && styles.selectedOptionButton,
              ]}
              onPress={() => handleToggleGoal(option.key)}
            >
              <Text style={[
                styles.optionText,
                selectedGoals.includes(option.key) && styles.selectedOptionText,
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 40,
  },
  selectAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  selectAllText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  selectedOptionButton: {
    borderColor: '#8A8DF3',
    backgroundColor: '#F7F7FF',
  },
  optionText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  selectedOptionText: {
    color: '#8A8DF3',
    fontWeight: '700',
  },
});