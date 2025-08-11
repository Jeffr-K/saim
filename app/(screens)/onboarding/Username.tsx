import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { useOnboardingStore } from '@/api/store/useOnboardingStore';
import { OnboardingHeader } from '@/components/OnboardingHeader';
import { OnboardingLayout } from '@/components/OnboardingLayout';

export default function UsernameInputScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const username = useOnboardingStore((s) => s.username);
  const setUsername = useOnboardingStore((s) => s.setUsername);
  const [localUsername, setLocalUsername] = useState(username || '');

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <OnboardingHeader
          title=" "
          progress={2 / 7}
          mainTitle="환영합니다!"
          mainSubtitle="먼저 이름을 알려주세요."
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    setLocalUsername(username || '');
  }, [username]);

  const handleNextPress = () => {
    if (localUsername.trim().length >= 2) {
      setUsername(localUsername.trim());
      router.push('/onboarding/Height');
    }
  };

  const handleSkip = () => {
    router.push('/onboarding/Height');
  };

  return (
    <OnboardingLayout
      onNext={handleNextPress}
      onSkip={handleSkip}
      nextDisabled={localUsername.trim().length < 2}
    >
      <View style={styles.contentContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="이름을 입력해주세요."
            placeholderTextColor="#999"
            value={localUsername}
            onChangeText={setLocalUsername}
            maxLength={20}
            autoFocus={true}
            autoCorrect={false}
            autoCapitalize="words"
          />
          <Text style={styles.counter}>{`(${localUsername.length}/20)`}</Text>
        </View>
      </View>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  inputWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 18,
    fontWeight: '500',
    paddingVertical: 8,
    color: '#000',
    textAlign: 'center',
  },
  counter: {
    marginTop: 4,
    color: '#999',
    fontSize: 14,
    textAlign: 'right',
    alignSelf: 'flex-end',
  },
});