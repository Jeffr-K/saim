import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { OnboardingLayout } from '@/components/OnboardingLayout';
import { OnboardingHeader } from '@/components/OnboardingHeader';
import { Ionicons } from '@expo/vector-icons';

// 메시지 데이터 정의
const FREQUENCY_MESSAGES = [
  {
    key: 'low',
    text: '주 1~2회, 시작이 중요해요! 조금 더 움직여볼까요?',
    icon: 'alert-circle-outline',
    color: '#E57373',
    condition: (freq: number) => freq >= 1 && freq <= 2,
  },
  {
    key: 'balanced',
    text: '균형 잡힌 운동 빈도입니다. 충분한 휴식도 잊지 마세요!',
    icon: 'checkmark-circle-outline',
    color: '#8A8DF3',
    condition: (freq: number) => freq >= 3 && freq <= 5,
  },
  {
    key: 'high',
    text: '열정 최고예요! 하지만 가끔은 쉬어가는 것도 좋아요.',
    icon: 'warning-outline',
    color: '#FFB74D',
    condition: (freq: number) => freq >= 6,
  },
];

export default function FrequencyInputScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [frequency, setFrequency] = React.useState(3);
  const currentMessage = FREQUENCY_MESSAGES.find(msg => msg.condition(frequency));

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <OnboardingHeader
          title=" "
          progress={7 / 7}
          mainTitle="운동 빈도를 선택해주세요."
          mainSubtitle="일주일에 몇 번 운동하실 계획인가요?"
        />
      ),
    });
  }, [navigation]);

  const handleIncrease = () => setFrequency((prev) => Math.min(prev + 1, 7));
  const handleDecrease = () => setFrequency((prev) => Math.max(prev - 1, 1));
  const handleNextPress = () => {
    // TODO: 스토어에 frequency 값 저장
    router.push('/onboarding/Level');
  };

  return (
    <OnboardingLayout
      onNext={handleNextPress}
      nextDisabled={frequency <= 0}
    >
      <View style={styles.contentWrapper}>
        <View style={styles.mainContent}>
          <Text style={styles.label}>주 운동 횟수</Text>
          
          {/* ✅ Stepper와 '번' 텍스트를 감싸는 View를 추가하여 가로로 정렬합니다. */}
          <View style={styles.inputWrapper}>
            <View style={styles.stepperContainer}>
              <TouchableOpacity onPress={handleDecrease}>
                <View style={styles.stepperButton}>
                  <Ionicons name="remove" size={24} color="#333" />
                </View>
              </TouchableOpacity>
              <Text style={styles.frequencyText}>{frequency}</Text>
              <TouchableOpacity onPress={handleIncrease}>
                <View style={styles.stepperButton}>
                  <Ionicons name="add" size={24} color="#333" />
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.unit}>번</Text>
          </View>
        </View>

        {currentMessage && (
          <View style={styles.infoBox}>
            <Ionicons 
              name={currentMessage.icon as any} 
              size={20} 
              color={currentMessage.color} 
            />
            <Text style={[styles.infoText, { color: currentMessage.color }]}>
              {currentMessage.text}
            </Text>
          </View>
        )}
      </View>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  // ✅ Stepper와 unit을 가로로 정렬하기 위한 스타일
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7FF',
    borderRadius: 16,
    padding: 8,
  },
  stepperButton: {
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  frequencyText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 24,
    minWidth: 60,
    textAlign: 'center',
  },
  unit: {
    fontSize: 24,
    fontWeight: '600',
    color: '#555',
    marginLeft: 12,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7FF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    width: '100%',
    marginBottom: 40,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
    flexShrink: 1,
  },
});