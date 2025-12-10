import "dotenv-flow/config";
const ENV = process.env.NODE_ENV;

export default {
  expo: {
    name:
      ENV === "production"
        ? "Order Together"
        : ENV === "test"
        ? "Order Together Staging"
        : ENV === "development" ? "Order Together Dev":"Order Together default",

    slug: "order-together",

    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "ordertogether",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,

    // Add this block to disable splash
    splash: {
      image: "./assets/images/splash.png", // must exist
      resizeMode: "contain", // or 'cover'
      backgroundColor: "#ffffff",
    },

    ios: {
      icon: "./assets/images/icon.png",
      supportsTablet: true,
      bundleIdentifier:
        ENV === "production"
          ? "com.abdelrahmanaziz23.ordertogether"
          : ENV === "test"
          ? "com.abdelrahmanaziz23.ordertogetherstaging"
          : "com.abdelrahmanaziz23.ordertogetherdev",
    },

    android: {
      icon: "./assets/images/icon.png",
      adaptiveIcon: {
        backgroundColor: "#FFFFFF",
        foregroundImage: "./assets/images/icon.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,

      package:
        ENV === "production"
          ? "com.abdelrahmanaziz23.ordertogether"
          : ENV === "test"
          ? "com.abdelrahmanaziz23.ordertogetherstaging"
          : "com.abdelrahmanaziz23.ordertogetherdev",

      jsEngine: "hermes",
    },

    extra: {
      env: ENV,
     "eas": {
        "projectId": "eee76858-f1fb-479e-8f93-392401d7fa58"
      }
    },
  },
};
