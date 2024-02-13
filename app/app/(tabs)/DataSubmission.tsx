import React from "react";
import EnterFoodForm from "../../components/EnterFoodForm";
import { SafeAreaView } from "react-native";
import { getStyles } from "../../constants/styles/global";
import { Dimensions } from "react-native";

export default function DataSubmission() {
  const { styles } = getStyles();

  const windowHeight = Dimensions.get("window").height;
  const calculatedHeight = windowHeight - (48 + 32);
  return (
    <SafeAreaView
      style={{
        width: "100%",
        paddingTop: 48,
        paddingBottom: 32,
        height: calculatedHeight,
        ...styles.container,
      }}
    >
      <EnterFoodForm />
    </SafeAreaView>
  );
}
