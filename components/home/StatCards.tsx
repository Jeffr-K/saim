import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export function StatCards() {
  const items = [
    { label: '체중', value: '70kg', icon: 'scale-bathroom' },
    { label: '체지방률', value: '18.5%', icon: 'percent' },
    { label: '골격근량', value: '32.1kg', icon: 'arm-flex' },
  ];
  return (
    <View style={styles.row}>
      {items.map((it) => (
        <View key={it.label} style={styles.card}>
          <View style={styles.iconWrap}>
            <MaterialCommunityIcons name={it.icon as any} size={18} color="#ff9f7a" />
          </View>
          <Text style={styles.value}>{it.value}</Text>
          <Text style={styles.label}>{it.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  card: { backgroundColor: '#ffe9e2', borderRadius: 12, width: '32%', padding: 12 },
  iconWrap: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#ffd9cc',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  value: { fontSize: 18, fontWeight: '700', color: '#353743' },
  label: { marginTop: 2, fontSize: 12, color: '#595c72' },
});


