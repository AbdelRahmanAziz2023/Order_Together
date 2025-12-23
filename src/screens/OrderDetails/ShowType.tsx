import CustomText from "@/src/components/common/CustomText";
import { Colors } from "@/src/constants/colors";
import { Pressable, StyleSheet, View } from "react-native";

type ShowTypeProps = {
  showDataPerItem: boolean;
  onByItemPress: () => void;
  onByParticipantPress: () => void;
};

const ShowType = ({
  showDataPerItem,
  onByItemPress,
  onByParticipantPress,
}: ShowTypeProps) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.item, !showDataPerItem && styles.selected]}
        onPress={onByParticipantPress}
      >
        <CustomText
          text="By participant"
          textStyle={[styles.text, !showDataPerItem && styles.selectedText]}
        />
      </Pressable>

      <Pressable
        style={[styles.item, showDataPerItem && styles.selected]}
        onPress={onByItemPress}
      >
        <CustomText
          text="By item"
          textStyle={[styles.text, showDataPerItem && styles.selectedText]}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.gray200,
    borderRadius: 8,
    marginVertical: 8,
  },
  item: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: Colors.gray200,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  selected: {
    backgroundColor: Colors.red,
  },
  text: {
    color: Colors.textPrimary,
  },
  selectedText: {
    color: Colors.white,
    fontFamily: "SenBold",
  },
});

export default ShowType;
