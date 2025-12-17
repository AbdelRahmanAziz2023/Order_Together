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
      {/* Name row */}
      <View style={styles.row}>
        <CustomTextField
          value={firstName}
          onChangeText={setFirstName}
          name="First Name"
          placeholder="First name"
          containerStyle={styles.halfInput}
        />

        <CustomTextField
          value={lastName}
          onChangeText={setLastName}
          name="Last Name"
          placeholder="Last name"
          containerStyle={styles.halfInput}
        />
      </View>

      {/* Email */}
      <CustomTextField
        value={email}
        onChangeText={setEmail}
        name="Email"
        placeholder="Enter your email"
      />

      {/* Password */}
      <CustomTextField
        value={password}
        onChangeText={setPassword}
        name="Password"
        placeholder="Enter your password"
        isPassword
      />

      {/* Action */}

      <CustomButton
        title={isLoading ? "Creating account..." : "Sign Up"}
        onPress={handleRegister}
        isDisabled={isLoading}
        btnStyle={styles.action}
      />

      {/* Footer */}
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
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 20,
    gap: 10,

    // Subtle elevation
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    elevation: 10,
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  halfInput: {
    flex: 1,
  },

  action: {
   marginTop: 20,
   marginBottom: 10,
  },
});
export default RegisterForm;
