import { useFonts } from "expo-font";
import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Provider } from "react-redux";
import { store } from "../store/store";

if (__DEV__) {
  require("../../ReactotronConfig");
}

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowBanner: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//     shouldShowList: true,
//   }),
// });

function RootNavigator() {
  const user = {};
  console.log(user);
  if (user) return <Redirect href="/(auth)/Login" />;
  return <Redirect href="/(app)/Home" />;
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
      {/* <Toast /> Place here */}
      </KeyboardProvider>
    </Provider>
  );
}
