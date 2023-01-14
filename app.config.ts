const is_dev = process.env.NODE_ENV === "development";

const config = {
  name: is_dev ? "Cleap Dev" : "Cleep",
  slug: "cleep",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./app/assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./app/assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./app/assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
    package: "com.usmangurowa.cleep",
  },
  web: {
    favicon: "./app/assets/favicon.png",
  },
  extra: {
    eas: {
      projectId: "d838cdf6-2af4-4c2c-b49e-fa6e239ea4b2",
    },
  },
};

module.exports = config;
