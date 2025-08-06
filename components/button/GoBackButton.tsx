import { Stack } from "expo-router";
import { TouchableOpacity, ViewStyle } from "react-native";
import { TabBarIcon } from "../../app/(tabs)/_layout";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

/**
 * 뒤로가기 버튼 컴포넌트(헤더)
 * 
 * @description Header 에 Stack.Screen 을 그대로 사용하면 이전 스택의 screen.title 이 나오는 이슈 해결
 * 
 * @param props 
 * @returns 
 */
export function GoBackButton(props: { title: string; }) {
  const navigation = useNavigation();

  return (
    <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <TabBarIcon name="chevron-left" color="black" theme="feather" />
            </TouchableOpacity>
          ),
          title: props.title,
          headerStyle: styles.header,
        }}
      />
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    elevation: 0,
    shadowOpacity: 0,
  },
});