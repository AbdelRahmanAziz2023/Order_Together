import CustomButton from "@/src/components/common/CustomButton";
import CustomTextField from "@/src/components/common/CustomTextField";
import { useRegister } from "@/src/hooks/useRegister";
import React from "react";
import { StyleSheet, View } from "react-native";
import AuthFoot from "../AuthFoot";

const RegisterForm = () => {
  const {
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
  } = useRegister();

  return (
    <View style={styles.card}>
      <CustomTextField
        value={firstName}
        onChangeText={setFirstName}
        name="First Name"
        placeholder="Enter your first name"
      />
      <CustomTextField
        value={lastName}
        onChangeText={setLastName}
        name="Last Name"
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
      <AuthFoot
        targetName="Login"
        textButton="Login"
        question="Already have an account?"
      />
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
