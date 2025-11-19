import CustomButton from "@/src/components/common/CustomButton";
import CustomTextField from "@/src/components/common/CustomTextField";
import { Icons } from "@/src/constants/images";
import { useLoginMutation } from "@/src/services/api/Endpoints/AuthEndpoints";
import { validateLogInInput } from "@/src/utils/validation";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView, KeyboardStickyView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthHead from "../AuthHead";
import ForgetPasswordRow from "../ForgetPasswordRow";
import SignInButton from "../SignInButton";

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    if (!validateLogInInput(email, password)) return;
    try {
      await login({ email, password }).unwrap();
      router.replace("/(app)/Home");
    } catch (err) {
      console.log("LOGIN ERROR:" + err);
    }
  };

  return (
    <KeyboardAwareScrollView
      bottomOffset={0}
      keyboardDismissMode="interactive"
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.iconWrapper}>
          <Icons.authBack width="100%" height={350} />
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <AuthHead
              title="Login"
              description="Please sign in to your existing account"
            />
          </View>

          {/* Sticky card */}
          <KeyboardStickyView offset={{ closed: 0, opened: 500 }} style={{ width: '100%' , }}>
            <View style={styles.card}>
              <CustomTextField
                onChangeText={setEmail}
                value={email}
                name="Email"
                placeholder="Enter your email"
              />

              <CustomTextField
                onChangeText={setPassword}
                value={password}
                name="Password"
                placeholder="Enter your password"
                isPassword
              />

              <ForgetPasswordRow />

              <CustomButton
                title={isLoading ? "Loading..." : "Log In"}
                onPress={handleLogin}
                isDisabled={isLoading}
              />

              <SignInButton />
            </View>
          </KeyboardStickyView>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#002A58",
  },
  iconWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: -1,
  },
  content: {
    flex: 1,
    justifyContent: "space-between", // Let header stay on top, card sticks to bottom
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    alignItems: "center",
    gap: 20,
  },
});

export default LoginScreen;
