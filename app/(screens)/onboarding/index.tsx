import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { GoNextButton } from '@/components/button/GoNextButton';
import { OnboardingHeader } from '@/components/OnboardingHeader';
import { useOnboardingStore } from '@/api/store/useOnboardingStore';
import { OnboardingLayout } from '@/components/OnboardingLayout';

export default function OnboardingEmailScreen() {
  const router = useRouter();
  const email = useOnboardingStore((s) => s.email);
  const setEmail = useOnboardingStore((s) => s.setEmail);
  const [local, setLocal] = useState(email);

  return (
    <OnboardingLayout
      progress={1 / 7}
      header={<OnboardingHeader title="이메일 입력" subtitle="회원가입에 사용할 이메일을 입력하세요" />}
    >
      <Text style={styles.label}>이메일</Text>
      <TextInput
        style={styles.input}
        placeholder="example@saim.com"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={local}
        onChangeText={setLocal}
      />
      <GoNextButton
        disabled={!/^\S+@\S+\.\S+$/.test(local)}
        onPress={() => { setEmail(local.trim()); router.push('/onboarding/Username'); }}
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
