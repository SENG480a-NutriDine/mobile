import React from "react";
import EnterFoodForm from "../../components/EnterFoodForm";
import { View } from "react-native";
import { StyleSheet } from "react-native";

export default function DataSubmission() {
  return (
    <View style={styles.dataSubmissionContainer}>
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
