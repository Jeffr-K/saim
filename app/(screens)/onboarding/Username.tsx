import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { OnboardingHeader } from '@/components/OnboardingHeader';
import { OnboardingLayout } from '@/components/OnboardingLayout';
import { GoNextButton } from '@/components/button/GoNextButton';
import { useOnboardingStore } from '@/api/store/useOnboardingStore';
import { useRouter } from 'expo-router';

export default function UsernameInputScreen() {
  const router = useRouter();
  const username = useOnboardingStore((s) => s.username);
  const setUsername = useOnboardingStore((s) => s.setUsername);
  const [name, setName] = useState(username ?? '');

  return (
    <OnboardingLayout progress={2 / 7} header={<OnboardingHeader title="이름 입력" />}>
      <Text style={styles.title}>환영합니다!</Text>
      <Text style={styles.subtitle}>먼저 이름을 알려주세요.</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="이름을 입력해주세요."
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
          maxLength={20}
        />

        <Text style={styles.counter}>{`(${name.length}/20)`}</Text>
      </View>

      <GoNextButton
        disabled={name.trim().length < 2}
        onPress={() => { setUsername(name.trim()); router.push('/onboarding/Height'); }}
      />
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
    color: '#000',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 100,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 14,
    fontWeight: '500',
    paddingVertical: 8,
    color: '#000',
    textAlign: 'left',
  },
  counter: {
    marginTop: 4,
    color: '#999',
    fontSize: 14,
    textAlign: 'right',
  },
});
