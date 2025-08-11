import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { GoBackButton } from './button/GoBackButton';
import { ProgressBar } from '@/design/bar/ProgressBar'; // ProgressBar를 import 합니다.

/**
 * 온보딩 헤더
 * @description 온보딩 시 ProgressBar 와 함께 뒤로가기 버튼과 title을 함께 표시하는 컴포넌트
 * @param props
 * @returns
 */
export function OnboardingHeader(props: {
  title: string;
  subtitle?: string;
  progress?: number;
  mainTitle?: string;
  mainSubtitle?: string;
}) {
  const { title, subtitle, progress, mainTitle, mainSubtitle } = props;

  return (
    <SafeAreaView style={styles.wrapper}>
      {/* GoBackButton Section */}
      <View style={styles.headerContent}>
        <GoBackButton title={title} />
        {subtitle ? <Text style={styles.subtitleText}>{subtitle}</Text> : null}
      </View>
      
      {/* ProgrssBar Section */}
      {progress !== undefined && (
        <View style={styles.progressContainer}>
          <ProgressBar progress={progress} />
        </View>
      )}

      {/* MainTitle Section */}
      {mainTitle && mainSubtitle && (
        <View style={styles.mainTitleContainer}>
          <Text style={styles.mainTitleText}>{mainTitle}</Text>
          <Text style={styles.mainSubtitleText}>{mainSubtitle}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
    paddingBottom: 12,
  },
  headerContent: {
    paddingHorizontal: 20,
  },
  progressContainer: {
    paddingHorizontal: 20,
      marginTop: 30,
    },
  subtitleText: {
    marginTop: 4,
    color: '#666',
  },
  mainTitleContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  mainTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  mainSubtitleText: {
    fontSize: 14,
    color: '#666',
  },
});