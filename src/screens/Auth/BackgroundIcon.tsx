import { Icons } from "@/src/constants/images";
import { StyleSheet, View } from "react-native";

const BackgroundIcon = () => {
    return (
        <View style={styles.background}>
          <Icons.authBack width="100%" height={350} />
        </View>
    );
}

const styles = StyleSheet.create({
     background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    pointerEvents: "none",
  },
});

export default BackgroundIcon;