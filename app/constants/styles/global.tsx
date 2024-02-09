import { StyleSheet, useColorScheme } from "react-native";

type Colors = {
  light: {
    primary: string;
    secondary: string;
    tertiary: string;
    accent: string;
    tint: string;
    text: string;
    placeholderText: string;
    error: string;
    button: {
      background: string;
      text: string;
    };
  };
  dark: {
    primary: string;
    secondary: string;
    tertiary: string;
    accent: string;
    tint: string;
    text: string;
    placeholderText: string;
    error: string;
    button: {
      background: string;
      text: string;
    };
  };
};

export const colors: Colors = {
  light: {
    primary: "#ffffff",
    secondary: "#F2F2F2",
    tertiary: "#4B4B4B",
    accent: "#1DA1F2",
    tint: "#111827",
    text: "#111827",
    placeholderText: "#9CA3AF",
    error: "red",
    button: {
      background: "#264653",
      text: "white",
    },
  },
  dark: {
    primary: "#121212",
    secondary: "#1C1C1C",
    tertiary: "#f9fafb",
    accent: "#1DA1F2",
    tint: "#f9fafb",
    text: "#f9fafb",
    placeholderText: "#9CA3AF",
    error: "#FF5555",
    button: {
      background: "#37A395",
      text: "white",
    },
  },
};

export const getStyles = () => {
  const theme = useColorScheme() || "light";

  return {
    theme,
    styles: StyleSheet.create({
      container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors[theme].primary,
      },
      text: {
        color: colors[theme].text,
        fontSize: 15,
      },
      buttonShape: {
        marginHorizontal: 0,
        marginVertical: 5,
        borderRadius: 10,
        borderWidth: 1,
      },
      textInput: {
        marginHorizontal: 0,
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors[theme].primary,
        backgroundColor: colors[theme].secondary,
        color: colors[theme].text,
      },
      formLabel: {
        fontSize: 15,
        fontWeight: "bold",
        color: colors[theme].text,
      },
      errorText: {
        color: colors[theme].error,
      },
    }),
  };
};
