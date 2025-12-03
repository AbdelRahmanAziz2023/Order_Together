import { Colors } from "@/src/constants/colors";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors.lightred,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
          fontFamily: "SenBold",
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="OrderHistory"
        options={{ headerTitle: "Order History" }}
      />
      <Stack.Screen
        name="Restaurant"
        options={{ headerTitle: "Restaurants" }}
      />
      <Stack.Screen name="Menu" options={{ headerTitle: "Menu" }} />

      <Stack.Screen
        name="PaymentTracker"
        options={{ headerTitle: "Payment Tracker" }}
      />

      <Stack.Screen name="Receipt" options={{ headerTitle: "Receipt" }} />
      
    </Stack>
  );
}
