// (screens)/onboarding/ReferralScreen.tsx (새 파일)

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { OnboardingLayout } from '@/components/OnboardingLayout';
import { OnboardingHeader } from '@/components/OnboardingHeader';

const REFERRAL_OPTIONS = [
  { key: 'app_store', iconName: 'logo-apple-appstore', label: '앱스토어 / 플레이스토어' },
  { key: 'community', iconName: 'chatbubbles-outline', label: '커뮤니티' },
  { key: 'ad', iconName: 'megaphone-outline', label: '광고' },
  { key: 'media', iconName: 'tv-outline', label: '미디어' },
  { key: 'friend', iconName: 'people-outline', label: '지인 추천' },
  { key: 'youtube', iconName: 'logo-youtube', label: '유튜브' },
  { key: 'instagram', iconName: 'logo-instagram', label: '인스타그램' },
  { key: 'blog', iconName: 'reader-outline', label: '블로그' },
  { key: 'cafe', iconName: 'cafe-outline', label: '카페' },
  { key: 'etc', iconName: 'create-outline', label: '기타' },
] as const;

type ReferralKey = typeof REFERRAL_OPTIONS[number]['key'];

export default function ReferralScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [selectedReferrals, setSelectedReferrals] = useState<ReferralKey[]>([]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <OnboardingHeader
          title=" "
          progress={12 / 13} // 전체 온보딩 단계에 맞춰 조절해주세요
          mainTitle="SAIM을 어떻게 알게 되셨나요?"
          mainSubtitle="SAIM을 알게 된 경로를 선택해주세요."
        />
      ),
    });
  }, [navigation]);

  const handleToggle = (key: ReferralKey) => {
    setSelectedReferrals((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleSelectAll = () => {
    if (selectedReferrals.length === REFERRAL_OPTIONS.length) {
      setSelectedReferrals([]);
    } else {
      setSelectedReferrals(REFERRAL_OPTIONS.map(opt => opt.key));
    }
  };

  const handleNextPress = () => {
    if (selectedReferrals.length > 0) {
      // TODO: 스토어에 selectedReferrals 배열 저장
      router.push('/onboarding/Complete');
    }
  };

  return (
    <OnboardingLayout
      onNext={handleNextPress}
      nextDisabled={selectedReferrals.length === 0}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity style={styles.selectAllButton} onPress={handleSelectAll}>
          <AntDesign name="checkcircleo" size={16} color="#666" />
          <Text style={styles.selectAllText}>전체선택</Text>
        </TouchableOpacity>
        <View style={styles.optionsContainer}>
          {REFERRAL_OPTIONS.map((option) => (
            <TouchableOpacity key={option.key} style={[styles.optionButton, selectedReferrals.includes(option.key) && styles.selectedOptionButton]} onPress={() => handleToggle(option.key)}>
              <Ionicons name={option.iconName as any} size={24} color={selectedReferrals.includes(option.key) ? '#8A8DF3' : '#555'} style={styles.icon} />
              <View style={styles.textContainer}>
                <Text style={[styles.optionLabel, selectedReferrals.includes(option.key) && styles.selectedOptionText]}>{option.label}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  contentContainer: { paddingTop: 40 },
  selectAllButton: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginBottom: 16 },
  selectAllText: { color: '#666', fontSize: 14, fontWeight: '500', marginLeft: 4 },
  optionsContainer: { gap: 12 },
  optionButton: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20 },
  selectedOptionButton: { borderColor: '#8A8DF3', backgroundColor: '#F7F7FF' },
  icon: { marginRight: 16 },
  textContainer: { flex: 1 },
  optionLabel: { color: '#333', fontSize: 16, fontWeight: '700' },
  selectedOptionText: { color: '#8A8DF3' },
});