import React from 'react';
import { 
  StyleSheet, 
  View, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  TouchableOpacity,
  Text,
} from 'react-native';
import { GoNextButton } from '@/components/button/GoNextButton';

type OnboardingLayoutProps = {
  children: React.ReactNode;
  onNext: () => void;
  nextDisabled?: boolean;
  onSkip?: () => void;
};

export function OnboardingLayout({ 
  children, 
  onNext, 
  nextDisabled = false, 
  onSkip 
}: OnboardingLayoutProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingWrapper}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* 1. 컨텐츠 영역 (이제 이 View가 flex: 1을 가짐) */}
          <View style={styles.contentArea}>
            {children}
          </View>
          
          {/* 2. 버튼 영역 */}
          <View style={styles.buttonArea}>
            <GoNextButton
              disabled={nextDisabled}
              onPress={onNext}
            />
            {onSkip && (
              <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
                <Text style={styles.skipText}>건너뛰기</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingWrapper: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    // ❌ justifyContent: 'space-between' 제거
  },
  contentArea: {
    flex: 1, // ⭐ 컨텐츠 영역이 남은 공간을 모두 차지하도록 설정
    paddingHorizontal: 20,
  },
  buttonArea: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  skipButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#989bb3',
  },
});