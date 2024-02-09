import React from "react";
import EnterFoodForm from "../../components/EnterFoodForm";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { getStyles } from "../../constants/styles/global";

export default function DataSubmission() {
  const { styles } = getStyles();
  return (
    <View style={{ width: "100%", height: "100%", ...styles.container }}>
      <EnterFoodForm />
    </View>
  );
}

const styles = StyleSheet.create({
  dataSubmissionContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    padding: 20,
  },
});
