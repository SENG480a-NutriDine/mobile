import { StyleSheet, useColorScheme } from "react-native";



export const colors = {
    light: {
        primary: "#ffffff",
        secondary: "#F2F2F2",
        tertiary: "#4B4B4B",
        accent: "#1DA1F2",
        tint: "#111827",
        text: "#111827",
    },
    dark: {
        primary: "#121212",
        secondary: "#1C1C1C",
        tertiary: "#f9fafb",
        accent: "#1DA1F2",
        text: "#f9fafb",
        tint: "#f9fafb",
    },
};
  

export const getStyles = () => {
    
    const theme = useColorScheme() || 'light';

    return StyleSheet.create({
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
    });
};
  