import { Icons } from "@/src/constants/images";

import React from "react";
import { StyleSheet, View } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

import LoginForm from "./LoginForm";
import LoginHeader from "./LoginHeader";

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        bottomOffset={0}
        keyboardDismissMode="interactive"
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.iconWrapper}>
          <Icons.authBack width="100%" height={350} />
        </View>

        <View style={styles.content}>
          <LoginHeader />

          <KeyboardStickyView
            offset={{ closed: 0, opened: 500 }}
            style={{ width: "100%" }}
          >
            <LoginForm />
          </KeyboardStickyView>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#4A0000" },
  iconWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: -1,
  },
  content: { flex: 1, justifyContent: "space-between" },
});

export default LoginScreen;
