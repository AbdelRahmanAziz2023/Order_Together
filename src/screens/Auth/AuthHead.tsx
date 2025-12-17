import { StyleSheet, View, ViewStyle } from "react-native";
import CustomText from "../../components/common/CustomText";

type Props = {
  title: string;
  description: string;
  style?: ViewStyle;
};

const AuthHead = ({ title, description, style }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <CustomText text={title} textStyle={[styles.title]} />
      <CustomText text={description} textStyle={[styles.description]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: "SenBold",
    color: "#fff",
  },
  description: {
    color: "#FAD69D",
  },
});

export default AuthHead;
