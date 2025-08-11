// (screens)/onboarding/HealthIssueInputScreen.tsx (새 파일)

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { OnboardingLayout } from '@/components/OnboardingLayout';
import { OnboardingHeader } from '@/components/OnboardingHeader';

const HEALTH_ISSUE_OPTIONS = [
  { key: 'back', iconName: 'body-outline', label: '허리', description: '허리 통증이나 불편함이 있어요.' },
  { key: 'knee', iconName: 'body-outline', label: '무릎', description: '무릎 통증이나 불편함이 있어요.' },
  { key: 'ankle', iconName: 'body-outline', label: '발목', description: '발목 통증이나 불편함이 있어요.' },
  { key: 'neck', iconName: 'body-outline', label: '목', description: '목 통증이나 불편함이 있어요.' },
  { key: 'wrist', iconName: 'body-outline', label: '손목', description: '손목 통증이나 불편함이 있어요.' },
  // ... 등등 나머지 옵션들 추가
  { key: 'none', iconName: 'checkmark-circle-outline', label: '없음', description: '건강 이슈가 없어요.' },
] as const;

type IssueKey = typeof HEALTH_ISSUE_OPTIONS[number]['key'];

export default function HealthIssueInputScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [selectedIssues, setSelectedIssues] = useState<IssueKey[]>([]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <OnboardingHeader
          title=" "
          progress={11 / 12}
          mainTitle="건강 이슈가 있나요?"
          mainSubtitle="운동 시 주의해야 할 신체 부위를 선택해주세요. 중복 선택이 가능해요."
        />
      ),
    });
  }, [navigation]);

  const handleToggleIssue = (key: IssueKey) => {
    setSelectedIssues((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleSelectAll = () => {
    // '없음'을 제외하고 전체 선택
    const allKeys = HEALTH_ISSUE_OPTIONS.map(opt => opt.key).filter(k => k !== 'none');
    if (selectedIssues.length === allKeys.length) {
      setSelectedIssues([]);
    } else {
      setSelectedIssues(allKeys);
    }
  };

  const handleNextPress = () => {
    if (selectedIssues.length > 0) {
      // TODO: 스토어에 selectedIssues 배열 저장
      router.push('/onboarding/Referral');
    }
  };

  return (
    <OnboardingLayout
      onNext={handleNextPress}
      nextDisabled={selectedIssues.length === 0}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity style={styles.selectAllButton} onPress={handleSelectAll}>
          <AntDesign name="checkcircleo" size={16} color="#666" />
          <Text style={styles.selectAllText}>전체선택</Text>
        </TouchableOpacity>
        <View style={styles.optionsContainer}>
          {HEALTH_ISSUE_OPTIONS.map((option) => (
            <TouchableOpacity key={option.key} style={[styles.optionButton, selectedIssues.includes(option.key) && styles.selectedOptionButton]} onPress={() => handleToggleIssue(option.key)}>
              <Ionicons name={option.iconName as any} size={24} color={selectedIssues.includes(option.key) ? '#8A8DF3' : '#555'} style={styles.icon} />
              <View style={styles.textContainer}>
                <Text style={[styles.optionLabel, selectedIssues.includes(option.key) && styles.selectedOptionText]}>{option.label}</Text>
                <Text style={[styles.optionDescription, selectedIssues.includes(option.key) && styles.selectedOptionText]}>{option.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </OnboardingLayout>
  );
}

// JobInputScreen과 동일한 스타일을 사용합니다.
const styles = StyleSheet.create({
  contentContainer: { paddingTop: 40 },
  selectAllButton: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginBottom: 16 },
  selectAllText: { color: '#666', fontSize: 14, fontWeight: '500', marginLeft: 4 },
  optionsContainer: { gap: 12 },
  optionButton: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20 },
  selectedOptionButton: { borderColor: '#8A8DF3', backgroundColor: '#F7F7FF' },
  icon: { marginRight: 16 },
  textContainer: { flex: 1 },
  optionLabel: { color: '#333', fontSize: 16, fontWeight: '700', marginBottom: 4 },
  optionDescription: { color: '#666', fontSize: 13, fontWeight: '400' },
  selectedOptionText: { color: '#8A8DF3' },
});