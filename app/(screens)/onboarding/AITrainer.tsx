import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useNavigation } from 'expo-router';
import { OnboardingLayout } from '@/components/OnboardingLayout';
import { OnboardingHeader } from '@/components/OnboardingHeader';

interface Trainer {
  id: string;
  name: string;
  style: string;
  icon: string;
  description: string;
}

// 테스트를 위해 데이터를 4개로 늘렸습니다.
const trainers: Trainer[] = [
  { 
    id: 'devil', 
    name: '마이클', 
    style: '스파르타식 조교 스타일', 
    icon: '😈',
    description: '안녕하세요! 마이클입니다. 최고의 결과를 위해 여러분을 한계까지 밀어붙이겠습니다. 포기란 없습니다. 저와 함께라면 반드시 목표를 달성할 수 있습니다!'
  },
  { 
    id: 'angel', 
    name: '소피아', 
    style: '부드럽고 친구같은 스타일', 
    icon: '😇',
    description: '안녕하세요 ~ 소피아예요! 저는 친구처럼 부드럽게 여러분의 운동을 도와드릴게요. 무리하지 않고 꾸준히 할 수 있도록 응원하고 격려하면서 함께 건강한 습관을 만들어봐요!'
  },
  { 
    id: 'guru', 
    name: '요다', 
    style: '명상과 함께', 
    icon: '🧘',
    description: '마음의 평화, 그것이 곧 육체의 힘이 됩니다. 저와 함께 호흡하고 움직이며, 당신 안의 잠재력을 깨워봅시다.'
  },
  { 
    id: 'pro', 
    name: '제인', 
    style: '데이터 기반 전문가', 
    icon: '👩‍🔬',
    description: '모든 움직임은 데이터로 증명됩니다. 당신의 몸 상태를 정확히 분석하고, 가장 효율적인 운동 계획을 설계해 드립니다. 숫자는 거짓말하지 않죠.'
  },
];

export default function AITrainerScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  
  const [selectedTrainerId, setSelectedTrainerId] = useState<string | null>(null); // UI 피드백용 (테두리 표시)
  const [confirmedTrainerId, setConfirmedTrainerId] = useState<string | null>(null); // 로직용 (다음 버튼 활성화)
  const [modalVisible, setModalVisible] = useState(false);
  const [trainerForModal, setTrainerForModal] = useState<Trainer | null>(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <OnboardingHeader
          title=" "
          progress={1 / 7}
          mainTitle="AI 트레이너를 선택해주세요."
          mainSubtitle={`함께할 AI 헬스 트레이너를 선택해주세요.\n원활한 사용을 위하여 이어폰 착용을 권장합니다.`}
        />
      ),
    });
  }, [navigation]);

  // 1. 카드 클릭 시 모달 열기
  const handleCardPress = (trainer: Trainer) => {
    setTrainerForModal(trainer);
    setModalVisible(true);
  };
  
  // 2. 모달에서 '함께 할래요' 클릭 시 선택 확정
  const handleConfirmTrainer = () => {
    if (trainerForModal) {
      setConfirmedTrainerId(trainerForModal.id);
      setSelectedTrainerId(trainerForModal.id);
      setModalVisible(false);
      // TODO: 나중에 이 부분에서 스토어에 trainerForModal.id를 저장합니다.
    }
  };

  // 3. '다음' 버튼 클릭 시 화면 이동
  const handleNextPress = () => {
    if (confirmedTrainerId) {
      router.push('/onboarding/Username');
    }
  };

  return (
    <OnboardingLayout
      onNext={handleNextPress}
      nextDisabled={!confirmedTrainerId}
    >
      <ScrollView>
        <View style={styles.cardContainer}>
          {trainers.map((trainer) => (
            <TouchableOpacity
              key={trainer.id}
              style={[
                styles.card,
                selectedTrainerId === trainer.id && styles.selectedCard,
              ]}
              onPress={() => handleCardPress(trainer)}
              activeOpacity={0.7}
            >
              <Text style={styles.cardIcon}>{trainer.icon}</Text>
              <Text style={styles.cardName}>{trainer.name}</Text>
              <Text style={styles.cardStyle}>{trainer.style}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="#555" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{trainerForModal?.name} 트레이너</Text>
            <Text style={styles.modalDescription}>{trainerForModal?.description}</Text>
            <TouchableOpacity style={styles.changeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.changeButtonText}>다른 트레이너로 변경</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmTrainer}>
              <Text style={styles.confirmButtonText}>이 트레이너와 함께 할래요</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // ✅ 카드가 꽉 차면 다음 줄로 자동 줄바꿈
    justifyContent: 'space-between',
    paddingTop: 40, // 헤더와의 간격
  },
  card: {
    width: '48%', // 화면의 절반보다 약간 작은 너비
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent', // ✅ 기본 테두리는 투명하게
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 16, // ✅ 카드들 사이의 세로 간격
  },
  selectedCard: {
    borderColor: '#8A8DF3', // ✅ 선택 시 테두리 색상만 변경
    backgroundColor: '#F7F7FF',
  },
  cardIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  cardName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardStyle: {
    fontSize: 14,
    color: '#888',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxWidth: 360,
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    marginTop: 12,
  },
  modalDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  changeButton: {
    width: '100%',
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  changeButtonText: {
    color: '#888',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButton: {
    width: '100%',
    backgroundColor: '#8A8DF3',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});