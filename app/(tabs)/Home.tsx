import { StyleSheet } from 'react-native';

import { View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { Button } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button title="시작" onPress={() => router.push('/onboarding/Weight')} />
      <Button title="이름" onPress={() => router.push('/onboarding/Username')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});