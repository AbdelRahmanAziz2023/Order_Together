import CustomButton from "@/src/components/common/CustomButton";
import CustomTextField from "@/src/components/common/CustomTextField";
import { useLogin } from "@/src/hooks/useLogin";
import { StyleSheet, View } from "react-native";
import AuthFoot from "../AuthFoot";

const LoginForm = () => {
  const { email, setEmail, password, setPassword, isLoading, handleLogin } =
    useLogin();

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
      <AuthFoot
        targetName="Register"
        textButton="Sign Up"
        question="Don't have an account?"
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

export default LoginForm;
