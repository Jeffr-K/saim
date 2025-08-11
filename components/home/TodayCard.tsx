import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Colors, Spacing, Typography } from '@/design/tokens';
import { TodayWorkout } from '@/api/mock/home';

// TODO: 데이터가 없을 경우 현재 UI | 데이터가 있을 경우 
export function TodayCard(props: { data: TodayWorkout; onStart: () => void; onOpenCalendar?: () => void }) {
  const { data, onStart, onOpenCalendar } = props;
  if (data.status === 'none') {
    return (
      <View style={styles.frameCard}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>오늘의 운동</Text>
          <TouchableOpacity style={styles.linkRow} onPress={onOpenCalendar} activeOpacity={0.7}>
            <Text style={styles.linkText}>캘린더 보러가기</Text>
            <Feather name="chevron-right" size={16} color="#7e82a0" />
          </TouchableOpacity>
        </View>
        <View style={styles.emptyCard}>
          <Feather name="calendar" size={24} color="#7e82a0" style={{ marginBottom: 6 }} />
          <Text style={styles.emptyText}>오늘 예정된 운동이 없어요.</Text>
          <TouchableOpacity style={styles.primaryBtn} onPress={onStart} activeOpacity={0.8}>
            <Feather name="plus" size={16} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.primaryBtnText}>새 운동 계획하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  if (data.status === 'done') {
    return (
      <View style={[styles.card, styles.center]}>
        <Text style={styles.title}>오늘의 운동 완료!</Text>
        <Text style={styles.subtitle}>훌륭해요, 내일 또 만나요</Text>
      </View>
    );
  }
  return (
    <View style={styles.card}>
      <Text style={styles.kicker}>오늘의 운동</Text>
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.subtitle}>{data.subtitle}</Text>
      {!!data.estimatedMinutes && (
        <Text style={styles.meta}>예상 소요 {data.estimatedMinutes}분</Text>
      )}
      <TouchableOpacity style={styles.cta} onPress={onStart}>
        <Text style={styles.ctaText}>바로 시작하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  frameCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E6E9F0',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  sectionTitle: { color: '#353743', fontSize: 14, fontWeight: '600', letterSpacing: -0.28 },
  linkRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  linkText: { color: '#7e82a0', fontSize: 12, fontWeight: '500' },
  emptyCard: {
    backgroundColor: '#f2f3f6',
    borderRadius: 8,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: { color: '#7e82a0', fontSize: 14, fontWeight: '500', letterSpacing: -0.28, marginBottom: Spacing.md },
  primaryBtn: {
    backgroundColor: '#567cf9',
    borderRadius: 8,
    height: 36,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: 144,
  },
  primaryBtnText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  card: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xl,
  },
  center: { alignItems: 'center' },
  kicker: { color: Colors.textSecondary, marginBottom: Spacing.xs },
  title: { ...Typography.title, color: Colors.textPrimary },
  subtitle: { marginTop: Spacing.xs, color: Colors.textSecondary },
  meta: { marginTop: Spacing.sm, color: Colors.textSecondary },
  cta: {
    marginTop: Spacing.xl,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: 10,
    alignItems: 'center',
  },
  ctaText: { ...Typography.button, color: '#fff' },
});


