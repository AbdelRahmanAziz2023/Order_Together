import React from "react";
import { StyleSheet, View } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthHead from "../AuthHead";
import BackgroundIcon from "../BackgroundIcon";
import LoginForm from "./LoginForm";

const LoginScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Scrollable content */}
        <KeyboardAwareScrollView
          keyboardDismissMode="interactive"
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <BackgroundIcon />

          <AuthHead
            title="Login"
            description="Please log in to your existing account"
            style={styles.header}
          />
        </KeyboardAwareScrollView>

        {/* Sticky bottom (NOT inside scroll) */}
        <KeyboardStickyView>
          <LoginForm />
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

export default LoginScreen;
