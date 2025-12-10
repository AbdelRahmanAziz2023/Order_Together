import { useLoginMutation } from "@/src/services/api/endpoints/authEndpoints";
import { saveRefreshToken, saveToken, saveUser } from "@/src/store/expo-secure-store";
import { validateLogInInput } from "@/src/utils/validation";
import { useRouter } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";

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
      await saveRefreshToken(res.refreshToken);
      await saveUser({
        id: res.user.id,
        firstName: res.user.firstName,
        lastName: res.user.lastName,
        email: res.user.email,
        avatarUrl: res.user.avatarUrl,
        role: res.user.role,
      });

      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: "You are now logged in.",
      });
      router.replace("/(app)/(home)");
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2:
          err.data?.title ||
          "An unexpected error occurred. Please try again later.",
      });
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
