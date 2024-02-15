import React from "react";
import { Text, View, StatusBar } from "react-native";
import { Button } from "react-native-paper";
import { getStyles, colors } from "../../constants/styles/global";
import * as AuthService from "../../services/AuthService/AuthService";

export default function LoginScreen() {
  const { theme, styles } = getStyles();

  return (
    <View style={styles.container}>
      <Button
        style={styles.buttonShape}
        buttonColor={colors[theme].button.background}
        textColor={colors[theme].button.text}
        mode="contained"
        onPress={AuthService.signIn}
      >
        <Text>Sign In With Google</Text>
      </Button>

      <Button
        style={styles.buttonShape}
        buttonColor={colors[theme].button.background}
        textColor={colors[theme].button.text}
        mode="contained"
        onPress={AuthService.signOut}
      >
        <Text>sign out</Text>
      </Button>

      <Button
        style={styles.buttonShape}
        buttonColor={colors[theme].button.background}
        textColor={colors[theme].button.text}
        mode="contained"
        onPress={AuthService.getCurrentUser}
      >
        <Text>get user</Text>
      </Button>
    </View>
  );
}
