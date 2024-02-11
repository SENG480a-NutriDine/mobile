module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env",
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
    ],
    presets: ["babel-preset-expo", "react-native-dotenv"],
    env: {
      production: {
        plugins: ["react-native-paper/babel", "expo-router/babel"],
      },
    },
  };
};
