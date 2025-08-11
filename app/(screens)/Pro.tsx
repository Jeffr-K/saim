import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// 1. Expo Router의 Stack과 useRouter를 import 합니다.
import { Stack, useRouter } from 'expo-router';
import Svg, { Defs, Rect, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';

const { width } = Dimensions.get('window');

interface ProBenefit {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const proBenefits: ProBenefit[] = [
  { id: 1, title: 'Pro 혜택 01', description: 'Pro 혜택에 대한 설명', icon: 'fitness-outline' },
  { id: 2, title: 'Pro 혜택 02', description: 'Pro 혜택에 대한 설명', icon: 'analytics-outline' },
  { id: 3, title: 'Pro 혜택 03', description: 'Pro 혜택에 대한 설명', icon: 'calendar-outline' },
  { id: 4, title: 'Pro 혜택 04', description: 'Pro 혜택에 대한 설명', icon: 'person-outline' },
  { id: 5, title: 'Pro 혜택 05', description: 'Pro 혜택에 대한 설명', icon: 'cloud-outline' },
];

interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  monthlyPrice?: string;
}

const subscriptionPlans: SubscriptionPlan[] = [
  { id: 'annual', name: '연간', price: '₩ 80,500', monthlyPrice: '(₩6,708/월)' },
  { id: 'monthly', name: '월간', price: '₩ 12,900' },
];

// SVG 그라데이션 컴포넌트
const GradientBackground = () => (
  <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
    <Defs>
      <SvgLinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0" stopColor="rgba(0,0,0,0.6)" />
        <Stop offset="0.6" stopColor="transparent" />
        <Stop offset="1" stopColor="#f2f3f6" />
      </SvgLinearGradient>
    </Defs>
    <Rect width="100%" height="100%" fill="url(#grad)" />
  </Svg>
);


export default function ProScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('annual');

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleProStart = () => {
    console.log('Pro 구독 시작:', selectedPlan);
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* 2. 이 한 줄이 Expo Router의 기본 헤더를 숨기는 가장 중요한 코드입니다. */}
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800' }}
        style={styles.backgroundImage}
      >
        <GradientBackground />
      </ImageBackground>

      <SafeAreaView style={styles.safeArea}>
        {/* 화면 상단에 고정되는 커스텀 헤더 */}
        <View style={styles.header}>
          <View style={styles.topBar}>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitleText}>SAiM</Text>
              <View style={styles.headerProBadge}>
                <Text style={styles.headerProBadgeText}>Pro</Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close" size={28} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.proDescription}>
            SAiM Pro를 이용해서 맞춤형 운동을 추천 받고 운동 시간을 효율적으로 관리해요.
          </Text>
        </View>

        {/* 스크롤되는 콘텐츠 영역 */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentContainer}
        >
          {/* 헤더 높이만큼의 투명한 공간을 만들어 콘텐츠가 헤더에 가려지지 않게 함 */}
          <View style={styles.scrollHeaderPadding} />

          {/* Pro 혜택 카드들 */}
          <View style={styles.benefitsSection}>
            {proBenefits.map((benefit) => (
              <View key={benefit.id} style={styles.benefitCard}>
                <View style={styles.benefitIcon}>
                  <Ionicons name={benefit.icon as any} size={24} color="#567cf9" />
                </View>
                <View style={styles.benefitText}>
                  <Text style={styles.benefitTitle}>{benefit.title}</Text>
                  <Text style={styles.benefitDescriptionText}>{benefit.description}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* 구독 플랜 선택 */}
          <View style={styles.plansSection}>
            {subscriptionPlans.map((plan) => (
              <TouchableOpacity
                key={plan.id}
                style={[
                  styles.planCard,
                  selectedPlan === plan.id && styles.selectedPlanCard,
                ]}
                onPress={() => handlePlanSelect(plan.id)}
              >
                <View style={styles.radioOuter}>
                  {selectedPlan === plan.id && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.planName}>{plan.name}</Text>
                <View style={styles.planPriceContainer}>
                  <Text style={styles.priceText}>{plan.price}</Text>
                  {plan.monthlyPrice && (
                    <Text style={styles.monthlyPriceText}> {plan.monthlyPrice}</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Pro 시작하기 버튼 */}
          <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.proButton} onPress={handleProStart}>
              <Text style={styles.proButtonText}>Pro 시작하기</Text>
            </TouchableOpacity>
            <Text style={styles.cancelInfo}>
              다음 갱신 전까지는 언제든지 취소할 수 있어요.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const HEADER_HEIGHT = 180; // 헤더의 대략적인 높이

const styles = StyleSheet.create({
  container: {
    flex: 1,
		marginTop: 50
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitleText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Pretendard',
  },
  headerProBadge: {
    backgroundColor: 'rgba(138, 141, 243, 0.7)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },
  headerProBadgeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Pretendard',
  },
  proDescription: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Pretendard',
    opacity: 0.9,
  },
  scrollContentContainer: {
    paddingBottom: 40,
  },
  scrollHeaderPadding: {
    height: HEADER_HEIGHT,
  },
  benefitsSection: {
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  benefitCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#eef2fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  benefitText: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#353743',
    marginBottom: 4,
    fontFamily: 'Pretendard',
  },
  benefitDescriptionText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#8a8d93',
    fontFamily: 'Pretendard',
  },
  plansSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'transparent',
  },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#d7d8e2',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },
  selectedPlanCard: {
    borderColor: '#567cf9',
    backgroundColor: '#f2f5ff',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#d7d8e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#567cf9',
  },
  planName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#454858',
    fontFamily: 'Pretendard',
  },
  planPriceContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'baseline',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#353743',
    fontFamily: 'Pretendard',
  },
  monthlyPriceText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8a8d93',
    fontFamily: 'Pretendard',
  },
  buttonSection: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  proButton: {
    backgroundColor: '#567cf9',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  proButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Pretendard',
  },
  cancelInfo: {
    fontSize: 14,
    fontWeight: '400',
    color: '#989bb3',
    textAlign: 'center',
    fontFamily: 'Pretendard',
  },
});
