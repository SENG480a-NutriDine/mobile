import React from "react";
import { View, Text } from "react-native";
import { getStyles } from "../../constants/styles/global";

export default function HomeScreen() {
  const { styles } = getStyles();

  return (
    <View style={styles.container}>
      <Text>Welcome to NutriDine</Text>
    </View>
  );
}
