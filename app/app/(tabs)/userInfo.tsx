import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";
import { Button } from "react-native-paper";
import { getStyles, colors } from "../../constants/styles/global";
import * as AuthService from "../../services/AuthService/AuthService";
import { Redirect } from "expo-router";

const UserInfo = () => {
  const { theme, styles } = getStyles();
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [isSignedOut, setIsSignedOut] = useState(false);
  useEffect(() => {
    // Assuming you store the user's info in the authentication session
    // Otherwise, you might need to fetch the user's info from Firestore
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      // Here, we're using the displayName and email from the auth session
      // Adjust according to where and how you store the user's name
      setUser({
        name: currentUser.displayName || "No Name",
        email: currentUser.email || "No Email",
      });
    }
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>User is not signed in</Text>
      </View>
    );
  }

  const handleUserSignOut = async () => {
    try {
      await AuthService.signOut();
      setIsSignedOut(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (isSignedOut) {
    return <Redirect href="/LoginScreen" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: {user.name}</Text>
      <Text style={styles.text}>Email: {user.email}</Text>
      <Button
        style={styles.buttonShape}
        buttonColor={colors[theme].button.background}
        textColor={colors[theme].button.text}
        mode="contained"
        onPress={handleUserSignOut}
      >
        <Text>sign out</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    margin: 10,
  },
});

export default UserInfo;
