import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { ProgressBar } from '@/design/bar/ProgressBar';

export function OnboardingLayout(props: { progress: number; header: React.ReactNode; children: React.ReactNode }) {
  const { progress, header, children } = props;
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>{header}</View>
      <View style={styles.progress}><ProgressBar progress={progress} /></View>
      <View style={styles.body}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 12 },
  progress: { paddingHorizontal: 20 },
  body: { flex: 1, paddingHorizontal: 20, paddingTop: 24 },
});


