import React from "react";
import EnterFoodForm from "../../components/EnterFoodForm";
import { SafeAreaView } from "react-native";
import { getStyles } from "../../constants/styles/global";

export default function DataSubmission() {
  const { styles } = getStyles();
  return (
    <SafeAreaView
      style={{ paddingTop: 48, paddingBottom: 16, ...styles.container }}
    >
      <EnterFoodForm />
    </SafeAreaView>
  );
}
