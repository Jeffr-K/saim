import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SAiM</Text>
      <Text style={styles.subtitle}>로그인하고 시작하세요</Text>

      <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/(screens)/onboarding') }>
        <Text style={styles.primaryBtnText}>이메일로 시작</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.ghostBtn} onPress={() => router.push('/(screens)/onboarding') }>
        <Text style={styles.ghostBtnText}>Apple로 계속하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    marginBottom: 40,
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: '#000',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  ghostBtn: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ghostBtnText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});


