import { useLoginMutation } from "@/src/services/api/endpoints/authEndpoints";
import { saveRefreshToken, saveToken } from "@/src/store/expo-secure-store";
import { validateLogInInput } from "@/src/utils/validation";
import { useRouter } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";

export const useLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    if (!validateLogInInput(email, password)) return;
    try {
      const res = await login({ email: email.trim(), password }).unwrap();
      // Store token and user data

      await saveToken(res.accessToken);
      await saveRefreshToken(res.refreshToken);
      dispatch(setUser(res.user));
      router.replace("/(app)/(home)");
      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: "You are now logged in.",
      });
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: err.data?.title || "Login failed, Please try again later.",
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
