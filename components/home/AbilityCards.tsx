import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Pressable } from 'react-native';
import { RadarChart } from '@/components/charts/RadarChart';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Spacing } from '@/design/tokens';

export function AbilityCards() {
  const [modalVisible, setModalVisible] = useState(false);
  const items = [
    { icon: 'arm-flex', label: '스트렝스', rank: '상위 15%' },
    { icon: 'scale-bathroom', label: '체지방률', rank: '상위 15%' },
    { icon: 'dumbbell', label: '골격근량', rank: '상위 15%' },
    { icon: 'heart-outline', label: '체력', rank: '상위 15%' },
    { icon: 'run-fast', label: '근지구력', rank: '상위 15%' },
  ];

  return (
    <View style={styles.wrapper}>
      {/* 차트와 하단 능력치가 들어가는 흰색 카드 */}
      <View style={styles.containerCard}>
        {/* 차트 섹션 */}
        <View style={styles.chartSection}>
          <View style={styles.chartHeaderRow}>
            <View style={styles.tag}><Text style={styles.tagText}>같은 체급 상위 OO%</Text></View>
            <TouchableOpacity onPress={() => setModalVisible(true)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <MaterialCommunityIcons name="help-circle-outline" size={20} color="#9aa0b5" />
            </TouchableOpacity>
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

      {/* 도움말 모달 */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setModalVisible(false)}
            >
              <MaterialCommunityIcons name="close" size={24} color="#555" />
            </TouchableOpacity>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>체급 상위 OO%가 뭐예요?</Text>
              <Text style={styles.modalDesc}>
                같은 체급 내에서 내 능력치가 상위 몇 %에 해당하는지 보여줍니다. {'\n'}
                예를 들어, 스트렝스 상위 15%라면 같은 체급 사용자 중 상위 15%에 속한다는 의미입니다.
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  containerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
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
  metricCell: {
    backgroundColor: '#f0f2f5',
    borderRadius: 12,
    padding: 16,
    width: '48%',
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
  // --- Modal Styles ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    shadowColor: '#000',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24, // 모든 방향에 동일한 패딩 적용
    paddingTop: 40, // X 버튼과 제목 사이의 공간을 위해 상단 패딩만 더 크게 설정
    width: '100%',
    alignItems: 'center', // 내부 콘텐츠를 왼쪽으로 정렬
  },
  closeButton: {
    position: 'absolute',
    top: 20, // 패딩 값과 맞추어 조정
    right: 20, // 패딩 값과 맞추어 조정
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#353743',
    marginBottom: 12,
    width: '100%', // 부모의 정렬을 따르도록 너비 설정
    textAlign: 'center',
  },
  modalDesc: {
    fontSize: 15,
    color: '#353743',
    width: '100%', // 부모의 정렬을 따르도록 너비 설정
    textAlign: 'center',
    lineHeight: 22,
  },
});

