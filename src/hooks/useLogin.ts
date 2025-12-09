import { useLoginMutation } from "@/src/services/api/endpoints/authEndpoints";
import {
  saveToken,
  saveUser
} from "@/src/store/expo-secure-store";
import { validateLogInInput } from "@/src/utils/validation";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export const useLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    if (!validateLogInInput(email, password)) return;
    try {
      const res = await login({ email, password }).unwrap();
      // Store token and user data
      await saveToken(res.accessToken);
      //await saveRefreshToken(res.refreshToken);
      await saveUser({
        id: res.user.id,
        firstName: res.user.firstName,
        lastName: res.user.lastName,
        email: res.user.email,
        avatarUrl: res.user.avatarUrl,
        role: res.user.role,
      });
      router.replace("/(app)/(home)");
    } catch (err: any) {
      Alert.alert("Error", err.data.title);
      console.log("LOGIN ERROR:", err);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    handleLogin,
    resetForm,
  };
};
