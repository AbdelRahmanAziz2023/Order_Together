import CustomButton from "@/src/components/common/CustomButton";
import CustomTextField from "@/src/components/common/CustomTextField";
import { useLoginMutation } from "@/src/services/api/Endpoints/AuthEndpoints";
import { validateLogInInput } from "@/src/utils/validation";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import AuthFoot from "../AuthFoot";


const LoginForm = () => {
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
      console.log("LOGIN ERROR:", err);
    }
  };

  return (
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
      <CustomButton
        title={isLoading ? "Loading..." : "Log In"}
        onPress={handleLogin}
        isDisabled={isLoading}
      />
      <AuthFoot targetName="Register" textButton="Sign Up" question="Don't have an account?"/>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    alignItems: "center",
    gap: 20,
  },
});

export default LoginForm;
