import { Colors } from "@/src/constants/colors";
import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: true,
      headerStyle: {
        backgroundColor: Colors.lightred,
      },
      headerTintColor: Colors.white,
      headerTitleStyle: {
        fontFamily: 'SenBold',
        fontSize: 18,
      },
    }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="OrderHistory" options={{headerTitle: "Order History"}} />
    </Stack>
  );
}
