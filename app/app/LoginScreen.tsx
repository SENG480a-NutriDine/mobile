import React, { useState } from "react";
import { Text, View, StatusBar } from "react-native";
import { Button } from "react-native-paper";
import { getStyles, colors } from "../constants/styles/global";
import * as AuthService from "../services/AuthService/AuthService";
import { Redirect } from "expo-router";

export default function LoginScreen() {
  const { theme, styles } = getStyles();
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleUserSignIn = async () => {
    try {
      await AuthService.signIn();
      setIsSignedIn(true); // Update state to indicate user is signed in
    } catch (error) {
      console.log(error);
    }
  };

  if (isSignedIn) {
    return <Redirect href="/HomeScreen" />;
  }

  return (
    <View style={styles.container}>
      <Button
        style={styles.buttonShape}
        buttonColor={colors[theme].button.background}
        textColor={colors[theme].button.text}
        mode="contained"
        onPress={handleUserSignIn}
      >
        <Text>Sign In With Google</Text>
      </Button>
      {/* <Button
        style={styles.buttonShape}
        buttonColor={colors[theme].button.background}
        textColor={colors[theme].button.text}
        mode="contained"
        onPress={AuthService.signOut}
      >
        <Text>sign out</Text>
      </Button> */}

      {/* <Button
        style={styles.buttonShape}
        buttonColor={colors[theme].button.background}
        textColor={colors[theme].button.text}
        mode="contained"
        onPress={AuthService.getCurrentUser}
      >
        <Text>get user</Text>
      </Button> */}
    </View>
  );
}
