import { StyleSheet, Text, TextInput, View } from "react-native";
import GoBackButton from "@/components/button/GoBackButton";
import { GoNextButton } from "@/components/button/GoNextButton";

export default function WeightInputScreen() {
  return (
    <>
      <GoBackButton title="몸무게 입력" />

      <View style={styles.container}>
        <Text style={styles.title}>몸무게를 입력해주세요.</Text>

        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="0"
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
          <Text style={styles.unitText}>Kg</Text>
        </View>
      </View>

      <GoNextButton onPress={() => alert("Next")} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',   
    width: '100%',              
  },
  input: {
    width: 100,                 
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 24,
    paddingVertical: 8,
    paddingHorizontal: 0,
    marginRight: 12,            
    color: '#000',
    textAlign: 'center',        
  },
  unitText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 6,
  },
});
