import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import React, { useMemo, useRef } from 'react';
import { Colors, Spacing, Typography } from '@/design/tokens';

export function GoNextButton(props: { onPress: () => void; disabled?: boolean; label?: string }) {
  const { disabled, label = '다음' } = props;
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.98, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }).start();
  };

  const containerStyle = useMemo(() => [
    styles.button,
    disabled && styles.buttonDisabled,
    { transform: [{ scale }] },
  ], [disabled, scale]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={containerStyle}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={0.7}
          onPress={props.onPress}
          disabled={disabled}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        />
        <Text style={styles.text}>{label}</Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: Colors.background },
  button: {
    backgroundColor: Colors.primary,
    width: '80%',
    paddingVertical: Spacing.md,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  buttonDisabled: { backgroundColor: Colors.muted },
  text: {
    color: '#fff',
    ...Typography.button,
  },
});

