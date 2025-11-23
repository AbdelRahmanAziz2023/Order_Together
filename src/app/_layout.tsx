import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { store } from "../store/store";

if (__DEV__) {
  require("../../ReactotronConfig");
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SenRegular: require("../../assets/fonts/sen/Sen-Regular.ttf"),
    SenMedium: require("../../assets/fonts/sen/Sen-Medium.ttf"),
    SenBold: require("../../assets/fonts/sen/Sen-Bold.ttf"),
    SenSemiBold: require("../../assets/fonts/sen/Sen-SemiBold.ttf"),
    SenExtraBold: require("../../assets/fonts/sen/Sen-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <Provider store={store}>
      <KeyboardProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <Toast />
      </KeyboardProvider>
    </Provider>
  );
}
