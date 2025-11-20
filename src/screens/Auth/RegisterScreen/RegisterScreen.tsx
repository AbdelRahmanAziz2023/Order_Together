import { Icons } from "@/src/constants/images";
import React from "react";
import { StyleSheet, View } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import RegisterForm from "./RegisterForm";
import RegisterHeader from "./RegisterHeader";

const RegisterScreen = () => (
  <SafeAreaView style={styles.container}>
    <KeyboardAwareScrollView
      bottomOffset={0}
      keyboardDismissMode="interactive"
      overScrollMode="never"
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.iconWrapper}>
        <Icons.authBack width="100%" height={350} />
      </View>

      <View style={styles.content}>
        <RegisterHeader />

        <KeyboardStickyView
          offset={{ closed: 0, opened: 400 }}
          style={{ width: "100%" }}
        >
          <RegisterForm />
        </KeyboardStickyView>
      </View>
    </KeyboardAwareScrollView>
  </SafeAreaView>
);

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
  content: { flex: 1, justifyContent: "flex-end" },
});

export default RegisterScreen;
