import { useRegisterMutation } from "@/src/services/api/endpoints/authEndpoints";
import { validateSignUpInput } from "@/src/utils/validation";
import { useRouter } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";

export const useRegister = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signUp, { isLoading }] = useRegisterMutation();

  const handleRegister = async () => {
    if (!validateSignUpInput(firstName, lastName, email, password)) return;
    try {
      await signUp({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password,
      }).unwrap();

      Toast.show({
        type: "success",
        text1: "Registration Successful",
        text2: "You can now log in with your credentials.",
      });
      router.replace("/(auth)/Login");
    } catch (err: any) {
      if (err.status === 409) {
        Toast.show({
          type: "error",
          text1: "Registration Failed",
          text2: "Email already in use. Please use a different email.",
        });
        return;
      }
      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: err.data?.title||"Registration failed, Please try again later.",
      });
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    handleRegister,
    resetForm,
  };
};
