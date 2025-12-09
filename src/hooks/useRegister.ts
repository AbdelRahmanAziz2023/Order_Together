import { useRegisterMutation } from "@/src/services/api/endpoints/authEndpoints";
import { validateSignUpInput } from "@/src/utils/validation";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

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
      const res = await signUp({
        firstName,
        lastName,
        email,
        password,
      }).unwrap();

      console.log("REGISTER SUCCESS:", res);

      router.replace("/(auth)/Login");
    } catch (err: any) {
      if (err.status === 409) {
        Alert.alert("Error", err.data.title);
        console.log("REGISTER ERROR: ", err);
        return;
      }
      Alert.alert("Error", err.data.title);
      console.log("REGISTER ERROR: ", err);
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
