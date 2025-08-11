import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, SafeAreaView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('@/assets/images/login-bg.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.contentContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>
                SA<Text style={styles.highlight}>i</Text>M
              </Text>
              <Text style={styles.subtitle}>환영합니다! 오늘도 저희와 함께 시작해요.</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={[styles.socialBtn, styles.naverBtn]} onPress={() => router.push('/(screens)/onboarding') }>
              <Ionicons name="chatbubble-ellipses-outline" size={20} color="#fff" style={styles.icon} />
              <Text style={styles.socialBtnText}>네이버로 계속하기</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.socialBtn, styles.kakaoBtn]} onPress={() => router.push('/(screens)/onboarding') }>
              <Ionicons name="chatbubble" size={20} color="#000" style={styles.icon} />
              <Text style={[styles.socialBtnText, { color: '#000' }]}>Kakao로 계속하기</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.socialBtn, styles.googleBtn]} onPress={() => router.push('/(screens)/onboarding') }>
              <Ionicons name="logo-google" size={22} color="#000" style={styles.icon} />
              <Text style={[styles.socialBtnText, { color: '#000' }]}>Google로 계속하기</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: '800',
    color: '#fff',
    fontFamily: 'Pretendard',
  },
  highlight: {
    color: '#567cf9',
  },
  subtitle: {
    marginTop: 12,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Pretendard',
  },
  footer: {
    paddingBottom: height * 0.02,
    paddingHorizontal: 16, 
  },
  socialBtn: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    flexDirection: 'row',
  },
  icon: {
    position: 'absolute',
    left: 20,
  },
  socialBtnText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Pretendard',
  },
  naverBtn: {
    backgroundColor: '#03C75A',
  },
  naverBtnText: {
    color: '#fff',
  },
  kakaoBtn: {
    backgroundColor: '#FEE500',
  },
  kakaoBtnText: {
    color: '#000',
  },
  googleBtn: {
    backgroundColor: '#FFFFFF',
  },
  googleBtnText: {
    color: '#000',
  },
});
