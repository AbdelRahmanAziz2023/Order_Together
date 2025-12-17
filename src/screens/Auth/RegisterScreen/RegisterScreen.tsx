import React from "react";
import { StyleSheet, View } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthHead from "../AuthHead";
import BackgroundIcon from "../BackgroundIcon";
import RegisterForm from "./RegisterForm";

const RegisterScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Scrollable content */}
        <KeyboardAwareScrollView
          keyboardDismissMode="interactive"
          overScrollMode="never"
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <BackgroundIcon />

          <AuthHead
            title="Register"
            description="Please sign up to get started"
            style={styles.header}
          />
        </KeyboardAwareScrollView>

        {/* Sticky bottom form */}
        <KeyboardStickyView>
          <RegisterForm />
        </KeyboardStickyView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#4A0000",
  },

  container: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  header: {
    flex: 0.6,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  sticky: {
    width: "100%",
  },
});

export default RegisterScreen;
