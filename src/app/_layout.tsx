import { useFonts } from "expo-font";
import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { getToken } from "../store/expo-secure-store";
import { store } from "../store/store";

if (__DEV__) {
  require("../../ReactotronConfig");
}

function RootNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await getToken();
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsAuthenticated(false);
    }
  };

  // Show nothing while checking auth status
  if (isAuthenticated === null) {
    return null;
  }

  // Redirect based on authentication status
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/Login" />;
  }
  
  return <Redirect href="/(app)/(home)" />;
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
        <RootNavigator />
        <Toast />
      </KeyboardProvider>
    </Provider>
  );
}
