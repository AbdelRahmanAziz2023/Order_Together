import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import CustomText from "../../components/common/CustomText";

const ForgetPasswordRow = () => {
  const [isChecked, setIsChecked] = useState(false);

  const forgetPasswordPress = () => {
    // Handle forget password press
  };

  return (
    <View style={styles.container}>
      <View style={styles.rememberContainer}>
        <CustomText text="Remember Me" textStyle={styles.text} />
      </View>
      <Pressable onPress={forgetPasswordPress}>
        <CustomText text="Forget Password" textStyle={styles.forgetText} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  rememberContainer: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  text: {
    color: "#7E8A97",
    fontSize: 14,
  },
  forgetText: {
    color: "#0672CB",
    fontSize: 14,
  },
});

export default ForgetPasswordRow;
