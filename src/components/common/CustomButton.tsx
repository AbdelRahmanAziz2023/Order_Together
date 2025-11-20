import { Colors } from "@/src/constants/colors";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import CustomText from "./CustomText";

type Props = {
  onPress?: () => void;
  title: string;
  isDisabled?: boolean;
  btnStyle?: ViewStyle;
};

const CustomButton = ({
  onPress,
  title,
  isDisabled = false,
  btnStyle,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[styles.mainStyle, btnStyle]}
    >
      <CustomText text={title} textStyle={styles.textStyle} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainStyle: {
    width: "100%",
    height: 60,
    backgroundColor: Colors.red,
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  textStyle: {
    fontFamily: "SenBold",
    fontSize: 18,
    color: "#fff",
  },
});

export default CustomButton;
