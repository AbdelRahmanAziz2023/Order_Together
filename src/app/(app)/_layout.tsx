import { TabBarIcon } from "@/src/components/common/TabBarIcon";
import { Colors } from "@/src/constants/colors";
import { Icons } from "@/src/constants/images";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function AppLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.red,
          tabBarInactiveTintColor: Colors.textMuted,
          tabBarStyle: {
            backgroundColor: Colors.white,
            borderWidth: 1,
            borderColor: Colors.border,
            borderRadius: 50,
            height: 60,
            paddingBottom: 10,
            marginHorizontal: 16,
            marginBottom: 56,
            position: 'absolute',
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "SenMedium",
          },
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size, focused }) => (
              <TabBarIcon
                icon={focused ? Icons.activeHome : Icons.home}
                color={color}
                size={size}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(profile)"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size, focused }) => (
              <TabBarIcon
                icon={focused ? Icons.activeUser : Icons.user}
                color={color}
                size={size}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
