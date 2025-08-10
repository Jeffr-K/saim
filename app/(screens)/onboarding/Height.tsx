import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingHeader } from '@/components/OnboardingHeader';
import { GoNextButton } from '@/components/button/GoNextButton';
import { useOnboardingStore } from '@/api/store/useOnboardingStore';
import { OnboardingLayout } from '@/components/OnboardingLayout';

export default function HeightInputScreen() {
  const router = useRouter();
  const height = useOnboardingStore((s) => s.heightCm);
  const setHeight = useOnboardingStore((s) => s.setHeight);
  const [local, setLocal] = useState(height ? String(height) : '');

  return (
    <OnboardingLayout progress={3 / 7} header={<OnboardingHeader title="키 입력" subtitle="신체 정보를 입력해주세요" />}>
      <Text style={styles.label}>키 (cm)</Text>
      <TextInput
        style={styles.input}
        placeholder="170"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={local}
        onChangeText={setLocal}
      />
      <GoNextButton
        disabled={!/^\d{2,3}$/.test(local)}
        onPress={() => { setHeight(local ? Number(local) : null); router.push('/onboarding/Weight'); }}
      />
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  label: { color: '#000', marginBottom: 8 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
  },
});