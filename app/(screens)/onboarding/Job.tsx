// (screens)/onboarding/JobInputScreen.tsx (새 파일)

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { OnboardingLayout } from '@/components/OnboardingLayout';
import { OnboardingHeader } from '@/components/OnboardingHeader';

const JOB_OPTIONS = [
  { key: 'unemployed', iconName: 'barbell-outline', label: '무직', description: '현재 직업이 없어요' },
  { key: 'college_student', iconName: 'school-outline', label: '대학생', description: '대학교에 다니고 있어요' },
  { key: 'student', iconName: 'book-outline', label: '중고등학생', description: '중학교나 고등학교에 다니고 있어요' },
  { key: 'office_worker', iconName: 'briefcase-outline', label: '직장인', description: '회사에 다니고 있어요' },
  { key: 'freelancer', iconName: 'star-outline', label: '프리랜서', description: '자유롭게 일하고 있어요' },
  { key: 'etc', iconName: 'create-outline', label: '기타', description: '기타 직접 입력' },
] as const;

type JobKey = typeof JOB_OPTIONS[number]['key'];

export default function JobInputScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [selectedJobs, setSelectedJobs] = useState<JobKey[]>([]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <OnboardingHeader
          title=" "
          progress={10 / 12}
          mainTitle="직업을 선택해주세요."
          mainSubtitle="현재 직업을 선택해주세요. 맞춤형 운동 계획에 반영됩니다."
        />
      ),
    });
  }, [navigation]);

  const handleToggleJob = (key: JobKey) => {
    setSelectedJobs((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };
  
  const handleSelectAll = () => {
    if (selectedJobs.length === JOB_OPTIONS.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(JOB_OPTIONS.map(opt => opt.key));
    }
  };

  const handleNextPress = () => {
    if (selectedJobs.length > 0) {
      // TODO: 스토어에 selectedJobs 배열 저장
      router.push('/onboarding/HealthIssue');
    }
  };

  return (
    <OnboardingLayout
      onNext={handleNextPress}
      nextDisabled={selectedJobs.length === 0}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity style={styles.selectAllButton} onPress={handleSelectAll}>
          <AntDesign name="checkcircleo" size={16} color="#666" />
          <Text style={styles.selectAllText}>전체선택</Text>
        </TouchableOpacity>
        <View style={styles.optionsContainer}>
          {JOB_OPTIONS.map((option) => (
            <TouchableOpacity key={option.key} style={[styles.optionButton, selectedJobs.includes(option.key) && styles.selectedOptionButton]} onPress={() => handleToggleJob(option.key)}>
              <Ionicons name={option.iconName as any} size={24} color={selectedJobs.includes(option.key) ? '#8A8DF3' : '#555'} style={styles.icon} />
              <View style={styles.textContainer}>
                <Text style={[styles.optionLabel, selectedJobs.includes(option.key) && styles.selectedOptionText]}>{option.label}</Text>
                <Text style={[styles.optionDescription, selectedJobs.includes(option.key) && styles.selectedOptionText]}>{option.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </OnboardingLayout>
  );
}

// LevelInputScreen과 동일한 스타일을 사용합니다.
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