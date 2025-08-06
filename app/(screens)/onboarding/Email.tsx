import { Text, View } from "react-native";
import { GoNextButton } from "@/components/button/GoNextButton";

export default function EmailInputScreen() {
  return (
    <View>
      <Text>이메일을 입력해주세요.</Text>

      <GoNextButton onPress={() => alert("Next")} />
    </View>
  ) 
}