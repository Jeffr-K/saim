import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function WeeklyStats() {
  const days = [
    { label: '월', active: true },
    { label: '화', active: true },
    { label: '수', active: true },
    { label: '목', active: true },
    { label: '금', active: false },
    { label: '토', active: false },
    { label: '일', active: false },
  ];
  return (
    <View style={styles.wrapper}>
      <View style={styles.rowHeader}>
        <Text style={styles.title}>운동 통계</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.rowTop}>
          <Text style={styles.kicker}>이번주 운동</Text>
          <Text style={styles.count}>4/7회</Text>
        </View>
        <View style={styles.rowDays}>
          {days.map((d) => (
            <View key={d.label} style={styles.dayCol}>
              <View style={[styles.square, d.active ? styles.squareActive : styles.squareInactive]} />
              <Text style={[styles.day, d.active ? styles.dayActive : styles.dayInactive]}>{d.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginTop: 24 },
  rowHeader: { marginBottom: 6 },
  title: { fontSize: 20, fontWeight: '700', color: '#353743' },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16 },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  kicker: { fontSize: 14, fontWeight: '600', color: '#353743' },
  count: { fontSize: 14, fontWeight: '500', color: '#4e71e3' },
  rowDays: { flexDirection: 'row', justifyContent: 'space-between' },
  dayCol: { alignItems: 'center' },
  square: { width: 24, height: 24, borderRadius: 6 },
  squareActive: { backgroundColor: '#8ea7fb' },
  squareInactive: { backgroundColor: '#d7d8e2' },
  day: { marginTop: 6, fontSize: 14, fontWeight: '600' },
  dayActive: { color: '#4e71e3' },
  dayInactive: { color: '#d7d8e2' },
});


