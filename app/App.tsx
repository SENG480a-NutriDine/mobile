import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, Text, View } from "react-native";
import { FIREBASE_DB } from "./firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import react, { useEffect, useState } from "react";

export default function App() {
  const [testState, setTestState] = useState<any[]>([]);
  async function testWriteToDB() {
    const newDoc = await addDoc(collection(FIREBASE_DB, "testCollection"), {
      title: "I am a test",
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(FIREBASE_DB, "testCollection")
        );
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTestState(documents);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Button onPress={testWriteToDB} title="Test to write to DB" />
      {testState.length > 0 &&
        testState.map(
          (doc: { id: react.Key | null | undefined; title: any }) => (
            <View key={doc.id}>
              <Text>{`Title: ${doc.title}`}</Text>
            </View>
          )
        )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
