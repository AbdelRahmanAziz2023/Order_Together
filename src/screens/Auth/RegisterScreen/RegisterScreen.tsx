import CustomButton from "@/src/components/common/CustomButton";
import CustomTextField from "@/src/components/common/CustomTextField";
import { Icons } from "@/src/constants/images";
import { useRegisterMutation } from "@/src/services/api/Endpoints/AuthEndpoints";
import { validateSignUpInput } from "@/src/utils/validation";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView, KeyboardStickyView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthHead from "../AuthHead";

const RegisterScreen = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signUp] = useRegisterMutation();

  const handleRegister = async () => {
    if (!validateSignUpInput(firstName, secondName, email, password)) return;
    try {
      const res = await signUp({
        firstName,
        secondName,
        email,
        password,
      }).unwrap();

      console.log("REGISTER SUCCESS:", res);
      router.replace("/(app)/Home");
    } catch (err: any) {
      console.log("REGISTER ERROR: " + err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        bottomOffset={0}
        keyboardDismissMode="interactive"
        overScrollMode="never"
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.iconWrapper}>
          <Icons.authBack width="100%" height={300} />
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <AuthHead
              title="Register"
              description="Please sign up to get started"
            />
          </View>

          {/* Sticky card */}
          <KeyboardStickyView offset={{ closed: 0, opened: 400 }} style={{ width: '100%' }}>
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

              <CustomButton title="Sign Up" onPress={handleRegister} />
            </View>
          </KeyboardStickyView>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#002A58",
  },
  iconWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: -1,
  },
  content: {
    flex: 1,
    justifyContent: "flex-end", 
  },
  header: {
    flex: 0.35,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    alignItems: "center",
    gap: 20,
  },
});

export default RegisterScreen;
