import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "expo-router";
import { TabBarIcon } from "../../app/(tabs)/_layout";

/**
 * 뒤로가기 버튼 컴포넌트
 * * @description 뒤로가기 버튼과 title 을 함께 표시하는 컴포넌트
 */
export function GoBackButton(props: { title: string; }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <TabBarIcon name="chevron-left" color="black" theme="feather" />
      </TouchableOpacity>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    padding: 8,
    // TabBarIcon의 내부 여백(약 12px)과 버튼 자체의 padding(8px)을
    // 합한 값(-20px)만큼을 왼쪽으로 당겨서 전체 그리드 정렬을 맞춘다.
    marginLeft: -20
  }
});