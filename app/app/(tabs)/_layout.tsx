import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { colors, getStyles } from "../../constants/styles/global";
import { Entypo } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";

export default () => {
  const { theme } = getStyles();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors[theme].icon.selected,
        tabBarInactiveTintColor: colors[theme].icon.option,
        tabBarStyle: {
          height: 80,
          backgroundColor: colors[theme].primary,
          //   borderWidth: 2,
          //   borderTopLeftRadius: 2,
          //   borderTopRightRadius: 2,
          //   borderColor: colors[theme].secondary,
        },
        tabBarLabelStyle: {
          display: "none",
        },
      }}
    >
      <Tabs.Screen
        name="HomeScreen"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="LoginScreen"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="DataSubmission"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="add-to-list" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="userInfo"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};
