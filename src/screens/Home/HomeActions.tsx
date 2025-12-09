import CustomButton from "@/src/components/common/CustomButton";
import { Colors } from "@/src/constants/colors";
import { Icons } from "@/src/constants/images";
import { StyleSheet, View } from "react-native";

type Props = {
  onJoin: () => void;
  onCreate: () => void;
};

const HomeActions = ({ onJoin, onCreate }: Props) => {
  return (
    <View style={styles.buttonContainer}>
      <CustomButton
        title="Join Cart"
        btnStyle={styles.joinButton}
        Icon={Icons.cart}
        onPress={onJoin}
      />

      <CustomButton
        title="Create Order"
        btnStyle={styles.createButton}
        Icon={Icons.plus}
        onPress={onCreate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  joinButton: {
    width: "48%",
  },
  createButton: {
    width: "48%",
    backgroundColor: Colors.mustard,
  },
});

export default HomeActions;
