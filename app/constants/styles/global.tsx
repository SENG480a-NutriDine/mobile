import { StyleSheet, useColorScheme } from "react-native";

type Colors = {
 light: {
   primary: string;
   secondary: string;
   tertiary: string;
   accent: string;
   tint: string;
   text: string;
 };
 dark: {
   primary: string;
   secondary: string;
   tertiary: string;
   accent: string;
   text: string;
   tint: string;
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
   }),
 };
};