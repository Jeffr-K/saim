import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export function GoNextButton(props: { onPress: () => void }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={props.onPress}
      >
        <Text style={styles.text}>다음</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "flex-end",  
    alignItems: "center",        
    backgroundColor: "white",    
  },
  button: {
    backgroundColor: "black",
    width: "80%",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,  
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

