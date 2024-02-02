# The Mobile NutriDine Repository

React Native Application that interacts with Firebase BaaS.

## Getting Started for Devs

This is a React-Native with Expo App that has a firebase API connection setup. For many classic DB tasks, log into the Firebase console (you will first need to be granted access).
To see the app running, you need to setup an emulator or simulator. Below are my findings from the Expo setup procedure.

1. Download Expo Go on your mobile device. https://expo.dev/client
2. Checkout the Expo requirements for your machine. https://docs.expo.dev/get-started/installation/#requirements
3. You might want to install the Expo Tools VSCode extension. https://marketplace.visualstudio.com/items?itemName=expo.vscode-expo-tools
4. Run `npx expo start` (might need `--tunnel`) inside `/app` to start a dev server, then scan the generated QR code with the Expo Go mobile app.
   - You might need to first run ` npx expo prebuild`.
   - Windows users need to set an env variable path (C:\Users\\{username}\AppData\Local\Android\Sdk\platform-tools) to get the emulator to work
   - There are many options for simulators/emulators, I found this step tricky.. Good luck!

- You need to run `npx expo install react-dom react-native-web @expo/webpack-config` before running the app on web.

#### Confirming your setup works:

Once you figured out the simulator/emulator, you will see the app renders a button. Clicking this button will write a new document to the DB (and on refresh log it to the app).
When you have firebase console access, go check that the data is in fact being written to the DB. That's it!
