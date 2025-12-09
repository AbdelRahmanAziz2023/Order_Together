import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import CustomText from "../../components/common/CustomText";
import { Colors } from "../../constants/colors";

type Props = {
  targetName: string;
  textButton: string;
  question: string;
};

const AuthFoot = ({ targetName, textButton, question }: Props) => {
  const router = useRouter();

  const onPress = () => {
    router.replace(`/(auth)/${targetName}`);
  };

  return (
    <View style={styles.container}>
      <CustomText text={question} textStyle={[styles.question]} />
      <Pressable onPress={onPress}>
        <CustomText text={textButton} textStyle={[styles.textButton]} />
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
  question: {
    color: "#646982",
  },
  textButton: {
    color: Colors.red,
    fontFamily: "SenBold",
  },
});

export default AuthFoot;
