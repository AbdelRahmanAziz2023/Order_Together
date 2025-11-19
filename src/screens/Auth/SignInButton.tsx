import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import CustomText from "../../components/common/CustomText";

const SignInButton = () => {
  const router = useRouter();
  const signUpPress = () => {
    router.push("/(auth)/Register");
  };
  return (
    <View style={styles.container}>
      <CustomText text="Don’t have an account?" textStyle={styles.first} />
      <Pressable onPress={signUpPress}>
        <CustomText text="Sign Up" textStyle={styles.second} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  first: {
    color: "#646982",
  },
  second: {
    color: "#0672CB",
    fontFamily: "SenBold",
  },
});

export default SignInButton;
