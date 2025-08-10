import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { GoNextButton } from '@/components/button/GoNextButton';
import { OnboardingHeader } from '@/components/OnboardingHeader';
import { useOnboardingStore } from '@/api/store/useOnboardingStore';
import { useRouter } from 'expo-router';
import { OnboardingLayout } from '@/components/OnboardingLayout';

export default function WeightInputScreen() {
  const router = useRouter();
  const weight = useOnboardingStore((s) => s.weightKg);
  const setWeight = useOnboardingStore((s) => s.setWeight);
  const [local, setLocal] = useState(weight ? String(weight) : '');

  return (
    <OnboardingLayout progress={4 / 7} header={<OnboardingHeader title="몸무게 입력" /> }>
      <Text style={styles.title}>몸무게를 입력해주세요.</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="0"
          keyboardType="numeric"
          placeholderTextColor="#999"
          value={local}
          onChangeText={setLocal}
        />
        <Text style={styles.unitText}>Kg</Text>
      </View>

      <GoNextButton
        disabled={!/^\d{2,3}$/.test(local)}
        onPress={() => { setWeight(local ? Number(local) : null); router.push('/onboarding/Goal'); }}
      />
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',   
    width: '100%',              
  },
  input: {
    width: 100,                 
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 24,
    paddingVertical: 8,
    paddingHorizontal: 0,
    marginRight: 12,            
    color: '#000',
    textAlign: 'center',        
  },
  unitText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 6,
  },
});
