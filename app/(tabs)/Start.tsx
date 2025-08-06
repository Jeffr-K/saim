import { View } from '@/components/Themed';
import { Text } from 'react-native';

export default function StartScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>시작 버튼 Clicked</Text>
    </View>
  )
}