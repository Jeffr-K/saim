import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing, Typography } from '@/design/tokens';
import { RecentRecordItem } from '@/api/mock/home';

export function RecentList(props: { items: RecentRecordItem[] }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>최근 기록</Text>
      <FlatList
        data={props.items}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        renderItem={({ item }) => {
          const date = new Date(item.date);
          const label = `${date.getMonth() + 1}/${date.getDate()}`;
          return (
            <View style={styles.row}>
              <View style={styles.left}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.meta}>{label}</Text>
              </View>
              <Text style={styles.right}>{item.durationMinutes}분</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginTop: Spacing.xl },
  header: { ...Typography.title, color: Colors.textPrimary, marginBottom: Spacing.md },
  sep: { height: 12 },
  row: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {},
  title: { color: Colors.textPrimary, fontWeight: '700' },
  meta: { color: Colors.textSecondary, marginTop: 2 },
  right: { color: Colors.textPrimary, fontWeight: '600' },
});


