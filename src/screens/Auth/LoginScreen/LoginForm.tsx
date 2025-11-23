import CustomButton from "@/src/components/common/CustomButton";
import CustomTextField from "@/src/components/common/CustomTextField";
import { useLoginMutation } from "@/src/services/api/Endpoints/AuthEndpoints";
import { saveToken, saveUser } from "@/src/store/expo-secure-store";
import { validateLogInInput } from "@/src/utils/validation";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import AuthFoot from "../AuthFoot";


const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    if (!validateLogInInput(email, password)) return;
    try {
      const res = await login({ email, password }).unwrap();
      // Store token and user data
      await saveToken(res.token);
      await saveUser({ id: res.id, fullName: res.fullName, email: res.email });
      router.replace("/(app)/(home)");
    } catch (err) {
      Alert.alert("Error", "Invalid email or password");
      setEmail("");
      setPassword("");
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
