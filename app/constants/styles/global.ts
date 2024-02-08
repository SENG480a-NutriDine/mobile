import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 15,
  },

  lightContainer: {
    backgroundColor: "#ffffff",
  },

  darkContainer: {
    backgroundColor: "#242c40",
  },

  lightThemeText: {
    color: "#242c40",
  },

  darkThemeText: {
    color: "#d0d0c0",
  },

  buttonShape: {
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
  },

  formLabel: {
    fontWeight: "bold",
  },

  errorText: {
    color: "red",
  },
});
