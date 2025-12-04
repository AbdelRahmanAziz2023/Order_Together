const ENV = process.env.EXPO_PUBLIC_ENV;

export default {
  expo: {
    name:
      ENV === "production"
        ? "Order Together"
        : ENV === "staging"
        ? "Order Together Staging"
        : "Order Together Dev",
    slug: "order together",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "OrderTogether",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier:
        ENV === "production"
          ? "com.abdelrahman_aziz23.OrderTogether"
          : ENV === "staging"
          ? "com.abdelrahman_aziz23.OrderTogetherStaging"
          : "com.abdelrahman_aziz23.OrderTogetherDev",
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package:
        ENV === "production"
          ? "com.abdelrahman_aziz23.OrderTogether"
          : ENV === "staging"
          ? "com.abdelrahman_aziz23.OrderTogetherStaging"
          : "com.abdelrahman_aziz23.OrderTogetherDev",
      jsEngine: "hermes",
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000",
          },
        },
      ],
      "expo-secure-store",
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      env: ENV,
      router: {},
      eas: {
        projectId: "ec3cbc4d-c89e-44f3-8acc-bd59bb5f4e81",
      },
    },
  },
};
