import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { Button, Text } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text>Hello</Text>
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
