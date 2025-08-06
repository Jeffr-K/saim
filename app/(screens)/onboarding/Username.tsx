import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GoBackButton } from "@/components/button/GoBackButton";
import { GoNextButton } from "@/components/button/GoNextButton";

export default function UsernameInputScreen() {
  const [name, setName] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      <GoBackButton title="이름 입력" />
      <View style={styles.container}>
        <Text style={styles.title}>환영합니다!</Text>
        <Text style={styles.subtitle}>먼저 이름을 알려주세요.</Text>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="이름을 입력해주세요."
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
            maxLength={20}
          />

          <Text style={styles.counter}>{`(${name.length}/20)`}</Text>
        </View>
      </View>

      <GoNextButton onPress={() => alert("Next")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
    color: "#000",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 100,
  },
  inputWrapper: {
    width: "100%",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 14,
    fontWeight: "500",
    paddingVertical: 8,
    color: "#000",
    textAlign: "left",
  },
  counter: {
    marginTop: 4,
    color: "#999",
    fontSize: 14,
    textAlign: "right",
  },
});
