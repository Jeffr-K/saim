import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { OnboardingLayout } from '@/components/OnboardingLayout';
import { useRouter } from 'expo-router';

export default function OnboardingCompleteScreen() {
  const router = useRouter();
  return (
    <OnboardingLayout progress={1} header={<View />}>
      <View style={styles.container}>
        <Text style={styles.title}>수고하셨어요!</Text>
        <Text style={styles.subtitle}>이제 SAiM을 시작해볼까요?</Text>

        <TouchableOpacity style={styles.primaryBtn} onPress={() => router.replace('/(tabs)/Home')}>
          <Text style={styles.primaryBtnText}>시작하기</Text>
        </TouchableOpacity>
      </View>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    marginBottom: 40,
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: '#000',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});


