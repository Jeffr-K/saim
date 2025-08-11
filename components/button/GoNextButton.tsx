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

  // ❌ SafeAreaView를 제거하고 Animated.View가 최상위가 되도록 합니다.
  // TODO: 이유가 뭐지
  return (
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
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    width: '100%', 
    paddingVertical: Spacing.md,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonDisabled: { backgroundColor: Colors.muted },
  text: {
    color: '#fff',
    ...Typography.button,
  },
});