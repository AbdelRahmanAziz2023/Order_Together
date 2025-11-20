import CustomButton from "@/src/components/common/CustomButton";
import CustomTextField from "@/src/components/common/CustomTextField";
import { useRegisterMutation } from "@/src/services/api/Endpoints/AuthEndpoints";
import { saveToken, saveUser } from "@/src/store/expo-secure-store";
import { validateSignUpInput } from "@/src/utils/validation";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import SignInButton from "./SigninButton";

const RegisterForm = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signUp, { isLoading }] = useRegisterMutation();

  const handleRegister = async () => {
    if (!validateSignUpInput(firstName, secondName, email, password)) return;
    try {
      const res = await signUp({ firstName, secondName, email, password }).unwrap();
      console.log("REGISTER SUCCESS:", res);
      // Store token and user data
      await saveToken(res.token);
      await saveUser({ id: res.id, fullName: res.fullName, email: res.email });
      router.replace("/(app)/(home)");
    } catch (err: any) {
      console.log("REGISTER ERROR: " + err);
    }
  };

  return (
    <View style={styles.card}>
      <CustomTextField
        value={firstName}
        onChangeText={setFirstName}
        name="First Name"
        placeholder="Enter your first name"
      />
      <CustomTextField
        value={secondName}
        onChangeText={setSecondName}
        name="Second Name"
        placeholder="Enter your last name"
      />
      <CustomTextField
        value={email}
        onChangeText={setEmail}
        name="Email"
        placeholder="Enter your email"
      />
      <CustomTextField
        value={password}
        onChangeText={setPassword}
        name="Password"
        placeholder="Enter your password"
        isPassword
      />

      <CustomButton
        title={isLoading ? "Loading..." : "Sign Up"}
        onPress={handleRegister}
        isDisabled={isLoading}
      />
      <SignInButton />
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

export default RegisterForm;
