import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RadarChart } from '@/components/charts/RadarChart';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export function AbilityCards() {
  const items = [
    { icon: 'arm-flex', label: '스트렝스', rank: '상위 15%' },
    { icon: 'scale-bathroom', label: '체지방률', rank: '상위 15%' },
    { icon: 'dumbbell', label: '골격근량', rank: '상위 15%' },
    { icon: 'heart-outline', label: '체력', rank: '상위 15%' },
    { icon: 'run-fast', label: '근지구력', rank: '상위 15%' },
  ];

  return (
    <View style={styles.wrapper}>
      {/* 섹션 타이틀은 카드 바깥 */}
      {/* <Text style={styles.title}>내 능력치</Text> */}

      {/* 차트와 하단 능력치가 들어가는 흰색 카드 */}
      <View style={styles.containerCard}>
        {/* 차트 섹션 */}
        <View style={styles.chartSection}>
          <View style={styles.chartHeaderRow}>
            <View style={styles.tag}><Text style={styles.tagText}>같은 체급 상위 OO%</Text></View>
            <MaterialCommunityIcons name="help-circle-outline" size={20} color="#9aa0b5" />
          </View>
          <RadarChart
            size={260}
            data={[
              { label: '스트렝스', value: 65 },
              { label: '체지방률', value: 55 },
              { label: '골격근량', value: 70 },
              { label: '체력', value: 50 },
              { label: '근지구력', value: 60 },
            ]}
          />
        </View>

        {/* 하단 능력치 그리드(그레이 카드 2열) */}
        <View style={styles.metricGrid}>
          {items.map((it) => (
            <View key={it.label} style={styles.metricCell}>
              <View style={styles.metricHead}>
                <MaterialCommunityIcons name={it.icon as any} size={20} color="#7a7e98" />
                <Text style={styles.metricLabel}>{it.label}</Text>
              </View>
              <Text style={styles.metricRank}>{it.rank}</Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.caption}>앱 사용자 간의 상위를 작성한 내용입니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // 상위 컨테이너의 좌우 여백은 부모(home body)의 패딩과 동일하게 관리하므로 이곳에 패딩을 주지 않습니다.
  wrapper: {},
  // 전체를 감싸는 흰색 카드
  containerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    // iOS 그림자
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    // Android 그림자
    elevation: 3,
  },
  title: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#353743', 
    marginBottom: 12 
  },
  chartSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  chartHeaderRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
    marginBottom: 12,
  },
  tag: { 
    backgroundColor: '#e8efff', 
    borderRadius: 6, 
    paddingHorizontal: 10, 
    paddingVertical: 6, 
    alignSelf: 'flex-start',
  },
  tagText: { 
    color: '#567cf9', 
    fontWeight: '600' 
  },
  metricGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
  },
  // 개별 능력치 회색 카드
  metricCell: { 
    backgroundColor: '#f0f2f5', // 회색 배경
    borderRadius: 12,
    padding: 16,
    width: '48%', // 2열 구성
    marginBottom: 12,
  },
  metricHead: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8, 
    marginBottom: 4 
  },
  metricLabel: { 
    fontSize: 16, 
    color: '#7a7e98', 
    fontWeight: '600' 
  },
  metricRank: { 
    fontSize: 16, 
    color: '#353743', 
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  caption: { 
    marginTop: 8, 
    fontSize: 12, 
    color: '#9a9aa1',
    textAlign: 'center',
  },
});
