import { Tabs } from "expo-router";

export default () => {
  return (
    <Tabs>
      <Tabs.Screen name="App" options={{ headerShown: false, title: "Home" }} />
      <Tabs.Screen
        name="DataSubmission"
        options={{ headerShown: false, title: "Data Submission" }}
      />
    </Tabs>
  );
};
