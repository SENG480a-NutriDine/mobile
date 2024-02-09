import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getStyles } from "../constants/styles/global";
import React, { useState } from 'react';

const localStyles = StyleSheet.create({
    text: {
        fontSize: 24
    }
});

export default function Login() {
  const styles = getStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login credentials', username, password);
  };

  return (
    <View style={styles.container}>
        <Text style={[styles.text, localStyles.text]}>Login</Text>
        <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
