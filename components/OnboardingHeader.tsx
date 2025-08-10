import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GoBackButton } from '@/components/button/GoBackButton';

export function OnboardingHeader(props: { title: string; subtitle?: string }) {
  const { title, subtitle } = props;
  return (
    <View style={styles.wrapper}>
      <GoBackButton title={title} />
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  subtitle: {
    marginTop: 4,
    color: '#666',
  },
});


