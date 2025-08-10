import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingHeader } from '@/components/OnboardingHeader';
import { useOnboardingStore } from '@/api/store/useOnboardingStore';
import { OnboardingLayout } from '@/components/OnboardingLayout';

const OPTIONS = [
  { key: 'app_store', label: '앱스토어' },
  { key: 'friend', label: '지인 추천' },
  { key: 'instagram', label: '인스타그램' },
  { key: 'youtube', label: '유튜브' },
  { key: 'search', label: '검색' },
  { key: 'community', label: '커뮤니티' },
  { key: 'etc', label: '기타' },
] as const;

export default function ReferralScreen() {
  const router = useRouter();
  const referral = useOnboardingStore((s) => s.referral);
  const setReferral = useOnboardingStore((s) => s.setReferral);

  return (
    <OnboardingLayout progress={7 / 7} header={<OnboardingHeader title="SAIM을 어떻게 알게 되셨나요?" /> }>
      {OPTIONS.map((opt) => (
        <TouchableOpacity
          key={opt.key}
          style={[styles.option, referral === opt.key && styles.optionActive]}
          onPress={() => setReferral(opt.key)}
        >
          <Text style={[styles.optionText, referral === opt.key && styles.optionTextActive]}>{opt.label}</Text>
        </TouchableOpacity>
      ))}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.next, !referral && styles.nextDisabled]}
          disabled={!referral}
          onPress={() => router.push('/onboarding/Complete')}
        >
          <Text style={styles.nextText}>완료</Text>
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


