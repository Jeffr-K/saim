import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, SafeAreaView, Dimensions, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import Colors from '@/constants/Colors';
import { makeRedirectUri } from 'expo-auth-session';

const { height } = Dimensions.get('window');

WebBrowser.maybeCompleteAuthSession();

const socialAuthConfigs = {
  naver: {
    authorizationEndpoint: 'https://nid.naver.com/oauth2.0/authorize',
    clientId: "PqPckSv1An0O7_XOTl_F",
  },
  kakao: {
    authorizationEndpoint: 'https://kauth.kakao.com/oauth/authorize',
    clientId: "699abd4d1b347af62c08c45989676830",
  },
  google: {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    clientId: "563976722172-v4af9nm0k49jbisvne86bvlbf40v3n0c.apps.googleusercontent.com",
  },
};

/**
 * 
 * # 안드로이드용 개발 빌드 생성
 * npx eas build --profile development --platform android
 * 
 * # iOS용 개발 빌드 생성
 * npx eas build --profile development --platform ios
 * 
 * # 네이티브 앱에서 OAuth2.0 을 사용하려면 소셜 프로바이더 쪽에 패키지명+해쉬키 | IOS 번들 ID 를 등록해야하고, 여기에 맞는 Redirect URI 를 승인 목록에 넣어야 함.
 * 
 * # Redirect URI
 * saim://redirect
 */
export default function LoginScreen() {
  const router = useRouter();

  const customMakeRedirectUri = AuthSession.makeRedirectUri({
    scheme: 'saim',
    path: 'redirect',
  });

  const [naverRequest, naverResponse, promptNaverAsync] = AuthSession.useAuthRequest(
    {
      clientId: socialAuthConfigs.naver.clientId,
      scopes: ['profile', 'email'],
      redirectUri: customMakeRedirectUri,
    },
    { authorizationEndpoint: socialAuthConfigs.naver.authorizationEndpoint }
  );

  const [kakaoRequest, kakaoResponse, promptKakaoAsync] = AuthSession.useAuthRequest(
    {
      clientId: socialAuthConfigs.kakao.clientId,
      scopes: ['profile_image', 'profile_nickname', 'account_email'],
      redirectUri: customMakeRedirectUri,
    },
    { authorizationEndpoint: socialAuthConfigs.kakao.authorizationEndpoint }
  );

  const [googleRequest, googleResponse, promptGoogleAsync] = AuthSession.useAuthRequest(
    {
      clientId: socialAuthConfigs.google.clientId,
      scopes: ['profile', 'email'],
      redirectUri: customMakeRedirectUri,
    },
    { authorizationEndpoint: socialAuthConfigs.google.authorizationEndpoint }
  );

  useEffect(() => {
    if (naverResponse) handleLoginResponse(naverResponse, '네이버');
  }, [naverResponse]);

  useEffect(() => {
    if (kakaoResponse) handleLoginResponse(kakaoResponse, '카카오');
  }, [kakaoResponse]);

  useEffect(() => {
    if (googleResponse) handleLoginResponse(googleResponse, '구글');
  }, [googleResponse]);

  const handleLoginResponse = (response: AuthSession.AuthSessionResult, provider: string) => {
    if (response.type === 'success') {
      const { code } = response.params;
      console.log(`${provider} 인가 코드:`, code);
      Alert.alert(`${provider} 로그인 성공 (테스트)`, `받아온 인가 코드: ${code}`, [
        { text: "확인", onPress: () => router.push('/(screens)/onboarding/AITrainer') }
      ]);
    } else if (response.type === 'error') {
      console.error(`${provider} 로그인 에러:`, response.error);
      Alert.alert("로그인 에러", response.error?.message || "알 수 없는 오류가 발생했습니다.");
    }
  };

  const socialButtons = [
    { 
      provider: 'naver', 
      text: '네이버로 계속하기', 
      icon: 'chatbubble-ellipses-outline', 
      onPress: () => promptNaverAsync(), 
      disabled: !naverRequest,
      style: styles.naverBtn, 
      textStyle: styles.naverBtnText,
      iconColor: styles.naverBtnText.color, 
    },
    { 
      provider: 'kakao', 
      text: 'Kakao로 계속하기', 
      icon: 'chatbubble', 
      onPress: () => promptKakaoAsync(), 
      disabled: !kakaoRequest,
      style: styles.kakaoBtn, 
      textStyle: styles.kakaoBtnText,
      iconColor: styles.kakaoBtnText.color,
    },
    { 
      provider: 'google', 
      text: 'Google로 계속하기', 
      icon: 'logo-google', 
      onPress: () => promptGoogleAsync(), 
      disabled: !googleRequest,
      style: styles.googleBtn, 
      textStyle: styles.googleBtnText,
      iconColor: styles.googleBtnText.color,
    },
  ];

  return (
    <View style={styles.container}>
      <ImageBackground source={require('@/assets/images/login-bg.png')} style={styles.backgroundImage} resizeMode="cover">
        <View style={styles.overlay} />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.contentContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>SA<Text style={styles.highlight}>i</Text>M</Text>
              <Text style={styles.subtitle}>환영합니다! 오늘도 저희와 함께 시작해요.</Text>
            </View>
          </View>
          <View style={styles.footer}>
            {socialButtons.map((btn) => (
              <TouchableOpacity
                key={btn.provider}
                style={[styles.socialBtn, btn.style]}
                onPress={btn.onPress}
                disabled={btn.disabled}
              >
                <Ionicons name={btn.icon as any} size={20} color={btn.iconColor} style={styles.icon} />
                <Text style={[styles.socialBtnText, btn.textStyle]}>{btn.text}</Text>
              </TouchableOpacity>
            ))}
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
  },
  highlight: {
    color: '#567cf9',
  },
  subtitle: {
    marginTop: 12,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  footer: {
    paddingBottom: height * 0.05,
  },
  socialBtn: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    left: 24,
  },
  socialBtnText: {
    fontSize: 16,
    fontWeight: '700',
  },
  naverBtn: {
    backgroundColor: Colors.brandColor.naver,
  },
  naverBtnText: {
    color: '#fff',
  },
  kakaoBtn: {
    backgroundColor: Colors.brandColor.kakao,
  },
  kakaoBtnText: {
    color: '#000000',
  },
  googleBtn: {
    backgroundColor: Colors.brandColor.google,
  },
  googleBtnText: {
    color: '#000000',
  },
});