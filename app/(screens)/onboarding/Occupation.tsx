import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingHeader } from '@/components/OnboardingHeader';
import { useOnboardingStore } from '@/api/store/useOnboardingStore';
import { OnboardingLayout } from '@/components/OnboardingLayout';

const OPTIONS = [
  { key: 'student', label: '학생' },
  { key: 'office_worker', label: '회사원' },
  { key: 'self_employed', label: '자영업' },
  { key: 'freelancer', label: '프리랜서' },
  { key: 'etc', label: '기타' },
] as const;

export default function OccupationScreen() {
  const router = useRouter();
  const occupation = useOnboardingStore((s) => s.occupation);
  const setOccupation = useOnboardingStore((s) => s.setOccupation);

  return (
    <OnboardingLayout progress={6 / 7} header={<OnboardingHeader title="직업을 선택해주세요" /> }>
      {OPTIONS.map((opt) => (
        <TouchableOpacity
          key={opt.key}
          style={[styles.option, occupation === opt.key && styles.optionActive]}
          onPress={() => setOccupation(opt.key)}
        >
          <Text style={[styles.optionText, occupation === opt.key && styles.optionTextActive]}>{opt.label}</Text>
        </TouchableOpacity>
      ))}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.next, !occupation && styles.nextDisabled]}
          disabled={!occupation}
          onPress={() => router.push('/onboarding/Referral')}
        >
          <Text style={styles.nextText}>다음</Text>
        </TouchableOpacity>
      </View>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  body: { flex: 1, padding: 20, gap: 12 },
  option: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 14,
  },
  optionActive: { borderColor: '#000' },
  optionText: { color: '#333', fontSize: 16, fontWeight: '600' },
  optionTextActive: { color: '#000' },
  footer: { padding: 20 },
  next: { backgroundColor: '#000', borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  nextDisabled: { backgroundColor: '#bbb' },
  nextText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});


