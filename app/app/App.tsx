import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { Button } from "react-native-paper";
import { Text, View } from "react-native";
import { FIREBASE_DB } from "../firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import react, { useEffect, useState, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { getStyles, colors } from "../constants/styles/global";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { theme, styles } = getStyles();

  const [testState, setTestState] = useState<any[]>([]);
  const [appIsReady, setAppIsReady] = useState<Boolean>(false);

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

        // Just for fun
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setAppIsReady(true);
      }
    };

    fetchData();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Button
        style={styles.buttonShape}
        buttonColor={colors[theme].primary} // Use the keyof operator to ensure a valid key is used
        textColor={colors[theme].text} // TODO: Update to use themeCustomHook
        mode="contained"
        onPress={() => router.push("admin/DataSubmission")}
      >
        Go to Data Submission
      </Button>
      <Button
        style={styles.buttonShape}
        buttonColor="#264653" // TODO: Update to use themeCustomHook
        textColor="white" // TODO: Update to use themeCustomHook
        mode="contained"
        onPress={testWriteToDB}
      >
        <Text>Test write to DB</Text>
      </Button>
      {testState.length > 0 &&
        testState.map(
          (doc: { id: react.Key | null | undefined; title: any }) => (
            <View key={doc.id}>
              <Text style={styles.text}>{`Title: ${doc.title}`}</Text>
            </View>
          )
        )}
      <StatusBar style="auto" />
    </View>
  );
}
