import { Colors } from "@/src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, ViewStyle } from "react-native";
import CustomText from "./CustomText";

type Props = {
  message: string;
  style?: ViewStyle;
  Color?: string;
};

const CustomHint = ({ message, style, Color }: Props) => {
  return (
    <View style={[styles.hint, style]}>
      <Ionicons
        name="information-circle-outline"
        size={14}
        color={Color || Colors.mustard}
      />
      <CustomText text={message} textStyle={[styles.hintText, { color: Color || Colors.mustard }]} />
    </View>
  );
};
const styles = StyleSheet.create({
  hint: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 183, 77, 0.1)",
    padding: 10,
    borderRadius: 8,
    gap: 6,
    borderWidth: 1,
    marginVertical:10,
    borderColor: "rgba(255, 183, 77, 0.3)",
  },
  hintText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "SenMedium",
    color: Colors.mustard,
  },
});
export default CustomHint;
