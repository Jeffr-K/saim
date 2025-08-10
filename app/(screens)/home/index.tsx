import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, StatusBar, Platform, TouchableOpacity } from 'react-native';
import { TodayCard } from '@/components/home/TodayCard';
import { RecentList } from '@/components/home/RecentList';
import { fetchHomeMock, HomeData } from '@/api/mock/home';
import { Spacing } from '@/design/tokens';
import { useRouter } from 'expo-router';
import { StatCards } from '@/components/home/StatCards';
import { WeeklyStats } from '@/components/home/WeeklyStats';
import { AbilityCards } from '@/components/home/AbilityCards';
import Feather from '@expo/vector-icons/Feather';

export default function HomeScreen() {
  const [data, setData] = useState<HomeData | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchHomeMock().then(setData);
  }, []);

  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 24;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.greetingWrap}>
        <Text style={styles.greeting}>안녕하세요 OO님</Text>
      </View>
      <View style={styles.body}>
        <View style={[styles.section, { marginTop: 24 }]}>
          {data && (
            <TodayCard
              data={data.today}
              onStart={() => router.push('/(tabs)/Start')}
              onOpenCalendar={() => router.push('/(screens)/home/calendar' as any)}
            />
          )}
        </View>
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>신체 정보</Text>
            <TouchableOpacity style={styles.editBtn} activeOpacity={0.7}>
              <Text style={styles.editText}>수정하기</Text>
              <Feather name="chevron-right" size={16} color="#9aa0b5" />
            </TouchableOpacity>
          </View>
          <StatCards />
        </View>
        <View style={[styles.section, { marginBottom: 16 }]}>
          <Text style={styles.sectionTitle}>운동 통계</Text>
          <WeeklyStats />
        </View>
        <View style={[styles.section, { marginBottom: 0 }]}>
          <Text style={styles.sectionTitle}>내 능력치</Text>
          <AbilityCards />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: Spacing.xxl, backgroundColor: '#f2f3f6' },
  greetingWrap: { backgroundColor: '#353743', paddingTop: 8, paddingHorizontal: Spacing.xl, paddingBottom: 18 },
  greeting: { color: '#fff', fontSize: 20, fontWeight: '700', letterSpacing: -0.4 },
  body: { paddingHorizontal: Spacing.xl, marginTop: 0 },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#353743', marginBottom: 8, lineHeight: 28 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16, minHeight: 28 },
  editBtn: { flexDirection: 'row', alignItems: 'baseline', gap: 2, marginTop: 0 },
  editText: { color: '#9aa0b5', fontSize: 16, fontWeight: '500', marginRight: 2, lineHeight: 28 },
});


